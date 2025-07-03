import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private film = new BehaviorSubject<any>({});
  filmData = this.film.asObservable();

  constructor(private http: HttpClient) {}
  getFilmData(data: any) {
    this.film.next(data);
  }

  getAllHeroes(): Observable<any> {
    return this.http.get(`https://swapi.info/api/people`);
  }

  getAllVehicles(): Observable<any> {
    return this.http.get(`https://swapi.info/api/vehicles`);
  }

  getAllStarships(): Observable<any> {
    return this.http.get(`https://swapi.info/api/starships`);
  }

  getAllSpecies(): Observable<any> {
    return this.http.get(`https://swapi.info/api/species`);
  }

  getAllFilms() {
    return this.http.get(`https://swapi.info/api/films`);
  }

  getHeroesById(heroId: number): Observable<any> {
    return this.http.get(`https://swapi.info/api/people/${heroId}`);
  }

  getFilmsById(filmdId: number): Observable<any> {
    return this.http.get(`https://swapi.info/api/films/${filmdId}`);
  }

  getVehicles(vehicleId: number): Observable<any> {
    return this.http.get(`https://swapi.info/api/vehicles/${vehicleId}`);
  }

  getStarships(starshipId: number): Observable<any> {
    return this.http.get(`https://swapi.info/api/starships/${starshipId}`);
  }
}
