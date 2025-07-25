export interface Category {
  id: number
  name: string
  value: string
  _count: {
    libraries: number
  }
}

export interface Framework {
  id: number
  name: string
  value: string
  _count: {
    libraries: number
  }
}

export interface Feature {
  id: number
  name: string
  value: string
  _count: {
    libraries: number
  }
}

export interface Component {
  id: number
  name: string
  value: string
  _count: {
    libraries: number
  }
}

export type FilterType = 'categories' | 'frameworks' | 'features' | 'components'
