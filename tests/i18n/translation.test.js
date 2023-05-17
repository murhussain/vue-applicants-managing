import Trans from "@/i18n/translation";
import i18n from "@/i18n";
import { describe, test, expect, beforeEach, afterEach, vi } from "vitest";

describe('Trans', () => {
  beforeEach(() => {
    i18n.global.locale.value = 'en';
  });

  afterEach(() => {
    localStorage.clear();
  });

  test('currentLocale should return the current locale', () => {
    expect(Trans.currentLocale).toBe('en');
  });

  test('i18nRoute should add the current locale to the route', () => {
    const to = { path: '/about', params: {} };
    const result = Trans.i18nRoute(to);
    expect(result).toEqual({
      path: '/about',
      params: { locale: 'en' },
    });
  });

  test('defaultLocale should return the default locale from environment variables', () => {
    const defaultLocale = import.meta.env.VITE_DEFAULT_LOCALE;
    expect(Trans.defaultLocale).toBe(defaultLocale);
  });

  test('guessDefaultLocale should return the user persisted locale if available', () => {
    const persistedLocale = 'fr';
    localStorage.setItem('user-locale', persistedLocale);
    expect(Trans.guessDefaultLocale()).toBe(persistedLocale);
  });

  test('isLocaleSupported should return true for supported locales', () => {
    const supportedLocales = ['en', 'fr', 'es'];
    import.meta.env.VITE_SUPPORTED_LOCALES = supportedLocales.join(',');
    expect(Trans.isLocaleSupported('fr')).toBe(true);
    expect(Trans.isLocaleSupported('de')).toBe(false);
  });

  test('getPersistedLocale should return null if the persisted locale is not supported', () => {
    localStorage.setItem('user-locale', 'de');
    expect(Trans.getPersistedLocale()).toBeNull();
  });

  test('getPersistedLocale should return the persisted locale if it is supported', () => {
    const supportedLocales = ['en', 'fr', 'es'];
    import.meta.env.VITE_SUPPORTED_LOCALES = supportedLocales.join(',');
    localStorage.setItem('user-locale', 'fr');
    expect(Trans.getPersistedLocale()).toBe('fr');
  });

  test('routeMiddleware should switch language and call next if locale is supported', async () => {
    const to = { params: { locale: 'fr' } };
    const mockSwitchLanguage = vi.spyOn(Trans, 'switchLanguage');
    const mockNext = vi.fn();

    await Trans.routeMiddleware(to, null, mockNext);

    expect(mockSwitchLanguage).toHaveBeenCalledWith('fr');
    expect(mockNext).toHaveBeenCalled();
  });

  test('routeMiddleware should call next with default locale if locale is not supported', async () => {
    const to = { params: { locale: 'de' } };
    const mockGuessDefaultLocale = vi.spyOn(Trans, 'guessDefaultLocale');
    const mockNext = vi.fn();

    await Trans.routeMiddleware(to, null, mockNext);

    expect(mockGuessDefaultLocale).toHaveBeenCalled();
    expect(mockNext).toHaveBeenCalledWith(mockGuessDefaultLocale.mock.results[0].value);
  });

  test('routeMiddleware should call next with the same route if locale is supported', async () => {
    const to = { params: { locale: 'fr' } };
    const mockSwitchLanguage = vi.spyOn(Trans, 'switchLanguage');
    const mockNext = vi.fn();

    await Trans.routeMiddleware(to, null, mockNext);

    expect(mockSwitchLanguage).toHaveBeenCalledWith('fr');
    expect(mockNext).toHaveBeenCalledWith();
  });
});
