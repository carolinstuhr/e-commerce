import mongoose from "mongoose";

mongoose.connect("mongodb://localhost:27017/e-commerce");

export const categories = mongoose.model("categories", {
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  id: {
    type: Number,
  },
});

const productScheme = {
  name: {
    type: String,
  },
  brand: {
    type: String,
  },
  color: {
    type: String,
  },
  description: {
    type: String,
  },
  materials: {
    type: Object,
  },
  price: {
    type: Number,
  },
  materials: {
    type: Object,
  },
  categoryId: {
    type: Number,
  },
};

const shoppingCartScheme = {
  productId: {
    type: String,
  },
  amount: {
    type: Number,
  },
  size: {
    type: String,
  },
  product: productScheme,
};

export const products = mongoose.model("products", productScheme);

export const shoppingcart = mongoose.model("shoppingcart", shoppingCartScheme);

export const orders = mongoose.model("orders", {
  customerAdress: {
    type: String,
  },
  totalPrice: {
    type: Number,
  },
  shoppingCart: shoppingCartScheme,
});
