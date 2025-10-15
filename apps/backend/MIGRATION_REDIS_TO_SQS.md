# Redis/Bull → Amazon SQS Migration Guide

## Overview

This document describes the completed migration from Redis + Bull queues to Amazon SQS, providing cost savings and better AWS integration while maintaining the same development experience with LocalStack.

## What Changed

### Infrastructure
- **Removed**: Redis service from `docker-compose.yml`
- **Added**: LocalStack SQS queues (webhooks, notifications, audit + DLQs)
- **Cost Savings**: ~$13/month (ElastiCache) → $0-4/month (SQS)

### Dependencies
- **Removed**: `@nestjs/bull`, `bull`, `redis`
- **Added**: `@aws-sdk/client-sqs@^3.910.0`

### Code Architecture
Created a queue abstraction layer to make future migrations easier:
- `src/common/queue/queue.interface.ts` - Abstract queue interface
- `src/common/queue/sqs-queue.service.ts` - SQS implementation
- `src/common/queue/queue.module.ts` - NestJS module for dependency injection

### Migrated Modules
1. **Webhook Module** (`src/webhook/`)
   - Service, Processor, Module updated to use SQS
   - Debouncing logic preserved (in-memory)

2. **Notification Module** (`src/notification/`)
   - Email queue migrated to SQS
   - Same retry logic and error handling

3. **Audit Module** (`src/model/audit/`)
   - Audit logging queue migrated to SQS
   - Batch processing and in-memory buffer preserved

## Environment Configuration

### Development (.env)
```bash
# AWS Configuration (LocalStack)
AWS_REGION=us-east-1
AWS_ENDPOINT=http://localhost:4566

# SQS Queue Names
SQS_WEBHOOKS_QUEUE=cartop-webhooks-queue
SQS_NOTIFICATIONS_QUEUE=cartop-notifications-queue
SQS_AUDIT_QUEUE=cartop-audit-queue
```

### Production (.env)
```bash
# AWS Configuration (Production)
AWS_REGION=us-east-1
# Remove AWS_ENDPOINT to use real AWS
AWS_ACCESS_KEY_ID=your-access-key-id
AWS_SECRET_ACCESS_KEY=your-secret-access-key

# SQS Queue Names (create these in AWS Console or via Terraform)
SQS_WEBHOOKS_QUEUE=cartop-prod-webhooks-queue
SQS_NOTIFICATIONS_QUEUE=cartop-prod-notifications-queue
SQS_AUDIT_QUEUE=cartop-prod-audit-queue
```

## Running Locally

### 1. Update your `.env` file
Copy the configuration from `.env.example`:
```bash
cp .env.example .env
```

### 2. Start Docker services
```bash
docker-compose up -d
```

This will start:
- PostgreSQL
- LocalStack (with SQS queues created automatically)
- Adminer
- MinIO
- Nginx

### 3. Start the backend
```bash
yarn dev
```

## How It Works

### Queue Service Pattern
The SQS queue service uses a **polling pattern**:

1. **Adding Jobs**: `queueService.add(jobName, data, options)`
   - Sends message to SQS queue
   - Supports retry attempts, delays, exponential backoff

2. **Processing Jobs**: `queueService.process(jobName, handler)`
   - Registers a processor function for a job type
   - Starts polling SQS every 5 seconds (long polling enabled)
   - Processes up to 10 messages concurrently
   - Automatically handles retries and dead letter queues

### Differences from Bull

| Feature | Bull (Redis) | SQS |
|---------|-------------|-----|
| **Job Storage** | In Redis memory | Persistent in SQS |
| **Processing** | Push-based (instant) | Poll-based (5s interval) |
| **Retries** | In-memory, lost on restart | Persistent, survives restarts |
| **DLQ** | Manual setup | Built-in Dead Letter Queues |
| **Visibility** | Bull Board dashboard | AWS CloudWatch (prod) |
| **Concurrency** | Per-worker setting | Controlled by polling |
| **Cost** | Redis instance required | Pay-per-message |

## Production Deployment

### Step 1: Create SQS Queues in AWS

#### Option A: AWS Console
1. Go to AWS SQS Console
2. Create 3 Standard Queues:
   - `cartop-prod-webhooks-queue`
   - `cartop-prod-notifications-queue`
   - `cartop-prod-audit-queue`
3. For each queue, configure:
   - **Visibility Timeout**: 30 seconds
   - **Message Retention**: 4 days
   - **Receive Message Wait Time**: 20 seconds (long polling)
   - **Dead Letter Queue**: Create a DLQ and set max receives to 3

#### Option B: Terraform
```hcl
resource "aws_sqs_queue" "webhooks_dlq" {
  name = "cartop-prod-webhooks-dlq"
}

resource "aws_sqs_queue" "webhooks" {
  name                      = "cartop-prod-webhooks-queue"
  visibility_timeout_seconds = 30
  message_retention_seconds  = 345600 # 4 days
  receive_wait_time_seconds  = 20     # Long polling

  redrive_policy = jsonencode({
    deadLetterTargetArn = aws_sqs_queue.webhooks_dlq.arn
    maxReceiveCount     = 3
  })
}

# Repeat for notifications and audit queues
```

### Step 2: Configure IAM Permissions
Your ECS task or EC2 instance needs these permissions:
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "sqs:SendMessage",
        "sqs:ReceiveMessage",
        "sqs:DeleteMessage",
        "sqs:GetQueueUrl",
        "sqs:GetQueueAttributes"
      ],
      "Resource": [
        "arn:aws:sqs:us-east-1:*:cartop-prod-*"
      ]
    }
  ]
}
```

### Step 3: Update Environment Variables
Remove `AWS_ENDPOINT` and add real AWS credentials:
```bash
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=AKIA...
AWS_SECRET_ACCESS_KEY=secret...

SQS_WEBHOOKS_QUEUE=cartop-prod-webhooks-queue
SQS_NOTIFICATIONS_QUEUE=cartop-prod-notifications-queue
SQS_AUDIT_QUEUE=cartop-prod-audit-queue
```

### Step 4: Deploy
Deploy your NestJS application as usual. The queue service will automatically connect to AWS SQS instead of LocalStack.

## Monitoring

### Development (LocalStack)
```bash
# View queues
awslocal sqs list-queues

# Get queue attributes
awslocal sqs get-queue-attributes --queue-url http://localhost:4566/000000000000/cartop-webhooks-queue --attribute-names All

# Receive messages (for debugging)
awslocal sqs receive-message --queue-url http://localhost:4566/000000000000/cartop-webhooks-queue
```

### Production (AWS)
1. **CloudWatch Metrics**:
   - `NumberOfMessagesSent`
   - `NumberOfMessagesReceived`
   - `NumberOfMessagesDeleted`
   - `ApproximateAgeOfOldestMessage`
   - `ApproximateNumberOfMessagesVisible`

2. **CloudWatch Alarms**:
   ```bash
   # Alert if messages are piling up
   ApproximateNumberOfMessagesVisible > 1000 for 5 minutes

   # Alert if DLQ has messages (indicates failures)
   ApproximateNumberOfMessagesVisible (DLQ) > 0
   ```

3. **Application Logs**:
   - Check NestJS logs for queue processing errors
   - Look for patterns like: `Job failed after 3 attempts, moving to DLQ`

## Troubleshooting

### Issue: Queues not being processed
**Solution**: Check if LocalStack is running and queues are created
```bash
docker ps | grep localstack
awslocal sqs list-queues
```

### Issue: "Queue does not exist" error
**Solution**: Ensure LocalStack init script ran successfully
```bash
docker logs localstack
# Should show: "Creating SQS queues... LocalStack initialization complete!"
```

### Issue: Messages stuck in queue
**Solution**: Check application logs for processor errors
```bash
yarn dev
# Look for: "Processing job..." and "Job completed successfully"
```

### Issue: Slow job processing (5-20 second delay)
**Expected behavior**: SQS uses polling (every 5 seconds) vs Bull's instant push.
**Solution**: This is normal. For time-critical tasks, consider:
- Reducing polling interval in `sqs-queue.service.ts` (line 156)
- Using AWS Lambda triggers instead of polling
- Using WebSockets for real-time updates

## Cost Estimation

### Development (LocalStack)
- **Cost**: $0 (runs locally in Docker)

### Production (AWS SQS)
Pricing: $0.40 per million requests (first 1M free per month)

| Traffic Level | Requests/Month | Monthly Cost |
|--------------|----------------|--------------|
| Low | < 1M | **FREE** |
| Medium | 10M | **~$4** |
| High | 100M | **~$40** |
| Very High | 1B | **~$400** |

**Compared to Redis**:
- ElastiCache t4g.micro: $13/month (minimum)
- Self-hosted EC2 Redis: $7/month + maintenance

**Savings**: $7-13/month for most applications

## Rollback Plan

If you need to rollback to Redis/Bull:

1. Restore `docker-compose.yml` Redis service from git history
2. Restore `package.json` dependencies (`@nestjs/bull`, `bull`, `redis`)
3. Restore module files from git history:
   - `webhook/webhook.{service,processor,module}.ts`
   - `notification/notification.{service,processor,module}.ts`
   - `model/audit/audit.{service,processor,module}.ts`
4. Restore `app.module.ts` with `BullModule.forRoot()`
5. Run `yarn install` and restart

## Benefits Summary

✅ **Cost Savings**: $0-4/month vs $13/month
✅ **No Infrastructure**: Fully managed, zero maintenance
✅ **Better Reliability**: Persistent queues, built-in DLQs
✅ **AWS Integration**: Native CloudWatch monitoring
✅ **Auto-Scaling**: No capacity planning needed
✅ **Same Dev Experience**: LocalStack in Docker
✅ **Future-Proof**: Easy to add more queues or migrate to other providers

## Next Steps

1. ✅ Migration completed
2. ⏳ Test all three queues (webhooks, notifications, audit)
3. ⏳ Deploy to staging/production
4. ⏳ Set up CloudWatch alarms for queue monitoring
5. ⏳ Update runbooks and documentation

## Support

For questions or issues:
- Check NestJS logs for queue processing errors
- Review LocalStack logs for SQS initialization issues
- Consult AWS SQS documentation: https://docs.aws.amazon.com/sqs/
