import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import faRocket from "@fortawesome/fontawesome-free-solid/faRocket";
import IFortawesomeProps from "__COMPONENTS/@FortawesomeWrappers/@FortawesomeProps";

export const Rocket = (props: IFortawesomeProps) => (
    <FontAwesomeIcon //
        icon={faRocket}
        {...props}
    />
);
