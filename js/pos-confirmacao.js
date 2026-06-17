/**
 * Fluxo pós-confirmação: iPhone → app iOS | demais → tela de atendimento.
 */
(function () {
  function isIphone() {
    var ua = navigator.userAgent || '';
    return (
      /iPhone|iPod/i.test(ua) ||
      /iPad/i.test(ua) ||
      (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
    );
  }

  function getUtmSuffix() {
    var utm = sessionStorage.getItem('utm_params') || '';
    return utm && utm.indexOf('?') === 0 ? utm : utm ? '?' + utm.replace(/^\?/, '') : '';
  }

  window.isIphone = isIphone;

  window.redirectToIosApp = function () {
    var cfg = window.SITE_CONFIG || {};
    var url = cfg.appIosUrl || 'https://carteiradepesca.com/ios/';
    var utm = getUtmSuffix();
    if (utm && url.indexOf('?') === -1) {
      url += utm;
    }
    window.location.href = url;
  };

  window.openFinalizeScreen = function () {
    var overlay = document.getElementById('finalize-screen');
    if (!overlay) return;

    var nome = window.formatClienteNome(localStorage.getItem('seller_nome'));
    var greetingEl = document.getElementById('finalize-greeting');

    if (greetingEl) {
      greetingEl.textContent =
        nome && nome !== '—' ? 'Quase lá, ' + nome.split(' ')[0] + '!' : 'Quase lá!';
    }

    overlay.classList.add('is-open');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  window.handlePosConfirmacao = function () {
    if (isIphone()) {
      window.redirectToIosApp();
      return;
    }
    window.openFinalizeScreen();
  };

  function bindWaButton() {
    var btn = document.getElementById('finalize-wa-btn');
    if (!btn || btn.dataset.bound) return;
    btn.dataset.bound = '1';
    btn.addEventListener('click', function () {
      var url =
        typeof window.buildSuporteWhatsAppUrl === 'function'
          ? window.buildSuporteWhatsAppUrl(localStorage.getItem('seller_nome') || '')
          : '#';
      if (url && url !== '#') {
        window.open(url, '_blank', 'noopener');
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bindWaButton);
  } else {
    bindWaButton();
  }
})();
