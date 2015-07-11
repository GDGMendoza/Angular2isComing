export declare class Segment {
    name: string;
    regex: string;
}
export declare class ContinuationSegment extends Segment {
    generate(params: any): string;
}
export declare class PathRecognizer {
    path: string;
    handler: any;
    segments: List<Segment>;
    regex: RegExp;
    specificity: number;
    terminal: boolean;
    constructor(path: string, handler: any);
    parseParams(url: string): StringMap<string, string>;
    generate(params: StringMap<string, string>): string;
}
