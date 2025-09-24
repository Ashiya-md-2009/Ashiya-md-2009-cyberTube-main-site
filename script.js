/* ==========================
   TYPING CURSOR EFFECT
========================== */
(function(){
  const type=document.querySelector('.type');
  const cursor=document.querySelector('.cursor');
  if(type && cursor){
    const text=type.textContent.trim();
    type.textContent='';
    cursor.style.opacity='1';
    let i=0;
    const t=setInterval(()=>{
      if(i<text.length){type.textContent+=text[i++];}
      else{clearInterval(t);setTimeout(()=>cursor.style.opacity='0',600);}
    },80);
  }
})();

/* ==========================
   NAVBAR ACTIVE INDICATOR
========================== */
(function(){
  const menu=document.getElementById('menu');
  const indicator=document.getElementById('indicator');
  const links=menu.querySelectorAll('a');

  function updateIndicator(el){
    const rect=el.getBoundingClientRect();
    const parent=el.closest('nav').getBoundingClientRect();
    indicator.style.width=rect.width+'px';
    indicator.style.left=(rect.left-parent.left)+'px';
    indicator.style.opacity='1';
  }

  if(links.length) updateIndicator(links[0]);

  links.forEach(a=>{
    a.addEventListener('click',e=>{
      e.preventDefault();
      links.forEach(x=>x.classList.remove('active'));
      a.classList.add('active');
      updateIndicator(a);
      const id=a.getAttribute('href');
      if(id.startsWith('#')){
        const t=document.querySelector(id);
        if(t) t.scrollIntoView({behavior:'smooth',block:'start'});
      }
    });
    a.addEventListener('mouseenter',()=>updateIndicator(a));
  });

  const nav=document.querySelector('nav.navlinks');
  nav.addEventListener('mouseleave',()=>{const active=nav.querySelector('a.active')||links[0];updateIndicator(active);});
  window.addEventListener('resize',()=>{const active=nav.querySelector('a.active')||links[0];if(active) updateIndicator(active);});
})();

/* ==========================
   HAMBURGER & MOBILE PANEL
========================== */
(function(){
  const hambtn=document.getElementById('hambtn');
  const mobilePanel=document.getElementById('mobilePanel');

  function closePanel(){mobilePanel.classList.remove('show');}

  hambtn.addEventListener('click',e=>{
    e.stopPropagation();
    mobilePanel.classList.toggle('show');
  });

  mobilePanel.querySelectorAll('a').forEach(a=>a.addEventListener('click',closePanel));

  document.addEventListener('click',e=>{
    if(mobilePanel.classList.contains('show') && !mobilePanel.contains(e.target) && e.target!==hambtn){
      closePanel();
    }
  });

  window.addEventListener('resize',()=>{if(window.innerWidth>900){closePanel();}});
})();

/* ==========================
   HEADER SCROLL EFFECT
========================== */
(function(){
  const header=document.querySelector('header.nav');
  let ticking=false;
  window.addEventListener('scroll',()=>{
    if(!ticking){
      window.requestAnimationFrame(()=>{
        const sc=window.scrollY;
        header.style.transform=sc>30?'translateY(-4px) scale(0.995)':'translateY(0) scale(1)';
        header.style.boxShadow=sc>20?'0 20px 60px rgba(0,0,0,0.6)':'0 8px 40px rgba(0,0,0,0.6)';
        ticking=false;
      });
      ticking=true;
    }
  });
})();


















// background: ඇනිමෙෂන් 💡💡💡
const canvas = document.getElementById('matrixCanvas');
  const ctx = canvas.getContext('2d');

  // canvas size
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  // characters
  const letters = "01A2B3C4D5E6F7G8H9IJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz@#$%^&*()";
  const lettersArray = letters.split("");

  const fontSize = 14;
  const columns = canvas.width / fontSize;

  const drops = [];
  for(let x = 0; x < columns; x++) {
    drops[x] = Math.random() * canvas.height;
  }

  function draw() {
    // translucent background for fading effect
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#00FF00"; // hacking green
    ctx.font = fontSize + "px monospace";

    for(let i = 0; i < drops.length; i++) {
      const text = lettersArray[Math.floor(Math.random() * lettersArray.length)];
      ctx.fillText(text, i * fontSize, drops[i] * fontSize);

      // reset drop
      if(drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i]++;
    }
  }

  setInterval(draw, 50);

  // responsive
  window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
  
  
  
  
  
  
  // Change button now 
 function changeText(textId) {
  // සියලුම text hide කරන්න
  let allTexts = document.querySelectorAll('.btn-text');
  allTexts.forEach(div => div.style.display = "none");
  
  // අවශ්‍ය text එක show කරන්න
  document.getElementById(textId).style.display = "block";
}

// Page open උනාම පලවෙනි text load කරන්න
window.onload = function() {
  changeText('text1');
}




//=============== number Change 🌐🌐 =====
  const counters = document.querySelectorAll('.number');
const speed = 200;

function startCounter(counter) {
  const updateCount = () => {
    const target = +counter.getAttribute('data-target');
    const count = +counter.innerText;
    const increment = Math.ceil(target / speed);
    
    if (count < target) {
      counter.innerText = count + increment;
      setTimeout(updateCount, 30);
    } else {
      counter.innerText = target + "+";
    }
  };
  updateCount();
}

// Observer use කරලා scroll down උනාම run කරන්න
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const numberEl = entry.target;
      if (!numberEl.classList.contains("counted")) {
        startCounter(numberEl);
        numberEl.classList.add("counted");
      }
    }
  });
}, { threshold: 0.6 });

counters.forEach(counter => {
  observer.observe(counter);
});





//type p text =====≠==========^=° 😌 💗
const elements = document.querySelectorAll(".typewriter");

    async function typeText(el, text) {
      el.textContent = "";
      for (let i = 0; i < text.length; i++) {
        el.textContent = text.substring(0, i + 1);
        el.style.width = (i + 1) + "ch"; // 🟢 grow to right
        await new Promise(resolve => setTimeout(resolve, 100));
      }
      el.style.borderRight = "2px solid transparent"; // cursor stop
      await new Promise(resolve => setTimeout(resolve, 200));
    }

    async function startTyping() {
      for (let el of elements) {
        const text = el.getAttribute("data-text");
        await typeText(el, text);
      }
    }

    startTyping();
    
    
    
    
    
   
  //====================Change img 🤗🤗
  const slider = document.getElementById("slider");
const totalSlides = slider.children.length;
let index = 0;

function showSlide(i) {
  if (i >= totalSlides) index = 0;
  else if (i < 0) index = totalSlides - 1;
  else index = i;
  slider.style.transform = `translateX(${-index * 100}%)`;
}

function nextSlide() {
  showSlide(index + 1);
}

function prevSlide() {
  showSlide(index - 1);
}

// -------- Auto Slide (every 3s) ----------
setInterval(nextSlide, 3000);

// -------- Drag / Swipe feature ----------
const sliderContainer = document.getElementById("sliderContainer");
let startX = 0;
let isDown = false;

sliderContainer.addEventListener("mousedown", (e) => {
  isDown = true;
  startX = e.clientX;
  sliderContainer.style.cursor = "grabbing";
});

sliderContainer.addEventListener("mouseup", (e) => {
  if (!isDown) return;
  isDown = false;
  sliderContainer.style.cursor = "grab";
  let endX = e.clientX;
  if (startX - endX > 50) nextSlide();
  if (endX - startX > 50) prevSlide();
});

sliderContainer.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
});

sliderContainer.addEventListener("touchend", (e) => {
  let endX = e.changedTouches[0].clientX;
  if (startX - endX > 50) nextSlide();
  if (endX - startX > 50) prevSlide();
});




//========= NEWS text p animation 😂
document.addEventListener("DOMContentLoaded", () => {
  const texts = document.querySelectorAll(".animatedText");
  
  if (texts.length > 0) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show"); // එක එකට class එක දායි
        }
      });
    });
    
    texts.forEach(text => observer.observe(text));
  }
});




//*========== Questions-div 🥷🇱�
const headers = document.querySelectorAll(".toggle-header");

headers.forEach(header => {
  header.addEventListener("click", () => {
    const content = header.nextElementSibling;

    // අනිත් open content සබල කරන්න
    document.querySelectorAll(".toggle-content").forEach(c => {
      if (c !== content) {
        c.classList.remove("show");
        c.previousElementSibling.classList.remove("active");
      }
    });

    // click කළ content toggle කරන්න
    content.classList.toggle("show");
    header.classList.toggle("active");
  });
});


// ==== main.html එකට යන එන බටන් දෙක
// Navigate from index.html → main.html
function goToMain() {
  // main.html එකට යන්න
  window.location.assign('main.html');
}

function goBack() {
      // JS only back
      if (window.history.length > 1) {
        window.history.back(); // browser history exist
      } else {
        alert("No previous page in history"); // fallback
      }
    }
    
    
 // Freee.html ekt js
// Navigate from index.html → free.html
function goTofree() {
  window.location.assign('free.html'); // JS only navigation
}

// Membership.html ekt js
// Navigate from index.html → Membership.html
function goTomember() {
  window.location.assign('Membership.html'); // JS only navigation
}  







//Smooth Scroll to Element 🌐🌐
const links = [
  { id: 'link1', target: 'bottomText1' },
  { id: 'link2', target: 'bottomText2' },
  { id: 'link3', target: 'bottomText3' },
  { id: 'link4', target: 'bottomText4' } // make sure bottomText4 exists
];

links.forEach(item => {
  const link = document.getElementById(item.id);
  const target = document.getElementById(item.target);

  if (!link || !target) return; // check null

  link.addEventListener('click', function(e) {
    e.preventDefault();

    target.scrollIntoView({ behavior: 'smooth', block: 'center' });

    // hide all
    document.querySelectorAll('.bottomText').forEach(sec => {
      sec.classList.remove('show');
    });

    // show target
    setTimeout(() => {
      target.classList.add('show');
    }, 300);
  });
});






/// Back model 🌝💡
const openBtn = document.getElementById('openModal');
  const backdrop = document.getElementById('backdrop');
  const closeBtn = document.getElementById('closeBtn');

  function showModal(){
    backdrop.classList.add('show');
    backdrop.setAttribute('aria-hidden','false');
    document.body.style.overflow = 'hidden';
  }
  function hideModal(){
    backdrop.classList.remove('show');
    backdrop.setAttribute('aria-hidden','true');
    document.body.style.overflow = '';
  }

  openBtn.addEventListener('click', (e)=>{
    e.preventDefault(); // <a> link action block
    showModal();
  });
  closeBtn.addEventListener('click', hideModal);

  backdrop.addEventListener('click', (e)=>{
    if(e.target === backdrop) hideModal();
  });
  document.addEventListener('keydown', (e)=>{
    if(e.key === 'Escape' && backdrop.classList.contains('show')) hideModal();
  });
