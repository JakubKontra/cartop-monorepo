/**
 * Watch Configuration Interface
 * Defines how entity changes should trigger webhooks
 */
export interface WatchConfig {
  /**
   * Unique name for this watch configuration
   */
  name: string;

  /**
   * Array of property names to watch for changes
   * Changes to these properties will trigger the webhook
   */
  watch: string[];

  /**
   * Webhook URL to send POST request to
   */
  webhook: string;

  /**
   * Properties to include in the webhook payload
   * If not specified, only changed properties are sent
   */
  selection?: string[];

  /**
   * Optional custom headers for webhook request
   */
  headers?: Record<string, string>;

  /**
   * HTTP method (default: POST)
   */
  method?: 'POST' | 'PUT' | 'PATCH';

  /**
   * Retry configuration
   */
  retry?: {
    attempts?: number;
    delay?: number;
    backoff?: 'fixed' | 'exponential';
  };

  /**
   * Debounce configuration (prevents too many requests)
   */
  debounce?: {
    /**
     * Debounce delay in milliseconds
     */
    delay: number;
    /**
     * Max wait time before forcing execution
     */
    maxWait?: number;
  };
}

/**
 * Webhook payload sent to the endpoint
 */
export interface WebhookPayload {
  /**
   * Watch configuration name
   */
  watchName: string;

  /**
   * Entity name
   */
  entityName: string;

  /**
   * Action performed (INSERT, UPDATE, DELETE)
   */
  action: 'INSERT' | 'UPDATE' | 'DELETE';

  /**
   * Timestamp of the change
   */
  timestamp: Date;

  /**
   * Selected data from the entity
   */
  data: Record<string, any>;

  /**
   * Properties that changed (for UPDATE action)
   */
  changedProperties?: string[];

  /**
   * Old values of changed properties
   */
  oldValues?: Record<string, any>;

  /**
   * New values of changed properties
   */
  newValues?: Record<string, any>;
}
