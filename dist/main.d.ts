interface Options {
    ele?: string;
    radius?: number;
    coverColor?: string;
    coverText?: string;
    coverPic?: string;
    ratio?: number;
    complete?: Function;
}
export default class HappyGua {
    canvas: any;
    ctx: any;
    innerEle: any;
    canvasW: number;
    canvasH: number;
    isMobile: boolean;
    events: any[];
    startEventHandler: Function;
    moveEventHandler: Function;
    endEventHandler: Function;
    defaultOptions: Options;
    options: Options;
    constructor(options: Options);
    beforeInit(): this;
    init(): this;
    eventDetect(): this;
    onStart(): void;
    clear(): void;
    calc(callback: Function): void;
}
export {};
