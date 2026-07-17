// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-05-15",
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],

  app: {
    head: {
      htmlAttrs: { lang: "en" },
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico?v=2" }],
    },
  },

  modules: [
    "@nuxt/content",
    "@nuxt/ui",
    "@nuxtjs/supabase",
  ],

  vite: {
    plugins: [tailwindcss()],
  },

  supabase: {
    redirect: false,
  },

  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/'],
    },
  },
});
