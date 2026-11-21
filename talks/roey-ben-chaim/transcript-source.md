# 审查 Agent Skill 时，怎样看见实际行为？

Roey Ben Chaim

中英整理稿

中文和英文均为按演讲整理的编辑转述。带时间戳的英文机器转写原文可在下方来源说明打开。

依据大会官方独立补录和时间戳字幕，从开场、方法、后半段调查结果整理到结语。第 1 天主回放约 05:01:21 在沙箱测试途中切出，对应独立录像约 05:45。独立录像约 05:58 结束该主题，06:03 转入工具轨迹。此页正文、图注及回看链接均使用约 14 分 30 秒的独立录像时钟。官方字幕列出 231 段机器转写。正文按主题合并为 18 段中英转述，涵盖开场至致谢。研究规模和处置结果按讲者所述记录。安全案例保留防护要点。

[英文音频转写原文（带时间戳）](https://ai.engineer/code/2026/talks/online-zenity-skills#transcript)

## 如何判断一次访问 / Interpreting sensitive access

[00:00:03.000—00:00:26.000](https://www.youtube.com/watch?v=_7P580m4kPY&t=3s)

Roey Ben Chaim 介绍 Zenity 团队做的一组实验。团队让 Agent 在隔离环境里执行各类 Skill，再用记录回答一个问题：安装的说明和实际发生的行为有多大差别？

Roey Ben Chaim introduces a Zenity experiment. The team observed agents using skills in isolated environments and compared the skills’ stated purposes with their behavior.

[00:00:26.000—00:00:50.000](https://www.youtube.com/watch?v=_7P580m4kPY&t=26s)

一个 Skill 可以为 Agent 提供按需加载的能力。说明、资源和代码由外部提供方维护，执行时能接触到的内容可能比安装时看到的多。

A skill adds capabilities on demand. Its external provider can supply instructions, resources and code. The material available at run time may be broader than what the reviewer saw during installation.

[00:00:50.000—00:01:37.000](https://www.youtube.com/watch?v=_7P580m4kPY&t=50s)

开场的轨迹看起来涉及敏感环境信息，讲者随后揭示它出自一个正当的 Azure 诊断工具。安全判定需要结合用户任务、访问范围和数据去向。

The opening example shows access to sensitive environment information. Ben Chaim identifies it as a legitimate Azure diagnostic. Assessing the run requires the task, the scope of access and the destination of any data.

## 静态审查能看到什么 / What static review can establish

[00:01:37.000—00:02:49.000](https://www.youtube.com/watch?v=_7P580m4kPY&t=97s)

静态检查有两处局限。一份入口文件无法涵盖执行中才取得的材料。文件里的文字也可能影响自动审查器，所以审批声明需要从独立记录核验。

Static review has two limits. An entry file gives only a partial picture of what a skill may load. Its text may also influence an automated reviewer, so approval claims need validation against an independent record.

## 让测试到达待观察的路径 / Reaching the behavior under review

[00:02:49.000—00:03:27.000](https://www.youtube.com/watch?v=_7P580m4kPY&t=169s)

团队把 Agent 与 Skill 放进沙箱，并为 Agent 指定工作。执行以后，他们读取 Agent 的运行轨迹。这是第一版，用于确认方法能否从实际行为获得线索。

The first setup placed an agent and a skill in a sandbox, gave the agent a task, and collected its trace. It tested whether running a task could produce useful behavioral evidence.

[00:03:27.000—00:03:55.000](https://www.youtube.com/watch?v=_7P580m4kPY&t=207s)

有些试验根本走不到要观察的操作，原因是测试环境缺少 Skill 所需的服务或项目状态。团队增加环境准备模块，按任务补足模拟服务和夹具。

Some runs never reached the behavior of interest because the necessary service or project state was missing. The team added a component that prepared the sandbox with the context and dependencies needed for a test.

[00:03:55.000—00:04:50.000](https://www.youtube.com/watch?v=_7P580m4kPY&t=235s)

只给一个任务也会缩小覆盖面。一项部署型 Skill 可能在配置、发布和恢复三种任务里走不同分支。团队按不同任务分别记录实际走到的步骤。

One assignment also limits coverage. A deployment skill may take different branches when asked to set up, ship or recover a service. The test records which paths the assigned tasks actually reached.

[00:04:50.000—00:05:58.000](https://www.youtube.com/watch?v=_7P580m4kPY&t=290s)

讲者讨论了测试中途因安全判断停下的情形。复核有必要保留停止原因，并把未走到的步骤标为未覆盖。普通工作也可能触发停止，结论应基于可核查的实际行为。

Ben Chaim describes runs that stopped when a safeguard intervened. The investigator should record the stop and mark later behavior as untested. Legitimate work can trigger a stop as well, so the verdict depends on evidence.

[00:05:58.000—00:06:03.000](https://www.youtube.com/watch?v=_7P580m4kPY&t=358s)

测试架构逐步把环境准备、任务选择、日志采集和安全评估分开。这样，团队可以先判断测到了哪个环节，再评估那一段行为是否符合任务范围。

The setup evolved to separate environment preparation, task selection, logging and assessment. That let the team check what it had reached before judging whether the observed behavior belonged to the task.

## 补上工具轨迹缺少的证据 / Filling observability gaps

[00:06:03.000—00:06:43.000](https://www.youtube.com/watch?v=_7P580m4kPY&t=363s)

完整录像在 06:03 从沙箱测试转入工具轨迹的记录缺口。会话轨迹只能确认 Agent 发出某项工具请求，后续程序做了什么，需要与操作系统和网络记录对照。

At 06:03 the full recording moves from sandbox testing to gaps in tool traces. A conversation trace can confirm a tool invocation. Process and network records are needed to understand the effects that follow.

[00:06:43.000—00:07:08.000](https://www.youtube.com/watch?v=_7P580m4kPY&t=403s)

把不同日志拼到一起，可以把一次工具调用与后续进程、文件变更和网络活动对齐。审查者再核对这些事件的来源和授权。

Correlating logs links tool invocations with subsequent processes, changes to files and network activity. A reviewer can then assess source and authorization for each event.

## 间接依赖和持续影响 / Indirect dependencies and later effects

[00:07:08.000—00:08:10.000](https://www.youtube.com/watch?v=_7P580m4kPY&t=428s)

一个研究演示表明，间接加载的组件可能改变 Skill 的行为。讲者约 07:36 说明概念演示使用的是非恶意样例。约 07:57，他另行报告，他们在数千个受检 Skill 中找到了 100 项恶意条目，并提到相关条目被移除。

An experiment illustrates that indirectly loaded components can change a skill’s behavior. Around 07:36, the speaker says the demonstration used a benign example. Separately, around 07:57, he reports finding about 100 malicious entries among thousands of skills examined and says the entries were removed.

[00:08:10.000—00:08:49.000](https://www.youtube.com/watch?v=_7P580m4kPY&t=490s)

讲者用另一个依赖替换案例强调，熟悉的名称不足以确认来源。审查应核对实际加载组件的身份、提供方与预期依赖是否一致。

A second case illustrates why familiar branding is weak evidence of origin. The reviewer should compare the loaded component’s identity and supplier with the dependency the user expected.

[00:08:49.000—00:10:35.000](https://www.youtube.com/watch?v=_7P580m4kPY&t=529s)

有些额外行为只会在之后的会话中出现。核查范围要覆盖安装后留下的配置、在后续阶段生效的规则，以及外部内容变更对下一次运行的影响。

Some effects surface only in later sessions. An assessment needs to account for changed configuration, behavior that applies to later runs, and content that can change outside the local installation.

## 仿冒项目调查和披露 / Investigating and disclosing lookalikes

[00:10:35.000—00:12:40.000](https://www.youtube.com/watch?v=_7P580m4kPY&t=635s)

后半段介绍了一宗仿冒项目调查。研究人员根据实际行为和数据去向追踪供应链风险，并在多个分发渠道发现关联。这个案例以防守视角概述。

The second half describes a lookalike project investigation. Researchers followed the observed behavior and data destinations to connect risks across distribution channels. This passage summarizes the defensive findings.

[00:12:40.000—00:13:33.000](https://www.youtube.com/watch?v=_7P580m4kPY&t=760s)

讲者提到关联 Skill 累计下载约 170 万次。这个数字描述传播规模。讲者还说，团队将调查交给相关平台，平台随后移除了有关内容。

Ben Chaim cites around 1.7 million cumulative downloads for related skills, a measure of distribution. He also reports that the team notified the relevant platforms and that they removed the material.

## 按依赖审查原理采用 Skill / Reviewing skills as dependencies

[00:13:33.000—00:14:08.000](https://www.youtube.com/watch?v=_7P580m4kPY&t=813s)

结尾把 Skill 放回 Agent 的软件供应链。网页、数据库记录和第三方包都可能进入上下文。采用 Skill 前可核对其来源和依赖，把权限限在任务范围内，再观察执行证据。

The conclusion places skills within an agent’s wider supply chain. Web pages, database records and packages can all affect context. The recommended review covers provenance, dependencies, task-scoped access and observed execution.

[00:14:08.000—00:14:30.000](https://www.youtube.com/watch?v=_7P580m4kPY&t=848s)

讲者感谢参与构建测试环境的研究和工程团队，最后指出团队还提供了供进一步了解的测试入口。

Ben Chaim acknowledges the research and engineering team, and closes by pointing listeners to the team’s testing project.
