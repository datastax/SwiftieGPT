"use client"

import { useState, useEffect } from 'react';

export type SimilarityMetric = "cosine" | "euclidean" | "dot_product";

const useConfiguration = () => {
  // Safely get values from localStorage
  const getLocalStorageValue = (key: string, defaultValue: any, bannedValues?: string[]) => {
    if (typeof window !== 'undefined') {
      const storedValue = localStorage.getItem(key);
      if (storedValue !== null && bannedValues?.includes(storedValue) === false) {
        return storedValue;
      }
    }
    return defaultValue;
  };

  const [useRag, setUseRag] = useState<boolean>(() => getLocalStorageValue('useRag', 'true') === 'true');
  const [llm, setLlm] = useState<string>(() => getLocalStorageValue('llm', 'cohere/command', ['meta.llama2-13b-chat-v1', 'ai21.j2-mid-v1', 'ai21.j2-ultra-v1']));
  const [similarityMetric, setSimilarityMetric] = useState<SimilarityMetric>(
    () => getLocalStorageValue('similarityMetric', 'cosine') as SimilarityMetric
  );

  const setConfiguration = (rag: boolean, llm: string, similarityMetric: SimilarityMetric) => {
    setUseRag(rag);
    setLlm("cohere/command");
    setSimilarityMetric(similarityMetric);
  }

  // Persist to localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('useRag', JSON.stringify(useRag));
      localStorage.setItem('llm', llm);
      localStorage.setItem('similarityMetric', similarityMetric);
    }
  }, [useRag, llm, similarityMetric]);

  return {
    useRag,
    llm,
    similarityMetric,
    setConfiguration,
  };
}

export default useConfiguration;
