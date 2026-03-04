// Mobil menü toggle
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// Menü linkine tıklayınca menüyü kapat
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
  });
});

// Scroll'da navbar arka planını koyulaştır
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 50) {
    navbar.style.background = 'rgba(10, 10, 30, 1)';
  } else {
    navbar.style.background = 'rgba(10, 10, 30, 0.97)';
  }
});

// Kart animasyonu (sayfaya girince yukarıdan aşağıya belirme)
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.service-card, .why-card, .stat').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  observer.observe(el);
});

// Teklif formu - WhatsApp
function gonderWhatsapp() {
  const ad = document.getElementById('teklif-ad').value.trim();
  const tel = document.getElementById('teklif-tel').value.trim();
  const hizmet = document.getElementById('teklif-hizmet').value;
  const mesaj = document.getElementById('teklif-mesaj').value.trim();

  if (!ad || !tel) {
    alert('Lütfen ad soyad ve telefon alanlarını doldurun.');
    return;
  }

  let text = `Merhaba, teklif almak istiyorum.\n\nAd Soyad: ${ad}\nTelefon: ${tel}`;
  if (hizmet) text += `\nHizmet: ${hizmet}`;
  if (mesaj) text += `\nMesaj: ${mesaj}`;

  window.open(`https://wa.me/905533108840?text=${encodeURIComponent(text)}`, '_blank');
}

// Teklif formu - E-posta
function gonderEmail() {
  const ad = document.getElementById('teklif-ad').value.trim();
  const tel = document.getElementById('teklif-tel').value.trim();
  const hizmet = document.getElementById('teklif-hizmet').value;
  const mesaj = document.getElementById('teklif-mesaj').value.trim();

  if (!ad || !tel) {
    alert('Lütfen ad soyad ve telefon alanlarını doldurun.');
    return;
  }

  const subject = `Teklif Talebi - ${hizmet || 'Genel'}`;
  let body = `Ad Soyad: ${ad}\nTelefon: ${tel}`;
  if (hizmet) body += `\nHizmet: ${hizmet}`;
  if (mesaj) body += `\nMesaj: ${mesaj}`;

  window.location.href = `mailto:ramazan@securvia.com.tr?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
