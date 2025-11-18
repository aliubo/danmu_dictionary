import { Danmu, InsertDanmu } from './danmu.js';
import c from './const.js';

const fs = require('fs');
const path = require('path');


class Word {
    constructor(word, hinagara, meaning) {
        this.word = word;
        this.hinagara = hinagara;
        this.meaning = meaning;
    }
}

class WordMgr {
    constructor(filePath, savepath) {
        console.log('WordMgr constructor: Initializing with file path:', filePath, 'and save path:', savepath);
        this.filePath = filePath;
        this.savePath = savepath;
        this.words = [];
        this.saveWords = {};
        this.currlist = new Set();

        /*
            json示例：
            [ {
                "word": "風車",
                "meaning": "1.  windmill; 2.  pinwheel",
                "furigana": "かざぐるま",
                "romaji": "kazaguruma",
                "level": 1
            }, ...]

        */

        fetch(filePath)
            .then(response => response.json())
            .then(data => {
                this.words = data.map(item => {
                    return new Word(item.word, item.furigana, item.meaning);
                });
                console.log('Word data loaded successfully:', this.words.length, 'words found');
            });
        fetch(savepath)
            .then(response => response.json())
            .then(data => {
                this.saveWords = data;
                console.log('Save data loaded successfully:', Object.keys(this.saveWords).length, 'saved words found');
            })
            .catch(error => {
                console.error('Failed to load save file:', error);
            });
    }

    save() {
        fs.writeFileSync(path.resolve(__dirname, this.savePath), JSON.stringify(this.saveWords, null, 2));
    }

    danmuEvent(word, name, danmu) {
        switch(name){
            case 'flagged':
                let val = this.saveWords[word.word] || 0;
                this.saveWords[word.word] = val + 1;
                console.log('Word flagged:', word.word, 'new count:', this.saveWords[word.word]);
                this.save();
                break;
            case 'destroy':
                this.currlist.delete(word.word);
                console.log('Word removed from current list:', word.word, 'remaining:', this.currlist.size);
                if (this.saveWords[word.word] != undefined && !danmu.isFlagged) {
                    this.saveWords[word.word]--;
                    if(this.saveWords[word.word] <= 0) {
                        delete this.saveWords[word.word];
                        console.log('Word removed from saved words:', word.word);
                        this.save();
                    }
                }
                break;
            default:
                break;
        }
    }

    randomWord() {
        if (this.words.length === 0) return null;
        let word = null;

        for(let i = 0; i < 1000; i++){
            let randomIndex = 0;

            const MAGIC_NUMBER = 30;
            let useSavedPossibility = 1.0 * Object.keys(this.saveWords).length / MAGIC_NUMBER;
            useSavedPossibility /= i + 1; // 防止尝试次数过多保护
            let useSavedWord = Math.random() < useSavedPossibility;

            if (useSavedWord) {
                // 根据权重从saveWords随机选一个
                let totalWeight = Object.values(this.saveWords).reduce((sum, val) => sum + val, 0);
                let randomWeight = Math.random() * totalWeight;
                let cumulativeWeight = 0;
                for (let [key, value] of Object.entries(this.saveWords)) {
                    cumulativeWeight += value;
                    if (cumulativeWeight >= randomWeight) {
                        word = this.words.find(w => w.word === key);
                        break;
                    }
                }
            } else {
                randomIndex = Math.floor(Math.random() * this.words.length);
                word = this.words[randomIndex];
            }

            console.log('randomWord', {
                useSavedWord: useSavedWord,
                useSavedPossibility: useSavedPossibility,
                saveWordsCount: Object.keys(this.saveWords).length,
                word: word ? word.word : 'none',
                attempt: i + 1,
            });

            if (!this.currlist.has(word.word)) {
                break;
            }
        }
        return word;
    }

    loadOneWord(){
        let word = this.randomWord();
        if (!word) {
            console.warn('No words available to load');
            return;
        }

        let text = word.word;
        let hiddentext = word.hinagara + ' ' + word.meaning;

        let eventCallback = (name, danmu) => this.danmuEvent(word, name, danmu);

        let danmu = new Danmu(text, hiddentext, eventCallback);
        InsertDanmu(danmu);

        this.currlist.add(word.word);
        console.log('Word loaded successfully:', word.word, 'current list size:', this.currlist.size);
    }

    startPush() {
        console.log('Starting word push with interval:', c.NEXT_WORD_SPAN, 'ms');
        setTimeout(()=>{
            this.loadOneWord();
        }, 1000)
        setInterval(() => {
            this.loadOneWord();
        }, c.NEXT_WORD_SPAN);
    }
}

var wordMgr = new WordMgr(c.WORD_FILE_PATH, c.SAVE_FILE_PATH);

export function start(){
    console.log('WordMgr start function called');
    wordMgr.startPush();
}
