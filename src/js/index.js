import '../styles/index.sass';
import './../styles/style_guide/highlightjs.css';
import header from './../templates/header.html';
import sidebar from './../templates/sidebar.html';
import intro from './../templates/intro.html';
import colors from './../templates/colors.html';
import grid from './../templates/grid.html';
import typography from './../templates/typography.html';

/*
 * Ce code est juste là car c'est un projet simple et que j'ai horreur de travailler sur des gros fichiers HTML.
 * N'appliquez pas cette méthode dans vos sites. N'appliquez pas cette méthode en production.
 * Le contenu d'un site doit autant que faire se peut être directement dans vos fichiers HTML.
 *
 * CECI ETANT DIT :
 *
 * Ici j'ai séparé le contenu de mon index.html en plusieurs fichiers situés dans /templates. Je les importe en tant que chaine de caractères, les transforme en éléments de DOM, et les injecte dans l'index.html en remplaçant leurs balises placeholder initiales.
 *
 * Pour les differentes sections du style guide, je génère également dynamiquement un bouton permettant de montrer/cacher le code.
 */
function renderDOM(){
    const body = document.body;

    function toHTMLDOM(template){
        const temp = document.createElement('div');
        temp.innerHTML = template;
        return temp.firstChild;
    }

    function inject({id, template}){
        const placeholder = document.getElementById(id);
        placeholder.parentNode.replaceChild(toHTMLDOM(template), placeholder);
        addShowCodeButton(id, template);
    }

    function addShowCodeButton(id, template){
        const btn = document.createElement('button');
        const code = document.createElement('pre');

        btn.textContent = "Show code";
        btn.classList.add('show-code');
        code.classList.add('code-block');
        code.innerHTML = `<code class="html">${
            template
            .replace(new RegExp('<', 'g'), '&lt;')
            .replace(new RegExp('>', 'g'), '&gt;')
        }</code>`;
        code.style.display = 'none';

        btn.addEventListener('click', () => {
            code.style.display = code.style.display === 'none' ? 'block' : 'none';
            btn.textContent = code.style.display === 'none' ? 'Show code' : 'Hide code';
        })
        const container = document.getElementById(id);

        if (container) {
            container.appendChild(btn);
            container.appendChild(code);
        }
    }

    const components = [
        {
            id: 'header',
            template: header
        },
        {
            id: 'sidebar',
            template: sidebar
        },
        {
            id: 'intro',
            template: intro
        },
        {
            id: 'colors',
            template: colors
        },
        {
            id: 'grid',
            template: grid
        },
        {
            id: 'typography',
            template: typography
        },
    ];

    components.forEach(inject);
}

document.addEventListener('DOMContentLoaded', renderDOM);
