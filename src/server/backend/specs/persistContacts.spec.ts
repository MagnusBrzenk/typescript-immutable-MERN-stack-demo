import { CONTACT } from "__MODELS";
import { persistContacts } from "../persistContacts";
import { getMongoDB } from "../getMongoDB";
import { expect } from "chai";

describe("Persisting a contact", () => {
    it("with the CONTACT.Default does persist the contact", async () => {
        //Setup attempted success
        const newContact: any = { ...CONTACT.Demo };
        await persistContacts([newContact]);
        //Test for success
        const actual = await (await getMongoDB())
            .collection("contacts")
            .find({ _id: newContact._id })
            .toArray();
        expect(actual).to.eql([newContact]);
    });
    it("with a non-string-email field does NOT persist the contact", async () => {
        //Setup attempted mistake
        const newContact: any = CONTACT.Demo;
        newContact.email = 3;
        await persistContacts([newContact]);
        //Test for mistake
        let actual;
        try {
            actual = await (await getMongoDB())
                .collection("contacts")
                .find({ _id: newContact._id })
                .toArray();
        } catch (err) {
            actual = [];
        }
        expect(actual).to.not.eql([newContact]);
    });
});
