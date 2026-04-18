import {getDB} from '../db/index.js'

export async function testAddMessage(){
  try{
    const db = await getDB();
    const collection = db.collection('ConversationHistory');

    const result = await collection.insertOne({
    role: "user",
    content: "test"
  });
  } catch(e) {
    console.log(e);
  }
}

export async function testGetHistory(){
  try{
    const db = await getDB();
    const collection = db.collection('ConversationHistory');

    const result = await collection.find().toArray();
    console.log(result);
    return await result;
    // console.log(result);
  } catch(e) {
    console.log(e);
  }
}


