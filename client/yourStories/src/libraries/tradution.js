import i18n from 'i18n-js';
import { NativeModules, Platform } from 'react-native';

import en from './locales/en.json';
import pt_PT from './locales/pt_PT.json';
import pt_BR from './locales/pt_BR.json';

const locale =
  Platform.OS === 'ios'
    ? NativeModules.SettingsManager.settings.AppleLocale
    : NativeModules.I18nManager.localeIdentifier;

i18n.defaultLocale = "en";
i18n.locale = locale;
i18n.fallbacks = true;
i18n.translations = { en, pt_PT, pt_BR };

export default i18n;