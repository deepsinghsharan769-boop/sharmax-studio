const express = require("express");
const cors = require("cors");
const OpenAI = require("openai");

const app = express();

app.use(cors());
app.use(express.json({ limit: "1mb" }));

app.get("/", (req, res) => {
res.json({ status: "SHARMAX backend is running" });
});

app.post("/api/chat", async (req, res) => {
try {
const apiKey = process.env.OPENAI_API_KEY;

```
if (!apiKey) {
  return res.status(500).json({
    error: "OPENAI_API_KEY is not configured on the server."
  });
}

const client = new OpenAI({ apiKey });
const message = req.body.message;

if (typeof message !== "string" || !message.trim()) {
  return res.status(400).json({
    error: "Please enter a message."
  });
}

const response = await client.responses.create({
  model: "gpt-4.1-mini",
  instructions:
    "You are SHARMAX STUDIO's AI documentary editing assistant. Help users plan Hindi documentaries, analyze narration, suggest authentic archival visuals, create editing timelines, captions, sound design, and cinematic effects. Never claim you have edited or exported a video unless the connected tools actually did so.",
  input: message.trim()
});

res.json({
  reply: response.output_text || "No response was returned."
});
```

} catch (error) {
console.error("SHARMAX AI error:", error.message);
res.status(500).json({
error: "AI request failed. Check the server configuration and API account."
});
}
});

const port = process.env.PORT || 3000;

app.listen(port, "0.0.0.0", () => {
console.log(`SHARMAX backend running on port ${port}`);
});
