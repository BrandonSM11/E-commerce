import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    console.log('Iniciando envío de email diario...');
    
    await sendDailyEmail();
    
    return NextResponse.json(
      { 
        success: true, 
        message: 'Email enviado correctamente',
        timestamp: new Date().toISOString()
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error al enviar email:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Error desconocido' 
      },
      { status: 500 }
    );
  }
}

async function sendDailyEmail() {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  // Verificar conexión
  await transporter.verify();

  await transporter.sendMail({
    from: process.env.MAIL_USER,
    to: process.env.EMAIL_DESTINATARIO,
    subject: 'Tu email diario programado',
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px;">
        <h2>¡Hola!</h2>
        <p>Este es tu email diario automático.</p>
        <p><strong>Enviado el:</strong> ${new Date().toLocaleString('es-CO')}</p>
        <hr>
        <p style="color: #666; font-size: 12px;">
          Este email fue enviado automáticamente por tu aplicación.
        </p>
      </div>
    `,
    text: 'Este es tu email diario programado.',
  });

  console.log('Email enviado exitosamente');
}