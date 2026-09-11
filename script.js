const menuButton = document.querySelector('.menu-button');
const menu = document.querySelector('.main-nav');
const form = document.querySelector('#quote-form');
const formStatus = document.querySelector('#form-status');

document.querySelector('#year').textContent = new Date().getFullYear();

menuButton?.addEventListener('click', () => {
  const isOpen = menu.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
});

menu?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    menu.classList.remove('open');
    menuButton?.setAttribute('aria-expanded', 'false');
  });
});

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(form);
  const detalhes = String(data.get('detalhes') || '').trim();
  const lines = [
    'Olá, CBS Climatização. Gostaria de solicitar um orçamento.',
    '',
    `Nome: ${data.get('nome')}`,
    `Local: ${data.get('local')}`,
    `Serviço: ${data.get('servico')}`,
    `Imóvel: ${data.get('imovel')}`,
    `Quantidade: ${data.get('quantidade')}`
  ];
  if (detalhes) lines.push(`Detalhes: ${detalhes}`);
  const url = `https://wa.me/5511981353298?text=${encodeURIComponent(lines.join('\n'))}`;
  formStatus.textContent = 'Abrindo o atendimento da CBS no WhatsApp...';
  window.open(url, '_blank', 'noopener,noreferrer');
});
