const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "My API",
    description: "E-Commerce Store",
  },
  host: `localhost:${process.env.PORT || 5000}`,
};

const outputFile = "./swagger.json";
const routes = [
  "./routes/productRoutes",
  "./routes/userRoutes",
  "./routes/orderRoutes",
];

swaggerAutogen(outputFile, routes, doc);
