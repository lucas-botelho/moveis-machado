# Alojamento e operação

Esta entrega usa Sites com Cloudflare Workers e o adaptador Vinext do starter suportado. Next 16.4.0/React 19.2.6/TypeScript; Vinext 1.0.0-beta.5 é uma dependência beta do fluxo Sites, risco documentado. Server rendering fornece HTML completo e metadata, com JS cliente apenas nos menus, filtros, galeria e formulário. Os dados e imagens são versionados. Não há persistência de leads na aplicação.

## Ambiente local

Node >=22.13, npm e Git. Na raiz: `npm ci`, copiar .env.example para .env.local se necessário, `npm run dev`; URL http://127.0.0.1:5173. `npm run build` gera dist/client e dist/server; `npm start` serve o Worker local de produção. Windows sandbox pode impedir o motor workerd; executar com permissões locais normais. Neste ambiente, os shims npm invocados por helpers apontaram ao caminho errado; a instalação/build foi feita por entrypoints Node reais, sem alterar o código do framework para contornar erros.

## Variáveis

BUSINESS_PHONE e BUSINESS_WHATSAPP: número confirmado em formato internacional E.164 com +. BUSINESS_EMAIL: canal público confirmado. Vazios escondem botões. SITE_URL: origem HTTPS confirmada sem barra final, usada em canonical/OG/sitemap/JSON-LD. ALLOW_INDEXING=false durante apresentação privada.

CONTACT_ENABLED=true e LEGAL_APPROVED=true apenas após revisão. RESEND_API_KEY, CONTACT_FROM e CONTACT_TO são exclusivamente servidor; remetente verificado, destinatário novo. TURNSTILE_SITE_KEY público e TURNSTILE_SECRET_KEY privado; permitir hostname definitivo. O widget só é carregado quando toda a configuração de contacto está pronta. No Sites usar gestão de variáveis de ambiente; segredos marcados como secret, nunca no hosting.json/Git. Republicar versão após alterar ambiente para aplicar revisão.

O endpoint verifica origem, JSON, tamanho limitado durante leitura, campos, honeypot e token Turnstile (hostname e action=contact). O desafio de utilização única e idempotência do provider oferecem proteção contra reenvio; não se afirma existir limite de IP distribuído. Não regista corpos ou dados pessoais nos logs. Envios só mostram sucesso depois da aceitação Resend. Aceitação não prova chegada à caixa de correio; testar entrega real após configuração. Avaliar limites adicionais do alojamento se o volume exigir.

## Publicação Sites

Reutilizar project_id de .openai/hosting.json. Fluxo: verificar → build → helper site-workflow com credencial em stdin → commit/push verificado + arquivo → save_version_and_deploy_private para audiência privada confirmada → estado terminal. Não recriar Site. As versões e o Git permitem rollback para artefacto anterior. Alterar audiência só com instrução explícita. Esta entrega publica privadamente.

O repositório fonte Sites recebe a versão desta entrega. A sequência editar → commit → push → deployment automático exige um pipeline adicional ou funcionalidade publish-on-push explicitamente configurada; não foi ativada. Por defeito esta entrega guarda e publica por chamadas Sites. Não existe promessa de CI automático já instalado.

## Domínio/migração

Antes de usar moveismachado.pt, confirmar titularidade (existem nameservers), alojamento público e suporte a domínio personalizado. Não presumir que Sites privado aceita este domínio. Alternativa: adaptar o projeto para Next.js nativo/Vercel (substituir scripts build/dev/start por next, retirar Vite/Sites build infrastructure, preservar app/content, testar proxy e env). Esse caminho é documentação de migração, não uma segunda implantação testada.

Depois de autorização: configurar domínio/HTTPS no fornecedor, aplicar DNS indicado por esse fornecedor, SITE_URL definitivo, ativar indexação e verificar metadados. No servidor .com: 301 / → /pt e /gallery.html → /pt/projetos; mapear outros URLs inventariados individualmente. Manter redirects, não apenas um link. Search Console para ambas propriedades, sitemap, mudança de endereço quando aplicável, atualizar Business Profile e Facebook, evitar duas versões indexadas.

## Custos e manutenção

Sem base de dados, CMS, contas ou processamento de imagens por pedido. Custos dependem do plano Sites/Cloudflare, domínio e envio; confirmar preços/quotas na conta no lançamento, sem estimativas monetárias assumidas. Rever build/dependências antes de atualizações, disponibilidade do formulário e delivery failures. Não recolher dados pessoais em monitorização. Conteúdo atualiza-se em messages e src/content; fotografias em public/images/projects. Rever direitos/retention após alterações. Após incidente usar rollback, manter contacto indisponível se entrega falhar e verificar nova versão antes de ativar.
