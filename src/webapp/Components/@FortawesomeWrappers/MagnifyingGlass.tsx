import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import faSearch from "@fortawesome/fontawesome-free-solid/faSearch";
import IFortawesomeProps from "__COMPONENTS/@FortawesomeWrappers/@FortawesomeProps";

export const MagnifyingGlass = (props: IFortawesomeProps) => (
    <FontAwesomeIcon //
        icon={faSearch}
        {...props}
    />
);
