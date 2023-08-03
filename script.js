document.addEventListener('DOMContentLoaded', () => {
    const textInput = document.getElementById('textInput');
    const imageInput = document.getElementById('imageInput');
    const generateButton = document.getElementById('generateButton');
    const resultDiv = document.getElementById('result');
  
    generateButton.addEventListener('click', async () => {
      const text = textInput.value;
      const file = imageInput.files[0];
  
      if (!text) {
        alert('Please enter text or a link.');
        return;
      }
  
      const formData = new FormData();
      formData.append('image', file);
      formData.append('metadata', JSON.stringify({ data: text }));
  
      try {
        const response = await fetch('https://qrcode3.p.rapidapi.com/qrcode/text', {
          method: 'POST',
          headers: {
            'X-RapidAPI-Key': '32d6fe623bmsh1ab6cd3a9dc64ffp1b4181jsn8a20f3339a71', // Replace with your actual RapidAPI key  //https://rapidapi.com/linqr-linqr-default/api/qrcode3/
            'X-RapidAPI-Host': 'qrcode3.p.rapidapi.com',
          },
          body: formData,
        });
  
        if (!response.ok) {
          throw new Error('Failed to generate QR code.');
        }
  
        const qrCodeSVG = await response.text();
        resultDiv.innerHTML = qrCodeSVG;
      } catch (error) {
        console.error('Error generating QR code:', error);
        resultDiv.innerHTML = 'Error generating QR code. Please try again later.';
      }
    });
  });
  