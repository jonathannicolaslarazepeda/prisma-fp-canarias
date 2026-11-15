# 🧭 GUÍA DE SUPERVIVENCIA DEL EXAMEN — PRISMA FP CANARIAS

**Para mí, explicado paso a paso y sin dar nada por sabido.**  
**Examen:** lunes 16 de noviembre de 2026 · **Máquina:** IsardVDI, `DSW-PRUEBA-EXAMEN-20261116` · **Rama indicada:** `sprint-1`.

> **LEE ESTO PRIMERO.** Esta guía se ha preparado mirando el ZIP de `develop` del equipo (6 de noviembre), NO la rama `sprint-1` del examen. En el examen, **el código de `sprint-1` manda**: si algún nombre, ruta o comando no coincide, usa el que aparezca allí. No sabemos qué ejercicio exacto pondrá el profesor. **Consulta esta guía durante el examen solo si está permitido.**

---

## 🆘 0. SI ME BLOQUEO, HAGO ESTO

**No improviso. Busco la frase del enunciado y sigo esta tabla:**

| Si el profesor dice… | Voy a… | Sección |
|---|---|---|
| «Crea un modelo / entidad» | Crear `.model.ts`, migración y registrar modelo | **5** |
| «Añade un campo / modifica un modelo» | Cambiar modelo **y** crear migración nueva | **6** |
| «Relaciona A con B» | Añadir clave foránea y asociaciones | **7** |
| «Crea una migración» | Archivo en `database/migrations`, `up` y `down` | **8** |
| «Crea un seeder» | Archivo en `database/seeders`, `bulkInsert` y `bulkDelete` | **9** |
| «Prueba endpoints con Bruno» | Arrancar servidor, elegir GET/POST/PUT/DELETE y enviar | **10** |
| «No funciona» | Mirar error y consultar diagnóstico | **12** |
| «Entrega el trabajo» | Comprobar cambios y seguir instrucciones del profesor | **13** |

**Orden mental:** ¿qué me piden? → ¿qué archivo se cambia? → ¿qué comando lo comprueba? → ¿qué resultado debería ver?

**Regla de oro:** nunca ejecutes un comando que borra o revierte datos solo por probar. No hagas `git reset --hard`, `git clean -fd`, `db:migrate:undo` ni `db:seed:undo` sin saber sus consecuencias.

---

## 1. ENTENDER QUÉ ES CADA COSA (SIN TECNICISMOS)

Imagina que la base de datos es un archivador:

- **Modelo (`.model.ts`)** = el plano que usa TypeScript para describir una ficha. Por ejemplo: un centro tiene `id`, `name`, `code`…
- **Migración (`database/migrations`)** = la obra real que construye o cambia las tablas del archivador. Si añado `capacity` al modelo pero NO a la base de datos, fallará.
- **Seeder (`database/seeders`)** = meter fichas de ejemplo en una tabla que **ya existe**.
- **Relación** = conectar fichas. Por ejemplo: un centro tiene varios ciclos; cada ciclo pertenece a un centro.
- **Endpoint** = puerta por la que se pide información al backend. `GET` lee, `POST` crea, `PUT` modifica, `DELETE` borra.
- **Bruno** = programa que utilizo para llamar a esas puertas y comprobar qué responde el servidor.
- **Controlador/servicio** = código que recibe la petición y decide qué hacer con los datos.
- **`sprint-1`** = rama de Git que ha indicado el profesor; NO es lo mismo que `develop`.

### La diferencia que más importa

**Añadir un campo** normalmente exige **DOS CAMBIOS**:

1. Modelo: para que Sequelize conozca el campo.
2. Migración: para que PostgreSQL tenga esa columna de verdad.

Y si el campo debe entrar por POST/PUT, **también** hay que mirar controlador/servicio y posibles validaciones.

---

## 2. PRIMEROS 10 MINUTOS DEL EXAMEN: ABRIR TODO

### PASO 2.1 — Abrir la máquina de IsardVDI

Entra en `DSW-PRUEBA-EXAMEN-20261116`. Abre una terminal. **Lee primero el enunciado completo**; no empieces a modificar cosas a ciegas.

### PASO 2.2 — Clonar el repositorio

En una carpeta donde quieras trabajar:

```bash
git clone https://github.com/jonathannicolaslarazepeda/prisma-fp-canarias.git
cd prisma-fp-canarias
```

**¿Qué hace?** Descarga una copia del proyecto y entra en ella. **No cambia el GitHub del equipo**.

Si ya está clonado, **no lo clones encima**. Entra en la carpeta existente.

### PASO 2.3 — Ver qué ramas existen

```bash
git fetch origin
git branch -a
```

Busca `remotes/origin/sprint-1`.

### PASO 2.4 — Cambiar a la rama del examen

```bash
git switch sprint-1
```

Si dice que no existe localmente pero ves `origin/sprint-1`:

```bash
git switch --track origin/sprint-1
```

**Comprueba SIEMPRE:**

```bash
git branch --show-current
git status
```

Debe decir `sprint-1` y, al principio, idealmente `working tree clean`.

> **Importante:** el profesor ha dicho que usaréis `sprint-1`. No crees otra rama ni hagas `push` a esa rama compartida salvo que lo indique expresamente.

### PASO 2.5 — Encontrar el backend

En el ZIP de `develop` había una carpeta interior con el mismo nombre del proyecto:

```text
carpeta clonada/
└── prisma-fp-canarias/
    └── backend/
```

Compruébalo:

```bash
ls
ls prisma-fp-canarias/backend
cd prisma-fp-canarias/backend
pwd
```

Si la estructura del examen cambia, **adapta el `cd`**. Sabes que estás en backend si ves `package.json`, `src/` y `database/`.

### PASO 2.6 — Instalar y comprobar comandos

```bash
npm install
cat package.json
```

En el ZIP analizado los scripts son:

```bash
npm run dev                # Arrancar servidor en desarrollo
npm run build              # Comprobar TypeScript
npm run db:migrate:status  # Ver migraciones ejecutadas
npm run db:migrate         # Ejecutar migraciones pendientes
npm run db:seed            # Ejecutar seeders pendientes
```

**No ejecutes todos automáticamente**: comprueba primero que la base de datos está configurada y qué pide el examen.

### PASO 2.7 — Variables de entorno y base de datos

Busca `.env.development`, `.env.test`, `.env.example`:

```bash
ls -a
```

Comprueba **sin compartir contraseñas** que existen las variables `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER`, `DB_PASSWORD` y `DB_DIALECT`. El ZIP utiliza PostgreSQL y su configuración de migraciones lee `.env.development` y `.env.test`.

Si no conecta, pregunta por las credenciales del despliegue; **no inventes contraseñas**.

---

## 3. MAPA DE MIS 6 ENTIDADES (PARA SABER DÓNDE ESTOY)

Estas son las **seis entidades que conozco**. Los nombres se han comprobado en el ZIP de `develop`.

| Entidad | Carpeta de código | Tabla del modelo | ¿Qué representa? |
|---|---|---|---|
| Centro educativo | `educational-centers` | `educational_centers` | Instituto o centro |
| Curso académico | `academic-years` | `academic_years` | Año 2025-2026 |
| Familia profesional | `professional-families` | `professional_families` | Sanidad, Informática… |
| Ciclo formativo | `training-programs` | `training_programs` | Un ciclo impartido en un centro |
| Asignación de tutor | `tutor-assignments` | `tutor_assignments` | Tutor asignado a un ciclo en un curso |
| Matrícula | `students-enrollments` | `student_enrollments` **en el modelo** | Alumno matriculado en ciclo y curso |

**OJO CON MATRÍCULAS:** el ZIP tiene una discrepancia: el modelo dice `student_enrollments`, pero una migración crea `students_enrollments`. **Comprueba la rama `sprint-1` antes de usar uno de esos nombres.**

### ¿Dónde están sus archivos?

Ejemplo de **centros educativos**:

```text
backend/
├── src/
│   ├── modules/
│   │   └── educational-centers/
│   │       ├── educational-center.model.ts       ← campos y tipos
│   │       ├── educational-center.routes.ts      ← GET/POST/PUT/DELETE
│   │       ├── educational-center.controller.ts  ← recibe la petición
│   │       └── educational-center.service.ts     ← lógica y BD
│   └── models/
│       └── associations.ts                       ← relaciones
└── database/
    ├── migrations/                               ← cambios de tablas
    └── seeders/                                  ← datos de ejemplo
```

**Truco:** si no sabes qué tocar, **abre primero el `.model.ts` existente más parecido a lo que te pidan**.

### Campos importantes de cada entidad

**1) Educational Center** (`educationalCenter`)

```text
id         número, identificador
name       texto (aunque en el ZIP hay un ERROR: figura como INTEGER)
code       texto, código único
logoUrl    texto
address    texto
isActive   booleano (true/false)
```

**2) Academic Year** (`academicYear`)

```text
id         número
name       texto, ej. "2025-2026"
startDate  fecha
endDate    fecha
isActive   booleano
```

**3) Professional Family** (`professionalFamily`)

```text
id          número
name        texto
code        texto
description texto opcional (puede ser null)
```

**4) Training Program** (`trainingProgram`)

```text
id        número
familyId  número → profesional family
centerId  número → educational center
name      texto
code      texto
level     texto, ej. "Grado Medio"
isActive  booleano
```

**5) Tutor Assignment** (`tutorAssignment`)

```text
id             número
tutorId        número → tutor (verificar modelo relacionado)
programId      número → training program
academicYearId número → academic year
assignedAt     fecha
```

**6) Student Enrollment** (`studentEnrollment`)

```text
id             número
studentId      número → student (verificar asociación)
programId      número → training program
academicYearId número → academic year
enrollmentDate fecha
graduationDate fecha o null
status         texto, ej. "Matriculado"
```

### Las relaciones en lenguaje humano

```text
CENTRO EDUCATIVO ─── tiene muchos ───> CICLOS FORMATIVOS
FAMILIA PROFESIONAL ─ tiene muchos ─> CICLOS FORMATIVOS

CICLO FORMATIVO ─── tiene muchas ───> ASIGNACIONES DE TUTOR
CURSO ACADÉMICO ─── tiene muchas ───> ASIGNACIONES DE TUTOR

CICLO FORMATIVO ─── tiene muchas ───> MATRÍCULAS
CURSO ACADÉMICO ─── tiene muchas ───> MATRÍCULAS
```

**¿Dónde está el ID de la relación?** En la tabla del lado «muchos»:

- `trainingProgram.centerId` apunta a `educationalCenter.id`.
- `trainingProgram.familyId` apunta a `professionalFamily.id`.
- `tutorAssignment.programId` apunta a `trainingProgram.id`.
- `tutorAssignment.academicYearId` apunta a `academicYear.id`.
- `studentEnrollment.programId` apunta a `trainingProgram.id`.
- `studentEnrollment.academicYearId` apunta a `academicYear.id`.

---

## 4. LA RECETA UNIVERSAL: LEER EL ENUNCIADO Y DECIDIR

**Ejemplo:** «Añade el campo `capacity` de tipo entero con valor 0 por defecto a los centros educativos».

Traducción a tareas:

1. «Añade campo» → **modificar modelo**.
2. «Tiene que existir en BD» → **migración `addColumn`**.
3. «Por defecto 0» → `defaultValue: 0` en ambos.
4. «Debe poder guardarse por API» → revisar **controller/service** si lo pide.
5. «Comprueba» → ejecutar migración, `npm run build`, probar endpoint si procede.

**Otro ejemplo:** «Crea una tabla `campuses` relacionada con centros educativos».

1. «Crea» → modelo **nuevo**.
2. «Tabla» → migración **`createTable`**.
3. «Relacionada» → `centerId` + `belongsTo` / `hasMany` + referencia SQL.
4. «Datos de prueba» → seeder **si lo piden**.
5. «API» → routes/controller/service **si lo piden**.

**No añadas trabajo que el profesor no haya pedido.** Una migración sola puede ser el ejercicio; no necesitas construir una API completa si no la solicitan.

---

## 5. SI ME PIDEN CREAR UN MODELO NUEVO

**Ejemplo DIDÁCTICO, no existente en el ZIP:** crear `Campus` relacionado con un centro.

### PASO 5.1 — Encontrar un modelo parecido

Abre `src/modules/educational-centers/educational-center.model.ts` y mira cómo importa `sequelize`, `Model`, `DataTypes`.

### PASO 5.2 — Crear carpeta y archivo

Desde `backend`:

```bash
mkdir -p src/modules/campuses
```

Crea con el editor:

```text
src/modules/campuses/campus.model.ts
```

### PASO 5.3 — Copiar el ejemplo y entenderlo

```ts
import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional
} from "sequelize";
import { sequelize } from "../../config/database.js";

export class Campus extends Model<
  InferAttributes<Campus>,
  InferCreationAttributes<Campus>
> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare centerId: number;
  declare isActive: CreationOptional<boolean>;
}

Campus.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(150),
      allowNull: false
    },
    centerId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
  },
  {
    sequelize,
    tableName: "campuses",
    modelName: "Campus",
    timestamps: false
  }
);
```

**Traducción línea a línea:**

- `class Campus`: nombre del modelo en TypeScript.
- `declare name: string`: el atributo se llama `name` y es texto.
- `DataTypes.STRING(150)`: columna de texto de hasta 150 caracteres.
- `allowNull: false`: obligatorio.
- `centerId`: número que indica a qué centro pertenece.
- `CreationOptional<number>`: al crear el registro, Sequelize puede generar ese valor (como el `id`).
- `defaultValue: true`: si no mandas `isActive`, se pone `true`.
- `tableName: "campuses"`: nombre real de la tabla.
- `timestamps: false`: este ejemplo NO requiere columnas automáticas de creación/actualización. **En tus seis modelos existentes suele ser `true`**; respeta lo que pida el enunciado.

**Importante:** el `.model.ts` NO crea la tabla. Falta la migración (sección 8). Si el modelo es nuevo, además debe cargarse en el arranque antes de definir sus asociaciones; sigue el patrón de importación del proyecto.

### PASO 5.4 — Comprobar TypeScript

Desde `backend`:

```bash
npm run build
```

Si falla, lee la **primera línea del error**: normalmente señala archivo y número de línea.

---

## 6. SI ME PIDEN MODIFICAR UN MODELO EXISTENTE

**Ejemplo realista:** añadir `capacity` (número de plazas) a `educationalCenter`.

### PASO 6.1 — Abrir el archivo correcto

```text
src/modules/educational-centers/educational-center.model.ts
```

### PASO 6.2 — Añadir la declaración en la clase

Busca las líneas `declare id`, `declare name`, etc. Añade **dentro de la clase**:

```ts
declare capacity: CreationOptional<number>;
```

### PASO 6.3 — Añadir la definición en `.init({ ... })`

Entre los otros campos, añade:

```ts
capacity: {
  type: DataTypes.INTEGER,
  allowNull: false,
  defaultValue: 0
},
```

**¿Por qué en dos sitios del mismo archivo?**

- `declare` = TypeScript sabe que el atributo existe.
- `init` = Sequelize sabe cómo tratar ese atributo en la BD.

### PASO 6.4 — Crear la migración (NO saltársela)

Desde `backend`:

```bash
cd database
npx sequelize-cli migration:generate --name add-capacity-to-educational-centers
```

Se crea un archivo nuevo con fecha en `database/migrations/`. **Abre el archivo que acaba de aparecer** y coloca:

```js
'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn(
      'educational_centers',
      'capacity',
      {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      }
    );
  },

  async down(queryInterface) {
    await queryInterface.removeColumn(
      'educational_centers',
      'capacity'
    );
  }
};
```

**Significado:**

- `up`: añade la columna.
- `down`: quita la columna si alguna vez se revierte.
- `'educational_centers'`: tabla real, no nombre de clase.
- `'capacity'`: columna nueva.

**No edites una migración antigua que ya esté ejecutada** para añadir una columna nueva; crea una nueva.

### PASO 6.5 — Ejecutar y comprobar

Vuelve de `database` a `backend`:

```bash
cd ..
npm run db:migrate
npm run db:migrate:status
npm run build
```

Si se ejecuta sin error, comprueba que la columna existe en PostgreSQL o con el endpoint correspondiente **si el controlador la admite**.

### PASO 6.6 — ¿Y si pide cambiar el tipo de un campo?

Ejemplo: convertir `name` de entero a texto.

- En modelo: `type: DataTypes.STRING(150)`.
- En BD: **migración nueva** con `queryInterface.changeColumn(...)`.
- `down`: volver al tipo anterior **solo si es seguro**; convertir texto a entero puede fallar si hay nombres no numéricos.
- **Advertencia del ZIP:** `educationalCenter.name` aparece erróneamente como `INTEGER`. No lo cambies si no te lo piden, y comprueba primero el estado de `sprint-1`.

Plantilla conceptual:

```js
async up(queryInterface, Sequelize) {
  await queryInterface.changeColumn('educational_centers', 'name', {
    type: Sequelize.STRING(150),
    allowNull: false
  });
}
```

**No ejecutes cambios de tipo a ciegas si ya hay datos.**

---

## 7. SI ME PIDEN RELACIONAR DOS MODELOS

### Primero: ¿qué significa 1:N?

**Un centro tiene muchos ciclos**, pero **un ciclo pertenece a un centro**.

```text
educationalCenter (1) ───── (N) trainingProgram
                                 centerId = id del centro
```

### PASO 7.1 — Saber dónde va la clave foránea

En el lado N: `trainingProgram` lleva `centerId`.

### PASO 7.2 — Abrir las asociaciones

Archivo:

```text
src/models/associations.ts
```

En el ZIP, estas relaciones ya existen. **Si el examen pide una nueva, copia el patrón**, no dupliques una existente.

Ejemplo nuevo `Campus`:

```ts
educationalCenter.hasMany(Campus, {
  foreignKey: "centerId",
  as: "campuses"
});

Campus.belongsTo(educationalCenter, {
  foreignKey: "centerId",
  as: "educationalCenter"
});
```

**Traducción:**

- `hasMany` = un centro tiene varios campus.
- `belongsTo` = cada campus pertenece a un centro.
- `foreignKey` = nombre del atributo de enlace.
- `as` = alias utilizado al consultar relaciones.
- Hay que **importar `Campus` arriba** y asegurarse de que se inicializa antes de ejecutar `defineAssociations()`.

### PASO 7.3 — No olvidarse de la base de datos

En la migración de `campuses`, la columna debe existir:

```js
center_id: {
  type: Sequelize.INTEGER,
  allowNull: false,
  references: {
    model: 'educational_centers',
    key: 'id'
  },
  onUpdate: 'CASCADE',
  onDelete: 'RESTRICT'
}
```

**¿Por qué `center_id` y no `centerId`?** El proyecto usa nombres camelCase en modelos y nombres snake_case en varias migraciones. **Comprueba la columna real** en la tabla de `sprint-1`.

### PASO 7.4 — Si me piden 1:1 o N:M

- **1:1:** `hasOne` + `belongsTo`, con FK y restricción `unique` donde corresponda.
- **N:M:** `belongsToMany` en ambos modelos + tabla intermedia con las dos FKs.
- **Si el enunciado no lo pide, no cambies la cardinalidad**.

### PASO 7.5 — Comprobar

```bash
npm run build
```

Si hay migración nueva:

```bash
npm run db:migrate
```

**Ojo:** añadir asociaciones de Sequelize no equivale necesariamente a haber creado la restricción de clave foránea en PostgreSQL. Son dos capas distintas.

---

## 8. SI ME PIDEN UNA MIGRACIÓN

**Una migración es un archivo que cambia la estructura de PostgreSQL.**

### PASO 8.1 — Generar el archivo

Desde `backend`:

```bash
cd database
npx sequelize-cli migration:generate --name create-campuses
```

**IMPORTANTE:** los comandos `migration:generate` y `seed:generate` se ejecutan desde `backend/database` en el ZIP porque ahí está `.sequelizerc`.

### PASO 8.2 — Elegir la operación correcta

| Petición del profesor | En `up` | En `down` |
|---|---|---|
| Crear tabla | `createTable` | `dropTable` |
| Añadir columna | `addColumn` | `removeColumn` |
| Cambiar columna | `changeColumn` | Revertir el cambio, si es seguro |
| Borrar columna | `removeColumn` | `addColumn` (restaurar esquema, no los datos borrados) |
| Añadir restricción | `addConstraint` | `removeConstraint` |

### PASO 8.3 — Ejemplo COMPLETO: crear tabla `campuses`

```js
'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('campuses', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: Sequelize.STRING(150),
        allowNull: false
      },
      center_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'educational_centers',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      },
      is_active: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
      }
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('campuses');
  }
};
```

### PASO 8.4 — Ejecutar

Desde `database`, vuelve a `backend`:

```bash
cd ..
npm run db:migrate:status
npm run db:migrate
npm run db:migrate:status
```

**Si dice que una tabla ya existe:** no repitas migraciones a ciegas. Mira el estado y si hay una migración duplicada o un esquema creado manualmente.

**Si dice que no existe la tabla padre:** hay que crear/ejecutar primero la migración de la tabla referenciada.

**Si dice que la columna ya existe:** puede que esa migración ya se haya aplicado o que el esquema no coincida con el historial. Investiga antes de tocar nada.

### PASO 8.5 — Timestamps

Si el modelo usa `timestamps: true`, Sequelize normalmente espera `createdAt` y `updatedAt` (que pueden mapearse a `created_at` y `updated_at`). **Comprueba la configuración del modelo y el esquema**; añade esas columnas a la migración cuando corresponda. No copies una plantilla con `timestamps: false` a un modelo que usa `true` sin adaptarla.

---

## 9. SI ME PIDEN UN SEEDER

**Un seeder NO crea tablas. Mete filas de ejemplo en tablas que ya existen.**

### PASO 9.1 — Primero, saber qué tabla y qué columnas tiene

Ejemplo: insertar una familia profesional.

- Tabla: `professional_families`.
- Columnas: `name`, `code`, `description`.
- Mira la migración real para comprobar si exige `created_at`/`updated_at`.

### PASO 9.2 — Crear el archivo

Desde `backend`:

```bash
cd database
npx sequelize-cli seed:generate --name seed-professional-family-example
```

Abre el nuevo archivo de `database/seeders`.

### PASO 9.3 — Escribir `up` y `down`

**Ejemplo orientativo** (ajusta columnas de timestamps a la migración real):

```js
'use strict';

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('professional_families', [
      {
        name: 'Informática y Comunicaciones',
        code: 'INFORMATICA-EXAMEN',
        description: 'Familia de prueba'
      }
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete(
      'professional_families',
      { code: 'INFORMATICA-EXAMEN' }
    );
  }
};
```

**Traducción:**

- `bulkInsert` = insertar una o varias filas.
- `[ { ... } ]` = lista de objetos que insertar.
- `bulkDelete` = borrar las filas creadas por este seeder.
- **No pongas `{}` como condición del `down` sin entenderlo**: podrías borrar todas las filas de la tabla.

### PASO 9.4 — Ejecutar

```bash
cd ..
npm run db:seed
```

**IMPORTANTE:** `npm run db:seed` ejecuta **todos los seeders pendientes**, no solo el que acabas de crear. Si quieres probar uno específico, desde `backend/database` puedes usar:

```bash
npx sequelize-cli db:seed --seed NOMBRE-EXACTO-DEL-ARCHIVO.js
```

Sustituye el nombre por el generado. Comprueba primero que la base de datos está lista.

### PASO 9.5 — Orden de seeders por relaciones

Si voy a insertar un `trainingProgram` con `familyId: 1` y `centerId: 1`:

**Primero deben existir** familia `1` y centro `1`. Si no, PostgreSQL puede dar error de clave foránea.

Orden orientativo:

1. Centros, familias profesionales, cursos académicos.
2. Ciclos formativos.
3. Asignaciones de tutor y matrículas (además requieren tutor/alumno válidos).

### PASO 9.6 — El error clásico camelCase/snake_case

**En modelos TypeScript:** `familyId`, `centerId`, `isActive`.

**En `bulkInsert` de Sequelize CLI:** utiliza los nombres **reales** de las columnas de la tabla, por ejemplo `family_id`, `center_id`, `is_active`, si así las creó la migración.

**No copies un seeder antiguo sin revisar sus columnas.** En el ZIP hay ejemplos con esta discrepancia.

---

## 10. SI ME PIDEN PROBAR ENDPOINTS CON BRUNO

### Primero: comprobar que el backend está funcionando

Desde `backend`, en una terminal:

```bash
npm run dev
```

**Deja esa terminal abierta.** Si la cierras, el servidor puede detenerse.

En el ZIP, `src/app.ts` registra las rutas bajo `/api` y el puerto habitual es `3000`.

**URL base local orientativa:**

```text
http://localhost:3000/api
```

En IsardVDI el puerto, la dirección o el acceso pueden variar. Usa lo que indique el despliegue.

### Las seis URLs de MIS entidades

| Entidad | Ruta comprobada en ZIP |
|---|---|
| Centros | `/api/educational-centers` |
| Cursos académicos | `/api/academic-years` |
| Familias profesionales | `/api/professional-families` |
| Ciclos formativos | `/api/training-programs` |
| Tutores asignados | `/api/tutor-assignments` |
| Matrículas | `/api/students-enrollments` |

**Fíjate:** la URL de matrículas lleva **`students-enrollments`** (con `s` en `students`) en el ZIP.

### PASO 10.1 — GET: ver todos

1. Abro Bruno.
2. Creo o selecciono una petición.
3. Método: **GET**.
4. URL: `http://localhost:3000/api/academic-years`.
5. Pulso **Send**.
6. Espero `200` y datos JSON (puede ser una lista vacía).

**¿Qué compruebo?** Que responde el servidor y la ruta existe.

### PASO 10.2 — GET por ID: ver uno

1. Método: **GET**.
2. URL: `http://localhost:3000/api/academic-years/1`.
3. Pulso **Send**.
4. Si existe el ID, espero datos. Si no, puede salir `404`.

**No inventes que el ID 1 existe.** Si falla, primero consulta GET todos y elige un ID real.

### PASO 10.3 — POST: crear

1. Método: **POST**.
2. URL: `http://localhost:3000/api/professional-families`.
3. En **Body**, elige **JSON**.
4. Añade cabecera `Content-Type: application/json` si Bruno no la pone.
5. Pega:

```json
{
  "name": "Informática y Comunicaciones",
  "code": "INFO-PRUEBA-2026",
  "description": "Creada para probar POST"
}
```

6. Pulsa **Send**.
7. Espera `201` o el código de éxito implementado; **mira el JSON de respuesta**.

**Si dice duplicado:** cambia `code` por uno nuevo. Si dice obligatorio, revisa el controlador y los campos requeridos.

### PASO 10.4 — PUT: modificar

1. Copia el `id` que devolvió el POST.
2. Método: **PUT**.
3. URL: `http://localhost:3000/api/professional-families/ID_REAL`.
4. Body → JSON:

```json
{
  "description": "Descripción modificada desde Bruno"
}
```

5. Send. Si el backend exige más campos, revisa controlador/servicio.

**¡Sustituye `ID_REAL` por un número de verdad!** No escribas esas letras literalmente.

### PASO 10.5 — DELETE: borrar

1. Método: **DELETE**.
2. URL: `http://localhost:3000/api/professional-families/ID_REAL`.
3. Send.
4. Puede responder `204` sin contenido o el código definido por vuestro backend.

**Borra solo tu registro de prueba**, nunca uno del proyecto que esté relacionado con otros.

### Plantillas JSON de las 6 entidades

Estos cuerpos son **orientativos**, basados en los campos de los modelos. El controlador puede exigir o rechazar campos concretos. **No incluyas `id` salvo que el enunciado lo pida.**

**Centro educativo** (`POST /api/educational-centers`):

```json
{
  "name": "IES Centro de Prueba",
  "code": "CENTRO-EXAMEN-01",
  "logoUrl": "logo.png",
  "address": "Calle Ejemplo 1",
  "isActive": true
}
```

> En el ZIP, `name` tiene un error de tipo (`INTEGER`) que puede impedir este POST con texto. **Comprueba `sprint-1`**.

**Curso académico** (`POST /api/academic-years`):

```json
{
  "name": "2026-2027",
  "startDate": "2026-09-01",
  "endDate": "2027-06-30",
  "isActive": true
}
```

**Familia profesional** (`POST /api/professional-families`):

```json
{
  "name": "Informática y Comunicaciones",
  "code": "INFO-PRUEBA-2026",
  "description": "Familia de prueba"
}
```

**Ciclo formativo** (`POST /api/training-programs`):

```json
{
  "familyId": 1,
  "centerId": 1,
  "name": "Desarrollo de Aplicaciones Web",
  "code": "DAW-PRUEBA-2026",
  "level": "Grado Superior",
  "isActive": true
}
```

**Asignación de tutor** (`POST /api/tutor-assignments`):

```json
{
  "tutorId": 1,
  "programId": 1,
  "academicYearId": 1,
  "assignedAt": "2026-09-01"
}
```

**Matrícula** (`POST /api/students-enrollments`):

```json
{
  "studentId": 1,
  "programId": 1,
  "academicYearId": 1,
  "enrollmentDate": "2026-09-01",
  "graduationDate": null,
  "status": "Matriculado"
}
```

**OJO:** los IDs `1` son ejemplos; deben existir en la BD. En el ZIP hay problemas de nombres de tablas/columnas que pueden impedir algunos POST hasta que se corrijan.

### ¿Qué significan los códigos HTTP?

| Código | Significado práctico |
|---|---|
| `200` | Ha ido bien y devuelve algo |
| `201` | Se ha creado |
| `204` | Ha ido bien, pero sin cuerpo de respuesta |
| `400` | Petición mal formada o datos no válidos |
| `404` | Ruta o registro no encontrado |
| `409` | Conflicto, a menudo duplicado |
| `500` | Error interno; mira terminal del backend |

**Si sale `404`:** comprueba `/api`, plural, guiones y el ID.  
**Si sale `500`:** mira el error real en la terminal donde corre `npm run dev`.

---

## 11. LOS 6 EJERCICIOS QUE PUEDEN CAER (RECETAS)

### A. «Añade un campo a un centro educativo»

1. `educational-center.model.ts` → `declare` + campo en `init`.
2. Generar migración `add-...-to-educational-centers`.
3. `up: addColumn`; `down: removeColumn`.
4. `npm run db:migrate`.
5. `npm run build`.
6. Si pide API, revisar controller/service y probar Bruno.

### B. «Añade un campo a un curso académico»

1. Modelo `academic-year.model.ts`.
2. Tabla `academic_years`.
3. Campo nuevo con tipo correcto.
4. Migración nueva.
5. Comprobar con `npm run build` y `db:migrate`.

### C. «Relaciona ciclo con familia o centro»

1. `training-program.model.ts` ya tiene `familyId` y `centerId` en ZIP.
2. Comprueba `associations.ts` **antes de añadir nada**: puede estar hecho.
3. Si falta FK SQL, crear migración para añadirla/ajustarla.
4. Comprueba que las tablas padre existen.
5. Ejecuta y prueba.

### D. «Crea un seeder de un ciclo»

1. Comprueba que existen un centro y una familia.
2. Genera seeder.
3. `bulkInsert('training_programs', [{ family_id: ..., center_id: ..., ... }])`.
4. Ajusta nombres y timestamps a la migración real.
5. `down` borra solo tu registro, por código único.
6. Ejecuta seeder y verifica GET en Bruno si lo piden.

### E. «Añade una relación a asignación de tutor»

1. Modelo `tutor-assignment.model.ts`.
2. Tabla `tutor_assignments`.
3. `programId` y `academicYearId` ya existen en ZIP.
4. Comprueba asociación en `associations.ts`.
5. Si piden una relación nueva con tutor/usuario, **identifica primero el modelo real del tutor**; no supongas que es `User`.
6. Migra la FK si corresponde.

### F. «Prueba matrículas con Bruno»

1. Arranca backend.
2. GET `/api/students-enrollments`.
3. Consulta IDs reales de estudiante, ciclo y año.
4. POST con JSON válido.
5. Si falla, revisa la discrepancia `student_enrollments` vs `students_enrollments` en la rama del examen.
6. Prueba GET por ID, PUT y DELETE **solo si se piden**.

---

## 12. CUANDO ALGO FALLA: NO ENTRAR EN PÁNICO

| Lo que veo | Qué significa probablemente | Qué hago |
|---|---|---|
| `npm: command not found` | Node/npm no instalado o PATH | Verificar entorno IsardVDI |
| `Cannot find module` | Falta dependencia o import incorrecto | `npm install`; revisar ruta/import |
| `ECONNREFUSED` | No conecta con servidor o PostgreSQL | Comprobar host, puerto y servicio |
| `relation ... does not exist` | Tabla no existe o nombre incorrecto | Revisar migraciones y tabla real |
| `column ... does not exist` | Columna no migrada o nombre distinto | Ver `db:migrate:status`, migración |
| `null value ... violates not-null constraint` | Falta campo obligatorio | Revisar `allowNull` y JSON/seeder |
| `foreign key constraint` | ID padre no existe o se intenta borrar padre | Crear primero registro padre |
| `already exists` | Tabla/columna ya creada | Revisar historial, no repetir a ciegas |
| `Validation error` | Campo inválido, obligatorio o duplicado | Revisar modelo y controlador |
| `404` en Bruno | URL/ID incorrecto o ruta no registrada | Revisar `/api` y rutas |
| `500` en Bruno | Error en backend | Leer terminal del servidor |
| Error de TypeScript | Problema de tipos/imports | `npm run build`, ir a línea indicada |
| `Cannot read ... .env.test` | Config CLI carga archivo de test | Verificar archivos de entorno |
| `SyntaxError` en migración | Coma, llave o paréntesis mal cerrado | Revisar el bloque recién editado |

### Técnica para encontrar errores

1. **Lee el primer error**, no el último.
2. Busca **archivo y línea**.
3. Pregunta: ¿falló Git, TypeScript, PostgreSQL o Bruno?
4. Cambia **una sola cosa**.
5. Repite el comando que falló.
6. Si ya funciona, continúa.

### Problemas vistos en el ZIP (pueden estar corregidos en `sprint-1`)

- `educationalCenter.name` está como `INTEGER` aunque debería ser texto según el dominio.
- Una migración de centros tiene `droptTable` en vez de `dropTable`.
- Modelo de matrículas `student_enrollments`, migración `students_enrollments`.
- Seeder de ciclos usa algunos nombres camelCase donde la tabla tiene snake_case.
- Algunos modelos con `timestamps: true` no tienen columnas equivalentes en ciertas migraciones.
- Hay asociaciones pendientes/comentadas para algunas entidades.
- La configuración de migraciones necesita archivos `.env` específicos.

**No arregles estos errores por tu cuenta si no forman parte del examen.**

---

## 13. ANTES DE ENTREGAR: MI LISTA FINAL

- [ ] He leído todo el enunciado y he hecho **solo** lo que pide.
- [ ] Estoy en `sprint-1` o en la rama indicada explícitamente por el profesor.
- [ ] He modificado el **modelo** si pedían campos o entidad.
- [ ] He creado **migración** si cambiaba la estructura de BD.
- [ ] La migración tiene **`up` y `down`**.
- [ ] He añadido **asociación y FK** si pedían relación.
- [ ] El seeder tiene **`bulkInsert` y `bulkDelete` seguro** si lo pedían.
- [ ] He usado nombres de tabla/columna reales.
- [ ] `npm run build` no muestra errores relacionados con mi cambio.
- [ ] La migración/seeder se ejecuta correctamente, si corresponde.
- [ ] He probado endpoints en Bruno si lo piden.
- [ ] He guardado los archivos.
- [ ] He ejecutado:

```bash
git status
git diff
```

- [ ] Sé qué archivos he cambiado.
- [ ] Entrego o hago commit/push **solo como indique el profesor**.

**Para guardar un commit, solo si el profesor lo pide:**

```bash
git add RUTA_DEL_ARCHIVO_1 RUTA_DEL_ARCHIVO_2
git commit -m "Implement exam task"
```

Sustituye las rutas por archivos reales. **No hagas `git push` sin saber a qué rama y remoto te han pedido enviarlo.**

---

## 14. CHULETA ULTRARRÁPIDA (PARA MIRAR EN 30 SEGUNDOS)

```text
¿CAMPO NUEVO?      Modelo + migración addColumn + build + migrate
¿MODELO NUEVO?     Archivo .model.ts + migración createTable + registrar
¿RELACIÓN?         foreignKey + hasMany/belongsTo + FK en BD
¿MIGRACIÓN?        up = hacer; down = deshacer
¿SEEDER?           up = bulkInsert; down = bulkDelete seguro
¿BRUNO?            servidor encendido + método + URL /api + JSON + Send
¿ERROR?            primera línea del error + archivo + línea
```

```bash
# GIT (desde repositorio)
git fetch origin
git branch -a
git switch sprint-1
git status

# BACKEND (desde carpeta backend)
npm install
npm run dev
npm run build
npm run db:migrate:status
npm run db:migrate
npm run db:seed

# GENERAR (desde backend/database)
npx sequelize-cli migration:generate --name nombre-del-cambio
npx sequelize-cli seed:generate --name nombre-del-seeder
```

**Recuerda el camino:** **ENUNCIADO → ARCHIVO → CAMBIO → COMANDO → COMPROBACIÓN → ENTREGA.**

---

## 15. CINCO MINI-SIMULACROS PARA ENTRENAR

No los hagas todos a la vez. Haz uno, comprueba, y pasa al siguiente.

**Simulacro 1 — Campo nuevo:** añadir `capacity` (entero, defecto `0`) a centros educativos. Resultado: modelo y migración correctos.

**Simulacro 2 — Tabla nueva:** crear `Campus` con `id`, `name`, `centerId`, `isActive`. Resultado: modelo, tabla y FK a centros.

**Simulacro 3 — Relación:** explicar y verificar por qué `trainingProgram` pertenece a una familia profesional y a un centro.

**Simulacro 4 — Seeder:** insertar una familia profesional con un código único; hacer que `down` borre solo esa fila.

**Simulacro 5 — Bruno:** GET de familias, POST de una familia nueva, GET por ID, PUT de descripción, DELETE del registro de prueba.

**Cómo sé que he aprobado el simulacro:** no basta con escribir código; debe compilar, la migración debe ejecutarse y, si hay API, Bruno debe devolver una respuesta coherente.

---

### Nota final

Esta guía está hecha para **entender y localizar rápidamente qué hacer**, no para memorizar código sin comprenderlo. **La versión `sprint-1` del examen puede diferir del ZIP**. Comprueba los nombres reales y las instrucciones del profesor antes de ejecutar comandos que cambien la base de datos.
