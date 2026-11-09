## Git

- Avoid rewriting published git history (force pushing, or rebasing/amending/squashing commits that are already pushed), and keep the `main` branch deployable: pushes to `main` publish the site.

## Website architecture

- Use shared site chrome and presentation sections in `src/components/site.tsx` with separate content routes, so all pages share the brand identity without duplicating navigation.
- Keep European Portuguese and English copy together in `src/lib/site-content.ts`; language is controlled by the root `lang` search parameter and preserved in internal links, so language selection works across pages without browser-only persistence.
- Distinguish generated inspirational imagery from real portfolio photographs; project entries use photographs from the original brand site, so generated imagery is never presented as completed work.
