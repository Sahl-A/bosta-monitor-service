import { Test, TestingModule } from '@nestjs/testing';
import { Itoken } from '../shared/interfaces/token.interface';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { IextendedRequest } from 'src/shared/interfaces/extendedRequest.inteface';

describe('AuthController', () => {
  let controller: AuthController;
  const authService = {} as any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [{ provide: AuthService, useValue: authService }],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined and have the necessary methods', () => {
    expect(controller).toBeDefined();
    expect(controller).toHaveProperty('login');
    expect(controller).toHaveProperty('signup');
  });

  describe('singup method', () => {
    it('Should return signup service method return', async () => {
      // data
      const dto: SignupDto = {
        email: 'email',
        name: 'name',
        password: 'pass',
        passwordConfirm: 'confiPass',
      };
      const token: Itoken = {
        token: 'token',
      };

      // mocks
      authService.signup = jest.fn().mockResolvedValueOnce(token);

      // actions
      const res = await controller.signup(dto);

      // assertions
      expect(res).toEqual(token);
    });

    it('Should call signup service with correct arguments', async () => {
      // data
      const dto: SignupDto = {
        email: 'email',
        name: 'name',
        password: 'pass',
        passwordConfirm: 'confiPass',
      };
      const token: Itoken = {
        token: 'token',
      };

      // mocks
      authService.signup = jest.fn().mockResolvedValueOnce(token);

      // actions
      await controller.signup(dto);

      // assertions
      expect(authService.signup).toHaveBeenCalledWith(dto);
    });
  });

  describe('login method', () => {
    it('Should return what login service method returns', async () => {
      // data
      const req = {
        user: { id: 'test' } as any,
      } as IextendedRequest;
      const token: Itoken = {
        token: 'token',
      };

      // mocks
      authService.login = jest.fn().mockResolvedValueOnce(token);

      // actions
      const res = await controller.login(req);

      // assertions
      expect(res).toEqual(token);
    });

    it('Should call login service method with correct arguments', async () => {
      // data
      const req = {
        user: { id: 'test' } as any,
      } as IextendedRequest;
      const token: Itoken = {
        token: 'token',
      };

      // mocks
      authService.login = jest.fn().mockResolvedValueOnce(token);

      // actions
      await controller.login(req);

      // assertions
      expect(authService.login).toHaveBeenCalledWith(req.user);
    });
  });
});
