import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import faCoffee from "@fortawesome/fontawesome-free-solid/faCoffee";
import IFortawesomeProps from "__COMPONENTS/@FortawesomeWrappers/@FortawesomeProps";

export const Coffee = (props: IFortawesomeProps) => (
    <FontAwesomeIcon //
        icon={faCoffee}
        {...props}
    />
);
