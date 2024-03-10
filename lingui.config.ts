/** @type {import('@lingui/conf').LinguiConfig} */
module.exports = {
  locales: ['en', 'es', 'ja', 'fr', 'pt', 'zh-CN', 'ru', 'de', 'uk', 'sv-SE', 'fi', 'nl', 'el', 'it', 'pl'],
  sourceLocale: 'en',
  format: 'po',
  catalogs: [
    {
      path: '<rootDir>/translations/{locale}',
      include: ['<rootDir>/widget/embedded/src', '<rootDir>/widget/ui/src'],
      exclude: ['**/node_modules/**'],
    }
  ],
  rootDir: '.',
};
