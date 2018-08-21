import { NETWORK } from "__MODELS";
import { uploadPseudoData } from "__BACKEND/uploadPseudoData";

import express from "express";
import { fail } from "assert";
const router = express.Router();

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// Protected route to trigger uploading of pseudo data to mongoDB
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
router.get("/admin/loaddata", async (req: express.Request, res: express.Response) => {
    if (req.headers.authorization !== process.env.UPLOAD_PSEUDO_DATA_KEY) {
        const failureResponse: NETWORK.IMessageOnly = {
            message: "You're not authorized to upload pseudodata!",
            success: false
        };
        return res.send(JSON.stringify(failureResponse, null, 2));
    }

    await uploadPseudoData();

    const successResponse: NETWORK.IMessageOnly = {
        message: "Data Uploaded :)",
        success: true
    };
    return res.send(JSON.stringify(successResponse, null, 2));
});

export default router;
