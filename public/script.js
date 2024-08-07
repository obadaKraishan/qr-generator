document.getElementById('qrForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const url = document.getElementById('url').value;
    const size = document.getElementById('size').value;
  
    fetch('/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ url, size })
    })
    .then(response => response.json())
    .then(data => {
      const qrResult = document.getElementById('qrResult');
      qrResult.innerHTML = `<img id="qrImage" src="${data.src}" alt="QR Code">`;
      document.getElementById('downloadBtn').style.display = 'block';
  
      const downloadBtn = document.getElementById('downloadBtn');
      downloadBtn.addEventListener('click', function() {
        const link = document.createElement('a');
        link.href = data.src;
        link.download = 'qrcode.png';
        link.click();
      });
    })
    .catch(error => {
      console.error('Error:', error);
    });
  });
  