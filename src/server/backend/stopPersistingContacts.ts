import { getMongoDB } from "__BACKEND/getMongoDB";
import { BulkWriteOpResultObject } from "mongodb";
import { __debug } from "__FUNCTIONS/__debug";
const debug = __debug("PERSIST-CONTACTS");

/**
 * Receive contact _ids, delete corresponding contacts, return array of succesfully deleted contactIds
 */
export async function stopPersistingContacts(contactIds: string[]): Promise<string[]> {
    //

    //Create array of bulk writes:
    const bulkWrites: any = contactIds.map(el => ({
        deleteOne: { filter: { _id: el } }
    }));

    //Write to DB; if successful, return validatedContacts
    try {
        const db = await getMongoDB();
        const res: BulkWriteOpResultObject = await db.collection("contacts").bulkWrite(bulkWrites, { ordered: false });
        if (res.result.ok === 1) return contactIds;
    } catch (err) {
        debug(err);
    }
    return [];
}
