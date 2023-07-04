import { Component} from '@angular/core';
import { FormGroup,FormControl  } from '@angular/forms';
import { Room } from 'src/app/models/Room';
import { NgForm } from '@angular/forms';
import { RoomService } from 'src/app/services/room.service';


@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent{
  room = {} as Room;
  rooms: Room[] = [];

  constructor(private roomService: RoomService) {this.getRooms()}

  ngOnInit() {
    this.getRooms();
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
    this.roomService.getRooms().subscribe((rooms: Room[]) => {
      this.rooms = rooms;
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
