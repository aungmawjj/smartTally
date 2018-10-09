const config = require('./config');
const mongoose = require('mongoose');
const MQTT = require('mqtt');
const CrowdArea = require('./models/CrowdArea');

mongoose.connect(config.mongodbUri);
const mqtt = MQTT.connect(config.mqtt.url, config.mqtt.options);

function updateCrowdArea(crowdArea) {
  CrowdArea.updateOne({deviceId: crowdArea.deviceId}, crowdArea).exec()
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      console.log(err);
    });
}

mqtt.on('connect', () => {
  console.log('MQTT broker connected');
  mqtt.subscribe(config.mqtt.topic, err => {
    if(err) console.log(`cannot subscribe`);
    console.log(`subscribing at ${config.mqtt.topic}`);
  });
});

mqtt.on('message', (topic, message) => {
  // message is Buffer
  try {
    const crowdArea = JSON.parse(message.toString());
    updateCrowdArea(crowdArea);
  } catch (err) {
    console.log(err);
  }
});