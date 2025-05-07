import { NextResponse } from "next/server";

const GLADIA_API_KEY = process.env.GLADIA_API_KEY;
const GLADIA_API_URL = "https://api.gladia.io/audio/text/audio-transcription/";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { youtubeUrl } = body;

    if (
      !youtubeUrl ||
      (!youtubeUrl.includes("youtube.com") && !youtubeUrl.includes("youtu.be"))
    ) {
      return NextResponse.json(
        { error: "Invalid YouTube URL" },
        { status: 400 }
      );
    }

    if (!GLADIA_API_KEY) {
      return NextResponse.json(
        { error: "Missing GLADIA_API_KEY in environment variables" },
        { status: 500 }
      );
    }

    const formData = new FormData();
    formData.append("audio_url", youtubeUrl);
    formData.append("language_behavior", "automatic single language");
    formData.append("target_translation_language", "none");

    const response = await fetch(GLADIA_API_URL, {
      method: "POST",
      headers: {
        "x-gladia-key": GLADIA_API_KEY,
        Accept: "application/json",
      },
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to transcribe audio");
    }

    const transcriptionResult = await response.json();

    // Extract the transcription text from response
    const transcriptions = transcriptionResult.prediction
      .map((segment: { transcription: string }) => segment.transcription)
      .join(" ");

    if (!transcriptions) {
      throw new Error("No transcription text received");
    }

    return NextResponse.json({ text: transcriptions });
  } catch (error) {
    console.error("Transcription error:", error);
    return NextResponse.json(
      {
        error: "Failed to process transcription",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

// Configure API route for larger payloads
export const config = {
  api: {
    bodyParser: {
      sizeLimit: "1mb",
    },
    responseLimit: false,
  },
};
