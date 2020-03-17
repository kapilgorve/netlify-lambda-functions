
import fetch from 'node-fetch';
const url = 'https://api.sendinblue.com/v3/contacts';

exports.handler = async (event, context) => {
    const { name, email } = event.queryStringParameters;
    console.log(name, email);
    if (email && name) {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'api-key': process.env.SENDINBLUE_API_KEY
            },
            body: JSON.stringify({ email: email, attributes: { FIRSTNAME: name }, listIds: [3] }),
        };

        try {
            const res = await fetch(url, options);
            const body = await res.json();
            console.log(body);
            if (body.id) {
                return { statusCode: 200, body: bodyStringify('OK') };
            }
            else return { statusCode: 400, body: bodyStringify(body.message) };
        } catch (error) {
            console.log(error);
            return { statusCode: 400, body: bodyStringify('API ERROR') };
        }
    }
    else {
        return { statusCode: 404, body: bodyStringify('Name or Email not present') };
    }

}

function bodyStringify(code) {
    return JSON.stringify({ message: code });
}