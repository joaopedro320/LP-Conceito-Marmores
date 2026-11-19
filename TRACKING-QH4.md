# Rastreamento QH4: onde colar cada código

Todos os slots estão marcados no HTML com blocos de comentário grandes `[QH4 SLOT n]`, iguais em `index.html`, `obrigado.html` e `404.html`.

| Slot | Onde | O que colar |
|---|---|---|
| 1 | `<head>` | Script do Google Tag Manager |
| 2 | `<head>` | Metas de verificação de domínio (Search Console, Meta Business) |
| 3 | `<head>` | Meta Pixel direto (só se NÃO usar GTM) |
| 4 | `<head>` | gtag do Google Ads / GA4 direto (só se NÃO usar GTM) |
| 5 | Logo após `<body>` | `<noscript>` do GTM |
| 6 | Antes do `</body>` | Scripts de terceiros (chat, Clarity, Hotjar) |
| 7 | `assets/js/tracking.js` | WhatsApp, webhook do Apps Script, rótulos de conversão do Google Ads |
| 8 | `obrigado.html` | Conversão de lead disparada só na página de obrigado |

## Regra de ouro

Se usar GTM, não cole Pixel nem gtag direto (slots 3 e 4), para não contar conversão em duplicidade.

## dataLayer

- `whatsapp_click` com `wa_local` (hero, flutuante, rodape, 404)
- `form_start`
- `generate_lead` com `servico`
- `thank_you_view`

No GTM, crie gatilhos de "Evento personalizado" com esses nomes e ligue às tags de conversão (Google Ads e Meta).

## IVO (Funil do LIA & IVO)

Já instalado antes do `</body>` da index e do obrigado (não na 404):
`<script src="https://app-validacao-lp-sapp-validacao-lp.vercel.app/api/t" data-lp="lp-conceito-marmores" defer></script>`
