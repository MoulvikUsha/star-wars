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
  selectedBirthyearOptions: string[] = [];
  filmsData: any[] = [];
  speciesData: any[] = [];
  vehiclesData: any[] = [];
  starshipsData: any[] = [];
  birthYearData: any[] = [];
  isSearched: boolean = false;

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.apiService.getAllHeroes().subscribe((res: any) => {
      const updatedPeople = res.map((person: any, index: number) => ({
        slNo: index + 1,
        ...person,
      }));
      this.tableData = updatedPeople;
      this.filteredHeroes = updatedPeople;

      const birthYears = this.tableData.map((year: any) => year.birth_year);
      this.birthYearData = [...new Set(birthYears)];

      this.apiService.getAllFilms().subscribe((res: any) => {
        this.filmsData = res;
        this.films = res.map((film: any) => film.title);
      });

      this.apiService.getAllVehicles().subscribe((res: any) => {
        this.vehiclesData = res;
        this.vehicles = res.map((vehicle: any) => vehicle.name);
      });

      this.apiService.getAllStarships().subscribe((res: any) => {
        this.starshipsData = res;
        this.starships = res.map((starship: any) => starship.name);
      });

      this.apiService.getAllSpecies().subscribe((res: any) => {
        this.speciesData = res;
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

  updateFilteredHeroes() {
    const selectedFilmUrls = this.filmsData
      .filter((f) => this.selectedFilmOptions.includes(f.title))
      .map((f) => f.url);

    const selectedSpeciesUrls = this.speciesData
      .filter((v) => this.selectedSpeciesOptions.includes(v.name))
      .map((v) => v.url);

    const selectedVehicleUrls = this.vehiclesData
      .filter((v) => this.selectedVehicleOptions.includes(v.name))
      .map((v) => v.url);

    const selectedStarshipsUrls = this.starshipsData
      .filter((v) => this.selectedStarshipOptions.includes(v.name))
      .map((v) => v.url);

    this.filteredHeroes = this.tableData.filter(
      (hero: {
        films: any[];
        species: any[];
        vehicles: any[];
        starships: any[];
        birth_year: string;
      }) => {
        const matchesFilms =
          selectedFilmUrls.length === 0 ||
          hero.films?.some((url: any) => selectedFilmUrls.includes(url));

        const matchesSpeciess =
          selectedSpeciesUrls.length === 0 ||
          hero.species?.some((url) => selectedSpeciesUrls.includes(url));

        const matchesVehicles =
          selectedVehicleUrls.length === 0 ||
          hero.vehicles?.some((url) => selectedVehicleUrls.includes(url));

        const matchesStarships =
          selectedStarshipsUrls.length === 0 ||
          hero.starships?.some((url) => selectedStarshipsUrls.includes(url));

        const selectedBirthYears = this.selectedBirthyearOptions.length === 0 || this.selectedBirthyearOptions.includes(
          hero.birth_year
        );
        if (selectedFilmUrls.length > 0 ||
          selectedSpeciesUrls.length > 0 ||
          selectedVehicleUrls.length > 0 ||
          selectedStarshipsUrls.length > 0 ||
          this.selectedBirthyearOptions.length > 0) {
          this.isSearched = true;
        } else {
          this.isSearched = false;
        }
        return (
          matchesFilms &&
          matchesVehicles &&
          matchesSpeciess &&
          matchesStarships &&
          selectedBirthYears
        );
      }
    );
  }
}
