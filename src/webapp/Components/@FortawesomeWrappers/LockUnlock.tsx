import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import faLock from "@fortawesome/fontawesome-free-solid/faLock";
import faUnlock from "@fortawesome/fontawesome-free-solid/faUnlock";
import IFortawesomeProps from "__COMPONENTS/@FortawesomeWrappers/@FortawesomeProps";

interface IMyCustomProps {
    bLocked: boolean;
}

export const LockUnlock = (props: IFortawesomeProps & IMyCustomProps) => {
    const { bLocked, ...fortawesomeProps }: IFortawesomeProps & IMyCustomProps = props;
    return (
        <FontAwesomeIcon //
            icon={!!props.bLocked ? faLock : faUnlock}
            {...fortawesomeProps}
        />
    );
};
