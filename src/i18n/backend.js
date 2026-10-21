export function createTranslationBackend(dictionaries, fallback) {
  return {
    type: "backend",
    init() {},
    read(language, _namespace, callback) {
      const load = dictionaries[`../generated/locales/${language}.json`];
      if (!load) { callback(null, fallback); return; }
      load().then((dictionary) => callback(null, dictionary.default)).catch((error) => callback(error, false));
    },
  };
}
