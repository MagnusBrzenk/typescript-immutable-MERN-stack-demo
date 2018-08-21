import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import faCheck from "@fortawesome/fontawesome-free-solid/faCheck";
import faTimes from "@fortawesome/fontawesome-free-solid/faTimes";
import IFortawesomeProps from "__COMPONENTS/@FortawesomeWrappers/@FortawesomeProps";

interface IMyCustomProps {
    bChecked: boolean;
}

export const CheckUncheck = (props: IFortawesomeProps & IMyCustomProps) => {
    const { bChecked, ...fortawesomeProps }: IFortawesomeProps & IMyCustomProps = props;
    return (
        <FontAwesomeIcon //
            icon={bChecked ? faCheck : faTimes}
            {...fortawesomeProps}
        />
    );
};
