import { Component} from '@angular/core';
import { Room } from 'src/app/models/Room';
import { NgForm } from '@angular/forms';
import { HotelmanagementService } from 'src/app/services/hotelmanagement.service';


@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent{
  room = {} as Room;
  rooms: Room[] = [];

  constructor(private hotelmanagementService: HotelmanagementService) {this.getRooms()}

  ngOnInit() {
    this.getRooms();
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
    this.hotelmanagementService.getRooms().subscribe((rooms: Room[]) => {
      this.rooms = rooms;
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
