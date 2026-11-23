
import { examenFicha } from "./examen-ficha.model.js";

export class examenFichaService {

    static async findAll() {
        return examenFicha.findAll({
            order: [["id", "ASC"]]
        });
    }

    static async findById(id: number) {
        return examenFicha.findByPk(id);
    }

    static async create(data: {
        educationalCenterId: number;
        description: string;
        operation?: "CREATE" | "MODIFY" | "READ" | null;
    }) {
        return examenFicha.create(data);
    }

    static async update(
        ficha: examenFicha,
        data: {
            educationalCenterId?: number;
            description?: string;
            operation?: "CREATE" | "MODIFY" | "READ" | null;
        }
    ) {
        return ficha.update(data);
    }

    static async delete(ficha: examenFicha) {
        await ficha.destroy();
    }

    static async findByOperation(
        operation: "CREATE" | "MODIFY" | "READ"
    ) {
        return examenFicha.findAll({
            where: { operation },
            order: [["id", "ASC"]]
        });
    }
}
