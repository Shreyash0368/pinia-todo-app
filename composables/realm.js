import * as Realm from "realm-web";

export const useRealmApp = () => {
  const runTimeConfig = useRuntimeConfig();
  const appId = runTimeConfig.public.realmAppId;
  const dbName = runTimeConfig.public.dbName;
  const app = new Realm.App(appId);
  let mongo = null;
  

  if (app?.currentUser) {
    mongo = app.currentUser.mongoClient("mongodb-atlas"); 
  }

  const loginApiKey = async () => {
    const apiKey = useRuntimeConfig().public.realmApiKey;
    const credentials = Realm.Credentials.apiKey(apiKey);
    await app.logIn(credentials);   
    return app.currentUser;
  };

  const getRecords = async (colName='todos') => {    
    const collection = mongo.db(dbName).collection(colName);
    const results = await collection.find();

    return results.map((t) => ({ ...t, _id: t._id.toString() }));
  };

  const addRecord = async (message, colName = 'todos') => {
    const collection = mongo.db(dbName).collection(colName);
    const newTask = await collection.insertOne({
      message,
      isFav: false,
    });
    return { _id: newTask.insertedId.toString(), message, isFav: false };
  };

  const deleteRecord = async (id, colName = 'todos') => {
    const collection = mongo.db(dbName).collection(colName);
    console.log(new Realm.BSON.ObjectId(id));
    
    await collection.deleteOne({ _id: new Realm.BSON.ObjectId(id) });
  };

  const updateRecord = async (id, newMessage, colName = 'todos') => {
    const collection = mongo.db(dbName).collection(colName);
    await collection.updateOne(
      { _id: new Realm.BSON.ObjectId(id) },
      {
        $set: { message: newMessage },
      }
    );
  };

  const setFavourite = async (id, flag, colName = 'todos') => {
    const collection = mongo.db(dbName).collection(colName);
    await collection.updateOne(
      { _id: new Realm.BSON.ObjectId(id) },
      {
        $set: { isFav: flag },
      }
    );
  };

  return {
    loginApiKey,
    getRecords,
    addRecord,
    deleteRecord,
    updateRecord,
    setFavourite,
    user: app.currentUser,
  };
};
