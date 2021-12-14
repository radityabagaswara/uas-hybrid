import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Tab1Service {
  constructor(private readonly http: HttpClient) {}

  getAllPost(): Observable<any> {
    const body = new HttpParams();
    return this.http.post('http://localhost/uas/api/posts/list.php', body);
  }
}
