# 原型做得越快，越需要知道该选哪一个

Ishaan Dey

中英整理稿

中文和英文均为按演讲整理的编辑转述。带时间戳的英文机器转写原文可在下方来源说明打开。

依据 11 月 12 日主直播整理。Antigravity 的内部使用、扩展案例及其收益来自 Dey 在现场的叙述。 页面同时提供中文导读、按时间定位的中英整理稿和参考练习。

[英文音频转写原文（带时间戳）](transcript-original.txt)

## 把部分判断放到原型做出来以后 / Let prototypes supply evidence

[06:08:26 至 06:09:28](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=22106s)

Dey 从自己参与的 Antigravity 说起。这款工具希望给开发者和知识工作者提供一种让 Agent 完成长任务的界面。模型能力和工作方式都在变，团队因此得反复检查旧界面是否还合适。

Dey starts with Antigravity, a product he helps build. It gives developers and knowledge workers an interface for delegating demanding work to agents. Model capabilities and working habits move together, so the team regularly revisits the interface.

[06:09:28 至 06:10:03](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=22168s)

以前，试做一个方向就要付出相当多的工程时间，团队会在动手前尽量把细节定下来。他认为低成本原型能把一部分决策挪到试用之后。先理解要解决的问题，再观察具体的操作和反馈，会发现纸上方案遗漏的细节。

When building an option took substantial engineering time, product teams settled more details before starting. Dey sees cheap prototypes as a chance to make some decisions after trying the product. Understand the problem first, then use interaction and feedback to uncover details an abstract proposal missed.

[06:10:03 至 06:11:09](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=22203s)

首个方案能跑，很容易让团队误以为可以交付。速度改善之后，Dey 更看重候选方案之间的比较，也更希望有人说清楚这轮改动要带来哪一种改善。

A working first version is easy to accept. As implementation speeds up, Dey puts more weight on comparing alternatives and on someone being able to say what kind of improvement the current iteration should deliver.

## 模型变强会改变协调方式 / Coordination evolves with the model

[06:11:09 至 06:12:11](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=22269s)

团队可以用内部模型实验，并把 Antigravity 交给 Google 员工使用。按 Dey 的说法，他能在不同工作场景里看到同一套能力怎样被用起来，并把反馈带进下一轮设计。

The Antigravity team experiments with internal models and makes the product available inside Google. Dey describes being able to watch how the same capabilities are used in different jobs and bring that feedback into the next round of design.

[06:12:11 至 06:13:26](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=22331s)

较早的多 Agent 协作需要明确规定任务安排。随着模型更能互相沟通和组织工作，团队逐步放宽了约束，让 Agent 群能够承担更大的任务。

Earlier multi-agent workflows relied on a prescribed division of work. As models became better at communicating and coordinating, the team loosened some of those constraints so groups of agents could tackle larger tasks.

[06:13:26 至 06:14:09](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=22406s)

排队指令原本适合轮流对话。人先给一个小改动，等执行完，再把下一部分交过去，模型每次只处理一小段上下文。

Queued instructions suited the older turn-by-turn interaction. A person could hand over a small change, wait for it to finish and then pass on the next part, keeping each model turn tightly scoped.

[06:14:09 至 06:14:54](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=22449s)

在长时间运行、能异步工作、还能收到外部事件的系统里，Dey 重新考虑这个队列。早点收到用户意图，Agent 才有机会判断是委派一部分工作，还是等正在执行的任务结束再处理。

Dey reconsiders the queue in a system with long-running agents, asynchronous work and external events. Receiving intent sooner lets the agent decide to delegate part of it or leave it until the current task ends.

[06:14:54 至 06:15:43](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=22494s)

他把可行的产品机会放在两头之间。界面如果把旧模型的限制固化进去，很快会过时。如果设计依赖尚未具备的能力，用户当下也很难用起来。

He places viable product opportunities between two points. An interface that hard-codes old model limitations risks aging quickly. A design that depends on capability the model has yet to acquire will be hard to use today.

## 让用户自己试出新用法 / Make room for users to experiment

[06:15:43 至 06:16:20](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=22543s)

Dey 以前在设计工具里逐个画界面。现在，同一类工具仍然存在，但他会请 Agent 生成大量视觉方向，先粗看一遍，再选少数方向仔细推进。

Dey used to draw interfaces one frame at a time. The class of tool is still familiar, but he now asks agents to generate many visual directions, skims the possibilities and chooses a few to develop.

[06:16:20 至 06:17:00](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=22580s)

他给了三种扩展的例子。个人可以做一个汇总反馈和修复记录的看板，设计团队可以给演示做可视化协作工具，科学团队则能做适合自己任务的插件。

His examples span three kinds of extensions. An individual can build a dashboard from feedback and fixes, a design team can make a visual collaboration tool for demos, and a science team can write plugins for its own work.

[06:17:00 至 06:17:46](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=22620s)

他把 Agent 群当作扩展反馈到核心产品的例子。这项能力先作为插件出现。内部使用让团队看到了价值，也提供了怎样把它纳入产品的经验。

He points to agent swarms as an extension that fed back into the main product. It began as a plugin. Internal use gave the team evidence of its value and experience to draw on when bringing it into the product.

## 先弄清用户在界面里要做什么 / Specify the decision the interface should support

[06:17:46 至 06:18:27](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=22666s)

他用改幻灯片开玩笑。宽泛地说“做得更好”，Agent 可能加图表、颜色和新功能。这些改动都能完成，至于它们对读者有没有帮助，还得从读者的任务来判断。

He jokes about improving slides. Given a broad instruction to make them better, an agent can add charts, colors and features. It can finish every addition, but their worth still depends on what readers have to do with the slides.

[06:18:27 至 06:19:11](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=22707s)

给 Agent 管理界面增加每个步骤和每个旋钮，看起来给了用户更多控制。同一个人同时监督多项任务时，信息太密也会增加判断成本。团队需要先说清楚这次想让哪个动作变容易。

Adding every step and every control to an agent manager appears to give users more control. For someone supervising several tasks at once, that density can make decisions harder. The team first needs to say which action it wants to make easier.

[06:19:11 至 06:19:54](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=22751s)

Dey 给出的另一种设计，是只把每个 Agent 最新且有意义的动作呈现出来，减少满屏的文本和工具调用。更简洁的界面降低了认知负担，让人更容易同时处理多项任务。

Dey suggests showing only what each agent is doing now in meaningful terms, reducing walls of text and tool calls. A simpler interface lowers cognitive load and makes it easier to handle multiple tasks.

## 先发散，再挑一个方向做深 / Explore widely, then deepen one direction

[06:19:54 至 06:20:36](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=22794s)

Dey 鼓励团队快速尝试多种方向，中间停下来试用和比较。首版的用途是提供一个可以观察的对象，下一轮据此判断哪一个方向值得做深。

Dey encourages teams to try a range of directions and make time to use and compare them. An early version gives them something observable, which the next iteration can use to choose where to go deeper.

[06:20:36 至 06:21:54](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=22836s)

他最后把判断落在三件具体工作上。随着模型变化调整产品基础，为用户自己拓展工作留出空间，在发布节奏加快的同时保留思考时间。他提到 Google 内部的解码和内存优化作为使用案例。

He closes on concrete parts of product work: revise foundations as models change, make room for users to extend workflows, and retain thinking time as shipping accelerates. He cites internal examples involving video decoding and memory optimization inside Google.
