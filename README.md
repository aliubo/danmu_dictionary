# 日语弹幕词典 (Danmu Dictionary)

一个基于 Electron 的日语词汇学习应用，以弹幕形式在桌面上显示 JLPT 词汇，帮助用户在日常工作学习中潜移默化地记忆日语单词。

## ✨ 特性

- 🎯 **弹幕式学习**: 单词以弹幕形式悬浮显示，不干扰其他应用
- 📚 **完整词库**: 包含 JLPT N1-N5 全等级词汇（约2000+单词）
- 🧠 **智能复习**: 支持标记难词，增加出现频率
- 💾 **学习记录**: 自动保存学习进度和复习数据
- 🎨 **简洁界面**: 透明悬浮窗，可拖拽移动
- ⚙️ **灵活配置**: 可调整学习等级和时间间隔

## 🖼️ 效果展示

- 单词以弹幕形式从屏幕底部向上滚动
- 鼠标悬停显示平假名读音和英文释义
- 双击单词标记为需要重点复习
- 透明窗口，不遮挡其他应用

## 🚀 快速开始

### 环境要求

- Node.js (推荐 v16+)
- npm 或 yarn

### 安装运行

```bash
# 克隆项目
git clone https://github.com/aliubo/danmu_dictionary.git
cd danmu_dictionary

# 安装依赖
npm install
# 或使用 yarn
yarn install

# 启动应用
npm start
# 或使用 yarn
yarn start
```

## 🎮 使用方法

### 基本操作

1. **查看释义**: 鼠标悬停在单词上查看平假名和英文释义
2. **标记难词**: 双击不熟悉的单词进行标记，该词会更频繁出现
3. **移动窗口**: 点击左上角白色小方块拖动窗口位置
4. **退出应用**: 直接关闭窗口

### 学习等级配置

编辑 `src/const.js` 文件中的 `fileName` 变量来切换学习等级：

```javascript
let fileName = 'n4'; // 可选: n5, n4, n3, n2, n1
```

各等级配置：
- **N5**: 最基础词汇，5秒间隔
- **N4**: 初级词汇，20秒间隔（默认）
- **N3**: 中级词汇，20秒间隔
- **N2**: 中高级词汇，20秒间隔
- **N1**: 高级词汇，20秒间隔

## 📁 项目结构

```
danmu_dictionary/
├── main.js              # Electron 主进程
├── package.json         # 项目配置
├── src/                 # 源代码
│   ├── index.html       # 主页面
│   ├── index.css        # 样式文件
│   ├── index.js         # 入口文件
│   ├── const.js         # 配置常量
│   ├── wordmgr.js       # 词汇管理器
│   └── danmu.js         # 弹幕组件
├── words/               # 词汇数据
│   ├── jplt-n1_japanese_english.tsv
│   ├── jplt-n2_japanese_english.tsv
│   ├── jplt-n3_japanese_english.tsv
│   ├── jplt-n4_japanese_english.tsv
│   ├── jplt-n5_japanese_english.tsv
│   └── conv.py          # 数据转换脚本
└── README.md
```

## 🔧 高级配置

### 调试模式

在 `src/const.js` 中设置 `debugMode = true` 可以：
- 缩短单词出现间隔至1秒
- 启用调试窗口（取消注释 `//...debugAttr`）

### 自定义词汇

词汇文件格式为 TSV（制表符分隔），格式如下：

```
単語    ひらがな    English meaning
```

例如：
```
上がる  agaru   to rise, to ascend
挨拶    aisatsu greeting, salutation
```

### 学习数据

应用会在 `../data/` 目录下生成学习记录文件：
- `{level}_save.json`: 保存标记的单词及其权重

## 🛠️ 开发相关

### 可用脚本

```bash
npm start    # 启动应用
npm test     # 运行测试（当前为占位符）
```

### 技术栈

- **Electron**: 跨平台桌面应用框架
- **Vanilla JavaScript**: 纯 JavaScript，无额外框架依赖
- **CSS3**: 透明效果和动画
- **TSV**: 词汇数据存储格式

### Remote VSCode 调试

如果在远程开发环境中使用，可以考虑：

1. **控制台模式**: 修改 `debugMode = true`，输出到控制台
2. **Web版本**: 创建简单HTTP服务器，通过浏览器访问
3. **X11转发**: 使用 `ssh -X` 连接远程服务器

## 🤝 贡献指南

欢迎提交 Issue 和 Pull Request！

1. Fork 本仓库
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 📝 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 🙏 致谢

- JLPT 词汇数据来源于公开的日语学习资源
- 感谢所有为日语学习社区做出贡献的开发者

## 📞 支持

如果您在使用过程中遇到问题，请：

1. 查看 [Issues](https://github.com/aliubo/danmu_dictionary/issues) 页面
2. 创建新的 Issue 描述问题
3. 或者联系项目维护者

---

**开始您的日语学习之旅吧！** 🎌✨