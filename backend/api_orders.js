import { Router } from "express";
import { orders } from "./models";
import { shoppingcart } from "./models";

const router = Router();

router.put("/:id", (request, response) => {
  shoppingcart
    .findById(request.params.id)
    .then(() => {
      orders.create(request.body);
    })
    .then(() => response.json({ created: true }))
    .catch(() => response.json({ created: false }));
});

router.get("/", (request, response) => {
  orders.find().then((data) => {
    response.json(data);
  });
});

router.get("/:id", (request, response) => {
  orders.findById(request.params.id).then((data) => {
    response.json(data);
  });
});

export default router;
