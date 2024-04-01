'use client'

import { trpc } from "@/app/_trpc/client"
import { format } from 'date-fns'
import { CalendarDays, Ghost, Loader, Loader2, MessageSquare, MessagesSquare, Plus, Trash, Trash2Icon } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import Skeleton from 'react-loading-skeleton'
import UploadButton from "./UploadButton"
import { Button } from "./ui/button"
import { getUserSubscriptionPlan } from "@/lib/stripe"

interface PageProps{
    subscriptionPlan: Awaited<ReturnType<typeof getUserSubscriptionPlan>>
}

const DashBoard = ({subscriptionPlan}: PageProps) => {
    const [currentDeletedFile,setCurrentDeletedFile] = useState<string | null>(null)
    
    const utils = trpc.useContext();

    const { data: files, isLoading } = trpc.getUserFiles.useQuery()

    const { mutate: deleteFile } = trpc.deleteFiles.useMutation({
        onSuccess: () => {
            utils.getUserFiles.invalidate()
        },
        onMutate({ id }) {
            setCurrentDeletedFile(id)
        },
        onSettled() {
            setCurrentDeletedFile(null)
        },

    })

    return (
        <main className="mx-auto max-w-7xl md:p-10">
            <div className="mt-8 items-start flex-col justify-between gap-4 border-b border-gray-200 pb-5 flex sm:flex-row sm:items-center max-sm:ml-[12px] sm:gap-0">
                <h1 className="mb-3 font-bold text-5xl text-zinc-900">
                    My Files
                </h1>

                <UploadButton isSubscribed={subscriptionPlan.isSubscribed} />
            </div>

            {/* display user files */}
            {
                files && files?.length !== 0 ? (
                    <ul className="mt-8 grid grid-cols-1 gap-6 divide-zinc-200 md:grid-col-2 lg:grid-cols-3">
                        {
                            files.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                                .map((file) => (
                                    <li key={file.id}
                                        className='col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow transition hover:shadow-lg'
                                    >
                                        <Link href={`/dashboard/${file.id}`} className="flex flex-col gap-7">
                                            <div className="pt-6 px-6 flex w-full items-center justify-between space-x-6">
                                                <div className="h-7 w-7 flex-shrink-0 rounded-full bg-gradient-to-r from-zinc-800 to-slate-400"></div>
                                                    <div className="flex-1 truncate">
                                                        <div className="flex space-x-3 items-center">
                                                            <h3 className="truncate text-lg font-medium text-zinc-950">
                                                                {file.name}
                                                            </h3>
                                                        </div>
                                                    </div>
                                            </div>
                                        </Link> 
                                         <div className='px-6 mt-4 grid grid-cols-3 place-items-center py-2 gap-7 text-xs text-slate-700'>
                                        <div className='flex items-center gap-3'>
                                            <CalendarDays className='h-3 w-3' />
                                            {format(
                                            new Date(file.createdAt),
                                            'yyyy MMM'
                                            )}
                                        </div>

                                        <div className='flex items-center gap-3'>
                                            <MessageSquare className='h-3 w-3' />
                                            mocked
                                            </div>
                                            <Button onClick={()=> deleteFile({id: file.id})} size='sm' className="w-full" variant='destructive'>
                                                {
                                                    currentDeletedFile === file.id ? (
                                                      <Loader2 className="h-4 w-4 animate-bounce" />
                                                    ) : <Trash2Icon className='h-3 w-3'/>
                                                }
                                            </Button>
                                        </div>
                                    </li>
                                ))
                            }
                    </ul>
                    
                ) : isLoading ? (
                    <Skeleton height={100} className="my-2" count={3}/>
            ) : (
                            <div className="mt-16 flex flex-col items-center gap-4">
                                <Ghost className="h-10 w-10 text-zinc-950" />
                                <h3 className="font-semibold text-xl">
                                    Seems rather deserted here, doesn&apos;t it?
                                </h3> 
                                <p className="tex-sm">
                                    lets upload your first pdf
                                </p>
                                
                    </div>
                )
            }
        </main>
    )
}

export default DashBoard