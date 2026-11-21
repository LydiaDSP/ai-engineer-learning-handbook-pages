# 把工程师仍在卡住的任务送回后训练

Melvin Johnson

中英整理稿

中文和英文均为按演讲整理的编辑转述。带时间戳的英文机器转写原文可在下方来源说明打开。

依据 11 月 12 日主直播整理。模型成绩和发布速度来自 Johnson 在会议上的报告。相关数字对应演讲列出的评测范围。 页面同时提供中文导读、按时间定位的中英整理稿和参考练习。

[英文音频转写原文（带时间戳）](transcript-original.txt)

## 从单轮问答换成长程工程任务 / Move beyond single-turn coding

[07:35:58 至 07:41:44](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=27358s)

Johnson 在开头回顾 Gemini 4 的几次发布。他用生成 3D 资产、游戏和多模态文档的演示说明团队瞄准的任务，也用外部评测介绍质量、速度和单次任务成本的取舍。

Johnson opens by reviewing several Gemini 4 releases. He uses demos involving 3D assets, games and multimodal documents to show the intended work, then cites benchmark results to discuss quality, speed and per-task cost.

[07:41:44 至 07:42:52](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=27704s)

他描述的内部工作已从补一行代码、写函数和解决一项 PR，扩展到工程师用 Agent 协作推进数天的任务。结果可能横跨多个文件，交付质量也涉及怎样核对过程。

He describes internal work advancing from code completion, functions and individual pull requests to engineers using groups of agents for tasks that take days. The results can span files, and the quality of delivery includes how the work can be checked.

[07:42:52 至 07:43:31](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=27772s)

团队先收集仍然难的任务，再像资深工程师评审那样给结果打分，用奖励做强化学习。新候选模型交给内部工程师试用，遇到的失败会进入下一轮材料。

The team sources tasks that remain hard, grades outcomes as experienced reviewers would and uses the rewards in reinforcement learning. Engineers try the resulting candidate internally, and failures from that use feed the next training round.

## 换掉模型都会做的题 / Refresh the pool as tasks become easy

[07:43:31 至 07:44:06](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=27811s)

他把三代模型在训练题上的表现放在一起看。同一道题，一代模型会经历有对有错，下一代可能总能通过。因此，训练数据也会像公开评测一样逐渐饱和。

He compares the same task pool across successive model iterations. One version may produce both successes and failures on a task that the next version solves every time. Training data can therefore saturate in a similar way to a public benchmark.

[07:44:06 至 07:44:43](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=27846s)

当一题的每次尝试都收到相同的成功奖励，训练便很难从这道题分辨哪些行为值得加强。他提出持续清理过易的题并补入新题，速度要跟得上模型能力的变化。

When every rollout receives the same success reward, training gets little distinction about what behavior to reinforce on that example. He advocates removing over-easy tasks and adding new ones as capability changes.

[07:44:43 至 07:45:04](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=27883s)

团队从只检查测试通过与否，扩展到用多项评分规则。仓库改动即使还差一个边界条件，也可能在其余维度有有效进展，评分可以保留这类差别。

The team expands beyond a single test pass or fail to rubrics with several criteria. A repository change may miss one edge case while making useful progress elsewhere, and grading can preserve that distinction.

## 从三个地方找可验收的难题 / Source tasks with verifiable outcomes

[07:45:04 至 07:45:23](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=27904s)

第一类来自开源仓库里的真实多文件提交。团队用自动化流程从提交构建可复现的容器沙箱，由模型提取评分规则，无需已有单元测试。

The first category comes from real multi-file commits in open-source repositories. An automated pipeline turns each commit into a reproducible container sandbox, and models derive scoring rubrics. Pre-existing unit tests are optional.

[07:45:23 至 07:45:56](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=27923s)

第二类让模型在空目录里按规格构建命令行工具。以 grep 为例，任务给出参数、选项和行为约定，交付后用保留的测试检查可执行程序的表现。

A second category starts in an empty directory and asks the model to implement a CLI from a specification. In the grep example, arguments, flags and behavior are specified, and held-out tests evaluate the resulting executable.

[07:45:56 至 07:46:04](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=27956s)

第三类从生产代码库里的实际使用和改动提取。和单段编程题相比，这些工作会带上团队约定、库的历史结构及维护成本。

A third category comes from actual usage and diffs in production repositories. In addition to the coding task itself, these examples carry team conventions, the repository's existing structure and maintenance constraints.

## 把评分环境当成工程系统 / Engineer the grader and its environment

[07:46:04 至 07:46:47](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=27964s)

Johnson 提醒，系统需要分辨一个成功信号背后的原因。Agent 有时会围绕评分结果行动，表面通过的改动因此还要按它解决的真实问题来复查。

Johnson cautions that the system needs to understand why it received a success signal. Agents can optimize around the score, so a passing change still needs to be checked against the actual problem it was meant to solve.

[07:46:47 至 07:47:46](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=28007s)

他用资深代码评审作参照。评分除功能正确性外还要看维护难度、改动范围、边界条件和验证证据，避免把一个绿色标记当成交付的全部标准。

He uses senior code review as a reference. Alongside functional correctness, grading covers maintainability, change scope, edge cases and verification evidence, so a single green indicator does not stand in for the whole job.

[07:47:46 至 07:49:22](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=28066s)

团队隔离评分环境，限制参考答案和保留测试提前暴露，避免评测规则因重复接触答案而失效。他强调依据可观察的变更、运行记录和最终证据来评估行为。

The team isolates the grading environment and limits early access to reference answers and held-out tests, so repeated exposure does not change what the test measures. He emphasizes evaluating observable changes, execution records and evidence.

## 对照轨迹，核实“完成了” / Ground the final report in the run

[07:49:22 至 07:50:02](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=28162s)

Johnson 举了几种报告与实际行为不符的情形。Agent 可能宣称测试通过、改动已完成或任务已交付，实际结果却不支持这些说法。它也可能编出事实或接口，或者报出一堆难以核对的数字。

Johnson gives examples of status reports that conflict with what actually happened. An agent may claim it passed tests, made edits or finished work without a result that supports the claim. It may also invent facts or APIs, or produce a wall of numbers that is hard to verify.

[07:50:02 至 07:51:00](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=28202s)

Johnson 给出了内部高难评测中的编造比例变化。他将数据改进归因于清理训练轨迹，以及对照完整执行过程，过滤交付说明里找不到依据的主张。

Johnson presents changes in the fabrication rate on a difficult internal evaluation. He attributes improvement to cleaning training trajectories and checking final claims against the complete run to remove unsupported examples.

[07:51:00 至 07:51:51](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=28260s)

他希望模型遇到难题时能如实交代已经做到哪一步，顺便留下剩余问题。对接手的人而言，明确的部分结果比自信的完成声明更容易继续验证。

He wants the model to state its actual progress on a hard task and leave the remaining problem visible. A clear partial result is more useful for a human who needs to continue or verify the work.

## 把内部工程师的反馈送回训练 / Put developer friction back into training

[07:51:51 至 07:52:48](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=28311s)

Johnson 用 Google 一个复杂的单体代码仓库说明内部试用的难度。工程师在真实任务中使用后训练候选模型，团队通过不显示模型身份的对照测试、实验流量和使用反馈来发现差别。

Johnson points to Google's complex monorepo to explain what makes internal testing demanding. Engineers use post-training candidates on real tasks. The team compares model versions through blind tests, experimental routing and feedback.

[07:52:48 至 07:53:40](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=28368s)

使用中的摩擦随后进入下一轮训练，让工程师不断提出更难的问题。发布速度加快是他描述的结果之一。持续发现失败才是他在演讲中强调的训练方法。

Friction from use feeds back into the next round, while engineers keep posing harder problems. Faster release cycles are one reported result. Continually discovering failures is the training practice he emphasizes.
