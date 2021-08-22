import { compact } from "lodash"

const dateHelper = {
  formatSinceUntil(record) {
    const sinceMonth = record.since_month
    const sinceYear = record.since_year
    const untilMonth = record.until_month
    const untilYear = record.until_year

    if (!sinceYear && !untilYear) { return "" }

    const result = []

    if (sinceYear || sinceMonth) {
      result.push("Since:")
    }
    if (sinceYear && sinceMonth) {
      result.push(`${dateHelper.padNumber(sinceMonth)}/${sinceYear}`)
    } else if (sinceYear && !sinceMonth) {
      result.push(sinceYear)
    } else if (!sinceYear && sinceMonth) {
      result.push("?")
    }

    if (result.length && (untilMonth || untilYear)) {
      result.push("–")
    }

    if (untilYear || untilMonth) {
      result.push("Until:")
    }
    if (untilYear && untilMonth) {
      result.push(`${dateHelper.padNumber(untilMonth)}/${untilYear}`)
    } else if (untilYear && !untilMonth) {
      result.push(untilYear)
    } else if (!untilYear && untilMonth) {
      result.push("?")
    }

    return result.join(" ")
  },
  formatDate(record) {
    const year = record.date_year
    const month = dateHelper.padNumber(record.date_month)
    const day = dateHelper.padNumber(record.date_day)

    return compact([day, month, year]).join("/")
  },
  formatDateObject(date) {
    const year = date.year
    const month = dateHelper.padNumber(date.month)
    const day = dateHelper.padNumber(date.day)

    return compact([day, month, year]).join("/")
  },
  formatDateString(dateString) {
    if (!dateString) { return "" }

    const date = new Date(dateString)

    const year = date.getFullYear()
    const month = dateHelper.padNumber(date.getMonth() + 1)
    const day = dateHelper.padNumber(date.getDate())

    return [day, month, year].join("/")
  },
  padNumber(number) {
    if (!number) { return "" }
    return ("0" + number).slice(-2)
  },
}

export default dateHelper
