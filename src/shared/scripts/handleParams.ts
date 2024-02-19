export const handleParams = (params: URLSearchParams) => {
  params.delete('order')
  params.delete('by')
  params.delete('page')
}
