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

// Hero Carousel
(function() {
  const slides = document.querySelectorAll('.carousel-slide');
  const dotsContainer = document.getElementById('carouselDots');
  if (!slides.length || !dotsContainer) return;

  let current = 0;
  let interval;

  // Dot'ları oluştur
  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
    dot.addEventListener('click', () => goTo(i));
    dotsContainer.appendChild(dot);
  });

  function goTo(idx) {
    slides[current].classList.remove('active');
    dotsContainer.children[current].classList.remove('active');
    current = idx;
    slides[current].classList.add('active');
    dotsContainer.children[current].classList.add('active');
  }

  function next() {
    goTo((current + 1) % slides.length);
  }

  function startAutoplay() {
    interval = setInterval(next, 3500);
  }

  function stopAutoplay() {
    clearInterval(interval);
  }

  startAutoplay();

  // Hover'da durdur
  const carousel = document.querySelector('.carousel-wrapper');
  if (carousel) {
    carousel.addEventListener('mouseenter', stopAutoplay);
    carousel.addEventListener('mouseleave', startAutoplay);
  }
})();

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

// Lightbox (fotoğraf büyütme)
(function() {
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const imgs = document.querySelectorAll('.proje-img img');
  let currentIdx = 0;

  imgs.forEach((img, i) => {
    img.addEventListener('click', () => {
      currentIdx = i;
      lightboxImg.src = img.src;
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  document.getElementById('lightboxClose').addEventListener('click', closeLB);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLB();
  });

  document.getElementById('lightboxPrev').addEventListener('click', (e) => {
    e.stopPropagation();
    currentIdx = (currentIdx - 1 + imgs.length) % imgs.length;
    lightboxImg.src = imgs[currentIdx].src;
  });

  document.getElementById('lightboxNext').addEventListener('click', (e) => {
    e.stopPropagation();
    currentIdx = (currentIdx + 1) % imgs.length;
    lightboxImg.src = imgs[currentIdx].src;
  });

  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLB();
    if (e.key === 'ArrowLeft') document.getElementById('lightboxPrev').click();
    if (e.key === 'ArrowRight') document.getElementById('lightboxNext').click();
  });

  function closeLB() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }
})();
