import { PLANS } from "@/config/stripe";
import { db } from "@/db";
import { getPineconeClient } from "@/lib/pinecone";
import { getUserSubscriptionPlan } from "@/lib/stripe";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { PDFLoader } from 'langchain/document_loaders/fs/pdf';
import { OpenAIEmbeddings } from 'langchain/embeddings/openai'
import { PineconeStore } from 'langchain/vectorstores/pinecone'
import { createUploadthing, type FileRouter } from "uploadthing/next";
 
const f = createUploadthing();

const middleware = async () => {
    const { getUser } = getKindeServerSession()
        const user = await getUser()

        if(!user || !user.id) throw new Error('Unauthorized')

      const subscriptionPlan = await getUserSubscriptionPlan()
      
      return { subscriptionPlan, userId: user.id }
}

const onUploadComplete = async ({
  metadata, file
}: {
    metadata: Awaited<ReturnType<typeof middleware>>
    file: {
      key: string,
      name: string,
      url: string
      
    }
  }) => {
  const isFileExists = await db.file.findFirst({
    where: {
        key: file.key
      }
  })
  
  if(isFileExists) return
  
    const createdFile = await db.file.create({
        data: {
          key: file.key,
          name: file.name,
          userId: metadata.userId,
          // url: `https://uploadthing-prod.s3.us-west-2.amazonaws.com/${file.key}`,
          url: file.url,
          uploadStatus: 'PROCESSING',
        }
      })
      try {
          const response = await fetch(
            // `https://uploadthing-prod.s3.us-west-2.amazonaws.com/${file.key}`
            file.url
    )
        const blob = await response.blob()

    const loader = new PDFLoader(blob)

    const pageLevelDocs = await loader.load()

    const pagesAmt = pageLevelDocs.length

        const { subscriptionPlan } = metadata
        const {isSubscribed} = subscriptionPlan

        const isProExceeded = pagesAmt > PLANS.find((plan) => plan.name === 'Pro')!.pagePerPdf
        const isFreeExceeded = pagesAmt > PLANS.find((plan) => plan.name === 'Free')!.pagePerPdf
        
    if((isSubscribed && isProExceeded) || (!isSubscribed && isFreeExceeded)) {
      await db.file.update({
        data: {
          uploadStatus: 'FAILED'
        },
        where: {
          id: createdFile.id,
        }
      })
    }


        //vectorize and index the entire document
        const pinecone = await getPineconeClient()
        const pineconeIndex = pinecone.Index('inkspace')

        const embeddings = new OpenAIEmbeddings({
          openAIApiKey: process.env.OPENAI_API_KEY,
        })

      await PineconeStore.fromDocuments(
      pageLevelDocs,
      embeddings,
      {
        pineconeIndex,
        namespace: createdFile.id,
      }
    )

        await db.file.update({
          data: {
            uploadStatus: "SUCCESS"
          },
          where: {
            id: createdFile.id
          }
        })
      } catch (err) {
        await db.file.update({
              data: {
            uploadStatus: "FAILED"
          },
          where: {
            id: createdFile.id
          }
          })
      }
}

export const ourFileRouter = {
  freePlanUploader: f({ pdf: { maxFileSize: '4MB' } })
    .middleware(middleware)
    .onUploadComplete(onUploadComplete),
  proPlanUploader: f({ pdf: { maxFileSize: '16MB' } })
    .middleware(middleware)
    .onUploadComplete(onUploadComplete),
} satisfies FileRouter
 
export type OurFileRouter = typeof ourFileRouter;


