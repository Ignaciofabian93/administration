import gql from "graphql-tag";

export const baseTypeDefs = gql`
  scalar DateTime
  scalar JSON

  # Pagination Types
  type PageInfo {
    hasNextPage: Boolean!
    hasPreviousPage: Boolean!
    startCursor: String
    endCursor: String
    totalCount: Int!
    totalPages: Int!
    currentPage: Int!
    pageSize: Int!
  }

  # Bulk Import Response Types
  type BulkImportResult {
    success: Boolean!
    created: Int!
    failed: Int!
    errors: [BulkImportError!]!
  }

  type BulkImportError {
    row: Int!
    data: JSON!
    error: String!
  }

  # Root Query and Mutation types (to be extended by other schemas)
  type Query
  type Mutation
`;
