const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let stream; 

// Set up the webcam
async function setupWebcam() {
  try {
    stream = await navigator.mediaDevices.getUserMedia({ video: true });
    const video = document.createElement('video'); // Hidden video element
    video.srcObject = stream;
    video.play();

  
    video.onloadedmetadata = () => {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      
      drawVideoWithText(video, "Smile!");

      
      setTimeout(() => {
        capturePhoto(video);
      }, 170000);
    };
  } catch (error) {
    console.error("Error accessing webcam:", error);
    alert("Webcam access is required to run this app.");
  }
}


function drawVideoWithText(video, text) {
  const drawInterval = setInterval(() => {
    
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    ctx.font = "30px Arial";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.fillText(text, canvas.width / 2, canvas.height / 2);
  }, 30); 

  
  setTimeout(() => {
    clearInterval(drawInterval);
  }, 500);
}


function capturePhoto(video) {
  
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

  
  const tracks = stream.getTracks();
  tracks.forEach((track) => track.stop());

  
  console.log("Photo captured!");
}


setupWebcam();
