import { app } from "./app";
import { sequelize } from "./config/database";
import { env } from "./config/env";
import { defineAssociations } from "./models/associations";

// Importamos los modelos para que Sequelize los registre.
import "./modules/users/user.model.js";
import "./modules/roles/role.model.js";
import "./modules/permissions/permission.model.js";
import "./modules/role-users/role-user.model.js";
import "./modules/role-permissions/role-permission.model.js";
import "./modules/auth-tokens/auth-token.model.js";
import "./modules/academic-years/academic-year.model.js";
import "./modules/educational-centers/educational-center.model.js";
import "./modules/professional-families/professional-family.model.js";
import "./modules/students-enrollments/student-enrollment.model.js";
import "./modules/training-programs/training-program.model.js";
import "./modules/tutor-assignments/tutor-assignment.model.js";


async function startServer() {
  try {

    defineAssociations();

    await sequelize.authenticate();

    console.log("Conexión con MySQL establecida.");

    await sequelize.sync();

    console.log("Modelos sincronizados.");

    app.listen(env.PORT, () => {
      console.log(
        `Servidor funcionando en http://localhost:${env.PORT}`
      );
    });

  } catch (error) {

    console.error(
      "No se pudo iniciar la aplicación:",
      error
    );

    process.exit(1);
  }
}

startServer();
