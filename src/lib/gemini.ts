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

    // Format inventory for context
    const inventoryInfo = mobiles.slice(0, 15).map(m => 
      `- ${m.brand} ${m.name}: ${m.price ? inr(m.price) : "Out of stock"}. Specs: ${m.specs.processor}, ${m.specs.ram}, ${m.specs.storage}. Camera: ${m.specs.camera}. Battery: ${m.specs.battery}`
    ).join("\n");

    const systemPrompt = `You are the friendly, helpful AI assistant for ${SHOP.name}.
Address: ${SHOP.address}
Hours: ${SHOP.hours}
Phone: ${SHOP.phone}
WhatsApp: ${SHOP.whatsapp}
Email: ${SHOP.email}

Your job is to assist customers browsing the website. You should answer questions about our products, pricing, and shop details. Keep your answers concise, friendly, and helpful. Do not mention that you are an AI unless asked.
Always use Indian Rupees (₹) for pricing.

Here is a summary of some top mobiles in our inventory:
${inventoryInfo}

If a user asks for a product not in this top 15 list, inform them they can check our full inventory on the website, or contact us directly on WhatsApp (${SHOP.whatsapp}).`;

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

      const URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

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
