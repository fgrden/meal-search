import React from 'react'

const FilterPlaceholder = (props) => {
    return (
        <div className="filter-placeholder">
            {props.activeFilter ? <h3>Active Filter:</h3> : ""}
            <p>{props.activeFilter}</p>
        </div>
    )
}

export default FilterPlaceholder