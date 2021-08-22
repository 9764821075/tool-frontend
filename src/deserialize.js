import dateHelper from "@/lib/date_helper"

const definition = {
  people: {
    self: { date_of_birth: "date", date_of_death: "date" },
    notes: { date: "date" },
  },
  organizations: {
    notes: { date: "date" },
  },
  activities: {
    notes: { date: "date" },
  },
  sources: {
    self: { published_at: "date" },
  },
}

const deserializers = {
  date: dateHelper.formatDateString,
}

const buildDeserializer = (resource, association) => {
  if (!association) { association = "self" }

  const def = definition[resource] && definition[resource][association]
  if (!def) { return }

  return record => {
    for (const attribute in def) {
      const deserializer = deserializers[def[attribute]]
      record[attribute] = deserializer(record[attribute])
    }

    return record
  }
}

export default (record, resource, association) => {
  const deserializer = buildDeserializer(resource, association)
  return deserializer ? deserializer(record) : record
}
