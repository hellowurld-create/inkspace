import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { buttonVariants } from "@/components/ui/button";
import { ArrowRight } from 'lucide-react';
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
    <MaxWidthWrapper className="mb-12 mt-28 sm:mt-40 flex-col flex items-center justify-center text-center">
      <div className="mx-auto mb-4 flex m-w-fit items-center justify-center space-x-2 rounded-full overflow-hidden border  border-gray-400  px-7 py-2 shadow-lg backdrop-blur transition-all hover:border-gray-300 hover:bg-white/50">
        <p className="text-sm animate-in font-normal text-gray-900">
          Presenting the all-new InkSpace—now accessible and ready for use!
        </p>
      </div>
      <h1 className="text-5xl max-w-4xl font-bold md:text-6xl lg:text-7xl">
        Chat with your <span className="bg-clip-text text-transparent bg-gradient-to-r from-zinc-800 to-slate-400">documents</span> in seconds.
      </h1>
      <p className="mt-5 text-sm max-w-prose text-slate-700 sm:text-lg">
        InkSpace enables seamless conversations with any PDF document.
        Just upload your file, and you can begin asking questions and engaging with the content immediately.
      </p>

      <Link
        className={buttonVariants({
          size: 'lg',
          className: 'mt-5'
        })}
        href={'/dashboard'}
        target="_blank"
      >
        Get Started
        <ArrowRight className='ml-2 h-5 w-5'/>
      </Link>
      </MaxWidthWrapper>

      {/* TODO: value proposition section */}
 <div>
        <div className='relative isolate'>
          <div
            aria-hidden='true'
            className='pointer-events-none absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80'>
            <div
              style={{
                clipPath:
                  'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
              }}
              className='relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#f597be] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]'
            />
          </div>

          <div>
            <div className='mx-auto max-w-6xl px-6 lg:px-8'>
              <div className='mt-16 flow-root sm:mt-24'>
                <div className='-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4'>
                  <Image
                    src='/dashboard-preview.jpg'
                    alt='product preview'
                    width={1364}
                    height={866}
                    quality={100}
                    className='rounded-md bg-white p-2 sm:p-8 md:p-20 shadow-2xl ring-1 ring-gray-900/10'
                  />
                </div>
              </div>
            </div>
          </div>
            
           <div
            aria-hidden='true'
            className='pointer-events-none absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80'>
            <div
              style={{
                clipPath:
                  'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
              }}
              className='relative left-[calc(50%-13rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#f597be] to-[#9089fc] opacity-30 sm:left-[calc(50%-36rem)] sm:w-[72.1875rem]'
            />
          </div>
        </div>
      </div>
      
      {/* Features Section */}
      <div className="mx-auto mb-32 mt-32 max-w-5xl sm:mt-56">
        <div className="mb-12 px-6 lg:px-8">
          <div className="mx-auto max-w-2xl sm:text-center">
            <h2 className="mt-2 font-bold text-6xl tracking-tight sm:leading-[5rem] text-gray-900 sm:text-7xl">
              Engage in conversations within minutes!
            </h2>
            <p className="mt-4 text-lg text-gray-600">
                Engaging with your PDF documents has never been simpler than with Inkspace!
            </p>
          </div>
        </div>
        
        {/* steps */}
        <ol className="my-8 space-y-4 pt-8 md:flex md:space-x-12 md:space-y-0">
          <li className="md:flex-1">
            <div className="flex flex-col space-y-2 border-l-4 border-zinc-300 py-2 pl-4 md:border-0 md:border-t-2 md:pb-0 md:pl-0 md:pt-4">
              <span className="text-sm font-medium bg-zinc-950 rounded-full px-5 py-1.5 text-slate-300">Step 1</span>
              <span className="text-xl font-semibold">Sign up for an account</span>
              <span className="pt-2 text-zinc-700">
                Get started with InkSpace today! Begin with our free plan or unlock advanced features by upgrading to our
                <Link href='/pricing' className="font-semibold underline underline-offset-2">
                  Pro plan
                </Link>
                .
              </span>
            </div>
          </li>
          <li className="md:flex-1">
            <div className="flex flex-col space-y-2 border-l-4 border-zinc-300 py-2 pl-4 md:border-0 md:border-t-2 md:pb-0 md:pl-0 md:pt-4">
              <span className="text-sm font-medium bg-zinc-950 rounded-full px-5 py-1.5 text-slate-300">Step 2</span>
              <span className="text-xl font-semibold">Upload your PDF files </span>
              <span className="pt-2 text-zinc-700">
                We&apos;ll handle your file processing so you can seamlessly engage in conversation.
              </span>
            </div>
          </li>
          <li className="md:flex-1">
            <div className="flex flex-col space-y-2 border-l-4 border-zinc-300 py-2 pl-4 md:border-0 md:border-t-2 md:pb-0 md:pl-0 md:pt-4">
              <span className="text-sm font-medium bg-zinc-950 rounded-full px-5 py-1.5 text-slate-300">Step 3</span>
              <span className="text-xl font-semibold">Let&apos;s dive into inquiry </span>
              <span className="pt-2 text-zinc-700">
                Begin your exploration now:
                Experience InkSpace today -
                it requires merely a minute of your time!
              </span>
            </div>
          </li>
        </ol>

        <div className='mx-auto max-w-6xl px-6 lg:px-8'>
          <div className='mt-16 flow-root sm:mt-24'>
            <div className='-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4'>
              <Image
                src='/file-upload-preview.jpg'
                alt='uploading preview'
                width={1419}
                height={732}
                quality={100}
                className='rounded-md bg-white p-2 sm:p-8 md:p-20 shadow-2xl ring-1 ring-gray-900/10'
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
