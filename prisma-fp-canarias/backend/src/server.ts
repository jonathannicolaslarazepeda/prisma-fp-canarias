
import { app } from "./app.js";
import { sequelize } from "./config/database.js";
import { env } from "./config/env.js";
import { defineAssociations } from "./models/associations.js";

// Company and employment models
import "./modules/companies/company.model.js";
import "./modules/internships/internship.model.js";
import "./modules/employment-records/employment-record.model.js";

// Survey models
import "./modules/surveys/survey.model.js";
import "./modules/survey-questions/survey-question.model.js";
import "./modules/survey-invitations/survey-invitation.model.js";
import "./modules/survey-answers/survey-answer.model.js";

// User and permission models
import "./modules/users/user.model.js";
import "./modules/roles/role.model.js";
import "./modules/permissions/permission.model.js";
import "./modules/role-users/role-user.model.js";
import "./modules/role-permissions/role-permission.model.js";
import "./modules/auth-tokens/auth-token.model.js";

// Educational models
import "./modules/academic-years/academic-year.model.js";
import "./modules/educational-centers/educational-center.model.js";
import "./modules/professional-families/professional-family.model.js";
import "./modules/students-enrollments/student-enrollment.model.js";
import "./modules/training-programs/training-program.model.js";
import "./modules/tutor-assignments/tutor-assignment.model.js";

async function startServer() {
    try {

        // Define model associations
        defineAssociations();

        // Check PostgreSQL connection
        await sequelize.authenticate();

        console.log("PostgreSQL connection established.");

        // Start Express server
        app.listen(env.PORT, () => {
            console.log(
                `Server running at http://localhost:${env.PORT}`
            );
        });

    } catch (error) {

        console.error(
            "Could not start the application:",
            error
        );

        process.exit(1);
    }
}

startServer();
