import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Chantier, ChantierRequest, ApiResponse } from '../models/chantier';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ChantierService {
    private url = environment.chantierApiUrl ;

    constructor(private http: HttpClient) {}

    getAll(statut?: string, search?: string): Observable<Chantier[]> {
        let params = new HttpParams();
        if (statut) params = params.set('statut', statut);
        if (search) params = params.set('search', search);
        return this.http.get<ApiResponse<Chantier[]>>(this.url + '/', { params })
            .pipe(map(r => r.data));
    }

    getById(id: string): Observable<Chantier> {
        return this.http.get<ApiResponse<Chantier>>(`${this.url}/${id}`)
            .pipe(map(r => r.data));
    }

    create(data: ChantierRequest): Observable<Chantier> {
        return this.http.post<ApiResponse<Chantier>>(this.url, data)
            .pipe(map(r => r.data));
    }

    update(id: string, data: ChantierRequest): Observable<Chantier> {
        return this.http.put<ApiResponse<Chantier>>(`${this.url}/${id}`, data)
            .pipe(map(r => r.data));
    }

    delete(id: string): Observable<void> {
        return this.http.delete<ApiResponse<null>>(`${this.url}/${id}`)
            .pipe(map(() => undefined));
    }
}
