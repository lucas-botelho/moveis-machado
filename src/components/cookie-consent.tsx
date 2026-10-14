import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

import { Button } from "@/components/ui/button";
import {
  DEFAULT_CONSENT_CATEGORIES,
  readConsent,
  updateConsentCategory,
  writeConsent,
  type ConsentCategories,
  type ConsentCategory,
  type ConsentRecord,
} from "@/lib/consent";
import { cookieConsentContent, type Language } from "@/lib/site-content";

type ConsentContextValue = {
  record: ConsentRecord | null;
  hydrated: boolean;
  preferencesOpen: boolean;
  setPreferencesOpen: (open: boolean) => void;
  acceptAll: () => void;
  rejectAll: () => void;
  saveCategories: (categories: ConsentCategories) => void;
  allowCategory: (category: ConsentCategory) => void;
};

const ConsentContext = createContext<ConsentContextValue | null>(null);

export function ConsentProvider({ children }: { children: ReactNode }) {
  const [record, setRecord] = useState<ConsentRecord | null>(null);
  const [hydrated, setHydrated] = useState(false);
  const [preferencesOpen, setPreferencesOpen] = useState(false);

  useEffect(() => {
    setRecord(readConsent());
    setHydrated(true);
  }, []);

  const value = useMemo<ConsentContextValue>(
    () => ({
      record,
      hydrated,
      preferencesOpen,
      setPreferencesOpen,
      acceptAll: () => {
        setRecord(writeConsent({ externalMedia: true, diagnostics: true }));
        setPreferencesOpen(false);
      },
      rejectAll: () => {
        setRecord(writeConsent(DEFAULT_CONSENT_CATEGORIES));
        setPreferencesOpen(false);
      },
      saveCategories: (categories) => {
        setRecord(writeConsent(categories));
        setPreferencesOpen(false);
      },
      allowCategory: (category) => {
        setRecord((current) => updateConsentCategory(current, category, true));
      },
    }),
    [hydrated, preferencesOpen, record],
  );

  return <ConsentContext.Provider value={value}>{children}</ConsentContext.Provider>;
}

export function useConsent(): ConsentContextValue {
  const value = useContext(ConsentContext);
  if (!value) throw new Error("useConsent must be used inside ConsentProvider");
  return value;
}

export function CookieConsentExperience({ lang }: { lang: Language }) {
  const consent = useConsent();
  const copy = cookieConsentContent[lang];

  if (!consent.hydrated) return null;

  return (
    <>
      {!consent.record && (
        <section className="cookie-banner" aria-labelledby="cookie-banner-title" aria-live="polite">
          <div className="cookie-banner-copy">
            <h2 id="cookie-banner-title">{copy.bannerTitle}</h2>
            <p>{copy.bannerDescription}</p>
          </div>
          <div className="cookie-banner-actions">
            <Button type="button" variant="outline" onClick={consent.rejectAll}>
              {copy.reject}
            </Button>
            <Button type="button" variant="outline" onClick={consent.acceptAll}>
              {copy.accept}
            </Button>
            <Button
              type="button"
              variant="ghost"
              className="cookie-customize"
              onClick={() => consent.setPreferencesOpen(true)}
            >
              {copy.customize}
            </Button>
          </div>
        </section>
      )}
      <CookiePreferences lang={lang} />
    </>
  );
}

function CookiePreferences({ lang }: { lang: Language }) {
  const consent = useConsent();
  const copy = cookieConsentContent[lang];
  const [categories, setCategories] = useState<ConsentCategories>(DEFAULT_CONSENT_CATEGORIES);

  useEffect(() => {
    if (!consent.preferencesOpen) return;
    setCategories(consent.record?.categories ?? DEFAULT_CONSENT_CATEGORIES);
  }, [consent.preferencesOpen, consent.record]);

  const toggle = (category: ConsentCategory) => {
    setCategories((current) => ({ ...current, [category]: !current[category] }));
  };

  return (
    <DialogPrimitive.Root open={consent.preferencesOpen} onOpenChange={consent.setPreferencesOpen}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="cookie-dialog-overlay" />
        <DialogPrimitive.Content className="cookie-dialog" aria-describedby="cookie-dialog-copy">
          <DialogPrimitive.Close className="cookie-dialog-close" aria-label={copy.close}>
            <X aria-hidden="true" />
          </DialogPrimitive.Close>
          <DialogPrimitive.Title>{copy.preferencesTitle}</DialogPrimitive.Title>
          <DialogPrimitive.Description id="cookie-dialog-copy">
            {copy.preferencesDescription}
          </DialogPrimitive.Description>

          <div className="cookie-category-list">
            <div className="cookie-category is-required">
              <div>
                <h3>{copy.necessaryTitle}</h3>
                <p>{copy.necessaryDescription}</p>
              </div>
              <span>{copy.alwaysActive}</span>
            </div>
            <label className="cookie-category">
              <span>
                <strong>{copy.externalMediaTitle}</strong>
                <small>{copy.externalMediaDescription}</small>
              </span>
              <input
                type="checkbox"
                checked={categories.externalMedia}
                onChange={() => toggle("externalMedia")}
              />
            </label>
            <label className="cookie-category">
              <span>
                <strong>{copy.diagnosticsTitle}</strong>
                <small>{copy.diagnosticsDescription}</small>
              </span>
              <input
                type="checkbox"
                checked={categories.diagnostics}
                onChange={() => toggle("diagnostics")}
              />
            </label>
          </div>

          <div className="cookie-dialog-actions">
            <Button type="button" variant="outline" onClick={consent.rejectAll}>
              {copy.reject}
            </Button>
            <Button type="button" variant="outline" onClick={consent.acceptAll}>
              {copy.accept}
            </Button>
            <Button
              type="button"
              variant="luxury"
              onClick={() => consent.saveCategories(categories)}
            >
              {copy.save}
            </Button>
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
