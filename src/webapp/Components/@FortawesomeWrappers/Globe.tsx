import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import faGlobe from "@fortawesome/fontawesome-free-solid/faGlobe";
import IFortawesomeProps from "__COMPONENTS/@FortawesomeWrappers/@FortawesomeProps";

interface IMyCustomProps {
    bSpin?: boolean;
}

export const Globe = (props: IFortawesomeProps & IMyCustomProps) => {
    const { bSpin = false, ...fortawesomeProps }: IFortawesomeProps & IMyCustomProps = props;
    return (
        <FontAwesomeIcon //
            icon={faGlobe}
            spin={bSpin}
            {...fortawesomeProps}
        />
    );
};
