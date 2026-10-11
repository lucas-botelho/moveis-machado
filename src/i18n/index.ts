import pt from "../../messages/pt-PT.json";
import en from "../../messages/en.json";
import type { Locale } from "../content";
export const messages = { pt, en };
export const getMessages = (locale: Locale) => messages[locale];
