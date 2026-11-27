# LP Conceito Mármores | Revestimentos (padrão QH4)

Segunda landing page do cliente Conceito Mármores (Campo Grande, MS), voltada a **revestimentos**, para rodar em **/revestimentos**, no mesmo domínio e projeto da LP de marmoraria (a marmoraria fica na raiz `/`). Task ClickUp 86e426p6z.

## Estrutura de arquivos

```
index.html               LP (SEO, JSON-LD, Open Graph, FAQ, formulário)
obrigado.html            Página de obrigado (noindex), redireciona pro WhatsApp
404.html                 Página de erro personalizada
vercel.json              cleanUrls, cache e headers de segurança
robots.txt / sitemap.xml / site.webmanifest
TRACKING-QH4.md          Guia dos slots de GTM, Pixel e conversões
assets/css/style.css     Base (header, botões, formulário, FAQ, rodapé)
assets/css/revestimentos.css  Hero de tela cheia, faixa de ambientes, chips, ponte para marmoraria
assets/js/tracking.js    [QH4 SLOT 7] WhatsApp (67) 99211-7332, webhook, rótulos de conversão
assets/js/main.js        Interações, lightbox, formulário
assets/img/              Fotos reais do cliente (jpg), logos e ícones
```

## Publicar

Esta pasta vive dentro do repositório da LP de marmoraria, em `revestimentos/`. O deploy é um só (Vercel), e a URL fica `seudominio.com.br/revestimentos`. Os caminhos dos arquivos são absolutos (`/revestimentos/assets/...`), então funcionam com ou sem barra final. O `vercel.json` da raiz tem o rewrite de `/revestimentos`.

Troque o domínio `www.conceitomarmores.com.br` (canonical, og:url, JSON-LD) pelo real. Os links entre as LPs são relativos (`/` e `/revestimentos`) e não precisam de ajuste.

## Pendências antes de publicar

- [ ] **Fotos de revestimento.** As fotos do Drive do Arthur (Rev 1 a 6: fachada, piscina com cascatas, piso da área da piscina, lavabo com parede em pedra, painel de TV em pedra, spa em pedra) não foram baixadas. A LP usa fotos de obra que já estavam na pasta do cliente. Trocar/adicionar em `assets/img` e nas seções "Ambientes" e "Projetos".
- [ ] **Domínio real** no canonical, og:url e JSON-LD (hoje placeholder).
- [ ] **GTM e Pixel** já instalados (mesmos da LP de marmoraria: GTM-W8C66KNV e Pixel 2286633802195475). Se o subdomínio tiver contêiner/pixel próprio, trocar nos slots 1, 3 e 5.
- [ ] **Webhook do Apps Script** em `assets/js/tracking.js`. Vazio = formulário manda a mensagem completa direto pro WhatsApp.
- [ ] Rótulos de conversão do Google Ads, se usar gtag direto.
- [ ] Instagram da QH4 no rodapé (`instagram.com/qh4growth`), confirmar.

## Conteúdo (só o que está no briefing)

Revestimentos e pedras naturais como serviços e destaque, instalação própria, acabamento fino, obra completa da base ao acabamento, Campo Grande/MS, atendimento seg a sex 8h às 17h, fundação em 2014 não usada nesta LP. WhatsApp (67) 99211-7332 vem do criativo de referência do Arthur, confirmar.

## Redirecionamentos entre as duas LPs

- Revestimentos: link "Marmoraria" no menu, seção "Também somos marmoraria" e rodapé levam à LP de marmoraria (evento `click_lp_marmoraria`).
- Marmoraria: link "Revestimentos" no menu, seção "Revestimentos" e rodapé levam a esta LP.

## Eventos de rastreamento (dataLayer)

`whatsapp_click` (wa_local), `form_start`, `generate_lead`, `thank_you_view`, `click_lp_marmoraria`.

## SEO

- [x] H1 com "Revestimentos" e "Perto de Você"
- [x] Title/description, canonical, Open Graph, Twitter Card, JSON-LD (HomeAndConstructionBusiness + FAQPage)
- [x] robots.txt, sitemap.xml, site.webmanifest, vercel.json, obrigado, 404
- [x] width/height nas imagens, preload do hero
