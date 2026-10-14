# Completar SEO local e metadados de partilha da issue #3

Este ExecPlan é um documento vivo. Manter `Progress`, `Surprises & Discoveries`, `Decision Log` e `Outcomes & Retrospective` atualizados.

Não foi encontrado um `PLANS.md` aplicável. Aplicam-se as regras de `AGENTS.md`: manter a cópia bilingue em `src/lib/site-content.ts`, usar o parâmetro `lang`, preservar o chrome partilhado e não apresentar imagens de inspiração como portefólio.

## Purpose / Big Picture

Quando concluída, cada página terá metadados completos para partilha em PT e EN e o site emitirá dados estruturados de negócio que correspondem aos dados públicos confirmados. O JSON-LD é um bloco de informação legível por motores de pesquisa; deve refletir o conteúdo visível e não pode preencher lacunas com suposições.

O requisito aprovado é a issue GitHub #3, https://github.com/lucas-botelho/moveis-machado/issues/3. A issue exige confirmação prévia da empresa sobre os dados comerciais e não autoriza valores presumidos. O plano e a investigação podem avançar, mas a implementação do schema de negócio aguarda a confirmação dos campos em falta.

## Progress

- [x] (2026-10-13 22:53 WEST) Confirmar issue, comentários, dependências e código atual no branch baseado em `origin/main`.
- [x] (2026-10-13 22:53 WEST) Pesquisar fontes oficiais públicas para nome comercial, contactos e informação geográfica.
- [ ] Obter confirmação da empresa para nome comercial/legal, NIF/NIPC, morada oficial, telefone/email, URL de produção, horário, coordenadas, área servida e perfis sociais oficiais.
- [ ] Depois da confirmação, definir dados estruturados `WebSite` e `LocalBusiness` sem campos desconhecidos nem valores inventados.
- [ ] Completar Open Graph/Twitter por rota e idioma com URL, locale, alternates e imagem social de marca com dimensões e texto alternativo.
- [ ] Validar JSON-LD e HTML SSR em todas as páginas públicas; verificar com Rich Results Test.
- [ ] Executar typecheck, testes, lint e builds normal e GitHub Pages; abrir PR e integrar após os gates.

## Surprises & Discoveries

- A documentação do repositório confirma a URL publicada atual do protótipo (`artisan-ambiance-hub.lovable.app`), enquanto o site público da marca usa `moveismachado.com`. Como o site do repositório ainda é uma reconstrução, a origem canónica de produção deste projeto precisa de confirmação antes de ser publicada no schema.
- O site oficial público `https://moveismachado.com` apresenta o nome comercial “Móveis Machado”, o telefone `+351 916 499 166`, o email `jpfcmachado@gmail.com` e atendimento na Grande Lisboa, incluindo Lisboa e Odivelas. Estes dados estão no site oficial, mas não confirmam a denominação legal nem NIF/NIPC.
- A página de contactos deste repositório publica `Rua Vítor Cordon 6A, 2675-459 Odivelas, Portugal`; uma fonte externa consultada também lista essa morada e telefone. A página oficial da marca consultada não apresenta a morada, por isso a empresa deve confirmá-la antes de a usar no JSON-LD.
- Não foi encontrada fonte oficial pública para horário, coordenadas exatas, NIF/NIPC, denominação legal ou perfis sociais oficiais. Pesquisas em diretórios de terceiros não são prova suficiente para estes campos.
- `src/lib/seo.ts` já gera título, descrição, `og:type`, `og:url` e `twitter:card`, mas falta `og:locale`, imagem social, dimensões e texto alternativo. `src/routes/__root.tsx` define metadados globais da homepage sem canonical/locale de partilha; a implementação deverá evitar duplicação entre root e rotas.

## Decision Log

    Decision: não criar nem publicar `LocalBusiness` com campos presumidos até a empresa confirmar os dados pedidos pela issue (aprovada pela issue; execução bloqueada pelo pré-requisito).
    Rationale: o markup público pode ser interpretado por motores de pesquisa como representação factual da empresa; valores incorretos criariam inconsistência com contacto e páginas legais.
    Date/Author: 2026-10-13 / Codex

    Decision: considerar `moveismachado.com` uma origem oficial da marca, mas não assumir que é o domínio final desta reconstrução (assumida até confirmação).
    Rationale: o README identifica `artisan-ambiance-hub.lovable.app` como live app, enquanto o website atual da marca está num domínio diferente.
    Date/Author: 2026-10-13 / Codex

## Outcomes & Retrospective

A investigação confirmou alguns dados comerciais em fontes públicas oficiais, mas não os dados legais e operacionais necessários para o schema completo. Não foi alterado código de produto. A implementação permanece por iniciar até a empresa confirmar os campos pendentes; esta condição será mantida explícita na issue e no PR futuro.

## Context and Orientation

`src/lib/seo.ts` exporta `SITE_URL` e `createPageHead`, usados pelas rotas para títulos, descrições, canonical/hreflang e parte dos metadados Open Graph. `src/routes/__root.tsx` define os metadados globais e o `<html lang>`. `src/lib/site-content.ts` centraliza conteúdo bilingue, links públicos, morada de contacto, WhatsApp, mapa e a marca. `src/lib/seo-shared.ts` define a lista `PUBLIC_PATHS` e gera URLs absolutos para sitemap.

No estado base atual, `PUBLIC_PATHS` tem cinco rotas; a issue #2 está em revisão num PR draft separado, pelo que as novas páginas ainda não pertencem a `main`. Ao implementar a issue #3, integrar primeiro a #2 ou garantir que o plano inclui todas as páginas que estejam então em `main`.

O website oficial consultado durante a investigação é `https://moveismachado.com`; a sua página Contactos fornece telefone, email e área geral. Isto é evidência de informação publicada pela marca, não confirmação dos campos legais internos solicitados na issue.

## Plan of Work

### Milestone 1: confirmar dados e origem de produção

Recolher uma confirmação do responsável para denominação social/comercial, NIF/NIPC, morada, telefone, email, origem pública desta aplicação, horário, coordenadas, área de serviço e perfis oficiais. Comparar NAP com `src/routes/contact.tsx`, rodapé e site oficial. Não inferir campos em falta a partir de diretórios ou mapas.

O marco fica concluído quando cada campo necessário está confirmado ou assinalado como não aplicável, com fonte e data da confirmação.

### Milestone 2: dados estruturados e partilha social

Depois do marco 1, criar configuração tipada de dados empresariais verificados numa localização central. Gerar JSON-LD `WebSite` e o subtipo `LocalBusiness` adequado em SSR. Completar `createPageHead` e o head global com `og:locale` PT `pt_PT`/EN apropriado, `og:url`, imagem social absoluta de marca, dimensões, texto alternativo e alternates. Não reutilizar fotografias de inspiração nem fotografias de projetos como imagem institucional. Documentar a origem e o processo de atualização dos dados.

O marco fica concluído quando cada página contém um único conjunto de metadados sociais e o JSON-LD coincide com os dados visíveis confirmados.

### Milestone 3: validação e integração

Adicionar testes de funções JSON-LD, NAP, metadados por idioma e URLs de imagem. Inspecionar HTML SSR em todas as rotas presentes em `main`, validar JSON-LD com ferramenta oficial e executar typecheck, testes, lint e os dois builds. Abrir PR com evidências e integrar quando checks, revisão editorial e autorização de deployment estiverem satisfeitos.

## Concrete Steps

Diretório: `E:\Dev\Projects\moveis-machado`.

Depois de receber a confirmação e implementar:

    bunx tsc --noEmit
    bun test
    bun run lint
    bun run build
    $env:PAGES_BASE_PATH='/moveis-machado'; bun run build

Para a verificação manual, abrir cada rota em PT/EN e confirmar no HTML inicial `og:title`, `og:description`, `og:url`, `og:locale`, imagem social absoluta, canonical/hreflang e JSON-LD. Validar o bloco JSON-LD no Rich Results Test e não publicar screenshots/tokens ou dados não públicos.

## Validation and Acceptance

Os testes devem provar que os campos JSON-LD derivam exclusivamente da configuração confirmada, que não existem ratings/reviews/preços/horários/áreas inventados e que o NAP é idêntico nas superfícies públicas. Todas as rotas públicas devem produzir URL e imagem absoluta; PT deve usar `pt_PT`, EN um locale adequado, e ambos devem emitir alternate correspondente.

O HTML renderizado no servidor deve incluir metadados sociais corretos sem depender de JavaScript. O Rich Results Test não deve reportar erros críticos. Build, lint e testes devem passar. Se o responsável não confirmar algum campo opcional, omitir esse campo e atualizar os critérios da issue com a limitação, sem inventar valores.

## Idempotence and Recovery

A configuração tipada e os geradores devem ser determinísticos. Alterar um campo confirmado deve atualizar JSON-LD e metadados num único ponto. Se a validação externa falhar, manter o PR aberto, guardar o erro e corrigir apenas o markup; não substituir dados reais por valores fictícios para satisfazer o validador.

Se a configuração de domínio mudar, atualizar `VITE_SITE_URL` e confirmar canonical, sitemap, robots e `og:url` em conjunto. Não executar mudanças de domínio ou alterações em perfis externos sem confirmação do responsável.

## Artifacts and Notes

Fontes públicas consultadas:

    https://moveismachado.com/ — nome comercial, descrição geral, contactos no rodapé
    https://moveismachado.com/mail.html — +351 916 499 166, jpfcmachado@gmail.com, Grande Lisboa/Odivelas
    https://moveismachado.com/about.html — confirmação do nome/contactos, sem NIF ou denominação legal
    https://github.com/lucas-botelho/moveis-machado — README identifica artisan-ambiance-hub.lovable.app como live app
    src/routes/contact.tsx — Rua Vítor Cordon 6A, 2675-459 Odivelas, Portugal

Estas fontes públicas não confirmam NIF/NIPC, denominação legal, horário, coordenadas nem perfis oficiais.

## Interfaces and Dependencies

`createPageHead` deverá continuar a receber rota e idioma, acrescentando metadados sociais coerentes. O JSON-LD deve ser gerado no servidor a partir de uma configuração tipada e validada, sem instalar dependências se serialização JSON nativa for suficiente. Nenhuma alteração de dependências está prevista.

## Revision Notes

2026-10-13: plano inicial criado após inspeção da issue #3, do código atual e de fontes oficiais públicas. Registado o gate de dados que impede implementação factual até confirmação da empresa.
