import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import svgr from "vite-plugin-svgr";
import vike from "vike/plugin";
import { vikeVercelPlugin } from "@vite-plugin-vercel/vike";

export default defineConfig({
  plugins: [react(), tailwindcss(), svgr(), vike(), vikeVercelPlugin()],
  server: {
    allowedHosts: ["9ce476db48b9.ngrok-free.app"],
  },
});
