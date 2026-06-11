# New Concept English 自习室

一个面向《新概念英语》自学的纯前端练习网站，支持课文浏览、翻译挑战、默写挑战、随机练习、错题复习、学习记录和逐句音频播放。

线上地址：

- 主域名：https://www.chenshe.asia
- Vercel 地址：https://new-nu-eight-32.vercel.app

## 功能概览

- 游客可直接浏览首页、课程列表和课文详情。
- 登录后可保存学习记录、错题集和随机挑战选择。
- 课程页支持按册查看课文，并进入翻译或默写挑战。
- 第 1 册单数课接入本地美音教材音频，支持课程详情页播放、LRC 下载和练习页逐句播放。
- 第 1 册双数课详情页使用与单数课一致的正文排版，展示英文原文和中文翻译。
- 翻译和默写练习页支持逐句播放，并提供 `0.75x` 慢速和 `1x` 常速两个按钮。
- 随机挑战支持选择课文范围和句子数量。
- 错题集会展示错误次数和连续答对状态，连续答对 2 次后自动移出错题集。
- 首页仪表盘展示今日继续学习、最近练习和错题数量。

## 音频来源与播放优先级

逐句播放时，页面会按下面的顺序查找音频：

1. 优先使用预生成 AI 逐句音频：`assets/audio/nce1-ai/`
2. 如果没有 AI 音频，再使用本地教材美音音频切片：`assets/audio/nce1-us/`
3. 如果前两者都没有，再使用浏览器自带英文朗读兜底

当前慢速按钮不再依赖单独生成的 slow 文件，而是优先用同一条常速音频以 `0.75x` 播放。这样速度更稳定，也能节省后续 AI 生成额度。

## 当前 AI 音频覆盖

AI 音频由阿里云百炼 DashScope 语音模型生成，资源索引写在 `ai-speech-manifest.js`，音频文件保存在 `assets/audio/nce1-ai/`。

当前状态：

- 已覆盖：第 1 册双数课 `Lesson 2` 到 `Lesson 88`
- 已覆盖课程数：44 课
- 已覆盖英文句子数：437 句
- 当前 AI 音频文件数：873 个 `.mp3`，原 `.wav` 文件暂时保留作兜底
- 下一次继续生成：从 `Lesson 90` 开始
- 待生成：`Lesson 90` 到 `Lesson 144` 的双数课，共 28 课、255 句

已生成清单：

| 课文 | 标题 | 句数 |
| --- | --- | ---: |
| Lesson 2 | Is this your...? | 8 |
| Lesson 4 | Is this your……? | 10 |
| Lesson 6 | what make is it? | 8 |
| Lesson 8 | What's your job? | 16 |
| Lesson 10 | Look at… | 12 |
| Lesson 12 | Whose is this... ? This is my... | 12 |
| Lesson 14 | What colour's your…? | 10 |
| Lesson 16 | Are you…? | 10 |
| Lesson 18 | What are their jobs? | 10 |
| Lesson 20 | Look at them! | 12 |
| Lesson 22 | Give me/him/her/us/them a... Which one? | 7 |
| Lesson 24 | Give me/ him/ her/ us/ them some… | 7 |
| Lesson 26 | Where is it? | 8 |
| Lesson 28 | Where are they? | 8 |
| Lesson 30 | What must I do? | 12 |
| Lesson 32 | What's he/ she/ it doing? | 12 |
| Lesson 34 | What are they doing? | 12 |
| Lesson 36 | Where…? | 8 |
| Lesson 38 | What are you going to do? What are you doing now? | 12 |
| Lesson 40 | What are you going to do? I'm going to … | 10 |
| Lesson 42 | Is there a … in/ on that…? Is there any … in/ on that …? | 10 |
| Lesson 44 | Are there any … ? Is there any … ? | 10 |
| Lesson 46 | Can you … ? | 12 |
| Lesson 48 | Do you like … ? Do you want … ? | 10 |
| Lesson 50 | He likes … But he doesn't like | 10 |
| Lesson 52 | What nationality are they? Where do they come from? | 12 |
| Lesson 54 | What nationality are they? Where do they come from? | 12 |
| Lesson 56 | What do they usually do? | 6 |
| Lesson 58 | What's the time? | 10 |
| Lesson 60 | What's the time? | 15 |
| Lesson 62 | What's the matter with them? What must they do? | 9 |
| Lesson 64 | Don't … You mustn't … | 6 |
| Lesson 66 | What's the time? | 6 |
| Lesson 68 | What's the time? | 9 |
| Lesson 70 | When were they there? | 10 |
| Lesson 72 | When did you … ? | 10 |
| Lesson 74 | What did they do? | 10 |
| Lesson 76 | When did you...? | 10 |
| Lesson 78 | When did you...? | 10 |
| Lesson 80 | I must go to the … | 10 |
| Lesson 82 | I had … | 6 |
| Lesson 84 | Have you had …? | 10 |
| Lesson 86 | What have you done? | 10 |
| Lesson 88 | Have you finished yet? | 10 |

待生成清单：

`Lesson 90, 92, 94, 96, 98, 100, 102, 104, 106, 108, 110, 112, 114, 116, 118, 120, 122, 124, 126, 128, 130, 132, 134, 136, 138, 140, 142, 144`

## 非 AI 音频说明

不是 AI 生成的音频来自项目中已导入的《新概念英语 1》美音教材音频，保存在：

```text
assets/audio/nce1-us/
```

这些文件按两课一组命名，例如：

```text
lesson-001-002.mp3
lesson-001-002.lrc
lesson-003-004.mp3
lesson-003-004.lrc
```

其中 `.mp3` 是整段美音教材音频，`.lrc` 是配套歌词/时间轴。当前项目主要把这些教材音频用于第 1 册单数课的课程详情页播放和逐句切片播放。双数课优先使用 AI 逐句音频；没有 AI 音频时会退回浏览器英文朗读。

## 本地使用

直接打开 `index.html` 即可本地预览。更推荐通过静态服务访问，避免部分浏览器限制 `file://` 页面：

```text
python3 -m http.server 5173
```

然后访问：

```text
http://localhost:5173/
http://localhost:5173/#course/1
http://localhost:5173/#lesson/1-1
http://localhost:5173/#translation/1-1
http://localhost:5173/#dictation/1-1
```

## 项目结构

```text
index.html                 页面结构
styles.css                 页面样式和响应式布局
app.js                     页面交互、练习和导航逻辑
data.js                    课程数据、本地账号、学习记录和错题数据
audio-timings.js           教材音频逐句时间轴
ai-speech-manifest.js      预生成 AI 逐句语音资源索引
assets/audio/nce1-us/      本地美音教材音频和 LRC
assets/audio/nce1-ai/      AI 生成的逐句音频
scripts/generate-ai-speech.mjs  AI 逐句语音生成脚本
```

## 继续生成 AI 逐句语音

预生成语音只在本地执行，API key 不会写入前端代码。脚本使用阿里云百炼 DashScope 非实时语音合成接口，默认使用 `qwen3-tts-instruct-flash` + `Cherry`。

下一次建议从 `Lesson 90` 开始：

```text
DASHSCOPE_API_KEY=你的_key node scripts/generate-ai-speech.mjs --lessons=90
```

如果要一次性继续生成剩余双数课，可以直接运行：

```text
DASHSCOPE_API_KEY=你的_key node scripts/generate-ai-speech.mjs --all-even --quiet-skip
```

脚本默认会跳过已有常速音频，所以会从尚未生成的课程继续补齐。当前默认只生成常速音频；页面里的 `0.75x` 慢速按钮会基于同一条常速音频稳定降速。如果确实想同时生成独立 slow 文件，可以额外加：

```text
--generate-slow=true
```

常用参数：

```text
--lessons=90,92,94
--all-even
--quiet-skip
--overwrite=true
--voice=Cherry
--model=qwen3-tts-instruct-flash
--language=English
```

如果想试 CosyVoice 方案，可以指定：

```text
DASHSCOPE_API_KEY=你的_key node scripts/generate-ai-speech.mjs --engine=cosyvoice --model=cosyvoice-v3-flash --voice=loongabby_v3 --format=mp3 --lessons=90
```

接口参考：

- 阿里云百炼非实时语音合成：https://help.aliyun.com/zh/model-studio/non-realtime-tts-user-guide
- CosyVoice API：https://help.aliyun.com/zh/model-studio/cosyvoice-tts-http-api
- Qwen-TTS API：https://help.aliyun.com/zh/model-studio/qwen-tts-api

## 数据说明

当前版本使用浏览器 `localStorage` 保存账号、学习记录和错题数据，适合个人自用或演示。不要把它当作正式的用户认证系统；如果要开放给多人长期使用，建议接入后端账号系统和数据库。

## 部署

这是一个静态网站，不需要构建步骤。将仓库导入 Vercel 后，保持默认静态站点配置即可部署。
