import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { name, email, phone, message, architectEmail } = req.body;

        const data = {
            service_id: 'service_p6je0vi',
            template_id: 'template_3gzu4nr',
            user_id: 'J5OiJF8YKYWP74I0w',
            template_params: {
                to_email: architectEmail,
                message: `Hola! ${name} ha solicitado contactarte. Puedes contactarlo a través de su correo: ${email} o su teléfono: ${phone}. Mensaje: ${message}`,
            },
        }

        try {
            const apiUrl = "https://api.emailjs.com/api/v1.0/email/send";
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                console.log('Email sent successfully:', response);
                res.status(200).json({ message: 'Correo enviado exitosamente' });
            } else {
                const errorText = await response.text();
                console.error('Failed to send email:', errorText);
                res.status(500).json({ message: 'Error al enviar el correo', error: errorText });
            }
        } catch (error) {
            console.error('Failed to send email:', error);
            res.status(500).json({ message: 'Error al enviar el correo', error: error });
        }
    } else {
        res.status(405).json({ message: 'Método no permitido' });
    }
}
