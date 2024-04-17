
import express from "express"
const router = express.Router();

import {store, index,update,delete_item} from "../controllers/roleController.js"


router.post("/store", store);
router.get("/index", index);
router.put("/update/:role_id", update);
router.delete("/delete/:role_id", delete_item);

export  default  router;