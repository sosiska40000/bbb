import { Router } from "express";
import multer from "multer";
import { processImage } from "./processImage/controller";
import { processCommand } from "./processCommand/controller";

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post("/process-image", upload.single("image"), processImage);
router.post("/process-command", processCommand);

export { router };

