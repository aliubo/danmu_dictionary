import sys
import os

# 罗马字到平假名的映射表
ROMAJI2HIRA = {
    # 基本五十音
    'a': 'あ', 'i': 'い', 'u': 'う', 'e': 'え', 'o': 'お',
    'ka': 'か', 'ki': 'き', 'ku': 'く', 'ke': 'け', 'ko': 'こ',
    'sa': 'さ', 'si': 'し', 'su': 'す', 'se': 'せ', 'so': 'そ',
        'shi': 'し',
    'ta': 'た', 'ti': 'ち', 'tu': 'つ', 'te': 'て', 'to': 'と',
        'chi': 'ち', 'tsu': 'つ',
    'na': 'な', 'ni': 'に', 'nu': 'ぬ', 'ne': 'ね', 'no': 'の',
    'ha': 'は', 'hi': 'ひ', 'hu': 'ふ', 'he': 'へ', 'ho': 'ほ',
        'fu': 'ふ',
    'ma': 'ま', 'mi': 'み', 'mu': 'む', 'me': 'め', 'mo': 'も',
    'ya': 'や', 'yu': 'ゆ', 'yo': 'よ',
    'ra': 'ら', 'ri': 'り', 'ru': 'る', 're': 'れ', 'ro': 'ろ',
    'wa': 'わ', 'wi': 'ゐ', 'we': 'ゑ', 'wo': 'を',
    'n': 'ん', # 'nn': 'ん',

    # 浊音 和半浊音
    'ga': 'が', 'gi': 'ぎ', 'gu': 'ぐ', 'ge': 'げ', 'go': 'ご',
    'za': 'ざ', 'ji': 'じ', 'zu': 'ず', 'ze': 'ぜ', 'zo': 'ぞ',
    'da': 'だ', 'di': 'ぢ', 'du': 'づ', 'de': 'で', 'do': 'ど',
        'dji': 'ぢ', 'dzu': 'づ',
    'ba': 'ば', 'bi': 'び', 'bu': 'ぶ', 'be': 'べ', 'bo': 'ぼ',
    'pa': 'ぱ', 'pi': 'ぴ', 'pu': 'ぷ', 'pe': 'ぺ', 'po': 'ぽ',
    
    # 组合音
    'kya': 'きゃ', 'kyu': 'きゅ', 'kyo': 'きょ',
    'gya': 'ぎゃ', 'gyu': 'ぎゅ', 'gyo': 'ぎょ',
    'sha': 'しゃ', 'shu': 'しゅ', 'sho': 'しょ',
    "jya": 'じゃ', "jyu": 'じゅ', "jyo": 'じょ',
        'ja': 'じゃ', 'ju': 'じゅ', 'jo': 'じょ',
    "tya": 'ちゃ', "tyu": 'ちゅ', "tyo": 'ちょ',
        'cha': 'ちゃ', 'chu': 'ちゅ', 'cho': 'ちょ',
    'nya': 'にゃ', 'nyu': 'にゅ', 'nyo': 'にょ',
    'hya': 'ひゃ', 'hyu': 'ひゅ', 'hyo': 'ひょ',
    'bya': 'びゃ', 'byu': 'びゅ', 'byo': 'びょ',
    'pya': 'ぴゃ', 'pyu': 'ぴゅ', 'pyo': 'ぴょ',
    'mya': 'みゃ', 'myu': 'みゅ', 'myo': 'みょ',
    'rya': 'りゃ', 'ryu': 'りゅ', 'ryo': 'りょ',
    
    # 长音符号
    # 'ou': 'おう', 'oo': 'おお', 'uu': 'うう', 'ii': 'いい', 'ee': 'ええ', 'aa': 'ああ',
}

MAX_ROMAJI_LEN = max(len(k) for k in ROMAJI2HIRA.keys())
MIN_ROMAJI_LEN = min(len(k) for k in ROMAJI2HIRA.keys())

def announce_to_hinagara(announce):
    # Convert the announce string to hiragana
    # example hikari -> ひかり, yokatta -> よかった, kyou -> きょう
        
    # 处理多个发音的情况（用逗号或斜杠分隔）
    if ',' in announce:
        parts = []
        for part in announce.split(','):
            parts.append(announce_to_hinagara(part.strip()))
        return ', '.join(parts)
    elif '/' in announce:
        parts = []
        for part in announce.split('/'):
            parts.append(announce_to_hinagara(part.strip()))
        return '/'.join(parts)
    
    announce = announce.lower()
    
    hiragana = ""
    i = 0
    
    while i < len(announce):
        # 处理空格
        if announce[i] == ' ':
            hiragana += ' '
            i += 1
            continue
            
        # 处理促音（っ）- 双辅音
        if i + 1 < len(announce):
            current_char = announce[i]
            next_char = announce[i + 1]
            
            # 检查是否是促音的情况（双辅音）
            if (current_char == next_char and 
                current_char in 'kgsztdpbmyrwcf' and 
                current_char not in 'aiueon'):
                hiragana += 'っ'
                i += 1
                continue

        # 从最长的组合开始检查
        for length in range(MAX_ROMAJI_LEN, MIN_ROMAJI_LEN - 1, -1):
            if i + length <= len(announce):
                segment = announce[i:i+length]
                if segment in ROMAJI2HIRA:
                    hiragana += ROMAJI2HIRA[segment]
                    i += length
                    break
        else:
            # 如果没有匹配到任何罗马字，保留原字符（可能是标点符号等）
            if announce[i] == '’':
                continue  # 忽略撇号
            hiragana += announce[i]
            i += 1
    
    return hiragana

def main():
    filepath = sys.argv[1]
    outputpath = sys.argv[2] if len(sys.argv) > 2 else "output.txt"

    if os.path.exists(outputpath):
        print (f"Output file '{outputpath}' already exists. Overwriting.")
        os.remove(outputpath)

    content = ""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    words = content.splitlines()
    words = [word.strip() for word in words if word.strip()]
    words = [[t.strip() for t in word.split("\t")] for word in words]
    
    # words: [(word, announce, means), ...]
    with open(outputpath, 'w', encoding='utf-8') as f:
        for word in words:
            w = word[0]
            announce = word[1]
            means = " ".join(word[2:])

            hinagara = announce_to_hinagara(announce)
            for ch in hinagara:
                if ord(ch) >= ord('a') and ord(ch) <= ord('z'):
                    print(f"Invalid character word '{w}' in announce: '{announce}' -> '{hinagara}'")
                    break

            f.write(f"{w}\t{hinagara}\t{means}\n")


if __name__ == "__main__":
    main()
