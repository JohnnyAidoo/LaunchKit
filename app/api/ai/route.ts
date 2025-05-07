export async function POST(req) {
  try {
    const { message } = await req.json(); // Expect a single message from the request

    const response = await fetch("https://api.deepseek.com/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.DEEPSEEK_API_KEY}`,
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages: [{ role: "user", content: message }],
        stream: false,
      }),
    });

    if (!response.ok) {
      return new Response(JSON.stringify({ error: "DeepSeek API error" }), {
        status: response.status,
      });
    }

    const data = await response.json();

    // Extract only the content from the first choice
    const assistantMessage =
      data.choices?.[0]?.message?.content || "No response from AI.";

    return new Response(JSON.stringify({ content: assistantMessage }), {
      status: 200,
    });
  } catch (error) {
    console.error("API Error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch from DeepSeek API" }),
      {
        status: 500,
      }
    );
  }
}
