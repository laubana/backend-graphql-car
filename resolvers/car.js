import dbConfig from "../configs/dbConfig";
import Car from "../models/Car";

const carResolver = {
  Query: {
    getCars: async (root, args) => {
      const { ownerId } = args;

      await dbConfig.connect();

      const existingCars = await Car.find({ owner: ownerId })
        .populate({ path: "owner" })
        .lean();

      return existingCars;
    },
  },
  Mutation: {
    addCar: async (root, args) => {
      const { year, make, model, price, ownerId } = args;

      await dbConfig.connect();

      const newCar = await Car.create({
        year,
        make,
        model,
        price,
        owner: ownerId,
      });

      const populatedNewCar = await Car.findById(newCar._id)
        .populate({ path: "owner" })
        .lean();

      return populatedNewCar;
    },
    removeCar: async (root, args) => {
      const { carId } = args;

      await dbConfig.connect();

      await Car.findByIdAndDelete(carId).lean();

      return true;
    },
    updateCar: async (root, args) => {
      const { carId, year, make, model, price, ownerId } = args;

      await dbConfig.connect();

      const updatedCar = await Car.findByIdAndUpdate(
        carId,
        { year, make, model, price, owner: ownerId },
        { new: true }
      )
        .populate({ path: "owner" })
        .lean();

      return updatedCar;
    },
  },
};

export default carResolver;
