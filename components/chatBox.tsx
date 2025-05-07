/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useEffect, useState, useRef } from "react";
import { ArrowUp } from "lucide-react";
import axios from "axios";
import supabase from "./supabase-client";
import { useAuth } from "@clerk/nextjs";
import ReactMarkdown from "react-markdown";

function ChatBox({ videoId }) {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const { userId } = useAuth();
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  const processMessage = async (messageText) => {
    if (!messageText.trim()) return;

    setLoading(true);
    try {
      // Add user message to UI immediately for better UX
      const userMessage = {
        uid: userId,
        videoId: videoId,
        role: "user",
        content: messageText,
      };
      setChatMessages((prev) => [...prev, userMessage]);

      // Add temporary thinking message
      const tempId = `temp-${Date.now()}`;
      setChatMessages((prev) => [
        ...prev,
        {
          id: tempId,
          uid: userId,
          role: "assistant",
          content: "thinking",
          isLoading: true,
        },
      ]);

      // Clear input field
      setText("");

      // Send message to AI API
      const transcription = localStorage.getItem("transcription");
      const response = await axios.post("/api/ai", {
        message: `Base youtube video transcription : ${transcription} , ${messageText}`,
      });

      // Remove temporary thinking message and add real response
      setChatMessages((prev) => prev.filter((msg) => msg.id !== tempId));

      // Create assistant message
      const assistantMessage = {
        uid: userId,
        videoId: videoId,
        role: "assistant",
        content: response.data.content,
      };

      // Save both messages to Supabase
      const { data, error } = await supabase
        .from("chat_messages")
        .insert([userMessage, assistantMessage])
        .select();
      if (data) {
        return;
      }

      if (error) throw error;

      // Update UI with fetched data to ensure consistency
      getMessages();
    } catch (error) {
      console.error("Error:", error);
      // Remove thinking message on error
      setChatMessages((prev) => prev.filter((msg) => !msg.isLoading));
      // Optionally show an error message to the user
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await processMessage(text);
  };

  const handleQuickButton = async (buttonType) => {
    if (loading) return;

    let messageText = "";
    if (buttonType === "summarize") {
      messageText = "Please provide a concise summary of this video.";
    } else if (buttonType === "explain") {
      messageText =
        "Please explain the main concepts discussed in this video in simple terms.";
    }

    await processMessage(messageText);
  };

  const getMessages = async () => {
    try {
      const { data, error } = await supabase
        .from("chat_messages")
        .select("*")
        .eq("uid", userId)
        .eq("videoId", videoId)
        .order("created_at", { ascending: true });

      if (error) throw error;
      setChatMessages(data || []);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  // Initial fetch
  useEffect(() => {
    if (userId) {
      getMessages();
    }
  }, [userId]);

  // Set up realtime subscription
  useEffect(() => {
    if (!userId) return;

    // Subscribe to changes
    const subscription = supabase
      .channel("chat_changes")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "chat_messages",
          filter: `uid=eq.${userId}`,
        },
        (_payload) => {
          // Refresh messages when new ones are inserted
          getMessages();
        }
      )
      .subscribe();

    // Cleanup subscription on unmount
    return () => {
      supabase.removeChannel(subscription);
    };
  }, [userId]);

  // Thinking animation component
  const ThinkingAnimation = () => (
    <div className="flex space-x-2 justify-center items-center h-6">
      <div
        className="h-2 w-2 bg-gray-500 rounded-full animate-bounce"
        style={{ animationDelay: "0ms" }}
      ></div>
      <div
        className="h-2 w-2 bg-gray-500 rounded-full animate-bounce"
        style={{ animationDelay: "300ms" }}
      ></div>
      <div
        className="h-2 w-2 bg-gray-500 rounded-full animate-bounce"
        style={{ animationDelay: "600ms" }}
      ></div>
    </div>
  );

  // Message content renderer with markdown support
  const MessageContent = ({ content }) => {
    // Check if the content might be markdown (contains special markers)
    const hasMarkdown =
      content.includes("**") ||
      content.includes("#") ||
      content.includes("1.") ||
      content.includes("*") ||
      content.includes("###");

    if (hasMarkdown) {
      return (
        <div className="markdown-content">
          <ReactMarkdown
            components={{
              h1: ({ node, ...props }) => (
                <h1 className="text-xl font-bold my-2" {...props} />
              ),
              h2: ({ node, ...props }) => (
                <h2 className="text-lg font-bold my-2" {...props} />
              ),
              h3: ({ node, ...props }) => (
                <h3 className="text-md font-bold my-1" {...props} />
              ),
              p: ({ node, ...props }) => <p className="my-2" {...props} />,
              ul: ({ node, ...props }) => (
                <ul className="list-disc pl-5 my-2" {...props} />
              ),
              ol: ({ node, ...props }) => (
                <ol className="list-decimal pl-5 my-2" {...props} />
              ),
              li: ({ node, ...props }) => <li className="my-1" {...props} />,
              strong: ({ node, ...props }) => (
                <strong className="font-bold" {...props} />
              ),
              em: ({ node, ...props }) => <em className="italic" {...props} />,
            }}
          >
            {content}
          </ReactMarkdown>
        </div>
      );
    }

    // Fallback to plain text
    return <div>{content}</div>;
  };

  return (
    <section className="w-full bg-base-200 h-screen overflow-y-scroll">
      {/* chats */}
      <div className="pb-36">
        {chatMessages.map((message, index) => (
          <div
            key={message.id || index}
            className={`chat my-3  ${
              message.role === "assistant" ? "chat-start " : "chat-end"
            }`}
          >
            <div
              className={`chat-bubble  ${
                message.role === "assistant"
                  ? "mr-10"
                  : "bg-primary text-white ml-10"
              } max-w-xs sm:max-w-md md:max-w-lg overflow-hidden`}
            >
              {message.isLoading ? (
                <ThinkingAnimation />
              ) : (
                <MessageContent content={message.content} />
              )}
            </div>
          </div>
        ))}
        <div className="mb-32"></div>
        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      <div className="fixed bottom-0 lg:w-5/12 w-9/12  flex justify-center items-center flex-col">
        {/* quick buttons */}
        <div className="bg-base-200 flex gap-2 p-2 justify-center w-full">
          <button
            className="btn btn-outline btn-accent"
            onClick={() => handleQuickButton("summarize")}
            disabled={loading}
          >
            Summarize ✍️
          </button>
          <button
            className="btn btn-outline btn-accent"
            onClick={() => handleQuickButton("explain")}
            disabled={loading}
          >
            Explain 🔍
          </button>
        </div>
        <div className="flex items-center justify-center gap-1 bg-base-200 pt-2 pb-5 w-full">
          <form onSubmit={handleSubmit} className="flex w-full max-w-2xl">
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              type="text"
              placeholder="Ask a question about the video"
              className="input input-lg w-full"
              data-aos="fade-up"
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading || !text.trim()}
              className="btn btn-primary ml-4 btn-lg text-white"
            >
              {loading ? (
                <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <ArrowUp />
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default ChatBox;
