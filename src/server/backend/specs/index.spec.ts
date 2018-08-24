/// <reference path="../../../common/types/global.d.ts" />

//Test-specific env vars
process.env.DISABLE_DEBUG = "true"; //Crude mechanism to switch off debugging messages
process.env.MONGODB_NAME = "testdb";

//App env vars
import loadEnvVars from "__FUNCTIONS/loadEnvVars";
loadEnvVars();

import * as Mongo from "mongodb";
let db: Mongo.Db;

beforeEach(async () => {
    db = await require("../getMongoDB").getMongoDB();
});
afterEach(() => db.dropDatabase());

//Unit & Integration Tests:
console.log("\n\n>>>>> RUNNING BACKEND TESTS >>>>>\n\n");
require("./persistContacts.spec");
require("./stopPersistingContacts.spec");
