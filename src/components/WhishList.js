import React, {Component} from 'react';
import SlideToggle from "react-slide-toggle";


class WhishList extends Component {
    state = {
        whishList: []
    }

    handleClick = () => {
        this.setState({
            whishList: this.props.list
        })
    }


    handleClickListItem = (mealName) => {
        this.props.click("s", mealName, "search")
    }

    render() {
        const whishList = this.state.whishList.map(item => (
            <li key={item.id} className="whish-list-item-container" onClick={() => this.handleClickListItem(item.strMeal)}>
                <div className="whish-list-image">
                    <img src={item.strMealThumb} alt=""/>
                </div>
                <p>{item.strMeal}</p>
            </li>
        ))

        return (
            <div className="whishlist-container">
                <SlideToggle
                    collapsed = {true}
                    render={({ toggle, setCollapsibleElement}) => (
                        <div className="my-collapsible" onClick={this.handleClick}>
                            <button className="my-collapsible__toggle" onClick={toggle}>
                                Whishlist
                            </button>
                            <div className="my-collapsible__content" ref={setCollapsibleElement}>
                                <div className="my-collapsible__content-inner">
                                    <ul className="filter-list">
                                        {whishList}
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

export default WhishList