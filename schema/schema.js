import axios from "axios";
import {
    GraphQLInt,
    GraphQLList,
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLString
} from "graphql";

const CompanyType = new GraphQLObjectType({
    name: "Company",
    fields: () => ({
        id: {type: GraphQLString},
        name: {type: GraphQLString},
        description: {type: GraphQLString},
        users: {
            type: new GraphQLList(UsertType),
            async resolve(parentValue, _args) {
                const response = await axios.get(
                    `http://localhost:3000/companies/${parentValue.id}/users`
                );
                return response.data;
            }
        }
    })
});

const UsertType = new GraphQLObjectType({
    name: "User",
    fields: () => ({
        id: {type: GraphQLString},
        firstName: {type: GraphQLString},
        age: {type: GraphQLInt},
        company: {
            type: CompanyType,
            async resolve(parentValue, _args) {
                const response = await axios.get(
                    `http://localhost:3000/companies/${parentValue.companyId}`
                );
                return response.data;
            }
        }
    })
});

const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        user: {
            type: UsertType,
            args: {id: {type: GraphQLString}},
            async resolve(_parentValue, args) {
                const response = await axios.get(
                    `http://localhost:3000/users/${args.id}`
                );
                return response.data;
            }
        },
        company: {
            type: CompanyType,
            args: {id: {type: GraphQLString}},
            async resolve(_parentValue, args) {
                const response = await axios.get(
                    `http://localhost:3000/companies/${args.id}`
                );
                return response.data;
            }
        }
    }
});

export const schema = new GraphQLSchema({
    query: RootQuery
});
