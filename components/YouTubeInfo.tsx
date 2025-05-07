"use client";

import { useState, useEffect } from "react";

export default function YouTubeInfo({ videoUrl, videoId }) {
  const [metadata, setMetadata] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchYouTubeInfo() {
      try {
        // Extract video ID from URL
        const videoId = extractVideoId(videoUrl);
        if (!videoId) {
          throw new Error("Invalid YouTube URL");
        }

        const response = await fetch(`/api/youtube-info?videoId=${videoId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch video data");
        }

        const data = await response.json();
        setMetadata(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchYouTubeInfo();
  }, [videoUrl]);

  // Helper function to extract video ID from different YouTube URL formats
  function extractVideoId(url) {
    const regExp =
      /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[7].length === 11 ? match[7] : null;
  }

  if (loading)
    return (
      <>
        <div className="flex w-screen flex-col gap-4">
          <div className="skeleton h-96 w-1/3"></div>
          <div className="skeleton h-4 w-28"></div>
          <div className="skeleton h-4 w-1/3"></div>
          <div className="skeleton h-4 w-1/3"></div>
        </div>
      </>
    );
  if (error) return <div>Error: {error}</div>;
  if (!metadata) return <div>No data available</div>;

  return (
    <>
      <div className="card bg-base-100 w-full shadow-sm">
        <figure>
          <img
            src={`https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`}
            alt="Youtube Thumbnail"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{metadata.title}</h2>
          <div className=" w-full flex justify-center items-center gap-1.5 font-bold">
            {metadata.views && <p>Views: {metadata.views.toLocaleString()}</p>}
            {metadata.uploadDate && (
              <p>
                Uploaded: {new Date(metadata.uploadDate).toLocaleDateString()}
              </p>
            )}
          </div>
          {metadata.description && (
            <div className="collapse bg-base-100 border-base-300 border">
              <input type="checkbox" />
              <div className="collapse-title font-semibold">Description </div>
              <div className="collapse-content text-sm">
                {metadata.description}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
