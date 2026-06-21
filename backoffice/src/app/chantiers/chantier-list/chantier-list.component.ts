import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ChantierService } from '../../core/services/chantier.service';
import { Chantier } from '../../core/models/chantier';

@Component({
    selector: 'app-chantier-list',
    standalone: true,
    imports: [CommonModule, FormsModule, RouterLink],
    templateUrl: './chantier-list.component.html',
    styleUrls: ['./chantier-list.component.scss']
})
export class ChantierListComponent implements OnInit {
    chantiers: Chantier[] = [];
    loading = true;
    error = '';
    searchTerm = '';
    selectedStatut = '';

    constructor(private service: ChantierService) {}

    ngOnInit() {
        this.load();
    }

    load() {
        this.loading = true;
        this.error = '';
        this.service.getAll(
            this.selectedStatut || undefined,
            this.searchTerm || undefined
        ).subscribe({
            next: data => { this.chantiers = data; this.loading = false; },
            error: err => { this.error = err.message || 'Erreur de connexion au serveur'; this.loading = false; }
        });
    }

    onDelete(id: string) {
        if (!confirm('Supprimer ce chantier définitivement ?')) return;
        this.service.delete(id).subscribe({ next: () => this.load() });
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
