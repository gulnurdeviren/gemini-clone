import {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } from "@google/generative-ai";
  
  const apiKey = "AIzaSyByBjTKidWuKjCfGDAuHW4Xc65QkLtZmGg"; // Securely handle the API key
  const genAI = new GoogleGenerativeAI(apiKey);
  
  async function getModel() {
    try {
      const model = await genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
      });
      console.log();
      return model;
    } catch (error) {
      console.error("Error fetching model:", error);
      throw error;
    }
  }
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };
  
  async function run(prompt) {
    try {
      const model = await getModel();
      const chatSession = model.startChat({
        generationConfig,
        // safetySettings: Adjust safety settings
        // See https://ai.google.dev/gemini-api/docs/safety-settings
        history: [],
      });
  
      const result = await chatSession.sendMessage(prompt);
      const response = result.response; // if response is a Response object
      console.log(response.text());
      return response.text();
    } catch (error) {
      console.error("Error while sending message:", error);
      throw error;
    }
  }
  
  export default run;
  