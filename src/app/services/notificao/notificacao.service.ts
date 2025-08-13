import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { io } from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class NotificacaoService {
  private socket = io('http://localhost:3000');

  constructor(private http: HttpClient) {}

  enviarNotificacao(mensagemId: string, conteudoMensagem: string) {
    return this.http.post('http://localhost:3000/api/notificar', {
      mensagemId,
      conteudoMensagem,
    });
  }

  onStatusUpdate(): Observable<any> {
    return new Observable((observer) => {
      this.socket.on('statusUpdate', (data) => observer.next(data));
    });
  }
}
