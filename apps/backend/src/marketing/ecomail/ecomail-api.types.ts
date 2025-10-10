/**
 * Ecomail API Type Definitions
 * Based on Ecomail API v2.0 documentation
 */

// ============================================================================
// Common Types
// ============================================================================

export interface EcomailPaginatedResponse<T> {
  data: T[];
  meta?: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
}

export interface EcomailErrorResponse {
  message: string;
  errors?: Record<string, string[]>;
  status?: number;
}

export interface EcomailSuccessResponse {
  message?: string;
  success?: boolean;
}

// ============================================================================
// List Types
// ============================================================================

export interface EcomailList {
  id: number;
  name: string;
  from_name: string;
  from_email: string;
  reply_to: string;
  status: 'active' | 'inactive';
  subscribers_count?: number;
  created_at: string;
  updated_at: string;
}

export interface CreateListRequest {
  name: string;
  from_name: string;
  from_email: string;
  reply_to?: string;
  status?: 'active' | 'inactive';
}

export interface UpdateListRequest {
  name?: string;
  from_name?: string;
  from_email?: string;
  reply_to?: string;
  status?: 'active' | 'inactive';
}

export type ListsCollectionResponse = EcomailList[];

// ============================================================================
// Subscriber Types
// ============================================================================

export interface EcomailSubscriber {
  id: number;
  email: string;
  name?: string;
  surname?: string;
  phone?: string;
  city?: string;
  street?: string;
  zip?: string;
  country?: string;
  company?: string;
  gender?: 'male' | 'female' | 'other';
  birthday?: string; // YYYY-MM-DD
  tags?: string[];
  custom_fields?: Record<string, string | number | boolean>;
  status: 'subscribed' | 'unsubscribed' | 'unconfirmed' | 'soft_bounced' | 'hard_bounced';
  lists?: number[];
  created_at: string;
  updated_at: string;
}

export interface AddSubscriberRequest {
  email: string;
  name?: string;
  surname?: string;
  phone?: string;
  city?: string;
  street?: string;
  zip?: string;
  country?: string;
  company?: string;
  gender?: 'male' | 'female' | 'other';
  birthday?: string; // YYYY-MM-DD
  tags?: string[];
  custom_fields?: Record<string, string | number | boolean>;
  trigger_autoresponders?: boolean;
  update_existing?: boolean;
  resubscribe?: boolean;
  skip_confirmation?: boolean;
}

export interface UpdateSubscriberRequest {
  email: string;
  data: Partial<AddSubscriberRequest>;
}

export interface BulkSubscribersRequest {
  subscribers: AddSubscriberRequest[];
  trigger_autoresponders?: boolean;
  update_existing?: boolean;
  resubscribe?: boolean;
}

export interface UnsubscribeRequest {
  email: string;
}

export interface SubscriberResponse {
  subscriber: EcomailSubscriber;
}

export interface BulkSubscribersResponse {
  success: number;
  skipped: number;
  errors: Array<{
    email: string;
    error: string;
  }>;
}

export type SubscribersResponse = EcomailPaginatedResponse<EcomailSubscriber>;

export interface SubscriberListsResponse {
  email: string;
  lists: Array<{
    id: number;
    name: string;
    status: string;
  }>;
}

// ============================================================================
// Campaign Types
// ============================================================================

export interface EcomailCampaign {
  id: number;
  name: string;
  subject: string;
  from_name: string;
  from_email: string;
  reply_to: string;
  google_analytics?: boolean;
  template_id?: number;
  list_ids: number[];
  status: 'draft' | 'scheduled' | 'sending' | 'sent' | 'paused';
  send_at?: string;
  created_at: string;
  updated_at: string;
}

export interface CreateCampaignRequest {
  name: string;
  subject: string;
  from_name?: string;
  from_email?: string;
  reply_to?: string;
  google_analytics?: boolean;
  template_id?: number;
  html?: string;
  list_ids: number[];
  send_at?: string; // ISO 8601 datetime
}

export interface UpdateCampaignRequest {
  name?: string;
  subject?: string;
  from_name?: string;
  from_email?: string;
  reply_to?: string;
  google_analytics?: boolean;
  template_id?: number;
  html?: string;
  list_ids?: number[];
  send_at?: string;
}

export interface CampaignStatsResponse {
  campaign_id: number;
  sent: number;
  delivered: number;
  opened: number;
  clicked: number;
  unsubscribed: number;
  bounced: number;
  complained: number;
  open_rate: number;
  click_rate: number;
  unsubscribe_rate: number;
  bounce_rate: number;
}

export type CampaignsResponse = EcomailPaginatedResponse<EcomailCampaign>;

// ============================================================================
// Template Types
// ============================================================================

export interface EcomailTemplate {
  id: number;
  name: string;
  html: string;
  inline_css: number;
  thumbnail?: string;
  created_at: string;
  updated_at: string;
}

export interface CreateTemplateRequest {
  name: string;
  html: string;
  inline_css?: number; // 0 or 1
}

export interface UpdateTemplateRequest {
  name?: string;
  html?: string;
  inline_css?: number;
}

export type CreateTemplateResponse = EcomailTemplate;
export type UpdateTemplateResponse = EcomailTemplate;

// ============================================================================
// Automation/Pipeline Types
// ============================================================================

export interface EcomailAutomation {
  id: number;
  name: string;
  status: 'active' | 'inactive' | 'paused';
  list_id: number;
  trigger_type: string;
  created_at: string;
  updated_at: string;
}

export interface TriggerAutomationRequest {
  email: string;
  data?: Record<string, string | number | boolean>;
}

export interface AutomationStatsResponse {
  automation_id: number;
  subscribers: number;
  emails_sent: number;
  opened: number;
  clicked: number;
  unsubscribed: number;
  open_rate: number;
  click_rate: number;
}

export type AutomationsResponse = EcomailAutomation[];

// ============================================================================
// Domain Types
// ============================================================================

export interface EcomailDomain {
  id: number;
  domain: string;
  status: 'verified' | 'unverified' | 'pending';
  created_at: string;
}

export interface CreateDomainRequest {
  domain: string;
}

export type DomainsResponse = EcomailDomain[];

// ============================================================================
// Transactional Email Types
// ============================================================================

export interface SendTransactionalEmailRequest {
  message: {
    subject: string;
    from_name: string;
    from_email: string;
    reply_to?: string;
    to: Array<{
      email: string;
      name?: string;
    }>;
    cc?: Array<{
      email: string;
      name?: string;
    }>;
    bcc?: Array<{
      email: string;
      name?: string;
    }>;
    html?: string;
    text?: string;
    attachments?: Array<{
      filename: string;
      content: string; // Base64 encoded
      type: string; // MIME type
    }>;
    headers?: Record<string, string>;
    tags?: string[];
    variables?: Record<string, string | number | boolean>;
  };
}

export interface SendTransactionalTemplateRequest {
  template_id: number;
  to: Array<{
    email: string;
    name?: string;
  }>;
  variables?: Record<string, string | number | boolean>;
}

export interface TransactionalEmailResponse {
  message_id: string;
  status: 'queued' | 'sent' | 'failed';
}

// ============================================================================
// Tracker/Transaction Types
// ============================================================================

export interface EcomailTransaction {
  id: string;
  order_id: string;
  email: string;
  shop: string;
  amount: number;
  currency: string;
  timestamp: string;
  products: Array<{
    code: string;
    title: string;
    category: string;
    price: number;
    quantity: number;
    img_url?: string;
    url?: string;
  }>;
  status?: 'completed' | 'pending' | 'cancelled';
}

export interface CreateTransactionRequest {
  order_id: string;
  email: string;
  shop: string;
  amount: number;
  currency: string;
  timestamp?: string; // ISO 8601
  products: Array<{
    code: string;
    title: string;
    category: string;
    price: number;
    quantity: number;
    img_url?: string;
    url?: string;
  }>;
}

export interface UpdateTransactionRequest {
  amount?: number;
  status?: 'completed' | 'pending' | 'cancelled';
  products?: Array<{
    code: string;
    title: string;
    category: string;
    price: number;
    quantity: number;
    img_url?: string;
    url?: string;
  }>;
}

export interface TrackEventRequest {
  email: string;
  event: string;
  data?: Record<string, string | number | boolean>;
  timestamp?: string; // ISO 8601
}

export interface TransactionResponse {
  transaction: EcomailTransaction;
}

// ============================================================================
// API Client Response Types
// ============================================================================

export type EcomailApiResponse<T> = T | EcomailErrorResponse;

// Helper type guards
export function isEcomailError(response: unknown): response is EcomailErrorResponse {
  return (
    typeof response === 'object' &&
    response !== null &&
    'message' in response &&
    typeof (response as EcomailErrorResponse).message === 'string'
  );
}
