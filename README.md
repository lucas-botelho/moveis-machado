# Móveis Machado

Website da Móveis Machado, fabricante de cozinhas, roupeiros e móveis por medida com oficina própria em Odivelas (Grande Lisboa). Bilingue em português europeu e inglês.

## Stack

- React 19, TanStack Router/Start e Vite, com pré-renderização estática de todas as páginas.
- Tailwind CSS 4 e estilos próprios em `src/styles.css`.
- Publicado no GitHub Pages pelo workflow `.github/workflows/ci.yml` a cada push para `main`.

## Desenvolvimento

Requer [Bun](https://bun.sh).

```sh
bun install
bun run dev      # servidor local em http://localhost:8080
bun run build    # build estático em dist/client
bun run test
bun run lint
```

## Conteúdo e SEO

- Todo o texto (PT e EN) está em `src/lib/site-content.ts`; o idioma é escolhido pelo parâmetro `?lang=pt|en`.
- Metadados, canonical, hreflang, sitemap e robots são gerados a partir de `src/lib/seo.ts`, `src/lib/seo-shared.ts` e `build/seo-files.ts`.
- O domínio de produção é **https://armandomachado.pt**. No CI, a variável de repositório `SITE_URL` liga o domínio (e remove o prefixo `/moveis-machado`); sem ela, o build usa o endereço do GitHub Pages. Ver comentários em `.github/workflows/ci.yml` e `.env.example`.
- A variável de repositório `GOOGLE_SITE_VERIFICATION` só é necessária se o Search Console for verificado por etiqueta HTML em vez de DNS.

## Regras do projeto

Ver `AGENTS.md` e `PRODUCT.md`: só factos confirmados pela empresa, fotografias reais distinguidas de renders 3D e imagens de inspiração.
