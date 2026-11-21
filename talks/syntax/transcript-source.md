# AI 帮你写代码，哪些判断还得自己做

Scott Tolinski、CJ Reynolds

中英整理稿

中文和英文均为按演讲整理的编辑转述。带时间戳的英文机器转写原文可在下方来源说明打开。

依据 11 月 12 日主直播午间对谈选编。两位主持人的话题交叉，正文用共同讨论归属。节目里的报道、产品体验及猜模型游戏各保留原有范围。 页面同时提供中文导读、按时间定位的中英整理稿和参考练习。

[英文音频转写原文（带时间戳）](transcript-original.txt)

## 从布尔标记里找出隐式状态机 / Find the state machine hiding among flags

[04:11:43 至 04:13:12](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=15103s)

两位主持人把这场午间节目分成开发新闻、观众提问和猜模型游戏。开场话题来自一条流行提示，请 Agent 找出应用里隐式存在的状态机。

The hosts organize the lunch show around developer news, audience questions and a guessing game about model output. They open with a popular prompt asking an agent to find implicit state machines in an app.

[04:13:12 至 04:14:12](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=15192s)

一个页面可能有加载中、出错和成功几个独立布尔值。开发者用散落的条件判断拼出页面。两项同时为真时，有些组件就会渲染出产品原本没有定义的组合。

A page can track loading, error and success with separate booleans and assemble its UI from scattered conditions. When two flags become true together, components may render a combination the product never defined.

[04:14:12 至 04:16:19](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=15252s)

改成一个有明确取值的状态，再集中定义什么时候可以迁移，就可以在表示层排除一批错误组合。人和 Agent 都能追到是哪条迁移导致了界面变化。

A declared status and centralized transition rules rule out a class of invalid combinations in the representation. People and agents can both trace an interface change to the transition that caused it.

[04:16:19 至 04:18:54](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=15379s)

主持人提到自己做过一个频繁读写文件的 CLI，最初各处都有各自的实现。把访问收进文件管理器之后，再用 lint 规则限制直接读写，后续 Agent 才容易沿着同一条路径继续维护。

One host describes a CLI with file reads and writes implemented in many places. Moving access behind a file manager and enforcing that route with lint gives subsequent agent changes a clear path to follow.

## 用文档、样例和确定性校验支撑陌生工具 / Support unfamiliar tools with docs, examples and checks

[04:18:54 至 04:20:16](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=15534s)

讨论曾短暂转到用户对自己使用的软件有多少控制。他们提到隐藏扰人的界面、减少不想看的信息流等需求，以此引出为个人习惯调整软件的价值。

The discussion briefly turns to how much control people have over the software they use. Hiding distracting interface elements or reducing unwanted feeds gives the hosts a concrete reason to value software adapted to personal habits.

[04:20:16 至 04:22:05](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=15616s)

他们接着谈到宣称面向 Agent 的编程语言和开发框架。名字如何定位只是起点，他们更想知道类型、模式和结构化规则能否让错误尽早暴露。

They turn to languages and frameworks positioned for agents. The branding is a starting point. The more useful question is whether types, patterns and structured rules expose mistakes early.

[04:22:05 至 04:24:31](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=15725s)

FoldKit 让他们联想到 Elm 风格的状态组织。状态集中、规则清楚时，生成出来的代码更容易沿着项目现有结构修改，这和前面寻找隐式状态机的话题接上了。

FoldKit reminds them of Elm-style state organization. Centralized state and explicit rules make it easier for a generated change to follow the existing structure, connecting back to the discussion about implicit state machines.

[04:24:31 至 04:25:08](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=15871s)

他们回忆早期让模型写 SvelteKit 时需要补不少工具、规则和校验。之后发现，面对一个不熟悉的框架，模型也能借助一套例子、及时文档和框架反馈完成不少工作。

They recall needing substantial tools, rules and validation when using earlier models on SvelteKit. Later they found that examples, current documentation and framework feedback could help a model work with a less familiar framework.

[04:25:08 至 04:28:12](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=15908s)

主持人提到 FoldKit 提供 llms.txt，能找到带示例的文档，也有 MCP 可以连到开发工具。他们认为更大的上下文让模型更容易参考新框架的资料，同时提醒新工具仍要争取开发者使用。

The hosts point to FoldKit’s llms.txt for documentation and examples, and an MCP integration for its developer tools. They say larger context makes it easier to use documentation for a newer framework, while new tools still compete for developers’ attention.

## 重写桌面应用要查的不只有内存 / Look beyond memory use in desktop rewrites

[04:28:12 至 04:30:11](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=16092s)

两人讨论 Discord 正在尝试的 Rust 与 GPUI 桌面方案，并提到看到一个展示内存用量的截图。他们将它作为更轻量桌面程序的有趣迹象，未在节目中给出跨环境的对照实验。

They discuss a reported Discord desktop effort using Rust and GPUI and mention a screenshot showing memory use. It is a promising sign for a lighter application in their discussion, without a cross-environment comparison in the show.

[04:30:11 至 04:31:28](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=16211s)

Electron 曾提供同一种浏览器行为和跨系统分发方式。换成调用系统 WebView 的方案，可能少带一部分运行时，却要处理系统间渲染、兼容性和排查工具的差异。

Electron provided predictable browser behavior and distribution across operating systems. An alternative using the system WebView may ship less runtime machinery while leaving the team to handle differences in rendering, compatibility and debugging tools.

[04:31:28 至 04:31:51](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=16288s)

主持人追问 Discord 的旧测试怎样迁移到新技术栈，尤其是面向浏览器的测试。节目里没有给出迁移结果。

The hosts ask how Discord might migrate its old tests, particularly browser-oriented ones, to the new stack. They do not report how the migration turned out.

## 留住能看出问题的知识 / Keep the expertise that helps you notice a problem

[04:34:43 至 04:38:39](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=16483s)

观众问过度依赖 AI 会不会让开发者失去能力。一位主持人说，他自己的调查中约 67% 的受访者觉得使用 AI 后技能有所下降。两人用早期浏览器兼容写法举例，讨论哪些知识已很少用到，哪些底层知识仍能帮人判断代码。

An audience question raises the risk of losing skills through AI use. One host says around 67 percent of respondents in his own survey felt their skills had diminished since using AI. The hosts use old browser workarounds to discuss which skills matter less today and how underlying knowledge still helps engineers judge code.

[04:38:39 至 04:39:16](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=16719s)

一个具体例子是桌面版和手机版各渲染了一整份 DOM。页面可用，Lighthouse 得分也能过得去，但有人看过结构才意识到，同样交互可以在一份结构上完成。

One concrete example renders a whole DOM tree for desktop and another for mobile. The page can work and score acceptably in Lighthouse. An engineer inspecting the structure may still see that a single structure could serve both interactions.

[04:39:16 至 04:43:05](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=16756s)

谈到 vibe coding，两人的定义并不完全一致。他们更关心负责的人知不知道代码做了什么、有没有参与关键判断，以及交出去的内容是不是经过检查和编辑。

The hosts use the term vibe coding with somewhat different meanings. They care more about whether the person responsible understands the result, took part in key decisions and checked and edited what they deliver.

## 用盲看练习观察产物 / Inspect generated work before naming the model

[04:43:05 至 04:44:20](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=16985s)

猜模型环节展示两张生成按钮的图片。有人看到颜色渐变和字形就选了一个模型，揭晓时猜错。两位主持人会反复根据自己熟悉的审美线索来猜，也会反复遇到例外。

The game shows two generated button designs. A guess based on gradients and typography turns out wrong. The hosts keep reaching for styles they associate with particular models and keep encountering exceptions.

[04:44:20 至 04:47:28](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=17060s)

有一轮交给模型的要求只是做一个按钮，结果却带上额外对象。作品能引起观众注意还需要回来核对，原始请求究竟允许哪些内容。

In one round the request was just for a button, but an output includes extraneous material. A design can draw attention and still warrant a check against the actual scope of its brief.

[04:47:28 至 04:51:26](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=17248s)

题目随后换成收件箱界面。主持人会猜测 emoji 或排版来自哪个模型，但观众看到的是极少数一次性样例。这个节目环节适合观察具体产物，样例数和设计都不足以得出排名。

Later rounds move to inbox interfaces. The hosts speculate about a model from emoji or layout while the audience sees only a few one-off examples. The game is useful for inspecting artifacts, with neither enough samples nor a design for establishing a ranking.

## 让用户在实际使用中感到被照顾 / Give people reasons to stay with an app

[04:51:26 至 04:52:57](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=17486s)

观众问，当好点子很快出现一批复制品，还有没有必要把自己做的小软件发布出去。主持人提到有效的说明、容易找到的上手路径和细节打磨，都能让软件在正式使用时有很大差别。

A viewer asks why anyone should still publish a small app when copies of a good idea appear quickly. The hosts point to helpful documentation, easy onboarding and care in details as differences people notice in actual use.

[04:52:57 至 04:53:58](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=17577s)

他们以 Rex 终端为例，连更新提示的排版和呈现都有人细想。这样的细节较难从一张功能截图看出来，却会贯穿用户接触应用的全过程。

They use the Rex terminal as an example, down to the layout and presentation of its update notification. A feature screenshot can miss that kind of detail, which is present throughout a person's experience with the application.

[04:53:58 至 04:54:28](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=17638s)

讨论最后回到个人软件。主持人自己也会用 Agent 写小工具。工具发布之后，用户还会阅读、安装、学习和求助，这些环节给认真做产品的人留下了发挥空间。

The conversation returns to personal software. The hosts also use agents to build small tools. After release, people still need to read, install, learn and ask for help, and care in those parts can set an app apart.
