/* ==========================================================
   [QH4 SLOT 7] CONFIGURAÇÃO DE RASTREAMENTO E CONTATO
   Único arquivo para editar WhatsApp, webhook e rótulos de conversão.
   ========================================================== */
window.QH4_CONFIG = {
  /* WhatsApp do cliente (DDI + DDD + número, só dígitos) */
  whatsapp: "5567981112878",

  /* Webhook do Google Apps Script (Web App publicado).
     - VAZIO: o formulário monta a mensagem completa com todos os campos e manda direto pro WhatsApp.
     - PREENCHIDO: envia os dados pro Apps Script, abre a página de obrigado e redireciona pro WhatsApp
       com a mensagem "Olá, acabei de preencher o formulário no site. Aguardo mais informações."
     Exemplo: "https://script.google.com/macros/s/XXXXXXXXXXXX/exec" */
  webhook: "",

  /* Mensagens do WhatsApp */
  msgBotao: "Olá, vim pelo site da Conceito Mármores e gostaria de um orçamento.",
  msgFormulario: "Olá, acabei de preencher o formulário no site. Aguardo mais informações.",

  /* Rótulos de conversão do Google Ads (opcional, só se usar gtag direto sem GTM).
     Exemplo: "AW-XXXXXXXXX/AbCdEfGhIjKl" */
  googleAdsLeadLabel: "",
  googleAdsWhatsappLabel: "",

  /* Tempo (ms) de espera antes de redirecionar pro WhatsApp depois de disparar o evento */
  redirectDelay: 450
};

window.dataLayer = window.dataLayer || [];

/* Dispara evento padronizado no dataLayer (e no gtag direto, se existir) */
window.qh4Track = function (evento, params) {
  var payload = Object.assign({ event: evento }, params || {});
  window.dataLayer.push(payload);
  try {
    if (typeof window.gtag === "function" && window.QH4_CONFIG) {
      var c = window.QH4_CONFIG;
      if (evento === "generate_lead" && c.googleAdsLeadLabel) window.gtag("event", "conversion", { send_to: c.googleAdsLeadLabel });
      if (evento === "whatsapp_click" && c.googleAdsWhatsappLabel) window.gtag("event", "conversion", { send_to: c.googleAdsWhatsappLabel });
    }
  } catch (e) { /* nunca quebrar a página por causa de rastreamento */ }
};
