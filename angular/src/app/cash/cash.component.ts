import {Component, Input, OnInit} from '@angular/core';
import {Import} from '@angular/compiler-cli/src/ngtsc/host';

@Component({
  selector: 'cash',
  templateUrl: './cash.component.html',
  styleUrls: ['./cash.component.scss']
})
export class CashComponent implements OnInit {
  @Input() qty: number;
  @Input() valid: boolean;
  private _price: number;

  get price() {
    return this._price;
  }

  set price(price: number) {
    this._price = price;
  }

  get sum() {
    return this.qty * this.price;
  }

  constructor() {
  }

  ngOnInit() {
    this.price = 25;
  }
}
