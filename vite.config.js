import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // This handles SPA routing - redirects all requests to index.html
    // so that React Router can handle the routing on the client side
    historyApiFallback: true,
  },
});
