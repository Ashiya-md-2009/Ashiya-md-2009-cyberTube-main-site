// Check sessionStorage to see if preloader already shown
const preloaderShown = sessionStorage.getItem('preloaderShown');

if(preloaderShown){
  // Preloader already shown before, hide immediately
  document.getElementById('loaderWrapper').style.display='none';
  document.getElementById('siteMain').classList.add('show');
  document.getElementById('mainNavbar').classList.add('show');
} else {
  // Show preloader and mark it as shown
  sessionStorage.setItem('preloaderShown', 'true');

  const TOTAL_DURATION = 4200;
  const LOGS = [
    "KALI-LINUX",
    "TERMUX",
    "WEB-SITE ATTACK",
    "CYBER ATTACK",
    "Wifi Atta",
    "SPAWNING VIRTUAL ENV",
    "RUNNING INTEGRITY SCANS"
  ];

  const progressBar = document.getElementById('progressBar');
  const progressNum = document.getElementById('progressNum');
  const logArea = document.getElementById('logArea');
  const loaderWrapper = document.getElementById('loaderWrapper');
  const siteMain = document.getElementById('siteMain');
  const mainNavbar = document.getElementById('mainNavbar');
  const typingText = document.getElementById('typingText');

  // Typing animation
  (function typingLoop(){
    const txt = typingText.getAttribute('data-text') || typingText.textContent;
    let idx=0;
    function step(){
      typingText.textContent = txt.slice(0, idx+1);
      idx++;
      if(idx<=txt.length) setTimeout(step, 60);
      else setTimeout(()=>{ typingText.textContent=''; idx=0; setTimeout(step,140); },600);
    }
    step();
  })();

  const startTime = performance.now();
  const endTime = startTime + TOTAL_DURATION;
  let lastLogIndex=-1;

  function easeOutCubic(t){ return 1 - Math.pow(1 - t, 3); }

  function animateFrame(now){
    const elapsed = now - startTime;
    const t = Math.min(1, elapsed / TOTAL_DURATION);
    const eased = easeOutCubic(t);
    const percent = Math.floor(eased * 100);

    progressBar.style.width = percent+'%';
    progressNum.textContent = percent+'%';

    const logCount = Math.floor(LOGS.length * eased);
    if(logCount-1 > lastLogIndex){
      for(let i=lastLogIndex+1;i<logCount;i++){
        const line = document.createElement('div');
        line.className='logLine';
        line.style.animationDelay = (i*80)+'ms';
        line.textContent='[OK] '+LOGS[i];
        logArea.appendChild(line);
        logArea.scrollTop = logArea.scrollHeight;
      }
      lastLogIndex = logCount-1;
    }

    if(now < endTime){
      requestAnimationFrame(animateFrame);
    } else {
      progressBar.style.width='100%';
      progressNum.textContent='100%';
      const finalLine = document.createElement('div');
      finalLine.className='logLine';
      finalLine.style.animationDelay='60ms';
      finalLine.textContent='>> ACCESS GRANTED';
      logArea.appendChild(finalLine);
      logArea.scrollTop = logArea.scrollHeight;

      setTimeout(()=>{
        loaderWrapper.style.opacity=0;
        loaderWrapper.style.visibility='hidden';
        siteMain.classList.add('show');
        mainNavbar.classList.add('show');
      },300);
    }
  }

  requestAnimationFrame(animateFrame);
}