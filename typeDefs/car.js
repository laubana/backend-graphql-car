const carTypeDef = `#graphql
  type Car {
    _id: ID!
    year: String!
    make: String!
    model: String!
    price: String!
    owner: Owner!
  }

  type Query {
    getCars(ownerId: ID!): [Car]
  }

  type Mutation {
    addCar(year: String!, make: String!, model: String!, price: String!, ownerId: ID!): Car
    removeCar(carId: ID!): Boolean
    updateCar(carId: ID!, year: String!, make: String!, model: String!, price: String!, ownerId:ID!): Car
  }
`;

export default carTypeDef;
