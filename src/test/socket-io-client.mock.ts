import {} from 'jasmine';

export const socketMock = {
  on: jasmine.createSpy('on'),
};

export const io = () => socketMock;
