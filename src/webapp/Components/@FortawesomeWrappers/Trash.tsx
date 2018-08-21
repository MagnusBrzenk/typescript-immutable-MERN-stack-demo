import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import faGlobe from "@fortawesome/fontawesome-free-solid/faTrash";
import IFortawesomeProps from "__COMPONENTS/@FortawesomeWrappers/@FortawesomeProps";

export const Trash = (props: IFortawesomeProps) => {
    return (
        <FontAwesomeIcon //
            icon={faGlobe}
            {...props}
        />
    );
};
