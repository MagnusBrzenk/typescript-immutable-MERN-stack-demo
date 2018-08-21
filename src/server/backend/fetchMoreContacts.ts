import { getMongoDB } from "__BACKEND/getMongoDB";
import { CONTACT } from "__MODELS";
import { feedChunkSize } from "__CONSTANTS";

/**
 * Get the section of contacts ordered by lastName specified by integer feedchunk
 * @param feedchunk
 */
export async function fetchMoreContacts(feedchunk: number): Promise<CONTACT.Interface[]> {
    //
    const db = await getMongoDB();
    const contactsChunk: CONTACT.Interface[] = await db
        .collection("contacts")
        .find({})
        .collation({ locale: "en", strength: 2 }) //Makes search case-insensitive -- collation must match created index
        .sort({ lastName: 1 }) //Order by lastName by default
        .skip(feedchunk * feedChunkSize)
        .limit(feedChunkSize)
        .toArray();

    const validatedContacts: CONTACT.Interface[] = CONTACT.validate(contactsChunk);
    return validatedContacts;
}
