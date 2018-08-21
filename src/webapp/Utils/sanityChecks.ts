/**
 * Used in reducers to ensure that payloads aren't falsy; allows us to confidently apply `truthy!` assertion operator to  `.payload!`
 * @param matchedAction
 */
export function checkPayload(matchedAction: any) {
    if (!matchedAction.payload && matchedAction.payload !== false && matchedAction.payload !== "")
        throw new Error(
            "Payload received seems to be absent! You haven't wired things up properly!!! \n\n" +
                JSON.stringify(matchedAction) +
                "\n\n"
        );
}
