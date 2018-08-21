import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import faUser from "@fortawesome/fontawesome-free-solid/faUser";
import IFortawesomeProps from "__COMPONENTS/@FortawesomeWrappers/@FortawesomeProps";

export const User = (props: IFortawesomeProps) => (
    <FontAwesomeIcon //
        icon={faUser}
        {...props}
    />
);
