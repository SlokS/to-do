import React from 'react';
import './post-status-filter.css';

class PostStatusFilter extends React.Component {
    constructor(props) {
        super(props);
        this.buttons = [
            {name: 'all', label: 'Все'},
            {name: 'like', label: 'Понравились'}
        ]
    }

    render() {

        const buttons = this.buttons.map(({name, label}) => {
            const active = this.props.filter === name;
            const classButton = active ? 'btn-info' : 'btn-outline-secondary';
            return (
                <button 
                    key={name} 
                    type="button" 
                    className={`btn ${classButton}`}
                    onClick={() => this.props.onFilterSelect(name)}
                    >{label}</button>
            )
        });

        return(
            <div className="btn-group">
                {buttons}
            </div>
        )
    }
}

export default PostStatusFilter;