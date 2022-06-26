import React, {FC} from "react";


const SectionFrame: FC<{ title: string }> = (params) => {
    return (<div className="col-md text-light section-frame">
        <div className="title-bar-bg">
            <h5 className="p-2 text-center main-titles">{params.title}</h5>
        </div>
        <div className="px-5 pb-4 pt-5 booking-form">
            <div className="mb-3">
                {params.children}
            </div>
        </div>
    </div>);
}

export default SectionFrame;

