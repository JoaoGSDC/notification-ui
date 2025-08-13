import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NotificacaoComponent } from './notificacao.component';
import { NotificacaoService } from '../../../services/notificao/notificacao.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { of, Subject } from 'rxjs';

describe('NotificacaoComponent', () => {
  let component: NotificacaoComponent;
  let fixture: ComponentFixture<NotificacaoComponent>;
  let mockService: jasmine.SpyObj<NotificacaoService>;
  let statusUpdate$: Subject<{ mensagemId: string; status: string }>;

  beforeEach(() => {
    statusUpdate$ = new Subject();

    mockService = jasmine.createSpyObj('NotificacaoService', [
      'enviarNotificacao',
      'onStatusUpdate',
    ]);

    mockService.onStatusUpdate.and.returnValue(statusUpdate$.asObservable());
    mockService.enviarNotificacao.and.callFake((id: string, msg: string) =>
      of({ success: true })
    );

    TestBed.configureTestingModule({
      imports: [CommonModule, FormsModule],
      declarations: [NotificacaoComponent],
      providers: [{ provide: NotificacaoService, useValue: mockService }],
    }).compileComponents();

    fixture = TestBed.createComponent(NotificacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should send notification and add to list', () => {
    component.mensagem = 'Teste de envio';
    component.enviar();

    expect(mockService.enviarNotificacao).toHaveBeenCalled();
    expect(component.notificacoes.length).toBe(1);
    expect(component.notificacoes[0].status).toBe('AGUARDANDO_PROCESSAMENTO');
    expect(component.mensagem).toBe('');
  });

  it('should update status when socket emits statusUpdate', () => {
    const mensagemId = 'abc-123';
    component.notificacoes.push({
      mensagemId,
      status: 'AGUARDANDO_PROCESSAMENTO',
    });

    statusUpdate$.next({ mensagemId, status: 'PROCESSADO' });

    expect(component.notificacoes[0].status).toBe('PROCESSADO');
  });
});
