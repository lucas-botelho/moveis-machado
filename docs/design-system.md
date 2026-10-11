# Sistema visual

Direção editorial de interiores: fundo off-white #f7f5ef, creme #ebe6dc, tinta #2c302b, madeira #705840, texto secundário #5e6057. O contraste dos textos sobre a faixa CTA foi refinado após deteção automática. Georgia em títulos e itálico, Arial no corpo/interface: fontes do sistema, sem pedidos a terceiros nem licenças adicionais de webfont.

Hero com título amplo e fotografia real em faixa panorâmica. Fotografias, espaço em branco e linhas finas organizam a leitura. Não há carrossel automático ou efeitos que impeçam o acesso ao conteúdo. O monograma é um elemento gráfico criado para esta apresentação, não uma alegação de logótipo oficial existente.

Componentes: navegação curta, seletor PT/EN, botão retangular, cartões de projeto, serviço editorial, processo numerado, FAQ nativa details/summary, diálogo nativo de galeria e formulário com labels. Serviços sem fotografias verificadas usam desenhos vetoriais explicitamente identificados como ilustrações.

Responsividade: navegação móvel abaixo de 980 px, secções empilhadas abaixo de 700 px, hero adapta texto e fotografia. Focus-visible com contorno visível, skip link, áreas de toque, Escape para menu/galeria e prefers-reduced-motion. Uma só aparência clara.

Imagens WebP pré-geradas 800/1600, srcset, dimensões, eager/fetchPriority no hero, lazy abaixo da dobra. O uso de img nativo é deliberado: evita transformação runtime e custo adicional. A regra no-img-element é desligada apenas nos dois componentes que implementam esta estratégia; as restantes regras de lint continuam ativas.
