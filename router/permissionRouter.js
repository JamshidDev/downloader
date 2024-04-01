
import express from "express"
const router = express.Router();

import {store, index, delete_item, update} from "../controllers/permissionController.js"


router.post("/store", store);
router.get("/index", index);
router.put("/update/:permission_id", update);
router.delete("/delete/:permission_id", delete_item);

export  default  router;