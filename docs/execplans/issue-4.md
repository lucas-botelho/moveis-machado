# Medir e corrigir o desempenho do site

Este ExecPlan é um documento vivo. Manter `Progress`, `Surprises & Discoveries`, `Decision Log` e `Outcomes & Retrospective` atualizados.

Não foi encontrado um `PLANS.md` aplicável. Aplicam-se as regras de `AGENTS.md`: manter PT-PT e EN em `src/lib/site-content.ts`, preservar `lang`, chrome partilhado e identidade visual, e distinguir imagens de inspiração de fotografias de projetos.

## Purpose / Big Picture

Melhorar o carregamento e estabilidade do site em telemóveis e desktop sem sacrificar a identidade visual ou carregar mais recursos do que os necessários. A prova será uma comparação repetível dos principais indicadores e recursos, antes e depois, nas rotas públicas de início, serviços, projetos e contactos.

A issue GitHub #4 define o âmbito, incluindo baseline, LCP/CLS, fontes, imagens, JavaScript, validação de navegação e Search Console: https://github.com/lucas-botelho/moveis-machado/issues/4. Esta primeira fase trabalha nos pontos independentes da gestão de consentimento. A remoção do mapa antes de consentimento pertence à issue #7 e não será resolvida por um bypass paralelo.

## Progress

- [x] (2026-10-14 11:10 WEST) Confirmar issue #4, comentários e ausência de PR existente; verificar base e workflow do projeto.
- [x] (2026-10-14 11:10 WEST) Inspecionar LCP, imagens, fontes, mapa, CSS e bundle atualmente gerado em `origin/main`.
- [x] (2026-10-14 11:32 WEST) Executar baseline Lighthouse mobile/desktop (2 passagens por combinação) nas quatro rotas e guardar resumo reproduzível.
- [x] (2026-10-14 11:34 WEST) Remover animações iniciais do hero/page headings; priorizar só a primeira imagem em Projetos; self-host Manrope/Cormorant e incluir licenças OFL.
- [x] (2026-10-14 11:34 WEST) Repetir Lighthouse em localhost, comparar CLS/LCP/bytes, confirmar ausência de pedidos Google Fonts e documentar limitações de comparabilidade.
- [x] (2026-10-14 11:34 WEST) Executar typecheck, testes, lint dirigido, Prettier, builds normal e GitHub Pages; registar falha preexistente do lint global neste checkout Windows.
- [x] (2026-10-14 11:38 WEST) Abrir PR draft #12 para este trabalho parcial e atualizar a issue #4 com âmbito, validação e gates restantes.
- [x] (2026-10-14 11:44 WEST) Inspecionar o HTML e os ficheiros de descoberta do build Pages; confirmar divergência entre o host publicado e o domínio canonical predefinido.
- [x] (2026-10-14 11:46 WEST) Confirmar que o build Pages não emite `404.html`; a página React existente não cobre pedidos de ficheiros/rotas inexistentes no host estático.
- [x] (2026-10-14 11:53 WEST) Corrigir o domínio predefinido de canonical/og:url/sitemap para o URL Pages atual e acrescentar testes de regressão.
- [x] (2026-10-14 11:53 WEST) Criar fallback estático `404.html` bilingue, acessível e responsivo, respeitando `PAGES_BASE_PATH` e `?lang=`; cobrir o build no CI.
- [x] (2026-10-14 11:53 WEST) Revalidar links internos, headings, alt, 404, canonical, robots e sitemap no build Pages; typecheck, 11 testes, lint dirigido e Prettier passaram.
- [x] (2026-10-14 11:56 WEST) Atualizar PR #12 e issue #4; GitHub Actions “Validate Lovable app” run #57 passou para o head atualizado `e93cf59` (além do run #55 no commit `f3816a7`).
- [ ] Integrar após revisão/checks; voltar depois da issue #7 para consentimento/mapa e após acesso do proprietário para Search Console.
- [ ] Depois da issue #7, medir novamente a interação entre consentimento, mapa e layout; obter acesso do proprietário ao Search Console para submissão do sitemap ou registar bloqueio.

Concluído nesta paragem: baseline publicado duplicado, otimizações independentes de consentimento, matriz Lighthouse repetida em localhost, canonical/og/sitemap para a origem Pages atual, fallback 404 localizado e auditoria estática Pages; PR #12 e issue #4 atualizados e runs #55/#57 passaram. Pendente: revisão/integração, confirmação do domínio final, integrar #7 para o mapa e receber acesso do proprietário ao Search Console.

## Surprises & Discoveries

- A imagem LCP da homepage já tem `width=1920`, `height=1088` e `fetchPriority="high"`; é o `interior-hero.jpg` original (1920×1088, 295 368 bytes). A estratégia deve medir a contribuição real antes de alterar esse recurso.
- Imagens de projetos já usam `loading="lazy"` e dimensões, a imagem de processo também é lazy, e o estudo de materiais (1536×1024) é lazy. O CSS reserva proporções para imagens de projeto e mapa. Não foi confirmado se as dimensões HTML declaradas nas fotografias de projetos coincidem com os ficheiros WebP.
- O root pedia Google Fonts em todas as rotas. Os pacotes Fontsource 5.3.0 agora servem as variantes variáveis same-origin; as licenças OFL estão em `public/licenses/`.
- Descoberta nova: o build com `PAGES_BASE_PATH=/moveis-machado` emitia canonical, `og:url`, sitemap e robots para `artisan-ambiance-hub.lovable.app`, porque `DEFAULT_SITE_URL` não estava configurado no workflow. O README identifica `https://lucas-botelho.github.io/moveis-machado/` como página atual e o workflow publica no GitHub Pages com a base `/moveis-machado`. A URL predefinida deve refletir essa origem; um domínio personalizado futuro continua dependente de confirmação do responsável.
- Descoberta nova: não existe `dist/client/404.html`; o `notFoundComponent` do router só é mostrado quando a aplicação recebe o pedido, mas GitHub Pages responde diretamente a rotas inexistentes. É necessário um documento estático de fallback no root do artefacto publicado, com recuperação para a homepage e seleção de idioma.
- O `404.html` emitido partilha a cópia PT/EN com o fallback do router, contém um único H1, `noindex, follow`, seletor de idioma e links base-path-aware. O CI agora verifica a presença desse artefacto.
- A abertura do preview local no browser in-app expirou com `ERR_CONNECTION_TIMED_OUT`; não foi possível verificar screenshot no browser. O CSS/HTML gerados e a auditoria estática confirmam apresentação responsiva, foco visível e conteúdo localizado.
- O build anterior reportou um bundle de cliente `index` com 396,79 kB (126,91 kB gzip), mas essa medição pertence ao commit/base dessa execução, não é um baseline de rede de Lighthouse. A composição deve ser analisada antes de propor code splitting ou remoção de dependências.
- Lighthouse CLI 13.5.0 com Chrome Headless 155 completou duas passagens em cada combinação. No mobile, LCP mediano foi 4,83 s na homepage, 2,96 s em Projetos, 2,96 s em Serviços e 5,82 s em Contactos. Desktop ficou entre 0,51 e 1,00 s. TBT foi baixo (0–18 ms), mas não é INP nem Core Web Vitals de utilizadores reais.
- A auditoria mostrou `element render delay` de cerca de 1,87 s para a imagem LCP da homepage, 2,08 s para o H1 de Serviços, e 2,08 s para o H1 de Contactos; todos aparecem sob elementos `.entrance` com animação inicial de opacidade/posição. Em Projetos, a primeira fotografia tem aproximadamente 1,07 s de atraso de carregamento do recurso porque a galeria aplica `loading="lazy"` a todos os itens.
- As páginas transferem entre 570 e 972 KiB por navegação no mobile (inclui fontes Google globais). Pontuação e CLS baseline por rota estão no artefacto `docs/performance/issue-4.md`.
- O pós-teste em localhost não é comparação direta ao baseline do GitHub Pages: origem/RTT/cache/servidor diferem. No mobile, score/LCP/CLS/FCP medianos foram início 77/5301 ms/0,016/2584 ms, serviços 96/2487 ms/0/2112 ms, projetos 91/3201 ms/0/2114 ms, contactos 98/1963 ms/0/2113 ms. Métricas completas e limitações constam de `docs/performance/issue-4.md`; não se declara ganho consistente de LCP para início/projetos.
- O build cliente manteve 396,68 kB (126,84 kB gzip), praticamente igual ao chunk anterior (396,79 kB/126,91 kB). Scores desktop pós-build foram 99–100 e CLS máximo 0,016. O HTML de Projetos confirma `loading="eager"`/`fetchpriority="high"` na primeira foto.
- `bun run lint` reportou 491 erros de Prettier por CRLF em ficheiros não alterados. `bunx eslint` dirigido aos ficheiros alterados passou sem erros; testes (11/11), typecheck, Prettier dirigido e build Pages passaram.
- O carregamento do mapa em Contactos está lazy e tem proporção 16:9, mas começa sem escolha explícita do utilizador. A correção de consentimento é dependência da issue #7 e fica pendente neste PR parcial.

## Decision Log

    Decision: remover a animação inicial apenas dos conteúdos acima da dobra identificados como LCP, e carregar de forma eager/high apenas a primeira imagem da rota Projetos.
    Rationale: as capturas identificam render-delay induzido por .entrance e resource-delay na primeira fotografia lazy; manter o preview da homepage diferido.
    Date/Author: 2026-10-14 / Codex (opção técnica assumida)

    Decision: self-host Manrope e Cormorant Garamond com pacotes Fontsource oficiais e CSS variável.
    Rationale: elimina a stylesheet e os pedidos a Google Fonts em todas as rotas, mantém as famílias e pesos usados; suporta ainda a futura decisão de consentimento (#7).
    Date/Author: 2026-10-14 / Codex (opção técnica assumida; licença OFL-1.1 verificada)

    Decision: limitar esta branch às otimizações independentes de consentimento; manter carregamento do mapa sob a issue #7.
    Rationale: a issue #4 depende da decisão de consentimento para o mapa e a issue #7 exige gestão central de consentimento com política correspondente.
    Date/Author: 2026-10-14 / Codex (âmbito parcial, sem aprovação de publicação)

    Decision: usar `https://lucas-botelho.github.io/moveis-machado/` para o baseline inicial, porque o README identifica esse domínio como página atual e o workflow valida/publica GitHub Pages; confirmar se é também a origem final de produção antes da aceitação.
    Rationale: o endereço é reproduzível e coincide com a configuração GitHub Pages existente, mas não prova que seja o domínio canónico da marca.
    Date/Author: 2026-10-14 / Codex (pressuposto explícito)

    Decision: alinhar o domínio predefinido de SEO com `https://lucas-botelho.github.io/moveis-machado`, preservando `VITE_SITE_URL` como override para eventual domínio personalizado confirmado.
    Rationale: o workflow publica em GitHub Pages, mas canonical/og/sitemap estavam a apontar para o host de preview Lovable. README e workflow comprovam a URL Pages atual, não comprovam que ela deva substituir um domínio comercial futuro.
    Date/Author: 2026-10-14 / Codex (opção técnica assumida; domínio comercial continua pendente)

    Decision: gerar `404.html` no plugin de ficheiros SEO, usando conteúdo PT/EN centralizado e links com o prefixo de deployment e a query de idioma.
    Rationale: o router não recebe os pedidos de rotas inexistentes servidas pelo GitHub Pages; o fallback estático tem de existir no diretório raiz do artefacto e suportar navegação sem depender do React.
    Date/Author: 2026-10-14 / Codex (opção técnica dentro da issue #4)

## Outcomes & Retrospective

A inspeção confirmou que o hero já tem prioridade/dimensões, mas animação inicial começava com conteúdo invisível; a primeira foto em Projetos estava lazy apesar de ser LCP e Google Fonts era global. As alterações removem essas animações do topo, dão prioridade à primeira foto apenas na rota Projetos, self-host as duas famílias e distribuem as licenças. A auditoria posterior revelou canonical/og/sitemap no host Lovable e ausência de fallback estático 404; ambos foram corrigidos. Build Pages prerenderizou 11 páginas e a inspeção estática verificou links internos, headings, alt, canonical, robots, sitemap e 404; a verificação visual no browser ficou indisponível por timeout do preview local. Baseline publicado e pós-teste local foram registados, sem alegar comparação estritamente equivalente. Testes (11/11), typecheck, lint dirigido e build passaram. O lint global permanece com CRLF incompatível em ficheiros não tocados do checkout Windows. A issue continua incompleta: domínio personalizado, PR/review/CI/integração, mapa/consentimento (#7) e Search Console pelo proprietário estão pendentes.

## Context and Orientation

`src/components/site.tsx` contém `Hero`, `ProjectGrid`, `Story`, `Process` e `ContactBand`. `Hero` renderiza `interior-hero.jpg` com dimensões e `fetchPriority="high"`. `ProjectGrid` e `Process` usam fotografias WebP com `loading="lazy"`. `Story` usa `material-study.jpg` com dimensões e lazy loading. `ContactBand` repete o hero abaixo da dobra, também lazy. As páginas são `src/routes/index.tsx`, `services.tsx`, `projects.tsx` e `contact.tsx`.

`src/routes/__root.tsx` adiciona a stylesheet Google Fonts global. Os tokens tipográficos em `src/styles.css` usam Manrope no corpo e Cormorant Garamond nos títulos. Contactos incorpora mapa Google em `src/routes/contact.tsx`, com `loading="lazy"` e uma regra CSS 16:9 em `src/styles.css`. A issue #7 deverá controlar esse carregamento após o utilizador escolher consentimento.

Os comandos do projeto são `bun run build`, `bun run lint` e `bun run test`, conforme `package.json`; não há Lighthouse no `package.json`. O README referencia a página GitHub Pages, e `.github/workflows/ci.yml` só publica quando a branch é `main`. Os resultados Lighthouse são medições de laboratório: comparar a mesma ferramenta/versão, localização e configuração, e não apresentá-los como dados de utilizadores reais.

## Plan of Work

### Milestone 1: baseline reproduzível — concluído

Executado Lighthouse CLI 13.5.0 com Chrome Headless 155, duas passagens por rota/dispositivo, no GitHub Pages indicado no README. Métricas medianas e limitações estão em `docs/performance/issue-4.md`; os JSONs completos permanecem temporariamente em `.tmp/issue-4-perf` e não devem ser versionados.

### Milestone 2: otimizar gargalos comprovados — concluído nesta fase independente

Em `src/components/site.tsx`, retirar `entrance` do hero/page headings cujo conteúdo visível começava invisível e adicionar `priorityFirstImage` para `eager/high` só na rota dedicada de Projetos; o preview da homepage continua lazy. Em `src/routes/__root.tsx`, remover Google Fonts remoto e importar Fontsource normal e itálico. `src/styles.css` mantém as famílias visuais com os novos nomes CSS; `public/licenses/` distribui os textos OFL. O hero continua descoberto no HTML e `fetchPriority="high"`; não adicionar preload. Preservar etiqueta de inspiração e fotos reais. Mapa permanece fora desta branch até consentimento da issue #7.

### Milestone 3: provar alterações e registar regressões/limitações

Repetir as mesmas medições e comparar cada rota/dispositivo; verificar LCP e estabilidade, requisições externas e bytes, carregar fontes sem flash/CLS e confirmar dimensões reservadas em mapas/imagens. Executar typecheck, testes, lint, build e build com `PAGES_BASE_PATH=/moveis-machado`. Documentar resultados reais e limitações. Search Console exige acesso do proprietário; nunca submeter sitemap com credenciais ou propriedade presumidas.

### Milestone 4: alinhar SEO técnico à origem Pages atual e cobrir o fallback 404

O build local com `PAGES_BASE_PATH=/moveis-machado` mostrou `canonical` e `og:url` em `https://artisan-ambiance-hub.lovable.app/...`; `build/seo-files.ts` também deriva sitemap/robots dessa origem. `README.md` referencia a página atual como `https://lucas-botelho.github.io/moveis-machado/`, e `.github/workflows/ci.yml` faz deploy pelo workflow Pages com a base `/moveis-machado`. Alterar `DEFAULT_SITE_URL` em `src/lib/seo-shared.ts` para esse host/base e testar explicitamente canonical e discovery files. Manter `VITE_SITE_URL` como override quando um domínio comercial for confirmado; não concluir issue #3 nem alegar que o domínio de marca foi confirmado. Emitir ainda um `404.html` autónomo via `build/seo-files.ts`, com cópia em `src/lib/site-content.ts`, idioma derivado de `?lang=`, link de regresso localizado e caminhos corretos no deployment base. Acrescentar testes unitários e uma asserção de artefacto no workflow; verificar visual/responsividade e links no resultado Pages.

## Concrete Steps

Diretório de trabalho: `E:\Dev\Projects\moveis-machado`.

O Lighthouse CLI deverá ser executado primeiro com `bunx lighthouse --version` para confirmar suporte local e versão. Para cada rota mobile, por exemplo:

    bunx lighthouse "https://lucas-botelho.github.io/moveis-machado/" --output=json --output-path=".tmp/issue-4-home-mobile.json" --quiet --chrome-flags="--headless"

Para desktop, usar o mesmo comando com `--preset=desktop` e um caminho `desktop` distinto. Repetir nas quatro rotas, acrescentando `?lang=pt` se necessário para fixar o idioma. Manter relatórios JSON em `.tmp` fora do commit e guardar apenas métricas resumidas em `docs/performance/issue-4.md`.

Depois das alterações, executar:

    bunx tsc --noEmit
    bun run test
    bun run lint
    bun run build
    $env:PAGES_BASE_PATH='/moveis-machado'; bun run build

    Lighthouse documenta `--preset=desktop`, formatos JSON e `--output-path` no README oficial do projeto GoogleChrome/Lighthouse. As capturas baseline foram executadas em 2026-10-14; repetir os comandos com os mesmos parâmetros após build local. Não versionar dumps completos.

## Validation and Acceptance

O baseline e o pós-teste local contêm uma linha por rota/dispositivo, versão Lighthouse/Chrome, duas execuções, LCP, CLS, TBT, FCP, score e bytes. A identificação LCP e pedidos relevantes estão documentados. A captura final é localhost, não produção, e serve como verificação local, não como comparação quantitativa isolada; a comparação equivalente requer preview HTTPS da branch.

As alterações removem pedidos externos de Google Fonts, preservam família/pesos e licenças, mantêm o hero high/eager e só retiram lazy à primeira foto da rota Projetos. Restantes imagens mantêm lazy/dimensões. O mapa e consentimento ainda dependem de #7. Testes, typecheck, lint dirigido e builds passam; lint global precisa de execução num checkout/runner com line endings compatíveis ou correção independente de config base.

## Idempotence and Recovery

Lighthouse é leitura; repetir pode variar por cache/CDN, rede e carga do host. Registar contexto e usar a mesma versão/configuração, sem remover o outlier manualmente sem documentar. Guardar relatórios temporários fora do controlo de versão. Para comparar otimizações, reverter só o diff da branch se métricas ou inspeção visual revelarem regressão; preservar as imagens originais até os novos assets e os seus usos estarem validados.

Se o domínio publicado estiver indisponível, não trocar silenciosamente para a preview Lovable; usar um build local apenas como teste separado e indicar que não representa a produção. Não alterar propriedade/domínio ou Search Console sem acesso e autorização do proprietário.

## Artifacts and Notes

Evidência de código observada antes da edição:

    interior-hero.jpg: 1920×1088, 295 368 bytes; hero usa width/height e fetchPriority=high.
    material-study.jpg: 1536×1024, 250 774 bytes; lazy loading e dimensões explícitas.
    project webp assets: 60 458, 60 076 e 76 036 bytes; imagens do grid lazy com 1600×1200 declarado.
    build anterior: chunk index-DFlkh9jm.js 396,79 kB, gzip 126,91 kB.
    Build desta branch: chunk client index-DgSXE2Pw.js 396,68 kB, gzip 126,84 kB; build com `PAGES_BASE_PATH=/moveis-machado` prerenderizou 11 páginas.
    PageSpeed Insights API: HTTP 429, quota diária zero.
    Baseline Lighthouse duas passagens (LCP / CLS / TBT / FCP / bytes / score): home mobile 4831 ms / 0,008 / 18 ms / 3218 ms / 972 KiB / 75; home desktop 997 ms / 0,001 / 0 ms / 863 ms / 973 KiB / 98; services mobile 2959 ms / 0 / 5 ms / 2910 ms / 571 KiB / 87; services desktop 508 ms / 0,002 / 0 ms / 508 ms / 571 KiB / 100; projects mobile 2963 ms / 0 / 0 ms / 2963 ms / 688 KiB / 87; projects desktop 917 ms / 0,002 / 0 ms / 505 ms / 688 KiB / 99; contact mobile 5819 ms / 0 / 5 ms / 3926 ms / 660 KiB / 68; contact desktop 526 ms / 0,008 / 0 ms / 526 ms / 858 KiB / 100.

Fonte primária de uso CLI: https://github.com/GoogleChrome/lighthouse/blob/main/readme.md.

## Interfaces and Dependencies

Não estão previstas novas interfaces de produto. Fontes Fontsource são servidas como ficheiros estáticos, referenciadas por CSS de unicode-range nos pacotes `@fontsource-variable/cormorant-garamond` e `@fontsource-variable/manrope`; as respetivas licenças OFL são copiadas em `public/licenses/`. Não foi provada necessidade de code splitting ou alteração adicional do JavaScript. Lighthouse é ferramenta de auditoria temporária, não dependência do site.

## Revision Notes

2026-10-14: plano inicial criado no branch `codex/issue-4-performance` após inspeção da issue e do código de `origin/main`; regista PSI sem quota e exige baseline antes de otimizar.
2026-10-14: baseline Lighthouse duplicado confirmou atraso de animação no conteúdo LCP, primeira imagem lazy em Projetos e pedidos globais de fontes; plano revisto para implementar apenas estas correções mensuráveis.
2026-10-14: implementadas e validadas as alterações independentes de consentimento; pós-teste local e limitação de origem diferente registados. PR draft #12 aberto; GitHub Actions runs #49, #51 e #53 passaram, sem revisão ainda. Auditoria do HTML encontrou canonicals e sitemap no host Lovable e ausência de `404.html`; Milestone 4 ampliada para resolver ambos e testar antes de avançar.
