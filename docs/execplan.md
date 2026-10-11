# Construir o site bilingue da Móveis Machado

Este ExecPlan é um documento vivo. Não foi encontrado AGENTS.md ou PLANS.md aplicável. Raiz: outputs/moveis-machado, no diretório desta conversa.

## Purpose / Big Picture

Permitir conhecer os serviços, explorar fotografias históricas da empresa e preparar pedidos de orçamento em português europeu e inglês. O resultado é uma aplicação funcional, apresentada privadamente no Sites, sem CMS, contas ou base de dados. O lançamento público e o envio real dependem dos dados empresariais ainda não fornecidos.

## Progress

- [x] 2026-10-11, Europe/Lisbon: briefing, skills e diretório vazio inspecionados; sem infraestrutura prévia.
- [x] 2026-10-11, Europe/Lisbon: fontes empresariais e seis concorrentes pesquisados; conclusões iniciais recebidas, documentos e ativos em preparação.
- [x] 2026-10-11, Europe/Lisbon: starter Sites instalado; projeto privado criado e identidade persistida.
- [x] 2026-10-11, Europe/Lisbon: sitemap e plano revistos antes da implementação.
- [x] 2026-10-11 21:19 Europe/Lisbon: conteúdo bilingue e 30 URLs implementados, navegação, serviços, galeria, sobre, contactos e páginas legais.
- [x] 2026-10-11 21:19 Europe/Lisbon: endpoint Resend/Turnstile, validação, origem, limite de leitura, honeypot e idempotência; configuração ausente mantém envio indisponível.
- [x] 2026-10-11 21:19 Europe/Lisbon: tipos, lint, conteúdo, 15 testes, build e QA produção (30 rotas, 42 checks responsivos, 22 scans Axe, cinco jornadas) passaram.
- [ ] Publicar versão privada verificada e entregar documentação, evidências e bloqueios.

## Surprises & Discoveries

O Sites usa Vinext compatível com App Router e Cloudflare Workers; a preferência Next.js/Vercel é adaptada ao conector explicitamente pedido. O starter contém módulos de autenticação e dados que não fazem parte do produto e serão removidos. O site histórico confirma fabrico próprio e experiência; a galeria pode bloquear pesquisa automática. Contactos antigos estão expressamente proibidos. Autorização das imagens permanece pendente: utilização apenas na apresentação privada, com proveniência documentada.

## Decision Log

Decision: manter starter suportado Sites/Vinext e integração de build sites(), sem dependências de CMS, auth ou dados. Estado: escolha técnica assumida, 2026-10-11, Codex. Razão: publicação pedida através de Sites, envio requer servidor, APIs App Router preservam portabilidade. Documentar beta e alternativa Next/Vercel.

Decision: recursos locais pt/en tipados, roteamento por identidade de página/projeto, sem biblioteca i18n adicional. Estado: assumida. Razão: pequeno conjunto de páginas; gera HTML localizado e links equivalentes sem estado linguístico oculto.

Decision: quatro serviços, sobre, projetos e detalhe, contactos, privacidade, informação legal, acessibilidade. Não criar páginas locais repetidas ou testemunhos. Estado: assumida após pesquisa. Razão: cobertura útil e suficiente para clientes em Lisboa/Odivelas.

Decision: off-white, tinta carvão, castanho madeira, serif editorial + sans legível, fotografias amplas e navegação curta. Estado: assumida após investigação dos concorrentes. Não usar imagens alheias ou projetos inventados.

Decision: envio Resend via HTTP, validação cliente/servidor, honeypot, limite de tamanho, origem e Turnstile obrigatório na ativação. Sem base de dados; proteção do desafio externa, sem prometer limite distribuído inexistente. Formulário indisponível de forma honesta até configuração completa e legal aprovada; zero recolha enquanto indisponível.

Decision: usar origem Sites real para URLs absolutas e noindex na apresentação privada. .pt proposto nunca é tratado como domínio adquirido. Configuração explícita permite indexação após revisão.

## Outcomes & Retrospective

Website funcional concluído em 30 URLs, com todos os testes de lógica e navegador aprovados. Lighthouse final local: desempenho 98, acessibilidade 100, boas práticas 100, SEO 69 (apenas audit is-crawlable falha, deliberado noindex privado), LCP 2,1 s e CLS 0. Fonte pronta para guardar/publicar privadamente. Permanecem contactos, direitos de imagens, identificação jurídica, domínio/migração e email real. Não há medição de INP em campo ou certificação WCAG.

## Context and Orientation

app contém rotas App Router. src/content guarda empresa, serviços e projetos. src/i18n define mensagens e relações de URLs. components contém navegação e experiências interativas. public/images guarda imagens locais e fontes. app/api/contact/route.ts valida e envia no servidor. docs contém investigação e operação. .openai/hosting.json identifica exatamente o projeto Sites e não contém segredos. O site é privado por acesso do alojamento; a aplicação não implementa login.

## Plan of Work

### Milestone 1: conteúdo e páginas navegáveis

Criar dados tipados em src/content e mensagens locais. Definir URLs /pt e /en; / redireciona /pt. Resolver subpáginas com tabela de identidades e slugs, gerando metadata por idioma. Construir Home, serviços, listagem e detalhe de projetos reais documentados sem inferir local, ano ou materiais de cada obra. Galeria abre diálogo com navegação teclado. Header permite menu mobile e troca equivalente de idioma. Prova: links resolvidos e conteúdo traduzido no servidor.

### Milestone 2: contactos e confiança

Criar configuração central sem números ou email por defeito, formulário e endpoint. Recusar configuração ausente, payload inválido, origem errada, honeypot e desafio rejeitado. Só provider acceptance produz sucesso. Gerar JSON-LD factual, canonical/hreflang recíprocos, sitemap, robots e páginas legais que explicam dados pendentes. Sem tracking ou mapa embebido. Prova: testes unitários de validação/envio mock e resposta real indisponível sem configuração.

### Milestone 3: validação e entrega

Executar tipos, lint, conteúdo, testes, build. Abrir preview local e verificar desktop e larguras 320/375/390/768/1024/1440; menus, idiomas, galeria, formulário, erros, headings e foco. Não inventar Lighthouse/Core Web Vitals. Corrigir falhas observadas. Atualizar docs e plano. Sincronizar fonte com helper Sites, empacotar build dessa fonte, guardar/publicar privadamente e confirmar resultado terminal.

## Concrete Steps

Todos os comandos executam na raiz outputs/moveis-machado em PowerShell, Node 22.18 disponível. Setup real já executado com node C:/Users/lbotelho/.codex/plugins/cache/openai-curated-remote/sites/1.0.1/scripts/project-setup.mjs. Após fixar dependências, usar install-dependencies.mjs do mesmo diretório de scripts. Comandos de validação serão scripts package.json: npm run typecheck, npm run lint, npm test e npm run build; defini-los antes de executar. Preview: npm run dev. Sincronização/publicação: site-workflow.mjs com credencial exclusivamente stdin, comandos de build pendentes e archivePath absoluto. ID existente appgprj_6acbe5ff70c88191a937611cccc2b702 nunca será recriado.

## Validation and Acceptance

Cada página PT tem EN equivalente, html lang correto, canonical próprio e hreflang recíproco. Raiz encaminha PT; desconhecidas respondem 404. Projetos preservam identidade ao trocar idioma. Menu operável por teclado; galeria fecha Escape e devolve foco. Não há overflow nas larguras definidas. Nenhuma informação antiga em código publicado. Dados desconhecidos omitidos. Formulário não recolhe nem simula envio sem configuração, mostra feedback localizado e respeita erros. Conteúdo verifica IDs, slugs, traduções e ficheiros. Produção compila; fonte exata é guardada e publicada. Envio real, conformidade legal definitiva e performance em campo não podem ser certificados com os dados atuais.

## Idempotence and Recovery

Build e testes repetíveis. Não recriar Site. Reutilizar versão ou deployment ID após falha. Manter fonte e ficheiros de investigação; rollback por versão Sites anterior. Não alterar DNS/domínios ou site .com. Apagar apenas artefactos próprios quando necessário, após confirmar caminhos contidos na raiz. Segredos nunca em source, logs ou arquivos.

## Artifacts and Notes

Site criado privadamente com expected_url https://moveis-machado-atelier.grassymoth16.chatgpt.site; isto não é evidência de publicação. Business/research e legal docs serão provas de fontes. Relatório final registará resultados realmente executados.

## Interfaces and Dependencies

Locale='pt'|'en'; pageKey define equivalentes; Project possui id, categoria, ordem, published, featured, cover/gallery e traduções com slug/title/description/alt. business controla endereço, origem, indexação, canais e env. Endpoint aceita name/email/phone/type/message/locale/honeypot/token; responde JSON code/status, sem refletir segredos. Resend e Turnstile usam fetch servidor. Dependências essenciais React, Next APIs via Vinext, Vite/Cloudflare, TypeScript e ESLint; browser QA com Playwright se disponível. Sem CMS, base de dados, autenticação de aplicação ou modo escuro.

## Revision Notes

2026-10-11: plano inicial criado e criticamente revisto; adaptar alojamento ao Sites, retirar camadas desnecessárias e impedir lançamento enganoso com contactos desconhecidos.


2026-10-11 21:19 Europe/Lisbon: validação real incorporada. Descobertas: metadata streaming no corpo foi substituído por htmlLimitedBots /.*/ (fonte oficial Next.js); primeira resposta 404 do adaptador demorou 96 s e foi substituída por resposta localizada direta em proxy.ts. Todas as jornadas de produção passaram após correções. Usar WebP pré-gerado com img nativo é opção deliberada, sem otimização runtime. Artefactos: docs/validation.md e relatório Playwright em docs/qa-report.json. Publicação privada ainda pendente neste momento.

