import { Request, Response, NextFunction } from "express";
import { CompanyService } from "./company.service.js";

export class CompanyController {

  static async getAll(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const companies = await CompanyService.findAll();

      res.json(companies);
    } catch (error) {
      next(error);
    }
  }

  static async getById(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const id = Number(req.params.id);

      const company = await CompanyService.findById(id);

      if (!company) {
        res.status(404).json({
          message: "Empresa no encontrada",
        });

        return;
      }

      res.json(company);

    } catch (error) {
      next(error);
    }
  }

  static async getAllEagerly(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const companies = await CompanyService.findAllEagerly();

      res.json(companies);
    } catch (error) {
      next(error);
    }
  }

  static async getEagerlyById(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const id = Number(req.params.id);

      const company = await CompanyService.findEagerlyById(id);

      if (!company) {
        res.status(404).json({
          message: "Empresa no encontrada",
        });

        return;
      }

      res.json(company);

    } catch (error) {
      next(error);
    }
  }

  static async create(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { taxId, name, sector, city, contactEmail, contactPhone } = req.body;

      if (!taxId || !name) {
        res.status(400).json({
          message: "taxId y name son obligatorios",
        });

        return;
      }

      const company = await CompanyService.create({
        taxId,
        name,
        sector,
        city,
        contactEmail,
        contactPhone,
      });

      res.status(201).json(company);

    } catch (error) {
      next(error);
    }
  }


  static async update(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const id = Number(req.params.id);

      const company = await CompanyService.findById(id);

      if (!company) {
        res.status(404).json({
          message: "Empresa no encontrada",
        });

        return;
      }

      const updatedCompany = await CompanyService.update(
        company,
        req.body
      );

      res.json(updatedCompany);

    } catch (error) {
      next(error);
    }
  }


  static async delete(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const id = Number(req.params.id);

      const company = await CompanyService.findById(id);

      if (!company) {
        res.status(404).json({
          message: "Empresa no encontrada",
        });

        return;
      }

      await CompanyService.delete(company);

      res.status(204).send();

    } catch (error) {
      next(error);
    }
  }
}
