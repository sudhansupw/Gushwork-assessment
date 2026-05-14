// Main JavaScript file for handling interactive features on the HDPE Pipes product page
document.addEventListener('DOMContentLoaded', () => {
  // Initialize all interactive functionality when the DOM is fully loaded

  /* ================= HEADER & MOBILE MENU ================= */
  // Handle sticky header behavior on scroll
  const header = document.getElementById('header');
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileMenuBackdrop = document.getElementById('mobile-menu-backdrop');
  const closeMenuText = document.getElementById('close-menu-text');

  const hbLine1 = document.getElementById('hb-line-1');
  const hbLine2 = document.getElementById('hb-line-2');
  const hbLine3 = document.getElementById('hb-line-3');

  let lastScrollY = window.scrollY;
  let isMenuOpen = false;

  // Sticky Header
  window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    if (currentScrollY > window.innerHeight / 4) {
      if (currentScrollY > lastScrollY) {
        header.classList.remove('-top-[77px]');
        header.classList.add('top-0');
      } else {
        header.classList.remove('top-0');
        header.classList.add('-top-[77px]');
      }
    } else {
      header.classList.remove('top-0');
      header.classList.add('-top-[77px]');
    }
    lastScrollY = currentScrollY;
  });

  // Mobile Menu Toggle
  function toggleMenu() {
    isMenuOpen = !isMenuOpen;
    if (isMenuOpen) {
      mobileMenu.classList.remove('translate-x-full', 'opacity-0');
      mobileMenu.classList.add('translate-x-0', 'opacity-100');
      
      mobileMenuBackdrop.classList.remove('opacity-0', 'pointer-events-none');
      mobileMenuBackdrop.classList.add('opacity-100', 'pointer-events-auto');

      hbLine1.classList.add('rotate-45', 'translate-y-1.5');
      hbLine2.classList.replace('opacity-100', 'opacity-0');
      hbLine3.classList.add('-rotate-45', '-translate-y-1.5');

      document.body.style.overflow = 'hidden';
    } else {
      mobileMenu.classList.add('translate-x-full', 'opacity-0');
      mobileMenu.classList.remove('translate-x-0', 'opacity-100');
      
      mobileMenuBackdrop.classList.add('opacity-0', 'pointer-events-none');
      mobileMenuBackdrop.classList.remove('opacity-100', 'pointer-events-auto');

      hbLine1.classList.remove('rotate-45', 'translate-y-1.5');
      hbLine2.classList.replace('opacity-0', 'opacity-100');
      hbLine3.classList.remove('-rotate-45', '-translate-y-1.5');

      document.body.style.overflow = '';
    }
  }

  hamburgerBtn.addEventListener('click', toggleMenu);
  mobileMenuBackdrop.addEventListener('click', toggleMenu);
  closeMenuText.addEventListener('click', toggleMenu);


  /* ================= HERO GALLERY & ZOOM ================= */
  // Image gallery with thumbnails and zoom functionality
  const images = [
    { url: './images/hero_first_image.png', alt: 'HDPE Pipes - View 1' },
    { url: './images/hero_second_image.jpg', alt: 'Pipeline Infrastructure - View 2' },
    { url: './images/hero_third_image.jpg', alt: 'Industrial Piping - View 3' },
    { url: './images/hero_fourth_image.jpg', alt: 'Pipeline System - View 4' },
    { url: './images/hero_fifth_image.jpg', alt: 'Modern Pipes - View 5' }
  ];

  let currentImageIndex = 0;
  const mainImage = document.getElementById('main-image');
  const prevBtn = document.getElementById('prev-btn');
  const nextBtn = document.getElementById('next-btn');
  const imageCounter = document.getElementById('image-counter');
  const thumbnailsContainer = document.getElementById('thumbnails-container');
  const zoomPreview = document.getElementById('zoom-preview');
  const magnifier = document.getElementById('magnifier');

  // Render thumbnails using the exact Tailwind classes
  images.forEach((img, index) => {
    const btn = document.createElement('button');
    // active: 'opacity-100 scale-105'
    // inactive: 'opacity-40 hover:opacity-70 scale-100 hover:scale-105'
    const baseClasses = "relative flex-shrink-0 rounded-xl overflow-hidden transition-all duration-300 ease-in-out w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24";
    const activeClasses = index === 0 ? "opacity-100 scale-105" : "opacity-40 hover:opacity-70 scale-100 hover:scale-105";
    
    btn.className = `${baseClasses} ${activeClasses}`;
    btn.innerHTML = `<div class="w-full h-full bg-gray-100"><img src="${img.url}" alt="${img.alt}" class="w-full h-full object-cover" /></div>`;
    btn.addEventListener('click', () => updateHeroImage(index));
    thumbnailsContainer.appendChild(btn);
  });

  function updateHeroImage(index) {
    currentImageIndex = index;
    mainImage.src = images[index].url;
    mainImage.alt = images[index].alt;
    imageCounter.textContent = `${index + 1} / ${images.length}`;

    // Update thumbnails
    Array.from(thumbnailsContainer.children).forEach((btn, i) => {
      if (i === index) {
        btn.classList.remove('opacity-40', 'hover:opacity-70', 'scale-100', 'hover:scale-105');
        btn.classList.add('opacity-100', 'scale-105');
      } else {
        btn.classList.remove('opacity-100', 'scale-105');
        btn.classList.add('opacity-40', 'hover:opacity-70', 'scale-100', 'hover:scale-105');
      }
    });
  }

  prevBtn.addEventListener('click', () => {
    const newIndex = currentImageIndex === 0 ? images.length - 1 : currentImageIndex - 1;
    updateHeroImage(newIndex);
  });

  nextBtn.addEventListener('click', () => {
    const newIndex = currentImageIndex === images.length - 1 ? 0 : currentImageIndex + 1;
    updateHeroImage(newIndex);
  });

  // Zoom logic
  mainImage.addEventListener('mouseenter', () => {
    zoomPreview.style.display = 'block';
    zoomPreview.style.backgroundImage = `url(${images[currentImageIndex].url})`;
    magnifier.style.display = 'flex';
  });

  mainImage.addEventListener('mousemove', (e) => {
    const rect = mainImage.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / mainImage.width) * 100;
    const y = ((e.clientY - rect.top) / mainImage.height) * 100;

    zoomPreview.style.backgroundPosition = `${x}% ${y}%`;
    magnifier.style.top = `${e.clientY - 50}px`;
    magnifier.style.left = `${e.clientX - 50}px`;
  });

  mainImage.addEventListener('mouseleave', () => {
    zoomPreview.style.display = 'none';
    magnifier.style.display = 'none';
  });


  /* ================= FEATURES DATA ================= */
  // Dynamically populate features grid with product benefits
  const featuresGrid = document.getElementById('features-grid');
  if (featuresGrid) {
    const features = [
      { icon: 'Bag.svg', title: 'Superior Chemical Resistance', desc: 'HDPE pipes resist a wide range of chemicals, acids, and alkalis. Unlike metal pipes, they won\'t corrode, rust, or scale, ensuring pure water quality and extended service life in aggressive environments.' },
      { icon: 'Needle.svg', title: 'Exceptional Flexibility & Durability', desc: 'HDPE pipes resist a wide range of chemicals, acids, and alkalis. Unlike metal pipes, they won\'t corrode, rust, or scale, ensuring pure water quality and extended service life in aggressive environments.' },
      { icon: 'Package.svg', title: 'Leak-Proof Fusion Welding', desc: 'HDPE pipes resist a wide range of chemicals, acids, and alkalis. Unlike metal pipes, they won\'t corrode, rust, or scale, ensuring pure water quality and extended service life in aggressive environments.' },
      { icon: 'GearFine.svg', title: 'Cost-Effective Long-Term Solution', desc: 'HDPE pipes resist a wide range of chemicals, acids, and alkalis. Unlike metal pipes, they won\'t corrode, rust, or scale, ensuring pure water quality and extended service life in aggressive environments.' },
      { icon: 'GearFine.svg', title: 'Environmentally Sustainable', desc: 'HDPE pipes resist a wide range of chemicals, acids, and alkalis. Unlike metal pipes, they won\'t corrode, rust, or scale, ensuring pure water quality and extended service life in aggressive environments.' },
      { icon: 'GearFine.svg', title: 'Certified Quality Assurance', desc: 'HDPE pipes resist a wide range of chemicals, acids, and alkalis. Unlike metal pipes, they won\'t corrode, rust, or scale, ensuring pure water quality and extended service life in aggressive environments.' }
    ];

    features.forEach(feature => {
      const div = document.createElement('div');
      div.className = 'p-5 rounded-2xl border border-[#CFD1D4] bg-white';
      div.innerHTML = `
        <img src="./images/${feature.icon}" alt="${feature.title}" />
        <p class="font-urbanist font-semibold text-xl leading-[120%] text-[#0D0D0D] mt-4">${feature.title}</p>
        <p class="font-inter text-sm leading-5 text-[#535A61] mt-4">${feature.desc}</p>
      `;
      featuresGrid.appendChild(div);
    });
  }


  /* ================= FAQ ACCORDION ================= */
  // FAQ accordion functionality for expanding/collapsing answers
  const faqList = document.getElementById('faq-list');
  if (faqList) {
    const faqs = [
      { question: 'What is the expected lifespan of your HDPE pipes?', answer: 'Our premium HDPE pipes are engineered for exceptional longevity. Under normal operating conditions (20°C and rated pressure), they have a proven service life exceeding 50 years, and often up to 100 years, requiring minimal to no maintenance.' },
      { question: 'Are these pipes suitable for drinking water applications?', answer: 'Yes, absolutely. Our HDPE pipes are manufactured using 100% virgin PE100 grade material. They are non-toxic, resist biological growth, and comply with strict international standards (including ISO and BIS) for safe potable water transmission.' },
      { question: 'How do HDPE pipes perform in extreme temperatures?', answer: 'HDPE pipes are highly versatile and maintain their structural integrity across a wide temperature range, typically from -40°C to +80°C. They are particularly resilient in freezing conditions, as their flexibility allows them to expand without cracking if water freezes inside.' }
    ];

    faqs.forEach((faq, idx) => {
      const div = document.createElement('div');
      div.className = 'p-5 rounded-xl border border-[#E1E3E8] bg-white';
      div.innerHTML = `
        <div class="flex items-center justify-between cursor-pointer faq-trigger">
          <p class="font-inter font-medium text-base text-black">${faq.question}</p>
          <img src="./images/accordian-close.svg" alt="toggle" class="faq-icon" />
        </div>
        <p class="mt-4 font-inter text-base text-[#535A61] faq-answer" style="display: none;">${faq.answer}</p>
      `;
      
      const trigger = div.querySelector('.faq-trigger');
      const answer = div.querySelector('.faq-answer');
      const icon = div.querySelector('.faq-icon');
      
      trigger.addEventListener('click', () => {
        const isOpen = answer.style.display === 'block';
        if (!isOpen) {
          answer.style.display = 'block';
          icon.src = './images/accordian-open.svg';
        } else {
          answer.style.display = 'none';
          icon.src = './images/accordian-close.svg';
        }
      });
      faqList.appendChild(div);
    });
  }


  /* ================= VERSATILE CAROUSEL ================= */
  // Versatile applications carousel with navigation controls
  const versatileScroll = document.getElementById('versatile-scroll');
  const vPrev = document.getElementById('versatile-prev');
  const vNext = document.getElementById('versatile-next');

  if (versatileScroll) {
    const vItems = [
      { title: 'Fishnet Manufacturing', desc: 'High-performance twisting solutions for packaging yarn, strapping materials, and reinforcement threads used in modern packaging applications.' },
      { title: 'Fishnet Manufacturing', desc: 'High-performance twisting solutions for packaging yarn, strapping materials, and reinforcement threads used in modern packaging applications.' },
      { title: 'Fishnet Manufacturing', desc: 'High-performance twisting solutions for packaging yarn, strapping materials, and reinforcement threads used in modern packaging applications.' },
      { title: 'Fishnet Manufacturing', desc: 'High-performance twisting solutions for packaging yarn, strapping materials, and reinforcement threads used in modern packaging applications.' }
    ];

    vItems.forEach((item) => {
      const div = document.createElement('div');
      div.className = "min-w-[320px] lg:min-w-[420px] h-[320px] lg:h-[420px] rounded-[24px] bg-cover bg-center relative";
      div.style.backgroundImage = `linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.579217) 40.23%, rgba(0, 0, 0, 0.8) 75.96%), url(./images/worker-mobile.svg)`;
      div.innerHTML = `
        <div class="absolute bottom-6 lg:bottom-8 left-[18px] lg:left-6 w-[283px]">
          <p class="font-urbanist font-medium text-[20px] lg:text-[26px] leading-[120%] text-white">${item.title}</p>
          <p class="mt-2 lg:mt-2.5 font-inter text-xs lg:text-base leading-[18px] lg:leading-6 text-white/80">${item.desc}</p>
        </div>
      `;
      versatileScroll.appendChild(div);
    });

    if (vPrev && vNext) {
      vPrev.addEventListener('click', () => {
        versatileScroll.scrollBy({ left: -340, behavior: 'smooth' });
      });
      vNext.addEventListener('click', () => {
        versatileScroll.scrollBy({ left: 340, behavior: 'smooth' });
      });
    }
  }


  /* ================= HDPE PROCESS ================= */
  // HDPE manufacturing process stepper with dynamic content updates
  const steps = [
    { title: 'Raw Material', heading: 'High-Grade Raw Material Selection', content: 'Vacuum sizing tanks ensure precise outer diameter while internal pressure maintains perfect roundness and wall thickness uniformity.', features: ['PE100 grade material', 'Optimal molecular weight distribution'], image: './images/high-grade.svg' },
    { title: 'Extrusion', heading: 'High-Efficiency Extrusion Lines', content: 'Our single-screw extruders melt and transport the PE material uniformly, ensuring a perfectly homogenous pipe structure without degradation.', features: ['High-torque motor drive', 'Advanced barrel heating zones'], image: './images/high-grade.svg' },
    { title: 'Cooling', heading: 'Multi-Stage Vacuum Cooling', content: 'Extruded pipes pass through specialized vacuum calibration tanks and cooling baths to lock in exact dimensions and structural stability.', features: ['Closed-loop water circulation', 'Rapid heat dissipation'], image: './images/high-grade.svg' },
    { title: 'Sizing', heading: 'Laser-Guided Calibration', content: 'Real-time laser micrometers continuously monitor wall thickness and pipe diameter to ensure zero deviation from designated specifications.', features: ['360-degree ultrasonic scanning', 'Automated feedback loop'], image: './images/high-grade.svg' },
    { title: 'Quality Control', heading: 'Rigorous Stress Testing', content: 'Each batch undergoes hydrostatic pressure testing and tensile strength analysis in our certified in-house laboratory.', features: ['ISO-compliant lab procedures', 'Hydrostatic failure tests'], image: './images/high-grade.svg' },
    { title: 'Marking', heading: 'Permanent Hot-Foil Stamping', content: 'Pipes are permanently imprinted with essential data including pressure rating, SDR class, date of manufacture, and quality stamps.', features: ['High-contrast color coding', 'Indelible thermal printing'], image: './images/high-grade.svg' },
    { title: 'Cutting', heading: 'Planetary Saw Cutting', content: 'Automated planetary saws perform smooth, chamfered cuts without creating chips or dust, preparing the pipe perfectly for jointing.', features: ['Dust-free extraction system', 'Automatic length measuring'], image: './images/high-grade.svg' },
    { title: 'Packaging', heading: 'Secure Coiling & Bundling', content: 'Smaller diameters are neatly wound using automated coilers, while straight lengths are securely strapped into timber frames for safe transit.', features: ['Tension-controlled coiling', 'UV-resistant protective wrapping'], image: './images/high-grade.svg' }
  ];

  let currentStep = 0;
  const desktopStepsContainer = document.getElementById('desktop-steps-container');
  const mobileStepText = document.getElementById('mobile-step-text');
  const hdpeHeading = document.getElementById('hdpe-heading');
  const hdpeDesc = document.getElementById('hdpe-desc');
  const hdpeFeatures = document.getElementById('hdpe-features');
  const hdpeImg = document.getElementById('hdpe-img');
  
  const hdpePrev = document.getElementById('hdpe-prev');
  const hdpeNext = document.getElementById('hdpe-next');

  // Render desktop steps matching exact Tailwind classes
  if (desktopStepsContainer) {
    steps.forEach((step, index) => {
      const btn = document.createElement('button');
      
      const baseClasses = "flex justify-center items-center px-4 py-2 rounded-[32px] font-inter font-medium text-sm leading-5 text-center whitespace-nowrap flex-shrink-0 transition-colors duration-200";
      const activeClasses = index === 0 ? "bg-[#2B3990] text-white" : "bg-white border border-[#CFD1D4] text-[#0D0D0D] hover:bg-[#F7F8F9]";
      
      btn.className = `${baseClasses} ${activeClasses}`;
      btn.textContent = step.title;
      btn.addEventListener('click', () => updateHdpeStep(index));
      desktopStepsContainer.appendChild(btn);

      if (index < steps.length - 1) {
        const line = document.createElement('div');
        line.className = 'h-px bg-[#CFD1D4] w-full';
        desktopStepsContainer.appendChild(line);
      }
    });
  }

  function updateHdpeStep(index) {
    currentStep = index;
    const data = steps[index];

    hdpeHeading.textContent = data.heading;
    hdpeDesc.textContent = data.content;
    hdpeImg.src = data.image;
    
    hdpeFeatures.innerHTML = '';
    data.features.forEach(f => {
      const li = document.createElement('li');
      li.className = "font-inter font-medium text-sm leading-5 text-[#0D0D0D] flex items-center gap-1.5";
      li.innerHTML = `<img src="./images/CheckCircle.svg" alt="" class="w-5 h-5 flex-shrink-0" aria-hidden="true" /> ${f}`;
      hdpeFeatures.appendChild(li);
    });

    if (mobileStepText) {
      mobileStepText.textContent = `Step ${index + 1}/${steps.length}: ${data.title}`;
    }

    if (desktopStepsContainer) {
      const chips = desktopStepsContainer.querySelectorAll('button');
      chips.forEach((chip, i) => {
        if (i === index) {
          chip.classList.remove('bg-white', 'border', 'border-[#CFD1D4]', 'text-[#0D0D0D]', 'hover:bg-[#F7F8F9]');
          chip.classList.add('bg-[#2B3990]', 'text-white');
        } else {
          chip.classList.remove('bg-[#2B3990]', 'text-white');
          chip.classList.add('bg-white', 'border', 'border-[#CFD1D4]', 'text-[#0D0D0D]', 'hover:bg-[#F7F8F9]');
        }
      });
    }
  }

  if (hdpePrev && hdpeNext) {
    hdpePrev.addEventListener('click', () => {
      const newIndex = currentStep > 0 ? currentStep - 1 : steps.length - 1;
      updateHdpeStep(newIndex);
    });
    hdpeNext.addEventListener('click', () => {
      const newIndex = currentStep < steps.length - 1 ? currentStep + 1 : 0;
      updateHdpeStep(newIndex);
    });
  }


  /* ================= TESTIMONIALS CAROUSEL ================= */
  // Testimonials carousel displaying customer feedback
  const testimonialsCarousel = document.getElementById('testimonials-carousel');
  if (testimonialsCarousel) {
    const tItems = [
      { image: './images/performance.svg', heading: 'Revolutionized our FIBC production efficiency!', content: "Meera Industries' TFO machines have revolutionized our FIBC production efficiency. The precision engineering delivers the consistent yarn strength critical for our bulk container applications.", profileName: 'Johann Mueller', profileTitle: 'Production Director' },
      { image: './images/performance.svg', heading: 'Revolutionized our FIBC production efficiency!', content: "Meera Industries' TFO machines have revolutionized our FIBC production efficiency. The precision engineering delivers the consistent yarn strength critical for our bulk container applications.", profileName: 'Johann Mueller', profileTitle: 'Production Director' },
      { image: './images/performance.svg', heading: 'Revolutionized our FIBC production efficiency!', content: "Meera Industries' TFO machines have revolutionized our FIBC production efficiency. The precision engineering delivers the consistent yarn strength critical for our bulk container applications.", profileName: 'Johann Mueller', profileTitle: 'Production Director' },
      { image: './images/performance.svg', heading: 'Revolutionized our FIBC production efficiency!', content: "Meera Industries' TFO machines have revolutionized our FIBC production efficiency. The precision engineering delivers the consistent yarn strength critical for our bulk container applications.", profileName: 'Johann Mueller', profileTitle: 'Production Director' }
    ];

    tItems.forEach((t) => {
      const div = document.createElement('div');
      div.className = "p-5 lg:p-8 rounded-[24px] bg-[#F7F8F9] border-[1.5px] border-[#E1E3E8] w-[280px] lg:w-[420px] flex-shrink-0";
      div.innerHTML = `
        <img src="${t.image}" alt="performance" class="w-8 h-6" />
        <div class="flex flex-col mt-8 gap-4">
          <p class="font-urbanist font-semibold text-2xl lg:text-2xl leading-[120%] text-[#0D0D0D]">${t.heading}</p>
          <p class="font-inter text-sm leading-5 text-[#535A61]">${t.content}</p>
        </div>
        <div class="mt-10 lg:mt-16 flex gap-3 items-center">
          <div class="bg-[#E1E3E8] w-12 h-12 rounded-full flex-shrink-0"></div>
          <div class="flex flex-col gap-1">
            <p class="font-inter font-semibold text-base leading-6 text-[#0D0D0D]">${t.profileName}</p>
            <p class="font-inter text-xs leading-4 text-[#535A61]">${t.profileTitle}</p>
          </div>
        </div>
      `;
      testimonialsCarousel.appendChild(div);
    });
  }

  /* ================= SOLUTIONS ================= */
  // Solutions grid population with product offerings
  const solutionsGrid = document.getElementById('solutions-grid');
  if (solutionsGrid) {
    const sItems = [
      { title: 'HDPE Fittings & Accessories', description: 'Complete range of electrofusion and butt fusion fittings, including elbows, tees, reducers, and couplers for seamless pipe connections.', image: './images/engineer.svg' },
      { title: 'Professional Installation Services', description: 'Expert installation and fusion welding services ensuring optimal system performance, compliance with standards, and long-term reliability.', image: './images/engineer-2.svg' },
      { title: 'PE-RT Heating Pipes', description: 'Polyethylene of Raised Temperature resistance pipes ideal for underfloor heating, radiator connections, and hot water applications.', image: './images/engineer.svg' }
    ];

    sItems.forEach(s => {
      const div = document.createElement('div');
      div.className = "bg-white border border-[#CFD1D4] rounded-[20px] p-6 flex flex-col";
      div.innerHTML = `
        <div class="flex flex-col gap-4 mb-6">
          <h3 class="font-urbanist font-semibold text-[28px] leading-[120%] text-[#0D0D0D]">${s.title}</h3>
          <p class="font-inter text-sm leading-5 text-[#4D545C]">${s.description}</p>
        </div>
        <div class="mt-auto">
          <div class="mb-5"><img src="${s.image}" alt="${s.title}" class="w-full h-auto rounded-2xl object-cover" /></div>
          <button class="w-full bg-[#2B39900D] border border-[#2B39903D] text-[#2B3990] font-inter font-medium text-sm py-2 rounded-xl hover:bg-[#2B39901A] transition-colors duration-200" type="button">Learn More</button>
        </div>
      `;
      solutionsGrid.appendChild(div);
    });
  }

  /* ================= RESOURCES ================= */
  // Resources list population with downloadable documents
  const resourcesList = document.getElementById('resources-list');
  if (resourcesList) {
    const rItems = [
      { title: 'HDPE Pipe Installation Manual', format: 'PDF' },
      { title: 'Maintenance & Inspection Handbook', format: 'PDF' },
      { title: 'Engineering Specifications Sheet', format: 'PDF' }
    ];

    rItems.forEach(r => {
      const div = document.createElement('div');
      div.className = "flex items-center justify-between gap-4";
      div.innerHTML = `
        <div class="flex-1">
          <h3 class="font-inter font-medium text-base text-[#0D0D0D]">${r.title} (${r.format})</h3>
        </div>
        <button class="flex items-center gap-2 font-inter font-semibold text-base text-[#2B3990] hover:text-[#1f2a6b] transition-colors duration-200 flex-shrink-0" type="button">
          <span>Download PDF</span>
          <img src="./images/Download-icon.svg" alt="" class="w-5 h-5" aria-hidden="true" />
        </button>
      `;
      resourcesList.appendChild(div);
    });
  }

  // Initial setup function calls
  updateHdpeStep(0);
});
