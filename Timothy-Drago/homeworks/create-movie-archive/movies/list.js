'use strict';

const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies
const dynamoDb = new AWS.DynamoDB.DocumentClient();



module.exports.list = (event, context, callback) => {
  const params = {
    TableName: process.env.MOVIES_TABLE,     
       
  };

  //modifiche start
  console.log(params);
  console.log(event);
  console.log(event.queryStringParameters);

  if (event.queryStringParameters==null ){
    console.log("non ci sono dei parametri da analizzare");
    dynamoDb.scan(params, (error, result) => {
      // handle potential errors
      if (error) {
        console.error(error);
        callback(null, {
          statusCode: error.statusCode || 501,
          headers: { 'Content-Type': 'text/plain' },
          body: 'Couldn\'t fetch the todos.',
        });
        return;
      }
  
  
      // create a response
      const response = {
        statusCode: 200,
        body: JSON.stringify(result.Items),
      };
      callback(null, response);
    });
    
   
  }else {
    console.log("ci sono dei parametri");

    params.Key={
      title: event.queryStringParameter.title
    };


  }
  // modifiche end


  // fetch all todos from the database
  /*
  dynamoDb.scan(params, (error, result) => {
    // handle potential errors
    if (error) {
      console.error(error);
      callback(null, {
        statusCode: error.statusCode || 501,
        headers: { 'Content-Type': 'text/plain' },
        body: 'Couldn\'t fetch the todos.',
      });
      return;
    }


    // create a response
    const response = {
      statusCode: 200,
      body: JSON.stringify(result.Items),
    };
    callback(null, response);
  });*/
};
