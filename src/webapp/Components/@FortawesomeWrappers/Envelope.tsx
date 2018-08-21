import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import faEnvelope from "@fortawesome/fontawesome-free-solid/faEnvelope";
import IFortawesomeProps from "__COMPONENTS/@FortawesomeWrappers/@FortawesomeProps";

export const Envelope = (props: IFortawesomeProps) => (
    <FontAwesomeIcon //
        icon={faEnvelope}
        {...props}
    />
);
