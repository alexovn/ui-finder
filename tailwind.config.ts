import type { Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'

export default <Partial<Config>>{
  content: [
    "src/entities/**/*.{vue,js,jsx,mjs,ts,tsx}", // entites
    "src/widgets/**/*.{vue,js,jsx,mjs,ts,tsx}", // widgets
    "src/shared/**/*.{vue,js,jsx,mjs,ts,tsx}", // shared
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans]
      }
    }
  }
}
