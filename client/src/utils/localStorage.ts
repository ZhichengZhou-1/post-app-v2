import { useState, useEffect, useRef } from "react";

export function useLocalStorage(key: string) {
    const rawValueRef = useRef<string | null>(null);

    const [value, setValue] = useState<string | null>(() => {
        rawValueRef.current = localStorage.getItem(key);
        return rawValueRef.current ?? null;
    });
    /**
     * update/remove local storage value
     */
    useEffect(() => {
        if (value) {
            const newValue = value;
            const oldValue = rawValueRef.current;
            rawValueRef.current = newValue;
            localStorage.setItem(key, newValue);
            window.dispatchEvent(
                new StorageEvent("storage", {
                    storageArea: window.localStorage,
                    url: window.location.href,
                    key,
                    newValue,
                    oldValue
                })
            );
        } else {
            window.localStorage.removeItem(key);
            window.dispatchEvent(
                new StorageEvent("storage", {
                    storageArea: window.localStorage,
                    url: window.location.href,
                    key
                })
            );
        }
    }, [value]);

    /**
     * keep state and local storage value in sync
     */
    useEffect(() => {
        const handleStorageChange = (e: StorageEvent) => {
            if (e.newValue !== rawValueRef.current) {
                rawValueRef.current = e.newValue;
                setValue(e.newValue ? e.newValue : null);
            }
        };

        window.addEventListener("storage", handleStorageChange);
        return () => window.removeEventListener("storage", handleStorageChange);
    }, [key]);

    return [value, setValue] as const;
}

export function generateLocalFileKey(fileId: string, filename?: string) {
    return `${filename}--${fileId}--DRAFT`;
}
