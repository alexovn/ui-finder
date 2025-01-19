export interface Category {
  id: number
  name: string
  value: string
}

export interface Framework {
  id: number
  name: string
  value: string
}

export interface Feature {
  id: number
  name: string
  value: string
}

export interface Component {
  id: number
  name: string
  value: string
}

export interface Library {
  id: string
  createdAt: string
  updatedAt: string
  name: string
  value: string
  img?: string
  link?: string
  frameworks: Framework[]
  features: Feature[]
  components: Component[]
  category: Category
  githubLink: string
  npmLink: string
};
