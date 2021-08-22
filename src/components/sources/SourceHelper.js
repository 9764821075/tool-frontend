import services from "@/lib/services"

const SourceHelper = {
  trimUrl(url) {
    try {
      url = new URL(url)
    } catch(error) {
      return url
    }

    let host = url.host
    if (/^www\./.test(host)) { host = host.substring(4) }

    return `${host}${url.pathname}${url.search}`
  },
  findKnownService(url) {
    for (const service in services) {
      const domain = services[service].domain
      const regexp = new RegExp(domain, "mi")

      if (regexp.test(url)) {
        return service
      }
    }

    return null
  },
  prepareData(sources) {
    const result = []

    for (let i = 0; i < sources.length; i++) {
      const url = sources[i].url
      if (url) {
        result.push({ url: url })
      }
    }

    return result
  },
}

export default SourceHelper
