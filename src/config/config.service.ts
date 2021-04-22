import * as dotenv from 'dotenv';
import * as fs from 'fs';

export class ConfigService {
  private readonly envConfig: {[key: string]: string};

  constructor(filePath: string) {
    // stock the file
    try {
      this.envConfig = dotenv.parse(fs.readFileSync(filePath));
    } catch (err) {
      this.envConfig = {};
    }
  }

  /**
   * get specific value in .env file
   * @param {string} key the key to the value sought
   * @return {string} env value
   */
  get(key: string): string {
    return Object.keys(this.envConfig).length !== 0 ? this.envConfig[key] : process.env[key];
  }

  /**
   * get the mongo uri fully qualified
   * @return {string} the ready to use mongo uri
   */
  qualifiedMongoUri(): string {

    let uri: string;
    if (process.env.MONGO_URL) {
      uri = process.env.MONGO_URL;
    } else if (this.get('MONGO_URL')) {
      uri = this.get('MONGO_URL');
    } else if (this.get('db_user') && this.get('db_pass')) {
      uri = `mongodb://${this.get('db_user')}:${this.get('db_pass')}@${this.get('db_uri')}:${this.get('db_port')}/${this.get('db_name')}`;
    } else {
      uri = `mongodb://${this.get('db_uri')}:${this.get('db_port')}/${this.get('db_name')}`;
    }
    return uri;
  }
}
