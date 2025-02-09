import { connect } from "../configs/db";
import Car from "../models/Car";
import Owner from "../models/Owner";

const ownerResolver = {
  Query: {
    getOwners: async () => {
      await connect();

      const existingOwners = await Owner.find().lean();

      return existingOwners;
    },
    getOwner: async (root, args) => {
      const { ownerId } = args;

      await connect();

      const existingOwner = await Owner.findById(ownerId).lean();

      return existingOwner;
    },
  },
  Mutation: {
    addOwner: async (root, args) => {
      const { firstName, lastName } = args;

      await connect();

      const newOwner = await Owner.create({ firstName, lastName });

      return newOwner;
    },
    removeOwner: async (root, args) => {
      const { ownerId } = args;

      await connect();

      await Car.deleteMany({ owner: ownerId });

      await Owner.findByIdAndDelete(ownerId).lean();

      return true;
    },
    updateOwner: async (root, args) => {
      const { ownerId, firstName, lastName } = args;

      await connect();

      const updatedOwner = await Owner.findByIdAndUpdate(
        ownerId,
        { firstName, lastName },
        { new: true }
      ).lean();

      return updatedOwner;
    },
  },
};

export default ownerResolver;
