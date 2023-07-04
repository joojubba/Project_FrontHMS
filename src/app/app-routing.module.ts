import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
// import { FrontdeskComponent } from './pages/frontdesk/frontdesk.component';
import { ReservationsComponent } from './pages/reservations/reservations.component';
import { HousekeepingComponent } from './pages/housekeeping/housekeeping.component';
import { SetupComponent } from './pages/setup/setup.component';
import { CheckinComponent } from './pages/checkin/checkin.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { HotelguestsComponent } from './pages/hotelguests/hotelguests.component';
import { RoomsComponent } from './pages/rooms/rooms.component';
import { RatesComponent } from './pages/rates/rates.component';
import { CashieringComponent } from './pages/cashiering/cashiering.component';

const routes: Routes = [
  {
    path:"",
     pathMatch:"full",
     redirectTo:"login"
   }
 ,
  {
    path:"login",component: LoginComponent
  },
  {
    path:"home",component: HomeComponent
  },
  {
    path:"reservations",component: ReservationsComponent
  },
  {
    path:"housekeeping",component: HousekeepingComponent
  },
  {
    path:"setup",component: SetupComponent
  },
  {
    path:"checkin",component: CheckinComponent
  },
  {
    path:"checkout",component: CheckoutComponent
  },
  {
    path:"hotelguests",component: HotelguestsComponent
  },
  {
    path:"rooms",component: RoomsComponent
  },
  {
    path:"rates",component: RatesComponent
  },
  {
    path:"cashiering",component: CashieringComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
