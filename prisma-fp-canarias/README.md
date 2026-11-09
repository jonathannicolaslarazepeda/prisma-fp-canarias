# Prisma FP Canarias — Backend

Prisma FP Canarias is a collaborative project for managing vocational education information and related processes in the Canary Islands. This repository's backend provides a REST API for academic administration, students, professional training, organizations, internships, employment records, surveys, and access-related data.

The backend is developed by the project team and is **a work in progress**. The presence of a module or route does not imply that every workflow has been fully tested or completed.

## Getting Started

These instructions explain how to run the **backend only** in a local development environment.

### Prerequisites

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/) and npm (compatible with the dependencies in `package.json`)
- [PostgreSQL](https://www.postgresql.org/)

### Installing

**1. Clone the repository and open the backend directory.**

```bash
git clone https://github.com/jonathannicolaslarazepeda/prisma-fp-canarias.git
cd prisma-fp-canarias/prisma-fp-canarias/backend
```

**2. Install dependencies.**

```bash
npm install
```

**3. Configure the environment.**

Create or edit `backend/.env.development` for your local environment. For example:

```dotenv
NODE_ENV=development
PORT=3000
API_URL=http://localhost:3000
DB_DIALECT=postgres
DB_HOST=localhost
DB_PORT=5432
DB_NAME=db_prisma_fp_canarias_dev
DB_USER=your_postgres_user
DB_PASSWORD=your_postgres_password
```

Create the corresponding PostgreSQL database and use your own credentials. **Do not commit passwords or other secrets.** The repository's `.env.example` contains conflicting database settings, so verify the values rather than copying them without review.

**4. Apply database migrations and, optionally, seed data.**

```bash
npm run db:migrate
npm run db:seed
```

Migrations define database tables; seeders insert initial/sample data. Review seeders before running them against a database containing existing records.

**5. Start the development server.**

```bash
npm run dev
```

The default development port is `3000`. The server checks its database connection before listening for requests.

## Backend Overview

The API is built with **Node.js**, **Express**, and **TypeScript**. **Sequelize** provides database models, associations, migrations, and seeders, with **PostgreSQL** used by the application configuration. The project also includes **CORS** and environment-variable configuration through **dotenv**.

### Modules

The backend codebase defines and registers routes for these areas:

| Area | Modules |
| --- | --- |
| Academic administration | Educational centers, academic years, professional families, training programs, tutor assignments, student enrollments |
| Students and profiles | Students, skills, student skills, student interests |
| Consent management | Consents, consent requests |
| Access and administration | Users, roles, permissions, role users, role permissions, authentication tokens |
| Organizations and career outcomes | Companies, internships, employment records |
| Surveys | Surveys, survey questions, survey invitations, survey answers |

The database also contains migrations for supporting data such as audit logs. Some areas may still be evolving.

### Project Structure

```text
backend/
├── database/
│   ├── migrations/       # Database schema changes
│   ├── seeders/          # Initial and sample data
│   └── config.js         # Sequelize CLI configuration
├── docs/                 # Additional project resources
├── src/
│   ├── config/           # Application and database configuration
│   ├── middlewares/      # Express middleware
│   ├── models/           # Shared model associations
│   ├── modules/          # Feature-specific models, routes and logic
│   ├── routes/           # Central API route registration
│   ├── app.ts            # Express application setup
│   └── server.ts         # Server startup and database connection
├── package.json
└── tsconfig.json
```

## API Routes

The application registers its feature routes under the `/api` prefix. Examples include:

```http
GET http://localhost:3000/api/educational-centers
GET http://localhost:3000/api/academic-years
GET http://localhost:3000/api/professional-families
GET http://localhost:3000/api/training-programs
GET http://localhost:3000/api/students
GET http://localhost:3000/api/companies
GET http://localhost:3000/api/internships
GET http://localhost:3000/api/surveys
GET http://localhost:3000/api/consents
```

Other registered route prefixes include `/api/tutor-assignments`, `/api/students-enrollments`, `/api/skills`, `/api/student-skills`, `/api/student-interests`, `/api/consent-requests`, `/api/employment-records`, `/api/survey-questions`, `/api/survey-invitations`, `/api/survey-answers`, `/api/users`, `/api/roles`, `/api/permissions`, `/api/role-users`, `/api/role-permissions`, and `/api/auth-tokens`.

These are registered route prefixes, not a guarantee that every endpoint or HTTP method is implemented or functioning. Consult each module's route definitions for supported operations and request formats.

## Running the Tests

The current backend `package.json` **does not provide an automated `test` script**. Available commands include:

| Command | Purpose |
| --- | --- |
| `npm run dev` | Run the development server with file watching |
| `npm run dev:test` | Start the server using the test environment; **not** an automated test suite |
| `npm run build` | Compile the TypeScript project |
| `npm start` | Run the compiled server |
| `npm run db:migrate` | Apply database migrations |
| `npm run db:migrate:status` | Show migration status |
| `npm run db:migrate:undo` | Revert the most recent migration |
| `npm run db:seed` | Run all seeders |
| `npm run db:seed:undo` | Undo seeders |

To build and run the compiled application:

```bash
npm run build
npm start
```

## Deployment

For production deployment, configure the required environment variables, provision a PostgreSQL database, apply migrations, compile the TypeScript application, and start the compiled server. The database CLI reads production configuration from process environment variables. Production hosting, infrastructure, and release procedures are not specified in the reviewed backend files.

## Built With

- [Node.js](https://nodejs.org/) — JavaScript runtime
- [Express](https://expressjs.com/) — HTTP API framework
- [TypeScript](https://www.typescriptlang.org/) — Typed application code
- [Sequelize](https://sequelize.org/) and Sequelize CLI — ORM and database migrations
- [PostgreSQL](https://www.postgresql.org/) — Relational database
- [dotenv](https://github.com/motdotla/dotenv) — Environment configuration

## Contributing

Development is collaborative. Work on a dedicated feature or documentation branch and open a Pull Request targeting `develop` for review. Keep changes scoped to the relevant task and avoid committing credentials or local environment files.

## Versioning

The backend's `package.json` currently specifies version `1.0.0`. A separate release-tagging policy has not been established in the reviewed files.

## Authors

- Jonathan Nicolas Lara Zepeda
- Victor Manuel Garcia Batista
- Daniel Rodriguez Yim
- Jaime Leonardo Pegarido Lommen

## Collaborator and Professor

- **Tiburcio Cruz Ravelo** — Project collaborator and professor

## License

The backend `package.json` declares the **ISC** license. Refer to the repository for any additional licensing information.

## Acknowledgments

Thanks to the entire Prisma FP Canarias team and to Tiburcio Cruz Ravelo for his collaboration and guidance.
