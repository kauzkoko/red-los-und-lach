// unocss.config.ts
import { defineConfig, presetIcons } from "unocss";

export default defineConfig({
  presets: [
    presetIcons({
      scale: 1.2, // scale the icons
    }),
  ],
});
