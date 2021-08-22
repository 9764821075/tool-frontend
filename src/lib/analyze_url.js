import {compact, isFunction } from "lodash"
import services from "@/lib/services"

const servicePaths = {
  twitter: {
    "/i/moments/[0-9]{1,}/?": {
      type: "moments",
    },
    "/([a-z0-9_.]{1,15})/status/[0-9]{1,}/?": {
      type: "post",
      username: 1,
    },
    "/([a-z0-9_.]{1,15})/?": {
      type: "profile",
      username: 1,
    },
  },
  facebook: {
    "/profile.php": {
      type: "profile",
      username: data => data.params.id,
    },
    "/permalink.php": {
      type: data => data.params.story_fbid ? "post" : null,
      username: data => data.params.story_fbid ? data.params.id : null,
    },
    "/photo.php": {
      type: "photo",
    },
    "/([a-z0-9_\\-\\.]{1,50})/photos/": {
      type: data => data.params.comment_id ? "comment" : "photo",
      username: 1,
    },
    "/events/": {
      type: "event",
    },
    "/([a-z0-9_\\-\\.]{1,50})/posts/[0-9]{1,}/?": {
      type: data => data.params.comment_id ? "comment" : "post",
      username: 1,
    },
    "/([a-z0-9_\\-\\.]{1,50})/videos/[0-9]{1,}/?": {
      type: data => data.params.comment_id ? "comment" : "video",
      username: 1,
    },
    "/([a-z0-9_\\-\\.]{1,50})/?": {
      type: "profile",
      username: 1,
    },
  },
  youtube: {
    "/watch": {
      type: "video",
    },
    "/channel/([a-z0-9_\\-''\.]{1,50})/?": {
      type: "profile",
      username: 1,
    },
    "/user/([a-z0-9_\\-\\.]{1,50})/?": {
      type: "profile",
      username: 1,
    },
  },
  instagram: {
    "/p/[a-z0-9]{1,20}/?": {
      type: "photo",
      username: data => data.params["taken-by"],
    },
    "/([a-z0-9_\\-\\.]{1,35})/?": {
      type: "profile",
      username: 1,
    },
  },
  flickr: {
    "/people/([a-z0-9@_\\.\\-]{1,50})/?": {
      type: "profile",
      username: 1,
    },
    "/photos/([a-z0-9@_\\.\\-]{1,50})/sets/[0-9]{1,30}/with/[0-9]{1,30}/?": {
      type: "photo-album",
      username: 1,
    },
    "/photos/([a-z0-9@_\\.\\-]{1,50})/albums/with/[0-9]{1,30}/?": {
      type: "photo-albums",
      username: 1,
    },
    "/photos/([a-z0-9@_\\.\\-]{1,50})/[0-9]{1,30}/in/[a-z0-9@_\\.\\-]{1,70}/?": {
      type: "photo",
      username: 1,
    },
    "/photos/([a-z0-9@_\\.\\-]{1,50})/?": {
      type: "photos",
      username: 1,
    },
  },
  bitchute: {
    "/channel/([a-z0-9@_\\.\\-]{1,50})/?": {
      type: "profile",
      username: 1,
    },
    "/video/[a-z0-9]{1,20}/?": {
      type: "video",
    },
  },
  tumblr: {
    "/post/[0-9]{1,20}/?": {
      type: "post",
      username: (data) => data.subdomain,
    },
    "^/$": {
      type: "profile",
      username: (data) => data.subdomain,
    },
  },
  gab: {
    "/([a-z0-9_\\-]{1,60})/posts/[0-9]{1,15}": {
      ignore: "^/(hash|tv|popular|news|topic|topics|search|auth|expore|about)",
      type: "post",
      username: 1,
    },
    "/([a-z0-9_\\-]{1,60})/?": {
      ignore: "^/(hash|tv|popular|news|topic|topics|search|auth|expore|about)",
      type: "profile",
      username: 1,
    },
  },
}

const parseQueryString = function(queryString) {
  let params = {}, queries, temp

  if (queryString[0] == "?") {
    queryString = queryString.substring(1)
  }

  queries = compact(queryString.split("&"))

  for (let i = 0; i < queries.length; i++) {
    temp = queries[i].split("=")
    params[temp[0]] = temp[1]
  }

  return params
}

export default (url) => {
  const result = {
    host: null,
    service: null,
    type: null,
    username: null,
  }

  try {
    url = new URL(url)
  } catch(error) {
    return
  }

  const hostMatch = url.host.match(/[^\.]*\.[^.]*$/)
  if (!hostMatch || !hostMatch[0]) {
    return
  }
  result.host = hostMatch[0]

  for (const service in services) {
    if (url.href.match(new RegExp(services[service].domain))) {
      result.service = service
    }
  }

  const urlPath = url.pathname + url.search
  const paths = servicePaths[result.service]

  for (const regex in paths) {
    const ignore = paths[regex].ignore

    if (ignore) {
      const ignoreMatch = new RegExp(ignore, "i").exec(urlPath)
      if (ignoreMatch) {
        continue
      }
    }

    const match = new RegExp(regex, "i").exec(urlPath)

    if (match) {
      const params = parseQueryString(url.search)
      const subdomain = url.host.split(".")[0]

      const data = {
        params: params,
        subdomain: subdomain,
      }

      const type = paths[regex].type
      if (isFunction(type)) {
        result.type = type(data)
      } else {
        result.type = type
      }

      const username = paths[regex].username
      if (username) {
        if (isFunction(username)) {
          result.username = username(data)
        } else {
          result.username = match[username]
        }
      }

      break
    }
  }

  return result
}
