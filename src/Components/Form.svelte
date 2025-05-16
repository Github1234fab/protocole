<script>
	let formData = {
		age: '',
		profil: '',
		pathologie: '',
		therapiePrecedente: '',
		methodeHypnose: '',
		induction: true,
		duree: ''
	};

	let generatedPrompt = '';
	let aiResponse = '';
	let loading = false;
	let error = '';

	function generatePrompt() {
		generatedPrompt = `Je suis hypnothérapeuthe. Peux-tu s'il te plaît me générer une visualition positive pour ce patient que je reçois actuellement dans mon cabinet. J'aimerais que tu conjugues ton texte à la deuxième personne du pluriel. Pas d'entrée en matière. Seulement le texte de visualisation, pas d'autres chose que ce texte.'
Voici les informations de mon patient. Tu dois faire correspondre à 100% ton texte avec ces informations.:  
- Âge : ${formData.age}
- Profil : ${formData.profil}
- Pathologie : ${formData.pathologie}
- Thérapie précédente : ${formData.therapiePrecedente}
- Méthode d'hypnose : ${formData.methodeHypnose}
- Induction : ${formData.induction ? 'Oui' : 'Non'}

`;

		aiResponse = '';
		error = '';
	}

	async function sendToOpenAI() {
		if (!generatedPrompt) {
			error = "Génère d'abord le prompt !";
			return;
		}
		loading = true;
		error = '';
		aiResponse = '';

		try {
			const res = await fetch('/api', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ prompt: generatedPrompt })
			});

			const data = await res.json();

			if (res.ok) {
				aiResponse = data.reply;
			} else {
				error = data.error || 'Erreur inconnue';
			}
		} catch (e) {
			error = e.message;
		} finally {
			loading = false;
		}
	}
</script>

<h2>Création de protocole d'hypnose</h2>
<div class="container__form">
	<label for="age">Âge :</label>
	<input type="number" id="age" bind:value={formData.age} min="4" max="100" />

	<label for="profil">Profil :</label>
	<select id="profil" bind:value={formData.profil}>
		<option value="" disabled selected>Choisir le profil</option>
		<option value="anxieux">Anxieux</option>
		<option value="depressif">Dépressif</option>
		<option value="stresse">Stressé</option>
		<option value="hyperactif">Hyperactif</option>
		<option value="hyperactif">phobique</option>
	</select>

	<label for="pathologie">Pathologie :</label>
	<select id="pathologie" bind:value={formData.pathologie}>
		<option value="" disabled selected>Choisir le type de pathologie</option>
		<option value="anxiete_generalisee">Trouble d'anxiété généralisée</option>
		<option value="trouble_bipolaire">Trouble bipolaire</option>
		<option value="troubles_alimentaires">Troubles alimentaires</option>
		<option value="trouble_panique">Trouble panique</option>
		<option value="troubles_obsessionnels_compulsifs"
			>Troubles obsessionnels compulsifs (TOC)</option
		>
		<option value="tdah">Trouble du déficit de l'attention avec hyperactivité (TDAH)</option>
		<option value="trouble_stress_post_traumatique"
			>Trouble de stress post-traumatique (TSPT)</option
		>

		<option value="Traumatisé">Traumatisé</option>
		<option value="phobies">Phobie spécifique</option>
		<option value="depression_majeure">Dépression majeure</option>

		<option value="addictions">Addiction tabac</option>
		<option value="addictions">Addiction alcool</option>
		<option value="addictions">Addiction drogue et médicaments</option>

		<option value="En deuil">Deuil</option>
		<option value="Burnout">Burnout</option>
		<option value="Douleurs chroniques">Douleurs chroniques</option>
		<option value="Dépression clinique">Dépression clinique</option>
	</select>

	<label for="therapiePrecedente">Thérapie précédente :</label>
	<select id="therapiePrecedente" bind:value={formData.therapiePrecedente}>
		<option value="" disabled selected>Choisir la thérapie précédente</option>
		<option value="Aucune thérapie antérieure">Aucune thérapie antérieure</option>
		<option value="Thérapie cognitive-comportementale (TCC)"
			>Thérapie cognitive-comportementale (TCC)</option
		>
		<option value="Thérapie analytique / psychanalyse">Thérapie analytique / psychanalyse</option>
		<option value="EMDR (désensibilisation par les mouvements oculaires)"
			>EMDR (désensibilisation par les mouvements oculaires)</option
		>
		<option value="Thérapie systémique">Thérapie systémique</option>
		<option value="Sophrologie">Sophrologie</option>
		<option value="Méditation / Pleine conscience">Méditation / Pleine conscience</option>
		<option value="Soins énergétiques / Reiki">Soins énergétiques / Reiki</option>
		<option value="Accompagnement par un coach">Accompagnement par un coach</option>
		<option value="Thérapie brève stratégique">Thérapie brève stratégique</option>
		<option value="Thérapie ACT (Acceptance and Commitment Therapy)"
			>Thérapie ACT (Acceptance and Commitment Therapy)</option
		>
		<option value="Autre thérapie non listée">Autre thérapie non listée</option>
	</select>

	<label for="methodeHypnose">Méthode d'hypnose :</label>
	<select id="methodeHypnose" bind:value={formData.methodeHypnose}>
		<option value="" disabled selected>Choisir la méthode</option>
		<option value="Gestalt-thérapie">Gestalt-thérapie</option>
		<option value="Hypnose ericksonienne">Hypnose ericksonienne</option>
		<option value="Analyse transactionnelle">Analyse transactionnelle</option>
		<option value="PNL">PNL</option>
		<option value="TPI">TPI</option>
		<option value="Autre">Autre</option>
	</select>
	<label for="duration">Durée souhaitée :</label>
	<select name="duration" id="duration">
		<option value="20">20 minutes</option>
		<option value="40">40 minutes</option>
		<option value="60">1 heure</option>
	</select>
	

	<div>
	  <label>
		<input type="radio" name="induction" value="Avec induction" bind:group={formData.induction} />
		Avec induction
	  </label>
	  <label>
		<input type="radio" name="induction" value="Sans induction" bind:group={formData.induction} />
		Sans induction
	  </label>
	</div>


		<button on:click={generatePrompt}>Générer le protocole</button>
		<button on:click={sendToOpenAI} disabled={loading}
			>{loading ? 'En cours...' : 'Envoyer à OpenAI'}</button
		>

		{#if generatedPrompt}
		<pre>Prompt généré :
{generatedPrompt}</pre>
	{/if}

		{#if error}
			<p style="color: red;">{error}</p>
		{/if}

		{#if aiResponse}
			<p>
			
				{aiResponse}
			</p>
		{/if}
	
</div>

<style>
	.container__form {
		display: flex;
		flex-direction: column;
		flex-wrap: wrap;
		gap: 10px;
	}
	.container__form label {
		font-weight: bold;
	}
	.container__form input,
	.container__form select {
		padding: 5px;
		border-radius: 5px;
		border: 1px solid #ccc;
		width: 20%;
		flex: 1 1 0;
	}
	.container__form button {
		padding: 10px;
		background-color: #007bff;
		color: white;
		border: none;
		border-radius: 5px;
		cursor: pointer;
	}
	.container__form button:disabled {
		background-color: #ccc;
		cursor: not-allowed;
	}
	.container__form p {
		background-color: #f8f9fa;
		padding: 10px;
		border-radius: 5px;
		line-height: 35px;
	}
	.container__form p {
		color: rgb(55, 26, 200);
		font-family: 'Tahoma' sans-serif;
		text-align: center;
		width: 50%;
		margin: 0 auto;
	}
	.container__form label {
		font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
	}
</style>
