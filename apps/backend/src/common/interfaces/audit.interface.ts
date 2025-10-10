export enum AuditAction {
  CREATE = 'CREATE',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE',
}

export interface AuditLogData {
  entityName: string;
  entityId: string;
  action: AuditAction;
  oldValue?: Record<string, any>;
  newValue?: Record<string, any>;
  changes?: Record<string, { old: any; new: any }>;
  userId?: string;
  userEmail?: string;
  ipAddress?: string;
  userAgent?: string;
  timestamp?: Date;
  metadata?: Record<string, any>;
}
