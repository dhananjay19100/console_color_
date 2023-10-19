const _console = (msg:string,color?:string,background?:string) =>{
    console.log("%c".concat(msg), "background: ".concat(background, "; color: ").concat(color));
}
export {_console};