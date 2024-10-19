import { Injectable } from '@angular/core';
import { Projekat } from '../models/projekat';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjekatService {

  private readonly PROJEKAT_URL = 'http://localhost:8083/projekat/';

  dataChange: BehaviorSubject<Projekat[]> = new BehaviorSubject<Projekat[]>([]);

  constructor(private httpClient: HttpClient) { }

  public getAllProjekti() : Observable<any> {

    this.httpClient.get<Projekat[]>(this.PROJEKAT_URL).subscribe(data => {
      this.dataChange.next(data);
    });

    (error: HttpErrorResponse) => {
      console.log(error.name + ' ' + error.message);
    }

    return this.dataChange.asObservable();

  }

  public addProjekat(projekat: Projekat): void {
    projekat.id = 0;
    this.httpClient.post(this.PROJEKAT_URL, projekat).subscribe();
  }

  public updateProjekat(projekat: Projekat): void {
    this.httpClient.put(this.PROJEKAT_URL, projekat).subscribe();
  }

  public deleteProjekat(id: number): void {
    console.log(id);
    this.httpClient.delete(this.PROJEKAT_URL + id).subscribe();
  }
}
