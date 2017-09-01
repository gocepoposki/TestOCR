import {ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import * as Tesseract from 'tesseract.js';
import {FileHolder} from "angular2-image-upload/lib/image-upload/image-upload.component";
import * as smartcrop from '../../../node_modules/smartcrop/smartcrop.js';
import {ImageCropperComponent, CropperSettings, Bounds} from 'ng2-img-cropper';
// import fs from 'fs';
// import Canvas from 'canvas';


// import 'rxjs/add/observable/of';

@Component({
  selector: 'app-ocr',
  templateUrl: './ocr.component.html',
  styleUrls: ['./ocr.component.css']
})
export class OcrComponent implements OnInit {
  constructor(private cdRef: ChangeDetectorRef) {
    this.cropperSettings = new CropperSettings();
    this.cropperSettings.width = 100;
    this.cropperSettings.height = 100;
    this.cropperSettings.croppedWidth =100;
    this.cropperSettings.croppedHeight = 100;
    this.cropperSettings.canvasWidth = 400;
    this.cropperSettings.canvasHeight = 300;

    this.data = {};


    this.name = 'Angular2'
    this.cropperSettings1 = new CropperSettings();
    this.cropperSettings1.width = 500;
    this.cropperSettings1.height = 500;

    this.cropperSettings1.croppedWidth = 1000;
    this.cropperSettings1.croppedHeight = 1000;

    this.cropperSettings1.canvasWidth = 500;
    this.cropperSettings1.canvasHeight = 300;

    this.cropperSettings1.minWidth = 1;
    this.cropperSettings1.minHeight = 1;

    this.cropperSettings1.rounded = false;
    this.cropperSettings1.keepAspect = true;

    this.cropperSettings1.cropperDrawSettings.strokeColor = 'rgba(255,255,255,1)';
    this.cropperSettings1.cropperDrawSettings.strokeWidth = 2;

    this.data1 = {};
  }
  data: any;
  cropperSettings: CropperSettings;

  name:string;
  data1:any;
  cropperSettings1:CropperSettings;
  croppedWidth:number;
  croppedHeight:number;


  status: any;
  recognizedText: any;
  prepoznavanje: any;
  url: any;
  levelNum: string;
  img;
  podatoci;
  x: number;
  y: number;
  w: number;
  h: number;


  selectLanguage() {
    this.levelNum = this.levelNum;
    console.log(this.levelNum);
  }

  languages: Array<Object> = [
    {lang: 'eng', name: "English"},
    {lang: 'mkd', name: "Macedonian"},
    {lang: 'bul', name: "Bulgarian"},
    {lang: 'afr', name: "Afrikaans"},
    {lang: 'enm', name: "English (Old)"},
    {lang: 'epo', name: "Esperanto"},
    {lang: 'srp', name: "Serbian (Latin)"},
  ];


  @ViewChild('scannedImg') private scannedImg: ElementRef;
  @ViewChild('myCanvas') private myCanvas: ElementRef;
  public context: CanvasRenderingContext2D;
  @ViewChild('cropper', undefined) cropper:ImageCropperComponent;

  ngOnInit() {
  }

  cropped(bounds:Bounds) {
    this.croppedHeight =bounds.bottom-bounds.top;
    this.croppedWidth = bounds.right-bounds.left;
  }

  fileChangeListener($event) {
    var image:any = new Image();
    var file:File = $event.target.files[0];
    var myReader:FileReader = new FileReader();
    var that = this;
    myReader.onloadend = function (loadEvent:any) {
      image.src = loadEvent.target.result;
      that.cropper.setImage(image);

    };

    myReader.readAsDataURL(file);
  }


  test() {
    smartcrop.crop('../../assets/mak.jpg', {width: 100, height: 100}, result =>
      console.log(result)
    );
  }

  testCanvas() {
    var canvas: HTMLCanvasElement = <HTMLCanvasElement> document.getElementById('myCanvas');
    var ctx: CanvasRenderingContext2D = canvas.getContext("2d");
    this.img = document.getElementById("scream");
    // {width: 441, height: 175}
    smartcrop.crop(this.img, {width: 250, height: 250, minScale: 0.5, ruleOfThirds: true}, result => {
      this.podatoci = result.topCrop;
      this.x = result.topCrop.x;
      this.y = result.topCrop.y
      this.w = result.topCrop.width
      this.h = result.topCrop.height
      console.log(this.podatoci, 'podatoci');
      ctx.canvas.width  = this.w;
      ctx.canvas.height = this.h;
      ctx.drawImage(this.img,
        this.x, this.y,
        this.w, this.h,
        0, 0,
        this.w, this.h
      )
      this.url = canvas.toDataURL();
    })
  }
  testCanvas1() {
    var canvas: HTMLCanvasElement = <HTMLCanvasElement> document.getElementById('myCanvas');
    var ctx: CanvasRenderingContext2D = canvas.getContext("2d");
    this.img = document.getElementById("scream");
    // {width: 440, height: 170}
    smartcrop.crop(this.img, {width: 381, height: 192, minScale: 0.5,}, result => {
      this.podatoci = result.topCrop;
      this.x = result.topCrop.x;
      this.y = result.topCrop.y
      this.w = result.topCrop.width
      this.h = result.topCrop.height
      console.log(this.podatoci, 'podatoci');
      ctx.canvas.width  = this.w;
      ctx.canvas.height = this.h;
      ctx.drawImage(this.img,
        this.x, this.y,
        this.w, this.h,
        0, 0,
        this.w, this.h
      )
      this.url = canvas.toDataURL();
    })
  }
  testCanvas2() {
    var canvas: HTMLCanvasElement = <HTMLCanvasElement> document.getElementById('myCanvas');
    var ctx: CanvasRenderingContext2D = canvas.getContext("2d");
    this.img = document.getElementById("scream");
    // {width: 440, height: 170}
    smartcrop.crop(this.img, {width: 250, height: 250, minScale: 0.5}, result => {
      this.podatoci = result.topCrop;
      this.x = result.topCrop.x;
      this.y = result.topCrop.y
      this.w = result.topCrop.width
      this.h = result.topCrop.height
      console.log(this.podatoci, 'podatoci');
      ctx.canvas.width  = this.w;
      ctx.canvas.height = this.h;
      ctx.drawImage(this.img,
        this.x, this.y,
        this.w, this.h,
        0, 0,
        this.w, this.h
      )
      this.url = canvas.toDataURL();
    })
  }

  detectOCR() {
    Tesseract.detect(this.scannedImg.nativeElement.src)
      .progress((progress) => {
        console.log('progress', progress);
        this.status = progress;
        this.cdRef.detectChanges();
      })
      .catch(err => {
        console.error(err, 'err');
      })
      .then((result) => {
        console.log(result);
        this.recognizedText = result.text;
        console.log(this.recognizedText, 'then');
      })
      .finally((resultOrError) => {
        // this.prepoznavanje = resultOrError.text;
        // console.log(this.prepoznavanje, "prepoznavanje");
        this.cdRef.detectChanges();
      })
  }

  runOCR() {
    console.log(this.scannedImg.nativeElement.src)
    Tesseract.recognize(this.scannedImg.nativeElement.src, {
      lang: this.levelNum
    })
      .progress((progress) => {
        console.log('progress', progress);
        this.status = progress;
        this.cdRef.detectChanges();
      })
      .catch(err => {
        console.error(err, 'err');
      })
      .then((result) => {
        console.log(result);
        this.recognizedText = result.text;
        console.log(this.recognizedText, 'then');
      })
      .finally((resultOrError) => {
        // this.prepoznavanje = resultOrError.text;
        // console.log(this.prepoznavanje, "prepoznavanje");
        this.cdRef.detectChanges();
      })
  }

  readUrl(event) {
    // console.log(event)
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();

      reader.onload = (event: any) => {
        this.url = event.target.result;
      }
      reader.readAsDataURL(event.target.files[0]);
    }
  }





}

