import { Component, OnInit } from '@angular/core';
import { Tarefa, TarefasService } from '../tarefas.service';

@Component({
  selector: 'app-lista-tarefas',
  templateUrl: './lista-tarefas.component.html',
  styleUrls: ['./lista-tarefas.component.css']
})
export class ListaTarefasComponent implements OnInit {
  tarefas: Tarefa[] = [];
  novaTarefa = "";
  filtro: "todas" | "pendentes" | "concluidas" = "todas";

  constructor(private tarefasService: TarefasService) { }

  ngOnInit(): void {
    this.carregarTarefas();
  }

  carregarTarefas(): void {
    this.tarefasService.getTarefas()
      .subscribe(
        tarefas => this.tarefas = tarefas,
        error => alert("Erro ao carregar as tarefas")
      );
  }

  adicionarTarefa(): void {
    if (!this.novaTarefa.trim()) {
      return;
    }

    const tarefa: Tarefa = {
      descricao: this.novaTarefa,
      concluida: false
    };

    this.tarefasService.adicionarTarefa(tarefa)
      .subscribe(
        novaTarefa => {
          this.tarefas.push(novaTarefa);
          this.novaTarefa = "";
        },
        error => {
          console.log(error);
          alert(`Ocorreu um erro ao criar a tarefa: ${error.error.error}`);
        }
      );
  }

  removerTarefa(index: number): void {
    this.tarefas.splice(index, 1);
  }

  getTotalTarefas(): number {
    return this.tarefas.length;
  }

  getTarefasConcluidas(): number {
    return this.tarefas.filter(tarefa => tarefa.concluida).length;
  }

  getTarefasPendentes(): number {
    return this.tarefas.filter(tarefa => !tarefa.concluida).length;
  }

  tarefasFiltradas(): Tarefa[] {
    if (this.filtro === "concluidas") {
      return this.tarefas.filter(tarefa => tarefa.concluida);
    }

    if (this.filtro === "pendentes") {
      return this.tarefas.filter(tarefa => !tarefa.concluida);
    }

    return this.tarefas;
  }
}
