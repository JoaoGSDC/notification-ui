import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificacaoComponent } from './components/notificacao/notificacao.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [NotificacaoComponent],
  imports: [CommonModule, FormsModule, RouterModule],
  exports: [NotificacaoComponent],
})
export class SharedModule {}
