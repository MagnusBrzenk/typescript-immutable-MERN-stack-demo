import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import faEducation from "@fortawesome/fontawesome-free-solid/faGraduationCap";
import IFortawesomeProps from "__COMPONENTS/@FortawesomeWrappers/@FortawesomeProps";

export const Education = (props: IFortawesomeProps) => (
    <FontAwesomeIcon //
        icon={faEducation}
        {...props}
    />
);
