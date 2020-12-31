// Load the AWS SDK for Node.js
const AWS = require('aws-sdk');

AWS.config.update({
    region: 'us-east-1',
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY

});

const sendSMS = async (client, car) => {
  let params = {
    Message: `Olá ${client.name} você acaba de alugar o carro ${car.model}. Espero que se divirta muito em seu passeio`,
    PhoneNumber: client.phoneNumber,
  };

  var publishTextPromise = new AWS.SNS().publish(params).promise();

  const snsSend = publishTextPromise.then(function (data) {
    console.log("MessageID is " + data.MessageId);
  }).catch(function (err) {
    console.error(err, err.stack);
  });

  await Promise.all([snsSend]);
}

module.exports = {
  sendSMS
}