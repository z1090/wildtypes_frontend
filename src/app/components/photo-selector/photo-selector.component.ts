import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef, Input } from '@angular/core';
import { Plugins, Capacitor, CameraSource, CameraResultType } from '@capacitor/core';
import { Platform, ActionSheetController } from '@ionic/angular';


@Component({
  selector: 'app-photo-selector',
  templateUrl: './photo-selector.component.html',
  styleUrls: ['./photo-selector.component.scss'],
})
export class PhotoSelectorComponent implements OnInit {
  @Output() photoPick = new EventEmitter<string | File>();
  @ViewChild('filePicker', { static: false }) filePickerRef: ElementRef<HTMLInputElement>;
  @Input() currentPhoto: string;

  selectedImage: string;
  notMobile = false;

  constructor(private platform: Platform, private actionSheetCtrl: ActionSheetController) { }

  ngOnInit() {
    this.selectedImage = this.currentPhoto;
    if ((this.platform.is('mobile') && !this.platform.is('hybrid')) || this.platform.is('desktop')) {
      this.notMobile = true;
    }
  }

  onPickImage() {
    if (!Capacitor.isPluginAvailable('Camera')) {
      return this.filePickerRef.nativeElement.click();
    } else if (this.notMobile) {
      this.actionSheetCtrl.create({
        buttons: [
          {text: 'Take Photo', handler: () => { this.takePhoto(); }},
          {text: 'Use File', handler: () => { this.filePickerRef.nativeElement.click(); }},
          {text: 'Cancel', role: 'cancel'},
        ]
      }).then(actionEl => {
        actionEl.present();
      });
    } else {
      this.takePhoto();
    }
  }

  private takePhoto() {
    Plugins.Camera.getPhoto({
      quality: 90,
      source: CameraSource.Prompt,
      correctOrientation: true,
      width: 1200,
      resultType: CameraResultType.Base64
    }).then(image => {
      this.selectedImage = 'data:image/jpeg;base64,' + image.base64String;
      this.photoPick.emit(this.selectedImage);
    }).catch(err => {
      // console.log(err);
      // return false;
    });
  }

  onFileChosen(event: Event) {
    const pickedFile = (event.target as HTMLInputElement).files[0];
    if (!pickedFile) {
      return;
    }
    this.toBase64(pickedFile)
      .then((imgString: string) => {
        this.selectedImage = imgString;
        this.photoPick.emit(this.selectedImage);
      });
  }

  toBase64(file: File) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }

}
