"use client"

import { FC } from "react"
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { ColorsColumn, columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import ApiList from "@/components/ui/api-list";

interface ColorsClientProps { 
    data: ColorsColumn[]
}

const ColorsClient: FC<ColorsClientProps> = ({ data }) => {
    const router = useRouter();
    const params = useParams();

    return <>
        <div className="flex items-center justify-between">
            <Heading
                title={`Colors (${data.length})`}
                description="Manage colors for your store."
            />

            <Button onClick={() => router.push(`/${params.storeId}/colors/new`)}>
                <Plus className="h-4 w-4 mr-2" />
                Add New
            </Button>
        </div>
        <Separator />

        <DataTable
            columns={columns}
            data={data}
            searchKey="name"
        />

        <Heading
            title="API"
            description="API calls for Colors"
        />

        <Separator />

        <ApiList 
            entityName="colors"
            entityIdName="colorId"
        />
    </>
}

export default ColorsClient;