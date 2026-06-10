# New Concept English 自习室

一个面向新概念英语自学的纯前端练习网站，支持课文浏览、翻译挑战、默写挑战、随机练习、错题复习和学习记录。

线上地址：https://new-nu-eight-32.vercel.app

## 功能

- 游客可直接浏览首页、课程和课文内容。
- 登录后可保存学习记录、错题集和随机挑战选择。
- 课程页支持按册查看课文，并进入翻译或默写挑战。
- 第 1 册单数课已接入本地正版授权美音音频，支持课程详情页播放、LRC 下载和练习页逐句播放。
- 第 1 册双数课详情页使用与单数课一致的正文排版，展示英文原文和中文翻译。
- 翻译和默写练习页支持逐句播放，并提供 0.5 倍速和常速两个喇叭按钮；会优先播放预生成 AI 语音，其次播放精确教材音频切片，最后使用浏览器英文朗读兜底。
- 随机挑战支持选择课文范围和句子数量。
- 错题集会展示错误次数和连续答对状态，连续答对 2 次后自动移出错题集。
- 首页仪表盘展示今日继续学习、最近练习和错题数量。

## 最近更新

- 降低登录门槛：未登录用户可以先浏览首页、课程列表和课文详情，开始练习时再提示登录。
- 首页新增学习仪表盘：展示今日继续学习、最近练习和错题数量，比大面积 Hero 更贴近日常学习。
- 优化课程页桌面布局：收紧课程侧栏和内容区域间距，减少大屏空白浪费。
- 优化移动端体验：降低导航区域高度，课程页在手机端改为更自然的单列布局。
- 强化错题集状态：展示错题的错误次数和连续答对次数，帮助判断掌握程度。
- 完善项目 README：补充网站用途、功能、部署地址、使用方式和数据说明。
- 统一第 1 册双数课正文展示：课程详情页不再展开冗长练习讲义，改为英文原文和中文翻译。
- 升级逐句播放：每句提供 0.5 倍速和常速按钮，并预留 AI 语音 MP3 资源映射，避免使用不匹配的双数课音频文件。

## 使用方式

直接打开 `index.html` 即可本地预览，也可以部署到 Vercel、GitHub Pages 等静态托管平台。

本地自动化测试建议通过静态服务访问，避免浏览器工具拦截 `file://` 页面：

```text
python3 -m http.server 5173

http://localhost:5173/#course/1
http://localhost:5173/#lesson/1-1
http://localhost:5173/#translation/1-1
http://localhost:5173/#dictation/1-1
```

```text
index.html      页面结构
styles.css      页面样式和响应式布局
app.js          页面交互、练习和导航逻辑
data.js         课程数据、本地账号、学习记录和错题数据
ai-speech-manifest.js  预生成 AI 逐句语音资源索引
assets/audio/   本地音频与歌词资源
```

## 生成 AI 逐句语音

预生成语音只在本地执行，API key 不会写入前端代码。脚本使用阿里云百炼 DashScope 非实时语音合成接口，默认使用你当前语音模型额度里的 `qwen3-tts-instruct-flash` + `Cherry`。慢速音频通过朗读指令控制，常速使用自然课堂语速。

先设置 `DASHSCOPE_API_KEY`，再运行生成脚本：

```text
DASHSCOPE_API_KEY=你的_key node scripts/generate-ai-speech.mjs --lessons=2,4
```

确认音色满意后，可以批量生成第 1 册双数课：

```text
DASHSCOPE_API_KEY=你的_key node scripts/generate-ai-speech.mjs --all-even
```

脚本会把音频保存到 `assets/audio/nce1-ai/`，并自动更新 `ai-speech-manifest.js`。可以通过 `--voice=Cherry`、`--model=qwen3-tts-instruct-flash` 或 `--language=English` 调整；重复生成时默认跳过已有文件，需要覆盖时加 `--overwrite=true`。

如果想试 CosyVoice 方案，可以指定：

```text
DASHSCOPE_API_KEY=你的_key node scripts/generate-ai-speech.mjs --engine=cosyvoice --model=cosyvoice-v3-flash --voice=loongabby_v3 --format=mp3 --lessons=2,4
```

第 1 册全部双数课约会生成 1384 个逐句音频文件，建议先用少量课程确认音色和语速。接口参考：[阿里云百炼非实时语音合成](https://help.aliyun.com/zh/model-studio/non-realtime-tts-user-guide)、[CosyVoice API](https://help.aliyun.com/zh/model-studio/cosyvoice-tts-http-api) 与 [Qwen-TTS API](https://help.aliyun.com/zh/model-studio/qwen-tts-api) 文档。

## 数据说明

当前版本使用浏览器 `localStorage` 保存账号、学习记录和错题数据，适合个人自用或演示。不要把它当作正式的用户认证系统；如果要开放给多人长期使用，建议接入后端账号系统和数据库。

## 部署

这是一个静态网站，不需要构建步骤。将仓库导入 Vercel 后，保持默认静态站点配置即可部署。
