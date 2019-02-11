import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Items from './Items';
import ViewItem from './ViewItem';
import EditItem from './EditItem';
import NewItem from './NewItem';
import './css/Store.css';

class Store extends Component
{
    constructor(props) {
        super(props);
        this.state = {
            items: [...this.props.items],
            selectedItem: null,
            selectedId: null,
            editedItem: null,
            newItem: null
        }
    }

    deleteItem = (id) => {
        let itemList = [...this.state.items];

        itemList = itemList.filter((v) => {
            if (v.id === id) {
                return !window.confirm('Удалить ' + v.name + '?');
            } else {
                return true
            }
        });

        this.setState({items: itemList, editedItem: null});
    };

    editItem = (id) => {
        let items = [...this.state.items];
        let item = items.filter((value) => {
            return value.id === id;
        });

        this.setState({editedItem: item, selectedId: null, selectedItem: null, newItem: false})
    };

    selectItem = (id) => {
        let selectedItem = [...this.state.items].filter((v) => {
            return v.id === id;
        });

        this.setState({selectedId: id, selectedItem: selectedItem, newItem: false})
    };

    newItem = () => {
        this.setState({editedItem: null, selectedId: null, selectedItem: null, newItem: true})
    };

    updateItem = (updateItem) => {
        let newItems = [...this.state.items];

        newItems = newItems.map((e) => {
            if (e.id === updateItem.id) {
                return updateItem;
            } else {
                return e;
            }
        });

        this.setState({items:newItems, editedItem: null});
    };

    addNewItem = (item) => {
        let newItems = [...this.state.items];

        item.id = Math.floor(Math.random() * (2000 - 100)) + 100;
        newItems.push(item);

        this.setState ({items: newItems, statusSaveBtn:false })
    };

    cancelSaveBtn = () => {
        this.setState({editedItem: null, statusSaveBtn: false, newItem: false});
    };

    render() {
        return (
            <div className="items">
                <Items
                    items={this.state.items}
                    deleteItem={this.deleteItem}
                    editItem={this.editItem}
                    selectedId={this.state.selectedId}
                    selectItem={this.selectItem}
                />
                <button onClick={this.newItem}>
                    Добавить товар
                </button>

                {(this.state.selectedId !== null) ? <ViewItem selectedItem={this.state.selectedItem} /> : null}

                {(this.state.editedItem !== null) ? (<EditItem updateItem={this.updateItem} cancelSaveBtn={this.cancelSaveBtn} item={{...this.state.editedItem[0]}} />) : null}

                {(this.state.newItem === true) ? (<NewItem cancelSaveBtn={this.cancelSaveBtn} addNewItem={this.addNewItem}/>) : null}
            </div>
        );
    }
}

Store.propTypes = {
    items: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
            image: PropTypes.string.isRequired,
            price: PropTypes.number.isRequired,
            qty: PropTypes.number.isRequired
        })
    ),
};

export default Store;