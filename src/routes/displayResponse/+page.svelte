<script>
	import { aiResponseStore } from '$lib/aiStore';
	import { marked } from 'marked';
	import html2pdf from 'html2pdf.js';

	// Auto-réactive : $aiResponseStore
	let markdown = '';

	$: markdown = $aiResponseStore || '';

	function downloadMarkdown() {
		const blob = new Blob([markdown], { type: 'text/markdown' });
		const url = URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url;
		a.download = 'reponse.md';
		a.click();
		URL.revokeObjectURL(url);
	}

	function downloadPDF() {
		const element = document.querySelector('.markdown-rendered');
		if (element) {
			html2pdf().from(element).save('reponse.pdf');
		}
	}

	async function copyToClipboard() {
		try {
			await navigator.clipboard.writeText(markdown);
			alert('Texte copié dans le presse-papiers !');
		} catch (err) {
			alert('Échec de la copie.');
		}
	}
</script>

{#if markdown}
	<div class="actions">
		<button on:click={copyToClipboard}>📋 Copier</button>
		<button on:click={downloadMarkdown}>⬇️ Markdown</button>
		<button on:click={downloadPDF}>📄 PDF</button>
	</div>

	<div class="markdown-rendered">
		{@html marked(markdown)}
	</div>
{:else}
	<p>Aucune réponse disponible.</p>
{/if}

<style>
	.actions {
		display: flex;
		gap: 1rem;
		margin: 1rem 0;
	}

	button {
		padding: 0.5rem 1rem;
		font-size: 1rem;
		border: none;
		border-radius: 0.5rem;
		background-color: #2d72d9;
		color: white;
		cursor: pointer;
		transition: background 0.2s ease;
	}

	button:hover {
		background-color: #1c56ad;
	}

	.markdown-rendered {
		background-color: #f8f8f8;
		padding: 1rem;
		border-radius: 0.5rem;
		max-width: 800px;
		margin: auto;
		overflow-x: auto;
	}

	/* Style markdown */
	/* .markdown-rendered h1, .markdown-rendered h2 {
		margin-top: 1.5rem;
		color: #333;
	}
	.markdown-rendered pre {
		background: #333;
		color: #f8f8f8;
		padding: 1rem;
		border-radius: 0.5rem;
		overflow-x: auto;
	}
	.markdown-rendered code {
		background: #eee;
		padding: 0.2rem 0.4rem;
		border-radius: 0.3rem;
	} */
</style>
