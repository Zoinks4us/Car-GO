document.addEventListener('DOMContentLoaded', function() {
  const newPostForm = document.querySelector('.new-post-form');

  newPostForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const title = document.getElementById('post-title').value;
    const content = document.getElementById('post-content').value;

    // Get the file input element
    const imageFile = document.getElementById('post-image').files[0];

    // Example validation (you should perform proper validation)
    if (!title || !content || !imageFile) {
      alert('Please enter title, content, and select an image for the post.');
      return;
    } 

    // Upload image to Cloudinary
    const formData = new FormData();
    formData.append('file', imageFile);
    formData.append('User_Image_Uploads', uploadPreset); // Using uploadPreset variable

    fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
      method: 'POST',
      body: formData
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to upload image to Cloudinary.');
      }
      return response.json();
    })
    .then(data => {
      // Image successfully uploaded to Cloudinary
      const imageUrl = data.secure_url;

      // Example AJAX request to send new post data (including image URL) to the server
      return fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title: title, content: content, imageUrl: imageUrl })
      });
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to add post.');
      }
      return response.json();
    })
    .then(data => {
      // Handle successful post addition (e.g., show success message)
      alert('Post successfully added!');
      // Optionally, you can redirect to another page after successful addition
      window.location.href = '/dashboard';
    })
    .catch(error => {
      // Handle error
      console.error('Error adding post:', error);
      alert('Failed to add post');
    });
  });
});

// Cloudinary upload widget configuration
const cloudName = "dz4oq10ph"; // replace with your own cloud name
const uploadPreset = "User_Image_Uploads"; // replace with your own upload preset

// Create Cloudinary upload widget
const myWidget = cloudinary.createUploadWidget(
  {
    cloudName: cloudName,
    uploadPreset: uploadPreset,
  },
  (error, result) => {
    if (!error && result && result.event === "success") {
      console.log("Done! Here is the image info: ", result.info);
      document
        .getElementById("uploadedimage")
        .setAttribute("src", result.info.secure_url);
    }
  }
);

// Add event listener to open Cloudinary widget
document.getElementById("upload_widget").addEventListener(
  "click",
  function () {
    myWidget.open();
  },
  false
);
// Add event listener to open Cloudinary widget
document.getElementById("upload_widget").addEventListener(
  "click",
  function () {
    myWidget.open();
  },
  false
);

