const swaggerAutogen = require("swagger-autogen")();

const outputFile = "./modules/swaggerOutput.json";
const endpointsFiles = ["./modules/endpoints.js"];

swaggerAutogen(outputFile, endpointsFiles);