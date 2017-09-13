import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {OcrComponent} from './ocr/ocr.component';
import {FormsModule} from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms';
import {ImageUploadModule} from 'angular2-image-upload';
import {HttpClientModule} from '@angular/common/http';
import {OcrService} from './ocr.service';

@NgModule({
  declarations: [
    AppComponent,
    OcrComponent,
  ],
  imports: [
    ImageUploadModule.forRoot(),
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    OcrService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
