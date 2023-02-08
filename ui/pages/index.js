import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import { Inter } from "@next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [answer, setAnswer] = useState(null);

  const handlePromptSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/question", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt: e.target.prompt.value }),
    });

    const data = await res.json();
    setAnswer(data.answer);
  };
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <form onSubmit={handlePromptSubmit} style={{ display: "flex" }}>
        <input type="text" name="prompt" style={{ width: 400 }} />
        <button type="submit">Submit</button>
      </form>
      <div>{answer}</div>
    </div>
  );
}
