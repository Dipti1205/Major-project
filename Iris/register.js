let myset = new Set();
const button2 = document.getElementById("btn2");
const button3 = document.getElementById("btn3");
// const hashedImages = [];

document.getElementById('capture').addEventListener('click', function() {
    if (!('mediaDevices' in navigator)) {
        alert('MediaDevices API not supported on your browser.');
        return;
    }

    setTimeout(captureImage, 3000);

});

function captureImage() {
    navigator.mediaDevices.getUserMedia({ video: true })
        .then(function(mediaStream) {
            const video = document.createElement('video');
            video.srcObject = mediaStream;
            video.play();

            video.addEventListener('loadedmetadata', function() {
                const canvas = document.createElement('canvas');
                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;
                const context = canvas.getContext('2d');
                context.drawImage(video, 0, 0, canvas.width, canvas.height);

                const capturedImage = document.getElementById('capturedImage');
                capturedImage.src = canvas.toDataURL('image/jpeg');

                // Stop the video stream
                mediaStream.getTracks().forEach(track => track.stop());

                // Hash the captured image
                const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
                const imageHash = hashImageData(imageData);

                // Save the hashed image in an array
                saveHashedImage(imageHash);
            });
        })
        .catch(function(err) {
            console.error('Error accessing camera:', err);
            alert('Error accessing camera. Please check permissions.');
        });
};

function hashImageData(imageData) {
    const buffer = new Uint8Array(imageData.data.buffer);
    const hash = sha256.create().update(buffer).hex();
    return hash;
}

// Function to save the hashed image in an array
function saveHashedImage(imageHash) {
    myset.add(imageHash);
   // hashedImages.push(imageHash);
    console.log("Hashed image saved:", imageHash);
}

button2.addEventListener("click", function() {
    console.log("Hashed images:");
  /*  hashedImages.forEach(function(hash, index) {
        console.log("Image " + (index + 1) + ": " + hash);
    });*/
});

/* button3.addEventListener("click", function() {
    if (hashedImages.length < 2) {
        console.log("Insufficient number of images for comparison.");
        return;
    }

    const hash1 = hashedImages[hashedImages.length-1];
    if(myset.has(hash1)){
        window.location.href="home.html";
    }
    

    // if (!hash1 || !hash2 || hash1.length !== hash2.length) {
    //     throw new Error('Hash codes must be defined and have the same length.');
    // }

    let distance = 0;
    for (let i = 0; i < hash1.length; i++) {
        const binary1 = parseInt(hash1[i], 16).toString(2).padStart(4, '0');
        const binary2 = parseInt(hash2[i], 16).toString(2).padStart(4, '0');
        for (let j = 0; j < binary1.length; j++) {
            if (binary1[j] !== binary2[j]) {
                distance++;
            }
        }
    }

    if (distance <= 2) {
        console.log("Same person");
    } else {
        console.log("Different person");
    }
});*/
export default myset;