import { Component } from '@angular/core';
import { Room } from 'src/app/models/Room';
import { NgForm } from '@angular/forms';
import { RoomService } from 'src/app/services/room.service';
import { RoomStatus  } from 'src/app/models/Room';


@Component({
  selector: 'app-housekeeping',
  templateUrl: './housekeeping.component.html',
  styleUrls: ['./housekeeping.component.css']
})
export class HousekeepingComponent {
  room = {} as Room;
  rooms: Room[] = [];

  constructor(private roomService: RoomService) {this.getRooms()}
  //tentando string
  roomStatus = RoomStatus;

  ngOnInit() {
    this.getRooms();
  }

  changeStatus(roomNumber: number, status: RoomStatus) {
    this.roomService.updateRoomStatus(roomNumber, status).subscribe(response => {
    });
  }
  saveRoom(form: NgForm) {
    if (this.room.roomId !== undefined) {
      this.roomService.updateRoom(this.room).subscribe(() => {
        this.cleanForm(form);
      });
    } else {
      this.roomService.saveRoom(this.room).subscribe(() => {
        this.cleanForm(form);
      });
    }
  }

  getRooms() {
    this.roomService.getRooms().subscribe((reservations: Room[]) => {
      this.rooms = reservations;
      console.log(this.room);

    });
  }

  deleteRoom(room: Room) {
    this.roomService.deleteRoom(room).subscribe(() => {
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
