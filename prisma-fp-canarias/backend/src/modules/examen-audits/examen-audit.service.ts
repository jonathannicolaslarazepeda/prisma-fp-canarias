
import { examenAudit } from "./examen-audit.model.js";

export class examenAuditService {

    static async findAll() {
        return examenAudit.findAll({
            order: [["id", "ASC"]]
        });
    }

    static async findById(id: number) {
        return examenAudit.findByPk(id);
    }

    static async create(data: {
        educationalCenterId: number;
        description: string;
        operation?: "CREATE" | "MODIFY" | "READ" | null;
    }) {
        return examenAudit.create(data);
    }

    static async update(
        examenAudit: examenAudit,
        data: {
            educationalCenterId?: number;
            description?: string;
            operation?: "CREATE" | "MODIFY" | "READ" | null;
        }
    ) {
        return examenAudit.update(data);
    }

    static async delete(examenAudit: examenAudit) {
        await examenAudit.destroy();
    }

    static async findByOperationCreate() {
        return examenAudit.findAll({
            where: {
                operation: "CREATE"
            },
            order: [["id", "ASC"]]
        });
    }

}
