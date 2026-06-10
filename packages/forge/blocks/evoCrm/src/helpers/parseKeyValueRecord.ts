export const parseKeyValueRecord = (
  items?: { key?: string; value?: string }[],
): Record<string, string> => {
  const record: Record<string, string> = {};

  items?.forEach(({ key, value }) => {
    if (!key || value === undefined || value === "") return;
    record[key] = value;
  });

  return record;
};
