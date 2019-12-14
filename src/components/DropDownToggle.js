import React from 'react'
import SlideToggle from "react-slide-toggle"

const DropdownToggle = (props) => {

    return (


        <SlideToggle
            collapsed = {true}
            render={({ toggle, setCollapsibleElement}) => (
                <div className="my-collapsible">
                        <button className="my-collapsible__toggle" onClick={toggle}>
                            {props.title}
                        </button> : ""}
                    <div className="my-collapsible__content" ref={setCollapsibleElement}>
                        <div className="my-collapsible__content-inner">
                            {props.contain}
                        </div>
                    </div>
                </div>
            )}
        />
    )
}

export default DropdownToggle