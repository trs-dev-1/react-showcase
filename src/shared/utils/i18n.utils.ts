import { i18nOptions, i18nSupported } from '../constants/i18n.constants';
import { LocalStorageKeys } from '../hooks/storage/use-local-storage';
import { I18nArgs, I18nMessage } from '../interfaces/i18n.interfaces';
import { UIStateDef } from '../state/use-ui-state';

type getBrowserLocalesOption = {
  languageCodeOnly?: boolean;
};

function getBrowserLocales(options: getBrowserLocalesOption = {}) {
  const defaultOptions = {
    languageCodeOnly: true
  };
  const opt: getBrowserLocalesOption = {
    ...defaultOptions,
    ...options
  };

  const browserLocales = navigator
    ? navigator.languages === undefined
      ? [navigator.language]
      : navigator.languages
    : [];

  if (!browserLocales?.length) {
    return [];
  }

  return browserLocales.map((locale) => {
    const trimmedLocale = locale.trim();
    return opt.languageCodeOnly
      ? trimmedLocale?.split(/-|_/)?.[0]
      : trimmedLocale;
  });
}

export function getPreferredLanguage(): i18nSupported {
  const chosenLanguage = (
    JSON.parse(
      localStorage.getItem(
        'ui_preferences' satisfies LocalStorageKeys
      ) as string
    )?.state as UIStateDef
  )?.state?.language;

  if (chosenLanguage) {
    return chosenLanguage;
  }

  const locale = getBrowserLocales();

  if (!locale.length) {
    return i18nSupported.EN;
  }

  const supportedLngList = i18nOptions.map((item) => item.value);
  return (
    (locale.find((lng) =>
      supportedLngList.includes(lng as i18nSupported)
    ) as i18nSupported) || i18nSupported.EN
  );
}

export function mapToi18nPayload(payload: I18nMessage): I18nArgs {
  if (Array.isArray(payload)) {
    return [payload[0], { ...payload[1] }];
  }

  return [payload];
}
