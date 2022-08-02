import express from "express";
import products from "./products";
import users from "./products";
import orders from "./products";

const routes = express.Router();
routes.use("/users", users);
routes.use("/orders", orders);
routes.use("/products", products);
export default routes;
