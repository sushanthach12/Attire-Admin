import { format } from "date-fns"

import prismadb from "@/lib/prismadb";
import { FC } from "react";

import { SizesColumn } from "./components/columns";
import SizesClient from "./components/client";

interface SizesPageProps {
    params: {
        storeId: string
    }
}

const SizesPage: FC<SizesPageProps> = async ({ params }) => {

    const sizes = await prismadb.size.findMany({
        where: {
            storeId: params.storeId
        },
        orderBy: {
            createdAt: 'desc'
        }
    });

    const formattedSizes: SizesColumn[] = sizes.map((item) => ({
        id: item.id,
        name: item.name,
        value: item.value,
        createdAt: format(item.createdAt, "MMM do, yyyy")
    }))

    return <div className="flex flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
            <SizesClient data={formattedSizes} />
        </div>
    </div>
}

export default SizesPage;