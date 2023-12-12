"use client";
import {useEffect, useRef, useState} from 'react';
import Image from 'next/image';
import tswiftImg from './assets/tswift.png';
import Bubble from '../components/Bubble'
import { useChat } from 'ai/react';
import Footer from '../components/Footer';
import Configure from '../components/Configure';
import ThemeButton from '../components/ThemeButton';
import useConfiguration from './hooks/useConfiguration';
import PromptSuggestionRow from '../components/PromptSuggestions/PromptSuggestionsRow';
import { Message } from 'ai';

export default function Home() {
  const { append, messages, input, handleInputChange, handleSubmit } = useChat();
  const { useRag, llm, similarityMetric, setConfiguration } = useConfiguration();

  const messagesEndRef = useRef(null);
  const [configureOpen, setConfigureOpen] = useState(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (e) => {
    handleSubmit(e, { options: { body: { useRag, llm, similarityMetric}}});
  }

  const handlePrompt = (promptText) => {
    const msg: Message = { id: crypto.randomUUID(),  content: promptText, role: 'user' };
    append(msg, { options: { body: { useRag, llm, similarityMetric}}});
  };

  return (
    <>
    <main className="flex h-screen flex-col items-center justify-center">
      <section className='chatbot-section flex flex-col origin:w-[800px] w-full origin:h-[735px] h-full rounded-md px-2 md:px-6 md:py-4'>
        {!messages || messages.length === 0 ? (
          <div className='h-full flex flex-col items-center'>
            <Image src={tswiftImg} width="250" height="75" alt="Chatbot (Taylor's Version) logo" />
            <div className='h-full flex flex-col justify-center'>
              <p className="chatbot-text-secondary-inverse text-sm md:text-base mt-2 md:mt-4 px-2">
                Chatting with Chatbot (Taylor&apos;s Version) is a breeze! Simply type your questions or requests in a clear and concise manner. Responses are sourced from her Wikipedia page, Eras tour website and others.
              </p>
              <PromptSuggestionRow onPromptClick={handlePrompt} />
            </div>
          </div>
        ): (
          <>
            <div className="header relative text-white p-4 pb-16 rounded-t-md overflow-hidden">
              <div className="absolute inset-0 clip-path-header"></div>
              <h1 className='active-chat-header relative text-xl float-right z-10'>Chatbot (Taylor&apos;s Version)</h1>
            </div>
            <div className='flex-1 relative overflow-y-auto my-4 md:my-6'>
              <div className='absolute w-full h-full overflow-x-hidden'>
                {messages.map((message, index) => <Bubble ref={messagesEndRef} key={`message-${index}`} content={message} />)}
              </div>
            </div>
          </>
        )}        
        <div className="relative text-white p-4 pt-16 rounded-b-md footer overflow-hidden">
          <div className="absolute inset-0 clip-path-footer"></div>
          <div className="relative z-10">
            <form className='flex h-[40px] gap-2' onSubmit={handleSend}>
              <input onChange={handleInputChange} value={input} className='chatbot-input flex-1 text-sm md:text-base outline-none bg-transparent rounded-lg p-2' placeholder='Send a message...' />
              <button type="submit" className='chatbot-send-button flex rounded-md items-center justify-center px-2.5 origin:px-3'>
                <svg width="20" height="20" viewBox="0 0 20 20">
                  <path d="M2.925 5.025L9.18333 7.70833L2.91667 6.875L2.925 5.025ZM9.175 12.2917L2.91667 14.975V13.125L9.175 12.2917ZM1.25833 2.5L1.25 8.33333L13.75 10L1.25 11.6667L1.25833 17.5L18.75 10L1.25833 2.5Z" />
                </svg>
                <span className='hidden origin:block font-semibold text-sm ml-2'>Send</span>
              </button>
            </form>
            <Footer />
          </div>
        </div>
      </section>
    </main>
    <Configure
      isOpen={configureOpen}
      onClose={() => setConfigureOpen(false)}
      useRag={useRag}
      llm={llm}
      similarityMetric={similarityMetric}
      setConfiguration={setConfiguration}
    />
    </>
  )
}