import { ProjekatService } from './../../../services/projekat.service';
import { StudentService } from './../../../services/student.service';
import { Component, Inject, OnInit } from '@angular/core';
import { Grupa } from '../../../models/grupa';
import { Projekat } from '../../../models/projekat';
import { GrupaService } from '../../../services/grupa.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Student } from '../../../models/student';

@Component({
  selector: 'app-student-dialog',
  templateUrl: './student-dialog.component.html',
  styleUrl: './student-dialog.component.css'
})
export class StudentDialogComponent implements OnInit{

  public flag: number;
  public grupe: Grupa[];
  public projekti: Projekat[];

  constructor(public grupaService: GrupaService, 
              public snackBar: MatSnackBar,
              public dialogRef: MatDialogRef<StudentDialogComponent>,
              @Inject(MAT_DIALOG_DATA)public data: Student,
              public studentService: StudentService,
              public projekatService: ProjekatService) {}
  
  ngOnInit(): void {
    this.projekatService.getAllProjekti().subscribe(projekti => 
      this.projekti = projekti
    );

    this.grupaService.getAllGrupe().subscribe(grupe => 
      this.grupe = grupe
    );
  }

  compareTo(a: { id: any; }, b: { id: any; }) {
    return a.id == b.id;
  }

  public add(): void {
    this.studentService.addStudent(this.data);
    this.snackBar.open('Uspesno dodat student: ' + this.data.brojIndeksa, 'U redu', { duration: 3000 });
  }

  public update(): void {
    this.studentService.updateStudent(this.data);
    this.snackBar.open('Uspesno azuziran student: ' + this.data.brojIndeksa, 'U redu', { duration: 3000 })
  }

  public delete(): void {
    this.studentService.deleteStudent(this.data.id);
    this.snackBar.open('Uspesno izbrisan student: ' + this.data.brojIndeksa, 'U redu', { duration: 3000 });

  }

  public cancel(): void {
    this.dialogRef.close();
    this.snackBar.open('Odustali ste: ' + this.data.brojIndeksa, 'U redu', { duration: 2000 });

  }

}
