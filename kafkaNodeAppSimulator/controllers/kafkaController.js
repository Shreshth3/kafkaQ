const kafka = require('kafka-node');
const { trackProducer } = require('../../kafkaq-monitor/index.js');

const kafkaController = {};

kafkaController.produceMessage = async (req, res, next) => {
  try {
    const Producer = kafka.Producer;
    const client = new kafka.KafkaClient({ kafkaHost: 'Weis-NB.local:9092' });
    const producer = new Producer(client);

    const { msg } = req.body;
    // console.log(msg);

    trackProducer(producer);

    const partition = msg[0].toLowerCase() < 'n' ? 0 : 1;
    payloads = [
      {
        topic: 'Users-1',
        messages: msg,
        partition: partition,
      },
    ];
    console.log(`sending message...`);
    producer.on('ready', function () {
      producer.send(payloads, function (err, data) {
        console.log(payloads);
        console.log(`Producer sent: ${JSON.stringify(data)}}`);
      });
      console.log(`message sent!`);
    });
    producer.on('error', function (err) {
      console.log(`Producer Error: ${err}`);
    });
  } catch (err) {
    console.log(`this is the controller error: ${err}`);
  } finally {
    next();
  }
};

module.exports = kafkaController;
