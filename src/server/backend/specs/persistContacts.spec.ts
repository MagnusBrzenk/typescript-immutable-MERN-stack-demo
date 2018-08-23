// import { ObjectID } from "mongodb";
// import persistPost from "../persist-post";
// import deletePost from "../delete-post";
// import { queryPosts } from "../query-posts";
// import { getDb } from "../../lib/mongo-client";
// import * as UpmarkError from "../../lib/UpmarkError";
// import { Post } from "../schemas";
// import setCoreInfo from "../set-core-info";
// import getTopics from "../get-topics";
// import { REACTION_TEMPLATES } from "../../shared-constants";
// import * as expect from "expect";
// import { omit } from "lodash";

import { persistContacts } from "../persistContacts";
import { getMongoDB } from "../getMongoDB";
import { expect } from "chai";

describe("Creating a contact", () => {
    const postCreator = "post-creator";
    const scraper = "scraper";
    //   it("as a scraper allows for extra fields to be assigned", async () => {
    //     await setCoreInfo(scraper, { displayName: scraper, birthYear: 1970, male: false }, [scraper]);
    //     const postToCreate = {
    //       _id: new ObjectID(1010110),
    //       imageUrl: "imageUrl",
    //       pinned: true,
    //       upmarks: 1337,
    //       title: "My cool post",
    //       timestamp: new Date(1000000),
    //       topics: ["test"],
    //       responseOptions: [{ label: "Option 0" }, { label: "Option 1" }, { label: "Option 2" }],
    //       hotness: 23,
    //       reported: true
    //     };
    //     const post: Post = await persistPost(postToCreate, scraper, true, true);
    //     const db = await getDb();
    //     const actual = await db.collection("posts").findOne({ _id: postToCreate._id });
    //     expect(actual.imageUrl).toBeTruthy("There was no attempt at a placeholder URL");
    //     expect(actual.timestamp).toEqual(postToCreate.timestamp);
    //     expect(actual.pinned).toEqual(postToCreate.pinned);
    //     expect(actual.upmarks).toEqual(postToCreate.upmarks);
    //     // No one should be able to write certain fields
    //     expect(actual.hotness).toNotEqual(postToCreate.hotness);
    //     expect(actual.reported).toNotEqual(postToCreate.reported);
    //   });

    //   it("as a non-scraper, extra fields are not assigned", async () => {
    //     await setCoreInfo(postCreator, { displayName: scraper, birthYear: 1970, male: false }, []);
    //     const postToCreate = {
    //       _id: new ObjectID(1010110),
    //       imageUrl: "imageUrl",
    //       pinned: true,
    //       upmarks: 1337,
    //       title: "My cool post",
    //       timestamp: new Date(),
    //       topics: ["test"],
    //       responseOptions: [{ label: "Option 0" }, { label: "Option 1" }, { label: "Option 2" }],
    //       hotness: 23,
    //       reported: true
    //     };
    //     const post: Post = await persistPost(postToCreate, postCreator, true, true);
    //     const db = await getDb();
    //     const actual = await db.collection("posts").findOne({ _id: post._id });

    //     expect(actual.imageUrl).toBeTruthy("There was no attempt at a placeholder URL");

    //     expect(actual._id).toNotEqual(postToCreate._id);
    //     expect(actual.timestamp).toNotEqual(postToCreate.timestamp);
    //     expect(actual.pinned).toNotEqual(postToCreate.pinned);
    //     expect(actual.upmarks).toNotEqual(postToCreate.upmarks);
    //     // No one should be able to write certain fields
    //     expect(actual.hotness).toNotEqual(postToCreate.hotness);
    //     expect(actual.reported).toNotEqual(postToCreate.reported);
    //   });
    //   it("with a valid template and response option set is successful", async () => {
    //     await setCoreInfo(postCreator, { displayName: scraper, birthYear: 1970, male: false }, []);
    //     const template = REACTION_TEMPLATES[0];
    //     const postToCreate = {
    //       imageUrl: "imageUrl",
    //       title: "My cool post",
    //       timestamp: new Date(),
    //       topics: ["test"],
    //       template: template.topicLabel,
    //       responseOptions: template.reactions.map(label => ({ label }))
    //     };

    //     const post: Post = await persistPost(postToCreate, postCreator, true, true);
    //     const db = await getDb();
    //     const actual = await db.collection("posts").findOne({ _id: post._id });

    //     expect(actual).toBeTruthy();
    //   });
    it("with an invalid model does not persist the contact", async () => {
        // await setCoreInfo(postCreator, { displayName: scraper, birthYear: 1970, male: false }, []);

        const newContact: any = {
            _id: "XXX",
            firstName: 3,
            imageUrl: "imageUrl"
        };

        // const template = REACTION_TEMPLATES[0];
        // const postToCreate = {
        //     imageUrl: "imageUrl",
        //     title: "My cool post",
        //     timestamp: new Date(),
        //     topics: ["test"],
        //     template: template.topicLabel + "invalid",
        //     responseOptions: template.reactions.map(label => ({ label }))
        // };

        // const post: Post = await persistPost(postToCreate, postCreator, true, true);

        const contacts = await persistContacts([newContact]);

        const db = await getMongoDB();
        const actual = await db.collection("contacts").findOne({ _id: newContact._id });
        expect(actual.template).to.equal("");
    });
    // it("with a valid template and invalid response option set fails (extra options)", async () => {
    //     await setCoreInfo(postCreator, { displayName: scraper, birthYear: 1970, male: false }, []);
    //     const template = REACTION_TEMPLATES[0];
    //     const postToCreate = {
    //         imageUrl: "imageUrl",
    //         title: "My cool post",
    //         timestamp: new Date(),
    //         topics: ["test"],
    //         template: template.topicLabel,
    //         responseOptions: template.reactions.map(label => ({ label })).concat({ label: "invalid-label" })
    //     };

    //     try {
    //         const post: Post = await persistPost(postToCreate, postCreator, true, true);
    //         throw Error("The post was not supposed to persist correctly");
    //     } catch (e) {
    //         expect(e.message).toEqual(UpmarkError.INVALID_TEMPLATE_RESPONSE_OPTION(template.topicLabel).message);
    //     }
    // });
    // it("with a valid template and invalid response option set fails (too few options)", async () => {
    //     await setCoreInfo(postCreator, { displayName: scraper, birthYear: 1970, male: false }, []);
    //     const template = REACTION_TEMPLATES[0];
    //     const postToCreate = {
    //         imageUrl: "imageUrl",
    //         title: "My cool post",
    //         timestamp: new Date(),
    //         topics: ["test"],
    //         template: template.topicLabel,
    //         responseOptions: template.reactions.map(label => ({ label })).slice(0, -1)
    //     };

    //     try {
    //         const post: Post = await persistPost(postToCreate, postCreator, true, true);
    //         throw Error("The post was not supposed to persist correctly");
    //     } catch (e) {
    //         expect(e.message).toEqual(UpmarkError.INVALID_TEMPLATE_RESPONSE_OPTION(template.topicLabel).message);
    //     }
    // });
    // it("with a valid template and invalid response option set fails (mangled options)", async () => {
    //     await setCoreInfo(postCreator, { displayName: scraper, birthYear: 1970, male: false }, []);
    //     const template = REACTION_TEMPLATES[0];
    //     const postToCreate = {
    //         imageUrl: "imageUrl",
    //         title: "My cool post",
    //         timestamp: new Date(),
    //         topics: ["test"],
    //         template: template.topicLabel,
    //         responseOptions: template.reactions.map(label => ({ label: label + "invalid" }))
    //     };

    //     try {
    //         const post: Post = await persistPost(postToCreate, postCreator, true, true);
    //         throw Error("The post was not supposed to persist correctly");
    //     } catch (e) {
    //         expect(e.message).toEqual(UpmarkError.INVALID_TEMPLATE_RESPONSE_OPTION(template.topicLabel).message);
    //     }
    // });
    // it("without media, it fails", async () => {
    //     await setCoreInfo(postCreator, { displayName: scraper, birthYear: 1970, male: false }, []);
    //     const template = REACTION_TEMPLATES[0];
    //     const postToCreate = {
    //         title: "My cool post",
    //         timestamp: new Date(),
    //         topics: ["test"],
    //         template: template.topicLabel,
    //         responseOptions: template.reactions.map(label => ({ label }))
    //     };

    //     try {
    //         const post: Post = await persistPost(postToCreate, postCreator, true, true);
    //         throw Error("The post was not supposed to persist correctly");
    //     } catch (e) {
    //         expect(e.message).toEqual(UpmarkError.NO_POST_MEDIA().message);
    //     }
    // });
});
