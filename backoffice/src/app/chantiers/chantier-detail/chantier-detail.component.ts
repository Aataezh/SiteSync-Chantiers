import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';
import { ChantierService } from '../../core/services/chantier.service';
import { Chantier } from '../../core/models/chantier';

@Component({
    selector: 'app-chantier-detail',
    standalone: true,
    imports: [CommonModule, RouterLink],
    templateUrl: './chantier-detail.component.html',
    styleUrls: ['./chantier-detail.component.scss']
})
export class ChantierDetailComponent implements OnInit {
    chantier: Chantier | null = null;
    loading = true;
    error = '';

    constructor(
        private service: ChantierService,
        private route: ActivatedRoute,
        private router: Router
    ) {}

    ngOnInit() {
        const id = this.route.snapshot.paramMap.get('id');
        if (id) {
            this.load(id);
        }
    }

    load(id: string) {
        this.loading = true;
        this.service.getById(id).subscribe({
            next: c => { this.chantier = c; this.loading = false; },
            error: err => { this.error = 'Chantier introuvable'; this.loading = false; }
        });
    }

    onDelete() {
        if (!this.chantier) return;
        if (!confirm('Supprimer ce chantier définitivement ?')) return;
        this.service.delete(this.chantier.id).subscribe({
            next: () => this.router.navigate(['/chantiers'])
        });
    }

    getStatutClass(statut: string): string {
        const m: Record<string, string> = {
            EN_COURS: 'badge-orange',
            PLANIFIE: 'badge-gray',
            TERMINE: 'badge-green',
            SUSPENDU: 'badge-red',
        };
        return 'badge ' + (m[statut] || 'badge-gray');
    }
}