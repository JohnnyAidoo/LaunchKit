"use client";
import { MessageCircle } from "lucide-react";
import { useState } from "react";
import React from "react";

export default function Home() {
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [transcription, setTranscription] = useState("");
  const [error, setError] = useState("");

  const routeToChat = () => {
    setError("");
    setTranscription("");
    setLoading(true);

    if (!youtubeUrl) {
      setError("Please enter a YouTube URL.");
      setLoading(false);
      return;
    }

    try {
      let videoId = "";

      // Check if it's a valid URL
      const url = new URL(youtubeUrl);

      if (url.hostname === "youtu.be") {
        // Handle shortened URL format (youtu.be)
        videoId = url.pathname.slice(1); // Remove the leading '/'
      } else if (
        url.hostname === "www.youtube.com" ||
        url.hostname === "youtube.com"
      ) {
        // Handle full YouTube URL format
        videoId = url.searchParams.get("v") || "";
      }

      // Remove any additional parameters (like timestamp, playlist, etc.)
      videoId = videoId.split("&")[0];

      if (!videoId) {
        setError("Could not extract video ID from the URL.");
        setLoading(false);
        return;
      }

      window.location.href = `/app/${videoId}`;
    } catch (err) {
      setError("Invalid YouTube URL.");
      console.log(err);
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen justify-center ">
      <div className="container mx-auto  text-center w-3/4" data-aos="fade-up">
        <h1 className="text-6xl font-bold mb-6">Chat with any YouTube video</h1>
        <p className="text-xl text-gray-500 mb-8 px-20">
          {process.env.NEXT_PUBLIC_BASE_NAME} allows you to chat with YouTube
          videos in real-time using AI - ask questions, get summaries, pinpoint
          key points, translate content, and so much more!
        </p>
        <div className="mb-8 flex items-center justify-center gap-5">
          <input
            value={youtubeUrl}
            onChange={(e) => setYoutubeUrl(e.target.value)}
            type="text"
            placeholder="Paste your YouTube link here"
            className="input input-lg w-full max-w-2xl"
            data-aos="fade-up"
          />

          <button
            disabled={loading || !youtubeUrl}
            onClick={routeToChat}
            className="btn btn-primary ml-4 btn-lg"
          >
            Chat <MessageCircle />
          </button>
        </div>
        {loading && (
          <>
            <span className="loading loading-dots loading-xl"></span>
            <p>loading</p>
          </>
        )}
        {error && <p className="text-red-500 mt-4 text-center">{error}</p>}

        {transcription && (
          <div className="mt-6 p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold">Transcription:</h2>
            <p className="mt-2">{transcription}</p>
          </div>
        )}
      </div>
    </div>
  );
}
