import Link from "next/link"
import MaxWidthWrapper from "./MaxWidthWrapper"
import { ArrowRight, Pen, Pencil } from "lucide-react"
import { buttonVariants } from "./ui/button"
import {LoginLink, RegisterLink, getKindeServerSession} from '@kinde-oss/kinde-auth-nextjs/server'
import UserAccountNav from "./UserAccountNav"

const NavBar = () => {

    const {getUser} = getKindeServerSession()
    const user = getUser()

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
                        {
                            !user ?
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
                        </> :
                                <>
                                 <Link
                                href='/dashboard'
                                className={buttonVariants({
                                    variant: 'ghost',
                                    size: 'sm'
                            })}
                            >
                                Dashboard
                                    </Link>
                                    <UserAccountNav name={
                                        !user.given_name || !user.family_name ? 'Your Account' : `${user.given_name} ${user.given_name}`
                                     }
                                        email={user.email ?? ''}
                                        imageUrl={user.picture ?? ''}
                                    />
                                </>
                    }</div>
                </div>
            </MaxWidthWrapper>
        </nav>
    )
}

export default NavBar