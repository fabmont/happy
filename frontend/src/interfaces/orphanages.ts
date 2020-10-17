import Images from "./images";

export default interface Orphanages {
  id: number;
  about: string;
  images: Images[];
  instructions: string;
  latitude: number;
  longitude: number;
  name: string;
  open_on_weekends: boolean;
  opening_hours: string;
}
