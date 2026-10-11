# Validação observada

Executada em 11 de outubro de 2026, Europe/Lisbon, Windows/Node 22.18. Produção Vinext/Cloudflare Worker local, não uma estimativa a partir da compilação.

| Verificação | Resultado real |
|---|---|
| TypeScript `tsc --noEmit` | Passou |
| ESLint completo | Passou, sem erros ou avisos após regra de img justificada e limitada |
| Validação de conteúdo | Quatro trabalhos, 30 URLs, traduções e imagens presentes |
| Testes Node | 15 passaram, zero falhas |
| Build de produção | Passou, dist/client + dist/server |
| Playwright, Edge headless | 30 rotas, 42 verificações responsivas, cinco jornadas passaram |
| Axe regras WCAG A/AA 2.0/2.1/2.2 | 22 páginas base, zero violações detetadas nas regras testadas |
| Larguras | 320/375/390/768/1024/1440/1920, sem overflow em seis páginas representativas |
| Erros JS nas jornadas | Zero |
| Metadados | Canonical próprio, pares hreflang, idioma, JSON-LD e metadados no head inicial verificados |
| Erros e configuração | 404 PT/EN/idioma desconhecido, raiz 308 para PT, API 503 sem configuração, ausência de canais falsos |

Jornadas: menu mobile/Escape, navegação, filtro de cozinhas com ilha, galeria/setas/Escape/restauro de foco, idioma por identidade de projeto, campos/botões de contacto desativados, sitemap de 30 URLs e robots restritivo. Os testes de email usam respostas simuladas do provider para aceitação/rejeição; não enviam mensagens reais nem provam entrega. Turnstile real/configuração de conta por testar.

Lighthouse mobile simulado, página /pt em produção local: **Performance 98, Accessibility 100, Best Practices 100, SEO 69; LCP 2,1 s, CLS 0**. No relatório final, o único audit SEO com score zero é is-crawlable, deliberadamente devido a noindex/nofollow e robots restritivo. Não ativar indexação da apresentação privada para obter uma pontuação maior. A primeira medição tinha descrição no corpo e SEO 58; foi corrigida para metadados no head com htmlLimitedBots. A pontuação final não deve ser apresentada como uma medição pública de produção. INP e Core Web Vitals em campo não foram medidos; Lighthouse é laboratório, não garantia.

Foi observada uma demora no primeiro 404 do adaptador (96 s), resolvida com resposta localizada direta em proxy.ts; depois a jornada 404 passou. A configuração de metadata também deixou de lançar erro para caminhos desconhecidos. Preview dentro da sandbox inicialmente não arrancou; permissões locais normais permitiram testes. Não há alterações no pacote do framework para contornar estes casos.

Inspeção visual: hero desktop, versão móvel e formulário EN, com imagens reais e sistema visual claro. Capturas integrais exigem carregar imagens lazy antes da fotografia; isso é feito apenas na captura de QA, a aplicação mantém lazy loading. Os assets WebP são validados por ficheiro e foram verificados sem EXIF.

Limites: não certifica WCAG; falta avaliação completa com leitores de ecrã, email real, dados jurídicos definitivos, direitos de fotografia, domínio/migração e acessibilidade legal aplicável. Ver docs/launch-checklist.md. A alternativa Vercel/Next nativa e o pipeline de deployment automático externo não foram implantados. CI de validação está preparado, não conectado a uma conta GitHub por esta tarefa.
