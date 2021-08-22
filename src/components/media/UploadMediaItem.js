function isSuccess(xhr) {
  return (xhr.status >= 200 && xhr.status < 300) || xhr.status === 304
}

function formData(as, file, fields) {
  const data = new FormData()

  if (fields) {
    Object.keys(fields).forEach(function(key) {
      data.append(key, fields[key])
    })
  }

  data.append(as, file)

  return data
}

function fileUploadData(xhr) {
  const data = {
    filename: xhr.file.name,
    content_type: xhr.file.type,
    size: xhr.file.size,
  }
  let json = {}

  try {
    json = JSON.parse(xhr.responseText)
  } catch (error) {
    json = {}
  }

  const id = xhr.id || json.id
  const url = xhr.url || json.url

  if (id) { data.id = id }
  if (url) { data.url = url }

  return JSON.stringify(data)
}

const UploadMediaItem = options => {
  const file = options.file
  const description = options.description
  const uploadSpec = options.uploadSpec

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.file = file

    const url = uploadSpec.url

    xhr.addEventListener("load", function() {
      xhr.complete = true

      if (isSuccess(xhr)) {
        resolve(fileUploadData(xhr))
      } else {
        reject(fileUploadData(xhr))
      }
    })

    if (uploadSpec.presigned) {
      const presignXhr = new XMLHttpRequest()
      const presignUrl = url + "?t=" + Date.now()

      presignXhr.addEventListener("load", function() {
        if (isSuccess(presignXhr)) {
          const data = JSON.parse(presignXhr.responseText)

          xhr.id = data.id

          xhr.open("POST", data.url, true)
          xhr.send(formData(data.as, file, data.fields))
        } else {
          xhr.complete = true
        }
      })

      presignXhr.open("GET", presignUrl, true)
      presignXhr.send()
    } else {
      xhr.open("POST", url, true)
      xhr.send(formData("file", file))
    }
  })
}

export default UploadMediaItem
