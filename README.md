# Estúdio R — Cabelo & Beleza

Landing page em React, TypeScript e Vite para o Estúdio R, salão em Tietê/SP especializado em Mega Hair.

## Desenvolvimento local

Requer Node.js 20 ou superior.

```bash
npm install
npm run dev
```

Validação de produção:

```bash
npm run build
npm run preview
```

## Estrutura

- `src/App.tsx`: conteúdo, serviços, localização, CTAs e contatos.
- `src/HaircutScene.tsx`: animação do corte.
- `src/styles.css`: layout, responsividade e movimentos.
- `public/assets`: imagens otimizadas em WebP.
- `public/_headers`: cabeçalhos de segurança e cache do Cloudflare Pages.
- `public/_redirects`: fallback da SPA.
- `public/robots.txt` e `public/sitemap.xml`: indexação.
- `scripts/optimize_assets.py`: geração dos WebP e da imagem social.

## Publicar pelo GitHub e Cloudflare Pages

### 1. GitHub

Crie um repositório vazio no GitHub. Depois, no terminal desta pasta:

```bash
git add .
git commit -m "feat: lançar site do Estúdio R"
git remote add origin https://github.com/SEU-USUARIO/estudio-r.git
git push -u origin main
```

O workflow em `.github/workflows/ci.yml` valida todo push e pull request.

### 2. Cloudflare Pages

No painel Cloudflare, acesse **Workers & Pages → Create → Pages → Connect to Git** e selecione o repositório.

- Framework preset: `React (Vite)`
- Production branch: `main`
- Build command: `npm run build`
- Build output directory: `dist`
- Root directory: `/`
- Node version: `20`

O Cloudflare criará um endereço `*.pages.dev` e fará um novo deploy a cada push em `main`.

### 3. Domínio `salaoestudior.com`

Abra o projeto no Cloudflare Pages, acesse **Custom domains → Set up a domain** e informe `salaoestudior.com`. Como é um domínio raiz, a zona e os nameservers do domínio precisam estar no Cloudflare. Adicione também `www.salaoestudior.com` e configure um redirecionamento permanente para o domínio sem `www`.

## SEO e aquisição

O projeto contém canonical, Open Graph, Twitter Card, sitemap, robots, manifest, imagem social, dados estruturados `BeautySalon`, endereço, telefone e redes sociais.

Depois da publicação:

1. Cadastre e valide `https://salaoestudior.com` no Google Search Console.
2. Envie `https://salaoestudior.com/sitemap.xml`.
3. Atualize o Perfil da Empresa no Google com o mesmo nome, endereço, telefone e URL.
4. Configure Google Analytics ou Plausible para medir cliques nos CTAs do WhatsApp.
5. Solicite avaliações de clientes no Perfil da Empresa.

## Contatos públicos

Os links oficiais ficam no início de `src/App.tsx`: `WHATSAPP_NUMBER`, `INSTAGRAM_URL` e `FACEBOOK_URL`.
