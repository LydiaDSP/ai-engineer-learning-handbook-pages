# 当 Devin 接手实现，工程师怎样接住整个交付过程？

Walden Yan

中英整理稿

中文和英文均为按演讲整理的编辑转述。带时间戳的英文机器转写原文可在下方来源说明打开。

依据第二日直播 02:33:30–02:47:07 整理，讲者身份与场次名称与大会阅读版交叉核对。中英正文为同一内容的编辑转述。合并量、团队规模及案例成效为讲者分享的内部数据。p99 是持续工作的构想示例。Android 应用在演讲时有可用版本，讲者说即将发布。 页面同时提供中文导读、按时间定位的中英整理稿和参考练习。

[英文音频转写原文（带时间戳）](transcript-original.txt)

## 合并量增加之后，谁决定该做什么 / Who decides what to build when merges rise

[02:33:35 至 02:34:06](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=9215s)

Walden Yan 是 Cognition 联合创始人兼首席产品官。虽然团队做的是 Devin，他把演讲重心放在公司内部怎么开发软件，以及代码库和团队结构如何跟着变。

Walden Yan, Cognition’s cofounder and chief product officer, uses Devin as the backdrop for a talk about the company’s own engineering process and the changes it made to its codebase and teams.

[02:34:06 至 02:35:09](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=9246s)

他展示了约一年的内部变化。据他报告，合并 PR 的吞吐约为起点的 40 倍，同期工程人员规模是 2.7 倍。PR 计数说明变化规模，他对质量的评价属于自身观察。理解图表的重点，是追问这么多改动如何走到合并。

Yan shows roughly a year of internal figures. He reports about 40 times the merged pull request throughput and 2.7 times the engineering headcount. The volume figures set the scale of the change, while his assessment of quality reflects his own judgment.

[02:35:09 至 02:36:02](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=9309s)

Walden 说，有些 PR 从最初报障到最终合并、监控和维护，全程无人介入。遇到需要人判断的情况，再把决定交给人。他把只从 Linear 挑工单再交给 Agent 实现视为工程师需要走出的一种工作方式。

Yan says some pull requests went from initial bug report through merge, monitoring, and maintenance without anyone intervening. Cases that required judgment were escalated to a person. He argues that engineers need to move beyond picking tickets from Linear and handing them to an agent.

[02:36:02 至 02:36:50](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=9362s)

Cognition 把大团队拆成更小的产品小组。Walden 举例，两三名工程师可以同时对客户反馈、QA、产品判断和自己的待办负责。Agent 提高了他们实施决定的能力，小组仍要自己理解需求并验收结果。

Cognition split larger teams into smaller product pods. A pod of two or three engineers may own customer feedback, QA, product decisions, and its backlog. Agents give the pod more implementation capacity while the pod remains responsible for understanding the need and checking the outcome.

## 一条故障视频，怎样传到验收 / How a defect video becomes acceptance evidence

[02:36:50 至 02:37:02](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=9410s)

Walden 展示的流程从 Slack 开始。客户发来一段记录异常的视频，工程师转发报告并在对话里请 Devin 处理。原始行为随报告一起交过去。

The reported workflow starts in Slack. A customer sends a video of the failure, and the engineer forwards the report and asks Devin to act in the conversation. The report carries the original behavior with it.

[02:37:02 至 02:37:20](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=9422s)

Devin 返回 PR，同时附上修复后行为的录像。工程师可以先看录像检查问题是否还出现，再把修复证据回给客户。

Devin returns a pull request and a video of the behavior after the change. The engineer can inspect the recording and share the fix evidence with the customer.

[02:37:20 至 02:37:59](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=9440s)

这种交接把技术细节留在 PR 和运行记录中，给当事人一份容易核对的结果。Walden 描述的大部分操作可以在 Slack 完成，背后仍需要一个能重现故障并跑验证的环境。

The pull request and run record retain the technical detail, while the people involved get evidence they can inspect quickly. Yan describes much of the handoff happening in Slack, backed by an environment that can reproduce the failure and run checks.

## 让 Agent 每次都拿到能启动的环境 / Give every agent a runnable environment

[02:37:59 至 02:38:12](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=9479s)

以往团队在云上的 staging 环境、数据库和在线服务上做联调，工程师手工点关键流程确认。这个设置给人用得顺手，临时启动的 Agent 也得具备同样的依赖和访问条件才跑得起来。

Previously, engineers clicked through end-to-end flows against cloud staging, a staging database, and live servers. A freshly started agent would also need working access to those same dependencies to reproduce the test.

[02:38:12 至 02:38:33](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=9492s)

团队把服务迁到可在本地用 Docker Compose 启动的版本，并给外部依赖准备了模拟实现。Walden 说，编码 Agent 可以在自己的一台虚拟机里跑起测试流程，无需触碰在线服务。

The team moved services to a local Docker Compose setup and provided mocks for external dependencies. In Yan’s account, a coding agent can exercise the test flow inside one virtual machine without reaching live services.

[02:38:33 至 02:39:04](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=9513s)

公司每小时用最新代码从头重建虚拟机。构建出错时，Devin 先调查并修复快照。由 Slack 启动的后续会话由此能落到较新的代码和环境上。

The company rebuilds its virtual machines hourly from the latest code. Devin is among the first responders when the build breaks. Later sessions launched from Slack can then start with a fresh copy of the code and environment.

[02:39:04 至 02:39:56](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=9544s)

能开机只是第一步。Devin 还会维护说明如何测试代码库的 Skills，随着代码调整更新步骤。环境和测试说明在同一次开发周期里逐渐演化。

Booting the environment is one step. Devin also maintains skills that document how to test the codebase and updates those instructions as the application changes. The environment and its testing instructions evolve alongside the code.

[02:39:56 至 02:40:23](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=9596s)

测试可以覆盖更复杂的交互。Walden 以多人语音为例，描述一台虚拟机里的多个账号加入同一通话并来回传送语音，用来验证参与者之间的功能。

The setup can exercise more involved interactions. Yan describes a multiuser voice test in which several accounts join the same call from one virtual machine and exchange voice clips to check the behavior across participants.

## 用运行记录来改交付流程 / Use run records to improve the delivery process

[02:40:23 至 02:40:55](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=9623s)

云 Agent 的操作、PR 和决策留下运行轨迹。Walden 提议再用 Agent 读这些记录，找出耗时、消耗 token 或重复出现的工作，并判断哪些可以转成脚本或测试。

Cloud agent activity, pull requests, and decisions leave a record. Yan describes applying agents to this history to find expensive or repetitive work and identify candidates for scripts or tests.

[02:40:55 至 02:41:11](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=9655s)

Cognition 有一个 Slack 频道，Devin 每天在那里发流程改进建议。比如调整 Node 环境可能为 CI 省一分钟，改 lint 脚本可能在进入 AI 评审前多拦住约 20% 的这类问题。这两项是建议里的预期收益。

Cognition has a Slack channel where Devin posts process suggestions daily. It might suggest changing the Node setup to shave a minute off CI or revising lint to catch about 20 percent more of these bugs before AI review. These are projected benefits from example proposals.

[02:41:11 至 02:41:21](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=9671s)

这条流程将优化对象从应用扩展到了交付过程。它需要可回看的记录及一个具体改动，才能追踪某类任务在修改之后是否变得更好处理。

This extends the optimization target from the application to the delivery process. A reviewable record and a specific proposed change let a team trace whether a class of work becomes easier afterward.

## 从一次性工单到持续跟踪的指标 / Move from one issue to an ongoing metric

[02:41:21 至 02:41:47](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=9681s)

Walden 设想，将单次实现任务扩展为持续关照某个结果的工作。Agent 可以围绕这个结果安排测量、找改动机会和更新进展。

Yan proposes extending a one-off implementation task into a standing job. The agent can organize measurement, look for changes, and report progress against the intended result over time.

[02:41:47 至 02:42:33](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=9707s)

他用 p99 延迟举例。为了看清最慢一小部分请求，先加遥测并建立基线，再补告警、拆分调查项和候选改动。Datadog 与 Slack 周报是他演示怎么串联这些动作的设想。

His example is p99 latency, a measure of the slow tail of requests. The proposed job starts with telemetry and a baseline, followed by alerts, investigation, and candidate changes. Datadog and weekly Slack updates are examples of how to connect those activities.

[02:42:33 至 02:43:11](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=9753s)

类似的可观测目标还可能是一次点击引发的延迟、页面布局位移或新用户入门留存。量到了什么，需要与自己在意的用户结果对得上。

Other possible signals include the time after a user click, a page layout shift, or retention during onboarding. Teams still need to check how a signal connects to the user outcome they care about.

[02:43:11 至 02:44:02](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=9791s)

Walden 介绍了团队用新一代 NVIDIA Vera Rubin GPU 优化推理吞吐的例子。团队提供固定的 GPU 资源，让 Agent 试验不同策略，再把表现最好的候选项发给工程师批准。

Yan describes a throughput optimization effort on new NVIDIA Vera Rubin GPUs. The team allocated a standing set of GPUs, let agents test different strategies, and sent the strongest candidates to a human engineer for approval.

[02:44:02 至 02:44:26](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=9842s)

据 Walden 分享，那轮试验提出了约八九种有效方向，在团队的测试中把新硬件的吞吐推到优于此前 GB300 的水平。演讲没有给出足以比较对方环境的完整基准配置。

Yan reports about eight or nine productive ideas and throughput above the previous GB300 setup in the team’s tests. The presentation does not give the full benchmark setup needed to reproduce that comparison elsewhere.

## 把 iOS 当参照，持续维护 Android 功能 / Maintain Android parity using iOS as a reference

[02:44:26 至 02:45:07](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=9866s)

产品团队想补一个 Android 应用，手头已有正在维护的 iOS 版本。工程师给 Devin 的工作目标，是让 Android 持续跟随 iOS 的功能。

The product team wanted an Android app and already had an iOS version under active development. The job given to Devin was to maintain Android feature parity with iOS over time.

[02:45:07 至 02:45:38](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=9907s)

这个工作有长期触发条件。代码库里的 iOS 变更会被持续观察，Slack 用户反馈提供另一条输入，QA 流程则把 Android 与 iOS 行为放到一起对照。

The job has recurring triggers. Changes to iOS are watched in the repository, feedback arrives through Slack, and QA lets the Android behavior be checked alongside iOS.

[02:45:38 至 02:46:16](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=9938s)

据讲者说，44 天后团队有了可运行的 Android 应用。大多数日子没人给这个 Agent 发消息。这些日子它仍会合并约 40 到 50 个 PR，只将最重要的决定交给人。

Yan says the team had a working Android app after 44 days. On most days no human sent this agent a message. On those days it still merged around 40 to 50 pull requests, escalating only the most important decisions.

[02:46:16 至 02:46:52](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=9976s)

工程师通常在 Slack 里看 Agent 发回的测试录像，演讲时应用仍准备上线。这个例子讲的是持续工作的组织方式，并没有给出发布后的使用数据。

Engineers typically checked recordings returned in Slack. At the time of the talk, the app was still being prepared for release. The case describes the operating process and does not supply post-release use data.

[02:46:52 至 02:47:08](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=10012s)

Walden 最后回到这些实例背后的共同条件。团队先建立能持续运行、观察结果和反馈问题的流程，再把更大的工程目标交给 Agent。

Yan closes by returning to the loops behind the examples. Teams establish ways to keep work running, observe results, and feed problems back before assigning larger engineering goals to agents.
