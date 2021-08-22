import analyzeUrl from "@/lib/analyze_url"

const MAX_LENGTH = 25

export default (analysis) => {
  const result = []

  if (analysis.service) {
    result.push(analysis.type)

    if (analysis.username) {
      result.push("|")
      result.push(analysis.username)
    }
  } else {
    result.push(analysis.host)
  }

  const description = result.join(" ")

  if (description.length > MAX_LENGTH) {
    return description.substring(0, MAX_LENGTH) + "..."
  }

  return description
}
