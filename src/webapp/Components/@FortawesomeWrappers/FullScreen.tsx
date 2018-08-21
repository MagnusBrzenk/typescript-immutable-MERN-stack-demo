import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import faArrowsAlt from "@fortawesome/fontawesome-free-solid/faArrowsAlt";
import IFortawesomeProps from "__COMPONENTS/@FortawesomeWrappers/@FortawesomeProps";

export const FullScreen = (props: IFortawesomeProps) => (
    <FontAwesomeIcon //
        icon={faArrowsAlt}
        {...props}
    />
);
