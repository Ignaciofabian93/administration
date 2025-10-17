import gql from "graphql-tag";

export const communityTypeDefs = gql`
  # Community Types
  type CommunityPost {
    id: ID!
    sellerId: String!
    content: String!
    images: [String!]!
    likes: Int!
    comments: Int!
    createdAt: DateTime!
    updatedAt: DateTime!
    commentsList: [CommunityComment!]!
    seller: Seller!
  }

  type CommunityComment {
    id: ID!
    communityPostId: Int!
    sellerId: String!
    content: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    communityPost: CommunityPost!
    seller: Seller!
  }

  type CommunityCategory {
    id: ID!
    category: String!
    communitySubCategories: [CommunitySubCategory!]!
  }

  type CommunitySubCategory {
    id: ID!
    subCategory: String!
    communityCategoryId: Int!
    communityCategory: CommunityCategory!
  }

  # Community Post Input Types
  input CreateCommunityPostInput {
    content: String!
    images: [String!]
  }

  input UpdateCommunityPostInput {
    content: String
    images: [String!]
  }

  input CreateCommunityCommentInput {
    communityPostId: Int!
    content: String!
  }

  input UpdateCommunityCommentInput {
    content: String!
  }

  # Community Input Types (Updates)
  input CreateCommunityCategoryInput {
    category: String!
  }

  input UpdateCommunityCategoryInput {
    category: String
  }

  input CreateCommunitySubCategoryInput {
    subCategory: String!
    communityCategoryId: Int!
  }

  input UpdateCommunitySubCategoryInput {
    subCategory: String
    communityCategoryId: Int
  }

  type CommunityPostsConnection {
    nodes: [CommunityPost!]!
    pageInfo: PageInfo!
  }

  type CommunityCommentsConnection {
    nodes: [CommunityComment!]!
    pageInfo: PageInfo!
  }

  extend type Query {
    # Community category queries
    getCommunityCategories: [CommunityCategory!]!
    getCommunityCategory(id: ID!): CommunityCategory
    getCommunitySubCategories(communityCategoryId: Int): [CommunitySubCategory!]!
    getCommunitySubCategory(id: ID!): CommunitySubCategory

    # Community queries with pagination
    getCommunityPosts(sellerId: String, page: Int = 1, pageSize: Int = 10): CommunityPostsConnection!
    getCommunityPost(id: ID!): CommunityPost
    getCommunityComments(communityPostId: Int!, page: Int = 1, pageSize: Int = 10): CommunityCommentsConnection!
    getCommunityComment(id: ID!): CommunityComment
  }

  extend type Mutation {
    # Community post management
    createCommunityPost(input: CreateCommunityPostInput!): CommunityPost!
    updateCommunityPost(id: ID!, input: UpdateCommunityPostInput!): CommunityPost!
    deleteCommunityPost(id: ID!): Boolean!

    # Community comment management
    createCommunityComment(input: CreateCommunityCommentInput!): CommunityComment!
    updateCommunityComment(id: ID!, input: UpdateCommunityCommentInput!): CommunityComment!
    deleteCommunityComment(id: ID!): Boolean!
    # Community category management
    createCommunityCategory(input: CreateCommunityCategoryInput!): CommunityCategory!
    updateCommunityCategory(id: ID!, input: UpdateCommunityCategoryInput!): CommunityCategory!
    deleteCommunityCategory(id: ID!): Boolean!

    createCommunitySubCategory(input: CreateCommunitySubCategoryInput!): CommunitySubCategory!
    updateCommunitySubCategory(id: ID!, input: UpdateCommunitySubCategoryInput!): CommunitySubCategory!
    deleteCommunitySubCategory(id: ID!): Boolean!
  }
`;
