import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpMethodsService {

  private apiPath = 'http://localhost:8080/api/';

  constructor(public http: HttpClient) {
  }

  get(url: string) {
    return this.http.get(this.apiPath + url);
  }

  myHttpHeaders() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    return httpOptions;
  }


  post(url: string, data) {
    return this.http.post(this.apiPath + url, data, this.myHttpHeaders());
  }

  put(url: string, data) {
    return this.http.put(this.apiPath + url, data);
  }

  delete(url: string) {
    return this.http.delete(this.apiPath + url );
  }
}
