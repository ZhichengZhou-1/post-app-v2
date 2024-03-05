import { Row, createColumnHelper } from "@tanstack/react-table";
import { useNavigate } from "react-router-dom";
import { useClientTable } from "../../../hooks/useTable";
import Table from "../../../components/Table/Table";
import { useState } from "react";
import Search from "../../../components/Search";
import TableModal from "../../../components/Table/TableModal";
import Button from "../../../components/Button";
import dayjs from "dayjs";

export interface FileListTableProps {
    data: TableRow[];
    isLoading: boolean;
    handlers: {
        onAddFile: () => void;
        onClone: (file: Row<TableRow>) => void;
        onDelete: (file: Row<TableRow>) => void;
    };
}

export interface TableRow {
    postId: string;
    author: string;
    authorEmail: string;
    title: string;
    content?: string;
    lastModified?: string;
}

const columnHelper = createColumnHelper<TableRow>();

const FileListTable = ({ data, isLoading, handlers }: FileListTableProps) => {
    const navigate = useNavigate();

    const [advStatusFilter, setAdvStatusFilter] = useState<string[]>([]);
    const [advFilterOpen, setAdvFilterOpen] = useState(false);
    const [searchValue, setSearchValue] = useState<string>("");

    const columns = [
        columnHelper.accessor("postId", {
            header: "ID",
            enableSorting: true,
            enableColumnFilter: false,
            cell: ({ cell }) => {
                return <>{cell.row.original.postId}</>;
            }
        }),
        columnHelper.accessor("title", {
            header: "Title",
            enableSorting: true,
            enableColumnFilter: false,
            cell: ({ cell }) => {
                return cell.row.original.title;
            }
        }),
        columnHelper.accessor("author", {
            header: "Author",
            enableSorting: false,
            enableColumnFilter: false,
            cell: ({ cell }) => {
                return cell.row.original.author;
            }
        }),
        columnHelper.accessor("authorEmail", {
            header: "Email",
            enableSorting: true,
            enableColumnFilter: false,
            cell: ({ cell }) => {
                return cell.row.original.authorEmail;
            }
        }),
        columnHelper.accessor("lastModified", {
            header: "Last Updated",
            enableSorting: true,
            enableColumnFilter: false,
            cell: ({ cell }) => {
                console.log("last modified: ", cell.row.original.lastModified);
                return dayjs(cell.row.original.lastModified).format(
                    "MMMM DD, YYYY [at] HH:mm:ss"
                );
            }
        }),
        columnHelper.display({
            header: " ",
            enableSorting: false,
            enableColumnFilter: false,
            cell: ({ row }) => {
                return (
                    <TableModal
                        valueOne={"Clone"}
                        valueTwo={"Delete"}
                        onClickOne={() => {
                            handlers.onClone(row);
                        }}
                        onClickTwo={() => {
                            handlers.onDelete(row);
                        }}
                    />
                );
            }
        })
    ];

    const table = useClientTable({ columns, data: data });
    return (
        <>
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: "20px",
                    flexWrap: "wrap"
                }}
            >
                <div
                    style={{
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "flex-start ",
                        paddingBottom: "8px",
                        gap: "10px",
                        marginLeft: "15px"
                    }}
                >
                    {" "}
                    <Search
                        type="medium"
                        value={searchValue}
                        handleClear={() => {
                            setSearchValue("");
                            table.getColumn("postId")?.setFilterValue("");
                        }}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                table
                                    .getColumn("postId")
                                    ?.setFilterValue(searchValue);
                            }
                        }}
                        onChange={(e: any) => {
                            setSearchValue(e.target.value);
                        }}
                        label={"Search"}
                    />
                    <div
                        style={{
                            marginLeft: "auto",
                            display: "flex",
                            gap: "10px"
                        }}
                    >
                        <Button
                            type="default"
                            size="medium"
                            onClick={handlers.onAddFile}
                            sx={{
                                marginRight: "15px"
                            }}
                        >
                            Add File
                        </Button>
                    </div>
                </div>
                <Table
                    table={table}
                    loading={isLoading}
                    onRowClick={(row) => {
                        console.log("post id is: ", row.original.postId);
                        navigate(`/admin/file/detail/${row.original.postId}`);
                    }}
                />
            </div>
        </>
    );
};

export default FileListTable;
