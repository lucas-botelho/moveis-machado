# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Público principal inferido a partir da cópia existente: clientes particulares na Grande Lisboa que procuram cozinhas, roupeiros ou mobiliário por medida e querem conhecer o trabalho antes de pedir orçamento. Esta inferência aguarda confirmação do responsável do produto.

## Product Purpose

Apresentar a Móveis Machado, os serviços de fabrico próprio e projetos reais, explicar o processo e facilitar um pedido de orçamento ou visita à oficina em Odivelas. O sucesso principal inferido é o visitante compreender a oferta e iniciar um contacto informado; esta prioridade aguarda confirmação do responsável do produto.

## Positioning

A empresa apresenta mais de 40 anos de experiência, fabrico próprio em Odivelas e acompanhamento do desenho à instalação. Estes são factos já usados na cópia do produto; novas afirmações comerciais não devem ser inventadas.

## Operating Context

O visitante navega entre serviços, projetos, história e contactos em português europeu ou inglês. Pode abrir o WhatsApp, obter direções externas ou, mediante consentimento, carregar um mapa incorporado. A seleção de idioma usa o parâmetro `lang` e deve permanecer nos links internos.

## Capabilities and Constraints

- Site público bilingue construído com React, TanStack Router/Start e Vite.
- O chrome e as secções partilhadas vivem em `src/components/site.tsx`; a cópia bilingue vive em `src/lib/site-content.ts`.
- O site está ligado à Lovable; não reescrever histórico Git publicado e manter branches sincronizadas em estado funcional.
- Fotografias de projeto são trabalhos reais da marca. Imagens geradas ou de inspiração nunca podem ser apresentadas como obra concluída.
- Dados legais e empresariais não confirmados permanecem decisões abertas. As Políticas de Privacidade e Cookies exigem aprovação do responsável antes de publicação.

## Brand Commitments

Preservar o nome Móveis Machado, a marca existente em `src/assets/brand-mark.svg`, o português europeu como idioma principal, a tradução inglesa informativa e a distinção explícita entre inspiração e portefólio real.

## Evidence on Hand

- Fotografias de portefólio em `src/assets/kitchen-*.webp`.
- Imagens de inspiração identificadas como tal em `src/assets/interior-hero.jpg` e `src/assets/material-study.jpg`.
- Conteúdo de serviços e processo em `src/lib/site-content.ts`.
- Inventário técnico parcial de privacidade em `docs/execplans/issue-6.md` e requisitos de consentimento em `docs/execplans/issue-7.md`.
- Não existem no repositório aprovação jurídica/empresarial final, testemunhos, preços, certificações ou prazos que possam ser acrescentados por inferência.

## Product Principles

- Descrever apenas serviços, projetos e práticas verificáveis.
- Tornar o pedido de orçamento claro sem criar pressão ou promessas não confirmadas.
- Preservar a continuidade bilingue e a identidade partilhada em todas as rotas.
- Dar ao visitante controlo real sobre terceiros e armazenamento opcional.
- Manter a experiência principal funcional sem consentimento não essencial.

## Accessibility & Inclusion

A interface deve funcionar por teclado, leitor de ecrã e em mobile, com texto legível, foco visível e escolhas de consentimento equivalentes. Rejeitar e retirar consentimento devem ser tão simples como aceitar.
