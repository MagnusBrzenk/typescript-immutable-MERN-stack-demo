import { CONTACT } from "__MODELS";

/**
 * Interfaces for objects to be JSON.stringified/parsed and sent/received across networks
 */
export namespace NETWORK {
    //

    export interface IContactsPayload {
        message?: string;
        success: boolean;
        payload: CONTACT.Interface[];
    }

    export interface IFileUploadResponse {
        message?: string;
        success: boolean;
        imageUrls: string[];
    }

    export interface IIdsPayload {
        message?: string;
        success: boolean;
        payload: string[];
    }

    export interface IMessageOnly {
        message: string;
        success: boolean;
    }

    export interface IMiscPayload<TPayload> {
        message?: string;
        success: boolean;
        payload: TPayload;
    }
}
