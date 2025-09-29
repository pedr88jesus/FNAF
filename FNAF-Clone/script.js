// =================== VARIÁVEIS ===================
let battery = 100;
let hour = 0; // 0 = 12 AM
let gameRunning = true;
let currentCamera = "cam1";
let cameraIndex = 0;

// Sequência de imagens por câmera
const cameras = {
  cam1: ["assets/images/cam1/1.png", "assets/images/cam1/2.png", "assets/images/cam1/3.png"],
  cam2: ["assets/images/cam2/1.png", "assets/images/cam2/2.png"],
  cam3: ["assets/images/cam3/1.png", "assets/images/cam3/2.png", "assets/images/cam3/3.png"],
  cam4: ["assets/images/cam4/1.png", "assets/images/cam4/2.png", "assets/images/cam4/3.png", "assets/images/cam4/4.png"]
};

// =================== ATUALIZA HUD ===================
function updateHUD() {
  document.getElementById("battery").textContent = `Bateria: ${battery}%`;
  let displayHour = (hour === 0 ? "12 AM" : hour + " AM");
  document.getElementById("time").textContent = `Hora: ${displayHour}`;
}

// =================== TROCAR DE CÂMERA ===================
function changeCamera(cam) {
  if (!gameRunning) return;
  currentCamera = cam;
  cameraIndex = 0;
  document.getElementById("camera-image").src = cameras[cam][cameraIndex];
}

// =================== ANIMAÇÃO DA CÂMERA ===================
setInterval(() => {
  if (!gameRunning) return;
  let imgs = cameras[currentCamera];
  if (!imgs) return;
  cameraIndex = (cameraIndex + 1) % imgs.length;
  document.getElementById("camera-image").src = imgs[cameraIndex];
}, 3000);

// =================== BATERIA ===================
setInterval(() => {
  if (!gameRunning) return;
  battery--;
  if (battery <= 0) {
    gameOver("assets/videos/gameover.mp4");
  }
  updateHUD();
}, 5000);

// =================== RELOGIO ===================
setInterval(() => {
  if (!gameRunning) return;
  hour++;
  if (hour >= 6) {
    win("assets/videos/win.mp4");
  }
  updateHUD();
}, 20000); // 20s = 1 hora

// =================== GAME OVER ===================
function gameOver(videoSrc) {
  gameRunning = false;
  let endScreen = document.getElementById("end-screen");
  let endVideo = document.getElementById("end-video");
  endVideo.src = videoSrc;
  endScreen.classList.remove("hidden");
}

// =================== VITÓRIA ===================
function win(videoSrc) {
  gameRunning = false;
  let endScreen = document.getElementById("end-screen");
  let endVideo = document.getElementById("end-video");
  endVideo.src = videoSrc;
  endScreen.classList.remove("hidden");
}

// Inicializa HUD
updateHUD();
