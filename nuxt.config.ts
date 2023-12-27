// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ['~/assets/css/main.css', '@/assets/css/styles.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
      postcssOptions: require('./postcss.config.js'),

    },
  },
})
