import { TestBed } from '@angular/core/testing';
import { NotificacaoService } from './notificacao.service';
import {
  provideHttpClientTesting,
  HttpTestingController,
} from '@angular/common/http/testing';
import { importProvidersFrom } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('NotificacaoService', () => {
  let service: NotificacaoService;
  let httpMock: HttpTestingController;
  let socketOnSpy: jasmine.Spy<
    (event: string, cb: (data: any) => void) => void
  >;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        NotificacaoService,
        provideHttpClientTesting(),
        importProvidersFrom(HttpClientTestingModule),
      ],
    });

    service = TestBed.inject(NotificacaoService);
    httpMock = TestBed.inject(HttpTestingController);

    const socket = service['socket'];
    socketOnSpy = spyOn(socket, 'on');
    socketOnSpy.calls.reset();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('enviarNotificacao should perform HTTP POST with correct body', () => {
    const mensagemId = '123';
    const conteudoMensagem = 'Teste';

    service.enviarNotificacao(mensagemId, conteudoMensagem).subscribe();

    const req = httpMock.expectOne('http://localhost:8080/api/notificar');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ mensagemId, conteudoMensagem });

    req.flush({ success: true });
  });

  it('onStatusUpdate should listen to socket statusUpdate event and emit data', (done) => {
    let statusCallback: (data: any) => void;

    socketOnSpy.and.callFake((event: string, callback: (data: any) => void) => {
      if (event === 'statusUpdate') {
        statusCallback = callback;
      }
    });

    service.onStatusUpdate().subscribe((data) => {
      expect(data).toEqual({ status: 'ok' });
      done();
    });

    statusCallback!({ status: 'ok' });
  });
});
