import { DataTypes, Sequelize } from "sequelize";
import UserModel from "../models/user.model.js";
import ProductModel from "../models/products.model.js";

const sequelize = new Sequelize("buy_now_productsHandle", "root", "123456", {
    host: "localhost",
    dialect: "mysql"
})


const db = {}
db.User = UserModel(sequelize, DataTypes)
db.Products = ProductModel(sequelize,DataTypes)

// Test database connection and sync models individually
async function testAndSyncModels() {
    try {
        await sequelize.authenticate();
        console.log(
            "Connection to the database has been established successfully."
        );

        await db.User.sync({ alter: true });
        console.log("User table synced successfully.");

        await db.Products.sync({ alter: true });
        console.log("Products table synced successfully.");
    } catch (error) { }
}

testAndSyncModels();

export default db;