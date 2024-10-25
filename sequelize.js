import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: "db",
    dialect: "mysql",
  }
);

const connectToDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection established successfully.");
  } catch (error) {
    console.error(
      "Unable to connect to the database:",
      error
    );
  }
};

export { sequelize, connectToDatabase };
