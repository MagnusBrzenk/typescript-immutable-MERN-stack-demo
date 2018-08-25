import { getMongoDB } from "__BACKEND/getMongoDB";
import { getDemoContactfeedData } from "__BACKEND/demoContactfeedData";
import { CONTACT } from "__MODELS";

/**
 * Just reads in pseudo data and inserts them into DB (after checking that a filed of that _id doesnt already exist)
 */
export async function uploadPseudoData(): Promise<void> {
    const db = await getMongoDB();

    //Validate format of pseudoData and filter out erroneous ones
    const validatedPseudoData: CONTACT.Interface[] = CONTACT.validate(await getDemoContactfeedData());

    //Note: projection field within .find() is deprecated -- must use `cursor.project()`
    const existingIds = (await db
        .collection("contacts")
        .find({})
        .project({ _id: 1 })
        .toArray()).map(el => el._id);
    const notUploadedPseudoData: CONTACT.Interface[] = validatedPseudoData.filter(el => !existingIds.includes(el._id));

    if (!!notUploadedPseudoData.length) {
        const res = await db.collection("contacts").insertMany(notUploadedPseudoData);
        console.log("Upload result: ", res);
    } else {
        console.log("All pseudo data already uploaded");
    }
}
