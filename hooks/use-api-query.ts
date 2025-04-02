"use client"

import { useState, useEffect } from "react"
import type { AxiosError } from "axios"

interface UseApiQueryOptions<T> {
  initialData?: T
  enabled?: boolean
  onSuccess?: (data: T) => void
  onError?: (error: AxiosError) => void
}

interface UseApiQueryResult<T> {
  data: T | undefined
  isLoading: boolean
  error: AxiosError | null
  refetch: () => Promise<void>
}

export function useApiQuery<T>(queryFn: () => Promise<T>, options: UseApiQueryOptions<T> = {}): UseApiQueryResult<T> {
  const { initialData, enabled = true, onSuccess, onError } = options

  const [data, setData] = useState<T | undefined>(initialData)
  const [isLoading, setIsLoading] = useState<boolean>(enabled)
  const [error, setError] = useState<AxiosError | null>(null)

  const fetchData = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const result = await queryFn()
      setData(result)
      onSuccess?.(result)
    } catch (err) {
      const axiosError = err as AxiosError
      setError(axiosError)
      onError?.(axiosError)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (enabled) {
      fetchData()
    }
  }, [enabled])

  const refetch = async () => {
    await fetchData()
  }

  return { data, isLoading, error, refetch }
}

