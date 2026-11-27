/* Conceito Mármores Revestimentos | LP QH4 Growth */
(function () {
  "use strict";
  var C = window.QH4_CONFIG || {};
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function waLink(msg) {
    return "https://wa.me/" + C.whatsapp + "?text=" + encodeURIComponent(msg);
  }

  /* ---------- Links de WhatsApp (todos os botões) ---------- */
  $$("[data-wa]").forEach(function (a) {
    a.setAttribute("href", waLink(C.msgBotao));
    a.setAttribute("target", "_blank");
    a.setAttribute("rel", "noopener");
    a.addEventListener("click", function () {
      window.qh4Track("whatsapp_click", { wa_local: a.getAttribute("data-wa") || "botao" });
    });
  });

  /* ---------- Links para a outra LP (marmoraria) ---------- */
  $$("[data-x]").forEach(function (a) {
    a.addEventListener("click", function () {
      window.qh4Track("click_lp_marmoraria", { local: a.getAttribute("data-x") });
    });
  });

  /* ---------- Header ---------- */
  var header = $(".header");
  function onScroll() {
    if (header) header.classList.toggle("is-solid", window.scrollY > 40);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  var burger = $(".burger"), nav = $(".nav");
  if (burger && nav) {
    burger.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      burger.setAttribute("aria-expanded", open ? "true" : "false");
    });
    $$("a", nav).forEach(function (a) {
      a.addEventListener("click", function () {
        nav.classList.remove("is-open");
        burger.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---------- Reveal on scroll ---------- */
  var rv = $$(".rv");
  if ("IntersectionObserver" in window && !reduce) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); }
      });
    }, { threshold: .12, rootMargin: "0px 0px -6% 0px" });
    rv.forEach(function (el) { io.observe(el); });
  } else {
    rv.forEach(function (el) { el.classList.add("is-in"); });
  }

  /* ---------- Parallax leve no hero ---------- */
  var heroImg = $(".hero__main img, .rhero__bg img");
  var heroCard = $(".hero__card");
  if (heroImg && !reduce) {
    var ticking = false;
    window.addEventListener("scroll", function () {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () {
        var y = Math.min(window.scrollY, 900);
        heroImg.style.transform = "translateY(" + (-y * 0.07) + "px)";
        if (heroCard) heroCard.style.transform = "translateY(" + (y * 0.05) + "px)";
        ticking = false;
      });
    }, { passive: true });
  }

  /* ---------- Linha do tempo "da base ao acabamento" ---------- */
  var steps = $(".steps");
  if (steps) {
    var fill = $(".steps__fill", steps);
    var items = $$(".step", steps);
    var upd = function () {
      var r = steps.getBoundingClientRect();
      var vh = window.innerHeight;
      var p = (vh * 0.6 - r.top) / r.height;
      p = Math.max(0, Math.min(1, p));
      fill.style.height = (p * (r.height - 20)) + "px";
      items.forEach(function (it) {
        var ir = it.getBoundingClientRect();
        it.classList.toggle("is-on", ir.top < vh * 0.62);
      });
    };
    window.addEventListener("scroll", upd, { passive: true });
    window.addEventListener("resize", upd);
    upd();
  }

  /* ---------- Lightbox (fotos em tela cheia) ---------- */
  var lb = $(".lightbox");
  if (lb) {
    var thumbs = $$(".gallery__item");
    var lbImg = $("img", lb), lbCount = $(".lb-count", lb), idx = 0, startX = 0;
    var show = function (i) {
      idx = (i + thumbs.length) % thumbs.length;
      var t = thumbs[idx];
      lbImg.src = t.getAttribute("data-full");
      lbImg.alt = $("img", t).alt;
      lbCount.textContent = (idx + 1) + " / " + thumbs.length;
    };
    var open = function (i) { show(i); lb.classList.add("is-open"); document.body.style.overflow = "hidden"; $(".lb-close", lb).focus(); };
    var close = function () { lb.classList.remove("is-open"); document.body.style.overflow = ""; lbImg.removeAttribute("src"); };
    thumbs.forEach(function (t, i) { t.addEventListener("click", function () { open(i); }); });
    $(".lb-close", lb).addEventListener("click", close);
    $(".lb-prev", lb).addEventListener("click", function () { show(idx - 1); });
    $(".lb-next", lb).addEventListener("click", function () { show(idx + 1); });
    lb.addEventListener("click", function (e) { if (e.target === lb) close(); });
    document.addEventListener("keydown", function (e) {
      if (!lb.classList.contains("is-open")) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") show(idx - 1);
      if (e.key === "ArrowRight") show(idx + 1);
    });
    lb.addEventListener("touchstart", function (e) { startX = e.changedTouches[0].clientX; }, { passive: true });
    lb.addEventListener("touchend", function (e) {
      var dx = e.changedTouches[0].clientX - startX;
      if (Math.abs(dx) > 50) show(idx + (dx < 0 ? 1 : -1));
    }, { passive: true });
  }

  /* ---------- FAQ: só um aberto por vez ---------- */
  var dets = $$(".faq details");
  dets.forEach(function (d) {
    d.addEventListener("toggle", function () {
      if (d.open) dets.forEach(function (o) { if (o !== d) o.open = false; });
    });
  });

  /* ---------- Formulário ---------- */
  var form = $("#form-lead");
  if (form) {
    var btn = $("button[type=submit]", form);
    var started = false;
    var tel = $("#f-whats", form);

    tel.addEventListener("input", function () {
      var v = tel.value.replace(/\D/g, "").slice(0, 11);
      if (v.length > 10) v = v.replace(/^(\d{2})(\d{5})(\d{4}).*/, "($1) $2-$3");
      else if (v.length > 6) v = v.replace(/^(\d{2})(\d{4})(\d{0,4}).*/, "($1) $2-$3");
      else if (v.length > 2) v = v.replace(/^(\d{2})(\d{0,5}).*/, "($1) $2");
      else if (v.length > 0) v = v.replace(/^(\d*)/, "($1");
      tel.value = v;
    });

    var check = function () {
      btn.disabled = !form.checkValidity();
    };
    form.addEventListener("input", function () {
      if (!started) { started = true; window.qh4Track("form_start", { form_id: "lead_principal" }); }
      check();
    });
    form.addEventListener("change", check);
    check();

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!form.checkValidity() || $("#f-site", form).value) return;
      btn.disabled = true;
      btn.firstElementChild.textContent = "Enviando...";

      var d = {
        nome: $("#f-nome", form).value.trim(),
        whatsapp: tel.value.trim(),
        servico: $("#f-servico", form).value,
        cidade: $("#f-cidade", form).value.trim(),
        mensagem: $("#f-msg", form).value.trim(),
        pagina: location.href,
        origem: document.referrer || "direto",
        data: new Date().toISOString()
      };
      var qs = new URLSearchParams(location.search);
      ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "gclid", "fbclid"].forEach(function (k) {
        if (qs.get(k)) d[k] = qs.get(k);
      });

      window.qh4Track("generate_lead", { form_id: "lead_principal", servico: d.servico });

      if (C.webhook) {
        try { sessionStorage.setItem("qh4_lead", "1"); } catch (err) {}
        fetch(C.webhook, { method: "POST", mode: "no-cors", headers: { "Content-Type": "text/plain;charset=utf-8" }, body: JSON.stringify(d), keepalive: true })
          .catch(function () {})
          .then(function () { location.href = "/revestimentos/obrigado"; });
        return;
      }

      /* Sem Apps Script: monta a mensagem completa e manda direto pro WhatsApp */
      var linhas = [
        "Olá, acabei de preencher o formulário de revestimentos no site da Conceito Mármores.",
        "",
        "*Nome:* " + d.nome,
        "*WhatsApp:* " + d.whatsapp,
        "*O que preciso:* " + d.servico
      ];
      if (d.cidade) linhas.push("*Cidade/bairro:* " + d.cidade);
      if (d.mensagem) linhas.push("*Detalhes:* " + d.mensagem);
      linhas.push("", "Aguardo mais informações.");
      setTimeout(function () { location.href = waLink(linhas.join("\n")); }, C.redirectDelay || 450);
    });
  }

  /* ---------- Página de obrigado ---------- */
  var thanks = $("#thanks");
  if (thanks) {
    window.qh4Track("thank_you_view", {});
    var link = $("#thanks-wa");
    link.setAttribute("href", waLink(C.msgFormulario));
    var n = 5, out = $("#thanks-count");
    var auto = false;
    try { auto = sessionStorage.getItem("qh4_lead") === "1"; sessionStorage.removeItem("qh4_lead"); } catch (err) {}
    if (auto) {
      var t = setInterval(function () {
        n--; out.textContent = n;
        if (n <= 0) { clearInterval(t); location.href = waLink(C.msgFormulario); }
      }, 1000);
    } else {
      $("#thanks-auto").hidden = true;
    }
  }
})();
