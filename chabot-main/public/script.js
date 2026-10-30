// Le contenu des réponses est partagé entre le chatbot et la liste visible.
const chatbot = {
  nom: "Hetibot",
  accueil: "Écrivez « aide » pour commencer, ou « Je m’appelle Nathan » pour vous présenter.",
  reponses: {
    bonjour: "Bonjour ! Je suis Hetibot.",
    aide: "Envoyez un de ces mots-clés : bonjour, aide, html, css, javascript, navigateur, serveur. Présentez-vous avec « Je m’appelle Nathan ».",
    html: "HTML sert à structurer le contenu d’une page Web : titres, paragraphes et images.",
    css: "CSS sert à définir la présentation d’une page Web : couleurs, polices et espacements.",
    javascript: "JavaScript sert à rendre une page Web interactive, par exemple en réagissant à un clic.",
    navigateur: "Un navigateur est le logiciel qui permet de consulter des sites Web, comme Firefox, Chrome ou Safari.",
    serveur: "Un serveur reçoit les demandes du navigateur et lui envoie les fichiers nécessaires pour afficher une page Web."
  }
};

const titrePage = document.querySelector("#titre-page");
const nomPresentation = document.querySelector("#nom-presentation");
const nomChatbot = document.querySelector("#nom-chatbot");
const nomReponse = document.querySelector("#titre-reponse");
const reponse = document.querySelector("#reponse");
const champMessage = document.querySelector("#message");
const dernierMessage = document.querySelector("#dernier-message");
const compteur = document.querySelector("#compteur");
const erreur = document.querySelector("#erreur");
const boutonEnvoyer = document.querySelector("#envoyer");
const boutonRecommencer = document.querySelector("#recommencer");
const listeReponses = document.querySelector("#liste-reponses");
const statut = document.querySelector("#statut");

let nombreMessages = 0;
let prenom = "";
let minuterie = null;

function messageAccueil() {
  return "Bonjour ! Je suis " + chatbot.nom + ", votre guide pour découvrir le Web. " + chatbot.accueil;
}

titrePage.textContent = chatbot.nom + " — Votre guide du Web";
nomPresentation.textContent = chatbot.nom;
nomChatbot.textContent = chatbot.nom;
nomReponse.textContent = chatbot.nom;
reponse.textContent = messageAccueil();
chatbot.reponses.bonjour = "Bonjour ! Je suis " + chatbot.nom + ".";

// Les questions et réponses sont visibles au-dessus du chat, sans duplication des textes.
for (const [mot, texte] of Object.entries(chatbot.reponses)) {
  const exemple = document.createElement("div");
  const question = document.createElement("dt");
  const description = document.createElement("dd");
  question.textContent = mot;
  description.textContent = texte;
  exemple.append(question, description);
  listeReponses.append(exemple);
}

// Choisir le texte ne modifie pas l'interface.
function choisirReponse(texte) {
  let resultat;
  if (texte === "bonjour") {
    return prenom ? "Bonjour " + prenom + " ! Je suis " + chatbot.nom + "." : chatbot.reponses.bonjour;
  } else if (texte === "aide") {
    resultat = chatbot.reponses.aide;
  } else if (texte === "html") {
    resultat = chatbot.reponses.html;
  } else if (texte === "css") {
    resultat = chatbot.reponses.css;
  } else if (texte === "javascript") {
    resultat = chatbot.reponses.javascript;
  } else if (texte === "navigateur") {
    resultat = chatbot.reponses.navigateur;
  } else if (texte === "serveur") {
    resultat = chatbot.reponses.serveur;
  } else {
    resultat = "Je ne reconnais pas ce message. Écrivez « aide » pour connaître les mots-clés.";
  }
  return prenom ? prenom + " — " + resultat : resultat;
}

function arreterAnimation() {
  clearTimeout(minuterie);
  minuterie = null;
  reponse.setAttribute("aria-busy", "false");
  reponse.classList.remove("en-cours");
  statut.textContent = "";
}

function afficherProgressivement(texte) {
  // Annuler l'ancienne animation évite de mélanger deux réponses après des clics rapides.
  arreterAnimation();
  reponse.textContent = "";
  statut.textContent = "Le chatbot réfléchit…";
  reponse.setAttribute("aria-busy", "true");
  const caracteres = Array.from(texte);
  let position = 0;

  minuterie = setTimeout(function ecrire() {
    statut.textContent = "";
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      reponse.textContent = texte;
      arreterAnimation();
      return;
    }
    reponse.classList.add("en-cours");
    position = position + 1;
    reponse.textContent = caracteres.slice(0, position).join("");
    if (position < caracteres.length) {
      minuterie = setTimeout(ecrire, 18);
    } else {
      arreterAnimation();
    }
  }, 500);
}

function envoyerMessage() {
  const messageOriginal = champMessage.value.trim();
  if (messageOriginal === "") {
    erreur.textContent = "Écrivez un message avant d’envoyer.";
    champMessage.focus();
    return;
  }

  const textePrepare = messageOriginal.toLowerCase();
  // Conserver la casse du prénom, accepter les apostrophes droites et typographiques.
  const presentation = messageOriginal.match(/^je\s+m['’]appelle\s+([\p{L}][\p{L}\p{M}'’ -]{0,39})[.!?]?$/iu);
  let reponseChoisie;
  if (presentation) {
    prenom = presentation[1].trim().replace(/\s+/g, " ");
    reponseChoisie = "Enchanté " + prenom + " ! Je retiens votre prénom pour la suite de notre conversation. Écrivez « aide » pour découvrir mes mots-clés.";
  } else {
    reponseChoisie = choisirReponse(textePrepare);
  }

  dernierMessage.textContent = messageOriginal;
  afficherProgressivement(reponseChoisie);
  nombreMessages = nombreMessages + 1;
  compteur.textContent = nombreMessages;
  champMessage.value = "";
  erreur.textContent = "";
  champMessage.focus();
}

function recommencer() {
  arreterAnimation();
  nombreMessages = 0;
  prenom = "";
  compteur.textContent = nombreMessages;
  dernierMessage.textContent = "";
  reponse.textContent = messageAccueil();
  champMessage.value = "";
  erreur.textContent = "";
  champMessage.focus();
}

boutonEnvoyer.addEventListener("click", envoyerMessage);
boutonRecommencer.addEventListener("click", recommencer);
champMessage.addEventListener("keydown", function (evenement) {
  if (evenement.key === "Enter" && !evenement.isComposing) {
    evenement.preventDefault();
    envoyerMessage();
  }
});
