import { mergeTypeDefs } from "@graphql-tools/merge";

import carTypeDef from "./car";
import ownerTypeDef from "./owner";

const mergedTypeDefs = mergeTypeDefs([carTypeDef, ownerTypeDef]);

export default mergedTypeDefs;
