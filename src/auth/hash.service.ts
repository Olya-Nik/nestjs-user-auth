import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class HashService {
  async hashPassword(password) {
    const salt = await bcrypt.genSalt();
    return await bcrypt.hash(password, salt);
  }

  async comparePassword(password, hash) {
    const isMatch = await bcrypt.compare(password, hash);
    console.log('IsMatch: ', isMatch);
    return isMatch;
  }
}
