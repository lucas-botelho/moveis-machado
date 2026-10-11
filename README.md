# Móveis Machado

Website bilingue PT-PT/EN para apresentação de serviços e portefólio, com tema claro, fotografias reais otimizadas, galeria acessível e contactos com configuração segura. Implementação Sites/Vinext, App Router, TypeScript e React. Sem CMS, autenticação de aplicação, base de dados ou tracking de marketing.

## Começar

Node >=22.13 e npm. Na raiz deste projeto:

```sh
npm ci
npm run dev
```

Abrir http://127.0.0.1:5173/pt. Para testar build: `npm run build`, depois `npm start` (Worker local). A origem privada de apresentação é https://moveis-machado-atelier.grassymoth16.chatgpt.site. Consulte docs/validation.md para os resultados observados e limitações.

```sh
npm run validate:content
npm run typecheck
npm run lint
npm test
```

Testes de navegador: instalar Chromium com `npx playwright install chromium`; executar `npm run test:browser` com servidor iniciado. Alternativa no Windows com Edge instalado: definir PLAYWRIGHT_CHANNEL=msedge. TEST_URL escolhe servidor (default 5173); QA_OUTPUT escolhe diretório dos relatórios. Não executa envio real.

## Páginas e idiomas

São 30 URLs: início, projetos, quatro serviços, sobre, contactos, privacidade, informação legal e acessibilidade, mais quatro trabalhos, em ambos os idiomas. `/` encaminha para `/pt`; por exemplo `/pt/cozinhas-por-medida` ↔ `/en/bespoke-kitchens`, `/pt/projetos/cozinha-com-ilha` ↔ `/en/projects/kitchen-with-island`. Tabela central em src/i18n/routes.mjs e identidade de projeto preservam a troca. Conteúdo renderizado no servidor; canonical próprio, hreflang recíproco e sitemap. A apresentação privada usa noindex e robots restritivo.

## Alterar conteúdo

messages/pt-PT.json e messages/en.json guardam interface e textos gerais. src/content/index.ts guarda serviços. src/content/projects.json define obras e traduções; imagens em public/images/projects. Veja docs/adding-projects.md para adicionar imagens, capa, tradução e validar. Hero e seleções iniciais pressupõem as obras existentes; ao remover todas, atualizar Home e About para um estado sem fotografias em vez de deixar referências.

## Contactos e envio

Copiar .env.example para .env.local em desenvolvimento. Configuração central em src/content/business.ts. BUSINESS_PHONE, BUSINESS_EMAIL e BUSINESS_WHATSAPP apenas com dados atuais verificados; números em E.164 com +. Vazios escondem canais. O contacto antigo não foi reutilizado.

Envio: CONTACT_ENABLED e LEGAL_APPROVED, RESEND_API_KEY, CONTACT_FROM (remetente verificado), CONTACT_TO (destinatário atual), TURNSTILE_SITE_KEY e TURNSTILE_SECRET_KEY. No Sites, guardar valores no ambiente do projeto, segredos marcados como secret e republicar. Nunca no browser/hosting.json/Git. Sem configuração completa, campos estão desativados e API responde 503. Proteções: validação dupla, origem, limite durante leitura, honeypot, desafio verificado, idempotência e timeouts. Só aceitação Resend gera sucesso. Envio real permanece por testar.

## Alojamento e manutenção

Ver docs/deployment.md. A entrega usa versão privada Sites e arquivo de build da fonte sincronizada. Não foi alterado DNS nem o site .com. GitHub Actions de validação está preparado; não se afirma que um repositório GitHub ou pipeline de deployment automático externo esteja conectado. A manutenção automática edit→commit→push→deploy necessita configuração no alojamento escolhido. O fluxo Sites desta entrega guarda e publica uma versão exata.

## Documentação

- docs/execplan.md — plano de execução e decisões.
- docs/business-research.md / competitor-analysis.md — negócio, seis concorrentes, factos e proveniência.
- docs/information-architecture.md / design-system.md — sitemap e direção visual.
- docs/seo-strategy.md / legal-compliance.md — pesquisa oficial e implementação.
- docs/adding-projects.md / deployment.md — operação e configuração.
- docs/launch-checklist.md — lista central de confirmações.
- docs/validation.md — evidências e limites.

## Pendências reais

Contactos atuais, WhatsApp, identidade jurídica, dados do responsável RGPD/retenção, RAL/Livro, direitos e identificação de fotografias, confirmação de serviços, domínio .pt e autorização da migração .com, credenciais e entrega de email. Horários incompletos são omitidos. Os textos legais atuais identificam a apresentação privada e deverão ser finalizados para a entidade verdadeira antes da recolha/lançamento. Não há testemunhos, estrelas, datas ou localizações de obras inventadas. Vinext é o adaptador beta suportado pelo starter Sites; alternativa Next/Vercel está documentada, não implantada nem testada como segundo alojamento.
