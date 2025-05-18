<script>
	import { aiResponseStore } from '$lib/aiStore';
	import html2pdf from 'html2pdf.js';

	let html = '';

	// Réactif : met à jour `html` dès que `aiResponseStore` change
	$: html = $aiResponseStore || '';

	function downloadHTML() {
		const blob = new Blob([html], { type: 'text/html' });
		const url = URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url;
		a.download = 'reponse.html';
		a.click();
		URL.revokeObjectURL(url);
	}

	function downloadPDF() {
		const element = document.querySelector('.html-rendered');
		if (element) {
			html2pdf().from(element).save('reponse.pdf');
		}
	}

	async function copyToClipboard() {
		try {
			await navigator.clipboard.writeText(html);
			alert('Texte copié dans le presse-papiers !');
		} catch (err) {
			alert('Échec de la copie.');
		}
	}
</script>


<main>
	{#if html}

<div class="wrapper__buttons">
	<button on:click={copyToClipboard}>Copier</button>
	<button on:click={downloadPDF}>Télécharger PDF</button>
</div>
	{:else}
		<p>Aucune réponse disponible.</p>
	{/if}
	<div class="html-rendered">
		{@html html}
	</div>

</main>

<style>
	main{
		background-color: var(--main-color);
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 100%;
		padding: 10px;
	}
	.wrapper__buttons {
		display: flex;
		justify-content: center;
		gap:5px;
		margin-top: 2rem;
		
	}


	button {
		padding: 0.5rem 1rem;
		font-size: 1rem;
		border: none;
		border-radius: 0.5rem;
		background-color: var(--elements);
		font-size: 14px;;
		color: white;
		cursor: pointer;
		transition: background 0.2s ease;
		background-color: var(--cta);
	}

	button:hover {
		background-color: #1c56ad;
	}

	.html-rendered {
		background-color: var(--elements);
		padding: 1rem;
		border-radius: 0.5rem;
		max-width: 800px;
		margin: 3rem auto;
		color: rgb(228, 228, 228);
		padding: 20px;
	}
	:global(.html-rendered h2){
		font-size: 1.4rem;
		margin-top: 2rem;
		margin-bottom: 1rem;
		color: #f1f2f3;
	}
	:global(.html-rendered p) {
		margin-bottom: 1rem;
		line-height: 35px;
	}


</style>
