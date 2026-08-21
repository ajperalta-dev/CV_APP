async function verifyPassword() {
  const input = document.getElementById('cvPasswordInput').value;
  const err = document.getElementById('passwordError');
  
  try {
    const response = await netlifyFunctionCall(input); // O una petición fetch normal
    
    // Llamada directa a tu función serverless en Netlify
    const res = await fetch('/.netlify/functions/verify', {
      method: 'POST',
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