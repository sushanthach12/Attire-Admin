"use client"

import { FC, useState } from "react"
import { SizesColumn } from "./columns"
import toast from "react-hot-toast"
import { useParams, useRouter } from "next/navigation"
import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react"
import axios from "axios"

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import AlertModal from "@/components/modals/alert-modal"

interface CellActionsProps {
    data: SizesColumn
}

const CellActions: FC<CellActionsProps> = ({ data }) => {

    const router = useRouter();
    const params = useParams();

    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false)

    const onCopy = (id: string) => {
        navigator.clipboard.writeText(id);
        toast.success('SizeId copied to clipboard.')
    }

    const onDelete = async () => {
        try {
            setLoading(true);

            await axios.delete(`/api/${params.storeId}/sizes/${data.id}`);

            router.refresh(); // to get updated data
            toast.success('Size deleted.')

        } catch (error) {
            toast.error("Make sure you removed all products using this size first.")
        } finally {
            setLoading(false)
            setOpen(false)
        }
    }

    return <>
        <AlertModal
            isOpen={open}
            loading={loading}
            onClose={() => setOpen(false)}
            onConfirm={onDelete}
        />
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant={"ghost"}
                    className="h-8 w-8 p-0"

                >
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>

                <DropdownMenuItem
                    onClick={() => router.push(`/${params.storeId}/sizes/${data.id}`)}
                >
                    <Edit className="h-4 w-4 mr-2" />
                    Update
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={() => onCopy(data.id)}
                >
                    <Copy className="h-4 w-4 mr-2" />
                    Copy Id
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={() => setOpen(true)}
                >
                    <Trash className="h-4 w-4 mr-2 text-red-600" />
                    Delete
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    </>
}

export default CellActions;