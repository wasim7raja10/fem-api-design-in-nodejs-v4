import { Router } from "express";
import { body } from "express-validator";

import { handleInputErrors } from "./modules/middleware";
import {
	createProduct,
	deleteProduct,
	getProductById,
	getProducts,
	updateProduct,
} from "./handlers/product";
import {
	createUpdate,
	deleteUpdate,
	getUpdateById,
	getUpdates,
	updateUpdate,
} from "./handlers/update";

const router = Router();

/**
 * Product
 */
router.get("/product", getProducts);

router.get("/product/:id", getProductById);

router.put(
	"/product/:id",
	body("name").isString(),
	handleInputErrors,
	updateProduct
);

router.post(
	"/product",
	body("name").isString(),
	handleInputErrors,
	createProduct
);

router.delete("/product/:id", deleteProduct);

/**
 * Update
 */
router.get("/update", getUpdates);

router.get("/update/:id", getUpdateById);

router.post(
	"/update",
	body("title").optional(),
	body("body").optional(),
	body("status").isIn(["INPROGRESS", "SHIPPED", "DEPRECATED"]).optional(),
	body("version").optional(),
	createUpdate
);

router.put(
	"/update/:id",
	body("title").exists().isString(),
	body("body").exists().isString(),
	body("status").isIn(["INPROGRESS", "SHIPPED", "DEPRECATED"]),
	body("version").optional(),
	updateUpdate
);

router.delete("/update/:id", deleteUpdate);

/**
 * Update Point
 */
router.get("/updatepoint", () => {});

router.get("/updatepoint/:id", () => {});

router.post(
	"/updatepoint",
	body("name").isString(),
	body("description").isString(),
	() => {}
);

router.put(
	"/updatepoint/:id",
	body("name").optional().isString(),
	body("description").optional().isString(),
	() => {}
);

router.delete("/updatepoint/:id", () => {});

export default router;
