import { Component, Inject, OnInit } from '@angular/core';
import { ProjekatService } from '../../../services/projekat.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Projekat } from '../../../models/projekat';

@Component({
  selector: 'app-projekat-dialog',
  templateUrl: './projekat-dialog.component.html',
  styleUrl: './projekat-dialog.component.css'
})
export class ProjekatDialogComponent implements OnInit{

  public flag: number;

  constructor(public projekatService: ProjekatService, 
              public snackBar: MatSnackBar,
              public dialogRef: MatDialogRef<ProjekatDialogComponent>,
              @Inject(MAT_DIALOG_DATA)public data: Projekat) {}
  
  ngOnInit(): void {
    
  }

  public add(): void {
    this.projekatService.addProjekat(this.data);
    this.snackBar.open('Uspesno dodat projekat: ' + this.data.naziv, 'U redu', { duration: 3000 });
  }

  public update(): void {
    this.projekatService.updateProjekat(this.data);
    this.snackBar.open('Uspesno azuziran projekat: ' + this.data.naziv, 'U redu', { duration: 3000 })
  }

  public delete(): void {
    this.projekatService.deleteProjekat(this.data.id);
    this.snackBar.open('Uspesno izbrisan projekat: ' + this.data.naziv, 'U redu', { duration: 3000 });

  }

  public cancel(): void {
    this.dialogRef.close();
    this.snackBar.open('Odustali ste: ' + this.data.naziv, 'U redu', { duration: 2000 });

  }
}
