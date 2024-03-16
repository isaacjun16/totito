import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
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
    [2, 4, 6]
  ];

  ngOnInit(): void {
    this.reiniciar();
  }

  verificar(): string | null {
    for(let i = 0; i < this.combinaciones.length; i++) {
      const [a, b, c] = this.combinaciones[i];

      if(this.tablero[a] === this.tablero[b] &&
        this.tablero[b] === this.tablero[c] &&
        this.tablero[a] !== '') {
          return this.tablero[a];
        }
    }
    
    return null;
  }

  marcar(casilla: number): number {
    console.log(casilla);
    if(this.tablero[casilla] === '') {
      this.tablero[casilla] = this.turno;
    }

    const ganador = this.verificar();
    if(ganador) {
      console.log(ganador + ' a ganado!');
      this.reiniciar();

      return 1;
    }

    this.turno = this.turno === 'X'? 'O' : 'X';
    return 0;
  }

  reiniciar(): void {
    this.turno = 'X';
    this.tablero = ['', '', '', '', '', '', '', '', ''];
  }
}
