export const mapCountries = (countries) => {
  const options = []
  for (const [code, country] of Object.entries(countries)) {
    options.push({
      code: code,
      name: country,
    })
  }
  return options
};

export const mapServices = (services) => {
  const options = []
  for (const [service, attributes] of Object.entries(services)) {
    options.push({
      key: service,
      value: attributes.name,
      icon: attributes.icon,
    })
  }
  return options
};

export const mapRelationships = (relationships) => {
  const options = []
  for (const [status, name] of Object.entries(relationships)) {
    options.push({
      key: status,
      value: name,
    })
  }
  return options
};
