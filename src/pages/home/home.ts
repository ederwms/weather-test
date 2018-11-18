import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

//import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  // Variavel que armazena o objeto que contem as coordenadas.
  // É mais facil de manipular o objeto recebido do Geocoding com essa variavel.
  coordenadas;
  // Variavel que armazena o objeto da previsao do tempo.
  previsao;
  // Variaveis input
  myDate: any;
  cidade: any;
  horario: any = new Date();

  constructor(public navCtrl: NavController, public http: HttpClient) {
    
  }


  buscaClima(destino: string, data: any) {
    return this.http.get('http://www.mapquestapi.com/geocoding/v1/address?key=ZPPzipVJfjQixqkURm75wzqnAnVZzRL9&location=' + destino + '&maxResults=1').subscribe(geo => {
      this.coordenadas = geo;
      let lat = this.coordenadas.results['0'].locations['0'].latLng.lat; // Latitude
      let long = this.coordenadas.results['0'].locations['0'].latLng.lng; // Longitude

      // Variaveis que pegam  o tempo do sistema em HH:MM:SS.
      let horas = this.horario.getHours() < 10 ? '0' + this.horario.getHours() : this.horario.getHours();
      let minutos = this.horario.getMinutes() < 10 ? '0' + this.horario.getMinutes() : this.horario.getMinutes();
      let segundos = this.horario.getSeconds() < 10 ? '0' + this.horario.getSeconds() : this.horario.getSeconds();

      let url = 'https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/d6930b3aaccb1375812ce727ea86dbfc/' + lat + ',' + long + ',' + data + 'T' + horas + ':' + minutos + ':' + segundos + '?units=si&lang=pt&exclude=minutely,flags&outFormat=json';
      this.http.get(url).subscribe(data => {
        this.previsao = data;
        console.log(this.previsao);
      });
    });
  }

}
