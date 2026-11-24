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

## Conversão de lead: use SÓ o evento `qh4_lead`

O lead conta em apenas 2 situações, e o código dispara um único evento para as duas:

| Evento | Quando | Parâmetros |
|---|---|---|
| `qh4_lead` | Formulário preenchido e enviado | `lead_tipo: "formulario"`, `servico`, `botao_id: "btn-form-enviar"` |
| `qh4_lead` | Clique num botão de WhatsApp | `lead_tipo: "whatsapp"`, `lead_local` (hero, flutuante, rodape, 404), `botao_id` |

Trava anti-duplicidade: no máximo 1 lead de cada tipo por sessão do navegador. Clicar 3x no WhatsApp ou reenviar o formulário não gera lead novo.

Os botões de "Orçamento" (menu, hero, serviços) só rolam a página até o formulário e **não são lead**.

### Configuração no GTM (GTM-W8C66KNV)

1. **Apague ou pause** qualquer gatilho de clique (Clique em todos os elementos / Somente links) que esteja ligado a tag de conversão. É ele que conta lead em todo botão, porque antes os botões não tinham ID e todos usam a classe `btn`.
2. Crie a variável de camada de dados `lead_tipo` (e, se quiser, `lead_local` e `botao_id`).
3. Crie o gatilho **Evento personalizado** com nome do evento `qh4_lead`.
4. Ligue a esse gatilho as tags de conversão: Meta `Lead`, conversão do Google Ads e o `generate_lead` do GA4.
5. Opcional: para separar no Google Ads, crie 2 gatilhos `qh4_lead` com condição `lead_tipo` igual a `formulario` / `whatsapp`.
6. Publique e teste no modo Visualização: clicar em "Orçamento" não pode disparar nada; enviar o formulário ou clicar no WhatsApp dispara `qh4_lead` uma vez.

Meta Pixel: o código base está direto no `<head>`. Se o `Lead` for disparado pelo GTM, deixe `metaPixelLead: false` em `tracking.js`. Se preferir sem GTM, mude para `true` e pause a tag de Lead do Meta no GTM (nunca os dois).

### IDs dos botões

| ID | Botão | É lead? |
|---|---|---|
| `btn-menu-orcamento` | Orçamento (menu) | Não, rola até o form |
| `btn-hero-orcamento` | Solicitar orçamento (hero) | Não, rola até o form |
| `btn-servicos-orcamento` | Quero meu orçamento (serviços) | Não, rola até o form |
| `btn-form-enviar` | Enviar e falar no WhatsApp (form) | Sim, ao enviar válido |
| `btn-hero-whatsapp` | Falar no WhatsApp (hero) | Sim |
| `btn-rodape-whatsapp` | WhatsApp no rodapé | Sim |
| `btn-whatsapp-flutuante` | Botão flutuante do WhatsApp | Sim |
| `btn-404-whatsapp` | Falar no WhatsApp (404) | Sim |

## Outros eventos do dataLayer (só para análise, não ligar em conversão)

- `whatsapp_click` com `wa_local` e `botao_id` (dispara a cada clique)
- `form_start` (primeira digitação no formulário)
- `generate_lead` com `servico` (envio do formulário)
- `thank_you_view` (só quando chega no obrigado vindo de um envio real; abrir a URL direto não dispara)

## IVO (Funil do LIA & IVO)

Já instalado antes do `</body>` da index e do obrigado (não na 404):
`<script src="https://app-validacao-lp-sapp-validacao-lp.vercel.app/api/t" data-lp="lp-conceito-marmores" defer></script>`
