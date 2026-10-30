# Mon travail

Prénom ou membres du binôme :
Nathan BERGEON
Valentin HEULS
Adem Bouzghaya
Shayan Falakshahi
Nael Abassi

Nom du chatbot :

## 01 Le chemin d’un message

Expliquez en quatre à six phrases ce qui se passe entre l’activation du bouton Envoyer et l’affichage de la réponse.

Votre réponse :

Lorsque l’utilisateur active le bouton Envoyer, un événement déclenche la fonction qui traite le message. Le programme récupère le texte saisi et vérifie qu’il n’est pas vide. Il normalise ensuite le texte en supprimant les espaces inutiles et en le passant en minuscules. La fonction choisirReponse cherche un mot-clé et renvoie la réponse correspondante, ou une réponse par défaut si aucun mot-clé n’est reconnu. Le programme affiche le message et la réponse, met à jour le compteur puis vide le champ de saisie.

## 02 Les variables et les objets

Quelle variable est réaffectée ? Pourquoi les références aux éléments peuvent-elles être déclarées avec const ? Quelles propriétés de votre objet chatbot utilisez-vous ?

Votre réponse :

La variable qui contient le compteur de messages est réaffectée : sa valeur augmente à chaque message accepté et revient à zéro lors de la réinitialisation. Les références aux éléments HTML peuvent être déclarées avec const, car elles continuent de désigner les mêmes éléments, même lorsque leur contenu change. Les propriétés de l’objet chatbot utilisées doivent être précisées à partir du code : leurs noms ne sont pas fournis dans ce document.

## 03 Les fonctions

Quel est le paramètre de choisirReponse ? Que renvoie cette fonction ? Pourquoi est-il utile de séparer le choix de la réponse de l’affichage ?

Votre réponse :

Le paramètre de choisirReponse est le message à analyser. Cette fonction renvoie une chaîne de caractères contenant la réponse associée à un mot-clé ou la réponse par défaut. Séparer le choix de la réponse de son affichage permet de tester la logique indépendamment de l’interface. Cela facilite aussi la modification des réponses sans modifier le code qui les affiche. 

## 04 Une difficulté rencontrée

Décrivez l’observation, votre hypothèse, votre vérification et la correction effectuée.

Votre réponse : 
Au début, j’ai eu du mal à relier le HTML et le CSS au fichier JavaScript pour que le chatbot réponde lorsqu’on saisit du texte et qu’on clique sur Envoyer. J’ai supposé que le fichier JavaScript était mal relié à la page ou que le clic sur le bouton n’était pas détecté. J’ai vérifié le chemin du fichier dans la balise <script>, les identifiants des éléments HTML et l’événement associé au bouton. J’ai corrigé la liaison et la gestion du clic pour récupérer le texte saisi, puis afficher la réponse du chatbot.

## 05 Vos vérifications

- [ ] Les cinq mots-clés ont été testés.
- [ ] Une saisie avec espaces et majuscules a été testée.
- [ ] Le message inconnu et la saisie vide ont été testés.
- [ ] Le compteur et la remise à zéro ont été testés.
- [ ] Les commandes au clavier et une fenêtre étroite ont été testées.
- [ ] La console ne présente pas d’erreur pendant ces essais.

Ce qui fonctionne :

Ce qui reste à terminer :
Bonus :
Deux nouveaux mots : navigateur et serveur.
Les sept questions et réponses visibles au-dessus du chat.
« Le chatbot réfléchit… », puis la réponse lettre par lettre.
Le prénom mémorisé avec « Je m’appelle Nathan » et réutilisé dans les réponses.
Recommencer efface aussi le prénom.