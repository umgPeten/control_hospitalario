import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialogo-nosotros',
  templateUrl: './dialogo-nosotros.component.html',
  styleUrls: ['./dialogo-nosotros.component.css']
})
export class DialogoNosotrosComponent implements OnInit {

  constructor(
    public dialogo: MatDialogRef<DialogoNosotrosComponent>,
  ) { }

  ngOnInit(): void {
  }

}
