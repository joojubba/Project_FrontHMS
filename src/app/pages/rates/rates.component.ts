import { Component } from '@angular/core';
import { Rate } from 'src/app/models/Rate';
import { NgForm } from '@angular/forms';
import { RateService } from 'src/app/services/rate.service';

@Component({
  selector: 'app-rates',
  templateUrl: './rates.component.html',
  styleUrls: ['./rates.component.css']
})
export class RatesComponent {

  rate = {} as Rate;
  rates: Rate[] = [];

  constructor(private rateService: RateService) {}

  ngOnInit() {
    this.getRates();
  }
  saveRate(form: NgForm) {
    if (this.rate.rateId !== undefined) {
      this.rateService.updateRate(this.rate).subscribe(() => {
        this.cleanForm(form);
      });
    } else {
      this.rateService.saveRate(this.rate).subscribe(() => {
        this.cleanForm(form);
      });
    }
  }

  getRates() {
    this.rateService.getRates().subscribe((rates: Rate[]) => {
      this.rates = rates;
    });
  }

  deleteRate(rate: Rate) {
    this.rateService.deleteRate(rate).subscribe(() => {
      this.getRates();
    });
  }

  editRate(rate: Rate) {
    this.rate = { ...rate };
  }

  cleanForm(form: NgForm) {
    this.getRates();
    form.resetForm();
    this.rate = {} as Rate;
  }
}
