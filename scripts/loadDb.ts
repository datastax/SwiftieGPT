import { AstraDB } from "@datastax/astra-db-ts";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import 'dotenv/config'
import { CohereClient } from "cohere-ai";
import { SimilarityMetric } from "../app/hooks/useConfiguration";

const cohere = new CohereClient({
  token: COHERE_API_KEY,
});

const {ASTRA_DB_APPLICATION_TOKEN, ASTRA_DB_ID, ASTRA_DB_REGION, ASTRA_DB_NAMESPACE } = process.env;
const astraDb = new AstraDB(ASTRA_DB_APPLICATION_TOKEN, ASTRA_DB_ID, ASTRA_DB_REGION, ASTRA_DB_NAMESPACE);

const splitter = new RecursiveCharacterTextSplitter({
  chunkSize: 1000,
  chunkOverlap: 200,
});

const createCollection = async (similarityMetric: SimilarityMetric = 'dot_product') => {
  const res = await astraDb.createCollection(`tswift`, {
    vector: {
      size: 384,
      function: similarity_metric,
    }
  });
  console.log(res);
};

const loadSampleData = async (similarityMetric: SimilarityMetric = 'dot_product') => {
  const collection = await astraDb.collection(`tswift`);
  for await (const { url, title, content } of sampleData) {
    const chunks = await splitter.splitText(content);
    let i = 0;
    for await (const chunk of chunks) {
      const embedded = await cohere.embed({
        texts: [latestMessage],
        model: "embed-english-light-v3.0",
        inputType: "search_query",
      });

      const res = await collection.insertOne({
        document_id: `${url}-${i}`,
        $vector: embedded[0]?.embedding,
        url,
        title,
        content: chunk
      });
      i++;
    }
  }
};

createCollection().then(() => loadSampleData(metric));
