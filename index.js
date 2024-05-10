import { renderToReadableStream } from "react-dom/server"
import App from "./components/App";

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${Bun.env.MONGOUSER}:${Bun.env.MONGOPASS}@cluster0.ffcg0sn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

let movieData = [];

async function getMovies() {
  try {
    const database = client.db('sample_mflix');
    const movies = database.collection('movies');
    const query = { "imdb.rating": { $gt: 8 } }
    const cursor = movies.find(query);
    movieData = await cursor.toArray();
  } finally {
    await client.close();
  }
}

getMovies();

const server = Bun.serve({
  async fetch() {
    const stream = await renderToReadableStream(<App movies={movieData} />, {
      bootstrapScripts: ['/main.js'],
    });
    return new Response(stream, {
      headers: { 'content-type': 'text/html' },
    });
  },
});

console.log(`Listening on localhost:${server.port}`);
