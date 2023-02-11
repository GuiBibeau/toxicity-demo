import Head from "next/head";
import Image from "next/image";
import logo from '../public/logo.png'
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
        backgroundColor: "black"
        
      }}
    >
      <Image src={logo} alt="Toxicity Demo"/>
      <h1 style={{ marginBottom: "15px"}} className={inter.className}>Toxicity Demo</h1>
      <p style={{ marginBottom: "15px"}} className={inter.className}>This is a sample application that demonstrates how to build an intelligent application using Next.js, OpenAI, and Fly.io.</p> 
      <form onSubmit={handlePromptSubmit} style={{ display: "flex" }}>
        <input 
          type="text" 
          placeholder="Enter a prompt..." 
          name="prompt" 
          style={{ 
            width: 400, 
            padding: "15px", 
            border: "none", 
            borderRadius: "4px", 
            marginRight: "10px" 
          }} 
        />
        <button 
        type="submit" 
        style={{ 
          paddingLeft: "15px", 
          paddingRight: "15px", 
          border: "none", 
          borderRadius: "4px", 
          backgroundColor: "#1A56DB",
          cursor: "pointer",  
        }}
        >Submit</button>
      </form>
      <div>{answer}</div>
    </div>
  );
}

