import { Router } from "express";
import { body } from "express-validator";
import { handleInputErrors } from "./modules/middleware";

const router = Router();

/**
 * Product
 */
router.get("/product", (req, res) => {
	res.status(200).json({ message: "Product of user" });
});

router.get("/product/:id", () => {});

router.put(
	"/product/:id",
	body("name").isString(),
	handleInputErrors,
	(req, res) => {}
);

router.post("/product", body("name").isString(), handleInputErrors, () => {});

router.delete("/product/:id", () => {});

/**
 * Update
 */
router.get("/update", () => {});
router.get("/update/:id", () => {});
router.post("/update", () => {});
router.put("/update/:id", () => {});
router.delete("/update/:id", () => {});

/**
 * Update Point
 */
router.get("/updatepoint", () => {});
router.get("/updatepoint/:id", () => {});
router.post("/updatepoint", () => {});
router.put("/updatepoint/:id", () => {});
router.delete("/updatepoint/:id", () => {});

export default router;
