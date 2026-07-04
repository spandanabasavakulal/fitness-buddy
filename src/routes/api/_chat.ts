import { createServerFn } from "@tanstack/react-start";
import { WatsonXAI } from "@ibm-cloud/watsonx-ai";

export const chatWithCoach = createServerFn({ method: "POST" })
  .validator((data: { message: string }) => data)
  .handler(async ({ data }) => {
    try {
      const watsonx = WatsonXAI.newInstance({
        version: "2024-05-31",
        serviceUrl: process.env.IBM_URL!,
      });

      watsonx.setServiceUrl(process.env.IBM_URL!);

      const response = await watsonx.generateText({
        projectId: process.env.IBM_PROJECT_ID!,
        modelId: "ibm/granite-3-3-8b-instruct",
        input: `You are Fitness Buddy, an AI fitness coach.

Rules:
- Give safe home workout advice.
- Suggest simple Indian meal ideas.
- Motivate users positively.
- Do not diagnose diseases.
- Tell users to consult doctors for medical problems.

User: ${data.message}

Assistant:`,
        parameters: {
          max_new_tokens: 300,
          temperature: 0.7,
        },
      });

      return (
        response.result?.results?.[0]?.generated_text ??
        "Sorry, I couldn't generate a response."
      );
    } catch (error) {
      console.error(error);
      return "Sorry, IBM Granite is temporarily unavailable.";
    }
  });