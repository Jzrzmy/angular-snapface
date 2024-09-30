import {SnapType} from "./snap-type.type";

export class FaceSnap {

  id: string;

  private _location?: string;
  get location(): string | undefined {
    return this._location;
  }

  set location(value: string) {
    this._location = value;
  }

  constructor(public title: string,
              public description: string,
              public createdDate: Date,
              public imageUrl: string,
              public snaps: number) {
    this.id = crypto.randomUUID().substring(0, 8);
  }

  snap(snapType: SnapType): void {
    switch (snapType) {
      case 'snap':
        this.addSnap();
        break;
      case 'unsnap':
        this.removeSnap();
        break;
    }
  }

  addSnap(): void {
    this.snaps++;
  }

  removeSnap(): void {
    this.snaps--;
  }

  withLocation(location: string): FaceSnap {
    this._location = location;
    return this;
  }
}
