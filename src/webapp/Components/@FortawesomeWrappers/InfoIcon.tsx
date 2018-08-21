import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import faInfoIcon from "@fortawesome/fontawesome-free-solid/faInfoCircle";
import IFortawesomeProps from "__COMPONENTS/@FortawesomeWrappers/@FortawesomeProps";

export const InfoIcon = (props: IFortawesomeProps) => (
    <FontAwesomeIcon //
        icon={faInfoIcon}
        {...props}
    />
);
