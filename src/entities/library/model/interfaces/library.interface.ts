import type {
  Category,
  Component,
  Feature,
  FilterEnum,
  FilterType,
  Framework,
} from '@/entities/filter'

export interface Library {
  id: string
  createdAt: string
  updatedAt: string
  name: string
  value: string
  img?: string
  url?: string
  frameworks: Framework[]
  features: Feature[]
  components: Component[]
  category: Category
  githubUrl?: string
  npmUrl?: string
  starsCount: number
  downloadsCount: number
  description: string | null
  archived: boolean
  disabled: boolean
  githubUpdatedAt: string | null
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

export interface LibraryListTotalCounterRes {
  data: {
    total: number
  }
}

export interface LibraryFilter {
  id: number
  name: string
  value: string
  type: FilterType
  icon: string | null
}
