import { CONTACT, NETWORK } from "__MODELS";
import { handleUploadedFiles } from "__BACKEND/handleUploadedFiles";
import { fetchMoreContacts } from "__BACKEND/fetchMoreContacts";
import { stopPersistingContacts } from "__BACKEND/stopPersistingContacts";
import { persistContacts } from "__BACKEND/persistContacts";

import express from "express";
const router = express.Router();

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// Route to 'authenticate' /api/* calls in a super-simple manner
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
router.get(`/api/authenticatesimply`, async (req: express.Request, res: express.Response) => {
    //Extract password from get url
    const passwordsSubmitted: string[] = [].concat(req.query.password);
    const passwordSubmitted: string = !!passwordsSubmitted.length ? passwordsSubmitted[0] : "";
    //If password param not found, then return empty payload
    const failedResponseObject = {
        message: "Simple Authorization NOT Succesful",
        success: false,
        payload: ""
    };
    if (!passwordSubmitted) return res.send(failedResponseObject);

    //If password is included in SIMPLE_AUTH_PASSWORDS array then return AUTHORIZED_API_KEY for future /api/* calls
    const bIsAuthorized: boolean =
        !!process.env.SIMPLE_AUTH_PASSWORDS && process.env.SIMPLE_AUTH_PASSWORDS.includes(passwordSubmitted);
    const responseObject: NETWORK.IMiscPayload<string> = !!bIsAuthorized
        ? {
              message: "Simple Authorization Succesful",
              success: true,
              payload: process.env.AUTHORIZED_API_KEY!
          }
        : failedResponseObject;
    return res.send(responseObject);
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// Block /api/* calls that don't have AUTHORIZED_API_KEY in their headers
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
router.use("/api/*", (req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^");
    console.log("API ROUTE: ", req.originalUrl);
    console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\n\n");

    if (req.headers.authorization !== process.env.AUTHORIZED_API_KEY) {
        return res.json({
            message: "Simple Authorization NOT Succesful",
            success: false,
            payload: ""
        });
    }

    return next();
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// Route to parse form-file data, upload to AWS S3, return new urls
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
router.post("/api/uploadimages", async (req: express.Request, res: express.Response) => {
    const responseObject: NETWORK.IFileUploadResponse = await handleUploadedFiles(req);
    return res.json(responseObject);
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// Route to fetch sequential chunks of the contacts feed ordered by lastName
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
router.get(`/api/fetchmorecontacts`, async (req: express.Request, res: express.Response) => {
    //Extract feedchunks from get url
    const feedchunks: string[] = [].concat(req.query.feedchunk);
    const feedchunk: number = !!feedchunks.length ? parseInt(feedchunks[0], 10) : -1;

    //If feedchunk param not found, then return nothing
    const failedResponseObject: NETWORK.IContactsPayload = {
        message: "Fetching of posts failed for some reason :(",
        success: false,
        payload: []
    };
    if (feedchunk === -1) return res.send(failedResponseObject);

    //Fetch the next chunk of the feed:
    const fetchedContacts: CONTACT.Interface[] = await fetchMoreContacts(feedchunk);

    //Return those contacts succesfully persisted
    const responseObject: NETWORK.IContactsPayload = !!fetchedContacts.length
        ? {
              message: "The following posts were fetched at the backend",
              success: true,
              payload: fetchedContacts
          }
        : failedResponseObject;
    return res.send(responseObject);
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// Route to update/create contacts
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
router.post(`/api/persistcontacts`, async (req: express.Request, res: express.Response) => {
    //Extract and validate contacts
    const expectedContacts = req.body;
    const validatedContacts: CONTACT.Interface[] = CONTACT.validate(expectedContacts);

    if (!validatedContacts.length) {
        const emptyResponseObject: NETWORK.IContactsPayload = {
            message: "POST request contained no contacts :(",
            success: false,
            payload: []
        };
        return res.send(emptyResponseObject);
    }

    //Persist contacts to DB
    const persistedContacts: CONTACT.Interface[] = await persistContacts(validatedContacts);

    //Return those contacts succesfully persisted
    const responseObject: NETWORK.IMiscPayload<CONTACT.Interface[]> = !!persistedContacts.length
        ? {
              message: "The following posts were persisted",
              success: true,
              payload: persistedContacts
          }
        : {
              message: "Persisting of posts failed for some reason :(",
              success: false,
              payload: []
          };
    return res.send(responseObject);
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// Route to stop persisting (i.e. delete from db) contacts
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
router.post(`/api/stoppersistingcontacts`, async (req: express.Request, res: express.Response) => {
    //Extract and verify ids of contacts to be deleted
    const receivedContactIds = req.body;
    if (!receivedContactIds.length) {
        const responseObject: NETWORK.IIdsPayload = {
            message: "POST request contained no contactIds :(",
            success: false,
            payload: []
        };
        return res.send(responseObject);
    }
    //Delete contacts to DB
    const deletedContacts: string[] = await stopPersistingContacts(receivedContactIds);

    //Return those contacts succesfully persisted
    const responseObject: NETWORK.IIdsPayload = !!deletedContacts.length
        ? {
              message: "The following posts were deleted",
              success: true,
              payload: deletedContacts
          }
        : {
              message: "Deletion of posts failed for some reason :(",
              success: false,
              payload: []
          };
    return res.send(responseObject);
});

export default router;
