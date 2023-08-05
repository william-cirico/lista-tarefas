import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

export interface Tarefa {
  descricao: string;
  concluida: boolean;
  editando?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class TarefasService {
  private apiURL = "http://localhost:8080";

  constructor(private http: HttpClient) { }

  getTarefas(): Observable<Tarefa[]> {
    return this.http.get<Tarefa[]>(`${this.apiURL}/tarefas`);
  }

  adicionarTarefa(tarefa: Tarefa): Observable<Tarefa> {
    return this.http.post<Tarefa>(`${this.apiURL}/tarefas`, tarefa);
  }

  editarTarefa(id: number, tarefa: Tarefa): Observable<Tarefa> {
    return this.http.put<Tarefa>(`${this.apiURL}/tarefas/${id}`, tarefa);
  }

  removerTarefa(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiURL}/tarefas/${id}`);
  }
}
