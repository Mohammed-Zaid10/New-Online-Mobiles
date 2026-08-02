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
      `- ${m.brand} ${m.model}: ${m.price ? inr(m.price) : "Out of stock"}. Specs: Processor: ${m.specs.processor}, RAM: ${m.specs.ram}, Storage: ${m.storage.join("/")}. Camera: ${m.specs.camera}. Battery: ${m.specs.battery}`
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

export const findPhones = createServerFn({ method: "POST" })
  .validator((data: { 
    budgetMin?: number; 
    budgetMax?: number; 
    brand?: string; 
    gaming: number; 
    camera: number; 
    battery: number; 
    displaySize?: string; 
    storage?: string; 
    requires5g: boolean; 
    fastCharging: boolean; 
    condition: string 
  }) => data)
  .handler(async ({ data }) => {
    const apiKey = process.env.VITE_GEMINI_API_KEY || process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is not set in the environment.");
    }

    // Dynamic import to avoid loading usedPhones unless needed
    const usedPhonesData = data.condition !== "New Only" ? (await import("@/data/used")).usedPhones : [];

    const newInventoryInfo = mobiles.map(m => 
      `- ${m.id} | ${m.brand} ${m.model} | New: ${m.price ? inr(m.price) : "Out of stock"} | Processor: ${m.specs.processor}, RAM: ${m.specs.ram}, Storage: ${m.storage.join(", ")}. Camera: ${m.specs.camera}. Battery: ${m.specs.battery}`
    ).join("\n");

    const usedInventoryInfo = usedPhonesData.length > 0 ? usedPhonesData.map(m => 
      `- ${m.id} | ${m.brand} ${m.model} | Used (${m.condition}): ${inr(m.price)} | Storage: ${m.storage}. Color: ${m.color}`
    ).join("\n") : "";

    const systemPrompt = `You are a smartphone recommendation AI for ${SHOP.name}.
Based on the user's preferences, find exactly 3 matching phones from our inventory.

User Preferences:
- Budget: ${data.budgetMin ? `₹${data.budgetMin}` : "0"} to ${data.budgetMax ? `₹${data.budgetMax}` : "Any"}
- Brand: ${data.brand || "Any"}
- Gaming Importance (1-5): ${data.gaming}
- Camera Importance (1-5): ${data.camera}
- Battery Importance (1-5): ${data.battery}
- Display Size: ${data.displaySize || "Any"}
- Storage Need: ${data.storage || "Any"}
- 5G Required: ${data.requires5g ? "Yes" : "No"}
- Fast Charging: ${data.fastCharging ? "Yes" : "No"}
- Condition: ${data.condition}

New Inventory:
${newInventoryInfo}

${usedInventoryInfo ? `Used Inventory:\n${usedInventoryInfo}` : ""}

Analyze the inventory and select the top 3 best matching phones.
Return a STRICT JSON response (an array of exactly 3 objects). Each object MUST have these exact properties:
- "id": The matching string ID from the inventory list
- "matchScore": A number from 0 to 100 representing how well it matches their preferences
- "reason": A short string explaining why this phone matches their needs
- "pros": An array of 3 to 4 string bullet points highlighting its pros
- "cons": An array of 2 to 3 string bullet points highlighting its cons

Do not output markdown, just the JSON array.`;

    try {
      const payload = {
        contents: [
          { role: "user", parts: [{ text: systemPrompt }] }
        ],
        generationConfig: {
          temperature: 0.3,
          response_mime_type: "application/json"
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
      
      return JSON.parse(text) as {
        id: string;
        matchScore: number;
        reason: string;
        pros: string[];
        cons: string[];
      }[];
    } catch (error: any) {
      console.error("Gemini API Error:", error);
      throw new Error("Failed to communicate with AI assistant.");
    }
  });

export const analyzeRepair = createServerFn({ method: "POST" })
  .validator((data: { brand: string; model: string; issue: string }) => data)
  .handler(async ({ data }) => {
    const apiKey = process.env.VITE_GEMINI_API_KEY || process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is not set in the environment.");
    }

    const systemPrompt = `You are an expert mobile repair technician for ${SHOP.name}.
A customer has a ${data.brand} ${data.model} with the following issue: "${data.issue}".

Analyze this issue and provide a STRICT JSON response with exactly these fields:
- "possibleCause": A short, clear explanation of what is likely causing the issue (max 2 sentences).
- "estimatedRepair": A brief indication of what needs to be repaired or replaced, and an estimated cost range in INR (₹).
- "repairTime": The estimated time required to fix this issue (e.g., "30-60 mins", "24-48 hours").
- "precautions": An array of 2-3 short, actionable strings on what the customer should or shouldn't do immediately to prevent further damage.

Do not output markdown, just the JSON object.`;

    try {
      const payload = {
        contents: [
          { role: "user", parts: [{ text: systemPrompt }] }
        ],
        generationConfig: {
          temperature: 0.2,
          response_mime_type: "application/json"
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
      
      return JSON.parse(text) as {
        possibleCause: string;
        estimatedRepair: string;
        repairTime: string;
        precautions: string[];
      };
    } catch (error: any) {
      console.error("Gemini API Error:", error);
      throw new Error("Failed to analyze repair issue.");
    }
  });

export const generateCompareReport = createServerFn({ method: "POST" })
  .validator((data: { 
    phones: { id: string; brand: string; model: string; price: number; processor: string; display: string }[]
  }) => data)
  .handler(async ({ data }) => {
    const apiKey = process.env.VITE_GEMINI_API_KEY || process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is not set in the environment.");
    }

    const phoneContext = data.phones.map(p => 
      `ID: "${p.id}" | ${p.brand} ${p.model} (Price: ${p.price}, CPU: ${p.processor}, Disp: ${p.display})`
    ).join("\n");

    const systemPrompt = `You are a smartphone expert generating a detailed comparison report.
I have these phones:
${phoneContext}

Generate a STRICT JSON response with the following schema exactly (no markdown):
{
  "specs": [ // Array matching the order of the phones provided
    {
      "id": "phone_id_here",
      "resolution": "e.g. 2796x1290",
      "refreshRate": "e.g. 120Hz",
      "gpu": "e.g. Apple GPU (6-core)",
      "frontCamera": "e.g. 12MP",
      "chargingSpeed": "e.g. 27W Wired, 15W MagSafe",
      "dimensions": "e.g. 159.9 x 76.7 x 8.25 mm",
      "wifiVersion": "e.g. Wi-Fi 6E",
      "bluetoothVersion": "e.g. BT 5.3",
      "nfc": "Yes" or "No",
      "waterResistance": "e.g. IP68",
      "fingerprintType": "e.g. In-display Ultrasonic",
      "faceUnlock": "e.g. 3D Face ID",
      "simType": "e.g. Dual SIM (Nano + eSIM)",
      "pros": ["Pro 1", "Pro 2", "Pro 3"],
      "cons": ["Con 1", "Con 2"],
      "ratings": {
        "camera": 0-5,
        "gaming": 0-5,
        "battery": 0-5,
        "display": 0-5,
        "performance": 0-5,
        "value": 0-5
      }
    }
  ],
  "summary": {
    "bestCamera": { "phoneId": "...", "reason": "..." },
    "bestGaming": { "phoneId": "...", "reason": "..." },
    "bestBattery": { "phoneId": "...", "reason": "..." },
    "bestBudget": { "phoneId": "...", "reason": "..." },
    "overallWinner": { "phoneId": "...", "reason": "..." }
  }
}

Important: The "id" inside each spec must perfectly match the ID from the input list. Estimate accurately if exact specs are ambiguous.`;

    try {
      const payload = {
        contents: [
          { role: "user", parts: [{ text: systemPrompt }] }
        ],
        generationConfig: {
          temperature: 0.1,
          response_mime_type: "application/json"
        }
      };

      const URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash-lite:generateContent?key=${apiKey}`;
      const response = await fetch(URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!response.ok) { throw new Error(`API returned status: ${response.status}`); }

      const responseData = await response.json();
      const text = responseData.candidates[0].content.parts[0].text;
      return JSON.parse(text);
    } catch (error: any) {
      console.error("Gemini API Error:", error);
      throw new Error("Failed to generate comparison report.");
    }
  });
