import { Component, OnInit, ViewChild } from '@angular/core';
import { Projekat } from '../../models/projekat';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ProjekatService } from '../../services/projekat.service';
import { ProjekatDialogComponent } from '../dialogs/projekat-dialog/projekat-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-projekat',
  templateUrl: './projekat.component.html',
  styleUrl: './projekat.component.css'
})
export class ProjekatComponent implements OnInit{
  displayedColumns = ['id', 'naziv', 'oznaka','opis', 'actions'];

  dataSource: MatTableDataSource<Projekat>;

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;

  constructor(private projekatService: ProjekatService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadData();
  }

  public loadData() {
    this.projekatService.getAllProjekti().subscribe(data => {
      this.dataSource = new MatTableDataSource<Projekat>(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  public openDialog(flag: number, id?: number, naziv?: string, oznaka?: string, opis?: string) {
    const dialogRef = this.dialog.open(ProjekatDialogComponent, {
      data: {
        id: id,
        naziv: naziv,
        oznaka: oznaka,
        opis: opis
      }
    });

    dialogRef.componentInstance.flag = flag;

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        this.loadData();
      }
    });

  }


  applyFilter(filterValue: string) {
    filterValue = filterValue.trim().toLocaleLowerCase();
    this.dataSource.filter = filterValue;
  }
}
