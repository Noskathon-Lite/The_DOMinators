import express from "express";
import { CropController } from "../controller/crop.controller";

const router = express.Router();
const cropController = new CropController();

router.get("/:id", async (req, res, next) => {
    try {
        await cropController.getCropsById(req, res, next);
    } catch (error) {
        next(error);
    }
});

router.get("/get", async (req, res, next) => {
    try {
        await cropController.getCropsByMonth(req, res, next);
    } catch (error) {
        next(error);
    }
});

router.get("/alternative", async (req, res, next) => {
    try {
        await cropController.getAlternativeCrops(req, res, next);
    } catch (error) {
        next(error);
    }
});

router.get("/customer-trend", async (req, res, next) => {
    try {
        await cropController.getCustomerPreferenceForMonth(req, res, next);
    } catch (error) {
        next(error);
    }
});

export default router;
