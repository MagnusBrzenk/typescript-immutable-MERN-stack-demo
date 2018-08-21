import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import faCheck from "@fortawesome/fontawesome-free-solid/faCheck";
import IFortawesomeProps from "__COMPONENTS/@FortawesomeWrappers/@FortawesomeProps";

export const Check = (props: IFortawesomeProps) => (
    <FontAwesomeIcon //
        icon={faCheck}
        {...props}
    />
);
