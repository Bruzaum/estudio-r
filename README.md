# Estúdio R — Cabelo & Beleza

Landing page oficial do **Estúdio R**, salão de beleza localizado em Tietê, São Paulo, com especialização em Mega Hair.

[Acessar o site](https://salaoestudior.com/)

![Prévia do Estúdio R](public/og-image.jpg)

## Sobre o projeto

O site apresenta os serviços e diferenciais do Estúdio R por meio de uma experiência visual responsiva, com animações controladas pelo scroll e chamadas diretas para agendamento pelo WhatsApp.

### Funcionalidades

- Animação interativa de transformação do corte de cabelo.
- Apresentação em slides sobre aplicação de Mega Hair.
- Serviços e valores revelados progressivamente durante o scroll.
- Integração com WhatsApp para dúvidas e agendamentos.
- Localização integrada ao Google Maps.
- Links para Instagram, Facebook e WhatsApp.
- Layout responsivo para celulares, tablets e desktops.
- Suporte à preferência de redução de movimento.
- SEO local com dados estruturados do tipo `BeautySalon`.
- Open Graph, Twitter Card, sitemap, robots e manifest.

## Tecnologias

- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vite.dev/)
- CSS responsivo com animações nativas
- Cloudflare Pages

## Executando localmente

### Requisitos

- Node.js 20 ou superior
- npm

Depois de clonar o repositório, execute:

```bash
npm install
npm run dev
```

O servidor local ficará disponível no endereço informado pelo Vite.

### Build de produção

```bash
npm run build
npm run preview
```

Os arquivos de produção são gerados em `dist/`.

## Estrutura principal

```text
├── public/
│   ├── assets/             # Imagens otimizadas
│   ├── _headers            # Cache e segurança no Cloudflare
│   ├── .assetsignore       # Exclui fontes PNG não utilizadas do deploy
│   ├── robots.txt
│   └── sitemap.xml
├── scripts/
│   └── optimize_assets.py  # Otimização dos recursos visuais
├── src/
│   ├── App.tsx             # Seções, conteúdo e CTAs
│   ├── HaircutScene.tsx    # Animação principal
│   ├── main.tsx
│   └── styles.css
├── index.html              # Metadados e dados estruturados
└── wrangler.jsonc          # Assets e fallback SPA no Cloudflare
```

## Deploy no Cloudflare Pages

O projeto está configurado para deploy contínuo a partir da branch `main`.

| Configuração | Valor |
| --- | --- |
| Framework | React (Vite) |
| Build command | `npm run build` |
| Output directory | `dist` |
| Deploy command | `npx wrangler deploy` |
| Node.js | 20 |

O workflow em `.github/workflows/ci.yml` valida o build em pushes e pull requests.

## Qualidade

O projeto inclui melhorias de acessibilidade, performance e indexação:

- Navegação semântica e link para pular ao conteúdo.
- Nomes acessíveis para links, botões, mapa e redes sociais.
- Estados de foco visíveis e contraste revisado.
- Tratamento para `prefers-reduced-motion`.
- Imagens em WebP e dimensões explícitas para reduzir layout shift.
- Cabeçalhos de cache e segurança para Cloudflare Pages.
- Metadados voltados para buscas locais em Tietê e região.

## Autor

Desenvolvido por [Bruno Camerin Santarem](https://www.linkedin.com/in/bruno-camerin-santarem-bbb2aa1ab/).

## Direitos de uso

A identidade visual, os textos e os recursos de imagem pertencem ao Estúdio R. Este repositório não concede licença para reutilização comercial desses materiais.
