"use client";
import { useEffect, useState } from "react";
import { use } from "react";
import YouTubeInfo from "../../../../components/YouTubeInfo";
import ChatBox from "../../../../components/chatBox";

function ChatYt({ params }: { params: Promise<{ videoId: string }> }) {
  const unwrappedParams = use(params);
  const { videoId } = unwrappedParams;

  const [error, setError] = useState("");
  const [isTranscribing, setIsTranscribing] = useState(true);
  const [transcriptionProgress, setTranscriptionProgress] = useState(0);
  const [transcriptionComplete, setTranscriptionComplete] = useState(false);

  const simulateProgressBar = () => {
    // Simulated progress increments
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 15;
      if (progress > 95) {
        progress = 95; // Cap at 95% until actual completion
      }
      setTranscriptionProgress(progress);
    }, 500);

    return interval;
  };

  const handleTranscribe = async () => {
    setError("");
    setIsTranscribing(true);
    setTranscriptionComplete(false);
    localStorage.removeItem("transcription");

    // Start progress simulation
    const progressInterval = simulateProgressBar();

    try {
      const url = `https://youtu.be/${videoId}`;
      const response = await fetch("/api/transcribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ youtubeUrl: url }),
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("transcription", data.text);
        setTranscriptionComplete(true);
        setTranscriptionProgress(100);
      } else {
        setError(data.error || "Failed to transcribe audio.");
      }
    } catch (err) {
      setError(`An error occurred while processing your request. ${err}`);
    } finally {
      clearInterval(progressInterval);
      setIsTranscribing(false);
    }
  };

  // Check if transcription already exists for this video
  useEffect(() => {
    const storedTranscription = localStorage.getItem("transcription");
    if (storedTranscription) {
      setTranscriptionComplete(true);
      setIsTranscribing(false);
      setTranscriptionProgress(100);
    } else {
      handleTranscribe();
    }
  }, [videoId]);

  return (
    <>
      {error && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative m-4"
          role="alert"
        >
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      <main className="flex flex-col lg:flex-row min-h-screen w-full">
        <section className="w-full lg:w-1/2 h-auto lg:h-screen p-4">
          <YouTubeInfo
            videoUrl={`https://youtu.be/${videoId}`}
            videoId={videoId}
          />
        </section>

        {isTranscribing || !transcriptionComplete ? (
          <section className="w-full lg:w-1/2 bg-base-200 h-auto min-h-[60vh] lg:h-screen flex flex-col justify-center items-center p-4">
            <div className="text-center w-full max-w-md mx-auto">
              <h2 className="text-2xl font-bold mb-4">Transcribing Video</h2>
              <p className="mb-6">
                Please wait while we analyze the video content...
              </p>

              <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
                <div
                  className="bg-primary h-4 rounded-full transition-all duration-300 ease-out"
                  style={{ width: `${transcriptionProgress}%` }}
                ></div>
              </div>

              <p className="text-sm text-gray-600">
                {transcriptionProgress < 100
                  ? "This may take a minute depending on video length"
                  : "Almost ready..."}
              </p>

              <div className="mt-8 flex justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
              </div>
            </div>
          </section>
        ) : (
          <section className="w-full lg:w-1/2 h-auto min-h-[60vh] lg:h-screen">
            <ChatBox videoId={videoId} />
          </section>
        )}
      </main>
    </>
  );
}

export default ChatYt;
