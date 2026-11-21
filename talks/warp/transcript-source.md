# 让软件工厂的工作流程也能测试和改进

Zach Lloyd

中英整理稿

中文和英文均为按演讲整理的编辑转述。带时间戳的英文机器转写原文可在下方来源说明打开。

根据第二日直播对应场次的本地英文机器转录整理，用大会赛后阅读版核对讲者、场次与术语。中英正文为同一内容的编辑转述，数据和产品经历按讲者陈述归属。 页面同时提供中文导读、按时间定位的中英整理稿和参考练习。

[英文音频转写原文（带时间戳）](transcript-original.txt)

## 个人提速遇到团队瓶颈 / Where individual speed meets team bottlenecks

[01:01:24 至 01:02:23](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=3684s)

Warp 创始人 Zach Lloyd 从个人使用编码 Agent 谈起。他关心工程师怎样逐渐开始设计和改进生产软件的系统。

Warp founder Zach Lloyd starts from personal use of coding agents and asks how engineers can design and improve the systems that produce software.

[01:02:23 至 01:03:14](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=3743s)

他接触的很多开发者在本地终端或开发环境同时运行多个 Agent。这种工作仍要有人给每个会话发起请求，并察看什么时候出了问题。

Many developers he talks to run multiple agents in local terminals or development environments. People still have to start the sessions and notice when they run into trouble.

[01:03:14 至 01:04:55](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=3794s)

平台团队还遇到另一种困难。每个人挑自己的模型、Skills 和接入条件，公司便很难比较成本及效果，也难统一治理。

Platform teams face another problem. When everyone picks their own models, skills, and access settings, it is hard to compare cost and outcomes or apply common governance.

## 把工厂定义写成能审核的配置 / Write a factory definition that can be reviewed

[01:04:55 至 01:05:17](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=3895s)

Lloyd 把软件工厂定义为一套用代码声明的闭环系统，用来持续衡量和改进云端编码 Agent 的表现。要把这套系统做大，他建议先用声明式语言把它写清楚。

Lloyd defines a software factory as a code-defined closed-loop system for continuously measuring and improving cloud coding agents. He recommends describing the system in a declarative language before scaling it.

[01:05:17 至 01:05:58](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=3917s)

声明式配置写明要运行的 Agent、允许的仓库和工具、任务触发方式，以及从分流、规格到实现、验证和监测的工作流。

The declarative definition specifies which agents run, which repositories and tools they may use, what triggers work, and how it moves from triage and specification through implementation, verification, and monitoring.

[01:05:58 至 01:09:38](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=3958s)

工作可以由人提出，也可以由自动信号触发。团队用运行数据检查质量、成本和吞吐，再用评测和基准试验改进流程。Lloyd 仍把解决真实用户问题看作产品工程的责任。

Work can originate with a person or an automated signal. Teams can measure quality, cost, and throughput, then use evaluations and benchmarks to improve the workflow. Lloyd still sees solving a real customer problem as the responsibility of product engineering.

[01:09:38 至 01:10:36](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=4178s)

Lloyd 以基础设施代码为参照。工作流进入版本控制后，团队和 Agent 可以在分支上提出一项改进，留下差异供审核，并比较它与基线的表现。

Lloyd compares this to infrastructure as code. With workflows under version control, a team or an agent can propose a change on a branch, leave a diff for review, and compare it to the baseline.

## 运行记录和环境要能复用 / Make run evidence and execution environments reusable

[01:10:36 至 01:11:27](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=4236s)

沙箱让不同运行采用可复现的环境，也给它们划定访问边界。Lloyd 把模型和 Agent 运行框架看成可测试的变量，建议用实际团队任务比较。

Sandboxes make runs more reproducible and constrain access. Lloyd treats models and agent harnesses as variables that should be compared on the team’s own tasks.

[01:11:27 至 01:12:25](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=4287s)

API 和 MCP 让工作可以从 Slack、工单系统和代码托管处进入。工程师也可以在自己处理问题的原处发起运行。

APIs and MCP allow work to arrive from Slack, issue tracking, and source hosting. Engineers can start a run where they are already handling the problem.

[01:12:25 至 01:14:12](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=4345s)

在 Warp 的演示里，定义包含策略、仓库、触发器和一份流程图。共享视图能看到同事当前操作的会话、模型设置和产生的工件。

In the Warp demo, the definition includes policies, repositories, triggers, and a workflow blueprint. The shared view shows colleague sessions, model settings, and artifacts produced along the way.

[01:14:12 至 01:14:38](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=4452s)

引入共享记录后，可以同时看一个 PR 需要多少次人工接触、整体吞吐如何，以及成本多少。它们各自回答不同的问题。

Shared records make it possible to track human interactions per pull request, overall throughput, and cost. Each measure answers a different question.

## 用在线评测找出重复出现的问题 / Find recurring defects with online evaluation

[01:14:38 至 01:15:07](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=4478s)

在线评测覆盖保存下来的会话。团队可以用评测器检查特定行为，定位哪些运行需要回去看。

Online evaluations work across recorded sessions. An evaluator can check a specific behavior and identify runs worth looking at again.

[01:15:07 至 01:16:05](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=4507s)

演示里的评分项寻找冗余测试。自动生成的用例可能与已有覆盖重叠，评测器把这些场次标出来，再由团队看是指令、测试理解，还是工作流造成的。

One scorer looks for redundant tests. An agent may add cases that duplicate existing coverage. The evaluator flags runs that the team can then inspect for problems in instructions, interpretation, or workflow.

[01:16:05 至 01:17:05](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=4565s)

Lloyd 介绍一种让工厂自行提出改进的方法。Agent 可以读取评分结果、找出失败的共同点，再给工厂配置提一条 PR，供团队审查。

Lloyd describes a way for the factory to propose its own improvements. An agent can read evaluation scores, look for patterns in the failed runs, and open a pull request against the factory definition for review.

## 用团队自己的任务检验修正 / Test the proposed fix on your own workload

[01:17:05 至 01:17:54](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=4625s)

他建议把内部的代表性任务做成可重放的基准。一次实验可替换模型，也可替换 Agent 框架、Skills 或流程配置。

He recommends making benchmarks from representative internal tasks that can be replayed. An experiment can change a model, harness, skill, or workflow setting.

[01:17:54 至 01:18:47](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=4674s)

演示以成本和质量比对不同配置。公开模型榜单提供线索，局部决策还要看新配置在自己任务里的代价和错误。

The demo compares configurations by cost and quality. Public model rankings can inform which options to try, while the local choice depends on failures and costs on the team’s own work.

[01:18:47 至 01:19:23](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=4727s)

Lloyd 的收尾建议是把 Agent 当作一种新的工程部件，想清楚该搭怎样一套系统，才能发挥它的能力。

Lloyd closes by asking engineers to treat agents as a new engineering primitive and design systems that make effective use of them.
