import { MatSnackBar } from '@angular/material/snack-bar';
import { SmerService } from './../../../services/smer.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Smer } from '../../../models/smer';

@Component({
  selector: 'app-smer-dialog',
  templateUrl: './smer-dialog.component.html',
  styleUrl: './smer-dialog.component.css'
})
export class SmerDialogComponent implements OnInit{
  
  public flag: number;

  constructor(public smerService: SmerService, 
              public snackBar: MatSnackBar,
              public dialogRef: MatDialogRef<SmerDialogComponent>,
              @Inject(MAT_DIALOG_DATA)public data: Smer) {}
  
  ngOnInit(): void {
    
  }

  public add(): void {
    this.smerService.addSmer(this.data);
    this.snackBar.open('Uspesno dodat smer: ' + this.data.naziv, 'U redu', { duration: 3000 });
  }

  public update(): void {
    this.smerService.updateSmer(this.data);
    this.snackBar.open('Uspesno azuziran smer: ' + this.data.naziv, 'U redu', { duration: 3000 })
  }

  public delete(): void {
    this.smerService.deleteSmer(this.data.id);
    this.snackBar.open('Uspesno izbrisan smer: ' + this.data.naziv, 'U redu', { duration: 3000 });

  }

  public cancel(): void {
    this.dialogRef.close();
    this.snackBar.open('Odustali ste: ' + this.data.naziv, 'U redu', { duration: 2000 });

  }


}
