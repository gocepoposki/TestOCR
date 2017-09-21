import {Injectable} from '@angular/core';
import {Headers, Response, Http} from "@angular/http";
import {Observable} from "rxjs";

@Injectable()
export class OcrService {

  constructor(private http: Http) {
  }

  private baseUrl = "http://10.0.0.14:3000/plates";
  private getHeaders: Headers = new Headers({'Content-Type': 'application/json'});

  postImg(img) {
    var body = JSON.stringify({
      image: img,
      country_code: 'eu',
      pattern_code: 'no'
    });
    // return this.http.post(this.baseUrl + url, {headers: this.getHeaders})
    return this.http.post(this.baseUrl, body, {headers: this.getHeaders})
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'))
  }



}
