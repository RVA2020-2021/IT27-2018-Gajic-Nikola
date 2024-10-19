import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Smer } from '../models/smer';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SmerService {

  private readonly SMER_URL = 'http://localhost:8083/smer/';

  dataChange: BehaviorSubject<Smer[]> = new BehaviorSubject<Smer[]>([]);

  constructor(private httpClient: HttpClient) { }

  public getAllSmerovi() : Observable<any> {

    this.httpClient.get<Smer[]>(this.SMER_URL).subscribe(data => {
      this.dataChange.next(data);
    });

    (error: HttpErrorResponse) => {
      console.log(error.name + ' ' + error.message);
    }

    return this.dataChange.asObservable();

  }

  public addSmer(smer: Smer): void {
    smer.id = 0;
    console.log('dodat smer ' + smer.naziv);
    this.httpClient.post(this.SMER_URL, smer).subscribe();
  }

  public updateSmer(smer: Smer): void {
    this.httpClient.put(this.SMER_URL, smer).subscribe();
  }

  public deleteSmer(id: number): void {
    console.log(id);
    this.httpClient.delete(this.SMER_URL + id).subscribe();
  }
}
