import { Crop } from "../models/crop.model";

export default class ClassService {
    public static async createCrop(data: any) {
        const crop = await Crop.create(data);
        return {
            success: true,
            message: "Crop created successfully",
            crop,
        };
    }
    public static async getCrops(id: string) {
        const crops = await Crop.findById(id);
        return {
            success: true,
            message: "Crops fetched successfully",
            crops,
        };
    }
    public static async getCropsByMonth(month: string) {
        const crops = await Crop.find({ suitableMonths: month });
        return {
            success: true,
            message: "Crops fetched successfully",
            crops,
        };
    }
}
