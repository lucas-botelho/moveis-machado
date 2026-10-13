# Entregar a fundação técnica de SEO da issue #1

Este ExecPlan é um documento vivo. Manter `Progress`, `Surprises & Discoveries`, `Decision Log` e `Outcomes & Retrospective` atualizados durante o trabalho.

Não foi encontrado um `PLANS.md` aplicável. Este plano segue `AGENTS.md`, em particular a preservação do parâmetro de pesquisa `lang`, a centralização da cópia bilingue e a proibição de reescrever histórico publicado ligado ao Lovable.

## Purpose / Big Picture

Depois desta alteração, cada página pública terá uma versão canónica portuguesa e inglesa identificável no HTML inicial, os motores de pesquisa receberão um sitemap e regras de rastreamento coerentes e a rota histórica `/pt` deixará de competir com a homepage. Uma pessoa poderá confirmar o resultado abrindo o HTML renderizado de qualquer rota, consultando `/sitemap.xml` e `/robots.txt` e pedindo um URL inexistente, que deverá responder com 404.

O requisito aprovado é a issue GitHub #1, https://github.com/lucas-botelho/moveis-machado/issues/1. O pedido do utilizador autoriza implementação contínua, um branch por issue, validação, PR e integração segura.

## Progress

- [x] (2026-10-13 19:45 WEST) Confirmar issue, comentários, ausência de PR associado, instruções do repositório e baseline local.
- [x] (2026-10-13 19:45 WEST) Criar `codex/issue-1-seo-foundation` a partir de `origin/main` sem reescrever histórico.
- [x] (2026-10-13 19:49 WEST) Implementar a fonte única de URLs SEO e os metadados canonical/hreflang por rota e idioma.
- [x] (2026-10-13 19:50 WEST) Resolver `/pt`, gerar sitemap/robots e confirmar estado 404 real.
- [x] (2026-10-13 19:50 WEST) Adicionar testes de canonical, hreflang, sitemap, idioma e routing.
- [x] (2026-10-13 19:51 WEST) Executar testes, lint e build; fazer QA do HTML/HTTP produzido.
- [ ] (2026-10-13 19:56 WEST) Plano, issue e PR atualizados; CI #36 passou. Integração aguarda autorização porque o merge inicia deployment automático em GitHub Pages.

## Surprises & Discoveries

- O baseline tem 4 testes aprovados e lint sem erros, mas com 7 avisos preexistentes de Fast Refresh.
- O build dentro da sandbox falha com `EPERM` ao resolver ficheiros em `node_modules`, incluindo o binário Tailwind. A falha é ambiental e antecede alterações; a validação final deve repetir o build fora da sandbox com autorização.
- A rota `/pt` é atualmente prerenderizada e duplica a homepage, enquanto as variantes de idioma usam `?lang=pt|en`.
- O prerender estático segue o redirecionamento de `/pt` e grava uma cópia da homepage no caminho legado. Essa cópia contém canonical para `/?lang=pt` e não entra no sitemap; no runtime SSR, o wrapper devolve 308 antes do router.
- Um URL inexistente sem `lang` é primeiro normalizado pelo router com 307 para `?lang=pt`; o URL normalizado devolve 404 real. Esta normalização é comportamento preexistente do search validator.
- O primeiro CI do PR falhou ao prerenderizar `/moveis-machado/pt`: o redirecionamento removia também a barra final do base path e o destino `/moveis-machado?lang=pt` devolvia 404. A recuperação preserva agora `/moveis-machado/?lang=pt` e fica coberta por teste.

## Decision Log

    Decision: manter `?lang=pt|en` como identidade das variantes linguísticas (aprovada pelo requisito de arquitetura do repositório).
    Rationale: `AGENTS.md` exige que o idioma seja controlado pelo parâmetro `lang` e preservado nos links internos.
    Date/Author: 2026-10-13 / Codex

    Decision: usar uma origem de produção configurável por `VITE_SITE_URL`, com o URL Lovable publicado no README como fallback técnico (assumida).
    Rationale: canonicals, alternates, sitemap e robots precisam de URLs absolutos, mas o repositório não contém um domínio personalizado confirmado. Uma única configuração evita valores divergentes e permite substituir o fallback no deploy.
    Date/Author: 2026-10-13 / Codex

    Decision: gerar `sitemap.xml` e `robots.txt` a partir das mesmas funções puras usadas pelos testes, integradas no Vite para build e desenvolvimento (assumida).
    Rationale: evita manter listas e origens duplicadas e permite validar o XML sem depender de rede externa.
    Date/Author: 2026-10-13 / Codex

## Outcomes & Retrospective

A fundação técnica está implementada e validada localmente e em CI. Canonicals e alternates são emitidos no HTML SSR para PT e EN, parâmetros irrelevantes são excluídos do canonical, sitemap e robots existem tanto como assets de build como respostas SSR, `/pt` devolve 308 no runtime e a página desconhecida normalizada devolve 404. O PR #8 está aberto, sem conflitos, sem reviews ou threads pendentes e com CI aprovado. Resta autorização para integrar, pois o workflow de `main` publica automaticamente no GitHub Pages.

## Context and Orientation

`src/routes/__root.tsx` define metadados globais, o elemento `<html>` e a página de 404. As rotas de conteúdo em `src/routes/index.tsx`, `services.tsx`, `projects.tsx`, `about.tsx` e `contact.tsx` chamam `pageMeta` de `src/lib/site-content.ts` para títulos e descrições. `src/routes/pt.tsx` volta a renderizar a homepage. `src/components/site.tsx` preserva `lang` nos links.

`vite.config.ts` configura o base path de GitHub Pages e prerenderiza seis rotas. `public/robots.txt` permite todos os crawlers, mas não aponta para sitemap. `src/router.tsx` cria o router e `src/server.ts` envolve a entrada SSR. Os testes atuais vivem em `src/test` e usam Vitest.

“Canonical” é o URL preferido de uma página entre variantes duplicadas. `hreflang` são links alternativos recíprocos que associam o conteúdo PT-PT e EN. O sitemap lista apenas URLs públicas que devem responder com 200; `/pt` não deve constar porque é uma duplicação histórica.

## Plan of Work

### Milestone 1: uma fonte única de URLs e metadados SEO

Criar `src/lib/seo.ts` com a lista tipada das rotas públicas, normalização da origem e funções para construir URLs canónicos e alternates. A função deverá descartar parâmetros irrelevantes e produzir sempre `?lang=pt` ou `?lang=en`. Alterar `pageMeta` para receber o caminho e idioma e devolver canonical, alternates `pt-PT`, `en` e `x-default`, além dos metadados existentes. Atualizar cada rota para passar o próprio caminho e `match.search.lang`. O sucesso será demonstrado por testes unitários que comparam URLs exatos e por HTML SSR contendo os links.

### Milestone 2: sitemap, robots e eliminação da duplicação `/pt`

Adicionar ao mesmo módulo funções puras para gerar sitemap XML e robots text. Integrar um pequeno plugin em `vite.config.ts` que sirva estes recursos no desenvolvimento e os emita no build a partir de `VITE_SITE_URL`; retirar o `public/robots.txt` estático para não haver duas fontes. Alterar `src/routes/pt.tsx` para redirecionar permanentemente para `/?lang=pt` quando executado pelo servidor/router e excluí-lo da lista de prerender/sitemap. Confirmar que a configuração do framework mantém 404 para rotas desconhecidas; se o teste HTTP revelar 200, ajustar o wrapper do servidor sem transformar erros válidos em 500.

### Milestone 3: validação automatizada e HTTP

Adicionar testes em `src/test/seo.test.ts` e ampliar `src/test/app-routing.test.tsx` para canonical/hreflang, XML, robots, idioma, redirect e routing desconhecido. Executar `bun test` e `bun run lint`. Executar `bun run build` fora da sandbox se o `EPERM` persistir. Iniciar o artefacto produzido ou o servidor local, pedir PT, EN, sitemap, robots, `/pt` e uma rota inexistente e guardar estados/cabeçalhos/excertos reais neste plano.

No fim, reconciliar todos os critérios da issue com evidência. Fazer commit no branch, publicar o branch, abrir PR com `Fixes #1`, anexá-lo ao chat, aguardar/verificar checks e integrar apenas se não existirem conflitos, gates pendentes ou efeitos externos não autorizados.

## Concrete Steps

Executar a partir de `E:\Dev\Projects\moveis-machado`:

    bun test
    bun run lint
    bun run build

Depois do build, iniciar o comando de preview suportado pelo projeto e verificar os recursos com pedidos HTTP locais:

    bun run preview

Os pedidos esperados são `/contact?lang=pt`, `/contact?lang=en`, `/sitemap.xml`, `/robots.txt`, `/pt` e `/nao-existe`. Os primeiros quatro devem responder com conteúdo coerente; `/pt` deve redirecionar permanentemente para a homepage PT e `/nao-existe` deve responder 404.

As operações Git serão não interativas e limitadas ao branch desta issue. Não usar force push, rebase, amend ou squash de commits já publicados.

## Validation and Acceptance

Os testes unitários devem provar que cada rota pública gera um canonical absoluto com um único `lang`, três alternates recíprocos e um sitemap sem `/pt` nem duplicados. O teste de robots deve provar que todos os crawlers são permitidos e que existe uma diretiva `Sitemap:` absoluta para a mesma origem.

O HTML inicial de pelo menos uma rota em PT e EN deve conter title, description, canonical e os três alternates antes de qualquer JavaScript do browser. Um URL com parâmetros não reconhecidos deve manter o mesmo canonical que a variante linguística equivalente. O pedido a `/pt` deve devolver 301 ou 308 com destino PT. A rota inexistente deve devolver 404. `bun test`, `bun run lint` e `bun run build` devem terminar sem erros; os 7 avisos de lint preexistentes podem permanecer, mas qualquer aviso novo deve ser resolvido.

## Idempotence and Recovery

As funções SEO e os geradores serão determinísticos e podem ser executados repetidamente. A emissão Vite substitui apenas os artefactos de build correspondentes, sem editar ficheiros fonte durante o build. Se a geração falhar, os testes puros devem identificar a origem antes do deploy.

Se o branch ficar parcialmente implementado, retomar a partir de `Progress` e `git diff`; não restaurar ficheiros do utilizador nem usar comandos destrutivos. Se o redirecionamento `/pt` não for compatível com prerender estático, manter a rota fora do sitemap, emitir canonical/noindex como fallback e registar a limitação na issue em vez de afirmar um 308 inexistente.

## Artifacts and Notes

Evidência observada:

    bun test: 4 pass, 0 fail
    bun run lint: 0 erros, 7 avisos preexistentes de react-refresh/only-export-components
    bun run build (sandbox): falha EPERM em realpath de node_modules
    bun test final: 9 pass, 0 fail, 20 assertions
    bunx tsc --noEmit: sucesso, sem diagnósticos
    bun run lint final: 0 erros, os mesmos 7 avisos preexistentes
    bun run build final fora da sandbox: sucesso; 1922 módulos client e 81 módulos SSR transformados
    PAGES_BASE_PATH=/moveis-machado bun run build: sucesso após correção; 11 páginas prerenderizadas
    GET /contact?lang=pt: 200, html lang pt-PT, canonical PT e hreflang
    GET /contact?lang=en: 200, html lang en, canonical EN e hreflang
    GET /contact?lang=pt&utm_source=test: 200, canonical sem parâmetro irrelevante
    GET /robots.txt: 200 text/plain
    GET /sitemap.xml: 200 application/xml
    GET /pt: 308 para https://example.com/?lang=pt
    GET /nao-existe?lang=pt: 404 text/html
    GitHub Actions Validate Lovable app #36: success

O sitemap final tem 10 entradas (`5 rotas x 2 idiomas`) e 30 links alternativos (`3 por entrada`), sem `/pt`.

## Interfaces and Dependencies

`src/lib/seo.ts` deverá exportar a origem normalizada, a lista de caminhos públicos, um construtor de URLs por idioma, os links de head e os geradores de sitemap/robots. Os tipos devem reutilizar `Language` de `src/lib/site-content.ts` sem criar dependência circular; se necessário, mover apenas o tipo e `resolveLanguage` para o módulo SEO ou manter `seo.ts` dependente de `site-content.ts` e fazer `site-content.ts` receber os links por uma função sem importar de volta.

`pageMeta` passará a aceitar caminho e idioma além de título e descrição. As rotas são os consumidores diretos. O plugin Vite usará apenas APIs do próprio Vite já instalado; não será adicionada uma dependência externa.

## Revision Notes

2026-10-13: plano inicial criado após inspeção da issue, arquitetura, testes, configuração de build e comportamento baseline. Registado o bloqueio `EPERM` da sandbox para não o confundir com regressão da implementação.

2026-10-13: atualizado após implementação e QA. Registados o comportamento distinto de `/pt` em prerender e SSR, a normalização 307 dos URLs sem `lang` e toda a evidência final disponível antes do PR.

2026-10-13: revisto após o primeiro CI do PR. Corrigido o destino do redirect quando existe `PAGES_BASE_PATH` e acrescentada validação local com o mesmo ambiente do workflow.
