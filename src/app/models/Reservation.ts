export interface Reservation {
  reservationId: number;
  arrival: Date;
  departure: Date;
  source: string;
  nights: Number;
  numberGuests: Number;
  reservationAmount: Number;
  reservationStatus: ReservationStatus;
}

export enum ReservationStatus{
  Reserved,
  Cancelled,
  CheckedIn,
  CheckedOut,
  DueOut,
}

