export type I18nMessage = string | [string, object];
export type I18nArgs =
  | [string]
  | [string, Record<string, unknown>]
  | [string, string, Record<string, unknown>?];
