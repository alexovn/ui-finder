export interface Category {
  id: number
  name: string
}

export interface Framework {
  id: number
  name: string
}

export interface Feature {
  id: number
  name: string
}

export interface Component {
  id: number
  name: string
}

export interface Library {
  id: string
  createdAt: string
  updatedAt: string
  name: string
  img: string
  link: string
  frameworks: Framework[]
  features: Feature[]
  components: Component[]
  category: Category
  githubLink: string
  npmLink: string
};
