import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import faTimes from "@fortawesome/fontawesome-free-solid/faTimes";
import IFortawesomeProps from "__COMPONENTS/@FortawesomeWrappers/@FortawesomeProps";

export const CloseWindowIcon = (props: IFortawesomeProps) => (
    <FontAwesomeIcon //
        icon={faTimes}
        {...props}
    />
);
