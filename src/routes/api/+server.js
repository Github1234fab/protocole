import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config(); // Charge les variables d’environnement depuis .env

const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY
});

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function POST({ request }) {
	try {
		const { prompt } = await request.json();
		console.log('Prompt reçu :', prompt);

		const response = await openai.chat.completions.create({
		model: 'gpt-3.5-turbo',
			messages: [
				{ role: 'system', content: 'Tu es un expert en hypnothérapie, rédige des protocoles personnalisés.' },
				{ role: 'user', content: prompt }
			]
		});

		const result = response.choices[0]?.message?.content || '';
		console.log('Réponse AI :', result);

		return new Response(JSON.stringify({ reply: result }), {
			headers: { 'Content-Type': 'application/json' }
		});
	} catch (error) {
		console.error('Erreur côté serveur :', error);

		return new Response(JSON.stringify({ error: 'Erreur serveur : ' + error.message }), {
			status: 500,
			headers: { 'Content-Type': 'application/json' }
		});
	}
}
