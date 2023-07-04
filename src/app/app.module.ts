import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './pages/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ReservationsComponent } from './pages/reservations/reservations.component';
import { SetupComponent } from './pages/setup/setup.component';
import { HousekeepingComponent } from './pages/housekeeping/housekeeping.component';
import { CheckinComponent } from './pages/checkin/checkin.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { HotelguestsComponent } from './pages/hotelguests/hotelguests.component';
import { FormsModule } from '@angular/forms';
import { RoomsComponent } from './pages/rooms/rooms.component';
import { RoomService } from './services/room.service';
import { CommonModule } from '@angular/common';
import { ModalModule } from 'ngx-bootstrap/modal';
import { RatesComponent } from './pages/rates/rates.component';
import { MatDialogModule } from '@angular/material/dialog';
import { CashieringComponent } from './pages/cashiering/cashiering.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    NavbarComponent,
    ReservationsComponent,
    SetupComponent,
    HousekeepingComponent,
    CheckinComponent,
    CheckoutComponent,
    HotelguestsComponent,
    RoomsComponent,
    RatesComponent,
    CashieringComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    CommonModule,
    ModalModule.forRoot(),
    MatDialogModule,
  ],
  providers: [HttpClientModule, RoomService],
  bootstrap: [AppComponent]
})
export class AppModule { }
