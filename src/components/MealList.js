import React, {Component} from 'react'
import SlideToggle from "react-slide-toggle"

class MealList extends Component {

    handleClick = (meal) => {
        this.props.click(meal)
    }

    render() {
        const meals = this.props.meals ? this.props.meals.map(meal => (
            <li key={meal.idMeal}>
                <div className="meal-item-content">
                <div className="image-container" style={{backgroundImage: `url(${meal.strMealThumb})`}}></div>
                    <h3 className="meal-title">{meal.strMeal}</h3>
                {/*<img src={meal.strMealThumb} alt=""/>*/}
                <SlideToggle
                    collapsed={true}
                    render={({toggle, setCollapsibleElement}) => (
                        <div className="my-collapsible">
                            {meal.strIngredient1 ?
                                <button className="my-collapsible__toggle" onClick={toggle}>
                                    Read More
                                </button> : ""}
                            <div className="my-collapsible__content" ref={setCollapsibleElement}>
                                <div className="my-collapsible__content-inner">
                                    <div className="meal-description">
                                        <p>{meal.strInstructions}</p>
                                        <p>{meal.strTags}</p>
                                        <p>Main ingredient: {meal.strIngredient1}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                />
                <button className="add-to-wish" onClick={() => {
                    this.handleClick({meal})
                }}> Add to Whishlist
                </button>
                </div>
            </li>
        )) : <p>Meals not found</p>

        return (

            <div className="meals-container">
                <ul>
                    {meals}
                </ul>
            </div>
        )
    }
}

export default MealList