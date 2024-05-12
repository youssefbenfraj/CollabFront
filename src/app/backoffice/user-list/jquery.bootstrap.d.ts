// jquery.bootstrap.d.ts
import 'jquery';

declare global {
  interface JQuery {
    modal(action?: string | object): JQuery;
  }
}
