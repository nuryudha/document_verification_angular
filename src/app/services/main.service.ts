import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const httpOptions : Object = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  }),
  observe: 'response',
  responseType: 'json'
}

@Injectable({
  providedIn: 'root'
})
export class MainService {

  constructor(private http: HttpClient) { }

  detailUser(endPoint: string, parameter: any, httpHeaders: any, catchError: any): Observable<HttpResponse<any>> {
    return this.http.post<any>(environment.detailUser + endPoint, parameter, httpHeaders).pipe(catchError);
  }

  listCabang(endPoint: string, catchError: any): Observable<HttpResponse<any>> {
    return this.http.get<any>(environment.listCabang + endPoint, httpOptions).pipe(catchError);
  }

  findDocVer(endPoint: any, parameter: any, catchError: any): Observable<HttpResponse<any>> {
    return this.http.post<any>(environment.findDocver + endPoint, parameter, httpOptions).pipe(catchError);
  }

  confirmDocVer(endPoint: any, parameter: any, catchError: any): Observable<HttpResponse<any>> {
    return this.http.post<any>(environment.confirmDocver + endPoint, parameter, httpOptions).pipe(catchError);
  }
}
