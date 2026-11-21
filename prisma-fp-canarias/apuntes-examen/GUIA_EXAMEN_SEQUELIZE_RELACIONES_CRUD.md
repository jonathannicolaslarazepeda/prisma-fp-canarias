# Guía práctica de examen: Sequelize, Express, PostgreSQL y Bruno

> **Proyecto de referencia:** `prisma-fp-canarias` · Backend TypeScript + Express + Sequelize + PostgreSQL.  
> **Objetivo:** poder repetir el ejercicio sin ayuda, tanto con una relación **1:N** como con una relación **N:M (muchos a muchos)**.  
> **Ejemplo realizado:** `examenAudit` relacionado con `educationalCenter`, tabla `examen_audits`.

---

## 0. Cómo utilizar esta guía

Esta guía tiene dos niveles:

1. **Caso real 1:N:** reproduce lo trabajado durante el examen. Se indican los archivos, la lógica y los comandos que utilizamos.
2. **Caso alternativo N:M:** ejemplo didáctico con **tu entidad `examenAudit`** y una nueva entidad `examenTag` (sin usar entidades de compañeros). **No forma parte del examen que acabamos de hacer** y no debes añadirlo al proyecto salvo que el ejercicio lo pida.

Los ejemplos siguen la estructura de vuestro backend. Algunos detalles (como la configuración exacta de Sequelize CLI, los nombres de scripts y el mecanismo que convierte `camelCase` a `snake_case`) dependen de la configuración efectiva del repositorio. **Antes de copiar código, comprueba los archivos reales del proyecto.**

### Mini diccionario

| Concepto | Significado |
|---|---|
| Modelo | Clase TypeScript que representa una tabla y sus atributos. |
| Migración | Archivo que crea o modifica físicamente las tablas de PostgreSQL. |
| Seeder | Archivo que inserta datos iniciales o de prueba. |
| Asociación | Relación declarada en Sequelize entre modelos. |
| Clave primaria (PK) | Identificador único de una fila (`id`). |
| Clave foránea (FK) | Columna que referencia el `id` de otra tabla. |
| Controller | Recibe la petición HTTP, comprueba datos y devuelve respuestas. |
| Service | Ejecuta las consultas a Sequelize. |
| Routes | Asigna una URL y método HTTP a un controller. |
| Bruno | Cliente para probar los endpoints de la API. |

---

# PARTE I. REPRODUCIR EL EXAMEN CON RELACIÓN 1:N

## 1. Qué pedía el ejercicio

Crear una entidad `ExamenAudit` relacionada con una entidad existente del proyecto. Elegimos `educationalCenter`.

Condiciones:

- Relación **1:N**: un centro educativo puede tener muchas auditorías; cada auditoría pertenece a un único centro.
- `id`: clave primaria.
- `educationalCenterId`: clave foránea obligatoria.
- `description`: texto obligatorio.
- `operation`: opcional (`null` permitido); si tiene valor, solo `CREATE`, `MODIFY` o `READ`.
- `createdAt` y `updatedAt`: fechas de creación y actualización.
- CRUD accesible desde Bruno.
- Endpoint adicional para obtener solo registros con `operation = CREATE`.
- Migración y seeder funcionales, con capturas en `docs/screenshots/`.

En este proyecto acordamos utilizar **`examen_audits` en plural** como nombre de tabla.

## 2. Dibujo mental de la relación 1:N

```text
educational_centers                    examen_audits
-------------------                    --------------------------
id (PK)              1 ----------- N  id (PK)
name                                   educational_center_id (FK)
code                                   description
...                                    operation
                                       created_at
                                       updated_at
```

La clave foránea está en el lado **N**, es decir, en `examen_audits`.

Ejemplo: un centro con `id = 1` puede tener auditorías con `id = 1`, `2`, `3`... Todas llevan `educational_center_id = 1`.

## 3. Preparar entorno y rama

En el ejercicio utilizamos una rama de trabajo `Sprint-1-Victor`, sin hacer `git push`. Si el enunciado pide un nombre de rama específico, créala desde la rama base indicada por el profesor.

Antes de tocar nada:

```bash
git status
git branch --show-current
```

Comprueba que la base de datos de desarrollo corresponde a la del examen:

```text
Base de datos: examen
Usuario: postgres
Contraseña: examen
Puerto HTTP del backend: 3000
```

**Ojo:** el puerto `3000` es el del servidor HTTP, no necesariamente el puerto de PostgreSQL. No sobrescribas un `.env.development` existente sin revisarlo. No incluyas contraseñas en commits.

## 4. Estructura de archivos

```text
backend/
├── src/
│   ├── modules/
│   │   └── examen-audits/
│   │       ├── examen-audit.model.ts
│   │       ├── examen-audit.service.ts
│   │       ├── examen-audit.controller.ts
│   │       └── examen-audit.routes.ts
│   ├── models/
│   │   └── associations.ts
│   ├── routes/
│   │   └── index.ts
│   └── server.ts
└── database/
    ├── migrations/
    │   └── 20261121142208-create-examen-audits.js
    └── seeders/
        └── 20261121142846-seed-examen-audits.js

docs/
└── screenshots/
```

Las fechas de los archivos son las del ejemplo real. Cuando generes nuevos archivos, Sequelize CLI les asignará otras fechas.

## 5. Modelo: `examen-audit.model.ts`

```ts
import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional
} from "sequelize";
import { sequelize } from "../../config/database.js";

export class examenAudit extends Model<
  InferAttributes<examenAudit>,
  InferCreationAttributes<examenAudit>
> {
  declare id: CreationOptional<number>;
  declare educationalCenterId: number;
  declare description: string;
  declare operation: CreationOptional<"CREATE" | "MODIFY" | "READ" | null>;
}

examenAudit.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    educationalCenterId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "educational_centers",
        key: "id"
      }
    },
    description: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    operation: {
      type: DataTypes.ENUM("CREATE", "MODIFY", "READ"),
      allowNull: true
    }
  },
  {
    sequelize,
    tableName: "examen_audits",
    modelName: "examenAudit",
    timestamps: true
  }
);
```

### Qué significa cada cosa

- `id` se genera automáticamente y es la PK.
- `educationalCenterId` identifica el centro al que pertenece la auditoría.
- `allowNull: false` en la FK impide auditorías sin centro.
- `description` es obligatoria.
- `ENUM` limita los valores de `operation`.
- `allowNull: true` permite `operation: null`.
- `timestamps: true` hace que Sequelize gestione las fechas automáticamente.
- `CreationOptional` expresa que el campo puede omitirse al crear el registro.

**Importante:** `allowNull: false` no sustituye una validación HTTP clara. Conviene comprobar datos obligatorios en el controller, además de mantener la restricción en la base de datos.

## 6. Asociaciones en `associations.ts`

Importa ambos modelos si todavía no están importados:

```ts
import { educationalCenter } from "../modules/educational-centers/educational-center.model.js";
import { examenAudit } from "../modules/examen-audits/examen-audit.model.js";
```

> Ajusta la ruta del primer import a la ruta **real** de `educationalCenter` en tu repositorio.

Dentro de la función existente que registra asociaciones:

```ts
educationalCenter.hasMany(examenAudit, {
  foreignKey: "educationalCenterId"
});

examenAudit.belongsTo(educationalCenter, {
  foreignKey: "educationalCenterId"
});
```

**Por qué son dos líneas:** `hasMany` expresa «un centro tiene muchas auditorías»; `belongsTo` expresa «cada auditoría pertenece a un centro». Usar ambas facilita consultas desde cualquiera de los dos modelos.

**Comprobación:** `server.ts` debe importar/registrar el modelo nuevo y ejecutar la función de asociaciones, igual que hace con las demás entidades.

```ts
import "./modules/examen-audits/examen-audit.model.js";
```

No dupliques la llamada a `defineAssociations()` si ya existe.

## 7. Migración: la tabla real de PostgreSQL

La migración del caso realizado debe utilizar **los nombres físicos de columnas que espera la configuración efectiva de Sequelize**. En nuestras pruebas el servidor generó consultas con `educational_center_id`, `created_at` y `updated_at`.

```js
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("examen_audits", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      educational_center_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "educational_centers",
          key: "id"
        }
      },
      description: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      operation: {
        type: Sequelize.ENUM("CREATE", "MODIFY", "READ"),
        allowNull: true
      },
      created_at: { type: Sequelize.DATE },
      updated_at: { type: Sequelize.DATE }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("examen_audits");
  }
};
```

### Diferencia fundamental: modelo frente a tabla

| TypeScript / JSON de Bruno | Columna PostgreSQL de este ejercicio |
|---|---|
| `educationalCenterId` | `educational_center_id` |
| `createdAt` | `created_at` |
| `updatedAt` | `updated_at` |

**No es una regla automática de todos los proyectos Sequelize.** Esta conversión requiere una configuración (`underscored`, `field` o equivalente) en algún punto del modelo/configuración. En nuestro caso sabemos que ocurría porque el SQL de la terminal pedía esos nombres. Si haces el ejercicio en otro proyecto, comprueba cómo está configurado antes de decidir los nombres de la migración.

### ¿Por qué poner `references` en la migración?

```js
references: {
  model: "educational_centers",
  key: "id"
}
```

Porque crea la restricción de clave foránea **en PostgreSQL**. Declarar la relación en Sequelize no reemplaza esta restricción física.

### Orden correcto

Primero debe existir la tabla `educational_centers`; después se puede crear `examen_audits`, porque la segunda referencia a la primera.

## 8. Seeder: datos iniciales

El seeder que compartiste al final utilizaba un ID explícito y reajustaba la secuencia de PostgreSQL. Quedaba así:

```js
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('examen_audits', [
      {
        id: 1,
        educational_center_id: 1,
        description: 'Creación de auditoría de examen',
        operation: 'CREATE',
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {});

    if (queryInterface.sequelize.getDialect() === 'postgres') {
      await queryInterface.sequelize.query(`
        SELECT setval(
          pg_get_serial_sequence('public.examen_audits', 'id'),
          COALESCE((SELECT MAX(id) FROM public.examen_audits), 0) + 1,
          false
        );
      `);
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete(
      'examen_audits',
      { id: 1 },
      {}
    );
  }
};
```

### Qué es `setval`

En PostgreSQL, el autoincremento utiliza una **secuencia**. Si insertas manualmente `id: 1`, la secuencia podría seguir intentando generar ese mismo valor. `setval` la ajusta para que el próximo ID generado sea posterior al máximo existente.

### Variante más sencilla, recomendada para practicar

Puedes **omitir el ID explícito y todo el bloque `setval`**:

```js
await queryInterface.bulkInsert('examen_audits', [
  {
    educational_center_id: 1,
    description: 'Creación de auditoría de examen',
    operation: 'CREATE',
    created_at: new Date(),
    updated_at: new Date()
  }
], {});
```

Si utilizas esta variante, **no copies el `down` que borra `{ id: 1 }`**: el ID generado podría ser otro. Para un seeder sencillo puedes identificar el registro por una descripción de prueba única (siempre que controles que no coincide con otros datos) o guardar un identificador estable de la semilla. En el ejercicio realizado se mantuvo el ID explícito y el `down` correspondiente.

**Requisito previo:** debe existir `educational_centers.id = 1`. El seeder del centro que compartiste crea precisamente ese centro. Si cambias de entidad, averigua primero qué IDs existen; no inventes una FK.

## 9. Service: acceso a los datos

Archivo `examen-audit.service.ts`:

```ts
import { examenAudit } from "./examen-audit.model.js";

type Operation = "CREATE" | "MODIFY" | "READ" | null;

export class examenAuditService {
  static async findAll() {
    return examenAudit.findAll({ order: [["id", "ASC"]] });
  }

  static async findById(id: number) {
    return examenAudit.findByPk(id);
  }

  static async create(data: {
    educationalCenterId: number;
    description: string;
    operation?: Operation;
  }) {
    return examenAudit.create(data);
  }

  static async update(
    audit: examenAudit,
    data: {
      educationalCenterId?: number;
      description?: string;
      operation?: Operation;
    }
  ) {
    return audit.update(data);
  }

  static async delete(audit: examenAudit) {
    await audit.destroy();
  }

  static async findByOperationCreate() {
    return examenAudit.findAll({
      where: { operation: "CREATE" },
      order: [["id", "ASC"]]
    });
  }
}
```

El **service** hace consultas; no decide los códigos HTTP. La consulta especial se resuelve con `where: { operation: "CREATE" }`.

## 10. Controller: entradas y respuestas HTTP

Archivo `examen-audit.controller.ts`. Esta es una implementación **didáctica equivalente** a los métodos que trabajamos; no es una copia verificada de tu archivo final.

```ts
import { Request, Response } from "express";
import { examenAuditService } from "./examen-audit.service.js";

export class examenAuditController {
  static async getAll(req: Request, res: Response) {
    const audits = await examenAuditService.findAll();
    res.json(audits);
  }

  static async getById(req: Request, res: Response) {
    const id = Number(req.params.id);
    const audit = await examenAuditService.findById(id);
    if (!audit) {
      res.status(404).json({ message: "Auditoría no encontrada" });
      return;
    }
    res.json(audit);
  }

  static async create(req: Request, res: Response) {
    const { educationalCenterId, description, operation } = req.body;
    if (educationalCenterId == null || !description) {
      res.status(400).json({ message: "Faltan datos obligatorios" });
      return;
    }
    const audit = await examenAuditService.create({
      educationalCenterId,
      description,
      operation
    });
    res.status(201).json(audit);
  }

  static async update(req: Request, res: Response) {
    const id = Number(req.params.id);
    const audit = await examenAuditService.findById(id);
    if (!audit) {
      res.status(404).json({ message: "Auditoría no encontrada" });
      return;
    }
    await examenAuditService.update(audit, req.body);
    res.json(audit);
  }

  static async delete(req: Request, res: Response) {
    const id = Number(req.params.id);
    const audit = await examenAuditService.findById(id);
    if (!audit) {
      res.status(404).json({ message: "Auditoría no encontrada" });
      return;
    }
    await examenAuditService.delete(audit);
    res.status(204).send();
  }

  static async getByOperationCreate(req: Request, res: Response) {
    const audits = await examenAuditService.findByOperationCreate();
    res.json(audits);
  }
}
```

**Nota importante:** en una aplicación real conviene validar `id` numérico, tipos, valores del ENUM, existencia del centro y gestionar errores asíncronos. Para seguir el estilo del proyecto, mira si los controllers existentes usan `try/catch`, middleware de errores o un wrapper: **imita ese patrón**. Si el servidor devuelve 500, consulta siempre su terminal.

## 11. Routes y registro general

Archivo `examen-audit.routes.ts`:

```ts
import { Router } from "express";
import { examenAuditController } from "./examen-audit.controller.js";

const router = Router();

router.get("/", examenAuditController.getAll);
router.get("/operation/create", examenAuditController.getByOperationCreate);
router.get("/:id", examenAuditController.getById);
router.post("/", examenAuditController.create);
router.put("/:id", examenAuditController.update);
router.delete("/:id", examenAuditController.delete);

export default router;
```

**El orden importa:** coloca `/operation/create` antes de `/:id`, para que Express no interprete `operation` como un identificador.

En `src/routes/index.ts` importa el router y regístralo siguiendo el patrón existente:

```ts
router.use("/examen-audits", examenAuditRoutes);
```

En `app.ts`, el router general ya se montaba bajo `/api`, por eso las URLs finales empiezan por `/api/examen-audits`.

## 12. Ejecutar migraciones y seeders

Desde `backend`:

```bash
npm run db:migrate
npm run db:seed
npm run dev
```

En el proyecto, según las salidas reales de terminal:

- `npm run db:migrate` ejecutaba `cd database && sequelize-cli db:migrate`.
- `npm run db:seed` ejecutaba `cd database && sequelize-cli db:seed:all`.
- `npm run dev` iniciaba el backend con `tsx watch src/server.ts`.

**No ejecutes seeders a ciegas** si ya están aplicados: el comando `db:seed:all` puede ejecutar todos los seeders pendientes, según la configuración de seguimiento del proyecto.

### Si cambias una migración después de ejecutarla

**Editar el `.js` no cambia automáticamente una tabla ya creada.** En una base de datos de pruebas, y solo si esa migración es la última, puedes hacer:

```bash
cd database
npx sequelize-cli db:seed:undo --seed 20261121142846-seed-examen-audits.js
npx sequelize-cli db:migrate:undo
cd ..
npm run db:migrate
npm run db:seed
```

- Antes de deshacer el seeder, confirma que está aplicado y que su `down` es seguro.
- `db:migrate:undo` deshace **la última migración aplicada**, no necesariamente la que tú tienes en mente. Comprueba su nombre.
- Si el seeder falló sin registrarse, no hace falta deshacerlo, pero verifica que no insertó datos parciales.
- **Nunca uses `undo:all` sin entender sus efectos**, especialmente en un proyecto compartido.
- En un entorno con datos importantes se crea una nueva migración correctiva, en lugar de borrar y recrear tablas.

## 13. Bruno: pruebas del CRUD

Servidor: `http://localhost:3000`.

| Orden | Método | URL | Resultado esperado |
|---|---|---|---|
| 1 | GET | `/api/examen-audits` | `200`, array de auditorías |
| 2 | POST | `/api/examen-audits` | `201`, auditoría creada |
| 3 | GET | `/api/examen-audits/ID` | `200`, auditoría por ID |
| 4 | PUT | `/api/examen-audits/ID` | `200`, auditoría actualizada |
| 5 | GET | `/api/examen-audits/operation/create` | `200`, solo operaciones `CREATE` |
| 6 | DELETE | `/api/examen-audits/ID` | `204`, sin cuerpo |
| 7 | GET | `/api/examen-audits/ID` | `404`, ya no existe |

Sustituye `ID` por el ID **real** devuelto por el POST; no presupongas que será `2`.

**POST** · Body → JSON:

```json
{
  "educationalCenterId": 1,
  "description": "Auditoría creada desde Bruno",
  "operation": "CREATE"
}
```

**PUT** · Body → JSON:

```json
{
  "description": "Auditoría modificada desde Bruno",
  "operation": "MODIFY"
}
```

**GET especial**:

```http
GET http://localhost:3000/api/examen-audits/operation/create
```

Si cambiaste el registro de prueba a `MODIFY`, ya no debe salir en este filtro; el registro del seeder con `CREATE` sí debería salir.

### Pruebas extra para aprender a hacerlo solo

- POST sin `description` → debe rechazarse.
- POST con `operation: "OTRA"` → debe rechazarse.
- POST con `operation: null` → debe permitirse si el resto es válido.
- POST con `educationalCenterId` inexistente → debe rechazarse por la FK (idealmente con respuesta HTTP clara).
- GET por un ID inexistente → `404`.

Estas pruebas adicionales ayudan a verificar restricciones, aunque el examen solo exigiera CRUD funcional.

## 14. Capturas y entrega

Guarda las evidencias en `docs/screenshots/`:

```text
docs/screenshots/
├── examen-audits-migration.png
├── examen-audits-seeder.png
└── examen-audits-create.png
```

- **Migración:** terminal mostrando `create-examen-audits: migrated`.
- **Seeder:** terminal mostrando `seed-examen-audits: migrated`.
- **Filtro CREATE:** Bruno con URL, respuesta y registros filtrados.

Las capturas deben reflejar ejecuciones reales, no salidas escritas a mano. Comprueba también que el enunciado exige la rama correcta. No hagas `git push` salvo que te lo pidan.

---

# PARTE II. GUÍA COMPLETA PARA RELACIONES N:M (MUCHOS A MUCHOS)

## 15. Primero entiende qué cambia

Una relación **N:M** significa que:

- Un elemento de la tabla A puede relacionarse con **muchos** de la tabla B.
- Un elemento de la tabla B puede relacionarse con **muchos** de la tabla A.

**Ejemplo didáctico:** una auditoría `examenAudit` puede tener varias etiquetas `examenTag` y una etiqueta puede aparecer en varias auditorías.

```text
examen_audits                 examen_audit_tags                  examen_tags
--------                 ----------------                --------
id (PK)      1 ------ N   examen_audit_id (FK)    N ------ 1  id (PK)
description              examen_tag_id (FK)                   name
                         created_at
                         updated_at
```

La relación N:M se representa mediante **dos relaciones 1:N** y una **tabla intermedia**.

### Comparación con el ejercicio anterior

| Relación 1:N | Relación N:M |
|---|---|
| Una FK en la tabla hija | Una tabla intermedia con dos FK |
| `hasMany` + `belongsTo` | `belongsToMany` en ambos modelos |
| Una migración para la entidad nueva | Migración para la tabla intermedia (y para tablas principales si no existen) |
| Seeder con una FK | Seeder de unión con **dos** FK válidas |
| CRUD de una entidad | CRUD de la entidad y/o CRUD de las **relaciones**, según el enunciado |

## 16. Antes de programar: las cinco preguntas

1. **¿Qué dos entidades se relacionan?** Por ejemplo `examenAudit` y `examenTag`.
2. **¿Existen ya sus tablas?** Si existen, no las vuelvas a crear.
3. **¿Cómo se llamará la tabla intermedia?** Aquí: `examen_audit_tags`.
4. **¿La relación tiene datos propios?** Por ejemplo `linkedAt`, `status` o `priority`. Si los tiene, la tabla intermedia es una entidad con atributos propios.
5. **¿Qué CRUD pide el profesor?** Puede pedir CRUD de etiquetas, CRUD de vínculos auditoría-etiqueta, asignar/quitar relaciones o consultar entidades relacionadas. **No son exactamente lo mismo.**

**Regla para el examen:** lee primero el enunciado y determina qué entidad necesita endpoints. No inventes un CRUD que no se haya pedido, pero sí verifica que puedes crear y consultar la relación.

## 16 bis. Crear la entidad nueva `examenTag` (no es de ningún compañero)

En este ejemplo utilizamos **tu propia entidad `examenAudit`**, que ya creaste en el examen, y una **entidad nueva de práctica**, `examenTag` (etiqueta de auditoría). No reutilizamos `student`, `course` ni entidades de tus compañeros. `examenTag` es un ejemplo propuesto para aprender: **no existe necesariamente en tu repositorio y no debes añadirlo salvo para practicar o si el enunciado lo pide**.

El modelo existente `examenAudit` se conserva con su relación 1:N a `educationalCenter`. Añadir una relación N:M con etiquetas **no sustituye** esa relación anterior.

**Modelo nuevo** `src/modules/examen-tags/examen-tag.model.ts`:

```ts
import { Model, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional } from "sequelize";
import { sequelize } from "../../config/database.js";

export class examenTag extends Model<InferAttributes<examenTag>, InferCreationAttributes<examenTag>> {
  declare id: CreationOptional<number>;
  declare name: string;
}

examenTag.init({
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING(100), allowNull: false, unique: true }
}, {
  sequelize,
  tableName: "examen_tags",
  modelName: "examenTag",
  timestamps: true
});
```

**Migración de `examen_tags`** (debe ejecutarse antes que la migración de unión):

```js
'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("examen_tags", {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      name: { type: Sequelize.STRING(100), allowNull: false, unique: true },
      created_at: { type: Sequelize.DATE },
      updated_at: { type: Sequelize.DATE }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("examen_tags");
  }
};
```

**Seeder de etiquetas**, después de migrar `examen_tags`:

```js
'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("examen_tags", [
      { name: "Revisión", created_at: new Date(), updated_at: new Date() },
      { name: "Importante", created_at: new Date(), updated_at: new Date() }
    ], {});
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("examen_tags", {
      name: ["Revisión", "Importante"]
    }, {});
  }
};
```

**Antes de insertar relaciones**, consulta los IDs reales de las etiquetas y auditorías: no supongas que las etiquetas tienen ID 1 y 2 si ya había datos. En los ejemplos de Bruno de abajo, los IDs son ilustrativos.

## 17. Modelo de la tabla intermedia

**Suposición del ejemplo:** `examenAudit` ya existe por la Parte I y acabas de crear `examenTag` siguiendo el apartado 16 bis. Creamos una entidad explícita `examenAuditTag` para gestionar relación auditoría-etiquetas desde Bruno.

Archivo `examen-audit-tag.model.ts`:

```ts
import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional
} from "sequelize";
import { sequelize } from "../../config/database.js";

export class examenAuditTag extends Model<
  InferAttributes<examenAuditTag>,
  InferCreationAttributes<examenAuditTag>
> {
  declare id: CreationOptional<number>;
  declare examenAuditId: number;
  declare examenTagId: number;
}

examenAuditTag.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    examenAuditId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "examen_audits", key: "id" }
    },
    examenTagId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "examen_tags", key: "id" }
    }
  },
  {
    sequelize,
    tableName: "examen_audit_tags",
    modelName: "examenAuditTag",
    timestamps: true
  }
);
```

Este modelo utiliza una PK `id` **por sencillez**. Otra opción válida es una PK compuesta (`examenAuditId`, `examenTagId`), pero no mezcles ambas estrategias sin necesidad.

### Evitar relación auditoría-etiquetas duplicadas

Para evitar asignar dos veces la misma etiqueta a la misma auditoría, impón una restricción **única sobre el par** `(examenAuditId, examenTagId)`. Una auditoría puede tener etiquetas distintas y una etiqueta puede pertenecer a auditorías distintas.

## 18. Asociaciones `belongsToMany`

En `associations.ts`, importa `examenAudit` (ya existente), `examenTag` y `examenAuditTag` desde sus rutas reales. Después añade estas asociaciones **sin quitar** `educationalCenter.hasMany(examenAudit)` ni `examenAudit.belongsTo(educationalCenter)`:

```ts
examenAudit.belongsToMany(examenTag, {
  through: examenAuditTag,
  foreignKey: "examenAuditId",
  otherKey: "examenTagId"
});

examenTag.belongsToMany(examenAudit, {
  through: examenAuditTag,
  foreignKey: "examenTagId",
  otherKey: "examenAuditId"
});
```

- `through` indica **qué tabla/modelo intermedio** se usa.
- `foreignKey` es la FK de la entidad desde la que se declara la asociación.
- `otherKey` es la FK de la entidad del otro lado.

**Si también quieres consultar directamente las relación auditoría-etiquetas por ID**, añade asociaciones de la tabla intermedia con ambos extremos:

```ts
examenAudit.hasMany(examenAuditTag, { foreignKey: "examenAuditId" });
examenAuditTag.belongsTo(examenAudit, { foreignKey: "examenAuditId" });

examenTag.hasMany(examenAuditTag, { foreignKey: "examenTagId" });
examenAuditTag.belongsTo(examenTag, { foreignKey: "examenTagId" });
```

No reemplazan `belongsToMany`: sirven para tratar la fila intermedia como una entidad consultable por sí misma.

**Importante:** adapta `examenAudit`, `examenTag`, sus nombres de tabla y sus imports a las entidades **reales** del ejercicio. Si una asociación de otro módulo ya existe, no la dupliques.

## 19. Migración N:M: crear la tabla intermedia

Si el proyecto usa la misma convención física `snake_case` que observamos en el examen:

```js
'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("examen_audit_tags", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      examen_audit_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "examen_audits", key: "id" }
      },
      examen_tag_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "examen_tags", key: "id" }
      },
      created_at: { type: Sequelize.DATE },
      updated_at: { type: Sequelize.DATE }
    });

    await queryInterface.addConstraint("examen_audit_tags", {
      fields: ["examen_audit_id", "examen_tag_id"],
      type: "unique",
      name: "examen_audit_tags_pair_unique"
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("examen_audit_tags");
  }
};
```

**Requisitos:** las tablas `examen_audits` y `examen_tags` tienen que existir antes. Los tipos de ambas FK deben ser compatibles con sus PK. En PostgreSQL no copies ciegamente `INTEGER` si el ID real usa otro tipo (por ejemplo, UUID).

**Nota sobre nombres:** en otro repositorio pueden existir columnas `examenAuditId` y `examenTagId` directamente. La migración debe coincidir con el SQL que genera Sequelize; el ejemplo supone que los modelos convierten a `snake_case`, igual que ocurrió en nuestro examen.

### Si la tabla intermedia tiene más campos

Por ejemplo, una fecha de relación auditoría-etiqueta y un estado:

```ts
// En la clase del modelo
// declare linkedAt: Date;
// declare status: "ACTIVE" | "CANCELLED";
```

Y en `init`:

```ts
linkedAt: { type: DataTypes.DATE, allowNull: false },
status: {
  type: DataTypes.ENUM("ACTIVE", "CANCELLED"),
  allowNull: false
}
```

La migración necesitaría columnas equivalentes (`linked_at`, `status`) y el seeder tendría que rellenarlas. **No añadas atributos sin que los pida el enunciado.**

## 20. Seeder N:M: primero los extremos, luego la relación

El orden importa:

```text
1. Seeder de examen_audits
2. Seeder de examen_tags
3. Seeder de examen_audit_tags
```

Ejemplo de seeder de unión, **suponiendo que ya existen** `examenAudit.id = 1` y `examenTag.id = 1`:

```js
'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('examen_audit_tags', [
      {
        examen_audit_id: 1,
        examen_tag_id: 1,
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('examen_audit_tags', {
      examen_audit_id: 1,
      examen_tag_id: 1
    }, {});
  }
};
```

En este ejemplo **no asignamos `id` manualmente**, así que no necesitamos `setval`.

**Atención:** el `down` por pareja solo es seguro si esa pareja es exclusiva de los datos sembrados. Si ya existía o puede haber sido modificada por otra persona, usa datos de prueba identificables y una estrategia de rollback adecuada.

## 21. Service N:M: CRUD de la tabla intermedia

Si el profesor pide un CRUD de relación auditoría-etiquetas, puedes tratar `examenAuditTag` como cualquier entidad. Archivo `examen-audit-tag.service.ts`:

```ts
import { examenAuditTag } from "./examen-audit-tag.model.js";

export class examenAuditTagService {
  static async findAll() {
    return examenAuditTag.findAll({ order: [["id", "ASC"]] });
  }

  static async findById(id: number) {
    return examenAuditTag.findByPk(id);
  }

  static async create(data: { examenAuditId: number; examenTagId: number }) {
    return examenAuditTag.create(data);
  }

  static async update(
    link: examenAuditTag,
    data: { examenAuditId?: number; examenTagId?: number }
  ) {
    return link.update(data);
  }

  static async delete(link: examenAuditTag) {
    await link.destroy();
  }

  static async findByExamenAuditId(examenAuditId: number) {
    return examenAuditTag.findAll({ where: { examenAuditId } });
  }
}
```

Esto permite consultar, crear, modificar y borrar **filas de la tabla intermedia**. No implica crear ni borrar auditorías ni etiquetas.

### Alternativa: usar la asociación directamente

Cuando el enunciado pide «asignar una etiqueta a una auditoría» sin exigir CRUD de la tabla intermedia, Sequelize también ofrece métodos de asociación (por ejemplo, `addExamenTag`), pero dependen de cómo hayas definido y tipado los modelos. **Para un examen con CRUD de la entidad intermedia, usar su service explícito suele resultar más fácil de seguir y probar.**

## 22. Controller N:M

Ejemplo de controller sencillo para el CRUD de `examenAuditTag`:

```ts
import { Request, Response } from "express";
import { examenAuditTagService } from "./examen-audit-tag.service.js";

export class examenAuditTagController {
  static async getAll(req: Request, res: Response) {
    res.json(await examenAuditTagService.findAll());
  }

  static async getById(req: Request, res: Response) {
    const link = await examenAuditTagService.findById(Number(req.params.id));
    if (!link) {
      res.status(404).json({ message: "Relación auditoría-etiqueta no encontrada" });
      return;
    }
    res.json(link);
  }

  static async create(req: Request, res: Response) {
    const { examenAuditId, examenTagId } = req.body;
    if (examenAuditId == null || examenTagId == null) {
      res.status(400).json({ message: "Faltan datos obligatorios" });
      return;
    }
    const link = await examenAuditTagService.create({ examenAuditId, examenTagId });
    res.status(201).json(link);
  }

  static async update(req: Request, res: Response) {
    const link = await examenAuditTagService.findById(Number(req.params.id));
    if (!link) {
      res.status(404).json({ message: "Relación auditoría-etiqueta no encontrada" });
      return;
    }
    await examenAuditTagService.update(link, req.body);
    res.json(link);
  }

  static async delete(req: Request, res: Response) {
    const link = await examenAuditTagService.findById(Number(req.params.id));
    if (!link) {
      res.status(404).json({ message: "Relación auditoría-etiqueta no encontrada" });
      return;
    }
    await examenAuditTagService.delete(link);
    res.status(204).send();
  }

  static async getByExamenAuditId(req: Request, res: Response) {
    res.json(await examenAuditTagService.findByExamenAuditId(Number(req.params.examenAuditId)));
  }
}
```

**Para producción o una rúbrica más exigente:** valida que los IDs sean enteros, que las dos entidades existan, que la pareja no esté duplicada y que los errores de FK/únicos se traduzcan a respuestas `400`, `404` o `409` según corresponda. Sigue el patrón de gestión de errores existente en tu proyecto. Este ejemplo es una base didáctica, no un controller endurecido.

## 23. Routes N:M

```ts
import { Router } from "express";
import { examenAuditTagController } from "./examen-audit-tag.controller.js";

const router = Router();

router.get("/", examenAuditTagController.getAll);
router.get("/examenAudit/:examenAuditId", examenAuditTagController.getByExamenAuditId);
router.get("/:id", examenAuditTagController.getById);
router.post("/", examenAuditTagController.create);
router.put("/:id", examenAuditTagController.update);
router.delete("/:id", examenAuditTagController.delete);

export default router;
```

Registra el router general:

```ts
router.use("/examen-audit-tags", examenAuditTagRoutes);
```

En `server.ts`, importa los dos modelos nuevos (`examen-tag.model.js` y `examen-audit-tag.model.js`) antes de llamar a `defineAssociations()`, siguiendo el patrón existente. En `src/routes/index.ts`, importa el router de la tabla intermedia antes de usarlo. Mantén las rutas específicas antes de `/:id`.

## 24. Bruno para N:M

**POST** `http://localhost:3000/api/examen-audit-tags`

```json
{
  "examenAuditId": 1,
  "examenTagId": 1
}
```

**GET** `http://localhost:3000/api/examen-audit-tags`

**GET por ID** `http://localhost:3000/api/examen-audit-tags/ID`

**PUT** `http://localhost:3000/api/examen-audit-tags/ID`

```json
{
  "examenTagId": 2
}
```

Para este PUT tiene que existir `examenTag.id = 2`, y no puede existir ya la pareja `(examenAuditId, 2)` si hay restricción única.

**GET especial** `http://localhost:3000/api/examen-audit-tags/examenAudit/1`

**DELETE** `http://localhost:3000/api/examen-audit-tags/ID`

**Prueba imprescindible N:M:** crea dos vínculos con el mismo `examenAuditId` y distintos `examenTagId`, y otros dos con el mismo `examenTagId` y distintos `examenAuditId`. Necesitas al menos dos auditorías y dos etiquetas existentes. Así demuestras los dos lados de la relación. Repetir exactamente el mismo par debe fallar si configuraste la restricción única.

## 25. Consultar los objetos relacionados (`include`)

Una tabla intermedia demuestra la relación, pero a veces el profesor pide «mostrar las etiquetas de una auditoría» o «mostrar las auditorías de una etiqueta».

Con `belongsToMany` configurado correctamente, puedes utilizar `include`:

```ts
// En un service, usando los modelos importados
return examenAudit.findByPk(examenAuditId, {
  include: [examenTag]
});
```

Esto obtiene una auditoría junto a sus etiquetas asociadas. La consulta inversa sería:

```ts
return examenTag.findByPk(examenTagId, {
  include: [examenAudit]
});
```

**No confundas:** `findAll({ where: { examenAuditId } })` sobre `examenAuditTag` devuelve **filas de la tabla intermedia**; `examenAudit.findByPk(..., { include: [examenTag] })` devuelve la **auditoría con sus etiquetas**.

Si tus asociaciones usan `as` (alias), deberás utilizar el mismo alias en `include`. Consulta las asociaciones existentes del repositorio antes de copiarlo.

## 26. Variante N:M sin ID propio: clave primaria compuesta

Otra forma habitual de modelar la tabla intermedia es que las dos FK formen juntas la PK:

```text
examen_audit_tags
--------------------
examen_audit_id (PK, FK)
examen_tag_id  (PK, FK)
created_at
updated_at
```

En ese caso **no existe `id`**, por lo que no puedes usar `findByPk(1)` como en el ejemplo anterior. Tendrías que consultar o borrar por ambas claves:

```ts
await examenAuditTag.findOne({
  where: { examenAuditId: 1, examenTagId: 2 }
});
```

**Decisión práctica:** si el profesor pide un CRUD con `GET /:id`, un `id` autoincremental más una restricción única sobre la pareja suele ser más fácil de manejar. Si exige PK compuesta, respeta el enunciado.

## 27. Qué cambia si el examen pide una entidad nueva N:M

Supongamos que en vez de `ExamenAudit` te piden `ExamenTag`, y que cada auditoría puede tener varias etiquetas y cada etiqueta varias auditorías.

Necesitarías, según lo que ya exista:

1. Modelo/tabla `examen_tags` para las etiquetas.
2. Modelo/tabla intermedia `examen_audit_tags` con `examen_audit_id` y `examen_tag_id`.
3. `examenAudit.belongsToMany(examenTag, { through: examenAuditTag, ... })` y la asociación inversa.
4. Migraciones ordenadas: primero tablas principales, después tabla intermedia.
5. Seeders ordenados: primero auditorías y etiquetas, después sus relaciones.
6. Service/controller/routes de la entidad que el enunciado exija gestionar.
7. Pruebas que demuestren **muchas etiquetas por auditoría y muchas auditorías por etiqueta**.

No basta con cambiar `hasMany` por `belongsToMany`: hay que crear y poblar la **tabla intermedia**.

---

# PARTE III. DIAGNÓSTICO, ERRORES Y MÉTODO DE TRABAJO

## 28. El error real que tuvimos: `created_At`

En nuestro examen la migración llegó a tener:

```js
created_At: { type: Sequelize.DATE },
updated_At: { type: Sequelize.DATE }
```

Pero el seeder insertaba:

```js
created_at: new Date(),
updated_at: new Date()
```

PostgreSQL respondió:

```text
ERROR: no existe la columna «created_at» en la relación «examen_audits»
```

**Solución:** corregir la migración a `created_at` y `updated_at`, deshacer únicamente la migración del examen y ejecutarla de nuevo antes del seeder.

**Lección:** en PostgreSQL, `created_At` y `created_at` no son lo mismo cuando se crean como identificadores entrecomillados por Sequelize. Una sola mayúscula puede romper el seeder.

## 29. Otro error real: la consulta pedía `educational_center_id`

El GET devolvía `500` y la terminal mostraba:

```sql
SELECT "id",
       "educational_center_id" AS "educationalCenterId",
       "description",
       "operation",
       "created_at" AS "createdAt",
       "updated_at" AS "updatedAt"
FROM "examen_audits" AS "examenAudit";
```

Y el error:

```text
SequelizeDatabaseError: no existe la columna «educational_center_id»
```

**Diagnóstico correcto:** comparar **el SQL que Sequelize está ejecutando** con **las columnas que creó la migración**. No cambies el controller ni el JSON de Bruno si el fallo es una columna física de PostgreSQL.

## 30. Tabla rápida de errores

| Síntoma | Qué revisar | Solución habitual |
|---|---|---|
| `500 Internal Server Error` | Terminal del backend | Leer el error real; 500 es solo el síntoma. |
| `column does not exist` | Modelo, configuración de nombres, migración, seeder | Igualar los nombres físicos. |
| `relation does not exist` | Nombre de tabla y migraciones aplicadas | Ejecutar la migración correcta. |
| `foreign key constraint` | IDs referenciados y orden de seeders | Crear primero las entidades padre. |
| `duplicate key value` | IDs manuales, secuencias o pareja N:M repetida | Revisar `setval`, IDs y restricciones únicas. |
| `invalid input value for enum` | Valor de `operation` | Utilizar uno de los valores permitidos. |
| `404 Not Found` | Ruta, prefijo `/api`, ID | Comprobar URL y existencia del registro. |
| `Cannot POST /...` | Registro del router y método HTTP | Revisar `routes.ts` e `index.ts`. |
| Seeder falla tras cambiar migración | Tabla antigua sigue creada | Deshacer/reaplicar **solo** la migración afectada, si es seguro. |
| N:M devuelve datos vacíos | Asociación, `through`, FKs, datos intermedios | Revisar ambos lados y registros de la tabla intermedia. |

## 31. Orden universal para resolver un ejercicio nuevo

### Fase A. Analizar (antes de escribir código)

- [ ] Leer el enunciado y anotar campos, tipos, obligatoriedad, PK y FK.
- [ ] Identificar si es 1:N o N:M.
- [ ] Ver qué modelos y tablas existen ya.
- [ ] Elegir nombre de entidad, tabla, carpeta y rutas.
- [ ] Comprobar la convención de columnas (`camelCase`/`snake_case`).
- [ ] Comprobar el orden de migraciones y seeders.

### Fase B. Programar

- [ ] Crear el modelo con los tipos y restricciones.
- [ ] Registrar asociaciones.
- [ ] Asegurar que el servidor carga los modelos.
- [ ] Crear la migración con FK reales.
- [ ] Crear el seeder con referencias a IDs existentes.
- [ ] Crear service.
- [ ] Crear controller.
- [ ] Crear routes.
- [ ] Registrar el router en el router general.
- [ ] Añadir el endpoint especial que pida el ejercicio.

### Fase C. Ejecutar y probar

- [ ] Revisar `.env.development` y la base de datos correcta.
- [ ] Ejecutar migración y leer su salida.
- [ ] Ejecutar seeder y leer su salida.
- [ ] Arrancar servidor.
- [ ] GET general.
- [ ] POST y guardar ID real.
- [ ] GET por ID.
- [ ] PUT.
- [ ] GET especial.
- [ ] DELETE.
- [ ] Probar un dato inválido y un ID inexistente.
- [ ] Guardar capturas exigidas.
- [ ] Revisar `git status` y evitar incluir secretos.

## 32. Plantilla para adaptar a cualquier entidad

Rellena esto antes de programar:

```text
NOMBRE DEL EJERCICIO:

ENTIDAD NUEVA (clase):
TABLA FÍSICA:
CARPETA DEL MÓDULO:

RELACIÓN: 1:N / N:M
ENTIDAD A:
ENTIDAD B:
TABLA INTERMEDIA (solo N:M):

CAMPOS:
- id:
- campo 1 / tipo / obligatorio:
- campo 2 / tipo / obligatorio:
- FK 1 / tabla destino:
- FK 2 / tabla destino (solo N:M):

COLUMNAS REALES EN POSTGRESQL:
- campo TS -> columna SQL:
- createdAt ->
- updatedAt ->

ENDPOINTS:
- GET general:
- GET por ID:
- POST:
- PUT:
- DELETE:
- GET especial:

SEEDER:
- Qué registro crea:
- Qué IDs deben existir antes:

CAPTURAS EXIGIDAS:
- 
```

## 33. Tres ejercicios para practicar solo

**Nivel 1 — 1:N:** crear `centerNote`, con `educationalCenterId`, `text` obligatorio y `priority` opcional (`LOW`, `MEDIUM`, `HIGH`). Implementar CRUD y GET de prioridad `HIGH`.

**Nivel 2 — N:M básica:** relacionar tu `examenAudit` con `examenTag` mediante `examen_audit_tags`, con dos FK y restricción única por pareja. Vincular una auditoría a dos etiquetas y consultar sus vínculos.

**Nivel 3 — N:M con atributos:** añadir a una tabla intermedia un campo `status` (`ACTIVE`, `CANCELLED`) y crear un endpoint que filtre por `ACTIVE`. Adaptar modelo, migración, seeder, service, controller, routes y Bruno.

Para practicar, haz estos ejercicios **en una rama y base de datos de pruebas separadas**, sin afectar a la entrega.

## 34. Resumen para memorizar

```text
1:N
  -> FK en la tabla del lado N
  -> hasMany + belongsTo
  -> Seeder de la hija usa un ID del padre

N:M
  -> Tabla intermedia con dos FK
  -> belongsToMany + belongsToMany
  -> Seeder de la tabla intermedia usa dos IDs existentes
  -> Evitar parejas duplicadas

EN AMBOS CASOS
  -> Modelo + asociaciones + migración + seeder
  -> Service + controller + routes + registro general
  -> Migrar -> sembrar -> arrancar -> Bruno -> capturas
  -> Si falla, leer terminal y comparar SQL con migración
```

---

**Nota final:** el código del caso 1:N recoge lo trabajado en esta conversación y los fragmentos que compartiste. El código N:M es un **ejemplo de aprendizaje** que tendrás que adaptar a los nombres, tablas, modelos y convenciones reales del siguiente ejercicio. No se ha ejecutado ni probado contra tu repositorio desde esta guía.
