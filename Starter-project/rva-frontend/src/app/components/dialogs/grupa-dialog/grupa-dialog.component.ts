import { SmerService } from './../../../services/smer.service';
import { Component, Inject, OnInit } from '@angular/core';
import { GrupaService } from '../../../services/grupa.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Grupa } from '../../../models/grupa';
import { Smer } from '../../../models/smer';

@Component({
  selector: 'app-grupa-dialog',
  templateUrl: './grupa-dialog.component.html',
  styleUrl: './grupa-dialog.component.css'
})
export class GrupaDialogComponent implements OnInit{

  public flag: number;
  public smerovi: Smer[];

  constructor(public grupaService: GrupaService, 
              public snackBar: MatSnackBar,
              public dialogRef: MatDialogRef<GrupaDialogComponent>,
              @Inject(MAT_DIALOG_DATA)public data: Grupa,
              public smerService: SmerService) {}
  
  ngOnInit(): void {
    this.smerService.getAllSmerovi().subscribe(smerovi => 
      this.smerovi = smerovi
    );
  }

  compareTo(a: { id: any; }, b: { id: any; }) {
    return a.id == b.id;
  }

  public add(): void {
    this.grupaService.addGrupa(this.data);
    this.snackBar.open('Uspesno dodata grupa: ' + this.data.oznaka, 'U redu', { duration: 3000 });
  }

  public update(): void {
    this.grupaService.updateGrupa(this.data);
    this.snackBar.open('Uspesno azuzirana grupa: ' + this.data.oznaka, 'U redu', { duration: 3000 })
  }

  public delete(): void {
    this.grupaService.deleteGrupa(this.data.id);
    this.snackBar.open('Uspesno izbrisana grupa: ' + this.data.oznaka, 'U redu', { duration: 3000 });

  }

  public cancel(): void {
    this.dialogRef.close();
    this.snackBar.open('Odustali ste: ' + this.data.oznaka, 'U redu', { duration: 2000 });

  }


}
