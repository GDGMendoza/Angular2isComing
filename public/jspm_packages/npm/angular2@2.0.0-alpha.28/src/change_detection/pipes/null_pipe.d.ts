import { Pipe, BasePipe, WrappedValue, PipeFactory } from './pipe';
/**
 * @exportedAs angular2/pipes
 */
export declare class NullPipeFactory implements PipeFactory {
    supports(obj: any): boolean;
    create(cdRef: any): Pipe;
}
/**
 * @exportedAs angular2/pipes
 */
export declare class NullPipe extends BasePipe {
    called: boolean;
    static supportsObj(obj: any): boolean;
    supports(obj: any): boolean;
    transform(value: any): WrappedValue;
}
export declare var __esModule: boolean;
