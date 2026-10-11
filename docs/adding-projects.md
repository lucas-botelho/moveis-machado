# Adicionar trabalhos

1. Confirmar direitos da fotografia e factos do trabalho. Não adicionar obras fictícias, datas, localizações ou materiais sem prova.
2. Guardar originais/proveniência em public/images/legacy ou arquivo autorizado separado. Gerar WebP sem EXIF em public/images/projects: `<nome>-800.webp` e `<nome>-1600.webp`, mantendo proporções.
3. Adicionar objeto a src/content/projects.json com id único, category (atualmente kitchens), published, featured, order, coverImage e gallery. A galeria deve incluir a capa.
4. Preencher translations.pt e translations.en: slug, title, shortTitle, description e alt. Slugs únicos em cada idioma, letras minúsculas e hífen. O id liga ambos os URLs. Não publicar ficha técnica inventada.
5. Executar `npm run validate:content`, `npm test`, `npm run typecheck` e `npm run build`. Inspecionar nova obra e troca de idioma. Validação deteta duplicados, traduções e imagens em falta.
6. Commit/push para repositório de alojamento e publicar versão correspondente pelo fluxo Sites. CI externo pode automatizar após configuração; não está configurado nesta entrega.

As rotas, sitemap, relacionados e galeria derivam dos dados. Não há base de dados ou CMS. Para criar outra categoria de obras, alargar tipo em src/content/index.ts, regra do validador e rótulos/filtros; manter conteúdo PT/EN equivalente.
