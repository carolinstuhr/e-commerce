import { Router } from "express";
import { shoppingcart } from "./models";
import { products } from "./models";

const router = Router();

router.get("/", (request, response) => {
  shoppingcart.find().then((data) => {
    response.json(data);
  });
});

router.post("/", (request, response) => {
  products
    .findById(request.body.productId)
    .then((product) => {
      shoppingcart.create({
        product: product,
        productId: request.body.productId,
        amount: request.body.amount,
      });
    })
    .then(() => response.json({ created: true }))
    .catch(() => response.json({ created: false }));
});

router.patch("/", (request, response) => {
  shoppingcart
    .findByIdAndUpdate(request.body.cartId, {
      amount: request.body.amount,
    })
    .then(() => response.json({ updated: true }));
});

router.delete("/", (request, response) => {
  shoppingcart
    .findByIdAndDelete(request.body.productId)
    .then(() => response.json({ deleted: true }));
});

export default router;
