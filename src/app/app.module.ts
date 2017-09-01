import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {OcrComponent} from './ocr/ocr.component';
import {FormsModule} from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms';
import {ImageUploadModule} from 'angular2-image-upload';
import {ImageCropperComponent, CropperSettings} from 'ng2-img-cropper';

@NgModule({
  declarations: [
    AppComponent,
    OcrComponent,
    ImageCropperComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
