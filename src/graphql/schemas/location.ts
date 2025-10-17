import gql from "graphql-tag";

export const locationTypeDefs = gql`
  # Location Types
  type CountryConfig {
    id: ID!
    countryId: Int!
    countryCode: String!
    currencyCode: String!
    currencySymbol: String!
    taxIdLabel: String!
    taxIdFormat: String
    defaultTimezone: String!
    defaultLocale: String!
    isActive: Boolean!
    phonePrefix: String!
    availablePaymentProviders: JSON!
    createdAt: DateTime!
    updatedAt: DateTime!
    country: Country!
  }

  type Country {
    id: ID!
    country: String!
  }

  type Region {
    id: ID!
    region: String!
    countryId: Int!
  }

  type City {
    id: ID!
    city: String!
    regionId: Int!
  }

  type County {
    id: ID!
    county: String!
    cityId: Int!
  }

  type CountriesConnection {
    nodes: [Country!]!
    pageInfo: PageInfo!
  }

  type RegionsConnection {
    nodes: [Region!]!
    pageInfo: PageInfo!
  }

  type CitiesConnection {
    nodes: [City!]!
    pageInfo: PageInfo!
  }

  type CountiesConnection {
    nodes: [County!]!
    pageInfo: PageInfo!
  }

  # Location Input Types
  input CreateCountryInput {
    country: String!
  }

  input UpdateCountryInput {
    country: String!
  }

  input CreateRegionInput {
    region: String!
    countryId: Int!
  }

  input UpdateRegionInput {
    region: String
    countryId: Int
  }

  input CreateCityInput {
    city: String!
    regionId: Int!
  }

  input UpdateCityInput {
    city: String
    regionId: Int
  }

  input CreateCountyInput {
    county: String!
    cityId: Int!
  }

  input UpdateCountyInput {
    county: String
    cityId: Int
  }

  # Bulk Import Input Types
  input BulkCountryInput {
    country: String!
  }

  input BulkRegionInput {
    region: String!
    countryId: Int!
  }

  input BulkCityInput {
    city: String!
    regionId: Int!
  }

  input BulkCountyInput {
    county: String!
    cityId: Int!
  }

  # Country Config Input Types
  input CreateCountryConfigInput {
    countryId: Int!
    countryCode: String!
    currencyCode: String!
    currencySymbol: String!
    taxIdLabel: String!
    taxIdFormat: String
    defaultTimezone: String!
    defaultLocale: String!
    isActive: Boolean
    phonePrefix: String!
    availablePaymentProviders: JSON!
  }

  input UpdateCountryConfigInput {
    countryCode: String
    currencyCode: String
    currencySymbol: String
    taxIdLabel: String
    taxIdFormat: String
    defaultTimezone: String
    defaultLocale: String
    isActive: Boolean
    phonePrefix: String
    availablePaymentProviders: JSON
  }

  type CountryConfigsConnection {
    nodes: [CountryConfig!]!
    pageInfo: PageInfo!
  }

  extend type Query {
    # Location queries with pagination
    getCountries(page: Int = 1, pageSize: Int = 10): CountriesConnection!
    getRegions(page: Int = 1, pageSize: Int = 10): RegionsConnection!
    getRegionsByCountry(countryId: ID!, page: Int = 1, pageSize: Int = 10): RegionsConnection!
    getCities(page: Int = 1, pageSize: Int = 10): CitiesConnection!
    getCitiesByRegion(regionId: ID!, page: Int = 1, pageSize: Int = 10): CitiesConnection!
    getCounties(page: Int = 1, pageSize: Int = 10): CountiesConnection!
    getCountiesByCity(cityId: ID!, page: Int = 1, pageSize: Int = 10): CountiesConnection!

    # Country config queries with pagination
    getCountryConfigs(isActive: Boolean, page: Int = 1, pageSize: Int = 10): CountryConfigsConnection!
    getCountryConfig(id: ID!): CountryConfig
    getCountryConfigByCode(countryCode: String!): CountryConfig

    # Bulk location exports (for CSV/XLSX generation)
    exportAllCountries: [Country!]!
    exportAllRegions: [Region!]!
    exportAllCities: [City!]!
    exportAllCounties: [County!]!
    exportRegionsByCountry(countryId: ID!): [Region!]!
    exportCitiesByRegion(regionId: ID!): [City!]!
    exportCountiesByCity(cityId: ID!): [County!]!
  }

  extend type Mutation {
    # Location management
    createCountry(input: CreateCountryInput!): Country!
    updateCountry(id: ID!, input: UpdateCountryInput!): Country!
    deleteCountry(id: ID!): Boolean!

    createRegion(input: CreateRegionInput!): Region!
    updateRegion(id: ID!, input: UpdateRegionInput!): Region!
    deleteRegion(id: ID!): Boolean!

    createCity(input: CreateCityInput!): City!
    updateCity(id: ID!, input: UpdateCityInput!): City!
    deleteCity(id: ID!): Boolean!

    createCounty(input: CreateCountyInput!): County!
    updateCounty(id: ID!, input: UpdateCountyInput!): County!
    deleteCounty(id: ID!): Boolean!

    # Bulk location imports
    bulkImportCountries(countries: [BulkCountryInput!]!): BulkImportResult!
    bulkImportRegions(regions: [BulkRegionInput!]!): BulkImportResult!
    bulkImportCities(cities: [BulkCityInput!]!): BulkImportResult!
    bulkImportCounties(counties: [BulkCountyInput!]!): BulkImportResult!

    # Country config management
    createCountryConfig(input: CreateCountryConfigInput!): CountryConfig!
    updateCountryConfig(id: ID!, input: UpdateCountryConfigInput!): CountryConfig!
    deleteCountryConfig(id: ID!): Boolean!
  }
`;
