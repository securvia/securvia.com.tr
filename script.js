// Preloader
window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  if (preloader) {
    setTimeout(() => {
      preloader.classList.add('hide');
      setTimeout(() => preloader.remove(), 500);
    }, 1500);
  }
});

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

// Toast bildirim göster
function showToast(message, type) {
  const existing = document.querySelector('.toast-msg');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = 'toast-msg toast-' + type;
  toast.innerHTML = (type === 'success'
    ? '<i class="fa-solid fa-circle-check"></i> '
    : '<i class="fa-solid fa-circle-xmark"></i> ') + message;
  document.body.appendChild(toast);

  setTimeout(() => toast.classList.add('show'), 10);
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 400);
  }, 4000);
}

// Teklif formu - E-posta (Web3Forms ile direkt mail gönderir)
async function gonderEmail() {
  const ad = document.getElementById('teklif-ad').value.trim();
  const tel = document.getElementById('teklif-tel').value.trim();
  const hizmet = document.getElementById('teklif-hizmet').value;
  const mesaj = document.getElementById('teklif-mesaj').value.trim();

  if (!ad || !tel) {
    showToast('Lütfen ad soyad ve telefon alanlarını doldurun.', 'error');
    return;
  }

  const btn = document.querySelector('.teklif-btn-mail');
  const btnText = btn.innerHTML;
  btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Gönderiliyor...';
  btn.disabled = true;

  try {
    const res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        access_key: '2475a7da-655f-4414-891c-0b9b62f19f73',
        subject: `Yeni Teklif Talebi - ${ad} - ${tel}`,
        from_name: 'Securvia Web Sitesi',
        name: ad,
        phone: tel,
        hizmet: hizmet || 'Belirtilmedi',
        message: mesaj || 'Mesaj yok'
      })
    });
    const data = await res.json();
    if (data.success) {
      showToast('E-posta başarıyla gönderildi! En kısa sürede dönüş yapacağız.', 'success');
      document.getElementById('teklifForm').reset();
      if (typeof gtag === 'function') {
        gtag('event', 'conversion', {
          'send_to': 'AW-18019807514/form_submit',
          'event_category': 'contact',
          'event_label': 'email_form'
        });
      }
    } else {
      showToast('Gönderilemedi. Lütfen WhatsApp ile iletişime geçin.', 'error');
    }
  } catch (err) {
    showToast('Bağlantı hatası. Lütfen WhatsApp ile iletişime geçin.', 'error');
  }

  btn.innerHTML = btnText;
  btn.disabled = false;
}

// Sayaç animasyonu (rakamlar ekrana gelince sayarak artar)
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !entry.target.dataset.counted) {
      entry.target.dataset.counted = 'true';
      const target = entry.target.textContent.trim();
      const isSlash = target.includes('/');
      if (isSlash) return; // 7/24 olduğu gibi kalsın
      const num = parseInt(target);
      if (isNaN(num)) return;
      let current = 0;
      const step = Math.ceil(num / 50);
      const suffix = target.replace(/[0-9]/g, '');
      const timer = setInterval(() => {
        current += step;
        if (current >= num) {
          current = num;
          clearInterval(timer);
        }
        entry.target.textContent = current + suffix;
      }, 30);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-num').forEach(el => counterObserver.observe(el));

// Yukarı çık butonu
const scrollTopBtn = document.getElementById('scrollTop');
window.addEventListener('scroll', () => {
  if (window.scrollY > 500) {
    scrollTopBtn.classList.add('visible');
  } else {
    scrollTopBtn.classList.remove('visible');
  }
});

scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Navbar scroll spy (aktif bölümün linki vurgulanır)
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-links a[href^="#"]');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const top = section.offsetTop - 200;
    if (window.scrollY >= top) {
      current = section.getAttribute('id');
    }
  });
  navItems.forEach(link => {
    link.classList.remove('nav-active');
    if (link.getAttribute('href') === '#' + current) {
      link.classList.add('nav-active');
    }
  });
});

// Lightbox (proje kartlari)
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxPrev = document.getElementById('lightboxPrev');
const lightboxNext = document.getElementById('lightboxNext');
const lightboxCounter = document.getElementById('lightboxCounter');
const lightboxTitle = document.getElementById('lightboxTitle');
let lightboxImages = [];
let lightboxIndex = 0;

function updateLightbox() {
  lightboxImg.src = lightboxImages[lightboxIndex];
  lightboxCounter.textContent = (lightboxIndex + 1) + ' / ' + lightboxImages.length;
}

document.querySelectorAll('.proje-card[data-images]').forEach(card => {
  card.addEventListener('click', () => {
    lightboxImages = JSON.parse(card.getAttribute('data-images'));
    lightboxIndex = 0;
    lightboxTitle.textContent = card.getAttribute('data-title') || '';
    updateLightbox();
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  });
});

if (lightboxClose) {
  lightboxClose.addEventListener('click', () => {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  });
}

if (lightboxPrev) {
  lightboxPrev.addEventListener('click', (e) => {
    e.stopPropagation();
    lightboxIndex = (lightboxIndex - 1 + lightboxImages.length) % lightboxImages.length;
    updateLightbox();
  });
}

if (lightboxNext) {
  lightboxNext.addEventListener('click', (e) => {
    e.stopPropagation();
    lightboxIndex = (lightboxIndex + 1) % lightboxImages.length;
    updateLightbox();
  });
}

if (lightbox) {
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
}

// FAQ Accordion
document.querySelectorAll('.faq-q').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.parentElement;
    const answer = item.querySelector('.faq-a');
    const isActive = item.classList.contains('active');

    document.querySelectorAll('.faq-item').forEach(fi => {
      fi.classList.remove('active');
      fi.querySelector('.faq-a').style.maxHeight = null;
    });

    if (!isActive) {
      item.classList.add('active');
      answer.style.maxHeight = answer.scrollHeight + 'px';
    }
  });
});

// Çerez bildirimi
const cookieBanner = document.getElementById('cookieBanner');
const cookieAccept = document.getElementById('cookieAccept');

if (cookieBanner && !localStorage.getItem('cookieAccepted')) {
  setTimeout(() => cookieBanner.classList.add('show'), 2000);
}

if (cookieAccept) {
  cookieAccept.addEventListener('click', () => {
    localStorage.setItem('cookieAccepted', 'true');
    cookieBanner.classList.remove('show');
  });
}

// Google Ads Dönüşüm Takibi - Telefon tıklama
document.querySelectorAll('a[href^="tel:"]').forEach(link => {
  link.addEventListener('click', () => {
    if (typeof gtag === 'function') {
      gtag('event', 'conversion', {
        'send_to': 'AW-18019807514/phone_click',
        'event_category': 'contact',
        'event_label': 'phone_click'
      });
    }
  });
});

// Google Ads Dönüşüm Takibi - WhatsApp tıklama
document.querySelectorAll('a[href*="wa.me"], .teklif-btn-wa').forEach(link => {
  link.addEventListener('click', () => {
    if (typeof gtag === 'function') {
      gtag('event', 'conversion', {
        'send_to': 'AW-18019807514/whatsapp_click',
        'event_category': 'contact',
        'event_label': 'whatsapp_click'
      });
    }
  });
});
