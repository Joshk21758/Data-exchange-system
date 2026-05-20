const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = process.env.PORT;

const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

app.prepare().then(() => {
  createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true);
      await handler(req, res, parsedUrl);
    } catch (error) {
      console.log("Error occurred during request: ", error);
      res.statusCode = 500;
      res.end("Internal Server Error");
    }
  })
    .once("error", (err) => {
      console.log("Error occured", err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`Server is running at http://${hostname}:${port}`);
    });
});
