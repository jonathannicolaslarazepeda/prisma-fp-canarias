import { academicYear } from "../academic-years/academic-year.model.js";

export class academicYearService {

    static async findAll() {
        return academicYear.findAll({
            order: [["id", "ASC"]]
        
        });
    }

    static async findById(id: number) {
        return academicYear.findByPk(id);
    }

    static async create(data: {
       name: string;
       startDate: Date;
       endDate: Date;
       isActive: boolean;
    }) {
        return academicYear.create(data);
    }

    static async update(
        academicYear: academicYear,
        data: {
            name?: string;
            startDate?: Date;
            endDate?: Date;
            isActive?: boolean;
        }
    ) {
        return academicYear.update(data);
    }


    static async delete(academicYear: academicYear) {
        await academicYear.destroy();
    }

}