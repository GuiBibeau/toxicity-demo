const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  const { prompt } = req.body;
  const encodedPrompt = encodeURIComponent(prompt);

  const options = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };

  const data = await fetch(
    `https://toxic-api.fly.dev/toxicity?prompt=${encodedPrompt}`,
    options
  ).then((response) => response.json());

  const toxicResults = data.map((item) => item.results[0].match);
  const toxicDetections = toxicResults.filter(Boolean);

  if (toxicDetections.length > 0) {
    return res
      .status(400)
      .json({ answer: "You cannot use offensive language" });
  }

  const completion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt,
  });

  const answer = completion.data.choices[0].text;

  res.status(200).json({ answer });
}
