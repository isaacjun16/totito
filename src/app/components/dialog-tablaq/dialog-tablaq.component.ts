import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogDataQ } from 'src/app/interfaces/dialog-data-q';
import { Map } from 'src/app/interfaces/map';

@Component({
  selector: 'app-dialog-tablaq',
  templateUrl: './dialog-tablaq.component.html',
  styleUrls: ['./dialog-tablaq.component.css']
})
export class DialogTablaqComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DialogTablaqComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogDataQ
  ) {}

  escenarios: Map[] = [];

  ngOnInit(): void {
    Object.keys(this.data.content).forEach(key => {
      this.escenarios.push({
        key: key,
        value: this.data.content[key]
      })
    });
  }
}
