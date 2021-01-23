const d = document;
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const nameParam = urlParams.get('name');

const namesAllowed = ['Marco', 'Diego', 'Ricardo', 'Divani', 'Manuel'];

const isAllowed = namesAllowed.find(e => e === nameParam);

const getDataUser = async(name) => {
    document.title = `Equipo - ${name}`;
    let data = [];
    await fetch('assets/data/team.json').then(resp => resp.json().then((elements) => data = Array(...elements)));
    const myTeamUser = data.find(user => user.value === name);
    return myTeamUser;
}

const buildProfile = async() => {
    const user = await getDataUser(nameParam);
    const div = d.querySelector('.team-details-container');
    const img = d.createElement('img');
    img.setAttribute('src', user.image);
    img.setAttribute('class', 'team-image');
    div.append(img);
    const myName = d.getElementById('myName');
    const description = d.getElementById('myDescription');
    myName.textContent = `${user.name}`;
    description.textContent = `${user.description}`;

    const items = d.querySelector('.team-info');
    const ul = d.createElement('ul');
    const li = d.createElement('li');
    li.innerHTML = `<strong> Cargo: </strong> ${user.position}`;
    ul.appendChild(li);
    items.append(ul);
    if(user.social) {
        const div = d.createElement('div');
        div.setAttribute('class', 'social');
        let socialMedias = Object.keys(user.social);
        for(let i = 0; i < socialMedias.length; i++) {
            let value = socialMedias[i];
            const a = d.createElement('a');
            if(user.social[value]) a.setAttribute('href', user.social[value]);
            a.innerHTML = `<i class="icofont-${socialMedias[i]}"></i>`;
            div.appendChild(a);
        }
        items.append(div);
    }

}

if (isAllowed) buildProfile();
else window.location.href = 'index.html';

