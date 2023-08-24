import { Router } from "express";
import { prisma } from "./db.js";

const router = Router();

router.get("/users", async (req, res) => {
    await prisma.usuario
        .findMany()
        .then((data) => res.json(data))
        .catch((err) => res.json(err));
});
router.get("/users/:id", async (req, res) => {
    await prisma.usuario
        .findFirst({
            where: {
                ID: parseInt(req.params.id),
            },
        })
        .then((data) => res.json(data))
        .catch((err) => res.send(err));
});

router.post("/users", async (req, res) => {
    const { name, email, password } = req.body;

    await prisma.usuario
        .create({
            data: {
                NAME: name,
                EMAIL: email,
                PASSWORD: password,
            },
        })
        .then((data) => res.json(data))
        .catch((err) => res.send(err));
});

router.put("/users/:id", async (req, res) => {
    const { name, email, password } = req.body;

    await prisma.usuario
        .update({
            where: {
                ID: parseInt(req.params.id),
            },
            data: {
                NAME: name,
                EMAIL: email,
                PASSWORD: password,
            },
        })
        .then((data) => res.json(data))
        .catch((err) => res.json(err));
});

router.delete("/users/:id", async (req, res) => {
    await prisma.usuario
        .delete({
            where: {
                ID: parseInt(req.params.id),
            },
        })
        .then(() => res.send(`Usuario con ID ${req.params.id} eliminado`))
        .catch((err) => res.json(err));
});

export { router as userRoutes };
