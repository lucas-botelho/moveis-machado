# Móveis Machado — SEO, pesquisa por IA e migração

Pesquisa oficial em 11 de outubro de 2026. A estratégia privilegia informação verificável, páginas úteis e HTML disponível aos motores de pesquisa. Não promete posições, indexação, rich results ou citações por sistemas de IA.

## Estado e domínio

A pré-visualização mantém indexação desativada até domínio e lançamento serem confirmados. O `.pt` é uma proposta; não prova de propriedade. Nenhum canonical de produção deve depender de um domínio assumido. Configurar a origem pública única antes do lançamento. `robots.txt` não é controlo de acesso: a pré-visualização pode exigir proteção própria da plataforma. Para excluir indexação, aplicar `noindex`; o motor tem de conseguir ler essa diretiva, pelo que bloquear apenas crawling não basta. [Google: noindex](https://developers.google.com/search/docs/crawling-indexing/block-indexing).

## Rotas e equivalência bilingue

- `/` encaminha de forma estável para `/pt`; URLs inglesas continuam acessíveis diretamente.
- Páginas PT e EN têm URLs próprias, slug localizado quando aplicável, título e descrição na sua língua, canonical autorreferente e `html lang` de `pt-PT` / `en`.
- Cada par inclui alternates recíprocos `pt-PT`, `en` e `x-default`; `x-default` aponta à versão PT equivalente quando ela é o destino padrão. Os alternates incluem a própria página e usam URLs absolutas da origem confirmada.
- Não canonicalizar o inglês para português. A identidade estável do projeto liga os dois slugs e permite troca de língua sem perder contexto.
- Sitemap lista as 30 páginas reais e canónicas para validação nesta apresentação privada. Não é anunciado em robots enquanto a indexação está desativada. No lançamento lista as mesmas páginas publicadas/indexáveis, sem erros, formulário API ou conteúdo em falta. `lastmod` reflete alteração real de conteúdo, sem data artificial a cada build.

As anotações podem ser realizadas em HTML, headers ou sitemap; não há benefício de ranking em duplicar os três mecanismos. Escolher implementação que possa ser validada sem inconsistências. [Google: versões localizadas](https://developers.google.com/search/docs/specialty/international/localized-versions).

## Conteúdo e intenção

| Página              | Intenção e temas PT                                        | Intenção e temas EN                    | Evidência/conversão                                                           |
| ------------------- | ---------------------------------------------------------- | -------------------------------------- | ----------------------------------------------------------------------------- |
| Início              | Fabricante de móveis por medida em Odivelas; Grande Lisboa | Bespoke furniture in Lisbon / Odivelas | Atividade e localização verificadas, seleção de trabalhos, pedido de contacto |
| Cozinhas            | Cozinhas por medida Lisboa / Odivelas                      | Bespoke kitchens Lisbon                | Explicar opções, planeamento, materiais apenas confirmados; exemplos reais    |
| Roupeiros           | Roupeiros por medida                                       | Custom wardrobes Lisbon                | Aproveitamento de espaço e configuração sem prometer opções não confirmadas   |
| Mobiliário / portas | Móveis por medida; portas interiores                       | Bespoke furniture; interior doors      | Escopo real e imagens relevantes; criar página só com conteúdo suficiente     |
| Projetos            | Ver trabalhos, comparar estilos e soluções                 | Custom furniture projects              | Fotos autênticas, descrição fiel, links à categoria e contacto                |
| Sobre               | História e capacidade de fabrico                           | About the manufacturer                 | Declarações do briefing devem ser reconfirmadas; sem equipa/fábrica inventada |
| Contactos           | Como pedir orçamento e chegar a Odivelas                   | Request a quote / directions           | Dados novos verificados, morada e formulário configurado                      |

Estes temas refletem a oferta e intenção provável, não volumes medidos nem pesquisa quantitativa de palavras-chave. Não criar páginas repetidas por município. Não publicar localizações individuais de projetos, datas, materiais ou durações que as fontes não estabeleçam. As FAQs respondem dúvidas úteis e não são apresentadas como garantia de resultados enriquecidos.

## Metadados e dados estruturados

Títulos únicos combinam assunto e marca; descrições são naturais na língua da página. Open Graph usa URL atual, locale, título, descrição e imagem com direitos confirmados. Alt descreve a imagem, sem repetição artificial de cidades/palavras-chave. Links internos reais unem serviços, trabalhos e contacto. Hierarquia de headings e breadcrumbs tornam a informação legível.

Usar JSON-LD `LocalBusiness` para a atividade local de fabrico por medida, em vez de assumir `FurnitureStore` sem confirmar retalho. `LocalBusiness` já expressa uma organização local; um identificador `@id` estável evita criar entidades concorrentes. Incluir `WebSite`, `BreadcrumbList` e `Service` onde o conteúdo justifica, sem presumir que todo tipo Schema.org gera rich result no Google. [Schema.org: LocalBusiness](https://schema.org/LocalBusiness).

Dados estruturados correspondem ao texto visível e incluem só factos verificáveis: marca, URL e morada. Omitir telefone/email antigos, horas incompletas, geocoordenadas aproximadas e qualquer `AggregateRating` de autorreferência. `sameAs` usa perfis oficiais confirmados; não inventar uma ficha Maps. Validar com Rich Results Test e Schema Markup Validator; validação técnica não garante apresentação em pesquisa. [Google: LocalBusiness](https://developers.google.com/search/docs/appearance/structured-data/local-business).

## Pesquisa por IA e crawlers

Após lançamento, permitir crawling normal e acesso a `OAI-SearchBot` para descoberta em ChatGPT Search. `GPTBot` tem finalidade de treino e configuração independente; pode ser bloqueado sem bloquear Search. `ChatGPT-User` corresponde a visitas desencadeadas pelo utilizador e não controla indexação Search. Auditar também CDN/firewall; uma regra permissiva no ficheiro não basta se a infraestrutura recusar o crawler. Estas permissões não garantem uma citação. [OpenAI: crawlers](https://developers.openai.com/api/docs/bots).

Política proposta para produção, a confirmar na configuração de indexação:

```text
User-agent: OAI-SearchBot
Allow: /

User-agent: GPTBot
Disallow: /

User-agent: *
Allow: /
```

Adicionar a linha `Sitemap` com o domínio real apenas após confirmação. Em pré-visualização aplicar as regras de não indexação da plataforma. Não publicar detalhes de contacto por confirmar para melhorar artificialmente cobertura.

Google AI Overviews/AI Mode reutilizam fundamentos de SEO; a documentação não exige novos ficheiros de IA ou schema especial. Conteúdo importante em texto, links internos, dados estruturados coerentes e perfil empresarial atualizado são prioridades. `Googlebot` gere acesso à pesquisa; `Google-Extended` trata outros usos de IA. Não incluir `llms.txt` nesta versão: não há benefício demonstrado para este caso que justifique manter uma fonte redundante. [Google: funcionalidades de IA](https://developers.google.com/search/docs/appearance/ai-features).

## Migração `.com` → domínio confirmado

1. Obter confirmação de propriedade/administração de ambos os domínios e autorização específica para migração/DNS. Não alterar infraestrutura durante preparação.
2. Inventariar URLs antigas, imagens, backlinks e conteúdo, com Search Console se o titular der acesso. Mapa mínimo: `/` e `/index.html` para `/pt`; `/gallery.html` para `/pt/projetos`. Só criar mapeamentos adicionais após inventário; evitar redirecionar tudo para homepage.
3. Preservar conteúdo útil e ativos autorizados, publicar nova versão e testar rotas PT/EN, metadados, status 404 e ausência de dados históricos.
4. Configurar redirects permanentes 301/308 de cada URL antiga para equivalente final, sem cadeias nem loops; manter domínio antigo e TLS ativos. O root do novo site encaminha para PT, enquanto alternates usam as rotas finais.
5. Atualizar canonical, `hreflang`, sitemap, links internos e URLs de imagens para origem final; remover `noindex` de produção e verificar crawling real.
6. Verificar propriedades antiga e nova na Search Console; executar Change of Address quando suportado/aplicável e autorizado; submeter sitemap. Pedir ao titular atualização da ficha Business Profile e Facebook com contactos atuais e website final.
7. Monitorizar erros/indexação e tráfego de pesquisa durante a transição. Manter redirects pelo menos um ano; URLs com tráfego/backlinks podem justificar manutenção mais longa. Guardar configuração anterior para rollback.

Mudanças de domínio podem provocar flutuação temporária; sitemap e redirects ajudam o processo, sem garantir calendário. [Google: migração com alteração de URLs](https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes).

## Validação antes de indexar

- HTML de cada rota contém conteúdo e metadados corretos sem depender apenas de navegação JavaScript. Validar o resultado servido pela infraestrutura real.
- Cada alternate resolve com sucesso, retorna reciprocidade e mantém identidade do projeto; desconhecidos retornam 404.
- Sitemap/canonical/OG usam exatamente a origem final; legal e contacto estão completos.
- Imagens têm dimensões, compressão e loading proporcionado; medir desempenho real e não inferir Core Web Vitals apenas de build/Lighthouse.
- Preview permanece excluída, produção está indexável e crawlers não recebem desafio de firewall indevido.
- Registar resultados no relatório de QA. Esta estratégia não atesta a validação de uma implantação pública ainda não autorizada.

Configuração final: htmlLimitedBots /.*/ serve metadata no head inicial a todos os visitantes, evitando dependência de streaming para este conteúdo local. Opção suportada pelo adaptador e verificada em HTML/navegador. Fonte: https://nextjs.org/docs/app/api-reference/config/next-config-js/htmlLimitedBots. Desconhecidos e raiz são resolvidos diretamente em proxy.ts para status 404/308 imediato.
