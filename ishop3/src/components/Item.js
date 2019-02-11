import React, { Component } from 'react';

class Item extends Component
{
    deleteItem = (e) => {
        e.stopPropagation();

        this.props.deleteItem(this.props.item.id);
    };

    editItem = (e)=>{
        e.stopPropagation();

        this.props.editItem(this.props.item.id)
    };

    render() {
        return (
            <tr
                onClick={() => {this.props.selectItem(this.props.item.id)}}
                className={(this.props.selectedId === this.props.item.id) ? 'selected' : ''}
            >
                <td>{this.props.item.id}</td>
                <td>{this.props.item.name}</td>
                <td>{this.props.item.price}</td>
                <td>
                    <img src={this.props.item.image} alt="" width="50" />
                </td>
                <td>{this.props.item.qty}</td>
                <td>
                    <button onClick={this.editItem}>Редактировать</button>
                    <button onClick={this.deleteItem}>Удалить</button>
                </td>
            </tr>
        );
    }
}

export default Item;