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

// Teklif formu - E-posta (mailto ile direkt mail uygulaması açılır)
function gonderEmail() {
  const ad = document.getElementById('teklif-ad').value.trim();
  const tel = document.getElementById('teklif-tel').value.trim();
  const hizmet = document.getElementById('teklif-hizmet').value;
  const mesaj = document.getElementById('teklif-mesaj').value.trim();

  if (!ad || !tel) {
    alert('Lütfen ad soyad ve telefon alanlarını doldurun.');
    return;
  }

  const subject = `Teklif Talebi - ${ad}`;
  let body = `Ad Soyad: ${ad}\nTelefon: ${tel}`;
  if (hizmet) body += `\nHizmet: ${hizmet}`;
  if (mesaj) body += `\n\nMesaj:\n${mesaj}`;
  body += `\n\n--- Bu mesaj securvia.com.tr teklif formundan gönderilmiştir ---`;

  window.location.href = `mailto:ramazan@securvia.com.tr?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
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
