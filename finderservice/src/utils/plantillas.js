
// Palntilla para recuperar el password
export function mailValidate(validator,email,appUrl) {
    let template = `<!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width">
        <title>Tienda en línea - Información de contacto</title>
      </head>
      <body style="font-family: Arial, sans-serif; background-color: #f2f2f2;">
        <div style="max-width: 600px; margin: 2rem auto; padding: 20px; background-color: white; border-radius: 15px;">
          <header style="text-align: center; margin-bottom: 30px;">
            <img src="https://res.cloudinary.com/dacl2du1v/image/upload/v1684091067/logo_htndsi.png" alt="Logo de la tienda" width="170" height="100">
            <h1 style="font-size: 24px; margin-top: 0;">Bienvenido a Finder Service</h1>
          </header>
          <section style="margin-bottom: 30px;">
            <p style="font-size: 18px; margin-bottom: 10px;">Estimado/a usuario:</p>
            <p style="font-size: 16px; margin-bottom: 10px;">Para completar el registro es necesario que verifiques tu cuenta de correo electronico, da click en el sig. enlace para completar esta tarea:</p>
            
            <a href="${appUrl}/User/validation?m=${email}&c=${validator}"> Validar correo </a>
           
          </section>
          <footer style="text-align: center;">
            <p style="font-size: 14px;">Atentamente,</p>
            <p style="font-size: 16px; margin-top: 10px;">El equipo de Finder Service.</p>
          </footer>
        </div>
      </body>
      </html>`
      return template
}

// Palntilla para recuperar el password
export function retrivePassword(validator,email,appUrl) {
    let template = `<!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width">
        <title>Tienda en línea - Información de contacto</title>
      </head>
      <body style="font-family: Arial, sans-serif; background-color: #f2f2f2;">
        <div style="max-width: 600px; margin: 2rem auto; padding: 20px; background-color: white; border-radius: 15px;">
          <header style="text-align: center; margin-bottom: 30px;">
            <img src="https://res.cloudinary.com/dacl2du1v/image/upload/v1684091067/logo_htndsi.png" alt="Logo de la tienda" width="170" height="100">
            <h1 style="font-size: 24px; margin-top: 0;">Bienvenido a Finder Service</h1>
          </header>
          <section style="margin-bottom: 30px;">
            <p style="font-size: 18px; margin-bottom: 10px;">Estimado/a usuario:</p>
            <p style="font-size: 16px; margin-bottom: 10px;">Ha solicitado cambio de contraseña de la cuenta, para continuar haga clic en el siguiente enlace:</p>
            
            <a href="${appUrl}/User/recoveryPsw?m=${email}&c=${validator}"> Validar correo </a>
           
          </section>
          <footer style="text-align: center;">
            <p style="font-size: 14px;">Atentamente,</p>
            <p style="font-size: 16px; margin-top: 10px;">El equipo de Finder Service.</p>
          </footer>
        </div>
      </body>
      </html>`
      return template
}