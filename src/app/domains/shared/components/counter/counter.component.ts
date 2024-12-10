import {
  Component,
  Input,
  signal,
  SimpleChange,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-counter',
  standalone: true,
  imports: [],
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.css',
})
export class CounterComponent {
  @Input({ required: true }) duration = 0;
  @Input({ required: true }) message = '';
  counter = signal(0);
  counterRef: number | undefined;

  constructor() {
    //No ASYN
    //Before render
    //Solo corre una vez
    console.log('Constructor');
    console.log('-'.repeat(10));
  }

  //Cambios en el componente
  ngOnChanges(changes: SimpleChanges) {
    //Before and during render
    console.log('ngOnChanges');
    console.log('-'.repeat(10));
    console.log(changes);

    //Valida que los datos sean de duration
    const duration = changes['duration'];
    // Valida si duration existe y si el nuevo valor es diferente al anterior
    if (duration && duration.currentValue !== duration.previousValue) {
      //Se imprime este método si existe el cambio
      this.doSomething();
    }
    // Acá muestra exactamente que está cambiando
  }

  ngOnInit() {
    //Inicializa el componente
    //Before and during render
    //Corre una vez
    //Se puede llamar un async, then, subs
    console.log('ngOnInit');
    console.log('-'.repeat(10));
    console.log('duration =>', this.duration);
    console.log('message =>', this.message);
    this.counterRef = window.setInterval(() => {
      console.log('run interval');

      this.counter.update((statePrev) => statePrev + 1);
    }, 1000);
  }

  ngAfterViewInit() {
    // after render
    // Hijos ya fueron renderizados
    console.log('ngAfterViewInit');
    console.log('-'.repeat(10));
  }

  ngOnDestroy() {
    //El componente se destruye
    console.log('ngOnDestroy');
    console.log('-'.repeat(10));
    window.clearInterval(this.counterRef);
  }

  doSomething() {
    console.log('change duration');
    console.log('Duration existe', this.duration);
  }
}
