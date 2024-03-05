import moment from "moment";
import { useEffect, useState } from "react";
import { useLocalStorage } from "../utils/localStorage";

interface EditorLocalStorageEntry {
    content: string;
    attributes: Record<string, unknown>;
    timeStamp: string;
}

interface CMSEditorOptions {
    remoteContent: string | undefined;
    remoteAttributes: Record<string, unknown> | undefined;
    localFileKey: string;
}

function useCMSEditor(options: CMSEditorOptions) {
    const { remoteContent, remoteAttributes, localFileKey } = options;

    const [localFileData, setLocalFileData] = useLocalStorage(localFileKey);

    const parsedLocalFileData =
        localFileData !== null
            ? (JSON.parse(localFileData) as EditorLocalStorageEntry)
            : null;

    const [editorContent, setEditorContent] = useState(
        parsedLocalFileData?.content ?? remoteContent
    );
    const [attributes, setAttributes] = useState(
        parsedLocalFileData?.attributes ?? remoteAttributes
    );

    /**
     * Saves to local when user start editing
     */
    useEffect(() => {
        let timeout: ReturnType<typeof setTimeout>;

        const diffFromRemote =
            editorContent !== remoteContent || attributes !== remoteAttributes;

        const diffFromLocalStorage =
            parsedLocalFileData &&
            (parsedLocalFileData?.content !== editorContent ||
                JSON.stringify(parsedLocalFileData?.attributes) !==
                    JSON.stringify(attributes));

        if ((!parsedLocalFileData && diffFromRemote) || diffFromLocalStorage) {
            timeout = setTimeout(() => {
                setLocalFileData(
                    JSON.stringify({
                        content: editorContent,
                        attributes,
                        timeStamp: moment(Date()).format("M/D/YYYY, h:mm:ss A")
                    })
                );
            }, 2500);
        }

        return () => {
            clearTimeout(timeout);
        };
    }, [editorContent, attributes]);

    /**
     * When there is no local file, use remote file (after discarding changes)
     */
    useEffect(() => {
        if (!localFileData && typeof remoteContent === "string") {
            setEditorContent(remoteContent);
            setAttributes(remoteAttributes);
        }
    }, [localFileData, remoteContent, remoteAttributes]);

    console.log("local content: ", editorContent);
    return {
        editorContent,
        attributes,
        setEditorContent,
        setAttributes,
        timeStamp: parsedLocalFileData?.timeStamp,
        hasLocalChanges: !!parsedLocalFileData,
        discardChanges: () => {
            setLocalFileData(null);
        }
    };
}

export default useCMSEditor;
