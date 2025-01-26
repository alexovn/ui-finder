import type {
  Category,
  Component,
  Feature,
  FilterEnum,
  Framework,
} from '@/entities/filter'

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

export interface LibraryListPayload {
  [FilterEnum.CATEGORIES]?: string[]
  [FilterEnum.FRAMEWORKS]?: string[]
  [FilterEnum.FEATURES]?: string[]
  [FilterEnum.COMPONENTS]?: string[]
}
