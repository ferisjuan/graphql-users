import {GraphQLInt, GraphQLObjectType, GraphQLSchema, GraphQLString} from 'graphql'
import _ from 'lodash'

const users = [
    {id: '23', firstName: 'Juan', age: 43},
    {id: '23', firstName: 'Mayi', age: 40},
]

const UsertType = new GraphQLObjectType({
    name: 'User',
    fields: {
        id: {type: GraphQLString},
        firstName: {type: GraphQLString},
        age: {type: GraphQLInt}
    }
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        user: {
            type: UsertType,
            args: {id: {type: GraphQLString}},
            resolve(_parentValue, args){
                return _.find(users, {id: args.id})
            }
        }
    }
})

export const schema = new GraphQLSchema({
    query: RootQuery
})
