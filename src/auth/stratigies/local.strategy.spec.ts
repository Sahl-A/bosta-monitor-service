import { UnauthorizedException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../auth.service';
import { LocalStrategy } from './local.strategy';

describe('LocalStrategy', () => {
  let service: LocalStrategy;
  const authService = {} as unknown as AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LocalStrategy,
        { provide: AuthService, useValue: authService },
      ],
    }).compile();

    service = module.get<LocalStrategy>(LocalStrategy);
  });

  it('should be defined and have the necessary methods', () => {
    expect(service).toBeDefined();
    expect(service).toHaveProperty('validate');
  });

  describe('validate', () => {
    it('Should call validateUser with correct parameters', async () => {
      // data
      const email = 'test-email';
      const password = 'test-password';
      const user = { id: 'test-id' };

      // mocks
      authService.validateUser = jest.fn().mockResolvedValueOnce(user);

      // actions
      await service.validate(email, password);

      // assertions
      expect(authService.validateUser).toBeCalledWith(email, password);
    });

    it('Should throw error if no user is found', () => {
      // data
      const email = 'test-email';
      const password = 'test-password';

      // mocks
      authService.validateUser = jest.fn().mockResolvedValueOnce(undefined);

      // actions
      const res = service.validate(email, password);

      // assertions
      expect(res).rejects.toThrowError(new UnauthorizedException());
    });

    it('Should return found user', async () => {
      // data
      const email = 'test-email';
      const password = 'test-password';
      const user = { id: 'test-id' };

      // mocks
      authService.validateUser = jest.fn().mockResolvedValueOnce(user);

      // actions
      const res = await service.validate(email, password);

      // assertions
      expect(res).toEqual(user);
    });
  });
});
