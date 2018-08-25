import express from "express";
import fileUpload from "express-fileupload";
import { streamToAWS } from "__BACKEND/streamToAWS";
import { Readable } from "stream";
import { NETWORK } from "__MODELS";

import { __debug } from "__FUNCTIONS/__debug";
const debug = __debug("HANDLE-UPLOADED-FILES");

/**
 * This function handles form postings with image data and conveys them to AWS S3.
 * It extracts image data buffers from req, converts them to streams, uploads them to S3 bucket,
 * then returns a promised string[] of urls pointing to newly uploaded images.
 * @param req
 */
export async function handleUploadedFiles(req: express.Request): Promise<NETWORK.IFileUploadResponse> {
    try {
        //Extract uploaded file(s) from req and return if empty;
        const reqImageFiles: fileUpload.UploadedFile | false | fileUpload.UploadedFile[] =
            !!req.files && req.files.file;
        if (!reqImageFiles) return { success: false, imageUrls: [] };

        //Make sure we're dealing with an array of fileUpload.UploadedFile's
        const imageFiles: fileUpload.UploadedFile[] = [];
        if (!!Array.isArray(reqImageFiles)) imageFiles.concat(reqImageFiles);
        else imageFiles.push(reqImageFiles);

        //Extract image data buffers from fileUpload.UploadedFile's and stream each one to AWS
        const imageDataBuffers: Buffer[] = imageFiles.map(el => el.data);
        const promisedUploadedImageUrls: Array<Promise<string>> = [];
        imageDataBuffers.forEach(async (imageDataBuffers, ind) => {
            //Create read stream
            const readable = new Readable();
            readable._read = () => ({}); // _read is required but you can no-options ("noop") it
            readable.push(imageDataBuffers);
            readable.push(null);
            //Stream to AWS and add to array of promised urls
            promisedUploadedImageUrls.push(
                streamToAWS({
                    stream: readable,
                    bVerbose: !true
                })
            );
        });
        //Await all promised urls to be returned to middle-tier/client
        const urlNames: string[] = await Promise.all(promisedUploadedImageUrls);
        return { success: !!urlNames.length, imageUrls: urlNames.filter(Boolean) };
    } catch (err) {
        return { success: false, imageUrls: [] };
    }
}
