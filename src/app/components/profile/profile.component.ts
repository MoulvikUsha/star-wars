import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent {
  heroId!: number;
  hero: any;
  films: any = [];
  vehicles: any = [];
  starships: any = [];

  constructor(private apiService: ApiService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.apiService.getAllHeroes().subscribe((res: any) => {
      this.route.paramMap.subscribe((params) => {
        const updatedPeople = res.map((person: any, index: number) => ({
          slNo: index + 1,
          ...person,
        }));
        this.heroId = Number(params.get('id'));
        this.hero = updatedPeople.find((h: any) => h.slNo === this.heroId);
      });

      // get films
      if (this.hero?.films?.length > 0) {
        this.hero?.films.map((element: any) => {
          const filmLink = element.split('/');
          let filmId = filmLink[filmLink.length - 1];
          this.apiService.getFilmsById(filmId).subscribe((res: any) => {
            this.films.push(res.title);
          });
        });
      }

      // get vehicles
      if (this.hero?.vehicles?.length) {
        this.hero?.vehicles.map((element: any) => {
          const vehiclesLink = element.split('/');
          let vehicleId = vehiclesLink[vehiclesLink.length - 1];
          this.apiService.getVehicles(vehicleId).subscribe((res: any) => {
            this.vehicles.push(res.name);
          });
        });
      }

      // get starships
      if (this.hero?.starships?.length > 0) {
        this.hero?.starships.map((element: any) => {
          const starshipsLink = element.split('/');
          let starshipId = starshipsLink[starshipsLink.length - 1];
          this.apiService.getStarships(starshipId).subscribe((res: any) => {
            this.starships.push(res.name);
          });
        });
      }
    });
  }
}
