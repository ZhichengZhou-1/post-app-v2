import { Box, CircularProgress } from "@mui/material";
import {
    Navigate,
    Route,
    RouterProvider,
    createBrowserRouter,
    createRoutesFromElements
} from "react-router-dom";
import useUserProfile from "./hooks/useUserProfile";
import LoginRoute from "./pages/login/Login.route";
import FileListRoute from "./pages/file-list/list-view/FileList.route";
import FileDetailRoute from "./pages/file-list/detail-view/FileDetail.route";

function RequireAuth({
    navigateAfterAuth,
    children
}: {
    children?: React.ReactNode;
    navigateAfterAuth?: string;
}) {
    const { data, isLoading, isError } = useUserProfile();
    if (isLoading) {
        return <CircularProgress />;
    }
    if (!data || isError) {
        return <Navigate to="/login" replace={true} />;
    }

    if (navigateAfterAuth) {
        return <Navigate to={navigateAfterAuth} />;
    }

    return <> {children} </>;
}

function App() {
    const routes = createBrowserRouter(
        createRoutesFromElements(
            <Route path="/">
                <Route
                    index
                    element={<Navigate to={"/admin"} replace={true} />}
                />
                <Route path="login" element={<LoginRoute />} />
                <Route path="admin">
                    <Route
                        index
                        element={
                            <RequireAuth>
                                <Navigate
                                    to={"/admin/file/list"}
                                    replace={true}
                                />{" "}
                            </RequireAuth>
                        }
                    />

                    <Route
                        path="file/list"
                        element={
                            <RequireAuth>
                                <FileListRoute />
                            </RequireAuth>
                        }
                    />
                    <Route
                        path={"file/detail/:id"}
                        element={
                            <RequireAuth>
                                <FileDetailRoute />
                            </RequireAuth>
                        }
                    />
                </Route>
            </Route>
        )
    );

    return (
        <Box
            sx={{
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column"
            }}
        >
            <RouterProvider router={routes} />
        </Box>
    );
}

export default App;
