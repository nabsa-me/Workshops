export const handler = async (event:any) => {
  // let's log the incoming event
  let payloadAsString = JSON.stringify(event);
  console.log(payloadAsString);
  try{
      // event contains Records, which is an array with a certain structure
      for(let i=0;i<event.Records.length;i++) {
          //let's get the Record
          let record = event.Records[i];
          // let's decode the base64-encoded payload that was sent
          let data = Buffer.from(record.kinesis.data,'base64').toString('utf-8');
          // let's show the data
          console.log(`Data received: ${data}`);
          // let's show the timestamp in which it was received (approximately)
          let receivedTst = new Date(record.kinesis.approximateArrivalTimestamp*1000);
          console.log(`Received tst: ${receivedTst}`);
      }
      const response = {
        statusCode: 200,
        body: JSON.stringify({})
      }
      return response
  } catch(e) {
      //let's handle the errors, if any
      console.log("Error:",e);
      const response = {
          statusCode : 500,
          body : JSON.stringify(e)
      };
      return response;
  }
};
