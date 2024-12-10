import { Component, ElementRef, Input, signal, ViewChild } from '@angular/core';
import WaveSurfer from 'wavesurfer.js';

@Component({
  selector: 'app-wave-audio',
  standalone: true,
  imports: [],
  templateUrl: './wave-audio.component.html',
  styleUrl: './wave-audio.component.css',
})
export class WaveAudioComponent {
  @Input({ required: true }) audioUrl: string = '';
  //Contenedor desde HTML
  @ViewChild('wave') container!: ElementRef;
  private ws!: WaveSurfer;
  isPlaying = signal(false);

  //Las librerías de JS se llaman en ngAfterViewInit
  ngAfterViewInit() {
    this.ws = WaveSurfer.create({
      url: this.audioUrl,
      //Elemento HTML directo
      container: this.container.nativeElement,
    });
    this.ws.on('play', () => this.isPlaying.set(true));
    this.ws.on('pause', () => this.isPlaying.set(false));

  }

  playPause() {
    this.ws.playPause();
  }
}
