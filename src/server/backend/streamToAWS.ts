import s3Stream from "s3-upload-stream";
import * as zlib from "zlib";
import * as AWS from "aws-sdk";
import uuid from "uuid/v4";
import { Readable } from "stream";

interface IArgs {
    stream: Readable;
    filename?: string;
    s3Bucket?: string;
    bVerbose?: boolean;
}

/**
 * Promise wrapper around s3Stream.upload
 */
export async function streamToAWS({
    stream,
    filename = "contact-demo-image-upload-" + uuid(),
    s3Bucket = process.env.AWS_S3_BUCKET_NAME,
    bVerbose = false
}: IArgs): Promise<string> {
    /////////////////////////////////////////////////////////
    const promise: Promise<string> = new Promise(resolve => {
        /////////////////////////////////////////////////////

        //Check S3_BUCKET_NAME is non-falsy:
        if (!s3Bucket) resolve("");

        //Determine content type from filename:
        let contentType = "image/png";
        if (filename.toLowerCase().includes(".svg")) contentType = "image/svg+xml";
        if (filename.toLowerCase().includes(".jpeg")) contentType = "image/jpeg";
        if (filename.toLowerCase().includes(".jpg")) contentType = "image/jpeg";
        if (filename.toLowerCase().includes(".gif")) contentType = "image/gif";
        if (filename.toLowerCase().includes(".json")) contentType = "application/json";

        if (!!bVerbose) console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
        if (!!bVerbose) console.log("S3 Bucket:", s3Bucket);
        if (!!bVerbose) console.log("Filename:", filename);
        if (!!bVerbose) console.log("ContentType:", contentType);

        //Create upload-stream object:
        const upload = s3Stream(new AWS.S3()).upload({
            Bucket: s3Bucket!,
            Key: filename,
            ContentType: contentType,
            ContentEncoding: "gzip",
            ACL: "public-read"
        });

        // Optional configuration
        upload.maxPartSize(20971520); // 20 MB
        upload.concurrentParts(5);
        // Handle errors
        upload.on("part", function(details: any) {
            if (!!bVerbose) console.log("Uploading...");
            if (!!bVerbose) console.log(details);
        });
        upload.on("error", function(error: Error) {
            if (!!bVerbose) console.log("<><><> OH NO! Error! <><><>");
            if (!!bVerbose) console.log(error);
            resolve("UPLOAD-FAILED");
        });
        upload.on("uploaded", function(details: any) {
            // //Example details object:
            // {
            //     Location: 'https://dwdshapefinderimages.s3.amazonaws.com/test8.png',
            //     Bucket: 'shapefinderimages',
            //     Key: 'test8.png',
            //     ETag: '"56df55e245387ab3d2796f945e2cdfc9-1"'
            // }
            const url: string = details.Location;
            if (!!bVerbose) console.log("Completing streamToAWS: " + filename);
            if (!!bVerbose) console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
            resolve(url);
        });

        //Begin piping to AWS:
        const compress = zlib.createGzip();
        stream.pipe(compress).pipe(upload);
    });
    return promise;
}
