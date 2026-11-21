# 怎样搭一个让人及时介入的 Agent 工作台

Armin Ronacher

中英整理稿

中文和英文均为按演讲整理的编辑转述。带时间戳的英文机器转写原文可在下方来源说明打开。

根据第二日直播对应场次的本地英文机器转录整理，用大会赛后阅读版核对讲者、场次与术语。中英正文为同一内容的编辑转述，数据和产品经历按讲者陈述归属。 页面同时提供中文导读、按时间定位的中英整理稿和参考练习。

[英文音频转写原文（带时间戳）](transcript-original.txt)

## 模型进步之后，工具该留下什么 / What should stay as models improve

[00:40:04 至 00:41:22](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=2404s)

Armin Ronacher 用工匠工作室介绍他的目标。CNC 和 3D 打印扩展了能做的作品，软件工具也可以帮助人尝试更费工、质量要求更高的东西。

Armin Ronacher starts with a craft workshop. CNC machines and 3D printers expand what an artist can make, and software tools can likewise support more demanding work.

[00:41:22 至 00:42:11](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=2482s)

Pi 的核心工具大体稳定，他却能用它完成比一年前更复杂的工作。这个观察给了他一个起点，去重新评估早期围绕模型缺点做的工具。

Pi’s core tools stayed broadly stable, while he could use it for more complex work than a year earlier. That gave him a reason to reexamine tools built around earlier model limitations.

[00:42:11 至 00:42:49](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=2531s)

他曾喜欢用 Pi Auto Research 让 Agent 朝性能目标迭代。后来他在新模型上不再需要这个插件承包整个过程，Agent 已经能自己组织其中一些步骤。

He previously used Pi Auto Research to keep an agent iterating toward performance goals. With newer models, he found less need for that plugin to run the whole process.

[00:42:49 至 00:44:46](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=2569s)

在自己的 Pi 会话里，他观察到纠正和中止 Agent 的次数随模型更新而减少，任务用时的第 90 百分位从约 2.5 分钟升到至少 14 分钟。核心工具没变，较新的模型也更常调用 Bash。

In his own Pi sessions, newer models needed fewer corrections and aborts, while the 90th percentile of running time rose from about 2.5 minutes to at least 14 minutes. The core tools were unchanged, and newer models reached for Bash more often.

## 把人能看懂的那部分留在流程里 / Keep the human decision inside the workflow

[00:44:46 至 00:46:28](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=2686s)

Ronacher 说人的注意力仍然有限。团队能同时启动许多 Agent，能够消化的决定却要受人可花的时间和理解力约束。

Ronacher says human attention remains limited. Teams can start many jobs in parallel, but the decisions they can absorb still depend on how much time and understanding people have.

[00:46:28 至 00:48:22](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=2788s)

他的累计新建项目数到了 141 个。图中每月投入至少五天的项目仍只有 6 到 13 个。即使把项目的 issue 处理自动化，人也要决定是否还愿意投入注意力。

His cumulative number of new projects reached 141. The chart still shows only 6 to 13 projects a month that he worked on for at least five days. Even with issue handling automated, a project still depends on someone deciding to give it attention.

[00:48:22 至 00:49:13](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=2902s)

一项任务达到了可检查的目标，可能仍会留下长期维护代价。他希望在判断里保留人对将来代码怎样演化的考虑。

A task can reach a measurable goal while leaving a maintenance cost. He wants long-term expectations about how the code will evolve to stay part of the decision.

[00:49:13 至 00:50:09](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=2953s)

他和儿子用同一套 Agent 系统给同一个项目提交 PR，结果仍有明显的质量差别。他将这个差别与软件工程经验联系起来，也提醒人要跟得上自己正在改的系统。

He and his son used the same agent system on a shared project and still produced pull requests of noticeably different quality. He connects that difference to software engineering experience and argues for working at a pace that lets you understand the system you are changing.

[00:50:09 至 00:51:16](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=3009s)

提交量上升后，他开始回看会话轨迹，寻找能稳定介入的位置。他让 Agent 在进入验证前，也就是任务通常进行到约 70% 时，给出一份简短汇报和一页易读的 HTML，方便他了解当时在做什么。

As his commit count rose, he reviewed session trajectories to find a consistent point to step in. Before verification, typically around 70% of the way through a task, he asks the agent for a short executive summary and a readable HTML page showing what it is doing.

## 共同格式和协作要继续有人管 / Shared formats still need people to coordinate

[00:51:16 至 00:51:39](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=3076s)

他喜欢少装依赖并自己实现一部分功能。讲到多个实现要拼在一起时，他也用德语 Wildwuchs 描述软件可能失控生长的局面。

He likes using fewer dependencies and implementing some features himself. For software that must work together, he invokes the German word Wildwuchs for uncontrolled growth.

[00:51:39 至 00:52:53](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=3099s)

他举了一个 TAR 归档被不同实现读取成不同结果的例子，用来说明各自实现同一格式时，解释细节仍可能分叉。

He cites a TAR archive that different implementations interpreted differently. It illustrates how seemingly shared formats can diverge in the details.

[00:52:53 至 00:53:56](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=3173s)

如果碰到需要共同约定的问题，他建议先和上游及其他维护者讨论。今天做出一个 fork 很快，后来仍要承担互操作与维护的成本。

When a problem needs agreement, he suggests working with upstream and other maintainers first. A fork can be quick to make while creating later work around compatibility and maintenance.

[00:53:56 至 00:54:53](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=3236s)

Ronacher 期待有人借助 Agent 做更快、更省内存的软件，探索原生和形式化验证的选择。他也提醒听众，这些方向都依赖积累多年的共同基础。

Ronacher welcomes efforts to use agents for faster, smaller software, including native implementations and formal verification. Those efforts still draw on shared foundations built over years.

## 让长任务能回来，也能自己编排小流程 / Make long tasks resumable and programmable

[00:54:53 至 00:55:38](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=3293s)

在后半段，他转向 Agent 的运行环境。长任务要能被挂起和恢复，也要有落盘状态，让 Agent 能够从中断处重新开始。

He turns to runtime design in the second half. Long jobs need persisted state so they can be suspended and picked up after interruption.

[00:55:38 至 00:56:41](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=3338s)

他设想长寿命 Agent 自己创建可恢复的工作流，进程和任务不用绑定在同一次运行里。人查看状态后，可以选择暂停或让工作继续。

He envisages durable agents creating resumable workflows of their own. The task can survive a single process run, and people can inspect its state before pausing or continuing it.

[00:56:41 至 00:58:23](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=3401s)

Pi 早期主要依靠 Bash 调用外部工具。Ronacher 也尝试让 Agent 在一段 JavaScript 里组织工具调用，把筛选和小批处理留在代码里完成。

Pi initially leaned on Bash to invoke external tools. Ronacher also experiments with letting the agent organize calls in JavaScript, where filtering and small batches can happen inside the program.

[00:58:23 至 00:59:29](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=3503s)

他设想处理约 3,000 条客服请求。Agent 可以临时写一条代码工作流，让分类器逐项判断，把请求交给 Agent 处理，或向客户索取更多反馈。

He imagines processing around 3,000 customer support requests. The agent can write a workflow on demand and have a classifier decide whether each request should go to an agent or needs more feedback from the customer.
