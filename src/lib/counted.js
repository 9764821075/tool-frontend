const exceptions = {
  people: "person",
  addresses: "address",
  activities: "activity"
};

export default (plural, count) => {
  if (!plural) return "";

  if (!count || count == 0 || count > 1) {
    return plural;
  }

  return exceptions[plural] || plural.slice(0, -1);
};
