import cohere  
import os
import json

from astrapy.db import AstraDB
from langchain.text_splitter import RecursiveCharacterTextSplitter

# Astra connection
ASTRA_DB_APPLICATION_TOKEN = os.environ.get("ASTRA_DB_APPLICATION_TOKEN")
ASTRA_DB_API_ENDPOINT= os.environ.get("ASTRA_DB_API_ENDPOINT")

db = AstraDB(
    token=ASTRA_DB_APPLICATION_TOKEN,
    api_endpoint=ASTRA_DB_API_ENDPOINT,
)

# create "collection" (vector-enabled table)
col = db.create_collection("taylor_swift_vectors", dimension=384, metric="cosine")

co = cohere.Client(os.environ["COHERE_API_KEY"])

text_splitter = RecursiveCharacterTextSplitter(
    chunk_size = 100,
    chunk_overlap  = 0,
    length_function = len,
    is_separator_regex = False,
)

linecounter = 0

# iterate through all of the Taylor Swift text files
for counter in range(1,5):
	textfile = str(counter) + ".txt"

	with open(textfile) as ft:
		doc = ft.read()

	texts = text_splitter.split_text(doc)

	embeddings = co.embed(
		texts=texts,
		model="embed-english-light-v3.0",
		input_type="search_document").embeddings

	#for embedding in embeddings:
	for index in range(0,len(embeddings)):
		text = str(texts[index]).strip().replace("\n"," ").replace("\"","\\\"")
		embedding = str(embeddings[index])
		strJson = '{"_id":"' + str(linecounter) + '","text":"' + text + '","$vector":' + embedding + '}'
		#print(strJson)
		doc = json.loads(strJson)
		col.insert_one(doc)
		linecounter = linecounter + 1
