import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
	try {
		const { email, lang = 'es' } = await request.json();

		// Validate email
		if (!email || !email.includes('@')) {
			return new Response(
				JSON.stringify({
					message: lang === 'es' ? 'Por favor ingresa un email válido' : 'Please enter a valid email',
				}),
				{
					status: 400,
					headers: { 'Content-Type': 'application/json' },
				}
			);
		}

		const MAILCHIMP_API_KEY = import.meta.env.MAILCHIMP_API_KEY;
		const MAILCHIMP_LIST_ID = import.meta.env.MAILCHIMP_LIST_ID;
		const MAILCHIMP_SERVER = import.meta.env.MAILCHIMP_SERVER;

		// Check if Mailchimp is configured
		if (!MAILCHIMP_API_KEY || !MAILCHIMP_LIST_ID || !MAILCHIMP_SERVER) {
			console.error('Mailchimp configuration missing');
			return new Response(
				JSON.stringify({
					message:
						lang === 'es'
							? 'El servicio de newsletter no está configurado. Por favor contacta al administrador.'
							: 'Newsletter service is not configured. Please contact the administrator.',
				}),
				{
					status: 500,
					headers: { 'Content-Type': 'application/json' },
				}
			);
		}

		const url = `https://${MAILCHIMP_SERVER}.api.mailchimp.com/3.0/lists/${MAILCHIMP_LIST_ID}/members`;

		const response = await fetch(url, {
			method: 'POST',
			headers: {
				Authorization: `apikey ${MAILCHIMP_API_KEY}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				email_address: email,
				status: 'subscribed',
				tags: ['polkadot-uruguay', lang],
			}),
		});

		const data = await response.json();

		if (!response.ok) {
			// Handle specific Mailchimp errors
			if (data.title === 'Member Exists') {
				return new Response(
					JSON.stringify({
						message:
							lang === 'es'
								? 'Ya estás suscrito a nuestro newsletter'
								: 'You are already subscribed to our newsletter',
					}),
					{
						status: 200,
						headers: { 'Content-Type': 'application/json' },
					}
				);
			}

			console.error('Mailchimp API error:', data);
			throw new Error(data.detail || 'Mailchimp API error');
		}

		return new Response(
			JSON.stringify({
				message:
					lang === 'es'
						? '¡Suscripción exitosa! Revisa tu email.'
						: 'Successfully subscribed! Check your email.',
			}),
			{
				status: 200,
				headers: { 'Content-Type': 'application/json' },
			}
		);
	} catch (error) {
		console.error('Newsletter subscription error:', error);

		const lang = 'lang' in request ? (request as any).lang : 'es';

		return new Response(
			JSON.stringify({
				message:
					lang === 'es'
						? 'Error al suscribirse. Intenta nuevamente.'
						: 'Error subscribing. Please try again.',
			}),
			{
				status: 500,
				headers: { 'Content-Type': 'application/json' },
			}
		);
	}
};
