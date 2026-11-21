# 把创意桌面软件做成用户能改的工具

Brandon Thomas

中英整理稿

中文和英文均为按演讲整理的编辑转述。带时间戳的英文机器转写原文可在下方来源说明打开。

根据第二日直播对应场次的本地英文机器转录整理，用大会赛后阅读版核对讲者、场次与术语。中英正文为同一内容的编辑转述，数据和产品经历按讲者陈述归属。 页面同时提供中文导读、按时间定位的中英整理稿和参考练习。

[英文音频转写原文（带时间戳）](transcript-original.txt)

## 从能自己改工具的日子讲起 / A time when users could change their tools

[01:20:53 至 01:22:45](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=4853s)

Brandon Thomas 说，一个 Agent 参与制作的类 Photoshop 项目在团队主动推广前就传开了，同一批工具也引来开发者和创作者的反馈。

Brandon Thomas says an agent-built image editor modeled on familiar Photoshop workflows spread before the team actively promoted it. The same group of tools attracted feedback from developers and creative users.

[01:22:45 至 01:23:38](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=4965s)

他曾做基础设施工程和创业项目，也长期参与电影等创作。这里想解决的是创意工作者能不能根据自己的制作流程改工具。

His background includes infrastructure, startups, and creative work such as filmmaking. That experience leads to a question about whether creators can adapt tools to their own production.

[01:23:38 至 01:26:26](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=5018s)

他回忆个人架设聊天服务器、第三方客户端和可定制网站的时期。那些接口留给用户自己组合工具的空间，是他衡量今天平台的一个参照。

He remembers self-hosted chat, third-party clients, and customizable websites. The room those interfaces left for people to combine tools remains a reference point for the platforms he uses now.

[01:26:26 至 01:27:32](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=5186s)

演讲用订阅条款和平台收紧接口来解释具体的依赖。Thomas 认为，能导出文件并修改应用，会让使用者在工作流改变时多一种选择。

The talk uses subscription terms and tighter platform interfaces to illustrate dependency. Thomas sees exportable files and editable applications as practical options when a workflow changes.

## 专业用户可能只需要一道工序 / A creative user may need one stage of the process

[01:27:32 至 01:28:22](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=5252s)

ArtCraft 从开放的专业创作工具起步，重视用户对桌面上的作品和流程拥有控制。早期团队曾担心创作者对开放源代码的兴趣有限。

ArtCraft started with open professional creative tools and emphasized control over desktop assets and workflows. The team initially worried that open source might not matter to creative users.

[01:28:22 至 01:29:08](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=5302s)

Thomas 看到有创作者用编码 Agent 改自己的流程。工作室可以把接口和现成组件拼起来，让一个具体岗位只看到它需要的那几项功能。

Thomas saw artists adapting their own workflows with coding agents. A studio can assemble APIs and existing components into an interface that exposes just what one role needs.

[01:29:08 至 01:30:05](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=5348s)

他把开放基础设施看成让用户继续动手的条件。文件格式、可调用的功能和可分发的程序，都会影响一项新的流程能做多远。

He sees open infrastructure as a condition that lets users keep modifying their tools. File formats, callable features, and distributable software shape how far a new workflow can go.

## 先达到能用，再衡量功能差距 / Reach a usable baseline and measure the gap

[01:30:05 至 01:30:41](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=5405s)

团队第一个参照的是 Photoshop。他们准备了大规格，划分界面与实现，逐项列出工具、数据结构、文件导入，再把 CLI 和 MCP 接口写进要求。

The team began with Photoshop as a reference. Its specification separated interface and implementation, set out tools, data structures, and file importers, and required CLI and MCP access.

[01:30:41 至 01:30:59](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=5441s)

Thomas 说，早期版本已经能工作，启动也更快。他们当时仍在核对还欠哪些功能。

Thomas says the early version worked and started faster. The team was still measuring what it needed to add.

[01:30:59 至 01:31:54](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=5459s)

熟悉的操作让老用户可以沿用一些手感。团队先用相近操作检验可行性，之后仍有空间尝试更适合 Agent 操作的新界面。

Familiar operations let existing users carry over some of their habits. The team used that familiarity to test feasibility and left room to try interfaces designed more directly for agents.

[01:31:54 至 01:32:51](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=5514s)

项目在 Reddit 传开后带来意外的需求和反馈。Thomas 看到有原先对 AI 持保留意见的用户，也愿意试能给他们更多控制的应用。

The unexpected spread on Reddit brought feedback and requests. Thomas says some people who were skeptical of other AI uses were willing to try applications they could control more directly.

## 通用组件怎样支持更多桌面应用 / How common components support more desktop tools

[01:32:51 至 01:35:33](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=5571s)

团队和社区把尝试扩展到 CAD、音频、PDF 与协作设计工具。Thomas 介绍了可在桌面管理这些应用的启动器，并说约四分之一的用户在用 Linux。

The team and community expanded their work to CAD, audio, PDF, and collaborative design tools. Thomas introduces a desktop launcher for managing the apps and says about a quarter of their users are on Linux.

[01:35:33 至 01:37:23](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=5733s)

这些应用把 CLI 和 MCP 作为正式入口，让人可以在桌面操作，也可以让 Agent 组装作品。Thomas 还介绍了语言本地化和延续旧软件的工作，并说社区正在把界面组件与二维、三维基础库拆出来供后续应用复用。

The applications treat CLI and MCP as first-class interfaces alongside the desktop UI, so agents can assemble projects as well. Thomas also describes localization and continued support for older tools, and says the community is breaking out reusable interface components and 2D and 3D libraries.

[01:37:23 至 01:38:18](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=5843s)

Thomas 用 Rust 说明团队如何看原生应用的响应速度、可移植性和 WebAssembly 部署。更快地产生改动以后，编译和 CI 的承载能力仍要增加。

Thomas explains the team’s choice of Rust in terms of native responsiveness, portability, and deployment via WebAssembly. Faster change generation still increases demand for compilation and CI capacity.

[01:38:18 至 01:38:49](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=5898s)

Thomas 建议由人处理后端改动、数据库结构迁移和 API 设计。对桌面应用、游戏以及其他基本不可变的工作，他主张让 Agent 自行迭代。

Thomas recommends having people handle backend work, schema migrations, and API design. For desktop apps, games, and other work he treats as largely immutable, he gives agents room to iterate on their own.

[01:38:49 至 01:40:18](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=5929s)

Thomas 介绍了 Autocraft。这个用代码定义的软件工厂接收工单、分流并推进开发，留下的决策会成为评测和后训练数据。他说计划开源这套流程。

Thomas introduces Autocraft, a software factory defined in code that receives issues, triages them, and carries out development. Its decisions provide data for evaluations and post-training. He says the team plans to open-source it.
