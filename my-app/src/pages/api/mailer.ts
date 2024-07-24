import { NextApiRequest, NextApiResponse } from 'next';
import { createTransport } from 'nodemailer';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { name, email, phone, message, architectEmail, architectName } = req.body;

        
        const transporter = createTransport({
            host: 'smtp-relay.brevo.com',
            port: 587,
            auth: {
                user: '7935a0001@smtp-brevo.com',
                pass: process.env.NEXT_PUBLIC_SMPT_PASSWORD,
            }
        });

        try {
            const emailHtml = `
                <style>
                @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;700&display=swap');
                </style>
                <div style="font-family: 'Outfit', sans-serif; ">
                    <p style="margin: 0; font-size: 16px;">Hola ${architectName},</p>
                    <p style="margin-top: 20px; font-size: 16px;">Tienes una nueva solicitud de contacto de ${name}:</p>
                    <div style="font-style: italic; margin-left: 1rem; font-size: 16px; background-color: #f3f3ef; padding: 20px;">
                        <p style="margin: 5px 0;">${message}</p>
                        <p style="margin: 5px 0; margin-top: 1rem;">Correo: ${email}</p>
                        <p style="margin: 5px 0;">Teléfono: ${phone}</p>
                    </div>
                    <p style="margin-top: 20px; font-size: 16px;">Éxito!</p>
                    <p style="margin-top: 1rem; font-size: 16px;">Equipo Table</p>
                </div>
                `;

            await transporter.sendMail({
                from: '"Table" <info@table.cl>',
                to: architectEmail,
                subject: `Nueva solicitud de contacto de ${name}`,
                html: emailHtml
            });
            res.status(200).json({ message: 'Correo enviado exitosamente' });
        } catch (error) {
            console.error('Failed to send email:', error);
            res.status(500).json({ message: 'Error al enviar el correo', error: error });
        }
    } else {
        res.status(405).json({ message: 'Método no permitido' });
    }
}
