///////////////////////////////////////////////
/* UNE FONCTION POUR RECUPERER LES MESSAGES SOUS FORM DE JSON POUR LES AFFICHER */

const getMessage = function() {
    const request = new XMLHttpRequest();
    request.open('GET', 'process.php');

    // Quand on recoit les données on va les traiter
    request.onload = () => {
        const results = JSON.parse(request.responseText);
        const html = results.reverse().map((message) => {
            return `<div class="message"> 
                <span class="date">${message.created_at.substring(11, 16)}</span>
                <span class="author">${message.author}</span>
                <span class="content">${message.content}</span>
            </div>`;
        }).join('');

        const messages = document.querySelector('.messages');
        messages.innerHTML = html;

        console.log(messages.scrollTop, messages.scrollHeight);
        messages.scrollTop = messages.scrollHeight; // REVERSING SCROLL
    };
    
    // On envoie la requete
    request.send();
};

/* UNE FONCTION POUR POSTER LES MESSAGES ET LES AFFICHER */

const postMessage = function(e){
    e.preventDefault();

    // On récupère les données du form
    const author = document.querySelector('#author');
    const content = document.querySelector('#content');

    // On crée les paramètres de la requete post
    const data = new FormData();
    data.append('author', author.value);
    data.append('content', content.value);

    const request = new XMLHttpRequest();
    request.open('POST', 'process.php?task=write');
    request.onload = () => {
        content.value = '';
        content.focus();
        getMessage();
    };

    request.send(data);
};

document.querySelector('form').addEventListener('submit', postMessage);

const interval = window.setInterval(getMessage, 3000);
getMessage();