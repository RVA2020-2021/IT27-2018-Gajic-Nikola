import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Grupa } from '../models/grupa';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class GrupaService {

  private readonly GRUPA_URL = 'http://localhost:8083/grupa/';

  dataChange: BehaviorSubject<Grupa[]> = new BehaviorSubject<Grupa[]>([]);

  constructor(private httpClient: HttpClient) { }

  public getAllGrupe() : Observable<any> {

    this.httpClient.get<Grupa[]>(this.GRUPA_URL).subscribe(data => {
      this.dataChange.next(data);
    });

    (error: HttpErrorResponse) => {
      console.log(error.name + ' ' + error.message);
    }

    return this.dataChange.asObservable();

  }

  public addGrupa(grupa: Grupa): void {
    grupa.id = 0;
    this.httpClient.post(this.GRUPA_URL, grupa).subscribe();
  }

  public updateGrupa(grupa: Grupa): void {
    this.httpClient.put(this.GRUPA_URL, grupa).subscribe();
  }

  public deleteGrupa(id: number): void {
    console.log(id);
    this.httpClient.delete(this.GRUPA_URL + id).subscribe();
  }
}
