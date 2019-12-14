import React, {Component} from 'react';
import SlideToggle from "react-slide-toggle";
import { FaArrowDown } from 'react-icons/fa';

class DropDownFilter extends Component {
    constructor(props) {
        super(props);

    }



    handleClick = (e) => {
        const firstSign = this.props.firstSign;
        this.props.click(firstSign, e.target.innerHTML)
    };

    render() {
        const suggestions = this.props.suggestions.map(sug => (

            <li key={sug} onClick={this.handleClick}>
                {sug}
            </li>

        ))


        return (
            <div className="filter-container">
                <SlideToggle
                    collapsed = {true}
                    render={({ toggle, setCollapsibleElement}) => (
                        <div className="my-collapsible">
                            <button className="my-collapsible__toggle" onClick={toggle}>
                                {this.props.title} <FaArrowDown/>
                            </button>
                            <div className="my-collapsible__content" ref={setCollapsibleElement}>
                                <div className="my-collapsible__content-inner">
                                    <ul className="filter-list">
                                        {suggestions}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    )}
                />
            </div>

        )
    }
}

export default DropDownFilter