import { Component, OnInit, ViewChild } from '@angular/core';
import { Grupa } from '../../models/grupa';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { GrupaService } from '../../services/grupa.service';
import { MatDialog } from '@angular/material/dialog';
import { GrupaDialogComponent } from '../dialogs/grupa-dialog/grupa-dialog.component';
import { Smer } from '../../models/smer';

@Component({
  selector: 'app-grupa',
  templateUrl: './grupa.component.html',
  styleUrl: './grupa.component.css'
})
export class GrupaComponent implements OnInit{
  displayedColumns = ['id','oznaka','smer', 'actions'];

  dataSource: MatTableDataSource<Grupa>;

  selektovanaGrupa: Grupa;

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;

  constructor(private grupaService: GrupaService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadData();
  }

  public loadData() {
    this.grupaService.getAllGrupe().subscribe(data => {
      this.dataSource = new MatTableDataSource<Grupa>(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim().toLocaleLowerCase();
    this.dataSource.filter = filterValue;
  }

  public openDialog(flag: number, id?: number, oznaka?: string, smer?: Smer) {
    const dialogRef = this.dialog.open(GrupaDialogComponent, {
      data: {
        id: id,
        oznaka: oznaka,
        smer: smer
      }
    });

    dialogRef.componentInstance.flag = flag;

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        this.loadData();
      }
    })

  }

  selectRow(row: any) {
    this.selektovanaGrupa = row;
  }
}
