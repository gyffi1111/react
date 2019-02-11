import React, { Component } from 'react';
import Errors from './Errors'

class EditCard extends Component {

    constructor(props) {
        super(props);

        this.state = {
            fields: {...props.item},
            errors: [
                {message: 'Oops!! цифры и буквы', status: false},
                {message: 'Oops!! цифры', status: false},
                {message: 'Oops!! url', status: false},
                {message: 'Oops!!! цифры', status: false}
            ],
            statusSaveBtn: false
        };
    };

    fieldChange = (e, k = null) => {
        let keyItem = e.target.name;
        let valueItem = e.target.value;

        let newItems = {...this.state.fields};

        if (k !== null) {
            newItems[keyItem][k] = valueItem;
        } else {
            newItems[keyItem] = valueItem;
        }

        this.setState({fields: newItems, statusSaveBtn: true}, () => {
            this.checkValidate(keyItem, valueItem);
        });

    };

    checkValidate = (name, value) => {
        let errors = [...this.state.errors];

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
                if (/\-?\d+(\.\d{0,})?/.test(value)) {
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
            return e.status === true;
        });

        if (checkStatusEnableBtn.length > 0) {
            this.setState ({statusSaveBtn: true});
        } else {
            this.setState ({statusSaveBtn: false});
        }

    };

    saveItem = () => {
        let item = {...this.state.fields};

        this.props.updateItem(item);
    };

    cancelSaveBtn = ()=>{
        this.props.cancelSaveBtn();
    };


    render() {
        return (
            <div className='edit-item'>
                <h4>Редактировать {this.state.fields.name}</h4>

                <div className="edit-item-fields">
                    <div className="edit-item-field">
                        ID: {this.state.fields.id}
                    </div>
                    <div className="edit-item-field">
                        Имя
                        <input name='name' defaultValue={this.state.fields.name} onChange={(e) => {this.fieldChange(e)}} />
                        {this.state.errors[0].status !== false ? (<Errors message={this.state.errors[0].message}/>) : null}
                    </div>
                    <div className="edit-item-field">
                        Цена
                        <input name='price' defaultValue={this.state.fields.price} onChange={(e) => {this.fieldChange(e)}} />
                        {this.state.errors[1].status !== false ? (<Errors message={this.state.errors[1].message}/>) : null}
                    </div>
                    <div className="edit-item-field">
                        Фото
                        <input name='image' defaultValue={this.state.fields.image} onChange={(e) => {this.fieldChange(e)}} />
                        {this.state.errors[2].status !== false ? (<Errors message={this.state.errors[2].message}/>) : null}
                    </div>
                    <div className="edit-item-field">
                        Кол-во
                        <input name='qty' defaultValue={this.state.fields.qty} onChange={(e) => {this.fieldChange(e)}} />
                        {this.state.errors[3].status !== false ? (<Errors message={this.state.errors[3].message}/>) : null}
                    </div>

                    <button onClick={this.saveItem} disabled={this.state.statusSaveBtn}>
                        Сохранить
                    </button>

                    <button onClick={this.cancelSaveBtn}>
                        Отмена
                    </button>
                </div>

            </div>


        );
    }
}

export default EditCard;