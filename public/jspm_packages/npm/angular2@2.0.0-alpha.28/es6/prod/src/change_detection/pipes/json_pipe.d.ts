import { Pipe, BasePipe } from './pipe';
/**
 * Implements json transforms to any object.
 *
 * # Example
 *
 * In this example we transform the user object to json.
 *
 *  ```
 * @Component({
 *   selector: "user-cmp"
 * })
 * @View({
 *   template: "User: {{ user | json }}"
 * })
 * class Username {
 *  user:Object
 *  constructor() {
 *    this.user = { name: "PatrickJS" };
 *  }
 * }
 *
 * ```
 *
 * @exportedAs angular2/pipes
 */
export declare class JsonPipe extends BasePipe {
    transform(value: any): string;
    create(cdRef: any): Pipe;
}
