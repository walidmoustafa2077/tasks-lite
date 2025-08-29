import bcrypt from 'bcryptjs';
import config from '../config/config.js';

class PasswordHelper {
  static async hashPassword(password) {
    return await bcrypt.hash(password, config.BCRYPT_SALT_ROUNDS);
  }

  static async comparePassword(password, hashedPassword) {
    return await bcrypt.compare(password, hashedPassword);
  }
}

export default PasswordHelper;
