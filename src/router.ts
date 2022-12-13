import { Router } from "express";
import { body, oneOf, validationResult } from "express-validator";
import { handleInputErrors } from "./modules/middleware";
import { createProduct, deleteProduct, getOneProduct, getProducts, updateProduct } from "./handlers/product";

const router = Router();
/**
 * Product
 */
router.get("/product",  getProducts );

router.get("/product/:id", getOneProduct);
router.put("/product/:id", body('name').isString(), handleInputErrors, updateProduct);
router.post("/product", body('name').isString(), handleInputErrors, createProduct);
router.delete("/product/:id", deleteProduct);

/**
 * Update
 */
router.get("/update", (req, res) => { });
router.get("/update/:id", (req, res) => { });
router.put("/update/:id",
  body('title').optional().isString(),
  body('body').optional().isString(),
  body('status').optional().isIn(['IN_PROGRESS', 'LIVE', 'DEPRECATED', 'ARCHIVED']),
  (req, res) => { });
router.post("/update",
  body('title').exists().isString(),
  body('body').exists().isString(),
  (req, res) => { });
router.delete("/update/:id", (req, res) => { });

/**
 * UpdatePoint
 */

router.get("/updatepoint", (req, res) => { });
router.get("/updatepoint/:id", (req, res) => { });
router.post("/updatepoint", (req, res) => { });
router.put("/updatepoint/:id",
  body('name').optional().isString(),
  body('description').optional().isString(),
  (req, res) => { });
router.delete("/updatepoint/:id",
  body('name').optional().isString(),
  body('description').optional().isString(),
  body('updateId').exists().isString(),
  (req, res) => { });
export default router;
