import {ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import * as Tesseract from 'tesseract.js';
import {FileHolder} from "angular2-image-upload/lib/image-upload/image-upload.component";
import * as smartcrop from '../../../node_modules/smartcrop/smartcrop.js';
import {OcrService} from "../ocr.service";
import {timeout} from "q";

// import 'rxjs/add/observable/of';

@Component({
  selector: 'app-ocr',
  templateUrl: './ocr.component.html',
  styleUrls: ['./ocr.component.css']
})
export class OcrComponent implements OnInit {
  constructor(private cdRef: ChangeDetectorRef, private ocrService: OcrService) {

  }

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
  licensePlateData: any = [];
  coordinates
  xMin
  xMax
  yMin
  yMax
  coordinatesW
  coordinatesH
  mklicensePlate

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
  @ViewChild('File') private File: ElementRef;

  public context: CanvasRenderingContext2D;

  ngOnInit() {
  }

  licensePlateRecognition() {
    this.ocrService.postImg(this.url).subscribe(data => {
      console.log(data, 'data')
      this.licensePlateData = data.results[0]
      this.coordinates = data.results[0].coordinates
      console.log(this.coordinates)
      this.cropLicensePlate()
    })
  }

  testCoordinates() {
    // this.x = this.coordinates[0].y;
    // this.y = this.coordinates[1].y;
    // console.log(this.x, this.y);
    // this.yMax = Math.max(this.coordinates[0].y, this.coordinates[1].y);
    // this.xMin = Math.min(this.coordinates[0].x,this.coordinates[3].x);
    // console.log(this.xMin, this.yMax);
  }

  // test() {
  //   smartcrop.crop('../../assets/mak.jpg', {width: 100, height: 100}, result =>
  //     console.log(result)
  //   );
  // }

  testCanvas() {
    var canvas: HTMLCanvasElement = <HTMLCanvasElement> this.myCanvas.nativeElement;
    var ctx: CanvasRenderingContext2D = canvas.getContext("2d");
    this.img = this.scannedImg.nativeElement;
    // {width: 441, height: 175}
    smartcrop.crop(this.img, {width: 250, height: 250, minScale: 0.5, ruleOfThirds: true}, result => {
      this.podatoci = result.topCrop;
      this.x = result.topCrop.x;
      this.y = result.topCrop.y
      this.w = result.topCrop.width
      this.h = result.topCrop.height
      console.log(this.podatoci, 'podatoci');
      ctx.canvas.width = this.w;
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
    var canvas: HTMLCanvasElement = <HTMLCanvasElement> this.myCanvas.nativeElement;
    var ctx: CanvasRenderingContext2D = canvas.getContext("2d");
    this.img = this.scannedImg.nativeElement;
    // {width: 440, height: 170}
    // smartcrop.crop(this.img, {width: 381, height: 192, minScale: 0.5,}, result => {

    smartcrop.crop(this.img, {width: 381, height: 192, minScale: 0.5,}, result => {
      this.podatoci = result.topCrop;
      this.x = result.topCrop.x;
      this.y = result.topCrop.y
      this.w = result.topCrop.width
      this.h = result.topCrop.height
      console.log(this.podatoci, 'podatoci');
      ctx.canvas.width = this.w;
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
    var canvas: HTMLCanvasElement = <HTMLCanvasElement> this.myCanvas.nativeElement;
    var ctx: CanvasRenderingContext2D = canvas.getContext("2d");
    this.img = this.scannedImg.nativeElement;
    // {width: 440, height: 170}
    smartcrop.crop(this.img, {width: 250, height: 250, minScale: 0.5}, result => {
      this.podatoci = result.topCrop;
      this.x = result.topCrop.x;
      this.y = result.topCrop.y
      this.w = result.topCrop.width
      this.h = result.topCrop.height
      console.log(this.podatoci, 'podatoci');
      ctx.canvas.width = this.w;
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

  readUrl() {
    if (this.File.nativeElement.files && this.File.nativeElement.files[0]) {
      let reader = new FileReader();
      reader.onload = (url: any) => {
        this.url = url.target.result;
        // console.log(this.url)
      }
      reader.readAsDataURL(this.File.nativeElement.files[0]);
      setTimeout(() => {
        console.log(this.scannedImg.nativeElement.width, this.scannedImg.nativeElement.height);
        this.scaleImg()
      }, 1000)


    }
  }

  scaleImg() {
    //create canvas
    var canvas: HTMLCanvasElement = <HTMLCanvasElement> this.myCanvas.nativeElement;
    //get its context
    var ctx: CanvasRenderingContext2D = canvas.getContext("2d");
    //start to load image from src url
    this.img = this.scannedImg.nativeElement;
    //resize canvas up to size image size
    canvas.width = this.img.width;
    canvas.height = this.img.height;
    if (canvas.width > 750 || canvas.height > 750) {
      while (canvas.width > 750 || canvas.height > 750) {
        canvas.width = canvas.width * 0.6;
        canvas.height = canvas.height * 0.6;
        console.log(canvas.width, canvas.height, 'eeeeeeeeeeeeeeeeeeeeeeee')
      }
      console.log(canvas.width, canvas.height, 'pomina 1')
      //draw image on canvas, full canvas API is described here http://www.whatwg.org/specs/web-apps/current-work/multipage/the-canvas-element.html
      ctx.drawImage(this.img, 0, 0, canvas.width, canvas.height);
      var imgPixels = ctx.getImageData(0, 0, canvas.width, canvas.height);
      //draw pixels according to computed colors
      ctx.putImageData(imgPixels, 0, 0, 0, 0, imgPixels.width, imgPixels.height);
      // return canvas.toDataURL();
      this.url = canvas.toDataURL();
    }
    this.licensePlateRecognition()

  }

  mkChecklicensePlate() {
    console.log(this.licensePlateData.candidates[0].plate)

    this.mklicensePlate = this.licensePlateData.candidates[0].plate.slice(2, 6)
    console.log(this.mklicensePlate)
    if (this.mklicensePlate.match(/^[0-9]*$/)) {
      this.mklicensePlate = this.licensePlateData.candidates[0].plate
    }
    else
      this.mklicensePlate = this.licensePlateData.candidates[1].plate

  }

  test() {
    //create canvas
    var canvas: HTMLCanvasElement = <HTMLCanvasElement> this.myCanvas.nativeElement;
    //get its context
    var ctx: CanvasRenderingContext2D = canvas.getContext("2d");
    //start to load image from src url
    this.img = this.scannedImg.nativeElement;
    //resize canvas up to size image size
    canvas.width = this.img.width;
    canvas.height = this.img.height;
    //draw image on canvas, full canvas API is described here http://www.whatwg.org/specs/web-apps/current-work/multipage/the-canvas-element.html
    ctx.drawImage(this.img, 0, 0);
    //get array of image pixels
    var imgPixels = ctx.getImageData(0, 0, canvas.width, canvas.height);
    //run through all the pixels
    for (var y = 0; y < imgPixels.height; y++) {
      for (var x = 0; x < imgPixels.width; x++) {
        //here is x and y are multiplied by 4 because every pixel is four bytes: red, green, blue, alpha
        var i = (y * 4) * imgPixels.width + x * 4; //Why is this multiplied by 4?
        //compute average value for colors, this will convert it to bw
        var avg = (imgPixels.data[i] + imgPixels.data[i + 1] + imgPixels.data[i + 2]) / 3;
        //set values to array
        imgPixels.data[i] = avg;
        imgPixels.data[i + 1] = avg;
        imgPixels.data[i + 2] = avg;
      }
    }
    //draw pixels according to computed colors
    ctx.putImageData(imgPixels, 0, 0, 0, 0, imgPixels.width, imgPixels.height);
    // return canvas.toDataURL();
    this.url = canvas.toDataURL();


  }

  // contrast
  test2() {
    //create canvas
    var canvas: HTMLCanvasElement = <HTMLCanvasElement> this.myCanvas.nativeElement;
    //get its context
    var ctx: CanvasRenderingContext2D = canvas.getContext("2d");
    //start to load image from src url
    this.img = this.scannedImg.nativeElement;
    //resize canvas up to size image size
    canvas.width = this.img.width;
    canvas.height = this.img.height;
    //draw image on canvas, full canvas API is described here http://www.whatwg.org/specs/web-apps/current-work/multipage/the-canvas-element.html
    ctx.drawImage(this.img, 0, 0);

    var imgPixels = ctx.getImageData(0, 0, canvas.width, canvas.height);
    for (var i = 0; i < imgPixels.data.length; i += 4) {
      var average = Math.round((imgPixels.data[i] + imgPixels.data[i + 1] + imgPixels.data[i + 2]) / 3);
      let contrast = 10
      if (average > 127) {
        imgPixels.data[i] += (imgPixels.data[i] / average) * contrast;
        imgPixels.data[i + 1] += (imgPixels.data[i + 1] / average) * contrast;
        imgPixels.data[i + 2] += (imgPixels.data[i + 2] / average) * contrast;
      } else {
        imgPixels.data[i] -= (imgPixels.data[i] / average) * contrast;
        imgPixels.data[i + 1] -= (imgPixels.data[i + 1] / average) * contrast;
        imgPixels.data[i + 2] -= (imgPixels.data[i + 2] / average) * contrast;
      }
    }
    //draw pixels according to computed colors
    ctx.putImageData(imgPixels, 0, 0, 0, 0, imgPixels.width, imgPixels.height);
    // return canvas.toDataURL();
    this.url = canvas.toDataURL();
  }


  // brightness
  test3() {
    //create canvas
    var canvas: HTMLCanvasElement = <HTMLCanvasElement> this.myCanvas.nativeElement;
    //get its context
    var ctx: CanvasRenderingContext2D = canvas.getContext("2d");
    //start to load image from src url
    this.img = this.scannedImg.nativeElement;
    //resize canvas up to size image size
    canvas.width = this.img.width;
    canvas.height = this.img.height;
    //draw image on canvas, full canvas API is described here http://www.whatwg.org/specs/web-apps/current-work/multipage/the-canvas-element.html
    ctx.drawImage(this.img, 0, 0);
    var imgPixels = ctx.getImageData(0, 0, canvas.width, canvas.height);

    let brightness = -10
    for (var i = 0; i < imgPixels.data.length; i += 4) {
      imgPixels.data[i] -= brightness;
      imgPixels.data[i + 1] -= brightness;
      imgPixels.data[i + 2] -= brightness;
    }

    //draw pixels according to computed colors
    ctx.putImageData(imgPixels, 0, 0, 0, 0, imgPixels.width, imgPixels.height);
    // return canvas.toDataURL();
    this.url = canvas.toDataURL();
  }


  cropLicensePlate() {
    //create canvas
    var canvas: HTMLCanvasElement = <HTMLCanvasElement> this.myCanvas.nativeElement;
    //get its context
    var ctx: CanvasRenderingContext2D = canvas.getContext("2d");
    //start to load image from src url
    this.img = this.scannedImg.nativeElement;
    //resize canvas up to size image size
    canvas.width = this.img.width;
    canvas.height = this.img.height;

    this.yMin = Math.min(Math.min(this.coordinates[0].y, this.coordinates[1].y), Math.min(this.coordinates[2].y, this.coordinates[3].y));
    ;
    this.xMin = Math.min(Math.min(this.coordinates[0].x, this.coordinates[3].x), Math.min(this.coordinates[1].x, this.coordinates[2].x));

    this.yMax = Math.max(Math.max(this.coordinates[0].y, this.coordinates[1].y), Math.max(this.coordinates[2].y, this.coordinates[3].y));
    ;
    this.xMax = Math.max(Math.max(this.coordinates[0].x, this.coordinates[3].x), Math.max(this.coordinates[1].x, this.coordinates[2].x));
    console.log(this.xMin, this.xMax, this.yMin, this.yMax);
    //draw image on canvas, full canvas API is described here http://www.whatwg.org/specs/web-apps/current-work/multipage/the-canvas-element.html
    this.x = this.xMin;
    this.y = this.yMin
    this.w = this.xMax - this.xMin
    this.h = this.yMax - this.yMin
    // ctx.drawImage(this.img, 188, 210, 102, 20, 0, 0, 102,20
    ctx.canvas.width = this.w;
    ctx.canvas.height = this.h;
    ctx.drawImage(this.img, this.x, this.y, this.w, this.h, 0, 0, this.w, this.h)
    // ctx.drawImage(this.img, 227, 180, 150, 31, 0, 0, 150, 31

    // this.url = canvas.toDataURL();
    this.mkChecklicensePlate()
  }


}

