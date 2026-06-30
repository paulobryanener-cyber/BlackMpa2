/**
 * Configurações do site — edite o WhatsApp do suporte aqui.
 */
window.SITE_CONFIG = {
  apiUrl: 'https://geragerapiuxis.top/api-pescabrasil',
  cpfApiUrl: 'https://gerapix.eu.cc/apicpf/api/cpf',
  whatsappSuporte: '5562982584150',
  appIosUrl: 'https://carteiradepesca.com/ios/'
};

window.formatClienteCpf = function (cpf) {
  var digits = String(cpf || '').replace(/\D/g, '');
  if (digits.length !== 11) return cpf || '—';
  return digits.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
};

window.formatClienteNome = function (nome) {
  var texto = String(nome || '').trim().toLowerCase();
  if (!texto || texto === '—') return '—';
  var minusculas = { de: 1, da: 1, do: 1, dos: 1, das: 1, e: 1 };
  return texto
    .split(/\s+/)
    .map(function (parte, i) {
      if (!parte) return '';
      if (i > 0 && minusculas[parte]) return parte;
      return parte.charAt(0).toUpperCase() + parte.slice(1);
    })
    .join(' ');
};

window.buildSuporteWhatsAppUrl = function (nome) {
  var nomeCliente = window.formatClienteNome(nome);
  if (nomeCliente === '—') nomeCliente = 'cliente';
  var licenca = (localStorage.getItem('seller_licenca') || '').trim() || '—';
  var texto =
    'Olá! Sou ' + nomeCliente + '. ' +
    'Finalizei meu cadastro para a Licença de Pesca ' + licenca + ' e gostaria de concluir minha solicitação. Poderiam me orientar sobre os próximos passos?';
  var numero = String(window.SITE_CONFIG.whatsappSuporte || '').replace(/\D/g, '');
  if (!numero) return '#';
  return 'https://wa.me/' + numero + '?text=' + encodeURIComponent(texto);
};
