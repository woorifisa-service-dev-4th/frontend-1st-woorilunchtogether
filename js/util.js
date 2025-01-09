export function createNameList(names) {
    return names.map((name) => ({
      name,
      excluded: false,
    }));
}
  