document.addEventListener('DOMContentLoaded', () => {
  const body = document.body;
  const themeToggle = document.getElementById('themeToggle');
  const savedTheme = localStorage.getItem('portfolioTheme');
  if (savedTheme === 'day') body.classList.add('day-mode');
  function updateThemeText(){ themeToggle.textContent = body.classList.contains('day-mode') ? '🌙 Night' : '☀️ Day'; }
  if (themeToggle) {
    updateThemeText();
    themeToggle.addEventListener('click', () => {
      body.classList.toggle('day-mode');
      localStorage.setItem('portfolioTheme', body.classList.contains('day-mode') ? 'day' : 'night');
      updateThemeText();
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) { e.preventDefault(); target.scrollIntoView({behavior:'smooth'}); }
    });
  });

  const skillSpans = document.querySelectorAll('.clickable-skill');
  const circle = document.querySelector('.circle');
  const percentageText = document.querySelector('.percentage-text');
  const selectedSkill = document.getElementById('selected-skill');
  skillSpans.forEach(btn => btn.addEventListener('click', () => {
    const level = Number(btn.dataset.level || 0);
    const circumference = 2 * Math.PI * 40;
    circle.style.strokeDashoffset = circumference - (level / 100) * circumference;
    percentageText.textContent = `${level}%`;
    selectedSkill.textContent = btn.dataset.skill;
  }));

  const lines = [
     "Industrial & Production Engineering Student",
  "Supply Chain, Operations & Data Analytics Enthusiast",
  "Machine Learning Learner Solving Real-World Problems",
  "Passionate About Process Optimization & Project Management"
  ];
  const typingText = document.getElementById('typing-text');
  let lineIndex = 0, charIndex = 0, deleting = false;
  function typeLine(){
    if(!typingText) return;
    const current = lines[lineIndex];
    typingText.textContent = current.slice(0, charIndex);
    if(!deleting && charIndex < current.length){ charIndex++; setTimeout(typeLine,55); }
    else if(!deleting){ deleting = true; setTimeout(typeLine,1400); }
    else if(charIndex > 0){ charIndex--; setTimeout(typeLine,28); }
    else { deleting = false; lineIndex = (lineIndex + 1) % lines.length; setTimeout(typeLine,450); }
  }
  typeLine();

  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  if(hamburger && navLinks){
    hamburger.addEventListener('click', () => navLinks.classList.toggle('show'));
    navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('show')));
  }
});
