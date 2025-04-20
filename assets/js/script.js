// ===== HERO SLIDER =====
document.addEventListener('DOMContentLoaded', function() {
    // Initialize slider
    const slider = {
      slides: document.querySelectorAll('.slide'),
      currentIndex: 0,
      interval: null,
      
      init() {
        this.showSlide(this.currentIndex);
        this.startAutoPlay();
        this.setupEventListeners();
      },
      
      showSlide(index) {
        this.slides.forEach((slide, i) => {
          slide.classList.toggle('active', i === index);
        });
      },
      
      nextSlide() {
        this.currentIndex = (this.currentIndex + 1) % this.slides.length;
        this.showSlide(this.currentIndex);
      },
      
      prevSlide() {
        this.currentIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
        this.showSlide(this.currentIndex);
      },
      
      startAutoPlay() {
        this.interval = setInterval(() => this.nextSlide(), 5000);
      },
      
      stopAutoPlay() {
        clearInterval(this.interval);
      },
      
      setupEventListeners() {
        // Navigation buttons
        const nextBtn = document.querySelector('.next');
        const prevBtn = document.querySelector('.prev');
        
        if (nextBtn) nextBtn.addEventListener('click', () => {
          this.nextSlide();
          this.stopAutoPlay();
          this.startAutoPlay();
        });
        
        if (prevBtn) prevBtn.addEventListener('click', () => {
          this.prevSlide();
          this.stopAutoPlay();
          this.startAutoPlay();
        });
        
        // Pause on hover
        const sliderContainer = document.querySelector('.slider-container');
        if (sliderContainer) {
          sliderContainer.addEventListener('mouseenter', () => this.stopAutoPlay());
          sliderContainer.addEventListener('mouseleave', () => this.startAutoPlay());
        }
      }
    };
    
    slider.init();
  
    // ===== VIDEO CONTROLS =====
    document.querySelectorAll('video').forEach(video => {
      const card = video.closest('.interview-card');
      const playBtn = card ? card.querySelector('.play-btn') : null;
      
      if (playBtn) {
        playBtn.addEventListener('click', () => {
          if (video.paused) {
            video.play();
            playBtn.textContent = '❚❚';
          } else {
            video.pause();
            playBtn.textContent = '▶';
          }
        });
      }
    });
  
    // ===== PDF PREVIEWS =====
    document.querySelectorAll('.pdf-preview').forEach(preview => {
      const pdfPath = preview.dataset.pdf;
      if (pdfPath) {
        // This would be where you'd implement PDF.js or similar for actual thumbnails
        preview.innerHTML = '<div style="font-size:3rem">📄</div><div style="font-size:0.7rem">PDF</div>';
        preview.style.display = 'flex';
        preview.style.flexDirection = 'column';
        preview.style.alignItems = 'center';
        preview.style.justifyContent = 'center';
      }
    });
  
    // ===== MOBILE MENU TOGGLE =====
    const menuToggle = document.createElement('button');
    menuToggle.className = 'menu-toggle';
    menuToggle.innerHTML = '☰';
    menuToggle.style.display = 'none';
    
    const nav = document.querySelector('nav');
    if (nav) {
      nav.parentNode.insertBefore(menuToggle, nav);
      
      function checkScreenSize() {
        if (window.innerWidth <= 600) {
          menuToggle.style.display = 'block';
          nav.style.display = 'none';
        } else {
          menuToggle.style.display = 'none';
          nav.style.display = 'block';
        }
      }
      
      menuToggle.addEventListener('click', () => {
        nav.style.display = nav.style.display === 'none' ? 'block' : 'none';
      });
      
      window.addEventListener('resize', checkScreenSize);
      checkScreenSize();
    }
  
    // ===== SCROLL TO TOP BUTTON =====
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.innerHTML = '↑';
    scrollToTopBtn.style.display = 'none';
    document.body.appendChild(scrollToTopBtn);
    
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 300) {
        scrollToTopBtn.style.display = 'block';
      } else {
        scrollToTopBtn.style.display = 'none';
      }
    });
    
    scrollToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });
  // ===== ARTICLE READ MORE FUNCTIONALITY =====
document.querySelectorAll('.read-full').forEach(btn => {
    btn.addEventListener('click', function() {
      const content = this.parentElement.querySelector('.writing-content');
      if (content.style.maxHeight) {
        content.style.maxHeight = null;
        this.textContent = 'Read Full Story';
      } else {
        content.style.maxHeight = content.scrollHeight + 'px';
        this.textContent = 'Show Less';
      }
    });
  });
