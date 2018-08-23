import * as dotenv from "dotenv";
dotenv.config({ path: ".env" });

if (!!process.env.DISABLE_DEBUG) delete process.env.DEBUG;
import { __debug } from "__FUNCTIONS/__debug";
const debug = __debug("ENV-CHECKER");

/**
 * Load and confirm existence of backend environment variables
 */
export default function loadEnvVars(disableDebug = false) {
    if (!process.env.UPLOAD_PSEUDO_DATA_KEY) {
        debug("UPLOAD_PSEUDO_DATA_KEY NOT DEFINED!!!");
        process.exit(0);
    }
    if (!process.env.AWS_ACCESS_KEY_ID) {
        debug("AWS_ACCESS_KEY_ID NOT DEFINED!!!");
        // process.exit(0);
    }
    if (!process.env.AWS_SECRET_ACCESS_KEY) {
        debug("AWS_SECRET_ACCESS_KEY NOT DEFINED!!!");
        // process.exit(0);
    }
    if (!process.env.S3_BUCKET_NAME) {
        debug("S3_BUCKET_NAME NOT DEFINED!!!");
        // process.exit(0);
    }
    if (!process.env.MONGODB_LOCAL_URI) {
        debug("MONGODB_LOCAL_URI NOT DEFINED!!!");
        process.exit(0);
    }
    if (!process.env.MONGODB_REMOTE_URI) {
        debug("MONGODB_REMOTE_URI NOT DEFINED!!!");
        process.exit(0);
    }
    if (!process.env.AUTHORIZED_API_KEY) {
        debug("AUTHORIZED_API_KEY NOT DEFINED!!!");
        process.exit(0);
    }
    if (!process.env.SIMPLE_AUTH_PASSWORDS) {
        debug("SIMPLE_AUTH_PASSWORDS NOT DEFINED!!!");
        process.exit(0);
    }
}
