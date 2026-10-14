# Criar páginas próprias para cada serviço da issue #2

Este ExecPlan é um documento vivo. Manter `Progress`, `Surprises & Discoveries`, `Decision Log` e `Outcomes & Retrospective` atualizados durante o trabalho.

Não foi encontrado um `PLANS.md` aplicável. Este plano segue `AGENTS.md`: o chrome permanece partilhado em `src/components/site.tsx`, toda a cópia PT-PT/EN fica em `src/lib/site-content.ts`, o parâmetro `lang` é preservado e imagens de inspiração não são apresentadas como portefólio real.

## Purpose / Big Picture

Depois desta alteração, quem procura cozinhas, roupeiros ou móveis por medida poderá chegar a uma página própria, indexável e bilingue para o serviço relevante. Cada página explicará o âmbito, o processo, as opções de materiais já confirmadas no site, a área geográfica já declarada e uma forma direta de pedir orçamento. As páginas serão alcançáveis a partir da homepage, da página agregadora de serviços e do rodapé.

O requisito aprovado é a issue GitHub #2, https://github.com/lucas-botelho/moveis-machado/issues/2. O utilizador autorizou execução contínua, um branch por issue, validação, PR e integração segura. A redação ficará limitada a factos já presentes no repositório; não serão inventados prazos, garantias, certificações, materiais ou zonas servidas.

## Progress

- [x] (2026-10-13 20:16 WEST) Confirmar issue, comentários, ausência de trabalho concorrente, instruções e baseline após a integração da issue #1.
- [x] (2026-10-13 20:16 WEST) Criar `codex/issue-2-service-pages` a partir do `origin/main` integrado.
- [x] (2026-10-13 22:49 WEST) Criar o modelo de conteúdo bilingue e três rotas indexáveis com metadados únicos.
- [x] (2026-10-13 22:49 WEST) Atualizar ligações internas, sitemap/prerender e apresentação responsiva.
- [x] (2026-10-13 22:49 WEST) Adicionar testes de routing, conteúdo bilingue, unicidade de metadados e links preservando `lang`.
- [x] (2026-10-13 22:49 WEST) Executar typecheck, testes, lint, build normal e build com base path de GitHub Pages.
- [x] (2026-10-13 22:51 WEST) Publicar `codex/issue-2-service-pages` e abrir o PR #9 em rascunho.
- [x] (2026-10-13 22:51 WEST) CI do PR #9 concluiu com sucesso (run #41).
- [x] (2026-10-14 12:03 WEST) Rever o estado atual do PR #9 e detetar repetição do rótulo do serviço entre `PageHeading` e o início do conteúdo.
- [x] (2026-10-14 12:06 WEST) Remover o segundo rótulo sem alterar a hierarquia ou a cópia; build Pages gerou 17 páginas e as três rotas de serviço ficaram com um H1 e uma ocorrência do rótulo.
- [x] (2026-10-14 12:06 WEST) Revalidar 14 testes, typecheck, lint dirigido, Prettier, build Pages e destinos internos; tudo passou (um aviso Fast Refresh preexistente).
- [x] (2026-10-14 12:09 WEST) Publicar o commit `7ae2bae` no branch do PR #9; CI run #61 passou (lint, build, verificação GitHub Pages e testes).
- [ ] Obter revisão editorial do responsável e só então finalizar o PR/integrar.

## Surprises & Discoveries

- A página `/services` contém os três serviços, mas os cartões da homepage e os links do rodapé apontam todos para a mesma página agregadora.
- A fundação SEO da issue #1 mantém uma lista tipada `PUBLIC_PATHS` e uma lista explícita de páginas de prerender; ambas têm de receber as três novas rotas para evitar páginas órfãs no sitemap/build.
- O repositório só contém fotografias reais de cozinhas. Para não insinuar portefólio inexistente de roupeiros ou mobiliário, as páginas de serviço serão editoriais e não adicionarão galerias nem imagens geradas.
- O primeiro HTML produzido para as rotas filhas continha a página agregadora porque `services.tsx` não renderizava `<Outlet />`. A correção converteu `services.tsx` numa rota layout e moveu o agregador para `services.index.tsx`; o HTML final confirma o H1 de cada serviço e apenas um canonical.
- A pré-visualização local não foi acessível pelo browser integrado (`ERR_CONNECTION_TIMED_OUT`), apesar do processo de preview iniciar em `127.0.0.1:4173`. A verificação visual foi substituída por inspeção do HTML e CSS do build; este limite deve ser referido no PR.
- A revisão do componente `ServicePage` no head `6488dae` encontrou que `PageHeading` já mostra o rótulo em maiúsculas e o mesmo rótulo voltava a aparecer como `Eyebrow` no início da primeira secção. O `404` do branch #4 não é presente neste branch; este build da #2 foi validado separadamente e não recebe a correção de domínio do PR #12 até à integração.
- A duplicação do rótulo foi removida. O build com `PAGES_BASE_PATH=/moveis-machado` gerou 17 páginas; as páginas de cozinhas, roupeiros e móveis têm uma ocorrência do respetivo rótulo, um H1 e canonical/hreflang, sem destinos internos/ativos inexistentes.

## Decision Log

    Decision: usar `/services/kitchens`, `/services/wardrobes` e `/services/furniture` como URLs estáveis e neutros entre PT-PT e EN (assumida).
    Rationale: o idioma já é representado por `?lang=pt|en`; paths únicos evitam duplicar a arquitetura e mantêm alternates recíprocos simples.
    Date/Author: 2026-10-13 / Codex

    Decision: modelar os três serviços como dados bilingues centralizados e renderizá-los através de um componente de página partilhado (assumida).
    Rationale: garante paridade PT/EN, reduz divergência visual e cumpre a arquitetura do repositório sem duplicar o chrome ou a estrutura editorial.
    Date/Author: 2026-10-13 / Codex

    Decision: reutilizar apenas afirmações já publicadas no conteúdo existente sobre processo, materiais e Odivelas/Grande Lisboa (aprovada pelo âmbito da issue).
    Rationale: os critérios proíbem inventar capacidade operacional; o conteúdo atual é a única fonte interna confirmada.
    Date/Author: 2026-10-13 / Codex

    Decision: remover o segundo rótulo repetido no componente partilhado de serviço, preservando H1, títulos, factos e CTA (assumida, refinamento técnico/editorial sem alterar copy).
    Rationale: o rótulo de serviço já está no PageHeading imediatamente acima; repeti-lo como Eyebrow no início da primeira secção não acrescenta informação.
    Date/Author: 2026-10-14 / Codex

## Outcomes & Retrospective

A implementação e a validação incluem agora a remoção da repetição do rótulo. Os 14 testes, typecheck, lint dirigido, Prettier e build Pages locais passaram; HTML das três páginas tem H1 e rótulo únicos e os destinos internos resolvem. O CI remoto do commit `7ae2bae` passou no run #61 (lint, build, verificação Pages e testes). Falta revisão editorial pelo responsável da Móveis Machado, requerida explicitamente antes da publicação. O PR #9 permanece draft e a issue #2 continua aberta até essa revisão estar registada.

## Context and Orientation

`src/lib/site-content.ts` concentra a cópia e expõe `content`, `projects`, URLs de contacto e `pageMeta`. `src/components/site.tsx` implementa cabeçalho, rodapé e secções partilhadas; atualmente `ServicesPreview` e `SiteFooter` ligam todos os serviços a `/services`. `src/routes/services.tsx` é a página agregadora.

O router usa rotas baseadas em ficheiros. Serão criadas rotas filhas em `src/routes/services.kitchens.tsx`, `services.wardrobes.tsx` e `services.furniture.tsx`. `src/lib/seo-shared.ts` define `PUBLIC_PATHS`, usada por canonicals/hreflang e sitemap. `vite.config.ts` lista páginas de prerender para a publicação estática. Os testes vivem em `src/test`.

## Plan of Work

### Milestone 1: modelo editorial e página partilhada

Adicionar a `src/lib/site-content.ts` slugs tipados, destinos, metadados e conteúdo distinto PT/EN para cada serviço: eyebrow, H1, descrição, introdução, tópicos de planeamento/material, passos e CTA. Criar em `src/components/site.tsx` uma apresentação `ServicePage` que recebe o identificador e usa apenas componentes/estilos partilhados. Cada rota deverá selecionar metadados e conteúdo para o idioma validado pelo root.

O marco fica concluído quando as três rotas apresentam H1, title e description diferentes em PT e EN, sem factos novos não suportados.

### Milestone 2: descoberta, indexação e navegação

Alterar `ServicesPreview`, a página agregadora e `SiteFooter` para ligarem diretamente a cada rota e preservarem `lang`. Acrescentar as rotas a `PUBLIC_PATHS` e ao prerender de `vite.config.ts`. Criar estilos responsivos mínimos para a hierarquia editorial, reutilizando tokens atuais.

O marco fica concluído quando cada rota é alcançável por links HTML da homepage, `/services` e rodapé e quando sitemap/build incluem as seis variantes novas.

### Milestone 3: testes e entrega

Alargar routing e testes de SEO para verificar os três matches, a presença no sitemap, metadados únicos e URLs com idioma. Adicionar um teste de renderização que prove que os links de serviço mantêm `lang=en`. Executar typecheck, testes, lint e os dois builds. Rever o diff contra os critérios, atualizar este plano, fazer commits não destrutivos, abrir PR com `Fixes #2`, aguardar checks e integrar apenas quando os gates estiverem verdes.

### Milestone 4: remover a repetição do rótulo de serviço

Em `src/components/site.tsx`, `ServicePage` usa `PageHeading` com `page.label` e volta a renderizar o mesmo valor numa `Eyebrow` dentro da secção seguinte. Retirar apenas essa `Eyebrow`; manter o título de âmbito (`page.scopeTitle`), texto, materiais, área, processo e CTA. Construir o site com o base path Pages e confirmar que cada uma das três páginas tem uma única ocorrência do rótulo, continua com um H1 e mantém os links/locales.

## Concrete Steps

Executar a partir de `E:\Dev\Projects\moveis-machado`:

    bunx tsc --noEmit
    bun test
    bun run lint
    bun run build

Repetir o build com `PAGES_BASE_PATH=/moveis-machado` para reproduzir GitHub Pages. Inspecionar o HTML prerenderizado e `sitemap.xml` para as três rotas e ambos os idiomas.

As operações Git ficam limitadas a `codex/issue-2-service-pages`. Não usar force push, rebase, amend ou squash de histórico publicado.

## Validation and Acceptance

Os testes provam matches para `/services/kitchens`, `/services/wardrobes` e `/services/furniture`; o sitemap contém 16 entradas no total (`8 rotas x 2 idiomas`); links de serviço apontam para destinos distintos e preservam o idioma.

O HTML prerenderizado de cada rota deve conter um title, description e H1 próprios. O rótulo do serviço deve aparecer uma vez em cada idioma/página, no cabeçalho. PT-PT e EN não podem aparecer misturados dentro da variante selecionada. A homepage, `/services` e o rodapé devem fornecer links rastreáveis. O lint deve terminar sem erros; os 7 avisos preexistentes de Fast Refresh são tolerados se não houver avisos novos.

## Idempotence and Recovery

Conteúdo e rotas serão alterações determinísticas. O build apenas recria artefactos ignorados. Se a geração automática do route tree ocorrer durante dev/build, manter o ficheiro gerado coerente e não o editar manualmente. Em falha parcial, retomar pelo `git diff` e pelos itens de `Progress`; não restaurar alterações do utilizador nem reescrever histórico.

Se a revisão editorial identificar uma afirmação não confirmada, removê-la ou substituí-la por linguagem factual já existente antes da integração. Se a revisão pelo responsável não puder ser demonstrada, registá-la como gate explícito em vez de a declarar concluída.

## Artifacts and Notes

Baseline observado:

    branch inicial: origin/main @ 0d43f09a0c18f97e71b6a6c17c8d5255c7c9df00
    rotas públicas antes da alteração: 5
    páginas próprias de serviço antes da alteração: 0
    fotografias reais disponíveis: 3, todas categorizadas como cozinhas por medida
    typecheck: bunx tsc --noEmit — sucesso
    testes: bun test — 14 aprovados, 0 falhados, 78 verificações
    lint: bun run lint — 0 erros; 7 avisos preexistentes de Fast Refresh
    builds: bun run build — sucesso; PAGES_BASE_PATH=/moveis-machado bun run build — sucesso
    HTML dos três serviços: lang=pt-PT; title/H1 distintos; 1 canonical; 3 alternates; assets com base path correto
    PR #9: aberto em rascunho, mergeable=true; GitHub Actions Validate Lovable app #41: success

## Interfaces and Dependencies

`src/lib/site-content.ts` deverá exportar um tipo/constante estável para os identificadores e destinos dos serviços e dados editoriais indexados por idioma. `ServicePage` em `src/components/site.tsx` deverá aceitar apenas esse identificador. `PublicPath` continuará derivado de `PUBLIC_PATHS`, alargando automaticamente a assinatura de `pageMeta` e os geradores SEO. Não serão adicionadas dependências externas.

## Revision Notes

2026-10-13: plano inicial criado depois de confirmar a issue #2 e inspecionar a arquitetura, conteúdo, rotas, testes, sitemap e configuração de prerender.

2026-10-13: registada implementação, validação local e CI bem-sucedidos, incluindo a correção da relação layout/rotas filhas; a integração permanece condicionada pela revisão editorial explicitamente pedida nos critérios da issue.
2026-10-14: removido o segundo eyebrow repetido após PageHeading e validados 14 testes, typecheck, lint dirigido, Prettier e build Pages com 17 páginas; commit `7ae2bae` foi publicado e o CI run #61 passou. A revisão editorial continua pendente.
