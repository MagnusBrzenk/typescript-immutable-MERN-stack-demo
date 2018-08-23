import * as Mongo from "mongodb";
const MongoClient = Mongo.MongoClient;

console.log(">>>>>>>>>>>>>>>> WORKING >>>>>>>>>>>>>>>>>");

let db: Mongo.Db;
const DISAPPEARING_MESSAGE =
    "collection or index disappeared when cursor yielded: OperationFailed: Operation aborted because: collection going away";

process.on("unhandledRejection", function(reason, p) {
    // There's a lot of asynchrony going on in the test code. Sometimes its best to leave
    // early. If that happens, then we ignore those errors.
    if (reason.name === "MongoError" && reason.message === DISAPPEARING_MESSAGE) {
        return;
    } else {
        console.error("Possibly Unhandled Rejection at: Promise ", p, " reason: ", reason);
    }
});

beforeEach(async () => {
    db = await require("../getMongoDB").getMongoDB();
});

afterEach(() => db.dropDatabase());

// require("./set-core-info.spec");
// // require("./post-metrics.spec");
// require("./comment.spec");
// require("./upmark-post.spec");
// require("./report-post.spec");
// require("./upmark-comment.spec");
// require("./reactions-for-posts.spec");
// require("./promote-user.spec");
// require("./fuzzer.spec");
// require("./search-links.spec");
// require("./delete-post.spec");
require("./persistContacts.spec");
// require("./search.spec");
// require("./query-feeds.spec");
// // require("./get-geo-stats.spec");
// require("./get-facebook-filter.spec");
// require("./get-request-coordinates.spec");
// require("./toggle-pin-post.spec");
// require("./toggle-pinned-feed.spec");
// require("./is-user.spec");
// require("./persist-tags.spec");
// require("./populate-friends.spec");
// require("./delete-topic.spec");
