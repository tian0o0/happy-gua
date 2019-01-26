interface Options {
    ele?: string;
    radius?: number;
    coverColor?: string;
    coverText?: string;
    coverPic?: string;
    ratio?: number;
    callback?: Function;
}
export default class HappyGua {
    canvas: any;
    ctx: any;
    wrapEle: any;
    innerEle: any;
    canvasW: number;
    canvasH: number;
    supportTouch: boolean;
    events: any[];
    startEventHandler: Function;
    moveEventHandler: Function;
    endEventHandler: Function;
    defaultOptions: Options;
    constructor(options: Options);
    init(options: any): void;
    createCanvas(): void;
    eventDetect(): void;
    listenStart(): void;
    clearAll(): void;
    calcRatio(callback: any): void;
}
export {};
