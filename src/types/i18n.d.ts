import 'vue-i18n';
import type { MessageSchema } from '../plugins/i18n';

declare module 'vue-i18n' {
  export interface DefineLocaleMessage extends MessageSchema {}
  export interface DefineDateTimeFormat {}
  export interface DefineNumberFormat {}
}
