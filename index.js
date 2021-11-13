var crypto = require('crypto');

const sjwt = {};

sjwt.sign = (payload, key) => {
    let header = {
        "typ": "JWT",
        "alg": "HS256"
    }
    
    header = JSON.stringify(header);
    header = Buffer.from(header).toString('base64');
    
    payload = JSON.stringify(payload);
    payload = Buffer.from(payload).toString('base64');
    
    let signature = crypto.createHmac('sha256', key)
        .update(header + "." + payload)
        .digest('base64');
    
    signature = Buffer.from(signature).toString('base64');
    
    return `${header}.${payload}.${signature}`;
}

let key = 'DoNtHaCkMyPaSs';
let payload = {
    nome: 'Tiago Marques',
    empresa: 'Helix LLC',
    email: 'thymarques@gmail.com'
}

let tokenReady = sjwt.sign(payload, key);

console.log('retorno da funcao:', tokenReady);