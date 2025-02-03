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
  githubRepo?: string
  npmPackage?: string
  githubStars: number
  npmDownloads: number
};

export interface LibraryListPayload {
  search?: string
  orderBy?: string
  orderDir?: string
  perPage?: string
  [FilterEnum.CATEGORIES]?: string[]
  [FilterEnum.FRAMEWORKS]?: string[]
  [FilterEnum.FEATURES]?: string[]
  [FilterEnum.COMPONENTS]?: string[]
}

export interface LibraryListRes {
  data: Library[]
  meta: {
    pagination: {
      page: number
      total: number
      totalPages: number
    }
  }
}
