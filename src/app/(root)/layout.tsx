import { FC } from "react"
import { auth } from "@clerk/nextjs"
import { redirect } from "next/navigation";
import prismadb from "@/lib/prismadb";

interface SetupLayoutProps {
    children: React.ReactNode
 }

const SetupLayout: FC<SetupLayoutProps> = async ({ children }) => {

    const { userId } = auth();

    if(!userId) {
        redirect('/sign-in');
    }

    // fetch the first store for the current user
    const store = await prismadb.store.findFirst({
        where: {
            userId
        }
    });

    if(store) {
        redirect(`/${store.id}`)
    }

    return (
        <>
            {children}
        </>
    )
}

export default SetupLayout;