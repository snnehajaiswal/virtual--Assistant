import dotenv from "dotenv";
dotenv.config();
import axios from "axios";

const geminiResponse = async (command, assistantName, userName) => {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`;
    console.log(apiUrl)
    const prompt = `You are a virtual assistant named ${assistantName} created by ${userName}.
You are not Google. You will now behave like a voice-enabled assistant.

Your task is to understand the user's natural language input and respond with a JSON object like this:

{
  "type": "general" | "google_search" | "youtube_search" | "youtube_play"
           | "calculator_open" | "instagram_open" | "facebook_open" |
           "weather-show" | "get_time" | "get_date" | "get_day" | "get_month",
  "userInput": "<original user input> {remove your name if it exists}",
  "response": "<a short spoken response>"
}

Important:
- If someone asks "Who created you?", respond with "${userName}".
- Only respond with the JSON object.

Now here is the userInput: ${command}`;

    const result = await axios.post(apiUrl, {
      contents: [{ parts: [{ text: prompt }] }],
    }, { timeout: 10000 });

    const output = result?.data?.candidates?.[0]?.content?.parts?.[0]?.text || null;
    return output;

  } catch (error) {
    console.error("Gemini API error:", error.response?.data || error);
    return "Sorry, I’m having trouble reaching the AI service right now.";
  }
};

export default geminiResponse;
