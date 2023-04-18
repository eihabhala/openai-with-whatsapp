import { FastifyReply, FastifyRequest } from 'fastify'
import env from '../config/env'
import axios from 'axios';
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
    apiKey: env.openAiKey,
});
const openai = new OpenAIApi(configuration);



export const getTicketList = async (request: FastifyRequest, reply: FastifyReply) => {
    let mode = request.query["hub.mode"];
    let challenge = request.query["hub.challenge"];
    let token = request.query["hub.verify_token"];

    // res.status(200).send("hello webhook connected");
    if (mode && token) {
        if (mode === "subscribe" && token === env.myToken) {
            reply.status(200).send(challenge);
        } else {
            reply.status(403);
        }
    }

}

export const getTickets = async (request: FastifyRequest, reply: FastifyReply) => {
    let body: any = request.body;
    let to: string = '';
    let receiverPhoneNumber: string = '';

    if (body.object) {
        if (body.entry &&
            body.entry[0].changes &&
            body.entry[0].changes[0].value.messages &&
            body.entry[0].changes[0].value.messages[0]
        ) {
            let phoneNumberId = body.entry[0].changes[0].value.metadata.phone_number_id;
            receiverPhoneNumber = body.entry[0].changes[0].value.metadata.display_phone_number;
            let message = body.entry[0].changes[0].value.messages[0].text.body;
            message = message.toLowerCase();
            to = body.entry[0].changes[0].value.messages[0].from;
            if (message.match('dall-e')) {
                const prompt = message.split("dall-e")[1];

                const response = await openai.createImage({
                    prompt: prompt,
                    n: 2,
                    size: "512x512",
                });
                console.log(response);
                try {
                    const { data } = await axios.post(
                        "https://graph.facebook.com/v15.0/" + phoneNumberId + "/messages",
                        {
                            messaging_product: "whatsapp",
                            recipient_type: "individual",
                            to: to,
                            type: 'image',
                            image: {
                                link: response.data.data[0].url,
                            }
                        },
                        {
                            headers: {
                                "Content-Type": "application/json",
                                "Authorization": `Bearer ${env.Token}`
                            },
                        },
                    );

                    if (data) {
                        reply.status(200);
                    }
                } catch (error) {
                    if (axios.isAxiosError(error)) {
                        console.log('error message: ', error.message);

                        reply.status(400).send(error.message);
                    } else {
                        console.log('unexpected error: ', error);

                    }
                }

            } else {
                const completion = await openai.createChatCompletion({
                    model: "gpt-3.5-turbo",
                    messages: [{ role: "user", content: message }],
                });
                console.log(completion.data.choices[0].message);
                try {
                    const { data } = await axios.post(
                        "https://graph.facebook.com/v15.0/" + phoneNumberId + "/messages",
                        {
                            messaging_product: "whatsapp",
                            to: to,
                            type: 'text',
                            text: {
                                body: `${completion.data.choices[0].message.content}`
                            }
                        },
                        {
                            headers: {
                                "Content-Type": "application/json",
                                "Authorization": `Bearer ${env.Token}`
                            },
                        },
                    );

                    console.log(JSON.stringify(data, null, 4));
                    if (data) {
                        reply.status(200);
                    }
                } catch (error) {
                    if (axios.isAxiosError(error)) {
                        console.log('error message: ', error.message);

                        reply.status(400).send(error.message);
                    } else {
                        console.log('unexpected error: ', error);

                    }
                }
            }
        }
    }

}