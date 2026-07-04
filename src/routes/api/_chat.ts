import { createServerFn } from "@tanstack/react-start";
import { WatsonXAI } from "@ibm-cloud/watsonx-ai";
import { IamAuthenticator } from "ibm-cloud-sdk-core";

export const chatWithCoach = createServerFn({ method: "POST" })
  .validator((data: { message: string }) => data)
  .handler(async ({ data }) => {
    try {
      const watsonx = new WatsonXAI({
        version: "2024-05-31",
        serviceUrl: process.env.IBM_URL!,
        authenticator: new IamAuthenticator({
          apikey: process.env.IBM_API_KEY!,
        }),
      });

      const response = await watsonx.generateText({
        projectId: process.env.IBM_PROJECT_ID!,
        modelId: "meta-llama/llama-3-3-70b-instruct",
        input: `You are Fitness Buddy, a friendly AI fitness coach.

Rules:
- Give beginner-friendly workout advice.
- Suggest Indian meal plans.
- Motivate users positively.
- Ask follow-up questions.
- Use bullet points and emojis.
- Never diagnose diseases.
- Recommend consulting doctors for medical issues.

User: ${data.message}

Assistant:`,
        parameters: {
          max_new_tokens: 300,
          temperature: 0.7,
        },
      });

      return (
        response.result?.results?.[0]?.generated_text ||
        "Sorry, I couldn't generate a response."
      );
    } catch (error) {
      console.error(error);
      return "Sorry, IBM Granite is temporarily unavailable.";
    }
  });