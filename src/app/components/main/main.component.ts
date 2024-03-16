import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ValorQ } from 'src/app/interfaces/valor-q';
import { DialogComponent } from '../dialog/dialog.component';
import { DialogTablaqComponent } from '../dialog-tablaq/dialog-tablaq.component';
import { DialogSettingsComponent } from '../dialog-settings/dialog-settings.component';
import { DialogDataSettings } from 'src/app/interfaces/dialog-data-settings';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {

  constructor(public dialog: MatDialog) {}

  turno: string = 'X';
  tablero: string[] = ['', '', '', '', '', '', '', '', ''];
  combinaciones: number[][] = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  //Implementacion IA con tabla Q simple
  probalidadAletorio = 20;
  tazaAprendizaje = 10;
  factorDescuento = 90;
  tablaQ: ValorQ = {};

  ngOnInit(): void {
    this.reiniciar();
  }

  verificar(): string | null {
    for (let i = 0; i < this.combinaciones.length; i++) {
      const [a, b, c] = this.combinaciones[i];

      if (
        this.tablero[a] === this.tablero[b] &&
        this.tablero[b] === this.tablero[c] &&
        this.tablero[a] !== ''
      ) {
        return this.tablero[a];
      }
    }

    return null;
  }

  marcar(casilla: number): void {
    if (this.tablero[casilla] === '') {
      let estadoAnterior = this.tablero.join('');
      this.tablero[casilla] = this.turno;
      let estadoActual = this.tablero.join('');

      const taza = this.tazaAprendizaje / 100;
      const descuento = this.factorDescuento / 100;
      const ganador = this.verificar();
      if (ganador) {
        this.tablaQ[estadoAnterior] = (this.tablaQ[estadoAnterior] ||  0) + taza * (1 - (this.tablaQ[estadoAnterior] ||  0));
        this.dialogo('Juego termino!!', ganador + ' a ganado!');
        return;
      }

      if (this.empate()) {
        this.tablaQ[estadoAnterior] = (this.tablaQ[estadoAnterior] ||  0) + taza * (0 - (this.tablaQ[estadoAnterior] ||  0));
        this.dialogo('Juego termino!!', 'Empate!');
        return;
      }

      this.turno = this.turno === 'X' ? 'O' : 'X';

      if (this.turno === 'O') {
        this.turnoIA();
      }
    }
  }

  turnoIA(): void {
    let disponibles: number[] = this.tablero.reduce((a: number[], c, i) => {
      if (c === '') {
        a.push(i);
      }
      return a;
    }, []);

    let mejorJugada: number = -Infinity;
    if (Math.random() < this.probalidadAletorio / 100) {
        mejorJugada = disponibles[Math.floor(Math.random() * disponibles.length)];
    } else {
      let mejorValor = -999;
      for (let disponible of disponibles) {
        let tableroTemporal = [...this.tablero];
        tableroTemporal[disponible] = this.turno;
        let valorQ = this.tablaQ[tableroTemporal.join('')];
        if (valorQ === undefined) valorQ = 0;
        if (valorQ > mejorValor) {
          mejorValor = valorQ;
          mejorJugada = disponible;
        }
      }
    }

    //console.log(disponibles, mejorJugada);
    this.marcar(mejorJugada);
  }

  empate(): boolean {
    return !this.tablero.includes('');
  }

  reiniciar(): void {
    this.turno = 'X';
    this.tablero = ['', '', '', '', '', '', '', '', ''];
  }

  dialogo(titulo: string, mensaje: string): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {
        title: titulo,
        content: mensaje
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.reiniciar();
    });
  }

  dialogoTablaQ(): void {
    const dialogRef = this.dialog.open(DialogTablaqComponent, {
      data: {
        title: "Estados en Tabla Q",
        content: this.tablaQ
      }
    });
  }

  dialogoConfiguraciones(): void {
    const dialogRef = this.dialog.open(DialogSettingsComponent, {
      data: {
        title: 'Configuración de Función Q',
        learningRate: this.tazaAprendizaje,
        discountFactor: this.factorDescuento,
        randomMoveProbability: this.probalidadAletorio
      }
    });

    dialogRef.afterClosed().subscribe((result: DialogDataSettings) => {
      this.tazaAprendizaje = result.learningRate;
      this.factorDescuento = result.discountFactor;
      this.probalidadAletorio = result.randomMoveProbability;
    });
  }
}
