const ownerTypeDef = `#graphql
  type Owner {
    _id: ID!
    firstName: String!
    lastName: String!
  }

  type Query {
    getOwners: [Owner]
    getOwner(ownerId: ID!): Owner
  }

  type Mutation {
    addOwner(firstName: String!, lastName: String!): Owner
    removeOwner(ownerId: ID!): Boolean
    updateOwner(ownerId: ID!, firstName: String!, lastName: String!): Owner
  }
`;

export default ownerTypeDef;
