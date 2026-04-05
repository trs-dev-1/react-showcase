export enum i18nSupported {
  EN = 'en',
  RO = 'ro',
  RU = 'ru'
}

export enum localizationEnum {
  RO = 'ro',
  MD = 'md'
}

export const localizationToCountryKeyMap: Record<localizationEnum, string> = {
  [localizationEnum.RO]: 'romania',
  [localizationEnum.MD]: 'moldova'
};

export const i18nOptions = [
  {
    key: 'romanian',
    value: i18nSupported.RO
  },
  {
    key: 'russian',
    value: i18nSupported.RU
  },
  {
    key: 'english',
    value: i18nSupported.EN
  }
];
