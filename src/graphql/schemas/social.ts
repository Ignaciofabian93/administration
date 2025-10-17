import gql from "graphql-tag";

export const socialTypeDefs = gql`
  # Social Types
  type Match {
    id: ID!
    senderId: String!
    receiverId: String!
    createdAt: DateTime!
    isMatched: Boolean!
    receiver: Seller!
    sender: Seller!
  }

  type Story {
    id: ID!
    images: [String!]!
    title: String!
    description: String!
    sellerId: String!
    seller: Seller!
  }

  extend type Query {
    # Match queries
    getMatch(id: ID!): Match
    getMyMatches(isMatched: Boolean, page: Int = 1, pageSize: Int = 10): MatchesConnection!

    # Story queries
    getStory(id: ID!): Story
    getStories(sellerId: String, page: Int = 1, pageSize: Int = 10): StoriesConnection!
    getMyStories: [Story!]!
  }

  extend type Mutation {
    # Match management
    createMatch(receiverId: String!): Match!
    acceptMatch(matchId: ID!): Match!
    rejectMatch(matchId: ID!): Boolean!

    # Story management
    createStory(input: CreateStoryInput!): Story!
    updateStory(id: ID!, input: UpdateStoryInput!): Story!
    deleteStory(id: ID!): Boolean!
  }

  # Connection Types
  type MatchesConnection {
    nodes: [Match!]!
    pageInfo: PageInfo!
  }

  type StoriesConnection {
    nodes: [Story!]!
    pageInfo: PageInfo!
  }

  # Input Types
  input CreateStoryInput {
    images: [String!]!
    title: String!
    description: String!
  }

  input UpdateStoryInput {
    images: [String!]
    title: String
    description: String
  }
`;
