import React from 'react';
import './app.css';
import AppHeader from '../app-header/app-header';
import SearchPanel from '../search-panel/search-panel';
import PostStatusFilter from '../post-status-filter/post-status-filter';
import PostList from '../post-list/post-list';
import PostAddForm from '../post-add-form/post-add-form';

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [
                {label: 'Apple Apple', important: true, like: false, id: 1},
                {label: 'React', important: true, like: false, id: 2},
                {label: 'HTML CSS', important: false, like: false, id: 3}
            ],
            term: '',
            filter: 'all'
        }
        this.deleteItem = this.deleteItem.bind(this);
        this.addItem = this.addItem.bind(this);
        this.onToggleLiked = this.onToggleLiked.bind(this);
        this.onToggleImportant = this.onToggleImportant.bind(this);
        this.onUpdateSearch = this.onUpdateSearch.bind(this);
        this.onFilterSelect = this.onFilterSelect.bind(this);
        this.maxId = 4;
    }

    searchPost(items, term) {
        if (term.langth === 0) {
            return items
        }

        return items.filter((item) => {
            return item.label.indexOf(term) > -1;  //вернет массив элементов в которых содержится term
        });
    }

    filterPost(items, filter) {
        if (filter === 'like') {
            return items.filter(item => item.like === true);
        } else {
            return items
        }
    }

    onUpdateSearch(term) {
        this.setState({term}); 

    }

    onFilterSelect(filter) {
        this.setState({filter});
    }

    deleteItem(id) {
        this.setState(({data}) => {
            const index = data.findIndex(elem => elem.id === id);
            const newArray = [...data.slice(0, index), ...data.slice(index + 1)];
            return {
                data: newArray,
            }
        });
    }

    addItem(body) {
        const newItem = {
            label: body,
            important: false,
            id: this.maxId++
        }
        this.setState(({data}) => {
            console.log(newItem);
            const newArray = [...data, {label: newItem.label, important: newItem.important, like: false, id: newItem.id}];

            return {
                data: newArray
            }
        })
    }

    onToggleImportant(id) {
        this.setState(({data}) => {
            const index = data.findIndex(elem => elem.id === id);
            
            const old = data[index];
            const newItem = {...old, important: !old.important};

            const newArray = [...data.slice(0, index), newItem, ...data.slice(index + 1)];

            return {
                data: newArray
            }
        })
    }

    onToggleLiked(id) {
        this.setState(({data}) => {
            const index = data.findIndex(elem => elem.id === id);
            
            const old = data[index];
            const newItem = {...old, like: !old.like};

            const newArray = [...data.slice(0, index), newItem, ...data.slice(index + 1)];

            return {
                data: newArray
            }
        })
    }

    render() {

        const {data, term, filter} = this.state;
        const liked = data.filter(item => item.like).length; 
        const allPosts = data.length;

        const visiblePosts = this.filterPost(this.searchPost(data, term), filter);
        
        return(
            <div className="app">
                <AppHeader
                    liked={liked}
                    allPosts={allPosts}
                />
                <div className="search-panel d-flex">
                    <div className="d-flex">
                        <SearchPanel
                            onUpdateSearch={this.onUpdateSearch}
                        />
                        <PostStatusFilter 
                            filter={filter}
                            onFilterSelect={this.onFilterSelect}
                        />
                    </div>      
                    <PostList 
                        posts={visiblePosts}
                        onDelete={this.deleteItem}
                        onToggleImportant={this.onToggleImportant}
                        onToggleLiked={this.onToggleLiked}
                    />
                    <PostAddForm
                        onAdd={this.addItem}
                    />
                </div>
            </div>
            
        )
    }
}

export default App; 