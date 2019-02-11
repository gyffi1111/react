import React, { Component } from 'react';
import Item from './Item'

class Items extends Component
{
    render() {
        let items = [...this.props.items].map((value) => {
           return (
               <Item
                   key={value.id}
                   item={value}
                   deleteItem={this.props.deleteItem}
                   editItem={this.props.editItem}
                   selectedId={this.props.selectedId}
                   selectItem={this.props.selectItem}
               />
           );
        });

        return (
            <div className="table">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Название</th>
                            <th>Цена</th>
                            <th>Изображение</th>
                            <th>Количество</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {items}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Items;