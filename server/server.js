import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import OpenAI from "openai";

const app = express();

app.use(cors());
app.use(express.json());

/* ---------------- GROQ CONFIG ---------------- */

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: process.env.OPENAI_BASE_URL,
});

/* ---------------- HEALTH CHECK ---------------- */

app.get("/", (req, res) => {
  res.send("AI Career Architect Backend Running 🚀");
});

/* ---------------- AI ROADMAP ROUTE ---------------- */
app.post("/api/generate-plan", async (req, res) => {
  try {
    const { role } = req.body;

    if (!role) {
      return res.status(400).json({
        success: false,
        error: "Role is required",
      });
    }

    const completion = await openai.chat.completions.create({
      model: process.env.MODEL,
      messages: [
        {
          role: "system",
          content:
            "You are an expert AI career architect. Always return only valid JSON with no explanations."
        },
        {
          role: "user",
          content: `
Create a learning roadmap for becoming a ${role}.

Return ONLY valid JSON in this format:

{
  "role": "",
  "readinessScore": number,
  "phases": [
    {
      "title": "Phase 1 - Foundations",
      "topics": ["", "", ""]
    },
    {
      "title": "Phase 2 - Intermediate",
      "topics": ["", "", ""]
    },
    {
      "title": "Phase 3 - Advanced",
      "topics": ["", "", ""]
    }
  ]
}
`
        }
      ],
      temperature: 0.7,
    });

    let aiText = completion.choices[0].message.content;

    // 🔥 REMOVE MARKDOWN WRAPPERS (```json ... ```)
    aiText = aiText.replace(/```json/g, "");
    aiText = aiText.replace(/```/g, "");
    aiText = aiText.trim();

    const parsed = JSON.parse(aiText);

    res.json({
      success: true,
      data: parsed
    });

  } catch (error) {
    console.error("AI ERROR:", error.message);

    res.status(500).json({
      success: false,
      error: "AI generation failed"
    });
  }
});

/* ---------------- START SERVER ---------------- */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});