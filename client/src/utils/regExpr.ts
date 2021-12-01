const labelExpr = new RegExp('(?<label>.*)(?<id>\\s\\([\\w]{4}\\:[\\w]{4}\\))');

export const filterLabel = (string): string => {
  const filtered = labelExpr.exec(string);
  const filteredLabel = filtered?.groups?.label ?? '';

  return !filteredLabel ? string : filteredLabel;
};
