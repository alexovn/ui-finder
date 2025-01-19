export interface ApiError {
  error: boolean
  data?: Record<string, any>
  status?: number
  message?: string
}
