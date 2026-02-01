import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist",
    sourcemap: false,
    // Using default esbuild minifier is faster and doesn't require extra dependencies
  },
  define: {
    // Only expose specific safe variables if needed, rather than the whole process.env object
    "process.env.REACT_APP_GOOGLE_MAPS_API_KEY": JSON.stringify(process.env.REACT_APP_GOOGLE_MAPS_API_KEY || ""),
  },
});
