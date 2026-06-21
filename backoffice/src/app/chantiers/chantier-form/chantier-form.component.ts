import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ChantierService } from '../../core/services/chantier.service';
import { ChantierRequest } from '../../core/models/chantier';

@Component({
    selector: 'app-chantier-form',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './chantier-form.component.html',
    styleUrls: ['./chantier-form.component.scss']
})
export class ChantierFormComponent implements OnInit {
    chantierId: string | null = null;
    isEditMode = false;
    loading = false;
    error = '';

    formData: ChantierRequest = {
        nom: '',
        adresse: '',
        ville: '',
        longitude: 0,
        latitude: 0,
        dateDebut: '',
        responsableId: '',
        statut: 'PLANIFIE',
        budget: 0,
        devise: 'MAD',
    };

    constructor(
        private service: ChantierService,
        private router: Router,
        private route: ActivatedRoute
    ) {}

    ngOnInit() {
        this.chantierId = this.route.snapshot.paramMap.get('id');
        if (this.chantierId) {
            this.isEditMode = true;
            this.loadChantier(this.chantierId);
        }
    }

    loadChantier(id: string) {
        this.loading = true;
        this.service.getById(id).subscribe({
            next: c => {
                this.formData = {
                    nom: c.nom,
                    description: c.description,
                    adresse: c.adresse,
                    ville: c.ville,
                    codePostal: c.codePostal,
                    longitude: c.longitude,
                    latitude: c.latitude,
                    statut: c.statut,
                    dateDebut: c.dateDebut,
                    dateFin: c.dateFin,
                    responsableId: c.responsableId,
                    clientNom: c.clientNom,
                    budget: c.budget,
                    devise: c.devise,
                };
                this.loading = false;
            },
            error: err => {
                this.error = 'Impossible de charger le chantier';
                this.loading = false;
            }
        });
    }

    onSubmit() {
        this.loading = true;
        this.error = '';

        const action = this.isEditMode && this.chantierId
            ? this.service.update(this.chantierId, this.formData)
            : this.service.create(this.formData);

        action.subscribe({
            next: () => this.router.navigate(['/chantiers']),
            error: err => {
                this.error = err.error?.message || 'Erreur lors de l\'enregistrement';
                this.loading = false;
            }
        });
    }

    onCancel() {
        this.router.navigate(['/chantiers']);
    }
}