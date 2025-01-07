export default defineAppConfig({
  ui: {
    primary: 'neutral',
    gray: 'neutral',
    button: {
      color: {
        white: {
          ghost: 'text-dark hover:text-dark hover:bg-neutral-200/75 dark:hover:text-white dark:hover:bg-neutral-700/40',
        },
      },
    },
  },
  icon: {
    class: 'icon',
  },
})
