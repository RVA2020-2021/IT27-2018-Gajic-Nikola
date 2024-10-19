import { Injectable } from '@angular/core';
import { Student } from '../models/student';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private readonly STUDENT_URL = 'http://localhost:8083/student/';
  private readonly STUDENT_GRUPA_URL = 'http://localhost:8083/studentiGrupa/'

  dataChange: BehaviorSubject<Student[]> = new BehaviorSubject<Student[]>([]);

  constructor(private httpClient: HttpClient) { }

  public getAllStudenti() : Observable<any> {

    this.httpClient.get<Student[]>(this.STUDENT_URL).subscribe(data => {
      this.dataChange.next(data);
    });

    (error: HttpErrorResponse) => {
      console.log(error.name + ' ' + error.message);
    }

    return this.dataChange.asObservable();

  }

  public getStudentiGrupa(idGrupe: number) : Observable<any> {
    this.httpClient.get<Student[]>(this.STUDENT_GRUPA_URL + idGrupe).subscribe(data => {
      this.dataChange.next(data);
    });

    (error: HttpErrorResponse) => {
      console.log(error.name + ' ' + error.message);
    }

    return this.dataChange.asObservable();

  }

  public addStudent(student: Student): void {
    student.id = 0;
    this.httpClient.post(this.STUDENT_URL, student).subscribe();
  }

  public updateStudent(student: Student): void {
    this.httpClient.put(this.STUDENT_URL, student).subscribe();
  }

  public deleteStudent(id: number): void {
    console.log(id);
    this.httpClient.delete(this.STUDENT_URL + id).subscribe();
  }
}
