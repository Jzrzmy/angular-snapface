import {Component, Input, OnInit} from '@angular/core';
import {FaceSnap} from "../models/face-snap";
import {FaceSnapsService} from "../services/face-snaps.service";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {DatePipe, NgClass, NgStyle, UpperCasePipe} from "@angular/common";

@Component({
  selector: 'app-single-face-snap',
  standalone: true,
  imports: [NgStyle, NgClass, UpperCasePipe, DatePipe, RouterLink],
  templateUrl: './single-face-snap.component.html',
  styleUrl: './single-face-snap.component.scss'
})
export class SingleFaceSnapComponent implements OnInit {
  faceSnap!: FaceSnap;
  snapButtonText!: string;
  userHasSnapped!: boolean;

  constructor(private faceSnapsService: FaceSnapsService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {

    const faceSnapId = this.route.snapshot.params['id'];
    this.faceSnap = this.faceSnapsService.getFaceSnap(faceSnapId);

    this.snapButtonText = 'Oh Snap!';
    this.userHasSnapped = false;
  }

  onSnap() {
    if (this.userHasSnapped) {
      this.faceSnapsService.snapById(this.faceSnap.id, 'unsnap');
      this.snapButtonText = 'Oh Snap!';
      this.userHasSnapped = false;
    } else {
      this.faceSnapsService.snapById(this.faceSnap.id, 'snap');
      this.snapButtonText = 'Oops, unSnap!';
      this.userHasSnapped = true;
    }
  }
}
