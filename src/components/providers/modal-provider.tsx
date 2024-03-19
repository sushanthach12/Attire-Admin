"use client"

import { FC, useEffect, useState } from "react"
import { StoreModal } from "@/components/modals/store-modal";

interface ModalProviderProps { }

const ModalProvider: FC<ModalProviderProps> = ({ }) => {
    // hydration error -solution
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        if (!mounted) {
            setMounted(true)
        }
    }, []);

    if (!mounted) {
        return null;
    }
    //

    return <>
        <StoreModal />
    </>
}

export default ModalProvider;