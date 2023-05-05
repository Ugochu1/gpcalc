export async function wfetch(url: string, options: object) {
  const response = await fetch(url, options)

  return response.json()
}