import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import svgr from "vite-plugin-svgr";
import vike from "vike/plugin";

export default defineConfig({
  plugins: [react(), tailwindcss(), svgr(), vike()],
  server: {
    allowedHosts: ["9ce476db48b9.ngrok-free.app"],
  },
});
