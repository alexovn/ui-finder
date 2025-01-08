interface Badge {
  label: string
  value: string
  icon: string
}

interface Github {
  starCount: string
  link: string
};

interface Npm {
  downloadCount: string
  link: string
};

export interface Library {
  name: string
  img: string
  link: string
  badges: Badge[]
  github: Github
  npm: Npm
};
