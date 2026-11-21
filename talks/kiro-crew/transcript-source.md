# Agent 越来越快，团队的交付流程卡在哪里

Doug Clauson

中英整理稿

中文和英文均为按演讲整理的编辑转述。带时间戳的英文机器转写原文可在下方来源说明打开。

依据 11 月 12 日主直播整理。会话数、PR 数与效率变化是 Clauson 对相关团队和研究样本的报告，统计指标和场景各不相同。 页面同时提供中文导读、按时间定位的中英整理稿和参考练习。

[英文音频转写原文（带时间戳）](transcript-original.txt)

## 代码写快之后，先找整段流程最慢的地方 / Find what still slows down delivery

[03:23:48 至 03:24:35](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=12228s)

Clauson 介绍 Amazon 早期采用编程 Agent 时遇到的落差。团队把工具加进既有流程，主要缩短了生成代码的阶段。他报告的初期提速大约是 1.1 到 1.2 倍。

Clauson describes an early gap in Amazon's adoption of coding agents. Teams inserted the tools into existing processes and mainly shortened code generation. His reported early gains were around 1.1 to 1.2 times the baseline.

[03:24:35 至 03:25:41](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=12275s)

他另举 Amazon Stores 一组改变了工作方式的团队。按各团队自身历史开发速度做归一化后，样本中位数约为 4.5 倍。他也提到有些团队先变慢，再跑得更快。

He describes a separate group in Amazon Stores that changed how it worked. Normalized against each team's historical development velocity, the sample median was about 4.5 times its baseline. Some teams initially slowed down before improving.

[03:25:41 至 03:27:07](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=12341s)

产品用户常问下一项功能是什么，也会问自己是否用对了工具。他选择回答后一个问题，以 Kiro Crew 团队怎样安排会话和交付改动为例。

Product users ask what feature is shipping next and whether they are using the tool well. He focuses on the second question and uses the Kiro Crew team's session and delivery practices as the example.

## 会话数也要连着人能否接住来看 / Connect session counts to what people can handle

[03:27:07 至 03:27:56](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=12427s)

他介绍 Kiro Crew 用来同时运行多个 Kiro Agent，早期版本来自 Amazon 内部工程师扩展命令行工具的项目。内部试用积累了一批真实工作场景，团队后来把它发展为开源工具。

He introduces Kiro Crew as a way to run several Kiro agents at once. An early internal project grew from engineers extending the command-line tool. Internal use provided real workflows before it developed into an open-source tool.

[03:27:56 至 03:29:11](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=12476s)

他展示项目发布以来的 PR 曲线，也提到合并量包含外部贡献。他更关注每个开发者可以有效带着多少会话并行工作，因为这决定了什么时候人会成为队列。

He shows the project's pull-request curve after release and says it includes outside contributions. He pays more attention to how many sessions one developer can handle effectively, because this reveals when the person becomes the queue.

[03:29:11 至 03:30:11](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=12551s)

他估计大约十分之一的 PR 属于新功能。其余包括测试、缺陷修复和修补已发布功能里使用不便的细节。看到一周数千个 PR 时，需要保留这个分母。

He estimates that roughly one in ten pull requests was a feature. The rest included tests, bug fixes and refinements to things already shipped. That mix matters when reading a total in the thousands per week.

## 把等待从人工反馈移到可持续运行的流程 / Remove the need for constant human feedback

[03:30:11 至 03:30:54](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=12611s)

最开始一个人轮流给一个会话输入和反馈。并行开两三个会话后，Agent 可以同时写代码，但人仍是每条反馈链必须经过的一站，注意力很快用完。

At first one person alternated with one session. Opening two or three sessions let agents write in parallel, while the person remained a required step in every feedback loop. Attention quickly ran out.

[03:30:54 至 03:31:52](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=12654s)

记忆让新会话带上团队惯例，调度让工作按计划出现，远程环境解决了本地设备关闭就停止的问题。Clauson 说这样能让人同时查看十到二十个会话，但其中很多交接仍靠人工。

Memory gives new sessions team conventions, schedules start work at set times, and a remote environment avoids stopping when a local machine shuts down. Clauson says that reached roughly ten to twenty sessions, although many handoffs remained manual.

[03:31:52 至 03:33:35](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=12712s)

团队接着试装配线。路径明确的工作可以逐段交接。一个最初看起来很小的问题如果需要重做规划，固定流程容易停住，最后仍要等人恢复。

Next the team tried an assembly line. Routine work could move through stages. If a small-looking issue required replanning, the fixed process could stall and wait for someone to restore progress.

[03:33:35 至 03:34:31](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=12815s)

Ultra Mode 在任务 Agent 上面加了编排者，从目标出发启动工作、留意阻塞并处理简单偏差。他称这让一个开发者可以带动五十多个会话，现场仍把它定位为预览功能。

Ultra Mode adds an orchestrator above the workers to start tasks from a goal, watch for blockers and handle routine departures. He says it raised capacity beyond fifty sessions per developer and describes the feature as a preview at the time of the talk.

## 让评审能结束，也能说明为什么 / Give reviews a stopping condition and an evidence trail

[03:34:31 至 03:35:53](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=12871s)

测试是 Clauson 所说的第一项投入。他希望任何改动都能重复跑同一套检查，团队可以从检查记录获得一部分信心。他提醒要为测试做实质投入。

Testing is Clauson's first investment. He wants each change to be able to run the same checks, so part of the team's confidence comes from repeatable evidence. That requires substantial work on the tests themselves.

[03:35:53 至 03:36:31](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=12953s)

团队最初要求每一条自动评审意见都改完。修一轮之后，新一轮提了不同意见，评审就没有自然出口。后来他们把破坏构建一类的阻断项和变量命名一类的改进建议分开。

The team initially asked authors to fix every automated review comment. New comments after each revision left no natural end to review. They later separated blockers, such as breaking the build, from suggestions such as a preferred variable name.

[03:36:31 至 03:37:45](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=12991s)

评审先跑快速检查，再把任务分给不同角色。两位代码评审用不同模型系列，其他角色分别看设计、真实问题、交互和安全要求。不同角色的验收依据应有清楚分工。

Review starts with a fast check and then divides into roles. Two code reviewers use different model families. Other roles consider design, whether the change addresses the underlying issue, UX and security requirements. Each role has a distinct basis for accepting work.

[03:37:45 至 03:38:17](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=13065s)

各角色投票通过或不通过。全部通过就进入合并，有问题则由仓库的 PR 准备 Skill 尝试修复。人负责检查评审记录，确认流程按预期走完、结果符合要求，发现偏差就修评审流程。

Reviewers vote pass or fail. All-green changes can proceed to merge. Otherwise, the repository’s PR preparation skill attempts repairs. People inspect the review record for the expected process and result, and change the review process if it falls short.

## 给产品减负，合并后继续核对 / Keep the product coherent and check it after merge

[03:38:17 至 03:38:44](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=13097s)

团队给 Agent 一项明确的减少工作，清理不必要的代码，也用这个原则看路线图。能较快做一个功能，并不能说明用户愿意多学一个概念或多走一步。

The team gives agents an explicit responsibility to remove unnecessary code and applies the same principle to its roadmap. Being able to implement a feature quickly says little about whether users want to learn another concept or take another step.

[03:38:44 至 03:40:23](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=13124s)

合并以后还有发布关。团队从仓库重新下载安装运行，再验证核心流程。评审和周期检查继续观察系统在发布阶段有没有出现回归。

A release gate follows merge. The team installs and runs the software from the repository again, then verifies core workflows. Further review and scheduled checks look for regressions beyond merge.

[03:40:23 至 03:41:36](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=13223s)

他最后回顾注意力、本地设备、固定路径、无止境评审和代码不断增长这几个限制。团队靠找到当前那道限制推进一段，新一轮瓶颈通常又出现在后面的工序。

He closes by revisiting attention, local devices, rigid workflows, endless reviews and unchecked code growth. The team progresses by addressing the current limit, then finds the next one somewhere farther along the process.
