// import { PineconeClient } from '@pinecone-database/pinecone'



// export const getPineconeClient = new PineconeClient({
    //     apiKey: process.env.PINECONE_API_KEY!,
    //     //TODO: add environment variables for pinecone
    //     environment: "gcp-starter",
    // })
    
import { PineconeClient } from "@pinecone-database/pinecone"

export const getPineconeClient = async () => {
    const client = new PineconeClient()

    await client.init({
        apiKey: process.env.PINECONE_API_KEY!,
        environment: 'gcp-starter',
    })

    return client
}