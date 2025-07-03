import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

@Component({
  selector: 'app-star-wars-table',
  standalone: true,
  imports: [CommonModule, NgSelectModule, FormsModule],
  templateUrl: './star-wars-table.component.html',
  styleUrl: './star-wars-table.component.scss',
})
export class StarWarsTableComponent implements OnInit {
  tableData: any;
  filteredHeroes: any;
  films: any[] = [];
  vehicles: any[] = [];
  starships: any[] = [];
  species: any[] = [];
  selectedFilmOptions: string[] = [];
  selectedSpeciesOptions: string[] = [];
  selectedVehicleOptions: string[] = [];
  selectedStarshipOptions: string[] = [];

  filmsData: any[] = [];

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.apiService.getAllHeroes().subscribe((res: any) => {
      const updatedPeople = res.map((person: any, index: number) => ({
        slNo: index + 1,
        ...person,
      }));
      this.tableData = updatedPeople;
      this.filteredHeroes = updatedPeople;

      this.apiService.getAllFilms().subscribe((res: any) => {
        this.filmsData = res;
        this.films = res.map((film: any) => film.title);
      });

      this.apiService.getAllVehicles().subscribe((res: any) => {
        this.vehicles = res.map((vehicle: any) => vehicle.name);
      });

      this.apiService.getAllStarships().subscribe((res: any) => {
        this.starships = res.map((starship: any) => starship.name);
      });

      this.apiService.getAllSpecies().subscribe((res: any) => {
        this.species = res.map((species: any) => species.name);
      });
    });
  }

  get headers(): string[] {
    const hero = this.tableData?.length > 0 ? this.tableData[0] : [];
    const {
      created,
      edited,
      eye_color,
      films,
      homeworld,
      mass,
      skin_color,
      starships,
      url,
      vehicles,
      species,
      ...cleanedPerson
    } = hero;
    return Object.keys(cleanedPerson || {});
  }

  goToDetail(id: number) {
    this.router.navigate(['/characters', id]);
  }

  onCheckboxChange(event: any) {
    this.selectedFilmOptions = event;

    if (!this.selectedFilmOptions.length) {
      this.filteredHeroes = this.tableData;
      return;
    }

    const selectedUrls = this.filmsData
      .filter((f) => this.selectedFilmOptions.includes(f.title))
      .map((f) => f.url);

    this.filteredHeroes = this.tableData.filter((hero: any) =>
      hero.films.some((filmUrl: any) => selectedUrls.includes(filmUrl))
    );
  }

  onCheckboxChangeSpecies(event: any) {
    this.selectedSpeciesOptions = event;
    console.log('this.selectedSpeciesOptions:', this.selectedSpeciesOptions);
  }

  onCheckboxChangeVehicle(event: any) {
    this.selectedSpeciesOptions = event;
    console.log('this.selectedVehicleOptions:', this.selectedVehicleOptions);
  }

  onCheckboxChangeStarship(event: any) {
    this.selectedSpeciesOptions = event;
    console.log('this.selectedStarshipOptions:', this.selectedStarshipOptions);
  }
}
