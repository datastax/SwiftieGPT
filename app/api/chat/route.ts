import { CohereClient } from "cohere-ai";
import OpenAI from 'openai';
import { OpenAIStream, StreamingTextResponse } from "ai";
import {AstraDB} from "@datastax/astra-db-ts";

const {
  ASTRA_DB_ENDPOINT,
  ASTRA_DB_APPLICATION_TOKEN,
  ASTRA_DB_NAMESPACE,
  ASTRA_DB_COLLECTION,
  COHERE_API_KEY,
  OPENAI_API_KEY,
} = process.env;

const cohere = new CohereClient({
  token: COHERE_API_KEY,
});

const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
  baseURL: "https://open-assistant-ai.astra.datastax.com/v1",
  defaultHeaders: {
    "astra-api-token": ASTRA_DB_APPLICATION_TOKEN,
  }
});

const astraDb = new AstraDB(ASTRA_DB_APPLICATION_TOKEN, ASTRA_DB_ENDPOINT);

export async function POST(req: Request) {
  try {
    const {messages} = await req.json();
    const latestMessage = messages[messages?.length - 1]?.content;

    let docContext = '';

    const embedded = await cohere.embed({
      texts: [latestMessage],
      model: "embed-english-light-v3.0",
      inputType: "search_query",
    });

    try {
      const collection = await astraDb.collection(ASTRA_DB_COLLECTION);
      const cursor = collection.find(null, {
        sort: {
          $vector: embedded?.embeddings[0],
        },
        limit: 10,
      });

      const documents = await cursor.toArray();

      const docsMap = documents?.map(doc => doc.text);

      docContext = JSON.stringify(docsMap);
    } catch (e) {
      console.log("Error querying db...");
      docContext = "";
    }

    const Template = {
      role: 'system',
      content: `You are an AI assistant who is a Taylor Swift super fan. Use the below context to augement what you know about Taylor Swift and her music.
        The context will provide you with the most recent page data from her wikipedia, tour website and others.
        If the context doesn't include the information you need answer based on your existing knowledge and don't mention the source of your information or what the context does or doesn't include.
        Format responses using markdown where applicable and don't return images.
        ----------------
        START CONTEXT
        ${docContext}
        END CONTEXT
        ----------------
        QUESTION: ${latestMessage}
        ----------------      
        `
    };

    const response = await openai.chat.completions.create(
      {
        model: 'gpt-4',
        stream: true,
        messages: [Template, ...messages],
      }
    );
    const stream = OpenAIStream(response);

    return new StreamingTextResponse(stream);
  } catch (e) {
    throw e;
  }
}
