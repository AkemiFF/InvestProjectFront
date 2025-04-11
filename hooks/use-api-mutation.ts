"use client"

import { useState } from "react"
import type { AxiosError } from "axios"

interface UseApiMutationOptions<TData, TVariables> {
  onSuccess?: (data: TData, variables: TVariables) => void
  onError?: (error: AxiosError, variables: TVariables) => void
}

interface UseApiMutationResult<TData, TVariables> {
  mutate: (variables: TVariables, options?: UseApiMutationOptions<TData, TVariables>) => Promise<TData | undefined>
  isLoading: boolean
  error: AxiosError | null
  data: TData | undefined
}

export function useApiMutation<TData, TVariables>(
  mutationFn: (variables: TVariables) => Promise<TData>,
  defaultOptions: UseApiMutationOptions<TData, TVariables> = {},
): UseApiMutationResult<TData, TVariables> {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<AxiosError | null>(null)
  const [data, setData] = useState<TData | undefined>(undefined)

  const mutate = async (
    variables: TVariables,
    options?: UseApiMutationOptions<TData, TVariables>,
  ): Promise<TData | undefined> => {
    const mergedOptions = { ...defaultOptions, ...options }
    const { onSuccess, onError } = mergedOptions

    setIsLoading(true)
    setError(null)

    try {
      const result = await mutationFn(variables)
      setData(result)
      onSuccess?.(result, variables)
      return result
    } catch (err) {
      const axiosError = err as AxiosError
      setError(axiosError)
      onError?.(axiosError, variables)
      return undefined
    } finally {
      setIsLoading(false)
    }
  }

  return { mutate, isLoading, error, data }
}

