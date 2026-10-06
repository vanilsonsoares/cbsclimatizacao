const menuButton = document.querySelector('.menu-button');
const menu = document.querySelector('.main-nav');
const form = document.querySelector('#quote-form');
const formStatus = document.querySelector('#form-status');

window.dataLayer = window.dataLayer || [];

function trackLead(eventName, details = {}) {
  const payload = {
    lead_source: 'website',
    ...details
  };

  window.dataLayer.push({
    event: eventName,
    ...payload
  });

  if (typeof window.gtag === 'function') {
    window.gtag('event', eventName, payload);

    if (eventName === 'click_whatsapp' || eventName === 'generate_lead') {
      window.gtag('event', 'conversion', {
        send_to: 'AW-748019136/4DmWCIO5koQdEMC71-QC'
      });
    }
  }
}

document.querySelectorAll('a[href*="wa.me"]').forEach((link) => {
  link.addEventListener('click', () => {
    trackLead('click_whatsapp', {
      link_location: link.classList.contains('whatsapp-float') ? 'floating_button' : 'page'
    });
  });
});

document.querySelectorAll('a[href^="tel:"]').forEach((link) => {
  link.addEventListener('click', () => {
    trackLead('click_phone');
  });
});

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
  trackLead('generate_lead', {
    service_type: String(data.get('servico') || ''),
    property_type: String(data.get('imovel') || ''),
    equipment_quantity: String(data.get('quantidade') || '')
  });
  formStatus.textContent = 'Abrindo o atendimento da CBS no WhatsApp...';
  window.open(url, '_blank', 'noopener,noreferrer');
});
