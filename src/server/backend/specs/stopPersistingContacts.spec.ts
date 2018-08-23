import { CONTACT } from "__MODELS";
import { persistContacts } from "__BACKEND/persistContacts";
import { stopPersistingContacts } from "__BACKEND/stopPersistingContacts";
import { getMongoDB } from "__BACKEND/getMongoDB";
import { expect } from "chai";

describe("Stop persisting a contact", () => {
    it("with the CONTACT.Default does stop persisting the contact", async () => {
        //Setup attempted success
        const newContact: any = { ...CONTACT.Demo };
        await persistContacts([newContact]);
        await stopPersistingContacts([newContact]);
        //Test for success
        const actual = await (await getMongoDB())
            .collection("contacts")
            .find({ _id: newContact._id })
            .toArray();
        expect(actual).to.eql([]);
    });
});
