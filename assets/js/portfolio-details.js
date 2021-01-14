const d = document;

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const projectParam = urlParams.get('projectName');

const projectsAllowed = ['Market', 'MarketPage', 'Infotech', 'InfotechPage', 'Homeworks', 'Chat'];
const isAllowed = projectsAllowed.find(e => e === projectParam);

const getProjectData = async(projectName) => {
    let data = [];
    await fetch('data/portfolio.json').then(resp => resp.json().then((elements) => data = Array(...elements)));
    const myProjectData = data.find(project => project.value === projectName);
    return myProjectData;
}

const buildProjectDetails = async() => {
    const project = await getProjectData(projectParam);
    const {category, projectDate, url, description, title} = project;
    console.log(project);
    const lbl = d.getElementById('lbl-title');
    lbl.innerText = title;
    const titleH3 = d.getElementById('title-project');
    titleH3.innerText = title;
    const ul = d.createElement('ul');
    if(project) {
        const length = project.images.length;
        if(project.images) {
            for(i=0; i<5; i++) {
                const img = d.getElementById(`img${i+1}`);
                img.setAttribute('src', project.images[i]);
                if(project.images.length === i+1) {
                    const difference = 5 - (length+1);
                    const dif = 5 - difference;
                    console.log(dif);
                    for(i = dif; i < 5; i++) {
                        const img = d.getElementById(`img${i+1}`);
                        console.log(img);
                        img.remove();
                    }
                    break;
                }
            }
            // let images = Object.keys(project.images);
            // const divOwlOuter = d.querySelector('.owl-stage-outer');
            // const divOwl = d.querySelector('.owl-stage');
            // const dots = d.querySelector('.owl-dots');
            // for (let i = 0; i < images.length; i++) {
            //     const value = images[i];
            //     const div2 = d.createElement('div');
            //     div2.setAttribute('class', 'owl-item');
            //     div2.setAttribute('style', 'width: 1110px;')
            //     const img = d.createElement('img');
            //     img.setAttribute('src', project.images[value]);
            //     img.setAttribute('class', 'img-fluid');
            //     div2.appendChild(img);
            //     divOwl.append(div2);
            //     const button = d.createElement('button');
            //     button.setAttribute('role', 'button');
            //     button.setAttribute('class', 'owl-dot');
            //     button.innerHTML = '<span> </span>';
            //     dots.append(button);
            // }
            // console.log(divOwl);
            // divOwl.setAttribute('style', 'transform: translate3d(-1530px, 0px, 0px); transition: all 0.25s ease 0s; width: 5610px');
            // divOwlOuter.appendChild(divOwl);
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
    const div = d.querySelector('.portfolio-info');
    div.appendChild(ul);
    const p = d.createElement('p');
    p.innerText = description;
    const divDescription = d.querySelector('.portfolio-description');
    divDescription.appendChild(p);
}

if(isAllowed) buildProjectDetails();
else window.location.href = 'index.html';