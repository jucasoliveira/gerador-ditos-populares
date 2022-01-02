import { Language } from './languages.enum';
import { Theme } from './themes.enum';

export interface CarbonParameters {
  code: string;
  theme?: Theme;
  language?: Language;
  output?: string;
}
