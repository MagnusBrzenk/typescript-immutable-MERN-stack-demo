import * as React from "react";

import {
    FaSymbol,
    FlipProp,
    IconProp,
    PullProp,
    RotateProp,
    SizeProp,
    Transform
} from "@fortawesome/fontawesome-svg-core";

export default interface IFortawesomeProps {
    //Fontawesome Non-primitives
    symbol?: FaSymbol;
    flip?: FlipProp;
    icon?: IconProp;
    mask?: IconProp;
    pull?: PullProp;
    rotation?: RotateProp;
    size?: SizeProp;
    transform?: Transform | string;
    //Other non-primitives
    style?: React.CSSProperties;
    //Primitives
    className?: string;
    color?: string;
    spin?: boolean;
    pulse?: boolean;
    border?: boolean;
    fixedWidth?: boolean;
    inverse?: boolean;
    listItem?: boolean;
}
