# Implementar consentimento e bloquear recursos de terceiros

Este ExecPlan é um documento vivo. Manter `Progress`, `Surprises & Discoveries`, `Decision Log` e `Outcomes & Retrospective` atualizados durante o trabalho.

Não foi encontrado um `PLANS.md` aplicável. Este plano segue `AGENTS.md`, a issue GitHub #7 e as regras da skill `execplan`.

## Purpose / Big Picture

O visitante deve poder usar todo o conteúdo principal sem aceitar recursos opcionais, escolher ou recusar categorias com a mesma facilidade, rever a escolha no rodapé e compreender exatamente que armazenamento e terceiros existem. Antes de consentimento, a página de contactos mostrará a morada e uma alternativa externa funcional, mas não criará o iframe Google Maps. O diagnóstico opcional do ambiente Lovable também ficará inativo sem consentimento.

A origem aprovada do âmbito é a issue GitHub #7, `https://github.com/lucas-botelho/moveis-machado/issues/7`. A implementação pode ser preparada e validada, mas não será integrada/publicada até o responsável da empresa aprovar o conteúdo da Política de Cookies e a dependência de Política de Privacidade ficar resolvida ou explicitamente aceite.

## Progress

- [x] (2026-10-14 12:46 WEST) Ler a issue #7, comentários, dependências, instruções do repositório e documentação existente.
- [x] (2026-10-14 12:46 WEST) Confirmar o inventário estático atual e as fontes legais oficiais relevantes.
- [x] (2026-10-14 12:46 WEST) Criar este ExecPlan na branch `codex/issue-7-cookie-consent`.
- [x] (2026-10-14 13:04 WEST) Implementar o modelo versionado de consentimento e os controlos acessíveis.
- [x] (2026-10-14 13:04 WEST) Bloquear Google Maps e diagnóstico Lovable até consentimento por categoria e permitir revogação imediata.
- [x] (2026-10-14 13:04 WEST) Criar a Política de Cookies bilingue e os links permanentes no rodapé.
- [x] (2026-10-14 13:04 WEST) Cobrir primeira visita, aceitação, rejeição, escolha parcial, revogação e mudança de versão com testes.
- [x] (2026-10-14 13:04 WEST) Validar tipos, testes, lint dirigido, build, HTML/bundle e comportamento visual desktop/mobile.
- [ ] Publicar branch e PR draft, atualizar a issue com evidência e aguardar aprovação empresarial antes de integrar.

## Surprises & Discoveries

- As Google Fonts já foram substituídas por `@fontsource-variable` e são servidas pela própria aplicação; não exigem consentimento nem ligação a `fonts.googleapis.com`/`fonts.gstatic.com`.
- `src/components/ui/sidebar.tsx` contém código para um cookie `sidebar_state`, mas o componente não é importado pelo site e a auditoria anterior da issue #6 confirmou que a string não entra no bundle atual. Não faz parte do inventário de runtime.
- `src/lib/lovable-error-reporting.ts` só transmite diagnósticos se o host injetar `window.__lovableEvents` ou `window.__lovableReportRuntimeError`. O código será condicionado à categoria opcional de diagnóstico para cobrir também previews onde esses hooks existem.
- A Política de Privacidade exigida pela issue #6 ainda não está publicada; a issue #6 permanece aberta e depende de dados empresariais na issue #15.
- A primeira inspeção a 390 px revelou que o `flex-basis` herdado tornava os botões do banner excessivamente altos. A regra mobile passou a usar altura intrínseca e a confirmação mediu 36 px por botão, sem overflow horizontal.
- O detector Impeccable não pôde arrancar porque o binário 0.1.5 não está instalado e o cache exigiria rede/permissão fora do projeto. A revisão visual e de acessibilidade no navegador foi concluída como fallback.

## Decision Log

    Decision: guardar uma única prova mínima first-party em localStorage, com versão, categorias e timestamp (opção técnica assumida).
    Rationale: evita um CMP externo e cookies adicionais; o registo é estritamente necessário para respeitar a escolha em visitas seguintes. Um payload inválido ou de versão anterior é tratado como ausência de consentimento.
    Date/Author: 2026-10-14 / Codex

    Decision: usar as categorias opcionais `externalMedia` e `diagnostics`, ambas desligadas por omissão (opção técnica assumida).
    Rationale: correspondem aos dois comportamentos condicionais reais: iframe Google Maps e hooks de erro Lovable quando presentes. Permitem uma escolha parcial verificável sem inventar analytics ou marketing inexistentes.
    Date/Author: 2026-10-14 / Codex

    Decision: o botão do placeholder “Carregar mapa” concede apenas `externalMedia`, preservando a escolha de `diagnostics` (opção técnica assumida).
    Rationale: é uma ação positiva, específica e contextual. A ligação “Abrir no Google Maps” continua disponível sem gravar consentimento nem carregar o iframe.
    Date/Author: 2026-10-14 / Codex

    Decision: manter “Aceitar” e “Rejeitar” lado a lado com tratamento visual equivalente; “Personalizar” abre um diálogo Radix com foco contido e switches sem pré-seleção (opção técnica assumida).
    Rationale: cumpre a primeira camada equilibrada, navegação por teclado e opt-in granular, preservando a identidade visual existente.
    Date/Author: 2026-10-14 / Codex

    Decision: abrir PR draft e não integrar enquanto a Política de Cookies não tiver aprovação empresarial e a dependência da Política de Privacidade não estiver resolvida (requisito aprovado pela issue).
    Rationale: a própria issue exige aprovação antes de publicação; um merge em `main` sincroniza com Lovable e pode publicar o conteúdo.
    Date/Author: 2026-10-14 / Codex

## Outcomes & Retrospective

A implementação ficou tecnicamente concluída na branch de trabalho. O site guarda apenas versão, categorias e timestamp; não cria o iframe Google Maps nem usa hooks Lovable antes da categoria respetiva; e permite aceitar, rejeitar, personalizar e revogar no rodapé. A Política de Cookies PT-PT/EN, o placeholder acessível e a rota prerenderizada foram adicionados sem dependências novas.

Os 25 testes passaram, o typecheck passou e o build prerenderizou 19 páginas, incluindo `/cookies` e `/cookies?lang=pt`. O lint dirigido terminou sem erros, mantendo apenas dois avisos Fast Refresh já explicáveis por ficheiros que exportam componentes e helpers. A inspeção real em 1440 px e 390 px confirmou ausência de iframe antes do opt-in, diálogo acessível, opt-in parcial, carregamento do mapa e remoção imediata por revogação. A entrega continua deliberadamente bloqueada para integração/publicação até aprovação empresarial do texto e resolução ou aceitação explícita da dependência de Política de Privacidade.

## Context and Orientation

`src/routes/__root.tsx` monta a navegação, o conteúdo da rota e o rodapé. É o ponto correto para um provider de consentimento e para o banner global. `src/components/site.tsx` contém o rodapé partilhado, onde ficará “Gerir cookies”. `src/routes/contact.tsx` contém atualmente o iframe Google Maps incondicional. `src/lib/lovable-error-reporting.ts` encaminha erros para hooks opcionais do host. `src/lib/site-content.ts` concentra toda a cópia PT-PT e inglesa e deve receber os textos do banner, painel, mapa e política.

O router TanStack gera `src/routeTree.gen.ts` a partir dos ficheiros em `src/routes`. A nova rota será `src/routes/cookies.tsx`, com `lang` preservado nos links internos. O estado de consentimento deve funcionar com SSR: o HTML inicial não pode conter o URL do iframe; a leitura de `localStorage` acontece apenas no browser após montagem.

Inventário observado antes da alteração:

- `localStorage`/`sessionStorage` ativo: nenhum.
- Cookies first-party ativos no bundle: nenhum confirmado.
- Iframe/pedido automático terceiro: Google Maps em `src/routes/contact.tsx` quando a rota se aproxima do viewport.
- Links externos após ação: WhatsApp e Google Maps/direções.
- Fontes: Manrope e Cormorant Garamond auto-hospedadas via Fontsource.
- Diagnóstico: hooks Lovable opcionais chamados apenas quando injetados pelo ambiente.
- Analytics, marketing e pixels: não encontrados no código ou nas dependências carregadas.

## Plan of Work

### Milestone 1: modelo versionado e interface global

Criar `src/lib/consent.ts` com o schema, versão da política, leitura/validação, gravação e atualização granular. Criar `src/components/cookie-consent.tsx` com provider, banner e painel Radix. O HTML SSR permanece sem decisões inferidas; após hidratação, uma escolha válida esconde o banner e uma versão antiga volta a pedir consentimento. `src/routes/__root.tsx` liga o provider e o banner; `src/components/site.tsx` expõe permanentemente a gestão no rodapé.

O marco é aceite quando aceitar, rejeitar e personalizar gravam somente `{version, categories, timestamp}`, os botões principais têm o mesmo peso, o diálogo começa com categorias opcionais desligadas numa primeira visita e o rodapé reabre as preferências.

### Milestone 2: bloqueio dos recursos opcionais

Substituir o iframe direto em `src/routes/contact.tsx` por um componente de mapa controlado por `externalMedia`. Sem consentimento, manter uma caixa com altura/proporção reservada, explicação, botão específico para carregar e ligação externa. Ao revogar, desmontar imediatamente o iframe e manter a alternativa. Em `src/lib/lovable-error-reporting.ts`, consultar o consentimento persistido antes de usar hooks do host.

O marco é aceite quando o HTML inicial e o estado rejeitado não contêm `maps.google.com`/`google.com/maps` como recurso embebido, o clique contextual ativa apenas o mapa e a revogação o remove sem recarregar a página.

### Milestone 3: política e inventário visível

Adicionar conteúdo PT-PT de referência e tradução inglesa informativa a `src/lib/site-content.ts`. Criar `src/routes/cookies.tsx` com data de atualização, categorias, fornecedor, finalidade, ativação, persistência conhecida e limitações; distinguir armazenamento first-party, Google Maps, links externos e diagnóstico de preview. Adicionar o link de Política de Cookies no rodapé e manter o link de gestão separado.

O marco é aceite quando a rota funciona em ambos os idiomas, descreve apenas o inventário observado e deixa claro que cookies concretos do Google só podem ser confirmados depois de o mapa ser autorizado/carregado. O texto fica marcado no PR como pendente de aprovação empresarial, não como aconselhamento jurídico concluído.

### Milestone 4: testes, auditoria e entrega draft

Adicionar testes unitários ao schema e testes de interface com Testing Library para primeira visita, aceitar, rejeitar, parcial, revogar e invalidar versão. Atualizar testes de routing/idioma. Executar typecheck, testes, lint dirigido e build. Inspecionar os documentos prerenderizados e bundles para confirmar ausência do iframe no HTML inicial e ausência de Google Fonts. Fazer uma passagem visual desktop/mobile e uma auditoria mecânica Impeccable quando a ferramenta estiver disponível.

Depois de validação, publicar a branch sem rebase/force, abrir PR draft relacionado com #7 e atualizar a issue com o plano versionado, resultados e bloqueio de aprovação. Não fazer merge enquanto o gate empresarial estiver aberto.

## Concrete Steps

Executar a partir de `E:\Dev\Projects\moveis-machado`:

    bunx tsc --noEmit
    npm test
    npx eslint src/lib/consent.ts src/components/cookie-consent.tsx src/components/site.tsx src/routes/__root.tsx src/routes/contact.tsx src/routes/cookies.tsx src/test/consent.test.tsx src/test/app-routing.test.tsx
    npm run build
    rg -n "fonts.googleapis.com|fonts.gstatic.com|google.com/maps|maps.google.com|sidebar_state" dist

O build deve gerar a rota `/cookies` nas variantes linguísticas. O `rg` pode encontrar o URL Google Maps no JavaScript carregado da rota de contactos, porque o componente precisa de o conhecer para o usar após consentimento; não o deve encontrar como `<iframe src=...>` no HTML prerenderizado. A prova final deve distinguir presença no bundle de pedido de rede.

Para validação manual, iniciar `npm run dev -- --host 127.0.0.1`, abrir `/contact?lang=pt` num perfil sem armazenamento e observar banner, placeholder e ausência de iframe. Repetir a 390 px e desktop. Exercitar rejeitar, personalizar apenas mapa, revogar no rodapé e simular uma versão antiga em `localStorage`.

## Validation and Acceptance

Os testes automatizados devem provar:

- primeira visita: banner visível, switches opcionais desligados e mapa ausente;
- aceitar: categorias opcionais ativas, escolha persistida e mapa disponível;
- rejeitar: categorias falsas, banner fechado e mapa bloqueado;
- parcial: `externalMedia=true` e `diagnostics=false`, sem alterar categorias não escolhidas;
- revogar: categorias opcionais falsas, iframe desmontado e estado persistido atualizado;
- nova versão: registo anterior ignorado e banner reapresentado;
- rota `/cookies`: match no router e preservação de `?lang=pt|en`;
- SSR/build: nenhum recurso Google Maps embebido no HTML antes de consentimento.

A inspeção manual deve confirmar foco visível, ordem de tabulação, escape/fecho do diálogo, nomes acessíveis, scroll utilizável, botões equivalentes e layout sem sobreposição em 390 px e desktop. A altura do placeholder deve reservar o mesmo espaço do mapa para evitar CLS na ativação.

## Idempotence and Recovery

Leitura e gravação do consentimento são idempotentes; repetir a mesma escolha apenas atualiza o timestamp. JSON inválido, schema desconhecido ou armazenamento indisponível falham de forma segura para “sem consentimento”. Alterar materialmente categorias, fornecedores ou finalidades exige incrementar a versão para reapresentar o banner.

Não há migrations nem remoções destrutivas. Se a implementação falhar a meio, manter o mapa bloqueado é o estado seguro. Para retomar, verificar `git status`, os testes do schema e o HTML prerenderizado antes de mexer no estado. Não apagar alterações do utilizador nem reescrever histórico Lovable. Artefactos temporários de screenshots/auditoria ficam em diretórios ignorados; só são removidos se criados por este trabalho e com caminho verificado.

## Artifacts and Notes

Evidência oficial consultada em 2026-10-14:

    CNPD, Nota Informativa de 25-06-2021: o operador do website é responsável pelos cookies permitidos e deve assegurar informação e consentimento quando exigido, incluindo analytics.
    Lei n.º 41/2004, artigo 5.º (redação oficial DR): armazenamento/acesso no terminal exige consentimento prévio informado, salvo armazenamento/acesso técnico estritamente necessário.
    RGPD, artigo 7.º (EUR-Lex): o responsável deve demonstrar consentimento; a retirada deve ser tão fácil como a concessão.

Resultados de validação em 2026-10-14:

    npm test: 5 ficheiros, 25 testes aprovados.
    bunx tsc --noEmit: aprovado.
    npm run build: aprovado; 19 páginas prerenderizadas.
    eslint dirigido: 0 erros, 2 avisos Fast Refresh.
    prettier --check: aprovado.
    navegador 1440 px e 390 px: sem overflow; banner, diálogo, placeholder, opt-in parcial e revogação verificados.
    HTML prerenderizado de /contact: sem iframe ou URL Google Maps antes de consentimento.

As capturas foram inspecionadas no navegador controlado, mas o ambiente recusou a exportação para ficheiros locais. O detector Impeccable foi tentado uma vez e ficou indisponível pela ausência do binário 0.1.5.

## Interfaces and Dependencies

Não serão adicionadas dependências. O modelo previsto é:

    type ConsentCategories = {
      externalMedia: boolean;
      diagnostics: boolean;
    };

    type ConsentRecord = {
      version: string;
      categories: ConsentCategories;
      timestamp: string;
    };

`ConsentProvider` expõe o registo atual, estado de hidratação, abertura do painel, gravação completa, atualização granular e rejeição. `useConsent()` é a interface dos componentes. A persistência usa uma chave namespaced e a constante de versão em `src/lib/consent.ts`. Radix Dialog já existe no projeto e fornece portal, foco contido, Escape e semântica; o painel deve localizar também a etiqueta de fecho, que o componente genérico atual mantém em inglês.

## Revision Notes

2026-10-14: plano inicial criado após leitura da issue #7, da dependência #6, do inventário da issue #6, do código atual e das fontes oficiais. O plano assume implementação completa em PR draft e bloqueia integração/publicação até aprovação empresarial.

2026-10-14: atualizado após implementação, testes e revisão visual. Registados o ajuste mobile, os resultados de validação, a indisponibilidade do detector e o gate empresarial ainda aberto.
