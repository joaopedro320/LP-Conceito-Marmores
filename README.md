# LP Conceito Mármores - Empreendimentos (padrão QH4)

Landing page do cliente Conceito Mármores (Campo Grande, MS). Produto: Método Stones High Ticket + Social Media Orbia 1.
Contrato: início 06/11/2026, 6x R$ 3.000,00, renovação automática.

## Estrutura de arquivos

```
index.html            LP principal (SEO, JSON-LD, Open Graph, FAQ, formulário)
obrigado.html         Página de obrigado (noindex), redireciona pro WhatsApp
404.html              Página de erro personalizada
vercel.json           cleanUrls, cache e headers de segurança
robots.txt            Bloqueia só /obrigado
sitemap.xml           Só a home
site.webmanifest      Manifest e ícones
TRACKING-QH4.md       Guia dos slots de GTM, Pixel e conversões
assets/css/style.css  Estilos
assets/js/tracking.js [QH4 SLOT 7] config: WhatsApp, webhook, rótulos de conversão
assets/js/main.js     Interações, lightbox, formulário
assets/img/           Fotos reais do cliente (jpg), logos e ícones
assets/img/thumbs/    Miniaturas da galeria (as fotos grandes abrem no lightbox)
```

## Como publicar na Vercel

1. Suba a pasta inteira (esta raiz, com `index.html` na raiz) como projeto estático. Framework: **Other**, sem build.
2. Aponte o domínio e confira os pontos de "Pendências" abaixo.
3. Alternativa: subir o conteúdo por FTP/Hostinger/Locaweb em `public_html`, mantendo a estrutura.

## Pendências antes de publicar

- [ ] **Domínio e canonical.** O briefing não informa domínio (o cliente não tem site). Usei `https://www.conceitomarmores.com.br/` como placeholder em canonical, Open Graph, JSON-LD, robots.txt e sitemap.xml. Trocar pelo domínio real (buscar e substituir `www.conceitomarmores.com.br`).
- [ ] **GTM, Pixel e demais códigos.** Colar nos slots comentados `[QH4 SLOT n]` (ver TRACKING-QH4.md).
- [ ] **Webhook do Google Apps Script.** Se for usar, preencher `webhook` em `assets/js/tracking.js`. Vazio = o formulário manda tudo direto pro WhatsApp.
- [ ] **WhatsApp:** (67) 98111-2878 (do briefing). Confirmar com o cliente se é o número dos anúncios.
- [ ] **Instagram da QH4 no rodapé:** coloquei `https://www.instagram.com/qh4growth/`. Confirmar o @ correto.
- [ ] **Paleta:** o briefing diz "preta, branca e dourada, da logo", mas a logo enviada é marrom (#4C372E) e laranja (#F27218). Segui a logo. Se o cliente quiser dourado, ajustar as variáveis `--orange` e `--brown` no topo do `style.css`.
- [ ] **Endereço físico:** o briefing não traz. Por isso não há mapa nem endereço no rodapé.
- [ ] Rodar o script do IVO: já instalado (`data-lp="lp-conceito-marmores"`) na index e no obrigado.

## Fonte do conteúdo (só o que está no briefing)

- História: aberta em 2014 após incentivo de um amigo, com experiência prévia na construção civil.
- Atuação: obra da base ao acabamento. Serviços: projetos, alvenaria, reboco, revestimentos, elétrica, hidráulica, pintura, gesso, marmoraria, vidraçaria.
- Destaques: marmoraria e gesso com produção própria, pedras naturais, vidraçaria.
- Diferenciais: referência em acabamento fino, instalação própria.
- Público: alto padrão. Atendimento: segunda a sexta, 8h às 17h. Cidade: Campo Grande, MS.
- Fotos: pasta "03. Imagens" do cliente. Foram usadas só fotos acabadas, com boa resolução e sem marca de terceiros.
- Não usados de propósito: faturamento, ticket, metas, número de indicações, dados pessoais do formulário (CPF, nascimento etc.).
- Tipografia: logo usa Arial Black, Humanist 521 e Kaufmann (script). A LP usa as equivalentes web Archivo Black, Cabin e Kaushan Script.

## Fluxo do formulário

- Botão de envio nasce desabilitado e só habilita com os campos obrigatórios válidos.
- **Com webhook:** envia pro Apps Script, abre `obrigado.html` e, em 5 segundos, redireciona pro WhatsApp com "Olá, acabei de preencher o formulário no site. Aguardo mais informações."
- **Sem webhook (padrão atual):** monta a mensagem com todos os campos preenchidos e abre o WhatsApp direto.

## Eventos de rastreamento (dataLayer)

| Evento | Quando |
|---|---|
| `whatsapp_click` (`wa_local`: hero, flutuante, rodape, 404) | Clique em qualquer botão de WhatsApp |
| `form_start` | Primeira interação com o formulário |
| `generate_lead` | Envio do formulário |
| `thank_you_view` | Visualização da página de obrigado |

## Checklist de SEO

- [x] Title e meta description com nicho e cidade
- [x] H1 com "Marmoraria" e "Perto de Você"
- [x] JSON-LD HomeAndConstructionBusiness + FAQPage (só com fatos do briefing)
- [x] Open Graph completo + Twitter Card + imagem 1200x630
- [x] Canonical (placeholder, ver pendências), robots.txt, sitemap.xml, site.webmanifest
- [x] width/height em todas as imagens (CLS) e preload da imagem do hero
- [x] Imagens abaixo da dobra com lazy loading, miniaturas na galeria
- [x] Página de obrigado com noindex, 404 personalizada, vercel.json

## Animações

Scroll reveal, parallax leve no hero, linha do tempo que acende no scroll, marquee, microinterações em botões e cards, lightbox em tela cheia para as fotos. Respeita `prefers-reduced-motion`.
