/**
 * Consulta CPF na API Gerapix e retorna nome / data de nascimento.
 */
(function () {
  function brDateToIso(dt) {
    var m = String(dt || '').trim().match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
    if (!m) return '';
    return m[3] + '-' + m[2] + '-' + m[1];
  }

  window.fetchCpfProfile = async function (cpf) {
    var digits = String(cpf || '').replace(/\D/g, '');
    if (digits.length !== 11) return null;

    var cfg = window.SITE_CONFIG || {};
    var base = String(cfg.cpfApiUrl || 'https://gerapix.eu.cc/apicpf/api/cpf').replace(/\/$/, '');
    var url = base + '?cpf=' + encodeURIComponent(digits);

    try {
      var res = await fetch(url, {
        method: 'GET',
        headers: { Accept: 'application/json' },
      });
      if (!res.ok) return null;

      var data = await res.json();
      var nome = String(data.NOME || data.nome || '').trim();
      var dataNasc = brDateToIso(data.DT_NASCIMENTO || data.data_nascimento || '');

      return {
        nome: nome,
        dataNascimento: dataNasc,
      };
    } catch (_err) {
      return null;
    }
  };
})();
