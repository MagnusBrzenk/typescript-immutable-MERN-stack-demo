import { CONTACT, COUNTRYCODE } from "__MODELS";
import { countryCodes } from "__CONSTANTS";
import mockCsvData from "__RESOURCES/data/MOCK_CONTACT_DATA.csv";

/**
 * CSV loader will pull in columns as an array of objects with the CSV-column headings as keys
 * In this case, our mockaroo data will show up in this format
 */
interface IMockData {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    imageUrl: string;
    mobile: string;
    home: string;
    country: string;
}

/**
 * Load in mock data derived from https://mockaroo.com and map it to CONTACT.Interface format
 */
export const demoContactfeedData: CONTACT.Interface[] = mockCsvData
    .map(
        (el: IMockData, ind: number): CONTACT.Interface => ({
            _id: el.id + "",
            firstName: el.firstName,
            lastName: el.lastName,
            email: el.email,
            bActive: ind % 2 === 0,
            phoneNumbers: [
                {
                    countryCode: {
                        code: countryCodes[(el.country as any) as COUNTRYCODE.CName],
                        name: el.country as any
                    },
                    dialNumber: el.home,
                    phoneType: "home"
                },
                {
                    countryCode: {
                        code: countryCodes[(el.country as any) as COUNTRYCODE.CName],
                        name: el.country as any
                    },
                    dialNumber: el.mobile,
                    phoneType: "mobile"
                }
            ],
            creationDate: new Date().toDateString(),
            // imageUrl: `https://picsum.photos/300/300/?image=${ind}`
            // imageUrl: 'http://i.imgur.com/' + Math.random().toString(36).substr(2, 6) + '.png'
            imageUrl: `http://graph.facebook.com/v2.5/${getRandomInt()}/picture?height=500&height=500`
        })
    )
    .filter((el: any, ind: any) => ind < 1001);

function getRandomInt() {
    return Math.floor(Math.random() * (10000 - 5)) + 4;
}
