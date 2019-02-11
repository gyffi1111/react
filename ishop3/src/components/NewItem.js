import React, { Component } from 'react';
import Errors from './Errors'

class NewItem extends Component
{
    state = {
        fields: {
            name: null,
            price: null,
            image: null,
            qty: null
        },
        errors: [
            {message: 'Oops!! цифры и буквы', status: true},
            {message: 'Oops!! цифры', status: true},
            {message: 'Oops!! url', status: true},
            {message: 'Oops!!! цифры', status: true}
        ],
        statusSaveBtn: true
    };

    fieldChange = (e, k = null) => {
        let keyItem = e.target.name;
        let valueItem = e.target.value;

        let newItems = {...this.state.fields}

        if (k !== null) {
            newItems[keyItem][k] = valueItem;
        } else {
            newItems[keyItem] = valueItem;
        }

        this.setState({fields: newItems, statusSaveBtn: true}, () => {
            this.checkValidate(keyItem, valueItem)
        });

    };


    checkValidate = (name, value) => {
        let errors = [...this.state.errors]

        switch (name) {
            case 'name':
                if (/^[а-яА-ЯёЁa-zA-Z0-9\s]+$/.test(value)) {
                    errors[0].status = false;
                    this.setState({errors: errors})
                } else {
                    errors[0].status = true;
                    this.setState({errors: errors})
                }
                break;
            case 'price':
                if (/^\d+$/.test(value)) {
                    errors[1].status = false;
                    this.setState({errors: errors})
                } else {
                    errors[1].status = true;
                    this.setState({errors: errors})
                }
                break;
            case 'image':
                if (/[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi.test(value)) {
                    errors[2].status = false;
                    this.setState({errors: errors})
                } else {
                    errors[2].status = true;
                    this.setState({errors: errors})
                }
                break;
            case 'qty':
                if (/^\d+$/.test(value)) {
                    errors[3].status = false;
                    this.setState({errors: errors})
                } else {
                    errors[3].status = true;
                    this.setState({errors: errors})
                }
                break;
            default:
                break;
        }

        this.checkStatusEnableBtn();
    };

    checkStatusEnableBtn = () => {
        let errors = [...this.state.errors];
        let checkStatusEnableBtn = errors.filter ((e) => {
            return e.status === true
        });

        if (checkStatusEnableBtn.length > 0) {
            this.setState ({statusSaveBtn: true});
        } else {
            this.setState ({statusSaveBtn: false});
        }

    };

    render() {
        return (
            <div className='create-item'>
                <h4>Добавить продукт</h4>

                <div className="create-item-fields">
                    <div className="create-item-field">
                        Имя
                        <input name='name' onChange={(e) => {this.fieldChange(e)}} />
                        {(this.state.errors[0].status === true) ? (<Errors message={this.state.errors[0].message}/>): null}
                    </div>
                    <div className="create-item-field">
                        Цена
                        <input name='price' onChange={(e) => {this.fieldChange(e)}} />
                        {(this.state.errors[1].status === true) ? (<Errors message={this.state.errors[1].message}/>): null}
                    </div>
                    <div className="create-item-field">
                        Фото
                        <input name='image' onChange={(e) => {this.fieldChange(e)}}/>
                        {(this.state.errors[2].status === true) ? (<Errors message={this.state.errors[2].message}/>): null}
                    </div>
                    <div className="create-item-field">
                        Кол-во
                        <input name='qty' onChange={(e) => {this.fieldChange(e)}}/>
                        {(this.state.errors[3].status === true) ? (<Errors message={this.state.errors[3].message}/>): null}
                    </div>

                    <button
                        disabled={this.state.statusSaveBtn}
                        onClick={() => {this.props.addNewItem({...this.state.fields})}}
                    >
                        Сохранить
                    </button>

                    <button
                        onClick={this.props.cancelSaveBtn}
                    >Отмена</button>
                </div>
            </div>
        );
    }
}

export default NewItem;