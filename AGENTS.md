<!-- LOVABLE:BEGIN -->

> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.

<!-- LOVABLE:END -->

## Website architecture

- Use shared site chrome and presentation sections in `src/components/site.tsx` with separate content routes, so all pages share the brand identity without duplicating navigation.
- Keep European Portuguese and English copy together in `src/lib/site-content.ts`; language is controlled by the root `lang` search parameter and preserved in internal links, so language selection works across pages without browser-only persistence.
- Distinguish generated inspirational imagery from real portfolio photographs; project entries use photographs from the original brand site, so generated imagery is never presented as completed work.
