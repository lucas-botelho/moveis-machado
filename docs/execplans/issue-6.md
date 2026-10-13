# Inventariar tratamentos para a política de privacidade

Este ExecPlan é um documento vivo. Manter `Progress`, `Surprises & Discoveries`, `Decision Log` e `Outcomes & Retrospective` atualizados.

Não foi encontrado um `PLANS.md` aplicável. Aplicam-se as regras de `AGENTS.md`: conservar conteúdo PT-PT/EN em `src/lib/site-content.ts`, usar `lang` nas rotas e ligações, manter o chrome partilhado e não apresentar imagens de inspiração como projetos.

## Purpose / Big Picture

O objetivo é publicar uma Política de Privacidade PT-PT que descreva fielmente os dados e serviços usados pelo site e uma tradução informativa EN. O visitante deverá conseguir perceber quem trata os seus dados, para quê, com que fornecedores, por quanto tempo e como exercer direitos. A política só pode ser redigida e publicada quando a empresa fornecer os factos internos e aprovar o texto; este plano não transforma lacunas em afirmações.

A issue GitHub #6 é a fonte do âmbito e dos critérios: https://github.com/lucas-botelho/moveis-machado/issues/6. O trabalho deste PR é parcial: documenta o inventário observável no código e os dados que faltam à empresa, sem acrescentar uma política genérica ao site.

## Progress

- [x] (2026-10-13 22:58 WEST) Confirmar a issue #6, comentários e ausência de PR anterior; reler `AGENTS.md` e verificar que não existe `PLANS.md` aplicável.
- [x] (2026-10-13 22:58 WEST) Inspecionar rotas, dependências, código de armazenamento e integrações externas diretamente visíveis no checkout baseado em `origin/main`.
- [x] (2026-10-13 22:59 WEST) Executar build e inspecionar o bundle para distinguir código importado de componentes não utilizados; registar limites desta verificação.
- [ ] Obter da empresa o inventário interno de tratamentos, fornecedores, finalidades/fundamentos, retenção, segurança, transferências e contacto responsável/DPO, se aplicável.
- [ ] Confrontar o inventário interno com pedidos reais recebidos por WhatsApp/telefone/email e com logs e configuração dos fornecedores de alojamento/produção.
- [ ] Redigir política específica PT-PT e versão EN informativa em `src/lib/site-content.ts`; criar rota e ligação no rodapé em `src/routes/` e `src/components/site.tsx`.
- [ ] Testar rota, idioma, metadados, links e correspondência com o inventário; executar typecheck, testes, lint e builds.
- [ ] Obter aprovação editorial da empresa e, se necessário, jurídica; abrir PR final e integrar apenas após checks, revisão e autorização de publicação.

Concluído nesta paragem: issue, código-fonte e bundle investigados; plano no branch `codex/issue-6-privacy`. Pendente: captura de rede do runtime/host, confirmação de factos internos, redação, aprovação e publicação.

## Surprises & Discoveries

- `src/routes/contact.tsx` não contém formulário. A ação visível abre `whatsappUrl` em `https://wa.me/351933776729`; isto transfere a interação para a WhatsApp/Meta apenas após ação do utilizador, e o destino/operador do número deve ser confirmado pela empresa.
- A página de contactos inclui um iframe Google Maps diretamente, com `loading="lazy"`. O atributo adia carregamento até perto da viewport, mas não é mecanismo de consentimento: ao carregar a página de contactos o browser poderá ligar-se ao Google sem uma ação ou escolha explícita.
- `src/routes/__root.tsx` liga uma stylesheet Google Fonts global. A página pode fazer pedidos a Google Fonts (e aos hosts de fontes referidos por essa stylesheet) em todas as rotas.
- `src/components/ui/sidebar.tsx` contém código para gravar o cookie `sidebar_state`, mas uma pesquisa no código não encontrou importações de `SidebarProvider` nem do módulo sidebar fora do próprio ficheiro. Não contar esse cookie como ativo sem confirmar o bundle/runtime.
- `src/lib/lovable-error-reporting.ts` chama hooks globais opcionais `window.__lovableEvents` e `window.__lovableReportRuntimeError`. O primeiro pode enviar exceções a um SDK injetado; o segundo é descrito no código como telemetria apenas do preview/editor. O checkout não identifica que script, fornecedor, retenção ou ambiente disponibiliza esses hooks, por isso requer verificação no runtime de produção/hosting.
- O `bun run build` concluído com permissões normais gerou HTML SSR para a rota de contacto contendo a stylesheet Google Fonts e o iframe `https://www.google.com/maps?...&output=embed`; ambos são inseridos sem consentimento ou clique prévio. `loading="lazy"` não impede o browser de carregar o iframe quando este se aproxima da viewport.
- O bundle do cliente contém os nomes dos hooks Lovable opcionais e o destino WhatsApp, mas não contém a string `sidebar_state`; isto confirma que o componente de sidebar que grava esse cookie não foi incluído no bundle atual. Os nomes dos hooks não provam que exista um SDK ou que seja ativado fora do editor.
- A primeira tentativa de build em sandbox falhou com `EPERM` ao resolver módulos nativos e caminhos em `node_modules`; a repetição com permissões normais terminou com sucesso. É uma limitação do ambiente de execução, não uma falha de compilação.
- Não foram encontrados usos de `localStorage`, `sessionStorage`, `indexedDB`, Analytics, pixels ou APIs de envio de formulários na pesquisa do código-fonte. Isto ainda não prova ausência de requests injetados pelo alojamento nem do comportamento de código carregado por terceiros.
- `README.md` aponta o protótipo Lovable como live app e o workflow `.github/workflows/ci.yml` publica em GitHub Pages quando há push para `main`. O host de produção real e os respetivos logs/termos precisam de confirmação; as duas referências não provam qual o responsável efetivo pelo alojamento atual.

## Decision Log

    Decision: limitar o inventário desta fase a comportamento verificável no código e bundle; tratar integrações injetadas e práticas organizacionais como por confirmar.
    Rationale: a issue proíbe modelos genéricos e a política tem de corresponder a operações reais, incluindo fornecedor, base jurídica, conservação e dados internos que não constam do código.
    Date/Author: 2026-10-13 / Codex (opção técnica assumida; sem aprovação jurídica ou empresarial atribuída)

    Decision: não adicionar consentimento, política nem declarações sobre responsável/controlador, retenção ou transferências neste PR parcial.
    Rationale: tais decisões exigem inventário interno e revisão expressamente requeridos pela issue; a issue #7 trata do consentimento e tem a política de privacidade como dependência.
    Date/Author: 2026-10-13 / Codex (limite de âmbito para este PR parcial)

## Outcomes & Retrospective

A análise e build local identificaram dois recursos carregados no HTML inicial da rota de contacto (Google Fonts global e Google Maps incorporado), um caminho externo iniciado pelo utilizador (WhatsApp) e hooks de erro opcionais presentes no bundle. O bundle atual não contém `sidebar_state`, e a rota não contém formulário. Ainda falta captura de rede no host de produção para verificar injeções e logs; o código-fonte não prova essas práticas. Nenhuma política foi redigida ou publicada. O objetivo da issue continua incompleto até a empresa confirmar dados internos e aprovar o texto.

## Context and Orientation

O root `src/routes/__root.tsx` define a língua HTML, metadata global e stylesheet do Google Fonts. `src/routes/contact.tsx` renderiza contactos, ligação externa WhatsApp e iframe de mapa. Os URLs são centralizados em `src/lib/site-content.ts`. `src/lib/lovable-error-reporting.ts` chama integrações globais opcionais quando ocorre um erro. O servidor `src/server.ts` captura e regista erros do processo; não é evidência de um fornecedor externo de analytics nem esclarece políticas de retenção do alojamento.

O projeto usa TanStack Start/Router, React 19 e Bun; `package.json` declara `bun run test`, `bun run lint` e `bun run build`. A cópia pública é mantida em `src/lib/site-content.ts`; `src/components/site.tsx` mantém o rodapé e `src/routes/` contém as páginas. Antes da escrita final, o ramo de trabalho deve integrar a #2 caso esta tenha sido aprovada e fundida, para que os links legais também estejam nas novas rotas.

O scan de código é um inventário parcial: o host pode manter logs de acesso, o editor ou runtime Lovable pode injetar telemetria, e WhatsApp/Google podem receber pedidos ao visitar ou usar as funções correspondentes. As políticas de retenção, bases jurídicas, destinatários/subcontratantes, transferências, medidas de segurança, contacto do responsável e existência de DPO são factos da empresa/fornecedores, não dedutíveis do frontend.

## Plan of Work

### Milestone 1: inventário técnico reproduzível

Inspecionar o bundle produzido a partir deste branch e verificar se o módulo sidebar/cookie e os hooks de erro estão incluídos. Registar todas as requests externas iniciadas por cada rota, separando carregamento automático de navegação após ação do utilizador. Uma captura real da rede em preview/produção é necessária antes de declarar ausência de requests injetados; identificar explicitamente o domínio e ambiente testado. O marco termina quando cada item tem recurso, fornecedor aparente, ação de ativação e limitação conhecida documentados.

### Milestone 2: recolher factos organizacionais e do serviço

Obter confirmação do responsável pelos canais e dados recebidos, fluxo de orçamentos, ferramentas e fornecedores efetivamente usados, categorias de dados e finalidades, fundamentos, destinatários, transferências/garantias, conservação, segurança, direitos/contacto e DPO se aplicável. Confirmar igualmente produção e fornecedor de alojamento para tratar logs e suporte. Este marco não passa com dados inferidos dos componentes ou modelos de condições genéricos.

### Milestone 3: redigir e publicar conteúdo aprovado

Com os marcos anteriores concluídos, acrescentar conteúdo factual PT-PT e tradução EN informativa em `src/lib/site-content.ts`, uma rota separada em `src/routes/` e um link permanente no rodapé partilhado de `src/components/site.tsx`. A página explica os fluxos reais, o contacto de direitos e a CNPD, mostra a data aprovada de atualização e corresponde às configurações técnicas. Não inventar DPO, retenção, segurança, transferência, fundamento ou fornecedor. Validar com testes de routing e conteúdo, obter aprovação editorial/jurídica necessária e integrar pelo PR após CI.

## Concrete Steps

Diretório de trabalho: `E:\Dev\Projects\moveis-machado`.

Depois do primeiro marco, executar:

    bun run build
    rg -n "sidebar_state|__lovableEvents|__lovableReportRuntimeError|fonts\.googleapis|maps\.google" dist
    bunx tsc --noEmit
    bun run test
    bun run lint
    bun run build
    $env:PAGES_BASE_PATH='/moveis-machado'; bun run build

O comando `rg` é diagnóstico: ausência de match não é prova de ausência de requests no browser. Abrir preview limpo em cada rota pública, com cache desativada, capturar host/URL/iniciador/timing, testar página de contacto antes e depois de abrir o mapa, e repetir em runtime de produção autorizado. Não enviar dados pessoais reais nos pedidos de orçamento durante QA.

## Validation and Acceptance

O marco 1 é aceite quando o bundle estiver inspecionado e as requests automáticas forem distinguidas de pedidos após interação. A captura tem de ser repetível em janela privada e indicar data, browser, host e rotas; erros de rede ou ausência de acesso a produção ficam documentados, nunca convertidos em prova de inexistência.

O conteúdo final só é aceite quando cada finalidade/base jurídica, categoria de dados, destinatário, transferência, prazo/critério de conservação, contacto de direitos e afirmação sobre decisões automatizadas tiver fonte confirmada pela empresa ou configuração observável. A versão PT-PT deve cobrir elementos aplicáveis do artigo 13.º RGPD; a EN não substitui a portuguesa. Testes devem provar acesso a partir do rodapé, idioma preservado e ausência de strings de exemplo/placeholder. Typecheck, testes, lint e builds normal e GitHub Pages devem passar. Revisão empresarial/jurídica e validação de conteúdo são gates manuais distintos dos testes automatizados.

## Idempotence and Recovery

O inventário pode ser repetido sempre que um fornecedor, route ou release mudar; registar a versão e ambiente para comparar. Se o build gerar artefactos temporários, não os commitar salvo exigência do projeto. Se a captura ou acesso ao alojamento falhar, manter o inventário estático marcado como parcial e solicitar evidência ao responsável do fornecedor; não presumir que as práticas do preview são as mesmas da produção.

Se uma afirmação da política não puder ser comprovada, remover ou explicitar a incerteza antes de publicar e manter o PR aberto. Alterações de copy devem ficar na fonte bilingue única para evitar divergência entre páginas; alterações já integradas no branch Lovable não devem ser reescritas por rebase, amend ou squash.

## Artifacts and Notes

Evidência estática observada neste checkout:

    src/routes/__root.tsx: stylesheet Google Fonts global e ErrorComponent que chama reportLovableError.
    src/routes/contact.tsx: enlace WhatsApp com target _blank e iframe de Google Maps lazy.
    src/lib/site-content.ts: whatsappUrl, mapsUrl e mapsEmbedUrl.
    src/lib/lovable-error-reporting.ts: hooks globais opcionais para captura de exceções.
    src/components/ui/sidebar.tsx: grava sidebar_state; nenhuma importação do módulo encontrada fora dele.
    package.json: sem dependência identificável de SDK de analytics; lista de dependências não prova scripts injetados no host.

Não há captura de rede nem dados internos de tratamento anexados nesta revisão.

## Interfaces and Dependencies

Nenhuma interface de runtime nem dependência está prevista para este marco documental. A futura rota deve usar TanStack Router existente, conteúdo bilingue em `src/lib/site-content.ts` e o `SiteFooter` de `src/components/site.tsx`. Não instalar CMP ou SDK de consentimento por inferência; a gestão de cookies é a issue #7.

## Revision Notes

2026-10-13: plano inicial criado no branch `codex/issue-6-privacy` após confirmação da issue e inspeção da implementação em `origin/main`; registado build concluído e verificação do HTML prerenderizado/bundle, incluindo a limitação do sandbox e os factos organizacionais pendentes.
