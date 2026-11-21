# Claude 怎样组织千名 Agent，又怎样修正自己的记忆？

Lance Martin

中英整理稿

中文和英文均为按演讲整理的编辑转述。带时间戳的英文机器转写原文可在下方来源说明打开。

依据第二日直播 03:48:31–04:06:51 整理，使用大会阅读版核对场次，并用 Anthropic 的费马大定理形式化、Fable 5.2 发布资料与 Agent 记忆研究核对术语。中英正文使用同一编辑转述。证明形式化与记忆评测的结果均由 Anthropic 报告。游戏案例中的错误来自错误位置记录。Dreaming 在这场演讲中指回看并整理记忆的计算过程，人类睡眠是讲者用来说明思路的类比。 页面同时提供中文导读、按时间定位的中英整理稿和参考练习。

[英文音频转写原文（带时间戳）](transcript-original.txt)

## 把已有证明变成 Lean 可以检查的对象 / Turn an existing proof into an object Lean can check

[03:48:37 至 03:48:57](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=13717s)

Martin 用两个案例说明 Claude 如何处理时间跨度更长的工作。第一个案例里，有许多 Agent 要同时协调同一份证明。第二个案例里，新会话需要重新找到前一次工作留下的知识。

Martin uses two examples to explore work that spans longer periods. In the first, many agents coordinate on the same proof. In the second, a fresh session needs to find knowledge left by earlier work.

[03:48:57 至 03:49:54](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=13737s)

费马大定理讨论的是指数 n 为大于 2 的整数时，方程 aⁿ + bⁿ = cⁿ 没有正整数解。Martin 提到 Andrew Wiles 早已给出证明。这个案例关注计算机如何检查证明中的每一步。

Fermat’s Last Theorem rules out positive integer solutions to aⁿ + bⁿ = cⁿ for integer exponents greater than two. Martin recalls Andrew Wiles’s earlier proof and focuses on expressing it in a form a computer can check step by step.

[03:49:54 至 03:50:24](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=13794s)

Anthropic 在九月报告了首轮 Lean 形式化工作。Lean 可以检查各步能否成立。一支约十几名 Agent 的队伍起初需要额外的管理工具和人的协助。

Anthropic reported an earlier Lean formalization in September. Lean could check the validity of the steps, while a team of roughly a dozen agents initially needed extra project tooling and human support.

[03:50:24 至 03:50:54](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=13824s)

此前实验使用 Prove2Me 来跟踪证明状态和可查询的依赖关系。Martin 随后问，换成更大的队伍，可否由 Agent 自行搭起够用的协调方式，同时保留 Lean 的验证。

The earlier run used Prove2Me to track proof state and expose a queryable dependency structure. Martin then asks whether a larger team can organize its own work while keeping Lean as the verifier.

## 给千人队伍共享状态和明确边界 / Give a thousand agents shared state and clear limits

[03:50:54 至 03:51:33](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=13854s)

后续实验把队伍扩大到 1,000 个 Fable 5.2 Agent，并移除了 Prove2Me 这层面向数学证明的专用编排。目标是观察 Agent 能否自行解决协调问题。

The follow-up grows the team to 1,000 Fable 5.2 agents and removes Prove2Me as the domain-specific coordination system. The experiment asks whether they can organize the work themselves.

[03:51:33 至 03:51:50](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=13893s)

每个 Agent 有自己的沙箱，网络受到限制。共同可用的资源是 Git 和 SQL 数据库，分别支持共享代码及项目状态。

Each agent runs in its own sandbox with restricted network access. Shared Git and SQL provide common places for code and project state.

[03:51:50 至 03:52:06](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=13910s)

Anthropic 实时监控工具调用，也定期复查运行记录。少给数学协作流程，与继续保留隔离、监控和数学检查可以同时成立。

Anthropic monitored tool calls in real time and periodically reviewed the runs. The team simplified the math coordination setup while retaining isolation, monitoring, and proof checking.

[03:52:06 至 03:52:42](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=13926s)

初始指令指定一名领队和 999 名助手，并告知 Git、数据库和题目。五分钟左右，领队开始为整支队伍建立数据库表。

The initial prompt designated one lead and 999 helpers and described Git, the database, and the problem. Roughly five minutes in, the lead began creating tables for the team.

## 领队怎样分工，进度怎样被看见 / How the lead allocates work and makes progress visible

[03:52:42 至 03:52:56](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=13962s)

领队开设了公告、角色分配、共享笔记、子任务和落地状态等表。其他 Agent 随后用这些表交换进展，并据此分配任务。

The lead created tables for announcements, assignments, notes, subtasks, and landed work. Agents then used those tables to exchange progress and route work.

[03:52:56 至 03:53:41](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=13976s)

演讲用一张读写时间图展示协作过程。在主要转折点，领队通过公告表发消息，助手在相关表里认领工作、交流状态，完成的 Lean 代码逐步落地。

A read and write timeline illustrates the coordination. The lead publishes announcements at key points, helpers coordinate assignments and status, and completed Lean code lands over time.

[03:53:41 至 03:54:11](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=14021s)

Martin 说这轮运行约 30 小时。遇到较难的部分，队伍构建了更细的任务依赖树，把某个证明分支拆成相互衔接的工作。

Martin says the run lasted about 30 hours. For difficult portions, the agents constructed finer task trees, breaking a proof branch into work with explicit dependencies.

[03:54:11 至 03:55:07](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=14051s)

人员分配随证明进度变化。Martin 展示了约 60 个中间命题的推进，领队和助手会随阶段变化到别处继续做。

Assignments shifted as work progressed. Martin shows progress across about 60 intermediate statements, with the lead and helpers reallocating as different parts became ready.

[03:55:07 至 03:55:42](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=14107s)

他把这次结果与九月的小队实验并列。新实验提供了更多 Agent 和安全监控，但省去了专为数学任务做的协作框架。这个案例有 Lean 提供可检验的结果，成功经验能迁移到哪里，还要看新任务的可验证程度。

Martin compares the run with the earlier small-team experiment. The follow-up has more agents and safety monitoring, while omitting a dedicated math coordination harness. Lean gives this case a checkable outcome, which matters when considering transfer to other tasks.

## 会话里的笔记怎样成为以后用得上的记忆 / Which session notes become useful future memory

[03:55:42 至 03:56:24](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=14142s)

Martin 从多 Agent 协作转到另一个长任务问题，Claude 怎样整理自己的上下文。他用克尔凯郭尔的观察引入记忆话题。经历是往前发生的，理解往往来自事后回看。

Martin moves from multi-agent collaboration to a separate long-horizon problem, how Claude organizes its own context. He introduces memory with Kierkegaard’s observation that life is lived forward and understood in retrospect.

[03:56:24 至 03:57:32](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=14184s)

Agent 边做事边记下眼前有用的线索，未来会话需要的是连贯、少重复的知识。Martin 用人的日常记忆与事后巩固做类比，提出把会话内记录和事后整理分成两个阶段。

Agents record what seems useful as they work, while future sessions need coherent knowledge with little duplication. Martin compares this to everyday memory and later consolidation, and separates in-session recording from retrospective organization.

[03:57:32 至 03:58:14](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=14252s)

CL-Bench 的数据库问答序列里有 40 个问题。每题从新会话开始，记忆文件夹在会话间保留。团队只告知文件夹可用，让模型自己决定何时读写。

In a CL-Bench database sequence, the model answered 40 questions in fresh sessions with a notes directory that persisted. The prompt made the directory available and left decisions about reading and writing to the model.

[03:58:14 至 03:59:22](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=14294s)

Martin 报告不同模型的收益不一样。Sonnet 4.6 的收益很小，后续更强的模型更常在适当时机读写，也留下更多经过验证的数据库观察。

Martin reports different gains across models. Sonnet 4.6 benefits little in this setup. Stronger models more often read and write at useful moments and retain more verified observations about the database.

[03:59:22 至 04:00:51](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=14362s)

在 Pokémon 对照中，Sonnet 3.7 留下了大量流水账。Fable 5 的目录更紧凑，记录更多即时画面里取不回来的战术信息，游戏里也走得更远。图的方块大小代表文件数量。

In the Pokémon comparison, Sonnet 3.7 kept many experience records. Fable 5 kept a smaller collection with more tactical knowledge that was hard to recover from the current game state, and moved further in the game. Block size in the diagram represents file count.

## Dreaming 怎样从记录里重组知识 / How dreaming reorganizes knowledge from records

[04:00:51 至 04:01:16](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=14451s)

数据库问答和游戏里，模型是在做事时记笔记。Martin 随后介绍 Dreaming，让模型有机会回头看已经写下的记录。

The database and game examples let the model write notes during the activity. Martin then introduces dreaming as a later chance to revisit what was written.

[04:01:16 至 04:01:56](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=14476s)

会话转录保留完整过程，所以可以从源头往回找。转录通常很长，当场笔记则抓住若干重要观察，给下一次工作一个更快的入口。

Transcripts retain the underlying sequence of events, so an agent can go back to the source. They are often long. Notes capture selected observations and offer a faster starting point.

[04:01:56 至 04:02:09](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=14516s)

整理程序可以连同笔记一起回看转录，重组出能导航的 Wiki。少量经筛选的重要知识还可以被提升为未来会话一开始就得到的上下文。

A consolidation pass can revisit transcripts and notes and organize them into a navigable wiki. Selected high-value facts can also be promoted into context loaded at the start of future sessions.

[04:02:09 至 04:02:21](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=14529s)

这个过程允许改变记忆的形态和摆放位置。后续任务需要什么、错误从哪条记录传进来，以及哪条信息适合常驻，都可以带着证据重新决定。

The pass can change both the representation and placement of memory. It can use evidence to reconsider what a future task needs, where a mistake came from, and which information should be loaded routinely.

## 一个错误地点怎样让 Agent 反复走错 / How a wrong location keeps sending an agent off course

[04:02:21 至 04:03:11](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=14541s)

Pokémon 的一次运行里，Claude 把某个地标写错。后续会话读到同一条记忆，把自己定位错了，反复掉进同一个活板门。

In one Pokémon run, Claude recorded a landmark in the wrong location. Later sessions reused that note, misidentified their position, and repeatedly fell through the same trapdoor.

[04:03:11 至 04:03:42](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=14591s)

进度图向上表示关卡推进，向下表示退回。Martin 展示的原始记忆条件反复回落，引入 Dreaming 的条件能检查旧记录、修正位置，并继续下一关。

The progress plot moves upward as the game advances and downward when it regresses. The raw-memory run falls back repeatedly. With dreaming, the agent revisits the note, fixes the location, and proceeds.

[04:03:42 至 04:03:52](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=14622s)

这次演示说明，错误笔记在会话之间保留时，可能持续影响动作。事后重看记录提供了一个修正点，可以保留其他有用的游戏知识。

The example shows how a persistent error can keep influencing actions across sessions. Reviewing the history creates a chance to correct it while retaining other useful game knowledge.

## Wiki 与检索可以一起用 / A wiki and search can work together

[04:03:52 至 04:04:35](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=14632s)

Anthropic 用脱敏后的 Stainless 内部文档和 Slack 消息构造实验，准备了 25 道需要这批材料才能回答的问题，再让 Claude 从资料中构建 Wiki。

Anthropic assembled an anonymized corpus of internal Stainless documents and Slack messages. It prepared 25 questions that required the corpus and let Claude build a wiki from the material.

[04:04:35 至 04:05:44](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=14675s)

Martin 报告，对原始资料做语义检索的基线约为 53%。投入更多整理计算时，Wiki 帮助回答更多问题。在这项评测中，同时使用 Wiki 和检索的成绩也高于只查原始资料。

Martin reports a baseline of about 53 percent for semantic search over the raw sources. With more consolidation compute, the wiki helped answer more questions. Using the wiki with search also scored higher than raw search alone in this evaluation.

[04:05:44 至 04:06:25](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=14744s)

在另一项评测里，最初的 Wiki 有一些占位链接，实际页面还不存在。事后整理检查已有的条目，把缺页补上并建立索引。

In a different benchmark, the first wiki contained placeholders that pointed to pages that did not exist. A later consolidation pass revisited the existing material, added the missing pages, and created an index.

[04:06:25 至 04:06:52](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=14785s)

Martin 最后列出的结果各有具体用途。错误需要校正，知识缺口需要补足，积累起来的记录可以组织成新的表示。能把内容写到文件里之后，维护它就成了另一项工作。

Martin closes with several distinct jobs for consolidation. It can correct errors, fill gaps, and reorganize accumulated records into a new representation. Maintaining memory becomes a task of its own once writing files is possible.
