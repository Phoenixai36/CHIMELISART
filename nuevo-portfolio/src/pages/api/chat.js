export async function POST({ request, locals }) {
    const { messages } = await request.json();
    const GEMINI_API_KEY = locals.runtime.env.GEMINI_API_KEY;

    if (!GEMINI_API_KEY) {
        return new Response(JSON.stringify({ error: 'Gemini API Key missing' }), { status: 500 });
    }

    // System prompt to contextualize Gemini as a Spanish Art Assistant
    const systemPrompt = `Eres el asistente de arte de Francesc Chimelis. 
  Tu objetivo es ayudar a los visitantes a entender su obra de surrealismo figurativo.
  Francesc nació en 1956 en Barcelona. Su técnica es mixta. 
  Háblame siempre con un tono sofisticado, artístico y amable. 
  Si te preguntan por precios, redirígeles a la sección 'Tienda' o dile que pueden consultar por email.`;

    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [
                    { role: 'user', parts: [{ text: systemPrompt }] },
                    ...messages.map(m => ({
                        role: m.role === 'assistant' ? 'model' : 'user',
                        parts: [{ text: m.content }]
                    }))
                ]
            })
        });

        const data = await response.json();
        const reply = data.candidates[0].content.parts[0].text;

        return new Response(JSON.stringify({ reply }), { status: 200 });

    } catch (err) {
        return new Response(JSON.stringify({ error: 'Error processing AI request' }), { status: 500 });
    }
}
