import * as MongoClient from "mongodb";
let client: MongoClient.MongoClient | undefined;
let db: MongoClient.Db | undefined;

/**
 * async get the db connection
 */
export async function getMongoDB(): Promise<MongoClient.Db> {
    if (!!client && client.isConnected() && !!db) return db;
    if (!client) {
        //Determine connection
        const connectionUri: string =
            process.env.NODE_ENV === "production" ? process.env.MONGODB_REMOTE_URI! : process.env.MONGODB_LOCAL_URI!;

        console.log("connectionUri", connectionUri);

        //Establish client and db connection
        client = await MongoClient.connect(
            connectionUri,
            { useNewUrlParser: true }
        );
        db = client.db("mymerndb");

        //Add listeners to cleanup connection if sth crashes
        const cleanup = () => {
            client!.close();
            db = undefined;
        };
        process.on("exit", cleanup);
        process.on("SIGINT", cleanup);
        process.on("SIGQUIT", cleanup);
        process.on("SIGTERM", cleanup);
        process.on("uncaughtException", cleanup);

        //Create indexes
        const mongoRes: string[] = await Promise.all([
            db.collection("contacts").createIndex({ lastName: 1 }, { collation: { locale: "en", strength: 2 } })
        ]);

        //
        console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
        console.log("MONGODB CONNECTION ESTABLISHED");
        console.log("Mongo Indexes Status: \n" + JSON.stringify(mongoRes));
        console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
    }
    return db!;
}
