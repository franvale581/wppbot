const axios = require('axios');

const agents = [
  { name: 'Agent 1', number: 'whatsapp:+5491100000000' },
  { name: 'Agent 2', number: 'whatsapp:+5491100000001' },
  { name: 'Agent 3', number: 'whatsapp:+5491100000002' }
];
let currentAgentIndex = 0;

exports.handleIncomingMessage = (req, res) => {
  const incomingMsg = req.body.Body;
  const from = req.body.From;
  const currentAgent = agents[currentAgentIndex];

  // Crear y enviar mensaje usando la API de WhatsApp Business
  axios.post(process.env.WHATSAPP_API_URL, {
    messaging_product: 'whatsapp',
    to: currentAgent.number,
    type: 'text',
    text: { body: `Nuevo mensaje de ${from}: ${incomingMsg}` }
  }, {
    headers: {
      'Authorization': `Bearer ${process.env.WHATSAPP_TOKEN}`,
      'Content-Type': 'application/json'
    }
  })
  .then(response => console.log(`Message sent with ID: ${response.data.messages[0].id}`))
  .catch(error => console.error(`Error sending message: ${error}`));

  res.send(`Gracias por contactar. Estás siendo redirigido a ${currentAgent.name}.`);

  // Actualizamos el índice del agente para el próximo mensaje
  currentAgentIndex = (currentAgentIndex + 1) % agents.length;
};
