/**
 * Queue Interface
 * Abstract interface for queue operations
 * Allows switching between different queue implementations (SQS, Bull, etc.)
 */

export interface QueueJobOptions {
  /**
   * Number of retry attempts if job fails
   * @default 3
   */
  attempts?: number;

  /**
   * Retry backoff configuration
   */
  backoff?: {
    type: 'fixed' | 'exponential';
    delay: number; // milliseconds
  };

  /**
   * Delay before processing job (milliseconds)
   */
  delay?: number;

  /**
   * Job priority (lower number = higher priority)
   */
  priority?: number;
}

export interface QueueJob<T = any> {
  id: string;
  data: T;
  attemptsMade: number;
}

export interface IQueueService {
  /**
   * Add a job to the queue
   */
  add<T>(jobName: string, data: T, options?: QueueJobOptions): Promise<void>;

  /**
   * Process jobs from the queue
   * This should be called once per job type to start polling
   */
  process<T>(
    jobName: string,
    handler: (job: QueueJob<T>) => Promise<void>,
  ): void;

  /**
   * Get queue URL (implementation specific)
   */
  getQueueUrl(): string;
}
