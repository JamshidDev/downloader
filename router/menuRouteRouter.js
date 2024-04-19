
import express from "express"
const router = express.Router();

import {store, index,update,delete_item} from "../controllers/menuRouteController.js"


router.post("/store", store);
router.get("/index", index);
router.put("/update/:route_id", update);
router.delete("/delete/:route_id", delete_item);

export default router;