const d = document;
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const projectParam = urlParams.get('projectName');

const projectsAllowed = ['Market', 'MarketPage', 'Infotech', 'InfotechPage', 'Homeworks', 'Chat', 'Delicious', 'Escondida'];
const isAllowed = projectsAllowed.find(e => e === projectParam);

const getProjectData = async(projectName) => {
    document.title = `Portfolio - ${projectName}`;
    let data = [];
    await fetch('assets/data/portfolio.json').then(resp => resp.json().then((elements) => data = Array(...elements)));
    const myProjectData = data.find(project => project.value === projectName);
    return myProjectData;
}

const buildProjectDetails = async() => {
    const project = await getProjectData(projectParam);
    const {category, projectDate, url, description, title} = project;
    const lbl = d.getElementById('lbl-title');
    lbl.innerText = title;
    const titleH3 = d.getElementById('title-project');
    titleH3.innerText = title;
    const divInfo = d.querySelector('.portfolio-info');
    const ul = d.createElement('ul');
    if(project) {
        if(project.images) {
            const divPortfolioDetails = d.querySelector('.portfolio-details-container');
            const img = d.createElement('img');
            img.setAttribute('class', 'img-details');
            img.src = project.images[1] || project.images[0];
            divPortfolioDetails.insertBefore(img, divInfo);
        }
        const li = d.createElement('li');
        li.innerHTML = `<strong> Categoria: </strong> ${category}`;
        ul.appendChild(li);
        const li2 = d.createElement('li');
        li2.innerHTML = `<strong> Fecha Proyecto: </strong> ${projectDate}`;
        ul.appendChild(li2);
        if(url) {
            const li3 = d.createElement('li3');
            li.innerHTML = `<strong> URL: </strong> ${url}`;
            ul.appendChild(li3);
        }
    }
    divInfo.appendChild(ul);
    const p = d.createElement('p');
    p.innerText = description;
    const divDescription = d.querySelector('.portfolio-description');
    divDescription.appendChild(p);
}

if(isAllowed) buildProjectDetails();
else window.location.href = 'index.html';