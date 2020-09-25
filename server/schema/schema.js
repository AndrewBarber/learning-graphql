const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLID, GraphQLList, GraphQLSchema } = graphql;
const _ = require("lodash");

//Dummy data
let books = [
	{ name: "Name of the Wind", genre: "Fantasy", id: "1", authorId: "1" },
	{ name: "Final Empire", genre: "Fantasy", id: "2", authorId: "2" },
	{ name: "The Long Earth", genre: "Sci-Fi", id: "3", authorId: "3" },
	{ name: "The Long Earth 2", genre: "Sci-Fi", id: "4", authorId: "3" },
	{ name: "Age of Doom", genre: "Fantasy", id: "5", authorId: "2" },
];

let authors = [
	{ name: "Andrew Barber", age: 44, id: "1" },
	{ name: "Conrad Deasy", age: 45, id: "2" },
	{ name: "Ian Barber", age: 46, id: "3" },
];

const bookType = new GraphQLObjectType({
	name: "Book",
	fields: () => ({
		id: { type: GraphQLID },
		name: { type: GraphQLString },
		genre: { type: GraphQLString },
		author: {
			type: authorType,
			resolve(parent, args) {
				return _.find(authors, { id: parent.authorId });
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
				return _.filter(books, { authorId: parent.id });
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
				return _.find(books, { id: args.id });
			},
		},
		author: {
			type: authorType,
			args: { id: { type: GraphQLID } },
			resolve(parent, args) {
				return _.find(authors, { id: args.id });
			},
		},
		books: {
			type: new GraphQLList(bookType),
			resolve(parent, args) {
				return books;
			},
		},
		authors: {
			type: new GraphQLList(authorType),
			resolve(parent, args) {
				return authors;
			},
		},
	},
});

module.exports = new GraphQLSchema({ query: RootQuery });
