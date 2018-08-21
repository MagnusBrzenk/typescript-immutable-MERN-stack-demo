import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import faEdit from "@fortawesome/fontawesome-free-solid/faEdit";
import IFortawesomeProps from "__COMPONENTS/@FortawesomeWrappers/@FortawesomeProps";

export const EditPencil = (props: IFortawesomeProps) => (
    <FontAwesomeIcon //
        icon={faEdit}
        {...props}
    />
);
