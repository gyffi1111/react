import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

export interface Seats {
    id: number,
    status: boolean;
}

@Component({
    selector: 'hall',
    templateUrl: './hall.component.html',
    styleUrls: ['./hall.component.scss']
})

export class HallComponent implements OnInit {
    form: FormGroup;
    formFullTime: FormGroup;
    status: boolean;
    statusFullTime: boolean;
    qty: number;
    qtyFullTime: number;
    buyTicket: string;
    errorText: boolean;
    private _freeSeat: number;
    private _busySeat: number;
    private _allSeat: number;
    private _pattern: RegExp = /^\d*$/;
    private _seats: Array<Seats>;

    set freeSeat(seat: number) {
        this._freeSeat = seat;
    }

    set busySeat(seat: number) {
        this._busySeat = seat;
    }

    set allSeat(seat: number) {
        this._allSeat = seat;
    }

    set seats(seats: Array<Seats>) {
        this._seats = seats;
    }

    get freeSeat() {
        return this._freeSeat;
    }

    get busySeat() {
        return this._busySeat;
    }

    get allSeat() {
        return this._allSeat;
    }

    get seats(): Array<Seats> {
        return this._seats;
    }

    constructor() {
    }

    ngOnInit() {
        this.errorText = false;
        this.buyTicket = '';
        this.qty = 0;
        this.status = false;
        this.statusFullTime = false;
        this.form = new FormGroup({
            qty: new FormControl(1, [Validators.required, Validators.pattern(this._pattern)])
        });
        this.formFullTime = new FormGroup({
            qtyFullTime: new FormControl(1, [Validators.required, Validators.pattern(this._pattern)])
        });
        this.seats = [
            {
                id: 1,
                status: true,
            },
            {
                id: 2,
                status: true,
            },
            {
                id: 3,
                status: true,
            },
            {
                id: 4,
                status: true,
            },
            {
                id: 5,
                status: true,
            },
            {
                id: 6,
                status: true,
            },
            {
                id: 7,
                status: true,
            },
            {
                id: 8,
                status: true,
            },
            {
                id: 9,
                status: true,
            }
        ];
        this.freeSeat = this.seats.length;
        this.busySeat = 0;
        this.allSeat = this.seats.length;
    }

    pay(): void {
        this.status = false;
        const buyTicketArray = [];
        const results = this.seats.filter((v) => v.status);
        this.qtyFullTime = parseInt(this.formFullTime.controls.qtyFullTime.value);
        if (this.freeSeat >= this.qtyFullTime) {
            this.errorText = false;
            for (let i = 0; i < this.qtyFullTime; i++) {
                results[i].status = false;
                buyTicketArray.push(results[i].id);
            }
            this.freeSeat = this.freeSeat - this.qtyFullTime;
            this.busySeat = this.busySeat + this.qtyFullTime;
            this.buyTicket = buyTicketArray.join(', ');
        } else {
            this.buyTicket = '';
            this.errorText = true;
        }

        this.form.setValue({qty: 1});
        this.qty = 1;
        this.formFullTime.setValue({qtyFullTime: 1});
        this.qtyFullTime = 1;
    }

    payInternet(): void {
        const results = this.seats.filter((v) => v.status);
        const buyTicketArray = [];
        this.qty = parseInt(this.form.controls.qty.value);
        if (results.length >= this.qty) {
            this.errorText = false;
            for (let i = 0; i < this.qty; i++) {
                results[i].status = false;
                buyTicketArray.push(results[i].id);
            }
            this.freeSeat = this.freeSeat - this.qty;
            this.busySeat = this.busySeat + this.qty;
            this.status = true;
            this.buyTicket = buyTicketArray.join(', ');
        } else {
            this.buyTicket = '';
            this.errorText = true;
        }
    }
    change(): void {
        this.statusFullTime = false;
    }
    changeStatus(): void {
        this.status = false;
    }
}
