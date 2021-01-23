const namesAllowed = ['Marco', 'Diego', 'Ricardo', 'Divani', 'Manuel'];
const projectsAllowed = ['Market', 'MarketPage', 'Infotech', 'InfotechPage', 'Homeworks', 'Chat', 'Escondida', 'Delicious'];

const showDetailTeam = (name) => {
    const isAllowed = namesAllowed.find(e => e === name);
    if(isAllowed) {
        window.location.href = `team-details.html?name=${name}`;
    }
}

const showProjectDetail = (projectName) => {
    const isAllowed = projectsAllowed.find(e => e === projectName);
    if(isAllowed) {
        window.location.href = `portfolio-details.html?projectName=${projectName}`;
    }
}