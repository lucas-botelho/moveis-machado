# Issue #4 — baseline de desempenho

Medição laboratorial do site publicado no GitHub Pages, realizada em 2026-10-14. Ferramentas: Lighthouse CLI 13.5.0 e Chrome Headless 155. Cada rota e dispositivo teve duas execuções; valores abaixo são medianas (ou média das duas observações no caso de CLS e valores com duas casas), arredondadas. TBT é Total Blocking Time de laboratório, não INP nem um Core Web Vital de utilizadores reais.

| Rota      | Dispositivo | Score | LCP (ms) |   CLS | TBT (ms) | FCP (ms) | Transferência (KiB) |
| --------- | ----------- | ----: | -------: | ----: | -------: | -------: | ------------------: |
| Início    | Mobile      |    75 |    4 831 | 0,008 |       18 |    3 218 |                 972 |
| Início    | Desktop     |    98 |      997 | 0,001 |        0 |      863 |                 973 |
| Serviços  | Mobile      |    87 |    2 959 |     0 |        5 |    2 910 |                 571 |
| Serviços  | Desktop     |   100 |      508 | 0,002 |        0 |      508 |                 571 |
| Projetos  | Mobile      |    87 |    2 963 |     0 |        0 |    2 963 |                 688 |
| Projetos  | Desktop     |    99 |      917 | 0,002 |        0 |      505 |                 688 |
| Contactos | Mobile      |    68 |    5 819 |     0 |        5 |    3 926 |                 660 |
| Contactos | Desktop     |   100 |      526 | 0,008 |        0 |      526 |                 858 |

## Diagnóstico

- Homepage: LCP é a imagem hero (`body > main > section.hero > img`), já presente no HTML e com prioridade alta. A auditoria estima cerca de 1 873 ms de atraso de renderização do elemento, contra aproximadamente 273 ms para descarregar a imagem. O conteúdo principal tem animação `.entrance` que começa invisível.
- Serviços e Contactos: o LCP é o H1, com cerca de 2 084 ms e 2 076 ms de atraso de renderização, respetivamente; ambos pertencem ao bloco `.page-heading.entrance`.
- Projetos: o LCP é a primeira fotografia real da galeria. O recurso tinha cerca de 1 070 ms de atraso antes de começar a carregar e todos os itens eram `loading="lazy"`, incluindo o primeiro elemento visível.
- As métricas móveis são mais lentas que desktop; TBT baixo sugere que JavaScript bloqueante não é o gargalo principal desta captura. As folhas e ficheiros de Google Fonts são pedidos globais em todas as rotas e contribuem com transferência e origem externa.
- CLS mediano é baixo em todas as rotas (0–0,008), consistente com dimensões/proporções já reservadas para imagens e mapa. O mapa permanece uma questão de consentimento sob a issue #7.

## Método e limitações

Rotas: `/`, `/services?lang=pt`, `/projects?lang=pt` e `/contact?lang=pt`, no domínio `https://lucas-botelho.github.io/moveis-machado/`. O relatório original completo foi guardado temporariamente em `.tmp/issue-4-perf` e não deve ser versionado por conter capturas de página e dados de auditoria desnecessários. A API pública PageSpeed Insights não forneceu resultado por quota diária indisponível (HTTP 429); o baseline foi obtido pelo CLI local.

Este domínio é o GitHub Pages indicado no README, mas ainda não foi confirmado como domínio canónico da empresa. Não há medição de campo CrUX/Search Console. Repetir com a mesma versão/configuração e duas passagens após as alterações; comparar direções e magnitudes, considerando variabilidade da rede/CDN. Não remover outliers sem registo.

## Pós-alteração local

Medição em 2026-10-14 do build desta branch servido localmente (`http://127.0.0.1:4174/`), com as mesmas versões e duas passagens por combinação. Serve para confirmar o comportamento dos recursos e regressões óbvias, mas não é diretamente comparável ao baseline publicado: a origem, RTT, cache e resposta do servidor são diferentes.

| Rota      | Dispositivo | Score | LCP (ms) |   CLS | TBT (ms) | FCP (ms) | Transferência (KiB) |
| --------- | ----------- | ----: | -------: | ----: | -------: | -------: | ------------------: |
| Início    | Mobile      |    77 |    5 301 | 0,016 |        4 |    2 584 |                 987 |
| Início    | Desktop     |    99 |      993 | 0,001 |        0 |      573 |                 987 |
| Serviços  | Mobile      |    96 |    2 487 |     0 |        0 |    2 112 |                 579 |
| Serviços  | Desktop     |   100 |      551 | 0,002 |        0 |      491 |                 579 |
| Projetos  | Mobile      |    91 |    3 201 |     0 |        0 |    2 114 |                 697 |
| Projetos  | Desktop     |   100 |      712 | 0,002 |        0 |      492 |                 697 |
| Contactos | Mobile      |    98 |    1 963 |     0 |        0 |    2 113 |                 668 |
| Contactos | Desktop     |   100 |      493 | 0,009 |        0 |      493 |                 865 |

O HTML medido de Projetos confirma a primeira foto com `loading="eager"` e `fetchpriority="high"`. A rota doméstica e restantes rotas não têm pedidos de `fonts.googleapis.com` ou `fonts.gstatic.com`; os pedidos de fontes passaram a same-origin. A homepage e Projetos não demonstram redução consistente de LCP nesta comparação origem diferente, pelo que não se declara esse ganho. Contactos e Serviços apresentam menores LCP/FCP, sujeito à mesma limitação de origem. O bundle JavaScript cliente mantém tamanho equivalente (396,68 kB, 126,84 kB gzip) ao baseline anterior citado; as novas famílias são ficheiros WOFF2 estáticos.

Próximo passo de medição comparável: obter preview HTTPS da branch ou publicar uma implantação de preview aprovada e executar novamente a mesma matriz nela, sem usar `main` para teste. O mapa continua a carregar no contacto e é um pedido terceiro fora do âmbito técnico desta fase até integrar a gestão de consentimento da issue #7.
