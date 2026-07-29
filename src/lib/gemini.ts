import { createServerFn } from "@tanstack/react-start";
import { mobiles } from "@/data/mobiles";
import { SHOP, inr } from "@/lib/shop";

export const chatWithGemini = createServerFn({ method: "POST" })
  .validator((data: { message: string; history?: { role: "user" | "model"; parts: { text: string }[] }[] }) => data)
  .handler(async ({ data }) => {
    // Only initialized on the server
    const apiKey = process.env.VITE_GEMINI_API_KEY || process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is not set in the environment.");
    }

    // Format entire inventory for context (Gemini 2.5 Flash has a huge context window)
    const inventoryInfo = mobiles.map(m => 
      `- ${m.brand} ${m.name}: ${m.price ? inr(m.price) : "Out of stock"}. Specs: Processor: ${m.specs.processor}, RAM: ${m.specs.ram}, Storage: ${m.specs.storage}. Camera: ${m.specs.camera}. Battery: ${m.specs.battery}`
    ).join("\n");

    const systemPrompt = `You are the expert mobile consultant and AI assistant for ${SHOP.name}.
Address: ${SHOP.address}
Hours: ${SHOP.hours}
Phone: ${SHOP.phone}
WhatsApp: ${SHOP.whatsapp}
Email: ${SHOP.email}

Your job is to assist customers browsing the website. You should act as a highly knowledgeable smartphone expert.
1. Answer questions about our products, pricing, and shop details.
2. If a customer asks for a recommendation or comparison (e.g., "which phone is better in camera?", "best gaming phone?"), carefully compare the specs (processor, camera, battery) of the phones in our inventory and give a clear, helpful recommendation based on their needs.
3. Always use Indian Rupees (₹) for pricing.
4. Keep your answers conversational, friendly, and structured (use bullet points if listing multiple phones).
5. If relevant, remind customers that we also stock all smartphone accessories (cases, tempered glass, chargers, earbuds) at our physical store.

Here is our complete mobile inventory with detailed specs:
${inventoryInfo}

If they ask about something we don't have, politely let them know they can contact us on WhatsApp (${SHOP.whatsapp}) to check if we can source it for them.`;

    try {
      // Structure the payload exactly like the REST API expects
      const payload = {
        system_instruction: {
          parts: { text: systemPrompt }
        },
        contents: [
          ...(data.history || []),
          { role: "user", parts: [{ text: data.message }] }
        ],
        generationConfig: {
          temperature: 0.7,
        }
      };

      const URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash-lite:generateContent?key=${apiKey}`;

      const response = await fetch(URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error(`API returned status: ${response.status}`);
      }

      const responseData = await response.json();
      const text = responseData.candidates[0].content.parts[0].text;
      
      return { text };
    } catch (error: any) {
      console.error("Gemini API Error:", error);
      throw new Error("Failed to communicate with AI assistant.");
    }
  });
