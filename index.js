'use strict';

const peopleModel = require('./schema.js');

exports.handler = async (event) => {
  try {
    const body = JSON.parse(event.body);
    const { name, phone } = body;
    
    //get id number from request parameters
    const id = event.queryStringParameters && event.queryStringParameters.id;    

    //create new info to update record with and id to find it
    const update = {
      id: id,
      name: body.name,
      phone: body.phone
    }

    //updats record in database
    const data = await peopleModel.update(update);

    //return proper status code and copy of updated record
    return {
      statuscode: 201,
      body: JSON.stringify(data)
    }

  } catch (e) {
    return {
      statuscode: 500,
      body: e.message
    }
  }
};
