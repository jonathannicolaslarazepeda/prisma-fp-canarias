import { AuditLog } from "./audit-log.model.js";

export class AuditLogService {

  static async findAll() {
    return AuditLog.findAll({
      order: [["id", "ASC"]],
    });
  }

  static async findById(id: number) {
    return AuditLog.findByPk(id);
  }


  static async create(data: {
    userId: number;
    action: string;
    entityType: string;
    entityId: number;
    previousValues?: unknown;
    newValues?: unknown;
  }) {
    return AuditLog.create(data);
  }


  static async update(
    auditLog: AuditLog,
    data: {
      userId?: number;
      action?: string;
      entityType?: string;
      entityId?: number;
      previousValues?: unknown;
      newValues?: unknown;
    }
  ) {
    return auditLog.update(data);
  }


  static async delete(auditLog: AuditLog) {
    await auditLog.destroy();
  }
}
