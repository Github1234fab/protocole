<script>
	import { maybeCoerceInteger } from 'openai/core.mjs';
	import { aiResponseStore } from '$lib/aiStore';
	import { goto } from '$app/navigation';


	let formData = {
		age: '',
		profil: '',
		pathologie: '',
		therapiePrecedente: '',
		methodeHypnose: '',
		induction: true,
		duree: '',
		ton: '',
		objectif: ''
	};

	let progress = 0;
	let showOverlay = false;
	let readyToView = false;
	let generatedPrompt = '';
	let aiResponse = '';
	let loading = false;
	let error = '';
	const ages = Array.from({ length: 96 }, (_, i) => i + 4);
	let exempleResponse = `---

# 🌿 Se libérer de la jalousie toxique : un voyage intérieur de guérison et de transformation

---

## I. Le miroir brisé

Il était une fois un être qui regardait un miroir… mais ce miroir était fendu. À travers ses fissures, il voyait son reflet déformé. Une image troublée, instable, morcelée. Et dans ce reflet, il avait du mal à se reconnaître. Le doute s’infiltrait, l’ombre s’épaississait. Et avec cette ombre, venait la jalousie. Cette jalousie toxique, insidieuse, qui glissait comme une brume froide entre les pensées.

Mais ce miroir brisé n’était pas la vérité. Il n’était qu’un objet, ancien, fatigué, coloré par les blessures du passé. Ce n’était pas l’âme. Ce n’était pas l’être. Ce n’était pas la lumière.

Alors, doucement, avec une infinie tendresse, l’être s’est approché du miroir. Il n’a pas voulu le briser davantage. Non. Il a soufflé dessus. Il a caressé sa surface. Il a osé regarder au-delà des cassures. Et là, il a vu… une lumière intacte. Un éclat vivant. Un regard doux. Le début d’un pardon.

---

## II. Le jardin des comparaisons

La jalousie pousse dans un jardin particulier. Un jardin où l’on sème des comparaisons. Où chaque fleur regarde les autres et se demande : « Suis-je assez belle ? Suis-je aimée ? Suis-je unique ? » Et dans ce jardin, certaines plantes se fanent parce qu’elles oublient leur nature propre.

Mais un jour, une fleur décida de cesser de se comparer. Elle se tourna vers le soleil, profondément. Elle s’étira dans sa singularité. Elle comprit qu’elle était belle non pas parce qu’elle surpassait les autres, mais parce qu’elle était elle-même. Unique. Vivante. Irréductible.

Et alors, quelque chose changea dans le jardin. Les autres fleurs aussi se redressèrent. Chacune trouva sa place. Plus besoin de rivalité. Plus besoin d’envie. Juste une cohabitation douce, harmonieuse, fertile.

---

## III. La forêt des blessures

Il y a dans chacun de nous une forêt ancienne. Une forêt pleine de souvenirs, de blessures anciennes, de douleurs non exprimées. La jalousie y trouve ses racines. Car souvent, elle naît d’un manque : manque d’amour, de reconnaissance, de sécurité.

Dans cette forêt, une silhouette avance. C’est toi. Tu portes une lanterne. Tu n’as pas peur. Car tu sais qu’en éclairant cette forêt, tu ne la détruis pas. Tu l’honores. Tu lui donnes une nouvelle chance. Et chaque arbre que tu touches se transforme : le chêne de la trahison devient un arbre de sagesse, le saule du rejet se redresse avec fierté, le pin du doute retrouve ses aiguilles de clarté.

Et dans cette forêt purifiée, tu peux construire une maison intérieure. Solide. Paisible. Libre.

---

## IV. L’élixir de confiance

La jalousie se nourrit de méfiance. De peur. De manque de sécurité intérieure. Mais il existe en toi un élixir oublié. Un nectar ancien : la confiance. Pas la confiance aveugle. Mais celle qui naît d’un enracinement profond, d’un amour lucide pour soi-même.

Imagine que tu tiens entre tes mains une fiole. Dans cette fiole, un liquide doré, vibrant. Chaque goutte contient une phrase puissante :
✨ « Je suis digne d’amour. »
✨ « Je mérite le respect. »
✨ « Ce que j’ai en moi est précieux. »

À chaque fois que tu bois une goutte de cet élixir imaginaire, quelque chose en toi s’apaise. Ton cœur se redresse. Tes pensées s’éclairent. Et tu peux regarder l’autre… non plus comme un rival, mais comme un être libre, qui ne menace en rien ta propre valeur.

---

## V. Le théâtre intérieur

Dans ton esprit existe un théâtre. Et parfois, sur sa scène, des personnages se battent : la peur, le contrôle, le manque, la colère. Ils jouent des drames, des scènes de soupçon et de rivalité.

Mais dans la salle, il y a un spectateur plus grand. C’est toi, dans ta pleine conscience. Tu observes cette pièce. Et doucement, tu comprends que tu peux réécrire le scénario. Tu peux faire monter sur scène un nouveau personnage : la sérénité.

Et quand la sérénité entre, les autres s’apaisent. Le décor change. La lumière devient chaude, ambrée. L’histoire devient plus belle. Tu ne joues plus une tragédie. Tu composes une symphonie d’acceptation.

---

## VI. Le pont de la transformation

La jalousie te fait croire qu’il faut posséder, retenir, enfermer. Mais l’amour vrai, lui, ne retient pas. Il fait confiance. Il laisse respirer. Il choisit à chaque instant, sans contrainte.

Alors tu construis un pont. Un pont intérieur. Entre l’attachement et la liberté. Entre la peur et la confiance. Entre le manque et la plénitude.

Ce pont, tu le traverses à ton rythme. Tu regardes en arrière avec gratitude, mais tu choisis d’avancer. Tu avances vers un amour mature. Un amour apaisé. Un amour qui ne se nourrit plus de jalousie, mais de présence consciente.

---

## VII. La guérison par le feu doux

Il y a en toi une flamme. Un feu doux. Ce feu, c’est ton intégrité. C’est ta lumière. C’est ton authenticité. Il peut brûler les résidus de jalousie, sans violence. Il transmute. Il éclaire.

Assieds-toi près de ce feu symbolique. Regarde-le danser. Donne-lui les pensées toxiques, les croyances erronées, les peurs infantiles. Il les transformera en chaleur. En clarté. En force tranquille.

Et dans cette chaleur nouvelle, tu sens que tu es capable d’aimer sans peur. De regarder l’autre vivre, libre, et de rester stable. Centré. Ouvert.

---

## VIII. Le retour à soi

Au bout de ce voyage, il y a un retour. Non pas à l’ancien toi, mais à un soi plus vaste. Plus fort. Plus doux. Tu n’es plus esclave de cette jalousie qui t’enfermait. Tu l’as rencontrée. Tu l’as comprise. Tu l’as transformée.

Et maintenant, tu peux te lever. Marcher. Respirer. Regarder avec lucidité et sérénité. Tu sais que tu as une valeur unique, infinie, inaltérable.

Et chaque jour, tu peux revenir à ce jardin, à cette forêt, à ce feu. Tu es libre. Tu es en paix. Tu es entier.

---

🌟 **Conclusion : Un amour plus vaste**

La jalousie n’était qu’un appel. Un appel vers toi-même. Vers ton besoin d’être vu, reconnu, aimé. Maintenant que tu l’as entendu, tu peux répondre à cet appel… autrement. Avec maturité, tendresse, grandeur.

Tu peux aimer sans peur. Tu peux t’aimer pleinement. Tu peux regarder la vie comme une cohabitation féconde, et non comme une compétition stérile.

Et dans cette paix nouvelle, une joie douce s’installe. Une force tranquille. Une lumière qui ne s’éteint plus.

---
`;

	async function sendToOpenAI() {
		showOverlay = true;
		loading = true;
		progress = 0;
		readyToView = false;
		loading = true;
		error = '';
		aiResponse = '';
		const interval = setInterval(() => {
			if (progress < 95) progress += Math.random() * 5;
		}, 150);

		// Génération directe du prompt
		const generatedPrompt = `Tu es un hypnothérapeute expert. Rédige un script hypnotique personnalisé ${formData.induction ? 'sans induction' : 'avec induction'} 
		destiné à un patient âgé de ${formData.age} ans, souffrant de ${formData.pathologie}, 
		ayant déjà suivi une thérapie de ce type: ${formData.therapiePrecedente}, et souhaitant résoudre son problème qui est le suivant : ${formData.objectif}.
		Le ton doit être ${formData.ton}, et la durée approximative est de ${formData.duree} min. Inclure des métaphores et des suggestions très adaptées.
        Voici un exemple de structure souhaitée (en Markdown) :

${exempleResponse}

Merci de respecter le style de l'exemple dans la génération du script.
 Merci de générer des retours à la ligne et un texte bien structuré, prêt pour une conversion en pdf ou word`;

		try {
			const res = await fetch('/api', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ prompt: generatedPrompt })
			});

			const data = await res.json();

			if (res.ok) {
				aiResponse = data.reply;
				progress = 100;
				readyToView = true;
				aiResponseStore.set(aiResponse);
				goto('/displayResponse');
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

<!-- HTML-->

<!-- <h2>Création de protocole d'hypnose</h2> -->

<main>
	{#if showOverlay}
		<div class="overlay">
			<div class="modal">
				<p>Chargement : {Math.floor(progress)}%</p>
				<progress max="100" value={progress}></progress>
				<button class="display-response-AI" disabled={!readyToView} class:ready={readyToView} on:click={handleViewClick}>
					{readyToView ? 'Voir' : 'Chargement...'}
				</button>
			</div>
		</div>
	{/if}

	<div class="container__form">
		<div class="wrapper__selections">
			<select bind:value={formData.age}>
				<option value="" disabled selected>Choisissez un âge</option>
				{#each ages as age}
					<option value={age}>{age}</option>
				{/each}
			</select>
		</div>

		<!-- ============= -->

		<div class="wrapper__selections">
			<select id="profil" bind:value={formData.profil}>
				<option value="" disabled selected>Choisir le profil</option>
				<option value="anxieux">Anxieux</option>
				<option value="depressif">Dépressif</option>
				<option value="stresse">Stressé</option>
				<option value="hyperactif">Hyperactif</option>
				<option value="hyperactif">phobique</option>
			</select>
		</div>

		<!-- ============= -->

		<div class="wrapper__selections">
			<select id="pathologie" bind:value={formData.pathologie}>
				<option value="" disabled selected>Pathologie</option>

				<option value="anxiete_generalisee">Trouble d'anxiété généralisée</option>
				<option value="trouble_bipolaire">Trouble bipolaire</option>
				<option value="troubles_alimentaires">Troubles alimentaires</option>
				<option value="trouble_panique">Trouble panique</option>
				<option value="troubles_obsessionnels_compulsifs">Troubles obsessionnels compulsifs (TOC)</option>
				<option value="tdah">Trouble du déficit de l'attention avec hyperactivité (TDAH)</option>
				<option value="trouble_stress_post_traumatique">Trouble de stress post-traumatique (TSPT)</option>

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
		</div>

		<!-- ============= -->

		<div class="wrapper__selections">
			<select id="therapiePrecedente" bind:value={formData.therapiePrecedente}>
				<option value="" disabled selected>Thérapie précédente</option>
				<option value="Aucune thérapie antérieure">Aucune thérapie antérieure</option>
				<option value="Thérapie cognitive-comportementale (TCC)">Thérapie cognitive-comportementale (TCC)</option>
				<option value="Thérapie analytique / psychanalyse">Thérapie analytique / psychanalyse</option>
				<option value="EMDR (désensibilisation par les mouvements oculaires)">EMDR (désensibilisation par les mouvements oculaires)</option>
				<option value="Thérapie systémique">Thérapie systémique</option>
				<option value="Sophrologie">Sophrologie</option>
				<option value="Méditation / Pleine conscience">Méditation / Pleine conscience</option>
				<option value="Soins énergétiques / Reiki">Soins énergétiques / Reiki</option>
				<option value="Accompagnement par un coach">Accompagnement par un coach</option>
				<option value="Thérapie brève stratégique">Thérapie brève stratégique</option>
				<option value="Thérapie ACT (Acceptance and Commitment Therapy)">Thérapie ACT (Acceptance and Commitment Therapy)</option>
				<option value="Autre thérapie non listée">Autre thérapie non listée</option>
			</select>
		</div>

		<!-- ============= -->

		<div class="wrapper__selections">
			<select id="methodeHypnose" bind:value={formData.methodeHypnose}>
				<option value="" disabled selected>Méthode</option>
				<option value="Gestalt-thérapie">Gestalt-thérapie</option>
				<option value="Hypnose ericksonienne">Hypnose ericksonienne</option>
				<option value="Analyse transactionnelle">Analyse transactionnelle</option>
				<option value="PNL">PNL</option>
				<option value="TPI">TPI</option>
				<option value="Autre">Autre</option>
			</select>
		</div>

		<!-- ============= -->

		<div class="wrapper__selections">
			<select name="duration" id="duration" bind:value={formData.duree}>
				<option value="" disabled selected>Choisir la durée</option>
				<option value="20">20 minutes</option>
				<option value="40">40 minutes</option>
				<option value="60">1 heure</option>
			</select>
		</div>

		<!-- ============= -->

		<div class="wrapper__selections">
			<select name="ton" id="ton" bind:value={formData.ton}>
				<option value="" disabled selected>Choisir le ton</option>
				<option value="Doux">Doux</option>
				<option value="Apaisant">Apaisant</option>
				<option value="Profond">Profond</option>
				<option value="Profond">Rassurant</option>
				<option value="Profond">Intense</option>
			</select>
		</div>

		<!-- ============= -->

		<div class="wrapper__inductions">
			<div class="induction-label">Induction</div>
			<input type="radio" name="induction" value="Avec induction" bind:group={formData.induction} />

			<div class="induction-label">Sans induction</div>
			<input type="radio" name="induction" value="Sans induction" bind:group={formData.induction} />
		</div>

		<!-- ============= -->

		<div class="objectif">
			<label for="objectif">Description brève concernant la venue du patient</label>
			<textarea name="Objectif" bind:value={formData.objectif}></textarea>
		</div>

		<!-- ============= -->

		<button on:click={sendToOpenAI} disabled={loading}>{loading ? 'En cours...' : 'Générer le script'}</button>

		{#if aiResponse}
			<p>
				{aiResponse}
			</p>
		{/if}
	</div>
</main>

<style>
	main {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 100vh;
		background-color: var(--main-color);
		color: white;
	}
	.container__form {
		display: flex;
		flex-wrap: wrap;
		gap: 1rem;
		width: 60%;
	}
	.wrapper__selections {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		border-radius: 6px;
		width: 100%;
	}
	.wrapper__inductions {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 10px;
		border-radius: 6px;
		background-color: var(--elements);
		padding: 20px;
		max-height: 20px;
		width: 100%;
	}
	.induction-label {
		display: flex;
		align-items: center;
		font-size: 13px;
		background-color: var(--elements);
	}
	.container__form select {
		padding: 15px;
		border: none;
		border-radius: 10px;
		box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.1);
		background-color: var(--elements);
		color: white;
		width: 100%;
		max-height: 60px;
	}
	.container__form button {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 20px;
		background-color: #007bff;
		color: white;
		border: none;
		border-radius: 5px;
		cursor: pointer;
		max-height: 30px;
	}
	.container__form button:disabled {
		background-color: #ccc;
		cursor: not-allowed;
	}
	/* .container__form p {
		background-color: #f8f9fa;
		padding: 10px;
		border-radius: 5px;
		line-height: 35px;
	}
	.container__form p {
		color: rgb(55, 26, 200);
		text-align: center;
		width: 50%;
		margin: 0 auto;
	} */

	.container__form textarea {
		height: 200px;
		background-color: rgb(41, 40, 40);
		color: white;
		font-weight: 400;
		border-radius: 10px;
		width: 100%;
		padding: 20px;
	}
	.objectif {
		display: flex;
		flex-direction: column;
		gap: 30px;
		align-items: flex-start;
		justify-content: center;
		width: 100%;
		border-radius: 10px;
		padding: 20px;
		color: white;
		border: 1px solid grey;
		background-color: var(--elements);
	}
	.objectif label {
		font-size: 13px;
	}

	/* ========================== */
	.overlay {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.5);
		backdrop-filter: blur(6px);
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 999;
	}

	.modal {
		background: white;
		padding: 2rem;
		border-radius: 1rem;
		text-align: center;
		box-shadow: 0 0 15px rgba(0,0,0,0.3);
	}

	.display-response-AI {
		margin-top: 1rem;
		padding: 0.5rem 1rem;
		border: none;
		border-radius: 0.5rem;
		background-color: gray;
		color: white;
		cursor: not-allowed;
		transition: background-color 0.3s;
	}

	.display-response-AI.ready {
		background-color: green;
		cursor: pointer;
	}

	@media screen and (max-width: 768px) {
		.container__form {
			flex-direction: column;
			align-items: center;
			width: 100%;
		}

		.container__form select,
		.container__form button,
		.container__form textarea {
			width: 100%;
		}
	}
</style>
