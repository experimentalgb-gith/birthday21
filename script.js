// Wishes
const wishes = [
  "Happy Birthday Prayukta 🎂",
  "Janmadin Mubarak ho 🎉",
  "Feliz Cumpleaños✨ ",
  "Bonne Anniversaire 🎶",
  "Alles Gute zum Geburtstag 🎊",
  "Buon Compleanno 🍰",
  "Saengil Chukhahae 🎁",
  "Otanjoubi Omedetou 🎀",
  "Shēngrì Kuàilè 🎂",
  "Happy wala Birthday 🥳",
  "Stay happy forever 🌸",
  "May all your dreams come true 💫",
  "Keep smiling always 😊",
  "You're the best 🎇",
  "Wish you success 📚",
  "Happy 21st October 🌹"
];

let wishIndex = 0;
let navigationHistory = [];

function checkPassword() {
  const val = document.getElementById("password").value.trim();
  if (val.toLowerCase() === "21oct") {
    document.getElementById("login-screen").style.display = "none";
    document.getElementById("card-container").style.display = "block";
    showPage("wishes-page");
    document.getElementById("wish-text").innerText = wishes[0];
  } else {
    document.getElementById("login-error").innerText = "Wrong code! Try again 🎈";
  }
}

function nextWish() {
  wishIndex++;
  if (wishIndex < wishes.length) {
    document.getElementById("wish-text").innerText = wishes[wishIndex];
  } else {
    showPage("birthday-page");
  }
}

function showPage(id) {
  const currentPage = document.querySelector('.page[style*="display: block"], .page[style*="display:block"]');
  if (currentPage && currentPage.id !== id && currentPage.id !== 'login-screen') {
    if (navigationHistory.length === 0 || navigationHistory[navigationHistory.length - 1] !== currentPage.id) {
      navigationHistory.push(currentPage.id);
    }
  }
  
  document.querySelectorAll('.page').forEach(page => page.style.display = "none");
  const targetPage = document.getElementById(id);
  if (targetPage) targetPage.style.display = "block";
  
  if (id === "tracker-page") {
    buildTracker();
    updateAllStats();
  }
  if (id === 'canvas-page') setTimeout(initCanvas, 100);
}

function goBack() {
  if (navigationHistory.length > 0) {
    const previousPage = navigationHistory.pop();
    document.querySelectorAll('.page').forEach(page => page.style.display = "none");
    const targetPage = document.getElementById(previousPage);
    if (targetPage) targetPage.style.display = "block";
    
    if (previousPage === "tracker-page") {
      buildTracker();
      updateAllStats();
    }
  } else {
    alert("You're already at the beginning! 🎉");
  }
}

function playAudio() {
  document.getElementById("guitar-audio").play();
}

function pauseAudio() {
  document.getElementById("guitar-audio").pause();
}

// ========== SIMPLE CAKE CUTTING ==========
let cakeCut = false;

function cutTheCake() {
  if (cakeCut) return;
  
  const wholeCake = document.getElementById('whole-cake-div');
  const cutResult = document.getElementById('cut-result');
  
  wholeCake.style.transition = 'all 1s ease';
  wholeCake.style.opacity = '0';
  wholeCake.style.transform = 'scale(0.5)';
  
  setTimeout(() => {
    wholeCake.classList.add('hidden');
    cutResult.classList.remove('hidden');
    
    createConfetti();
    setTimeout(() => createConfetti(), 800);
    setTimeout(() => createConfetti(), 1600);
  }, 1000);
  
  cakeCut = true;
}

// ========== ENVELOPE WITH LETTER INSIDE ==========
let envelopeOpened = false;

function openEnvelopeFixed() {
  if (envelopeOpened) return;
  
  const letter = document.getElementById('letter-inside');
  const hint = document.getElementById('env-click-hint');
  const area = document.getElementById('envelope-click-area');
  
  letter.classList.remove('hidden');
  hint.style.display = 'none';
  area.classList.add('opened');
  
  createConfetti();
  
  envelopeOpened = true;
}

// ========== OPEN MOVIE ==========
function openArrivalMovie() {
  const driveLink = "https://drive.google.com/file/d/1S0BFIO4cCKSePfAeJAKNTG10kw1eMCLk/preview";
  window.open(driveLink, '_blank');
}


// Virtual Gift Box
const gifts = [
  "🌟 Wishing you endless happiness!",
  "💯 Success in all your endeavors!",
  "🎓 Ace that GATE  exam!",
  "✨ May all your dreams come true!"
];

function openGift(giftNum) {
  const giftBox = event.currentTarget;
  giftBox.classList.add('gift-opened');
  giftBox.innerHTML = `<div class="gift-icon">🎉</div><p>${gifts[giftNum - 1]}</p>`;
  createConfetti();
  setTimeout(() => {
    alert(gifts[giftNum - 1]);
  }, 500);
}

function createConfetti() {
  const container = document.getElementById('confetti-container');
  const colors = ['#ff66a3', '#ff3385', '#00cc99', '#ffeb3b', '#8bc34a'];
  
  for (let i = 0; i < 50; i++) {
    const confetti = document.createElement('div');
    confetti.className = 'confetti';
    confetti.style.left = Math.random() * 100 + '%';
    confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.animationDelay = Math.random() * 0.5 + 's';
    container.appendChild(confetti);
    
    setTimeout(() => confetti.remove(), 3000);
  }
}

// Drawing Canvas
let canvas, ctx, isDrawing = false, currentColor = 'black';

function initCanvas() {
  canvas = document.getElementById('drawing-canvas');
  if (!canvas) return;
  
  ctx = canvas.getContext('2d');
  ctx.lineWidth = 3;
  ctx.lineCap = 'round';
  
  canvas.addEventListener('mousedown', startDrawing);
  canvas.addEventListener('mousemove', draw);
  canvas.addEventListener('mouseup', stopDrawing);
  canvas.addEventListener('mouseout', stopDrawing);
  
  canvas.addEventListener('touchstart', (e) => {
    e.preventDefault();
    const touch = e.touches[0];
    const mouseEvent = new MouseEvent('mousedown', {
      clientX: touch.clientX,
      clientY: touch.clientY
    });
    canvas.dispatchEvent(mouseEvent);
  });
  
  canvas.addEventListener('touchmove', (e) => {
    e.preventDefault();
    const touch = e.touches[0];
    const mouseEvent = new MouseEvent('mousemove', {
      clientX: touch.clientX,
      clientY: touch.clientY
    });
    canvas.dispatchEvent(mouseEvent);
  });
  
  canvas.addEventListener('touchend', (e) => {
    e.preventDefault();
    const mouseEvent = new MouseEvent('mouseup', {});
    canvas.dispatchEvent(mouseEvent);
  });
  
  const saved = localStorage.getItem('birthdayDrawing');
  if (saved) {
    const img = new Image();
    img.onload = () => ctx.drawImage(img, 0, 0);
    img.src = saved;
  }
}

function startDrawing(e) {
  isDrawing = true;
  const rect = canvas.getBoundingClientRect();
  ctx.beginPath();
  ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
}

function draw(e) {
  if (!isDrawing) return;
  const rect = canvas.getBoundingClientRect();
  ctx.strokeStyle = currentColor;
  ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
  ctx.stroke();
}

function stopDrawing() {
  isDrawing = false;
}

function changeColor(color) {
  currentColor = color;
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function saveDrawing() {
  const dataURL = canvas.toDataURL();
  localStorage.setItem('birthdayDrawing', dataURL);
  alert('✅ Your drawing has been saved!');
}

// Quiz Functions
function answerQuiz(questionNum, answer) {
  document.getElementById(`quiz-q${questionNum}`).classList.add('hidden');
  
  if (questionNum < 3) {
    setTimeout(() => {
      document.getElementById(`quiz-q${questionNum + 1}`).classList.remove('hidden');
    }, 500);
  } else {
    setTimeout(() => {
      document.getElementById('quiz-result').classList.remove('hidden');
    }, 500);
  }
}

// Rating Functions
let rated = false;

function rateStar(rating) {
  if (rated) return;
  
  const stars = document.querySelectorAll('.star');
  stars.forEach((star, index) => {
    if (index < 5) {
      star.classList.add('selected');
    }
  });
  
  rated = true;
  
  setTimeout(() => {
    document.getElementById('rating-text').innerText = 'Perfect! 🎉';
    document.getElementById('rating-result').classList.remove('hidden');
  }, 1000);
}

// GATE Tracker
const subjects = [
  "Data Structures & Algorithms", "Digital Logic", "Computer Organization",
  "Operating Systems", "Computer Networks", "Theory of Computation",
  "Compiler Design", "Databases", "Software Engineering", "Web Technologies",
  "Discrete Mathematics", "General Aptitude"
];

let chart;
let trackerData = {};

function buildTracker() {
  const container = document.getElementById("track-section");
  container.innerHTML = "";
  
  subjects.forEach(subject => {
    const card = document.createElement("div");
    card.className = "subject-card";
    card.setAttribute("data-subject", subject);
    
    const header = document.createElement("div");
    header.className = "subject-header";
    
    const title = document.createElement("h4");
    title.innerText = subject;
    title.setAttribute("data-subject-name", subject);
    
    const addBtn = document.createElement("button");
    addBtn.innerText = "+ Add";
    addBtn.onclick = () => addSubtopic(card, subject);
    
    header.appendChild(title);
    header.appendChild(addBtn);
    card.appendChild(header);
    
    const progressBar = document.createElement("div");
    progressBar.className = "progress-bar";
    const progressFill = document.createElement("div");
    progressFill.className = "progress-fill";
    progressFill.style.width = "0%";
    progressBar.appendChild(progressFill);
    card.appendChild(progressBar);
    
    const list = document.createElement("div");
    list.className = "sub-list";
    card.appendChild(list);
    
    container.appendChild(card);
    
    if (trackerData[subject]) {
      trackerData[subject].forEach(item => {
        addSubtopicWithData(card, subject, item.name, item.done);
      });
    }
  });
  
  updateAllStats();
}

function addSubtopic(card, subject) {
  addSubtopicWithData(card, subject, "", false);
}

function addSubtopicWithData(card, subject, name, isDone) {
  const list = card.querySelector(".sub-list");
  
  const wrapper = document.createElement("div");
  wrapper.className = "sub-wrapper";
  
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = isDone;
  checkbox.onchange = () => {
    updateAllStats();
    autoSave();
  };
  
  const input = document.createElement("input");
  input.type = "text";
  input.placeholder = "Enter topic name";
  input.className = "sub-input";
  input.value = name;
  input.onchange = () => autoSave();
  
  const deleteBtn = document.createElement("button");
  deleteBtn.innerText = "❌";
  deleteBtn.onclick = () => {
    wrapper.remove();
    updateAllStats();
    autoSave();
  };
  
  wrapper.appendChild(checkbox);
  wrapper.appendChild(input);
  wrapper.appendChild(deleteBtn);
  list.appendChild(wrapper);
  
  updateAllStats();
}

function updateAllStats() {
  let totalDone = 0;
  let totalTopics = 0;
  let subjectsComplete = 0;
  
  const allCards = document.querySelectorAll(".subject-card");
  
  allCards.forEach(card => {
    const subtopics = card.querySelectorAll(".sub-wrapper");
    let cardDone = 0;
    
    subtopics.forEach(wrapper => {
      const checkbox = wrapper.querySelector("input[type='checkbox']");
      if (checkbox.checked) cardDone++;
    });
    
    totalTopics += subtopics.length;
    totalDone += cardDone;
    
    const progressFill = card.querySelector(".progress-fill");
    const percent = subtopics.length > 0 ? (cardDone / subtopics.length) * 100 : 0;
    progressFill.style.width = percent + "%";
    
    const title = card.querySelector(".subject-header h4");
    const subjectName = title.getAttribute("data-subject-name");
    if (subtopics.length > 0) {
      title.innerText = `${subjectName} (${Math.round(percent)}%)`;
      if (percent === 100) subjectsComplete++;
    } else {
      title.innerText = subjectName;
    }
  });
  
  const overallPercent = totalTopics > 0 ? Math.round((totalDone / totalTopics) * 100) : 0;
  document.getElementById("total-progress").innerText = overallPercent + "%";
  document.getElementById("completed-topics").innerText = `${totalDone}/${totalTopics}`;
  document.getElementById("subjects-complete").innerText = `${subjectsComplete}/12`;
  
  updateChart(totalDone, totalTopics);
  
  const statsDiv = document.getElementById("progress-stats");
  if (totalTopics > 0) {
    statsDiv.innerHTML = `${totalDone} / ${totalTopics} completed<br>${overallPercent}% done`;
  } else {
    statsDiv.innerHTML = "Add topics to track progress";
  }
}

function updateChart(done, total) {
  const ctx = document.getElementById("progressChart").getContext("2d");
  if (chart) chart.destroy();
  
  const remaining = total - done;
  
  chart = new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: ["Completed", "Remaining"],
      datasets: [{
        data: [done, remaining],
        backgroundColor: ["#00cc99", "#ffb6c1"],
        borderWidth: 2,
        borderColor: "#fff"
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: {
          position: "bottom",
          labels: { font: { size: 14 }, color: "#333" }
        }
      },
      cutout: "70%"
    }
  });
}

function autoSave() {
  const data = {};
  subjects.forEach(subject => {
    const card = document.querySelector(`[data-subject="${subject}"]`);
    if (card) {
      const subtopics = [];
      card.querySelectorAll(".sub-wrapper").forEach(wrapper => {
        const name = wrapper.querySelector(".sub-input").value;
        const done = wrapper.querySelector("input[type='checkbox']").checked;
        subtopics.push({ name, done });
      });
      data[subject] = subtopics;
    }
  });
  localStorage.setItem("gateTrackerData", JSON.stringify(data));
}

function saveProgress() {
  autoSave();
  alert("✅ Progress saved successfully!");
}

function loadProgress() {
  const saved = localStorage.getItem("gateTrackerData");
  if (saved) {
    trackerData = JSON.parse(saved);
    buildTracker();
    alert("📂 Progress loaded successfully!");
  } else {
    alert("⚠️ No saved data found!");
  }
}

function resetTracker() {
  if (confirm("Are you sure you want to reset all progress?")) {
    localStorage.removeItem("gateTrackerData");
    trackerData = {};
    buildTracker();
    alert("🔄 Tracker reset successfully!");
  }
}

window.addEventListener("DOMContentLoaded", () => {
  const saved = localStorage.getItem("gateTrackerData");
  if (saved) {
    trackerData = JSON.parse(saved);
  }
});

// ========== DIWALI PAGE ==========
let diyaLit = false;

function lightDiya() {
  if (diyaLit) return;
  
  diyaLit = true;
  const diyaBody = document.querySelector('.diya-body');
  const flame = document.getElementById('diya-flame');
  const message = document.getElementById('diya-message');
  const diya = document.getElementById('big-diya');
  
  diyaBody.classList.remove('unlit');
  diyaBody.classList.add('lit');
  flame.classList.remove('hidden');
  message.classList.remove('hidden');
  diya.style.cursor = 'default';
  
  createSparkles(diya);
}

function createSparkles(element) {
  const rect = element.getBoundingClientRect();
  const colors = ['#ff8c00', '#ffa500', '#ffD700', '#ff6347'];
  
  for (let i = 0; i < 30; i++) {
    const sparkle = document.createElement('div');
    sparkle.style.position = 'fixed';
    sparkle.style.left = rect.left + rect.width / 2 + 'px';
    sparkle.style.top = rect.top + 'px';
    sparkle.style.width = '8px';
    sparkle.style.height = '8px';
    sparkle.style.borderRadius = '50%';
    sparkle.style.background = colors[Math.floor(Math.random() * colors.length)];
    sparkle.style.pointerEvents = 'none';
    sparkle.style.zIndex = '10000';
    
    const angle = (Math.PI * 2 * i) / 30;
    const velocity = 100 + Math.random() * 100;
    const vx = Math.cos(angle) * velocity;
    const vy = Math.sin(angle) * velocity;
    
    document.body.appendChild(sparkle);
    
    let px = rect.left + rect.width / 2;
    let py = rect.top;
    let time = 0;
    
    const animate = () => {
      time += 0.016;
      px += vx * 0.016;
      py += vy * 0.016;
      
      sparkle.style.left = px + 'px';
      sparkle.style.top = py + 'px';
      sparkle.style.opacity = Math.max(0, 1 - time * 2);
      
      if (time < 1) {
        requestAnimationFrame(animate);
      } else {
        sparkle.remove();
      }
    };
    
    animate();
  }
}

// CRAZY CELEBRATION
function startCrazyCelebration() {
  const button = event.currentTarget;
  button.innerText = '🎉 CELEBRATING! 🎉';
  button.disabled = true;
  button.style.background = 'linear-gradient(135deg, #ff1493, #ffa500, #00ff00, #00bfff)';
  button.style.backgroundSize = '400% 400%';
  button.style.animation = 'rainbow 2s linear infinite';
  
  const overlay = document.createElement('div');
  overlay.className = 'celebration-overlay';
  document.body.appendChild(overlay);
  
  createMassiveFireworks();
  createFloatingBalloons();
  createConfettiBurst();
  createSpinningHearts();
  createFallingStars();
  shakeScreen();
  
  setTimeout(() => {
    button.innerText = '✨ What a Celebration! ✨';
    button.style.animation = 'none';
    overlay.remove();
    setTimeout(() => {
      button.innerText = '🎆 Celebrate Again! 🎆';
      button.disabled = false;
      button.style.background = 'linear-gradient(135deg, #ff8c00, #ffa500)';
    }, 2000);
  }, 10000);
}

function createMassiveFireworks() {
  const container = document.getElementById('fireworks-container');
  const colors = ['#ff8c00', '#ffa500', '#ff6347', '#ff1493', '#00ff00', '#00bfff', '#ffd700', '#ff69b4'];
  
  for (let burst = 0; burst < 20; burst++) {
    setTimeout(() => {
      const x = Math.random() * window.innerWidth;
      const y = Math.random() * (window.innerHeight * 0.7);
      
      for (let i = 0; i < 50; i++) {
        const firework = document.createElement('div');
        firework.style.position = 'fixed';
        firework.style.left = x + 'px';
        firework.style.top = y + 'px';
        firework.style.width = '8px';
        firework.style.height = '8px';
        firework.style.borderRadius = '50%';
        firework.style.background = colors[Math.floor(Math.random() * colors.length)];
        firework.style.pointerEvents = 'none';
        firework.style.zIndex = '10000';
        
        const angle = (Math.PI * 2 * i) / 50;
        const distance = 150 + Math.random() * 150;
        const vx = Math.cos(angle) * distance;
        const vy = Math.sin(angle) * distance;
        
        container.appendChild(firework);
        
        let px = x, py = y, time = 0;
        const animate = () => {
          time += 0.016;
          px += vx * 0.016;
          py += vy * 0.016 + time * 50;
          
          firework.style.left = px + 'px';
          firework.style.top = py + 'px';
          firework.style.opacity = Math.max(0, 1 - time);
          
          if (time < 2) {
            requestAnimationFrame(animate);
          } else {
            firework.remove();
          }
        };
        animate();
      }
    }, burst * 500);
  }
}

function createFloatingBalloons() {
  const balloons = ['🎈', '🎉', '🎊', '🎁', '💖', '🌟', '✨', '🎂', '🪔'];
  
  for (let i = 0; i < 30; i++) {
    setTimeout(() => {
      const balloon = document.createElement('div');
      balloon.className = 'balloon';
      balloon.innerText = balloons[Math.floor(Math.random() * balloons.length)];
      balloon.style.left = Math.random() * 100 + '%';
      balloon.style.bottom = '-100px';
      document.body.appendChild(balloon);
      
      setTimeout(() => balloon.remove(), 6000);
    }, i * 300);
  }
}

function createConfettiBurst() {
  for (let i = 0; i < 5; i++) {
    setTimeout(() => createConfetti(), i * 1000);
  }
}

function createSpinningHearts() {
  const hearts = ['💖', '💕', '💗', '💝', '💘'];
  
  for (let i = 0; i < 20; i++) {
    setTimeout(() => {
      const heart = document.createElement('div');
      heart.innerText = hearts[Math.floor(Math.random() * hearts.length)];
      heart.style.position = 'fixed';
      heart.style.left = Math.random() * window.innerWidth + 'px';
      heart.style.top = Math.random() * window.innerHeight + 'px';
      heart.style.fontSize = '40px';
      heart.style.pointerEvents = 'none';
      heart.style.zIndex = '10000';
      heart.style.animation = 'spin-and-fade 3s ease-out forwards';
      document.body.appendChild(heart);
      
      setTimeout(() => heart.remove(), 3000);
    }, i * 400);
  }
}

const style = document.createElement('style');
style.textContent = `
@keyframes spin-and-fade {
  0% { transform: scale(0) rotate(0deg); opacity: 1; }
  50% { transform: scale(1.5) rotate(180deg); opacity: 1; }
  100% { transform: scale(0) rotate(360deg); opacity: 0; }
}
@keyframes rainbow {
  0% { background-position: 0% 50%; }
  100% { background-position: 100% 50%; }
}
`;
document.head.appendChild(style);

function createFallingStars() {
  for (let i = 0; i < 15; i++) {
    setTimeout(() => {
      const star = document.createElement('div');
      star.innerText = '⭐';
      star.style.position = 'fixed';
      star.style.left = Math.random() * 100 + '%';
      star.style.top = '-50px';
      star.style.fontSize = '30px';
      star.style.pointerEvents = 'none';
      star.style.zIndex = '10000';
      star.style.animation = 'fall-diagonal 4s linear forwards';
      document.body.appendChild(star);
      
      setTimeout(() => star.remove(), 4000);
    }, i * 600);
  }
}

const fallStyle = document.createElement('style');
fallStyle.textContent = `
@keyframes fall-diagonal {
  to {
    transform: translateY(120vh) translateX(-100px) rotate(360deg);
    opacity: 0;
  }
}
`;
document.head.appendChild(fallStyle);

function shakeScreen() {
  document.body.style.animation = 'shake 0.5s';
  setTimeout(() => {
    document.body.style.animation = '';
  }, 500);
}

const shakeStyle = document.createElement('style');
shakeStyle.textContent = `
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-10px); }
  75% { transform: translateX(10px); }
}
`;
document.head.appendChild(shakeStyle);

// MESSAGE IN BOTTLE
function tryOpenBottle() {
  const today = new Date();
  const targetDate = new Date(today.getFullYear() + 1, 9, 21);
  
  if (today.getMonth() === 9 && today.getDate() === 21) {
    alert("🎉 Happy Birthday! 🎉\n\nThe bottle opens! Here's your special message:\n\n'Another year, another beautiful Diwali birthday! You continue to shine brighter every year. May this year bring you closer to all your dreams. Thank you for being such an amazing person. Looking forward to celebrating many more birthdays with you! 🪔🎂💖'");
  } else {
    const daysLeft = Math.ceil((targetDate - today) / (1000 * 60 * 60 * 24));
    document.getElementById('bottle-countdown').innerText = 
      `⏳ This bottle opens on October 21, ${targetDate.getFullYear()}\n${daysLeft} days to go! ⏳`;
  }
}

// ========== REAL SCREENSHOT WITH ONLY CLICK TRIGGER ==========
function takeRealScreenshot() {
  const flash = document.getElementById('screenshot-flash');
  flash.classList.add('flash');
  const cameraIcon = document.createElement('div');
  cameraIcon.innerText = '📸';
  cameraIcon.style.position = 'fixed';
  cameraIcon.style.top = '50%';
  cameraIcon.style.left = '50%';
  cameraIcon.style.transform = 'translate(-50%, -50%)';
  cameraIcon.style.fontSize = '100px';
  cameraIcon.style.zIndex = '100001';
  document.body.appendChild(cameraIcon);

  setTimeout(() => {
    flash.classList.remove('flash');
    cameraIcon.remove();

    // html2canvas logic runs after the flash
    if (typeof html2canvas !== 'undefined') {
      html2canvas(document.body, {
        backgroundColor: '#ffeef5',
        scale: 1,
        logging: false
      }).then(canvas => {
        canvas.toBlob(blob => {
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = `Birthday__Prayukta${Date.now()}.png`;
          link.click();
          URL.revokeObjectURL(url);
          document.getElementById('screenshot-success').classList.remove('hidden');
        });
      }).catch(() => {
        document.getElementById('screenshot-success').classList.remove('hidden');
      });
    } else {
      document.getElementById('screenshot-success').classList.remove('hidden');
    }
  }, 400);
}


function downloadCertificate() {
  const certPath = "certificate.png";
  
  const link = document.createElement('a');
  link.href = certPath;
  link.download = "Birthday_Certificate_Prayukta.png";
  link.target = '_blank';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  setTimeout(() => {
    alert("🎓 Downloading Your Certificate!\n\n📁 Check your Downloads folder! 💖");
  }, 500);
}

function shareWebsite() {
  const url = window.location.href;
  if (navigator.share) {
    navigator.share({
      title: "Prayukta's Birthday Website",
      text: "Check out this special birthday website!",
      url: url
    });
  } else {
    const dummy = document.createElement('input');
    document.body.appendChild(dummy);
    dummy.value = url;
    dummy.select();
    document.execCommand('copy');
    document.body.removeChild(dummy);
    alert('🔗 Link copied to clipboard!\n\nShare it or bookmark it for later! 💖');
  }
}

// ANNUAL RETURN FEATURE
window.addEventListener('DOMContentLoaded', () => {
  const today = new Date();
  const lastVisit = localStorage.getItem('lastVisitDate');
  const currentDate = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`;
  
  if (today.getMonth() === 9 && today.getDate() === 21) {
    if (lastVisit !== currentDate) {
      localStorage.setItem('lastVisitDate', currentDate);
      const visitCount = parseInt(localStorage.getItem('birthdayVisits') || '0') + 1;
      localStorage.setItem('birthdayVisits', visitCount);
      
      if (visitCount > 1) {
        setTimeout(() => {
          alert(`🎉 Welcome Back! 🎉\n\nThis is your ${visitCount}${getOrdinal(visitCount)} time visiting on your birthday!\n\nHappy Birthday again, Prayukta! 🎂🪔💖`);
        }, 2000);
      }
    }
  }
});

function getOrdinal(n) {
  const s = ['th', 'st', 'nd', 'rd'];
  const v = n % 100;
  return s[(v - 20) % 10] || s[v] || s[0];
}

// Thank You & Sorry Page
document.addEventListener("DOMContentLoaded", function() {
  const sorryReveal = document.getElementById("sorry-reveal");
  const sorryMessage = document.getElementById("sorry-message");
  
  if (sorryReveal && sorryMessage) {
    sorryReveal.onclick = () => {
      sorryMessage.classList.remove("hidden");
      sorryMessage.style.display = "block";
      setTimeout(() => {
        sorryMessage.style.opacity = "1";
      }, 100);
    };
  }
});
// Emergency close function
window.closeSuccessPopup = function() {
  document.getElementById('screenshot-success').classList.add('hidden');
};

// Also close on ESC key
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    const popup = document.getElementById('screenshot-success');
    if (popup && !popup.classList.contains('hidden')) {
      popup.classList.add('hidden');
    }
  }
});
