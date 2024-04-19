
import express from "express"
const router = express.Router();

import {store, index,update,delete_item} from "../controllers/organizationController.js"


router.post("/store", store);
router.get("/index", index);
router.put("/update/:organization_id", update);
router.delete("/delete/:organization_id", delete_item);

export  default  router;