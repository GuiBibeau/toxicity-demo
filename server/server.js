const express = require("express");
const app = express();
const toxicity = require("@tensorflow-models/toxicity");

const THRESHOLD = 0.9;

const port = process.env.PORT || 8080;

const startServer = async () => {
  console.log("Loading model...");
  const model = await toxicity.load(THRESHOLD);

  app.get(["/toxicity"], async (req, res) => {
    const prompt = req.query.prompt;
    const predictions = await model.classify([prompt]);
    res.json(predictions);
  });

  app.listen(port, async () => {
    console.log(`listening on port ${port}!`);
  });
};  

startServer();
