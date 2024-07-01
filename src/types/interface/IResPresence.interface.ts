import { EDevice } from "../enum/EDevice.enum";
import { EPresenceStatus } from "../enum/EPresenceStatus.enum";
import { IImageUrl } from "./IImageUrl.interface";
import { ILocationPresence } from "./ILocation.interface";

export interface IResPresence {
  guid: string;
  guidUser: string;
  identity: string;
  name: string;
  status: EPresenceStatus;
  guidUnit: string;
  unit: string;
  macDevice: string | null;
  deviceLocation: string | null;
  guidDevicePresence: string | null;
  presenceType: EDevice;
  imageUrl: IImageUrl;
  description: string | null;
  location: ILocationPresence;
  checkIn: string | null;
  checkOut: string | null;
  createdAt: string;
}
