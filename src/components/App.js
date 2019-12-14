import React, {Component} from 'react';
import './App.css';
import MealList from './MealList'
import DropDownFilter from "./DropDownFilter";
import WhishList from "./WhishList";
import FilterPlaceholder from "./FilterPlaceholder";


class App extends Component {

    state = {
        meals: [],
        categoriesMeals: [],
        areaMeals: [],
        activeFilter: "",
        whishList: [],
        addedToWhishList: false
    }

    handleDataFetch = (filterSign, filterName, apiKey) => {
        const apiFilterKey = filterSign ? `https://www.themealdb.com/api/json/v1/1/list.php?${filterSign}=list`
            : apiKey;

        const name = filterName;

        fetch(apiFilterKey)
            .then(response => {
                if (response.ok) {
                    return response
                }
                throw Error(response.status)
            })
            .then(response => response.json())
            .then(data => {
                if (data.meals !== null) {
                    this.setState({
                        [name]: data.meals
                    })
                } else {
                    this.setState({
                        [name]: false
                    })
                }
            })
            .catch(error => console.log(error))
    }

    searchMealsByName = (e) => {
        const inputValueApi = `https://www.themealdb.com/api/json/v1/1/search.php?s=${e.target.value}`;

        this.setState({
            activeFilter: ""
        })

        if (e.target.value.length !== 0) {
            this.handleDataFetch(false, "meals", inputValueApi)
        } else {
            this.handleDataFetch(false, "meals");
        }

    }

    appStart = () => {
        this.handleDataFetch(false, "meals", "https://www.themealdb.com/api/json/v2/9973533/latest.php");
        this.handleDataFetch("c", "categoriesMeals");
        this.handleDataFetch("a", "areaMeals")
    }

    handleDropDownFilter = (targetSign, targetName, apiActionKey = "filter") => {
        const apiKey = `https://www.themealdb.com/api/json/v1/1/${apiActionKey}.php?${targetSign}=${targetName}`;
        this.setState({
            activeFilter: targetName
        })
        this.handleDataFetch(false, "meals", apiKey);
    }

    addToWishList = (meal) => {
        const mealProperties = {
            strMeal: meal.meal.strMeal,
            strMealThumb: meal.meal.strMealThumb
        };

        const currentMealsOnWhishList = [];

        this.state.whishList.forEach(item =>
            currentMealsOnWhishList.push(item.strMeal)
        );

        const isMealInWhishList = currentMealsOnWhishList.includes(`${mealProperties.strMeal}`)

        if (!isMealInWhishList) {
            this.setState(state => {
                state.whishList.push(mealProperties);
            })
        }

        this.setState({
            addedToWhishList: true
        })
    };

    componentDidMount() {
        this.appStart();
    }

    render() {
        const meals = this.state.meals;

        const categories = [];
        this.state.categoriesMeals.forEach(category => categories.push(category.strCategory));

        const areas = [];
        this.state.areaMeals.forEach(area => areas.push(area.strArea));

        return (
            <div className="App">
                <h1>Find Your Meal</h1>
                <div className="app-container">
                    <div className="navigation">
                        <input type="text" placeholder="search for the meal" className="input-navigation" onChange={this.searchMealsByName}/>
                        <WhishList
                            list={this.state.whishList}
                            click={this.handleDropDownFilter}
                        />
                    </div>
                    <div className="homepage-bottom">
                        <div className="categorySearchInput">
                            <DropDownFilter
                                title="Choose category"
                                suggestions={categories}
                                click={this.handleDropDownFilter}
                                firstSign="c"
                            />
                            <DropDownFilter
                                title="Choose area"
                                suggestions={areas}
                                click={this.handleDropDownFilter}
                                firstSign="a"
                            />
                            <FilterPlaceholder activeFilter={this.state.activeFilter}/>
                        </div>
                        <MealList
                            meals={meals}
                            click={this.addToWishList}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
