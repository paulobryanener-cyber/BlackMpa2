/**
 * Formata telefone brasileiro: (00) 0000-0000 ou (00) 00000-0000
 */
window.formatPhoneBr = function (value) {
  var digits = String(value || '').replace(/\D/g, '').slice(0, 11);
  if (!digits.length) return '';
  if (digits.length <= 2) return '(' + digits;
  if (digits.length <= 6) {
    return '(' + digits.slice(0, 2) + ') ' + digits.slice(2);
  }
  if (digits.length <= 10) {
    return '(' + digits.slice(0, 2) + ') ' + digits.slice(2, 6) + '-' + digits.slice(6);
  }
  return '(' + digits.slice(0, 2) + ') ' + digits.slice(2, 7) + '-' + digits.slice(7);
};
