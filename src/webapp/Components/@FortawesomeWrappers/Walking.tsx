import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import faWalking from "@fortawesome/fontawesome-free-solid/faWalking";
import IFortawesomeProps from "__COMPONENTS/@FortawesomeWrappers/@FortawesomeProps";

export const Walking = (props: IFortawesomeProps) => (
    <FontAwesomeIcon //
        icon={faWalking}
        {...props}
    />
);
