import React, {FC} from 'react';
import LoadingOverlayWrapper from "react-loading-overlay-ts";

export const BusyOverlay: FC<{ isBusy: boolean; text?: string }> = (props) => {
    return (
        <LoadingOverlayWrapper
            active={props.isBusy}
            spinner
            text={props.text ?? 'Loading...'}
            styles={{
                wrapper: (base) => ({...base, height: '100%'}),
                overlay: (base) => ({...base, backgroundColor: 'rgba(0,0,0,0.49)', borderRadius: 20}),
                content: (base) => ({...base, color: '#ffffff', fontSize: 13}),
                spinner: (base) => ({
                    ...base, '& svg circle': {
                        stroke: 'rgb(255,255,255)'
                    }
                }),
            }}
        >
            {props.children}
        </LoadingOverlayWrapper>
    );
};
