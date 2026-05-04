import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    chunkSizeWarningLimit: 2000,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes("node_modules")) {
            return;
          }

          const normalizedId = id.replace(/\\/g, "/");

          if (/\/node_modules\/(react|react-dom)\//.test(normalizedId)) {
            return "react-vendor";
          }

          if (normalizedId.includes("cloudinary-video-player")) {
            return "cloudinary-vendor";
          }

          if (normalizedId.includes("lucide-react")) {
            return "icons-vendor";
          }

          const pathParts = normalizedId.split("node_modules/")[1]?.split("/");
          const packageName = pathParts?.[0].startsWith("@")
            ? `${pathParts[0].slice(1)}-${pathParts[1]}`
            : pathParts?.[0];

          return packageName ? `vendor-${packageName}` : "vendor";
        },
      },
    },
  },
});
