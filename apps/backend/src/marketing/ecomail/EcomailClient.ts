import {
  // List types
  ListsCollectionResponse,
  EcomailList,
  CreateListRequest,
  UpdateListRequest,
  // Subscriber types
  SubscribersResponse,
  SubscriberResponse,
  SubscriberListsResponse,
  AddSubscriberRequest,
  UpdateSubscriberRequest,
  UnsubscribeRequest,
  BulkSubscribersRequest,
  BulkSubscribersResponse,
  // Campaign types
  CampaignsResponse,
  EcomailCampaign,
  CreateCampaignRequest,
  UpdateCampaignRequest,
  CampaignStatsResponse,
  EcomailSuccessResponse,
  // Template types
  CreateTemplateRequest,
  CreateTemplateResponse,
  // Automation types
  AutomationsResponse,
  TriggerAutomationRequest,
  AutomationStatsResponse,
  // Domain types
  DomainsResponse,
  CreateDomainRequest,
  // Transactional types
  SendTransactionalEmailRequest,
  SendTransactionalTemplateRequest,
  TransactionalEmailResponse,
  // Transaction types
  CreateTransactionRequest,
  UpdateTransactionRequest,
  TransactionResponse,
  TrackEventRequest,
} from './ecomail-api.types';

/**
 * Ecomail API Client
 * Type-safe wrapper for Ecomail API v2.0
 */
export class EcomailClient {
  static readonly JSONObject = 'jsono';
  static readonly JSONArray = 'jsona';
  static readonly PlainText = 'plaintext';

  private key: string;
  private server: string;
  private responseType: string;
  private query: Record<string, string | number>;

  constructor(
    key: string,
    responseType: string = EcomailClient.JSONArray,
    server = 'https://api2.ecomailapp.cz',
    query: Record<string, string | number> = {},
  ) {
    this.key = key;
    this.server = server.replace(/\/+$/, ''); // remove trailing slash
    this.responseType = responseType;
    this.query = { ...query };
  }

  /** Clone with an added/removed query parameter */
  withQuery(key: string, value: string | number | null): EcomailClient {
    const newQuery = { ...this.query };
    if (value === null) {
      delete newQuery[key];
    } else {
      newQuery[key] = value;
    }
    return new EcomailClient(this.key, this.responseType, this.server, newQuery);
  }

  /** Set page (for pagination) */
  page(page: number): EcomailClient {
    return this.withQuery('page', page);
  }

  // ============================================================================
  // LISTS
  // ============================================================================

  getListsCollection(): Promise<ListsCollectionResponse> {
    return this.get<ListsCollectionResponse>('lists');
  }

  addListCollection(data: CreateListRequest): Promise<EcomailList> {
    return this.post<EcomailList>('lists', data);
  }

  showList(listId: string): Promise<EcomailList> {
    return this.get<EcomailList>(`lists/${encodeURIComponent(listId)}`);
  }

  updateList(listId: string, data: UpdateListRequest): Promise<EcomailList> {
    return this.put<EcomailList>(`lists/${encodeURIComponent(listId)}`, data);
  }

  getSubscribers(listId: string): Promise<SubscribersResponse> {
    return this.get<SubscribersResponse>(
      `lists/${encodeURIComponent(listId)}/subscribers`,
    );
  }

  getSubscriber(listId: string, email: string): Promise<SubscriberResponse> {
    return this.get<SubscriberResponse>(
      `lists/${encodeURIComponent(listId)}/subscriber/${encodeURIComponent(email)}`,
    );
  }

  getSubscriberList(email: string): Promise<SubscriberListsResponse> {
    return this.get<SubscriberListsResponse>(
      `subscribers/${encodeURIComponent(email)}`,
    );
  }

  addSubscriber(
    listId: string,
    data: AddSubscriberRequest,
  ): Promise<SubscriberResponse> {
    return this.post<SubscriberResponse>(
      `lists/${encodeURIComponent(listId)}/subscribe`,
      data,
    );
  }

  removeSubscriber(
    listId: string,
    data: UnsubscribeRequest,
  ): Promise<EcomailSuccessResponse> {
    return this.delete<EcomailSuccessResponse>(
      `lists/${encodeURIComponent(listId)}/unsubscribe`,
      data,
    );
  }

  updateSubscriber(
    listId: string,
    data: UpdateSubscriberRequest,
  ): Promise<SubscriberResponse> {
    return this.put<SubscriberResponse>(
      `lists/${encodeURIComponent(listId)}/update-subscriber`,
      data,
    );
  }

  addSubscriberBulk(
    listId: string,
    data: BulkSubscribersRequest,
  ): Promise<BulkSubscribersResponse> {
    return this.post<BulkSubscribersResponse>(
      `lists/${encodeURIComponent(listId)}/subscribe-bulk`,
      data,
    );
  }

  // ============================================================================
  // SUBSCRIBERS
  // ============================================================================

  getSubscriberData(email: string): Promise<SubscriberResponse> {
    return this.get<SubscriberResponse>(
      `subscribers/${encodeURIComponent(email)}`,
    );
  }

  deleteSubscriber(email: string): Promise<EcomailSuccessResponse> {
    return this.delete<EcomailSuccessResponse>(
      `subscribers/${encodeURIComponent(email)}/delete`,
    );
  }

  // ============================================================================
  // CAMPAIGNS
  // ============================================================================

  listCampaigns(filters?: string): Promise<CampaignsResponse> {
    const url =
      'campaigns' + (filters ? `?filters=${encodeURIComponent(filters)}` : '');
    return this.get<CampaignsResponse>(url);
  }

  addCampaign(data: CreateCampaignRequest): Promise<EcomailCampaign> {
    return this.post<EcomailCampaign>('campaigns', data);
  }

  updateCampaign(
    campaignId: number,
    data: UpdateCampaignRequest,
  ): Promise<EcomailCampaign> {
    return this.put<EcomailCampaign>(`campaigns/${campaignId}`, data);
  }

  sendCampaign(campaignId: number): Promise<EcomailSuccessResponse> {
    return this.get<EcomailSuccessResponse>(`campaign/${campaignId}/send`);
  }

  getCampaignStats(campaignId: number): Promise<CampaignStatsResponse> {
    return this.get<CampaignStatsResponse>(`campaigns/${campaignId}/stats`);
  }

  // ============================================================================
  // AUTOMATIONS
  // ============================================================================

  listAutomations(): Promise<AutomationsResponse> {
    return this.get<AutomationsResponse>('pipelines');
  }

  getAutomationStats(id: string): Promise<AutomationStatsResponse> {
    return this.get<AutomationStatsResponse>(
      `pipelines/${encodeURIComponent(id)}/stats`,
    );
  }

  // ============================================================================
  // TEMPLATES
  // ============================================================================

  async createTemplate(
    data: CreateTemplateRequest,
  ): Promise<CreateTemplateResponse> {
    return await this.post<CreateTemplateResponse>('template', data);
  }

  // ============================================================================
  // DOMAINS
  // ============================================================================

  listDomains(): Promise<DomainsResponse> {
    return this.get<DomainsResponse>('domains');
  }

  createDomain(data: CreateDomainRequest): Promise<EcomailSuccessResponse> {
    return this.post<EcomailSuccessResponse>('domains', data);
  }

  deleteDomain(id: number): Promise<EcomailSuccessResponse> {
    return this.delete<EcomailSuccessResponse>(`domains/${id}`);
  }

  // ============================================================================
  // TRANSACTIONAL EMAILS
  // ============================================================================

  sendTransactionalEmail(
    data: SendTransactionalEmailRequest,
  ): Promise<TransactionalEmailResponse> {
    return this.post<TransactionalEmailResponse>(
      'transactional/send-message',
      data,
    );
  }

  sendTransactionalTemplate(
    data: SendTransactionalTemplateRequest,
  ): Promise<TransactionalEmailResponse> {
    return this.post<TransactionalEmailResponse>(
      'transactional/send-template',
      data,
    );
  }

  // ============================================================================
  // TRACKER
  // ============================================================================

  createNewTransaction(
    data: CreateTransactionRequest,
  ): Promise<TransactionResponse> {
    return this.post<TransactionResponse>('tracker/transaction', data);
  }

  updateTransaction(
    transactionId: string,
    data: UpdateTransactionRequest,
  ): Promise<TransactionResponse> {
    return this.put<TransactionResponse>(
      `tracker/transaction/${encodeURIComponent(transactionId)}`,
      data,
    );
  }

  deleteTransaction(transactionId: string): Promise<EcomailSuccessResponse> {
    return this.delete<EcomailSuccessResponse>(
      `tracker/transaction/${encodeURIComponent(transactionId)}/delete`,
    );
  }

  addEvent(data: TrackEventRequest): Promise<EcomailSuccessResponse> {
    return this.post<EcomailSuccessResponse>('tracker/events', data);
  }

  // ============================================================================
  // TRIGGER AUTOMATION
  // ============================================================================

  triggerAutomation(
    automationId: string,
    data: TriggerAutomationRequest,
  ): Promise<EcomailSuccessResponse> {
    return this.post<EcomailSuccessResponse>(
      `pipelines/${encodeURIComponent(automationId)}/trigger`,
      data,
    );
  }

  // ============================================================================
  // HTTP HELPERS
  // ============================================================================

  private async get<T>(request: string): Promise<T> {
    return this.send<T>(request, undefined, 'GET');
  }

  private async post<T>(request: string, data: unknown): Promise<T> {
    return await this.send<T>(request, data, 'POST');
  }

  private async put<T>(request: string, data: unknown): Promise<T> {
    return this.send<T>(request, data, 'PUT');
  }

  private async delete<T>(request: string, data?: unknown): Promise<T> {
    return this.send<T>(request, data, 'DELETE');
  }

  private async send<T>(
    request: string,
    data: unknown,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  ): Promise<T> {
    const qs = new URLSearchParams(
      this.query as Record<string, string>,
    ).toString();
    const url = `${this.server}/${request}${qs ? `?${qs}` : ''}`;

    const init: RequestInit = {
      method,
      headers: {
        key: this.key,
        'Content-Type': 'application/json',
      },
    };
    if (data !== undefined) {
      init.body = JSON.stringify(data);
    }

    const res = await fetch(url, init);
    const text = await res.text();
    const contentType = res.headers.get('content-type') || '';

    let parsed: unknown = text;
    if (contentType.includes('application/json')) {
      parsed = JSON.parse(text);
    }

    if (!res.ok) {
      throw new Error(`HTTP ${res.status}: ${JSON.stringify(parsed)}`);
    }

    return parsed as T;
  }
}
