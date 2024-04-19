
import express from "express"
const router = express.Router();

import {store, index,update,delete_item} from "../controllers/menuController.js"


router.post("/store", store);
router.get("/index/:role_id", index);
router.put("/update/:menu_id", update);
router.delete("/delete/:menu_id", delete_item);

export default router;