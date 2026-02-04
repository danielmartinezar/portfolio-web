import express from "express";
import { renderPage, createDevMiddleware } from "vike/server";

const isProduction = process.env.NODE_ENV === "production";
const port = process.env.PORT || 3000;
const root = process.cwd();

startServer();

async function startServer() {
  const app = express();

  if (isProduction) {
    app.use(express.static(`${root}/dist/client`, { index: false }));
  } else {
    const { devMiddleware } = await createDevMiddleware({ root });
    app.use(devMiddleware);
  }

  app.get("/{*path}", async (req, res) => {
    const pageContext = await renderPage({ urlOriginal: req.originalUrl });
    const { httpResponse } = pageContext;

    if (!httpResponse) {
      return res.status(404).send("Not Found");
    }

    const { statusCode, headers, body } = httpResponse;
    for (const [name, value] of headers) {
      res.setHeader(name, value);
    }
    res.status(statusCode).send(body);
  });

  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
}
