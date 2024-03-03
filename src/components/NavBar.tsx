import Link from "next/link"
import MaxWidthWrapper from "./MaxWidthWrapper"
import { ArrowRight, Pen, Pencil } from "lucide-react"
import { buttonVariants } from "./ui/button"
import {LoginLink, RegisterLink} from '@kinde-oss/kinde-auth-nextjs/server'

const NavBar = () => {
    return (
        <nav className="w-full border-b border-gray-300 bg-white/75 backdrop-blur-lg sticky h-14 top-0 inset-x-0 z-30 transition-all">
            <MaxWidthWrapper>
                <div className="flex h-14 items-center justify-between border-b border-zinc-200">
                    <Link href='/' className="flex z-40 font-semibold">
                        <span className="contents font-bold ">
                            inkspace
                            <Pencil size={9}/>
                        </span>
                    </Link>

                    {/* Add mobile navbar */}

                    <div className="hidden items-center space-x-4 sm:flex">
                        <>
                            <Link
                                href='/pricing'
                                className={buttonVariants({
                                    variant: 'ghost',
                                    size: 'sm'
                            })}
                            >
                                Pricing
                            </Link>
                            <LoginLink
                                className={buttonVariants({
                                    variant: 'ghost',
                                    size: 'sm'
                            })} 
                            >
                                Sign in
                            </LoginLink>
                            <RegisterLink
                                className={buttonVariants({
                                    size: 'sm'
                                })}
                            >
                                Get started <ArrowRight className="ml-1.5 h-4 w-4"/>
                            </RegisterLink>
                        </>
                    </div>
                </div>
            </MaxWidthWrapper>
        </nav>
    )
}

export default NavBar