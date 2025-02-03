import { mergeResolvers } from "@graphql-tools/merge";

import carResolver from "./car";
import ownerResolver from "./owner";

const mergedResolvers = mergeResolvers([carResolver, ownerResolver]);

export default mergedResolvers;
