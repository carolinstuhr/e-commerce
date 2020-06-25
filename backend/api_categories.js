import { Router } from "express";
import { categories } from "./models";

const router = Router();

router.get("/", (request, response) => {
  categories.find().then((data) => {
    response.json(data);
  });
});

router.post("/add", (request, response) => {
  categories
    .create({
      name: request.body.name,
      description: request.body.description,
      id: request.body.id,
    })
    .then(() => response.json({ created: true }))
    .catch(() => response.json({ created: false }));
});

export default router;

//name: request.body.name, description: request.body.description
