const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const overlayText = document.getElementById('overlay-text');
const ctx = canvas.getContext('2d');
let stream;

// Set up webcam
async function setupWebcam() {
  try {
    // Start the webcam
    stream = await navigator.mediaDevices.getUserMedia({ video: true });
    video.srcObject = stream;

    video.onloadedmetadata = () => {
      video.play();
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      // Take a photo after 1 second
      setTimeout(capturePhoto, 3000);
    };
  } catch (err) {
    console.error("Error accessing webcam: ", err);
    alert("Webcam access is required to run this app.");
  }
}

// Capture photo and replace the webcam feed
function capturePhoto() {
  // Draw the current frame from the video to the canvas
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

  // Stop the webcam stream
  stopWebcam();

  // Hide the video feed and overlay text
  video.style.display = "none";
  overlayText.style.display = "none";

  // Show the captured photo
  canvas.style.display = "block";
}

// Turn off the webcam
function stopWebcam() {
  if (stream) {
    stream.getTracks().forEach((track) => track.stop()); // Stop all video tracks
    console.log("Webcam turned off.");
  }
}

// Start the webcam feed
setupWebcam();
