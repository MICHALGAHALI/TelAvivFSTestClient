import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { issNow } from './Iss.location.model';

@Injectable({
  providedIn: 'root'
})
export class IssLocationService {
  private BASE_URL = 'http://api.open-notify.org';
  private LOCAL_URL = 'https://localhost:44349';
  constructor(private http: HttpClient) { }
  Get(): Observable<issNow> {
    const url = `${this.BASE_URL}/iss-now.json`;
    return this.http.get<issNow>(url);
  }
  Save(locations: issNow[]):Observable<any> {
    const url = `${this.LOCAL_URL}/api/saveEnteredUser`;
    let formData: FormData = new FormData();
    formData.append('locations', JSON.stringify(locations));
    return this.http.post(url, formData).pipe(
      catchError((err)=>{console.log(err);return of([])})
    );
  }
}
