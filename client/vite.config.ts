import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
import checker from "vite-plugin-checker";
import pluginRewriteAll from "vite-plugin-rewrite-all";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        checker({
            typescript: true
        }),
        pluginRewriteAll()
    ],
    server: {
        proxy: {
            "/api": "http://localhost:9098",
            "/login": "http://localhost:9098",
            "/logout": "http://localhost:9098",
            "/fakelogin": "http://localhost:9098"
        }
    },
    build: {
        outDir: "../dist/client",
        rollupOptions: {
            onwarn(warning, warn) {
                // suppress module level directive warnings
                if (warning.code === "MODULE_LEVEL_DIRECTIVE") {
                    return;
                }
                warn(warning);
            }
        }
    },
    optimizeDeps: {
        include: ["@emotion/styled"]
    }
});
