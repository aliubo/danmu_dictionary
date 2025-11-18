let debugMode = false;

let fileName = 'n4';

let nextWordSpan = debugMode ? 1000 : (()=>{
    switch(fileName){
        case "n5": return 5000;
        case "n4": return 20000;
        case "n3": return 20000;
        case "n2": return 20000;
        case "n1": return 20000;
    }
})();

let fadeTime = nextWordSpan * 30;


export default {
    DEBUG_MODE: debugMode,
    FILE_NAME: fileName,
    WORD_FILE_PATH: `../data/${fileName}.json`,
    SAVE_FILE_PATH: `../data/${fileName}_save.json`,
    FADE_TIME: fadeTime,
    NEXT_WORD_SPAN: nextWordSpan,
}