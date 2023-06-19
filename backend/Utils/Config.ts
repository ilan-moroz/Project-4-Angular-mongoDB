class Config {
  public isDevelopment: boolean = false;
  public connectionString: string = "";
  public webPort: number = 4000;
  public myHost: string = "";
  public myUser: string = "";
  public myPassword: string = "";
  public myDatabase: string = "";
}

class DevelopmentConfig extends Config {
  constructor() {
    super();
    this.isDevelopment = true;
    this.connectionString =
      "mongodb://root:12345678@localhost:27017/MyStore?authSource=admin";
    this.webPort = 4000;
    this.myHost = "localhost";
    this.myUser = "root";
    this.myPassword = "12345678";
    this.myDatabase = "MyStore";
  }
}

class ProductionConfig extends Config {
  constructor() {
    super();
    this.isDevelopment = false;
    this.connectionString = "mongodb://10.10.10.10/local";
  }
}

const config =
  process.env.NODE_ENV === "production"
    ? new ProductionConfig()
    : new DevelopmentConfig();

export default config;
