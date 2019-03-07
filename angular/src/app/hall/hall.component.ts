import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

export interface Seats {
    status: boolean;
}

@Component({
    selector: 'hall',
    templateUrl: './hall.component.html',
    styleUrls: ['./hall.component.scss']
})

export class HallComponent implements OnInit {
    form: FormGroup;
    status: boolean;
    qty: number;
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
        this.qty = 0;
        this.status = false;
        this.form = new FormGroup({
            qty: new FormControl(1, [Validators.required, Validators.pattern(this._pattern)])
        });
        this.seats = [
            {
                status: true,
            },
            {
                status: true,
            },
            {
                status: true,
            },
            {
                status: true,
            },
            {
                status: true,
            },
            {
                status: true,
            },
            {
                status: true,
            },
            {
                status: true,
            },
            {
                status: true,
            }
        ];
        this.freeSeat = this.seats.length;
        this.busySeat = 0;
        this.allSeat = this.seats.length;
    }

    pay(): void {
        const results = this.seats.filter((v) => v.status);
        if (results.length > 0) {
            results[0].status = false;
        }
        if (this.freeSeat > 0) {
            this.freeSeat--;
            this.busySeat++;
        }

        this.form.setValue({qty: 1});
        this.qty = 1;
    }

    payInternet(): void {
        const results = this.seats.filter((v) => v.status);
        this.qty = parseInt(this.form.controls.qty.value);
        if (results.length >= this.qty) {
            for (let i = 0; i < this.qty; i++) {
                results[i].status = false;
            }
            this.freeSeat = this.freeSeat - this.qty;
            this.busySeat = this.busySeat + this.qty;
            this.status = true;
        }
    }

    changeStatus(): void {
        this.status = false;
    }
}
