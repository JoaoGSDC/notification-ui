import { Component, OnInit, Inject } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { NotificacaoService } from '../../../services/notificao/notificacao.service';

@Component({
  selector: 'app-notificacao',
  standalone: false,
  templateUrl: './notificacao.component.html',
})
export class NotificacaoComponent implements OnInit {
  mensagem = '';
  notificacoes: any[] = [];

  constructor(
    @Inject(NotificacaoService) private notifService: NotificacaoService
  ) {}

  ngOnInit() {
    this.notifService
      .onStatusUpdate()
      .subscribe((data: { mensagemId: any; status: any }) => {
        const item = this.notificacoes.find(
          (n) => n.mensagemId === data.mensagemId
        );
        if (item) item.status = data.status;
      });
  }

  enviar() {
    const mensagemId = uuidv4();
    this.notifService
      .enviarNotificacao(mensagemId, this.mensagem)
      .subscribe(() => {
        this.notificacoes.push({
          mensagemId,
          status: 'AGUARDANDO_PROCESSAMENTO',
        });
        this.mensagem = '';
      });
  }
}
