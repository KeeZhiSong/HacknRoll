const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let stream; // To store the webcam stream

// Set up the webcam
async function setupWebcam() {
  try {
    stream = await navigator.mediaDevices.getUserMedia({ video: true });
    const video = document.createElement('video'); // Hidden video element
    video.srcObject = stream;
    video.play();

    // Set canvas size to match video feed
    video.onloadedmetadata = () => {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      // Continuously draw the video feed on the canvas
      drawVideoWithText(video, "Smile!");

      // Take a photo after 1 second
      setTimeout(() => {
        capturePhoto(video);
      }, 5000);
    };
  } catch (error) {
    console.error("Error accessing webcam:", error);
    alert("Webcam access is required to run this app.");
  }
}

// Draw video feed and overlay text
function drawVideoWithText(video, text) {
  const drawInterval = setInterval(() => {
    // Draw the video feed
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Draw the overlay text
    ctx.font = "30px Arial";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.fillText(text, canvas.width / 2, canvas.height / 2);
  }, 30); // Update every 30ms for smooth rendering

  // Stop drawing text after 1 second
  setTimeout(() => {
    clearInterval(drawInterval);
  }, 1000);
}

// Capture the photo and replace the webcam feed
function capturePhoto(video) {
  // Draw the final video frame on the canvas
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

  // Stop the webcam stream
  const tracks = stream.getTracks();
  tracks.forEach((track) => track.stop());

  // The canvas now contains the captured photo
  console.log("Photo captured!");
}

// Start the app
setupWebcam();
