const amqplib = require('amqplib');
const {MESSAGE_BROKER_URL, EXCHANGE_NAME} = require('../config/server-config')

const createChannel = async () =>{
    try {
        const connection =  await amqplib.connect(MESSAGE_BROKER_URL);  //connecting to the message broker which is having multiple queue's with it
        const channel =  await connection.createChannel();      // in order to connect with those queues, we need a channel object
        await channel.assertExchange(EXCHANGE_NAME, 'direct', false);
        return channel;
    } 
    catch (error) {
        console.log("Something wrong in createchannel MQ");
        throw error;
    }
}

const subscribeMessage = async (channel, service, binding_key) => {
    try {
        const applicationQueue = await channel.assertQueue("REMINDER_QUEUE");

        channel.bindQueue(applicationQueue.queue, EXCHANGE_NAME, binding_key);
    
        channel.consume(applicationQueue.queue , msg => {
            console.log("Received data");
            console.log(msg.content.toString());
            channel.ack(msg);
        }); 
    } 
    catch (error) {
        console.log("Something wrong in subscribing message");
        throw error;
    }
    
}

const publishMessage = async (channel, binding_key, message ) => {
    try {
        await channel.assertQueue("REMINDER_QUEUE");
        await channel.publish(EXCHANGE_NAME, binding_key, Buffer.from(message));    
        
    } 
    catch (error) {
        console.log("Something wrong in publish message");
        throw error;
    }
}

module.exports = {
    createChannel,
    subscribeMessage,
    publishMessage
}