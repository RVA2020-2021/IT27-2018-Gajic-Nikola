import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Student } from '../../models/student';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { StudentService } from '../../services/student.service';
import { Grupa } from '../../models/grupa';
import { MatDialog } from '@angular/material/dialog';
import { StudentDialogComponent } from '../dialogs/student-dialog/student-dialog.component';
import { Projekat } from '../../models/projekat';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrl: './student.component.css'
})
export class StudentComponent implements OnInit, OnChanges{
  
  displayedColumns = ['brojIndeksa', 'ime', 'prezime','grupa','smer','projekat', 'actions'];
  dataSource: MatTableDataSource<Student>;

  @Input() selektovanaGrupa: Grupa;

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;

  constructor(private studentService: StudentService, private dialog: MatDialog) { }

  ngOnChanges(): void {
    if (this.selektovanaGrupa.id) {
      debugger;
      this.loadNewData();
    }
  }

  ngOnInit(): void {
    
    this.loadData();

    if (this.selektovanaGrupa.id) {
      debugger;
      this.loadNewData();
    }
  }

  public loadData() {
    this.studentService.getAllStudenti().subscribe(data => {
      this.dataSource = new MatTableDataSource<Student>(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  public loadNewData() {
    this.studentService.getStudentiGrupa(this.selektovanaGrupa.id).subscribe(data => {
      this.dataSource = new MatTableDataSource<Student>(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  public openDialog(flag: number, id?: number,brojIndeksa?: string, ime?:string, prezime?:string, grupa?: Grupa, projekat?: Projekat ) {
    const dialogRef = this.dialog.open(StudentDialogComponent, {
      data: {
        id: id,
        brojIndeksa: brojIndeksa,
        ime: ime,
        prezime: prezime,
        grupa: grupa,
        projekat: projekat
      }
    });

    dialogRef.componentInstance.flag = flag;

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        this.loadData();
      }
    })

  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim().toLocaleLowerCase();
    this.dataSource.filter = filterValue;
  }
}
