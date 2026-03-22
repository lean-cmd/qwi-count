/**
 * useTranslation.ts
 *
 * Hook that returns the current language's translation strings.
 *
 * @author claude — 2026-03-22
 */

import { useSettingsStore } from '@/stores/settingsStore';
import { translations, type TranslationStrings } from '@/lib/i18n';

export function useTranslation(): TranslationStrings {
  const language = useSettingsStore((s) => s.language);
  return translations[language] ?? translations.en;
}
