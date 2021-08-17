import { Test, TestingModule } from '@nestjs/testing';
import { IextendedRequest } from '../shared/interfaces/extendedRequest.inteface';
import { ChecksController } from './checks.controller';
import { ChecksService } from './checks.service';
import { CreateCheckDto } from './dto/create-check.dto';

describe('ChecksController', () => {
  let controller: ChecksController;
  const checkService = {} as unknown as ChecksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChecksController],
      providers: [
        ChecksService,
        { provide: ChecksService, useValue: checkService },
      ],
    }).compile();

    controller = module.get<ChecksController>(ChecksController);
  });

  it('should be defined and have the needed methods', () => {
    expect(controller).toBeDefined();
    expect(controller).toHaveProperty('create');
    expect(controller).toHaveProperty('findAll');
    expect(controller).toHaveProperty('getReports');
    expect(controller).toHaveProperty('findOne');
    expect(controller).toHaveProperty('remove');
  });

  describe('create method', () => {
    it('Should call service create method with correct arguments', async () => {
      // data
      const req = { user: { id: 'test-id' } } as unknown as IextendedRequest;
      const createCheckDto = { name: 'test' } as CreateCheckDto;
      // mocks
      checkService.create = jest.fn();
      // actions
      await controller.create(createCheckDto, req);
      // assertions
      expect(checkService.create).toBeCalledWith(req.user, createCheckDto);
    });

    it('Should return what service create method returns', async () => {
      // data
      const req = { user: { id: 'test-id' } } as unknown as IextendedRequest;
      const createCheckDto = { name: 'test' } as CreateCheckDto;
      // mocks
      checkService.create = jest.fn().mockResolvedValueOnce('test');
      // actions
      const res = await controller.create(createCheckDto, req);
      // assertions
      expect(res).toEqual('test');
    });
  });
  describe('findAll method', () => {
    it('Should call service findAll method with correct arguments', async () => {
      // data
      const req = { user: { id: 'test-id' } } as unknown as IextendedRequest;
      // mocks
      checkService.findAll = jest.fn();
      // actions
      await controller.findAll(req);
      // assertions
      expect(checkService.findAll).toBeCalledWith(req.user);
    });

    it('Should return what service findAll method returns', async () => {
      // data
      const req = { user: { id: 'test-id' } } as unknown as IextendedRequest;
      // mocks
      checkService.findAll = jest.fn().mockResolvedValueOnce('test');
      // actions
      const res = await controller.findAll(req);
      // assertions
      expect(res).toEqual('test');
    });
  });
  describe('getReports method', () => {
    it('Should call service getCheckReport method with correct arguments', async () => {
      // data
      const req = { user: { id: 'test-id' } } as unknown as IextendedRequest;
      const checkId = 'check-id';
      // mocks
      checkService.getCheckReport = jest.fn();
      // actions
      await controller.getReports(checkId, req);
      // assertions
      expect(checkService.getCheckReport).toBeCalledWith(req.user, checkId);
    });

    it('Should return what service getCheckReport method returns', async () => {
      // data
      const req = { user: { id: 'test-id' } } as unknown as IextendedRequest;
      const checkId = 'check-id';
      // mocks
      checkService.getCheckReport = jest.fn().mockResolvedValueOnce('test');
      // actions
      const res = await controller.getReports(checkId, req);
      // assertions
      expect(res).toEqual(res);
    });
  });
  describe('findOne method', () => {
    it('Should call service findOne method with correct arguments', async () => {
      // data
      const req = { user: { id: 'test-id' } } as unknown as IextendedRequest;
      const checkId = 'check-id';
      // mocks
      checkService.findOne = jest.fn();
      // actions
      await controller.findOne(checkId, req);
      // assertions
      expect(checkService.findOne).toBeCalledWith(checkId, req.user);
    });

    it('Should return what service findOne method returns', async () => {
      // data
      const req = { user: { id: 'test-id' } } as unknown as IextendedRequest;
      const checkId = 'check-id';
      // mocks
      checkService.findOne = jest.fn().mockResolvedValueOnce('test');
      // actions
      const res = await controller.findOne(checkId, req);
      // assertions
      expect(res).toEqual('test');
    });
  });
  describe('remove method', () => {
    it('Should call remove method with correct arguments', async () => {
      // data
      const req = { user: { id: 'test-id' } } as unknown as IextendedRequest;
      const checkId = 'check-id';
      // mocks
      checkService.remove = jest.fn();
      // actions
      await controller.remove(checkId, req);
      // assertions
      expect(checkService.remove).toBeCalledWith(checkId, req.user);
    });
  });
});
