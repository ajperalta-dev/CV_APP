exports.handler = async function(event, context) {
  // Solo permitimos peticiones POST por seguridad
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { password } = JSON.parse(event.body);
    
    // Netlify leerá la contraseña desde sus Variables de Entorno seguras
    const realPassword = process.env.CV_PASSWORD;

    if (password === realPassword) {
      return {
        statusCode: 200,
        body: JSON.stringify({ success: true }),
      };
    } else {
      return {
        statusCode: 401,
        body: JSON.stringify({ success: false, message: 'Contraseña incorrecta' }),
      };
    }
  } catch (error) {
    return { statusCode: 500, body: 'Error en el servidor' };
  }
};