import axios from "axios";
import {response} from "express";
import {
    GraphQLInt,
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLString
} from "graphql";

const UsertType = new GraphQLObjectType({
    name: "User",
    fields: {
        id: {type: GraphQLString},
        firstName: {type: GraphQLString},
        age: {type: GraphQLInt}
    }
});

const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        user: {
            type: UsertType,
            args: {id: {type: GraphQLString}},
            resolve(_parentValue, args) {
                return axios
                    .get(`http://localhost:3000/users/${args.id}`)
                    .then(response => response.data)
                    .then(data => data);
            }
        }
    }
});

export const schema = new GraphQLSchema({
    query: RootQuery
});
