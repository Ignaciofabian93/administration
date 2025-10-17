import gql from "graphql-tag";

export const blogTypeDefs = gql`
  # Blog Types
  type BlogPost {
    id: ID!
    title: String!
    content: String!
    authorId: String!
    isPublished: Boolean!
    publishedAt: DateTime
    createdAt: DateTime!
    updatedAt: DateTime!
    category: BlogCategory!
    author: Admin!
  }

  type BlogPostsConnection {
    nodes: [BlogPost!]!
    pageInfo: PageInfo!
  }

  # Blog Post Input Types
  input CreateBlogPostInput {
    title: String!
    content: String!
    category: BlogCategory!
    isPublished: Boolean
  }

  input UpdateBlogPostInput {
    title: String
    content: String
    category: BlogCategory
    isPublished: Boolean
  }

  extend type Query {
    # Blog post queries with pagination
    getBlogPosts(category: BlogCategory, isPublished: Boolean, page: Int = 1, pageSize: Int = 10): BlogPostsConnection!
    getBlogPost(id: ID!): BlogPost
    getBlogPostsByAuthor(authorId: ID!, page: Int = 1, pageSize: Int = 10): BlogPostsConnection!
  }

  extend type Mutation {
    # Blog post management
    createBlogPost(input: CreateBlogPostInput!): BlogPost!
    updateBlogPost(id: ID!, input: UpdateBlogPostInput!): BlogPost!
    deleteBlogPost(id: ID!): Boolean!
    publishBlogPost(id: ID!): BlogPost!
    unpublishBlogPost(id: ID!): BlogPost!
  }
`;
