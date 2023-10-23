import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'ionic.mydigitalwallet',
  appName: 'mydigitalwallet',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  }
};

export default config;
