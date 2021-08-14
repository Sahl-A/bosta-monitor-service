import { EntityRepository, Repository } from 'typeorm';
import { Check } from './check.entity';

@EntityRepository(Check)
export class CheckRepository extends Repository<Check> {}
