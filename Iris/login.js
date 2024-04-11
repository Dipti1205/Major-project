
    import myset from "./register.js";
    //let myset = new Set();
    const button2 = document.getElementById("btn2");
    const button3 = document.getElementById("btn3");
    const hashedImages = [];

    document.getElementById('capture').addEventListener('click', function() {
        if (!('mediaDevices' in navigator)) {
            alert('MediaDevices API not supported on your browser.');
            return;
        }

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
    });

    function hashImageData(imageData) {
        const buffer = new Uint8Array(imageData.data.buffer);
        const hash = sha256.create().update(buffer).hex();
        return hash;
    }

    // Function to save the hashed image in an array
    function saveHashedImage(imageHash) {
       // myset.add(imageHash);
        hashedImages.push(imageHash);
        console.log("Hashed image saved:", imageHash);
    }

    button2.addEventListener("click", function() {
        console.log("Hashed images:");
        hashedImages.forEach(function(hash, index) {
            console.log("Image " + (index + 1) + ": " + hash);
        });
    });

    let distance = 0;
    // Function to convert hexadecimal to binary
function hexToBinary(hexString) {
    return parseInt(hexString, 16).toString(2).padStart(hexString.length * 4, '0');
}

// Function to calculate Hamming distance
function hammingDistance(hash1, hash2) {
    // Convert hexadecimal hashes to binary strings
    const binary1 = hexToBinary(hash1);
    const binary2 = hexToBinary(hash2);

    

    // Calculate Hamming distance
    for (let i = 0; i < binary1.length; i++) {
         
if (binary1[i] !== binary2[i]) {
            distance++;
        }
    }

    return distance;
}
    button3.addEventListener("click", function() {
       /* if (hashedImages.length < 1) {
            console.log("Insufficient number of images for comparison.");
            return;
        }*/

        const hash1 = hashedImages[hashedImages.length-1];
        
        myset.forEach((value) => {
            
            
          var d =  hammingDistance(hash1,value);
          if (d <= 134) {
            console.log("Same person");
        } else {
            console.log("Different person");
        }
            });

       // let distance = 0;
          
    });
