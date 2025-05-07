// app/api/youtube-info/route.js
import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const videoId = searchParams.get("videoId");

  if (!videoId) {
    return NextResponse.json(
      { error: "Video ID is required" },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(`https://www.youtube.com/watch?v=${videoId}`);
    const html = await response.text();

    // Extract metadata using regex
    const titleMatch = html.match(/<title>(.*?)<\/title>/);
    const viewsMatch = html.match(/"viewCount":\s*"(\d+)"/);
    const uploadDateMatch = html.match(/"uploadDate":\s*"([^"]+)"/);
    const descriptionMatch = html.match(/"description":\s*"([^"]+)"/);

    return NextResponse.json({
      title: titleMatch ? titleMatch[1].replace(" - YouTube", "") : null,
      views: viewsMatch ? parseInt(viewsMatch[1]) : null,
      uploadDate: uploadDateMatch ? uploadDateMatch[1] : null,
      description: descriptionMatch
        ? descriptionMatch[1].replace(/\\n/g, "\n").replace(/\\/g, "")
        : null,
    });
  } catch (error) {
    console.error("Error fetching YouTube data:", error);
    return NextResponse.json(
      { error: "Failed to fetch video data" },
      { status: 500 }
    );
  }
}
