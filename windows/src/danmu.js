import c from './const.js';

export class Danmu {
    constructor(text, hiddentext, eventCallback) {
        this.text = text;
        this.hiddentext = hiddentext || '';
        this.eventCallback = eventCallback;

        this.e_item = null;
        this.e_text = null;
        this.e_flag = null;
        this.e_hiddentext = null;

        this.isFlagged = false;
    }

    genElement() {
        if (this.e_item) return this.e_item;

        this.e_item = this.createElement("div", "danmu-item");
        this.e_text = this.createElement("span", "danmu-text", this.text);
        this.e_flag = this.createElement("span", "danmu-flag");

        this.e_item.appendChild(this.e_text);
        this.e_item.appendChild(this.e_flag);

        if (this.hiddentext) {
            this.e_hiddentext = this.createElement("span", "hidden-text", this.hiddentext);
            this.e_item.appendChild(this.e_hiddentext);
        }

        this.e_item.addEventListener('dblclick', this.onDoubleClick.bind(this));

        return this.e_item;
    }

    onDoubleClick() {
        if (this.isFlagged) return; // 防止重复标记
        
        this.isFlagged = true;
        this.e_flag.textContent = '(flagged)'; // 直接设置文本，更高效
        
        // 触发回调
        if (this.eventCallback) {
            this.eventCallback('flagged', this);
        }
    }

    createElement(tag, className, textContent = '') {
        const element = document.createElement(tag);
        element.className = className;
        if (textContent) element.textContent = textContent;
        return element;
    }

    destroy() {
        if (this.e_item && this.e_item.parentNode) {
            this.e_item.parentNode.removeChild(this.e_item);
        }

        this.eventCallback('destroy', this);

        // 清理引用
        this.e_item = null;
        this.e_text = null;
        this.e_flag = null;
        this.e_hiddentext = null;
        this.eventCallback = null;
    }
}

export function InsertDanmu(danmu) {
    let danmu_list = document.getElementById("danmu-list");

    const danmu_item = danmu.genElement();
    danmu_list.appendChild(danmu_item);

    const timeoutId = setTimeout(() => {
        danmu.destroy();
    }, c.FADE_TIME);

    return () => {
        clearTimeout(timeoutId);
        danmu.destroy();
    };
}
