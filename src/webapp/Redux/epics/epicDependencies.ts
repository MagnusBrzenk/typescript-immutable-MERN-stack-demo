import { CONTACT, NETWORK } from "__MODELS";
import { __debug } from "__FUNCTIONS/__debug";
const debug = __debug("EPIC-DEP");

/**
 * Object containing functions used within epics to fetch resources
 */
export const epicDependencies = {
    fetchFeedChunk: async (feedchunk: number, authorizedApiKey: string): Promise<CONTACT.Interface[]> => {
        try {
            return await fetch(`/api/fetchmorecontacts?feedchunk=${feedchunk}`, {
                headers: { Authorization: authorizedApiKey }
            }).then(async res => {
                const networkPackage: NETWORK.IContactsPayload = await res.json();
                if (res.status >= 200 && res.status < 300) {
                    return CONTACT.validate(networkPackage.payload);
                } else {
                    throw new Error();
                }
            });
        } catch (err) {
            debug(err);
            return [];
        }
    },
    persistContacts: async (
        contactsToPersist: CONTACT.Interface[],
        authorizedApiKey: string
    ): Promise<CONTACT.Interface[]> => {
        try {
            return await fetch(`/api/persistcontacts`, {
                method: "POST",
                body: JSON.stringify(contactsToPersist),
                headers: {
                    "Content-Type": "application/json",
                    Authorization: authorizedApiKey
                } //Fetch won't add this automatically, and express will cry without it!
            }).then(async res => {
                const networkPackage: NETWORK.IContactsPayload = await res.json(); // there's always a body
                if (res.status >= 200 && res.status < 300) {
                    return CONTACT.validate(networkPackage.payload);
                } else {
                    throw new Error();
                }
            });
        } catch (err) {
            debug(err);
            return [];
        }
    },
    stopPersistingContacts: async (contactIdsToDelete: string[], authorizedApiKey: string): Promise<string[]> => {
        try {
            return await fetch(`/api/stoppersistingcontacts`, {
                method: "POST",
                body: JSON.stringify(contactIdsToDelete),
                headers: {
                    "Content-Type": "application/json",
                    Authorization: authorizedApiKey
                }
            }).then(async res => {
                const networkPackage: NETWORK.IIdsPayload = await res.json();
                if (res.status >= 200 && res.status < 300) {
                    const deletedIds: string[] = networkPackage.payload;
                    return deletedIds;
                } else {
                    throw new Error();
                }
            });
        } catch (err) {
            debug(err);
            return [];
        }
    },
    authenticateSimply: async (password: string, authorizedApiKey: string): Promise<string> => {
        try {
            return await fetch(`/api/authenticatesimply?password=${password}`, {
                headers: {
                    Authorization: authorizedApiKey
                }
            }).then(async res => {
                const networkPackage: NETWORK.IMiscPayload<string> = await res.json();
                if (res.status >= 200 && res.status < 300) {
                    const apiKey: string = networkPackage.payload;
                    return apiKey;
                } else {
                    throw new Error();
                }
            });
        } catch (err) {
            debug(err);
            return "";
        }
    }
};
