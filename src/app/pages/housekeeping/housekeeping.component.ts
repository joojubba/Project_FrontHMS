import { Component } from '@angular/core';
import { Room } from 'src/app/models/Room';
import { NgForm } from '@angular/forms';
import { RoomStatus  } from 'src/app/models/Room';
import { HotelmanagementService } from 'src/app/services/hotelmanagement.service';


@Component({
  selector: 'app-housekeeping',
  templateUrl: './housekeeping.component.html',
  styleUrls: ['./housekeeping.component.css']
})
export class HousekeepingComponent {
  room = {} as Room;
  rooms: Room[] = [];

  constructor(private hotelmanagementService: HotelmanagementService) {this.getRooms()}

  roomStatus = RoomStatus;

  ngOnInit() {
    this.getRooms();
  }

  changeStatus(roomNumber: number, status: RoomStatus) {
    this.hotelmanagementService.updateRoomStatus(roomNumber, status).subscribe(response => {
    });
  }
  saveRoom(form: NgForm) {
    if (this.room.roomId !== undefined) {
      this.hotelmanagementService.updateRoom(this.room).subscribe(() => {
        this.cleanForm(form);
      });
    } else {
      this.hotelmanagementService.saveRoom(this.room).subscribe(() => {
        this.cleanForm(form);
      });
    }
  }

  getRooms() {
    this.hotelmanagementService.getRooms().subscribe((reservations: Room[]) => {
      this.rooms = reservations;
      console.log(this.room);

    });
  }

  deleteRoom(room: Room) {
    this.hotelmanagementService.deleteRoom(room).subscribe(() => {
      this.getRooms();
    });
  }

  editRoom(room: Room) {
    this.room = { ...room };
  }

  cleanForm(form: NgForm) {
    this.getRooms();
    form.resetForm();
    this.room = {} as Room;
  }
}
