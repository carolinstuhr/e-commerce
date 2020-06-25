import express from "express";
import bodyParser from "body-parser";
import categoryRoutes from "./api_categories";
import productRoutes from "./api_products";
import shoppingcartRoutes from "./api_shoppingcart";
import orderRoutes from "./api_orders";
import cors from "cors";

const server = express();
server.use(bodyParser.urlencoded({ extended: true }));
server.use(cors());

server.use("/categories", categoryRoutes);
server.use("/products", productRoutes);
server.use("/shoppingcart", shoppingcartRoutes);
server.use("/orders", orderRoutes);

server.listen(8040, () => console.log("server started"));
