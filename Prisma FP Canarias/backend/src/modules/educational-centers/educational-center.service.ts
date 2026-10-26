import { educationalCenter } from "./educational-center.model.js";

export class educationalCenterService {

    static async findAll() {
        return educationalCenter.findAll({
            order: [["id", "ASC"]]
        
        });
    }

    static async findById(id: number) {
        return educationalCenter.findByPk(id);
    }

    static async create(data: {
        name: string;
        code: string;
        logoUrl: string;
        address: string;
        isActive: boolean;
    }) {
        return educationalCenter.create(data);
    }

    static async update(
        educationalCenter: educationalCenter,
        data: {
            name?: string;
            code?: string;
            logoUrl?: string;
            address?: string;
            isActive?: boolean;
        }
    ) {
        return educationalCenter.update(data);
    }


    static async delete(educationalCenter: educationalCenter) {
        await educationalCenter.destroy();
    }

}