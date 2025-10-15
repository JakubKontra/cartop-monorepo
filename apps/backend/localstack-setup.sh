#!/bin/sh
echo "Initializing localstack services"

# S3 Bucket
echo "Creating S3 bucket..."
awslocal s3 mb s3://cartop

# SQS Queues for Bull replacement
echo "Creating SQS queues..."
awslocal sqs create-queue --queue-name cartop-webhooks-queue
awslocal sqs create-queue --queue-name cartop-notifications-queue
awslocal sqs create-queue --queue-name cartop-audit-queue

# Dead Letter Queues for failed messages
awslocal sqs create-queue --queue-name cartop-webhooks-dlq
awslocal sqs create-queue --queue-name cartop-notifications-dlq
awslocal sqs create-queue --queue-name cartop-audit-dlq

# SES for email testing
echo "Verifying SES email identity..."
awslocal ses verify-email-identity --email-address app@demo.com

echo "LocalStack initialization complete!"
