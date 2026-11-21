# 给软件工厂装上能起作用的验收关口

Dexter Horthy

中英整理稿

中文和英文均为按演讲整理的编辑转述。带时间戳的英文机器转写原文可在下方来源说明打开。

依据 11 月 12 日主直播整理。代码演进评测、论文数据和团队案例来自 Horthy 的现场介绍。练习为编辑设计。 页面同时提供中文导读、按时间定位的中英整理稿和参考练习。

[英文音频转写原文（带时间戳）](transcript-original.txt)

## 先看旧流程已经解决了什么 / Map the existing delivery loop first

[08:16:08 至 08:18:18](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=29768s)

Horthy 先回顾自己怎样从上下文工程走到多人 Agent 项目，然后提出这场演讲的问题。在一次性任务上生成代码很容易让人惊喜，长时间无人过问时，代码质量能否随需求变化维持下去？

Horthy opens by recalling his path from context engineering to collaborative coding agents and raises the question behind the talk. Generating code for one task can be impressive. Can the quality hold as requirements change over a long stretch of unattended work?

[08:18:18 至 08:19:24](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=29898s)

他画出 Agent 出现前的开发过程。有人定方向，有人把工作放进任务系统，工程师做出改动后，检查、评审、灰度发布和监控让团队知道它有没有达到目的。

He draws the development process that predates coding agents. People set direction and turn it into tracked work. Once engineers make a change, tests, review, staged rollout and monitoring reveal whether it achieved its purpose.

[08:19:24 至 08:19:55](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=29964s)

用户反馈、故障和监控告警会回到团队，开始下一轮工作。引入 Agent 首先改变了谁做实现。产品理解、验收、发布控制和收集反馈仍是完整交付过程的一部分。

Feedback, incidents and alerts return to the team and start another round of work. Introducing an agent first changes who implements the task. Product understanding, verification, rollout controls and feedback remain parts of delivery.

## 同时设计工作入口和质量关口 / Design both intake and quality gates

[08:19:55 至 08:20:32](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=29995s)

他把促使工作开始的条件叫前向压力。例如，新需求或深夜告警一出现，就可以让系统收集上下文，建立受控的调查或改动任务。

He calls the conditions that start work forward pressure. A feature request or overnight alert can trigger a controlled investigation or change with the context gathered first.

[08:20:32 至 08:21:36](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=30032s)

反向压力对应验收。CI、静态检查、测试、Agent 辅助评审和人工判断都可以挡回不合格的改动。对反复出现、可以稳定判断的错误，让 Agent 直接根据检查结果修改。

Backpressure comes from acceptance. CI, static checks, tests, agent-assisted review and human judgment can send back an unsuitable change. For repeatable and reliably detectable issues, the agent can use those results to revise its work.

[08:21:36 至 08:22:39](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=30096s)

Horthy 宣布将讲 12 项软件工厂实践。他从两个问题讲起。怎样自动开始工作？怎样在交给人之前解决可自动发现的问题？接着他提醒，长期无人看管的模型未必会改善代码质量。

Horthy introduces twelve practices for software factories. He starts by asking how to trigger work automatically and resolve easily detected problems before a human sees the result. He then cautions that unattended models may fail to improve code quality over time.

## 在下一项需求里检查可维护性 / Test maintainability on the next requirement

[08:22:39 至 08:23:35](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=30159s)

他介绍 SlopCodeBench 的核心方法。模型只知道当前一段要求，过一轮才收到下一段，评测再看已有代码能否继续演进。一次得到全部要求并搭好系统，衡量的是另一种能力。

He introduces the central idea of SlopCodeBench. The model sees the current set of requirements and learns the next set only after completing a stage. The evaluation checks whether the existing code can evolve. Seeing all requirements up front and building the system measures a different ability.

[08:23:35 至 08:24:48](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=30215s)

他讨论了圈复杂度、符号或函数长度、接口设计等信号。研究方用多种规则观察生成代码的变化。阅读这些结果时，也需要看规则度量了什么，是否和自己仓库的维护问题吻合。

He discusses signals such as cyclomatic complexity, symbol or function length, and interface design. The study applies multiple rules to watch how generated code changes. A reader should examine what those rules measure and whether it matches maintenance problems in their own repository.

[08:24:48 至 08:25:53](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=30288s)

他建议长期维护的团队保留对系统的理解。模型可以根据明确方向修掉某个结构问题，方向从哪里来，依靠有人知道当前实现及以后最可能接到的需求。

He advises teams responsible for long-lived systems to retain an understanding of their code. A model can address a structural problem under clear direction. Choosing that direction depends on knowing the implementation and the kinds of changes likely to arrive next.

## 按返工损失决定先计划多少 / Plan in proportion to the cost of rework

[08:25:53 至 08:26:34](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=30353s)

Horthy 曾花数小时写完规格后，发现本可以先试一个简短的提示。他在意计划增加的把握是否值得这段时间，也会把返工难度纳入考虑。

Horthy has spent hours writing a specification before realizing that a short implementation attempt might have sufficed. He weighs how much confidence the plan adds against the time it takes, including how hard the work would be to redo.

[08:26:34 至 08:27:01](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=30394s)

他用改按钮颜色和确定数据库结构作例子。颜色改错还能第二天重新调，结构进入生产以后会牵连依赖、数据迁移和日后功能。后者值得更早拿到共同意见。

He compares a button color with a database schema. A color can be adjusted the next day, while a production schema affects dependencies, migration and future features. It is worth securing agreement on the latter earlier.

[08:27:01 至 08:27:40](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=30421s)

Horthy 介绍自己发布的 ShowMe，主张用 HTML 草图、表格和图表对齐目标。他还建议，让 Agent 能用截图、浏览器或录像来检查成果；如果做的是 iOS 应用，环境应支持构建、运行和测试。

Horthy introduces ShowMe, a skill he published, and recommends aligning through HTML mockups, tables and charts. He also recommends giving agents screenshots, browsers or recordings for testing and providing a build, run and test environment for work such as an iOS app.

## 把试验、决策和证据留在一起 / Keep experiments, decisions and evidence together

[08:27:40 至 08:28:04](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=30460s)

他用现成的静态规则说明怎么拦住反复出现的低质量代码，举了 Anti-slop、Factory 的 ESLint 插件和 SlopCodeBench 的 Python 代码质量规则。

He points to existing static rules for catching recurring low-quality code, citing Anti-slop, the Factory ESLint plugin, and the Python code-quality rules from SlopCodeBench.

[08:28:04 至 08:28:45](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=30484s)

粗糙原型可以放在功能开关后，先观察用户是否需要，再决定是否打磨。Horthy 也建议让 Agent 能用功能开关比较结果，把以往会话中的经验整理进评测。

A rough prototype can sit behind a feature flag while the team checks whether users want it. Horthy also recommends giving agents feature flags to compare outcomes and using evaluations to learn from past sessions.

[08:28:45 至 08:29:40](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=30525s)

当计划在文档、决策在聊天、执行在 Agent 会话、证据又只在 PR 里时，下一个人很难知道为什么这么做。他希望把这些材料靠近代码，保留改动时的意图。

When plans live in documents, decisions in chat, execution in an agent session and evidence only in a PR, the next person may struggle to recover the reasoning. He wants those records close to the code, preserving what the change was for.

[08:29:40 至 08:30:14](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=30580s)

通用工具可以承担环境、运行框架和协作管理。某个公司的核心规则、哪些失败必须挡住以及什么算正确，仍需要那个团队自己定义并维护。

General-purpose tools can supply an environment, harness and collaboration controls. What counts as correct in a company's domain, and which failures should block changes, still need definitions maintained by that team.

## 让读者花得起验收的时间 / Make the result affordable to review

[08:30:14 至 08:31:22](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=30614s)

Horthy 介绍与其他参会者合作推出的反低质内容宣言。他主张用真实结果衡量产出，把理解放在速度之前，先自己判断初稿，追求更好的成果，并改善工作系统，让同类问题少出现。

Horthy introduces the anti-slop manifesto, developed with other attendees. It favors real outcomes over output volume, understanding over speed, independent judgment about a first draft, better work over easier work, and improvements to the system that produced the work.

[08:31:22 至 08:32:26](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=30682s)

他用产出者和接收者的时间差解释低质内容。生成一份很长的 PR 或文档可以越来越便宜，读者仍得花时间理解。把模型的产出直接交出去，质量和阅读负担就落到接收者身上。

He defines slop through the difference between the time spent producing and consuming it. A long pull request or document can become cheap to generate while still taking time to understand. Passing it on without taking responsibility for its quality shifts that work to the recipient.

[08:32:26 至 08:36:01](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=30746s)

低质量的材料进入知识库、代码或对话后，会被下一位 Agent 读到并照着做。Horthy 主张交付者理解并审阅内容，对决定和后果负责，也要向接收者说明哪些内容由 Agent 撰写。

Weak material in a knowledge base, codebase or chat can be read and copied by the next agent. Horthy asks people to understand and review what they send, take responsibility for the decisions and consequences, and disclose when an agent authored the material.
