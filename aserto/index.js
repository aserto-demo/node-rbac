const express = require("express");
const app = express();
const cors = require("cors");
const { is } = require("express-jwt-aserto");
require("dotenv").config();

// Enable CORS
app.use(cors());
app.use(express.json());

//Aserto authorizer configuration
const options = {
  authorizerServiceUrl: "https://authorizer.prod.aserto.com",
  policyId: process.env.POLICY_ID,
  authorizerApiKey: process.env.AUTHORIZER_API_KEY,
  tenantId: process.env.TENANT_ID,
  policyRoot: process.env.POLICY_ROOT,
  useAuthorizationHeader: false
};

const hasPermission = (action) => {
  return async (req, res, next) => {
    const { user } = req.body;
    const { asset } = req.params;
    req.user = { sub: user.id };
    const allowed = await is("allowed", req, options, false, { asset });
    allowed ? next() : res.status(403).send("Forbidden").end();
  };
};

//Aserto authorizer middleware function
app.get("/api/:asset", hasPermission("gather"), (req, res) => {
  res.send("Got Permission");
});

app.put("/api/:asset", hasPermission("consume"), (req, res) => {
  res.send("Got Permission");
});

app.delete("/api/:asset", hasPermission("destroy"), (req, res) => {
  res.send("Got Permission");
});

// Launch the API Server at localhost:8080
app.listen(8080);
