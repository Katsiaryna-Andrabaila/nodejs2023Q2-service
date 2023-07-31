import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DbService } from 'src/db/db.service';

const db = new DbService();

@Injectable()
export class UserService {
  create(createUserDto: CreateUserDto) {
    return db.addUser(createUserDto);
  }

  findAll() {
    return db.getUsers();
  }

  findOne(id: string) {
    return db.getUserById(id);
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return db.updateUser(id, updateUserDto);
  }

  remove(id: string) {
    return db.deleteUser(id);
  }
}
