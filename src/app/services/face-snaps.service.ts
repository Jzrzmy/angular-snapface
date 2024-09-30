import {Injectable} from "@angular/core";
import {FaceSnap} from "../models/face-snap";
import {SnapType} from "../models/snap-type.type";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FaceSnapsService {

  private _faceSnaps: FaceSnap[] = [
    new FaceSnap(
      'Maya',
      "C'est le premier snap",
      new Date(),
      'https://cdn.pixabay.com/photo/2015/05/31/16/03/teddy-bear-792273_1280.jpg',
      0),
    new FaceSnap(
      'Archibald',
      'Mon meilleur ami depuis toujours.',
      new Date(),
      'https://cdn.pixabay.com/photo/2015/05/31/16/03/teddy-bear-792273_1280.jpg',
      10).withLocation('Lieu inconnu'),
    new FaceSnap(
      'Jana',
      "C'est le dernier.",
      new Date(),
      'https://cdn.pixabay.com/photo/2015/05/31/16/03/teddy-bear-792273_1280.jpg',
      100)
  ];
  get faceSnaps(): FaceSnap[] {
    return [...this._faceSnaps];
  }

  getFaceSnap(faceSnapId: string): FaceSnap {
    const faceSnap = this._faceSnaps.find(fs => fs.id === faceSnapId);
    if (!faceSnap) {
      throw new Error(`No snap found with id ${faceSnapId}`);
    }
    return faceSnap;
  }

  snapById(id: string, snapType: SnapType): void {
    const faceSnap = this.getFaceSnap(id);
    faceSnap.snap(snapType);
  }

  addFaceSnap(title: string, description: string, imageUrl: string, location?: string | undefined): void {
    const faceSnap = new FaceSnap(
      title,
      description,
      new Date(),
      imageUrl,
      0
    );
    if (location != null) {
      faceSnap.location = location;
    }

    let number = this._faceSnaps.push(faceSnap);
  }
}
