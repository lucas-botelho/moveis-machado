# Publicação no GitHub Pages

Repositório: https://github.com/lucas-botelho/moveis-machado (público, autorizado pelo utilizador após verificação de GitHub Free).
Site: https://lucas-botelho.github.io/moveis-machado/.
Workflow: .github/workflows/pages.yml; branch main; environment github-pages.

## Publicação contínua

Um push para main executa npm ci, valida conteúdo, TypeScript, ESLint e 15 testes de lógica/segurança. O alvo build:pages usa Vite para o JavaScript/CSS e React DOM para pré-renderizar as 30 páginas com os mesmos componentes da aplicação Worker. As interações são hidratadas no navegador. Inclui metadata inicial, idioma html, canonical/hreflang, imagens locais, sitemap, robots, raiz com encaminhamento HTML e 404.html.

Antes de publicar, o workflow instala Chromium e executa testes reais de 30 rotas, 30 scans Axe, 12 verificações responsivas e jornadas de menu, filtro, galeria, foco, idioma e contactos. Só após sucesso carrega o artefacto Pages e faz deploy OIDC com permissões pages:write/id-token:write. Não precisa de token pessoal, chaves privadas ou segredos de email no workflow. Pull requests não publicam. Publicação manual em Actions > Validate and deploy GitHub Pages > Run workflow.

## Limitações deliberadas

GitHub Pages serve ficheiros estáticos e não executa /api/contact. O build estático força CONTACT_ENABLED=false; os campos ficam desativados e não existe recolha nem envio simulado. Configurar email real exige um serviço de servidor, já preparado no alvo Worker. Os canais empresariais atuais ainda estão vazios. Não guardar credenciais em variáveis públicas.

A publicação foi solicitada e autorizada; noindex permanece por defeito até validação dos dados empresariais e textos legais. Direitos de reutilização de fotografias e identificação jurídica continuam documentados como pendentes. A autorização operacional para publicar não constitui certificação jurídica. Nenhum domínio próprio ou DNS foi alterado. O Sites anterior conserva o seu acesso privado.

## Manutenção e recuperação

Editar os mesmos ficheiros de conteúdo e tradução, executar as verificações e enviar um commit a main. O workflow substitui o site apenas depois de validação aprovada. Para recuperar uma versão, reverter o commit problemático e enviar o revert; Actions republica. Não fazer force-push. PAGES_ORIGIN e PAGES_BASE_PATH controlam origem e prefixo do alvo estático; ambos estão explícitos no workflow.

Para validar localmente no Windows com Edge, definir PLAYWRIGHT_CHANNEL=msedge antes de npm run test:pages. O teste inicia e termina o seu próprio servidor local. PAGES_TEST_URL permite repetir o mesmo teste contra o site publicado. Relatório local: work/pages-qa/report.json (não versionado).

## Fontes do alojamento

[GitHub Pages e recolha de IP para segurança](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages). [Publicação por Actions e permissões OIDC](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages).

## Estado

Publicação automática confirmada: build e deploy aprovados em https://github.com/lucas-botelho/moveis-machado/actions/runs/38176127421, commit 8003273. As 30 rotas, 30 scans Axe, 12 verificações responsivas e interações passaram no Chromium do GitHub Actions. A compilação do alvo Worker também passou localmente. Ajustes finais de metadata e documentação seguem no commit posterior com publicação automática pelo mesmo workflow.
