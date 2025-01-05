import antfu from '@antfu/eslint-config'
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
  antfu({
    ignores: ["*", "*/**", "!src", "!src/**", "!server", "!server/**"],
    vue: {
      overrides: {
        'vue/first-attribute-linebreak': ['error', {
          singleline: 'beside',
          multiline: 'below'
        }],
        'vue/max-attributes-per-line': ['error', {
          "singleline": {
            "max": 1
          },
          "multiline": {
            "max": 1
          }
        }]
      }
    }
  }),
)
