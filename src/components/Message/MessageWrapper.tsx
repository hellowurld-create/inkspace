'use client'

import { trpc } from "@/app/_trpc/client"
import { ChatContextProvider } from "@/context/chat/ChatContext"
import { ChevronLeft, Loader2, XCircle } from "lucide-react"
import Link from "next/link"
import { buttonVariants } from "../ui/button"
import ChatInput from "./ChatInput"
import Messages from "./Messages"

interface MessageWrapperProps{
    fileId: string
}

const MessageWrapper = ({ fileId }: MessageWrapperProps) => {

    const { data, isLoading } =   trpc.getFileUploadStatus.useQuery(
      {
        fileId,
      },
      {
        refetchInterval: (data) =>
          data?.status === 'SUCCESS' ||
          data?.status === 'FAILED'
            ? false
            : 500,
      }
    )
    
    if (isLoading) return (
            <div className="relative flex flex-col divide-y divide-zinc-200 min-h-full justify-between gap-2">
                <div className="flex flex-1 flex-col mb-28 justify-center items-center">
                    <div className="flex flex-col items-center gap-2">
                        <Loader2 className="h-8 w-8 text-orange-900 animate-spin" />
                        <h3 className="text-xl font-semibold">
                            Loading...
                        </h3>
                        <p className="text-sm text-zinc-800">
                            We&apos;re preparing your PDF.
                        </p>
                    </div>
                </div>
                <ChatInput isDisabled />
            </div>
        )
    

    if (data?.status === 'PROCESSING') return (
           <div className="relative flex flex-col divide-y divide-zinc-200 min-h-full justify-between gap-2">
                <div className="flex flex-1 flex-col mb-28 justify-center items-center">
                    <div className="flex flex-col items-center gap-2">
                        <Loader2 className="h-8 w-8 text-orange-900 animate-spin" />
                        <h3 className="text-xl font-semibold">
                            Processing PDF...
                        </h3>
                        <p className="text-sm text-zinc-800">
                            This won&apos;t take long.
                        </p>
                    </div>
                </div>
                <ChatInput isDisabled />
            </div> 
        )
    

    if (data?.status === 'FAILED') {
       return (
           <div className="relative flex flex-col divide-y divide-zinc-200 min-h-full justify-between gap-2">
                <div className="flex flex-1 flex-col mb-28 justify-center items-center">
                    <div className="flex flex-col items-center gap-2">
                        <XCircle className="h-8 w-8 text-red-600" />
                        <h3 className="text-xl font-semibold">
                            Too many pages in PDF
                        </h3>
                        <p className="text-sm text-zinc-800">
                            Your <span>Free</span> plan supports up to 5 pages per PDF.
                       </p>
                       <Link href='/dashboard' className={buttonVariants({
                           variant: 'secondary',
                           className: 'mt-4'
                       })}>
                           <ChevronLeft className="h-3 w-3 mr-1.5" />
                           Back To Dashboard
                       </Link>
                    </div>
                </div>
                <ChatInput isDisabled />
            </div> 
        ) 
    }

    return (
        <ChatContextProvider fileId={fileId}>
        <div className="relative min-h-full bg-zinc-50 divide-zinc-200 flex justify-between flex-col divide-y ">
            <div className="flex-1 justify-between flex-col mb-28">
                    <Messages fileId={fileId} />
            </div>
            
            <ChatInput />
        </div>
            </ChatContextProvider>
    )
}

export default MessageWrapper