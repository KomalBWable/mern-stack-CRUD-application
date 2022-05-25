"use strict";
const Hapi = require("@hapi/hapi");
const Path = require("path");
require("./models/db");
// const server = Hapi.server({ port: 3000 });
// server.state("*", {
//   ttl: null,
//   isSecure: true,
//   isHttpOnly: true,
// });

// app.use(require("cors")());
// app.use(require("helmet")());
// app.use("/api/employee", require("./routes/employee"));

// Production
// if (process.env.NODE_ENV === "production")
//   // Set static folder
//   app.use(express.static("client/build"));
const init = async () => {
  const server = new Hapi.Server({
    port: 3000,
    host: "localhost",
    routes: {
      files: {
        relativeTo: Path.join(__dirname, "public"),
      },
    },
  });

  await server.register(require("@hapi/inert"));
  server.route({
    method: "GET",
    path: "/",
    handler: (request, h) => {
      console.log("h");
      // return h.file("path");
      return "heloooooooo";
    },
  });
  await server.start();
  console.log("Server running on port 3000");
};
process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

// .listen(PORT, () => console.log(`App running on port ${PORT}`)app);
init();
