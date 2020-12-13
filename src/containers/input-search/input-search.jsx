import React from 'react';
import './input-search.css';

export const InputSearch = (props) => {
    return (
        <div className="form_group field">
            <input 
                onChange={props.handleChange}
                type="input" 
                placeholder="Start typing search keyword"
                className="form_field" 
                name="searchKeyword" 
                id='name' 
                autoComplete="off"
                value={props.value}
                autoFocus
                required 
            />
        </div>
    )
}
