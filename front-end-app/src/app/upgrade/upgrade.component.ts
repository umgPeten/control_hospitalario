import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogoConfirmacionComponent } from "../components/emergentes/dialogo-confirmacion/dialogo-confirmacion.component"

@Component({
  selector: 'app-upgrade',
  templateUrl: './upgrade.component.html',
  styleUrls: ['./upgrade.component.css']
})
export class UpgradeComponent implements OnInit {

  constructor(
    public dialogo: MatDialog
  ) { }

  mostrarDialogo(): void {
    this.dialogo
      .open(DialogoConfirmacionComponent, {
        data: `¿Te gusta programar en TypeScript?`
      })
      .afterClosed()
      .subscribe((confirmado: Boolean) => {
        if (confirmado) {
          alert("¡A mí también!");
        } else {
          alert("Deberías probarlo, a mí me gusta :)");
        }
      });
  }

  ngOnInit() {
  }

}
