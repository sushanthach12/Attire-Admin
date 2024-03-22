"use client"

import { FC, useEffect, useState } from "react"

const useOrigin = () => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true)
    }, [])
    
    if (!mounted) {
        return null;
    }
    
    const origin = typeof window !== "undefined" && window.location.origin ? window.location.origin: '';

    return origin;
}

export default useOrigin;