module.exports = {
    buscarRepositorios
}

const request = require('request-promise');

async function buscarRepositorios(respostas) {
    
    let token = await buscarToken(respostas.username, respostas.password);

    let options = {
        uri: `https://api.bitbucket.org/2.0/repositories/?role=${respostas.role}&pagelen=${respostas.pagelen}`,
        headers: {
            'Authorization': `Bearer ${token}`,
        },
        json: true
    };

    let repositories = await request(options);

    if(respostas.somenteNome)
    {
        let repoName = [];
        repositories.map((repo) => {
            repoName.push(repo['full_name'])
        });
        return repoName;
    }

    return repositories;
}

async function buscarToken(username, password) {
    let options = {
        method: 'POST',
        uri: 'https://bitbucket.org/site/oauth2/access_token/',
        headers: {
            'content-type': 'application/x-www-form-urlencoded'
        },
        form: {
            'grant_type': 'password',
            'username': username,
            'password': password,
            'client_id': '---', //seu client-id aqui
            'client_secret': '---' //seu secret aqui
        },
        json: true
    };

    let auth = await request(options);

    return auth.access_token;
}