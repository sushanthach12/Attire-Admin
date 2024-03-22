import { format } from "date-fns"

import prismadb from "@/lib/prismadb";
import BillboardClient from "./components/client";
import { FC } from "react";
import { BillboardColumn } from "./components/columns";

interface BillboardsPageProps {
    params: {
        storeId: string
    }
}

const BillboardsPage: FC<BillboardsPageProps> = async ({ params }) => {

    const billboards = await prismadb.billboard.findMany({
        where: {
            storeId: params.storeId
        },
        orderBy: {
            createdAt: 'desc'
        }
    });

    const formattedBillboard: BillboardColumn[] = billboards.map((item) => ({
        id: item.id,
        label: item.label,
        createdAt: format(item.createdAt, "MMM do, yyyy")
    }))

    return <div className="flex flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
            <BillboardClient data={formattedBillboard} />
        </div>
    </div>
}

export default BillboardsPage;