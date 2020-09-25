const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLID, GraphQLList, GraphQLSchema } = graphql;
const _ = require("lodash");
const Book = require("../models/book");
const Author = require("../models/author");

const bookType = new GraphQLObjectType({
	name: "Book",
	fields: () => ({
		id: { type: GraphQLID },
		name: { type: GraphQLString },
		genre: { type: GraphQLString },
		author: {
			type: authorType,
			resolve(parent, args) {
				// return _.find(authors, { id: parent.authorId });
			},
		},
	}),
});

const authorType = new GraphQLObjectType({
	name: "Author",
	fields: () => ({
		id: { type: GraphQLID },
		name: { type: GraphQLString },
		age: { type: GraphQLInt },
		books: {
			type: new GraphQLList(bookType),
			resolve(parent, args) {
				// return _.filter(books, { authorId: parent.id });
			},
		},
	}),
});

const RootQuery = new GraphQLObjectType({
	name: "RootQueryType",
	fields: {
		book: {
			type: bookType,
			args: { id: { type: GraphQLID } },
			resolve(parent, args) {
				//code to get data from DB/other source
				// return _.find(books, { id: args.id });
			},
		},
		author: {
			type: authorType,
			args: { id: { type: GraphQLID } },
			resolve(parent, args) {
				// return _.find(authors, { id: args.id });
			},
		},
		books: {
			type: new GraphQLList(bookType),
			resolve(parent, args) {
				// return books;
			},
		},
		authors: {
			type: new GraphQLList(authorType),
			resolve(parent, args) {
				// return authors;
			},
		},
	},
});

const Mutation = new GraphQLObjectType({
	name: "Mutation",
	fields: {
		addAuthor: {
			type: authorType,
			args: {
				name: { type: GraphQLString },
				age: { type: GraphQLInt },
			},
		},
	},
});

module.exports = new GraphQLSchema({ query: RootQuery });
