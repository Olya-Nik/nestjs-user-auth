import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { HashService } from '../auth/hash.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private hashService: HashService,
  ) {}
  async createAndSave(username: string, password: string) {
    const user = new User();
    user.username = username;
    user.password = await this.hashService.hashPassword(password);
    return this.usersRepository.save(user);
  }
  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findOne(username: string): Promise<User> {
    const users = await this.usersRepository.find({
      where: { username },
    });
    return users[0];
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
