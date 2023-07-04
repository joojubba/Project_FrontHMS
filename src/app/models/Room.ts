export interface Room {
  roomId?: number;
  roomNumber: number;
  roomCapacity: number;
  roomType: string;
  roomAvailable: boolean;
  roomDescription: string;
  status: RoomStatus;
}

export enum RoomStatus{
  VacantClean,
  Blocked,
  OccupiedClean,
  OccupiedDirty,
  VacantDirty,
  NoShow,
  OutOrder,
  OutService,
}
