import { Test, TestingModule } from '@nestjs/testing';
import { ClientsService } from './clients.service';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

jest.mock('axios');

const mockInterceptors = {
  addHeader: jest.fn(),
  changeData: jest.fn(),
};

describe('ClientsService', () => {
  let clientsService: ClientsService;

  beforeEach(async () => {
    const mockConfigService = {
      get: jest.fn().mockReturnValue({}),
    };
    (axios.create as jest.Mock).mockReturnValue({
      get: jest.fn(),
    });
    const testClientsModule: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        ClientsService,
        {
          provide: ConfigService,
          useValue: mockConfigService,
        },
        {
          provide: 'axios',
          useValue: axios,
        },
        {
          provide: 'interceptors',
          useValue: mockInterceptors,
        },
      ],
    }).compile();

    clientsService = testClientsModule.get<ClientsService>(ClientsService);
  });

  it('should be defined', () => {
    expect(clientsService).toBeDefined();
  });

  // describe("API's", () => {});
});
