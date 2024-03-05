import { html } from "@codemirror/lang-html";
import { tags as t } from "@lezer/highlight";
import { BoxProps, Box as MUIBox } from "@mui/material";
import { createTheme } from "@uiw/codemirror-themes";
import CodeMirror from "@uiw/react-codemirror";
import { memo } from "react";

interface EditorProps {
    value: string;
    onChange: (value: string) => void;
    readOnly: boolean;
    sx?: BoxProps;
}

const CodeEditor = ({ value, onChange, readOnly, sx }: EditorProps) => {
    const editorThenme = createTheme({
        theme: "dark",
        settings: {
            background: "#272822",
            gutterBackground: "#272822",
            caret: "#fff"
        },
        styles: [
            { tag: t.content, color: "#f8f8f2" },
            { tag: t.name, color: "#f92672" },
            { tag: t.keyword, color: "#f92672" },
            { tag: t.operator, color: "white" },
            { tag: t.brace, color: "white" },
            { tag: t.comment, color: "#75715E" },
            { tag: t.string, color: "#E6DB74" },
            { tag: t.paren, color: "white" },
            { tag: t.punctuation, color: "white" },
            { tag: t.variableName, color: "white" },
            { tag: t.propertyName, color: "#A6E22E" }
        ]
    });

    return (
        <MUIBox
            sx={[
                {
                    display: "flex",
                    height: "100%",
                    width: "100%",
                    overflow: "auto"
                },
                ...(Array.isArray(sx) ? sx : [sx])
            ]}
        >
            <div
                style={{
                    flex: 1,
                    height: "100%",
                    overflow: "auto"
                }}
            >
                <MUIBox
                    height="100%"
                    sx={{
                        "& .cm-gutters": {
                            minWidth: "20px",
                            padding: "0 3px 0 5px",
                            textAlign: "right",
                            " & .cm-gutter": {
                                " & .cm-gutterElement": {
                                    padding: "0"
                                }
                            }
                        },
                        "& .cm-content": {
                            "& .cm-line": {
                                marginLeft: "-2px"
                            }
                        }
                    }}
                >
                    <CodeMirror
                        value={value.replace(/^\s+/, "")}
                        height="100%"
                        extensions={[html({})]}
                        onChange={onChange}
                        theme={editorThenme}
                        autoFocus={true}
                        readOnly={readOnly}
                        basicSetup={{
                            bracketMatching: true,
                            closeBrackets: true,
                            autocompletion: true,
                            highlightActiveLine: false,
                            highlightActiveLineGutter: false,
                            foldGutter: false
                        }}
                        style={{
                            textAlign: "left",
                            height: "100%"
                        }}
                    />
                </MUIBox>
            </div>
        </MUIBox>
    );
};

export default memo(CodeEditor);
