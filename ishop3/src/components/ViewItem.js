import React, { Component } from 'react';

class ViewItem extends Component
{
    render() {
        let item = this.props.selectedItem[0];

        return (
            <div className="item-view">
                <h2>{item.name}</h2>

                <figure className="item-view-body">
                    <img src={item.image} alt="" width="50" />

                    <figcaption>
                        <p>Цена: <strong>{item.price}</strong></p>
                        <p>Кол-во: <strong>{item.qty}</strong></p>
                    </figcaption>
                </figure>
            </div>
        )
    }
}

export default ViewItem;