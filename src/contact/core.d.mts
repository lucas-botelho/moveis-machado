export function validateContact(
  data: unknown,
): {
  name: string;
  email: string;
  phone: string;
  type: string;
  message: string;
  locale: string;
} | null;
export function sendContact(
  request: Request,
  config: {
    enabled: boolean;
    apiKey?: string;
    from?: string;
    to?: string;
    turnstileSecret?: string;
  },
  fetcher?: typeof fetch,
): Promise<Response>;
