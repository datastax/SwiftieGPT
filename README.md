# Chatbot (Taylor's Version)

This project is a starter for creating a chatbot using Astra DB and Vercel. It's designed to be easy to deploy and use, with a focus on performance and usability.

## Features

- **Astra DB Integration**: Store and retrieve data from your Astra DB database with ease.
- **OpenAI Integration**: Leverage the power of OpenAI to generate intelligent responses.
- **Easy Deployment**: Deploy your chatbot to Vercel with just a few clicks.
- **Customizable**: Modify and extend the chatbot to suit your needs.

## Getting Started

### Prerequisites

- An Astra DB account. You can [create one here](https://astra.datastax.com/register).
    - An Astra Vector Database
- An OpenAI account and api key [create one here](https://platform.openai.com/)

### Setup

1. Clone this repository to your local machine.
2. Install the dependencies by running `npm install` in your terminal.
3. Set up the following environment variables in your IDE or `.env` file:
    - `OPENAI_API_KEY`: api key for OPENAI
    - `ASTRA_DB_NAMESPACE`: The existing Astra Namespace/Keyspace **_in a vector-enabled DB_**
    - `ASTRA_DB_ID`: Your Astra DB vector database id
    - `ASTRA_DB_REGION`: Your Astra DB database region
    - `ASTRA_DB_APPLICATION_TOKEN`: The generated app token for your Astra database
        - To create a new token go to your database's `Connect` tab and click `Generate Token`. (your Application Token begins with `AstraCS:...`)
4. Populate your database with sample data by running `npm run seed` in your terminal.

Or - 

5. Load Taylor's data from a number of sources around the web. In the `scripts/` directory are three files.

 - **tsScraper.py** - Pulls down HTML data from an array of web URLs.
 - **tsFileProcessor.py** - Converts the HTML files to text files.
 - **tsAPILoader.py** - Processes the text files, generates vector embeddings, and saves them into Astra DB, assuming the following env vars exist:
        - `ASTRA_DB_APPLICATION_TOKEN`
        - `ASTRA_DB_API_ENDPOINT`
        - `COHERE_API_KEY` (a free account with Cohere is fine)

### Running the Project

To start the development server, run `npm run dev` in your terminal. Open [http://localhost:3000](http://localhost:3000) to view the chatbot in your browser.

## Deployment

You can easily deploy your chatbot to Vercel by clicking the button below:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/datastax/aws-bedrock-starter&env=ASTRA_DB_NAMESPACE,OPENAI_API_KEY,ASTRA_DB_ID,ASTRA_DB_REGION,ASTRA_DB_APPLICATION_TOKEN)

Remember to set your environment variables to the values obtained when setting up your Astra DB and OpenAI accounts.
