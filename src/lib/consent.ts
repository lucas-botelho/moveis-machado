export const CONSENT_STORAGE_KEY = "moveis-machado:consent";
export const CONSENT_POLICY_VERSION = "2026-10-14";
export const CONSENT_MAX_AGE_MS = 1000 * 60 * 60 * 24 * 183;

export type ConsentCategories = {
  externalMedia: boolean;
  diagnostics: boolean;
};

export type ConsentCategory = keyof ConsentCategories;

export type ConsentRecord = {
  version: string;
  categories: ConsentCategories;
  timestamp: string;
};

type ConsentStorage = Pick<Storage, "getItem" | "setItem" | "removeItem">;

export const DEFAULT_CONSENT_CATEGORIES: ConsentCategories = {
  externalMedia: false,
  diagnostics: false,
};

function isConsentRecord(value: unknown, now: number): value is ConsentRecord {
  if (!value || typeof value !== "object") return false;

  const candidate = value as Partial<ConsentRecord>;
  return (
    candidate.version === CONSENT_POLICY_VERSION &&
    typeof candidate.timestamp === "string" &&
    !Number.isNaN(Date.parse(candidate.timestamp)) &&
    now - Date.parse(candidate.timestamp) >= 0 &&
    now - Date.parse(candidate.timestamp) <= CONSENT_MAX_AGE_MS &&
    candidate.categories !== null &&
    typeof candidate.categories === "object" &&
    typeof candidate.categories.externalMedia === "boolean" &&
    typeof candidate.categories.diagnostics === "boolean"
  );
}

export function parseConsentRecord(raw: string | null, now = Date.now()): ConsentRecord | null {
  if (!raw) return null;

  try {
    const parsed: unknown = JSON.parse(raw);
    return isConsentRecord(parsed, now) ? parsed : null;
  } catch {
    return null;
  }
}

export function readConsent(storage?: ConsentStorage): ConsentRecord | null {
  const target = storage ?? (typeof window === "undefined" ? undefined : window.localStorage);
  if (!target) return null;

  try {
    return parseConsentRecord(target.getItem(CONSENT_STORAGE_KEY));
  } catch {
    return null;
  }
}

export function createConsentRecord(
  categories: ConsentCategories,
  timestamp = new Date().toISOString(),
): ConsentRecord {
  return {
    version: CONSENT_POLICY_VERSION,
    categories: { ...categories },
    timestamp,
  };
}

export function writeConsent(
  categories: ConsentCategories,
  storage?: ConsentStorage,
): ConsentRecord {
  const record = createConsentRecord(categories);
  const target = storage ?? (typeof window === "undefined" ? undefined : window.localStorage);

  try {
    target?.setItem(CONSENT_STORAGE_KEY, JSON.stringify(record));
  } catch {
    // The in-memory choice remains effective when storage is unavailable.
  }

  return record;
}

export function updateConsentCategory(
  current: ConsentRecord | null,
  category: ConsentCategory,
  enabled: boolean,
  storage?: ConsentStorage,
): ConsentRecord {
  return writeConsent(
    {
      ...(current?.categories ?? DEFAULT_CONSENT_CATEGORIES),
      [category]: enabled,
    },
    storage,
  );
}

export function consentAllows(category: ConsentCategory, storage?: ConsentStorage): boolean {
  return readConsent(storage)?.categories[category] === true;
}

export function clearConsent(storage?: ConsentStorage): void {
  const target = storage ?? (typeof window === "undefined" ? undefined : window.localStorage);
  try {
    target?.removeItem(CONSENT_STORAGE_KEY);
  } catch {
    // A failed clear cannot enable an optional resource.
  }
}
