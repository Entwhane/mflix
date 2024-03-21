import clientPromise from "../lib/mongodb";
import { ObjectId } from 'mongodb';

const connectToDb  = async () =>  {
    const client = await clientPromise;
    return  client.db("sample_mflix");
}

export const OrmService = {

    connectAndFind: async (dbName) => {
        const db = connectToDb()
        return await (await db).collection(dbName).find({ }).limit(10).toArray();
    },

    connectAndFindOne: async (dbName, id) => {
        const db = connectToDb()
        return await(await db).collection(dbName).findOne({ _id : ObjectId(id) });
    },

    connectAndPostOne: async (dbName, object) => {
        const db = connectToDb()
        return await(await db).collection(dbName).insertOne(object);
    },

    connectAndDeleteOne: async (dbName, id) => {
        const db = connectToDb()
        return await(await db).collection(dbName).deleteOne({ _id : ObjectId(id) });
    },

    connectAndPutOne: async (dbName, id, body) => {
        const db = connectToDb()
        return await(await db).collection(dbName).updateOne({ _id: ObjectId(id) }, { $set: body });
    }

}