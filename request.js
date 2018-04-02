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
        repositories.values.map((repo) => {
            repoName.push(repo['full_name'])
        });
        return repoName;
    }

    return repositories.values;
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
            'client_id': 'your client id',
            'client_secret': 'your client secret'
        },
        json: true
    };

    let auth = await request(options);

    return auth.access_token;
}