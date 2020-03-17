
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
                return formResponse(200, 'OK');
            }
            else return formResponse(400, body.message);
            ;
        } catch (error) {
            console.log(error);
            return formResponse(400, 'API ERROR');
        }
    }
    else {
        return formResponse(404, 'Name or Email not present');
    }

}

function formResponse(status, message) {
    return {
        headers: {
            "Access-Control-Allow-Origin": "*",
        },
        statusCode: status,
        body: JSON.stringify({ message: message })
    }
}