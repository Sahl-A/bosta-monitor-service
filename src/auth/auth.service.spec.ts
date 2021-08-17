import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from '../users/entities/user.repository';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import { BadRequestException } from '@nestjs/common';
import { User } from '../users/entities/user.entity';
import { IjwtPayload } from '../shared/interfaces/jwtPayload.interface';

describe('AuthService', () => {
  let service: AuthService;
  let userService: UsersService;
  const jwtService = { sign: jest.fn().mockReturnValue('token') };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        UsersService,
        UserRepository,
        {
          provide: JwtService,
          useValue: jwtService,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    userService = module.get<UsersService>(UsersService);
  });

  it('should be defined and have the necessary methods', () => {
    expect(service).toBeDefined();
    expect(service).toHaveProperty('validateUser');
    expect(service).toHaveProperty('signup');
    expect(service).toHaveProperty('login');
  });

  describe('validateUser method', () => {
    it('Should get user by email from DB', async () => {
      // data
      const email = 'email';
      const password = 'password';
      const foundUser = {
        id: 'test-id',
      };

      // mocks
      userService.findByEmail = jest.fn().mockResolvedValueOnce(foundUser);
      userService.comparePass = jest.fn();

      // actions
      await service.validateUser(email, password);

      // assertions
      expect(userService.findByEmail).toHaveBeenCalledWith(email);
    });

    it('Should call compare pass with correct parameters', async () => {
      // data
      const email = 'email';
      const password = 'password';
      const foundUser = {
        id: 'test-id',
        password: 'test-pass',
      };

      // mocks
      userService.findByEmail = jest.fn().mockResolvedValueOnce(foundUser);
      userService.comparePass = jest.fn();

      // actions
      await service.validateUser(email, password);

      // assertions
      expect(userService.comparePass).toHaveBeenCalledWith(
        password,
        foundUser.password,
      );
    });

    it('Should return found user', async () => {
      // data
      const email = 'email';
      const password = 'password';
      const foundUser = {
        id: 'test-id',
        password: 'test-pass',
      };

      // mocks
      userService.findByEmail = jest.fn().mockResolvedValueOnce(foundUser);
      userService.comparePass = jest.fn().mockResolvedValueOnce(true);

      // actions
      const res = await service.validateUser(email, password);

      // assertions
      expect(res).toEqual(foundUser);
    });

    it('Should return null if user not found user', async () => {
      // data
      const email = 'email';
      const password = 'password';

      // mocks
      userService.findByEmail = jest.fn().mockResolvedValueOnce(undefined);
      userService.comparePass = jest.fn().mockResolvedValueOnce(true);

      // actions
      const res = await service.validateUser(email, password);

      // assertions
      expect(res).toBeNull();
    });

    it('Should return null if passwords dont match', async () => {
      // data
      const email = 'email';
      const password = 'password';
      const foundUser = {
        id: 'test-id',
        password: 'test-pass',
      };

      // mocks
      userService.findByEmail = jest.fn().mockResolvedValueOnce(foundUser);
      userService.comparePass = jest.fn().mockResolvedValueOnce(false);

      // actions
      const res = await service.validateUser(email, password);

      // assertions
      expect(res).toBeNull();
    });
  });

  describe('signup', () => {
    it('Should check email existence by calling findByEmail with correct parameter', async () => {
      // data
      const dto = {
        email: 'test-email',
      } as any;
      const currUser = {
        uuid: 'test-id',
        email: 'test-email',
      };

      // mocks
      userService.findByEmail = jest.fn().mockResolvedValueOnce(undefined);
      userService.create = jest.fn().mockResolvedValueOnce(currUser);

      // actions
      await service.signup(dto);

      // assertions
      expect(userService.findByEmail).toHaveBeenCalledWith(dto.email);
    });

    it('Should throw error if there is a user with the email', () => {
      // data
      const dto = {
        email: 'test-email',
      } as any;
      const foundUser = {
        id: 'test-id',
      };
      const currUser = {
        uuid: 'test-id',
        email: 'test-email',
      };

      // mocks
      userService.findByEmail = jest.fn().mockResolvedValueOnce(foundUser);
      userService.create = jest.fn().mockResolvedValueOnce(currUser);

      // assertions
      expect(service.signup(dto)).rejects.toThrowError(
        new BadRequestException('Please choose another email'),
      );
    });

    it('Should return a token', async () => {
      // data
      const dto = {
        email: 'test-email',
      } as any;
      const output = {
        token: 'token',
      };
      const currUser = {
        uuid: 'test-id',
        email: 'test-email',
      };

      // mocks
      userService.findByEmail = jest.fn().mockResolvedValueOnce(undefined);
      userService.create = jest.fn().mockResolvedValueOnce(currUser);

      // actions
      const res = await service.signup(dto);

      // assertions
      expect(res).toEqual(output);
    });
  });

  describe('login', () => {
    it('Should call sign method with correct payload', async () => {
      // data
      const user = {
        email: 'email-test',
        uuid: 'test-uuid',
      } as unknown as User;
      const payload: IjwtPayload = { email: user.email, uuid: user.uuid };

      // actions
      await service.login(user);

      // assertions
      expect(jwtService.sign).toBeCalledWith(payload);
    });

    it('Should return token', async () => {
      // data
      const user = {
        email: 'email-test',
        uuid: 'test-uuid',
      } as unknown as User;
      const output = {
        token: 'token',
      };

      // actions
      const res = await service.login(user);

      // assertions
      expect(res).toEqual(output)
    });
  });
});
