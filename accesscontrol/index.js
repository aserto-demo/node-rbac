//Express app
const express = require("express");
const AccessControl = require("accesscontrol");
const { resolveUserRoles } = require("../utils");
const grantList = require("./grantlist");

const ac = new AccessControl(grantList);
ac.grant("evilGenius").extend("sidekick");

const app = express();
app.use(express.json());

const assets = {
  megaSeeds: {
    id: "megaSeeds",
    content: "Mega Seeds grow on Mega Trees"
  },
  timeCrystals: {
    id: "timeCrystals",
    content: "Time Crystals let you see the future"
  }
};

const hasPermission = (action) => {
  return (req, res, next) => {
    const { user } = req.body;
    const { asset } = req.params;
    const userRoles = resolveUserRoles(user);
    const allowed = userRoles.reduce((perms, role) => {
      let permissions;
      switch (action) {
        case "gather":
          permissions = ac.can(role).readAny(asset);
          if (permissions.granted) {
            perms = perms.concat(permissions);
          }
          break;
        case "consume":
          permissions = ac.can(role).updateAny(asset);
          if (permissions.granted) {
            perms = perms.concat(permissions);
          }
          break;
        case "destroy":
          permissions = ac.can(role).deleteAny(asset);
          if (permissions.granted) {
            perms = perms.concat(permissions);
          }
          break;
      }
      return perms;
    }, []);

    if (allowed.length) {
      const result = allowed.map((perm) => {
        const data = assets[asset];
        return {
          data: perm.filter(data),
          asRole: perm._.role
        };
      });

      res.locals = result;
      next();
    } else {
      res.status(403).send("Forbidden");
    }
  };
};

app.get("/api/:asset", hasPermission("gather"), (req, res) => {
  res.send("Got Permission");
});

app.put("/api/:asset", hasPermission("consume"), (req, res) => {
  res.send("Got Permission");
});

app.delete("/api/:asset", hasPermission("destroy"), (req, res) => {
  res.send("Got Permission");
});

app.listen(8080, () => {
  console.log("listening on port 8080");
});
