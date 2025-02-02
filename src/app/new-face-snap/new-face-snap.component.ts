import {Component} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {map, Observable} from "rxjs";
import {FaceSnap} from "../models/face-snap";
import {AsyncPipe, DatePipe, NgIf, UpperCasePipe} from "@angular/common";
import {FaceSnapsService} from "../services/face-snaps.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-new-face-snap',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    AsyncPipe,
    UpperCasePipe,
    DatePipe,
    NgIf
  ],
  templateUrl: './new-face-snap.component.html',
  styleUrl: './new-face-snap.component.scss'
})
export class NewFaceSnapComponent {

  snapForm!: FormGroup;
  faceSnapPreview$!: Observable<FaceSnap>;
  urlRegex!: RegExp;

  constructor(private formBuilder: FormBuilder,
              private snapFacesService: FaceSnapsService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.urlRegex = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&/=]*)/;
    this.snapForm = this.formBuilder.group({
        title: [null, [Validators.required]],
        description: [null, [Validators.required]],
        imageUrl: [null, [Validators.required], [Validators.pattern(this.urlRegex)]],
        location: [null]
      },
      {
        updateOn: 'blur'
      })
    this.faceSnapPreview$ = this.snapForm.valueChanges.pipe(
      map(formValue => ({
        ...formValue,
        createdDate: new Date(),
        snaps: 0,
        id: 0
      }))
    );
  }

  onSubmitForm(): void {
    const title = this.snapForm.value.title;
    const description = this.snapForm.value.description;
    const imageUrl = this.snapForm.value.imageUrl;
    const location = this.snapForm.value.location;
    this.snapFacesService.addFaceSnap(title, description, imageUrl, location);
    this.router.navigateByUrl('/facesnaps')
  }
}
