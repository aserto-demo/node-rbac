//Express app
const express = require("express");
const { resolveUserRoles } = require("../utils");
const roles = require("./roles");
const app = express();

app.use(express.json());

const hasPermission = (action) => {
  return (req, res, next) => {
    const { user } = req.body;
    const { asset } = req.params;
    const userRoles = resolveUserRoles(user);

    const permissions = userRoles.reduce((perms, role) => {
      perms =
        roles[role] && roles[role][action]
          ? perms.concat(roles[role][action])
          : perms.concat([]);
      return perms;
    }, []);

    const allowed = permissions.includes(asset);

    allowed ? next() : res.status(403).send("Forbidden").end();
  };
};

app.get("/api/:asset", hasPermission("read"), (req, res) => {
  res.send("Got Permission");
});

app.put("/api/:asset", hasPermission("edit"), (req, res) => {
  res.send("Got Permission");
});

app.delete("/api/:asset", hasPermission("delete"), (req, res) => {
  res.send("Got Permission");
});

app.listen(8080, () => {
  console.log("listening on port 8080");
});
