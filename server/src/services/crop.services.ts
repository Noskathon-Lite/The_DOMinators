import { Crop } from "../models/crop.model";

export default class ClassService {
    public static async createCrop(data: any) {
        const crop = await Crop.create(data);
        return crop;
    }
    public static async getCrops(id: string) {
        const crop = await Crop.findById(id);
        return crop;
    }
    public static async getCropsByMonth(month: string) {
        const crops = await Crop.find({ suitableMonths: month });
        return crops;
    }

    public static async getAlternativeCrops(month: string) {
        const crops = await Crop.find({ suitableMonths: month }).populate(
            "alternativeCrops"
        );

        const alternativeCrops = crops.flatMap((crop) => crop.alternativeCrops);

        return alternativeCrops;
    }

    public static async getCustomerPreferenceForMonth(month: string) {
        const crops = await Crop.find({ suitableMonths: month }).populate(
            "alternativeCrops"
        );

        // Extract alternative crops from the results
        const alternativeCrops = crops.flatMap((crop) => crop.alternativeCrops);

        return alternativeCrops;
    }
}
