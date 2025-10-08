const allowedEnvironments = ["production", "qa", "development"] as const;
type Environment = (typeof allowedEnvironments)[number];

const env = process.env.ENVIRONMENT;
export const environment: Environment = allowedEnvironments.includes(env as Environment) ? (env as Environment) : "development";

// Images configuration
export const imagesConfig = {
  development: {
    basePath: process.env.DEV_IMAGES_PATH || "/public/images",
    baseUrl: "http://localhost:6000/images",
  },
  qa: {
    // Inside the container, the volume is mounted at /app/images
    basePath: process.env.IMAGES_PATH || "/app/images",
    baseUrl: process.env.IMAGES_BASE_URL || "https://qa.gateway.ekoru.cl/images",
  },
  production: {
    // Inside the container, the volume is mounted at /app/images
    basePath: process.env.IMAGES_PATH || "/app/images",
    baseUrl: "https://gateway.ekoru.cl/images",
  },
};

export const getImagesConfig = () => imagesConfig[environment];
