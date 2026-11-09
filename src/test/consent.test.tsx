import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";

import { CookieConsentExperience, ConsentProvider, useConsent } from "@/components/cookie-consent";
import {
  CONSENT_POLICY_VERSION,
  CONSENT_STORAGE_KEY,
  createConsentRecord,
  parseConsentRecord,
  readConsent,
  writeConsent,
} from "@/lib/consent";
import { ConsentMap } from "@/routes/contact";

function ConsentHarness({ withMap = false }: { withMap?: boolean }) {
  const consent = useConsent();

  return (
    <>
      <button type="button" onClick={() => consent.setPreferencesOpen(true)}>
        Gerir teste
      </button>
      {withMap && <ConsentMap lang="pt" />}
      <CookieConsentExperience lang="pt" />
    </>
  );
}

function renderConsent(withMap = false) {
  return render(
    <ConsentProvider>
      <ConsentHarness withMap={withMap} />
    </ConsentProvider>,
  );
}

describe("Cookie consent", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("starts with optional categories off on a first visit", async () => {
    renderConsent();

    expect(
      await screen.findByRole("heading", { name: "Valorizamos a sua privacidade" }),
    ).toBeVisible();
    fireEvent.click(screen.getByRole("button", { name: "Personalizar" }));

    expect(screen.getByRole("checkbox", { name: /Conteúdo externo/ })).not.toBeChecked();
    expect(screen.queryByRole("checkbox", { name: /Diagnóstico/ })).not.toBeInTheDocument();
  });

  it("accepts all optional categories and persists the proof", async () => {
    renderConsent();

    fireEvent.click(await screen.findByRole("button", { name: "Aceitar tudo" }));

    await waitFor(() =>
      expect(
        screen.queryByRole("heading", { name: "Valorizamos a sua privacidade" }),
      ).not.toBeInTheDocument(),
    );
    expect(readConsent()?.categories).toEqual({ externalMedia: true });
  });

  it("rejects all optional categories as directly as accepting", async () => {
    renderConsent();

    fireEvent.click(await screen.findByRole("button", { name: "Rejeitar" }));

    expect(readConsent()?.categories).toEqual({ externalMedia: false });
  });

  it("stores a partial category choice", async () => {
    renderConsent();

    fireEvent.click(await screen.findByRole("button", { name: "Personalizar" }));
    fireEvent.click(screen.getByRole("checkbox", { name: /Conteúdo externo/ }));
    fireEvent.click(screen.getByRole("button", { name: "Guardar escolhas" }));

    expect(readConsent()?.categories).toEqual({ externalMedia: true });
  });

  it("removes the embedded map immediately after revocation", async () => {
    writeConsent({ externalMedia: true });
    renderConsent(true);

    expect(await screen.findByTitle("Mapa da Móveis Machado em Odivelas")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Gerir teste" }));
    fireEvent.click(screen.getByRole("button", { name: "Rejeitar" }));

    expect(screen.queryByTitle("Mapa da Móveis Machado em Odivelas")).not.toBeInTheDocument();
    expect(screen.getByTestId("map-placeholder")).toBeVisible();
  });

  it("treats an older policy version as a new visit", () => {
    const oldRecord = {
      ...createConsentRecord({ externalMedia: true }),
      version: "2025-01",
    };
    window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(oldRecord));

    expect(readConsent()).toBeNull();
  });

  it("expires a valid choice after six months", () => {
    const record = createConsentRecord({ externalMedia: true }, "2026-01-01T00:00:00.000Z");

    expect(
      parseConsentRecord(JSON.stringify(record), Date.parse("2026-08-01T00:00:00.000Z")),
    ).toBeNull();
  });

  it("stores the current policy version", () => {
    writeConsent({ externalMedia: false });

    expect(readConsent()?.version).toBe(CONSENT_POLICY_VERSION);
  });
});
