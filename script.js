async function verifyPassword() {
  const input = document.getElementById('cvPasswordInput').value;
  const err = document.getElementById('passwordError');
  
  try {
    const res = await fetch('/.netlify/functions/verify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ password: input })
    });
    
    const data = await res.json();

    if (data.success) {
      closePasswordModal();
      setEditMode(true);
      err.classList.add('hidden');
    } else {
      err.classList.remove('hidden');
    }
  } catch (error) {
    console.error('Error de conexión:', error);
    err.classList.remove('hidden');
  }
}