import type { Category } from '../category/category.interface'
import type { Component } from '../component/component.interface'
import type { Feature } from '../feature/feature.interface'
import type { Framework } from '../framework/framework.interface'

export interface Library {
  id: string
  createdAt: Date
  updatedAt: Date
  name: string
  value: string
  img: string | null
  link: string | null
  frameworks: Framework[]
  features: Feature[]
  components: Component[]
  githubRepo: string | null
  npmPackage: string | null
  githubStars: number
  npmDownloads: number
  category: Category
  categoryId: number
}
