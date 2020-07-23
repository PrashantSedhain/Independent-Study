const http = require("http");
const app = require("./backend/app");

const normalizePort = (val) => {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }

  if (port >= 0) {
    return port;
  }

  return false;
};

const onListening = () => {
  const addr = server.address();
  const bind = typeof addr === "string" ? "pipe" + addr : "port " + port;
  console.log("App is listening on " + bind);
};

const port = normalizePort(process.env.PORT || "3000");
app.set("port", port);

// Serve static files....
app.use(express.static(__dirname + "/dist/splitwise"));

// Send all requests to index.html
app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname + "/dist/splitwise/index.html"));
});

const server = http.createServer(app);
server.on("listening", onListening);
server.listen(port);
