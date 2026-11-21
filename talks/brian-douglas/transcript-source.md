# 把资深同事的 PR 评审意见留给下一次

Brian Douglas

中英整理稿

中文和英文均为按演讲整理的编辑转述。带时间戳的英文机器转写原文可在下方来源说明打开。

根据第二日直播对应场次的本地英文机器转录整理，用大会赛后阅读版核对讲者、场次与术语。中英正文为同一内容的编辑转述，数据和产品经历按讲者陈述归属。 页面同时提供中文导读、按时间定位的中英整理稿和参考练习。

[英文音频转写原文（带时间戳）](transcript-original.txt)

## 会写代码以后，还得知道团队为何挑另一种写法 / Team judgment goes beyond getting code written

[01:59:06 至 02:00:51](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=7146s)

Brian Douglas 用一个俏皮的标题引出标签。他想留下的是人在 Agent 做错选择时指出的具体问题，以及后续怎么判断这次纠正有效。

Brian Douglas uses a playful title to introduce labeling. He wants to preserve the specific issue a person identifies when an agent chooses poorly and track how the correction turns out.

[02:00:51 至 02:01:48](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=7251s)

他介绍开源的 Tapes，用于保留 Agent 会话和动作轨迹。会话里的反馈有时在工作结束前就出现，晚到 PR 阶段查看容易错过。

He introduces Tapes, an open-source project for capturing agent sessions and traces. Feedback can appear well before a pull request reaches review.

[02:01:48 至 02:02:39](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=7308s)

Douglas 说他的 Sweeper Agent 目前可以并行跑到 10 个。他也用过约 200 个 Daytona 沙箱并行执行文档、测试或代码清理这类任务，前提是每项工作都能清楚定义。

Douglas says his Sweeper Agent can run up to 10 agents in parallel. He has also run roughly 200 Daytona sandboxes concurrently for well-defined tasks such as documentation, test writing, and cleanup.

[02:02:39 至 02:03:04](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=7359s)

Douglas 过去用 Rust 做过个人练习。Paper Compute 日常使用 Rust，团队用 Tapes 收集会话轨迹，也能在控制台回看。

Douglas had used Rust for side projects. Paper Compute uses Rust day to day, and the team captures traces with Tapes and reviews them in its console.

## 用标签留下推翻建议的证据 / Label the point where human feedback changes the decision

[02:03:04 至 02:03:58](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=7384s)

Paper 的控制台能收集多位同事的会话，并在其中添加标签。讲者演示用 pushback 找一位工程师开始质疑 Agent 输出的时刻。

The Paper console collects sessions across teammates and supports labels. Douglas demonstrates using pushback to find when an engineer challenges an agent’s work.

[02:03:58 至 02:04:47](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=7438s)

他关注同事 Matt 在 Go 或 Rust 工作中的反对意见。一次反对可能说明，API 已经按某种结构约定，或者 Agent 在代码库里重复创建了现成服务。

He focuses on his teammate Matt’s pushback on Go or Rust work. An objection may point to an established API structure or a service the agent has needlessly duplicated.

[02:04:47 至 02:05:24](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=7487s)

Douglas 说，自己缺少 Rust 开发经验，看到 Greptile 给出 5 分（满分 5 分）就容易放过 Agent 写的改动，到了团队评审仍会收到异议。他开始把这些异议及对应的会话轨迹收集起来。

Douglas says that with limited Rust experience, he tends to let agent-written changes through when Greptile gives them five out of five. Human reviewers still push back. He began saving those labels and the traces they point to.

[02:05:24 至 02:06:07](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=7524s)

Douglas 把带标签的轨迹做成数据集，并做了后训练。他演示用内部的 Twin Reviewer 试评 PR #381，参考同事 Matt 在 Rust 和 Go 任务中提出过的反馈。

Douglas turned labeled traces into a dataset and used them for post-training. He shows how the internal Twin Reviewer can review PR #381 in a way informed by his teammate Matt’s feedback on Rust and Go tasks.

## 会话里有 PR 页面没记下来的判断 / Sessions preserve feedback that a PR can miss

[02:06:07 至 02:06:50](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=7567s)

这次后训练只用了会话轨迹，未使用 GitHub 的 PR 评审数据。他说，团队里多数人已在命令行或 Agent 运行环境里开始评审，很多来回都没出现在 GitHub 评论里。

The post-training used session traces alone, with no GitHub PR review data. He says most of his teammates have started reviewing in the terminal or agent harness, and much of that discussion never reaches GitHub comments.

[02:06:50 至 02:07:16](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=7610s)

演讲中他现场纠正说法。Tapes 是开源项目，Twin Reviewer 因包含敏感数据仍是内部工具。两个项目要分别理解。

He corrects himself during the talk. Tapes is open source, while Twin Reviewer remains internal because it contains sensitive data.

[02:07:16 至 02:07:31](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=7636s)

他用反对、道歉、表现特别好的会话和典型回退来筛样本。选来的片段还得查它的前后文，才能看懂团队希望保留哪种判断。

He filters for pushback, apologies, strong example sessions, and regressions. Each selected passage still needs context to show what judgment the team wanted to preserve.

[02:07:31 至 02:08:36](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=7651s)

一类常见反对意见是重新发明已有 Go 库或 mock 实现。项目里的既有选项如果进不了会话，就更容易再次出现这个问题。

One recurring objection concerns reinventing an existing Go library or mock implementation. If those existing options never enter the session, the same mistake can recur.

## 先做 Skill 和评测，再决定训练带来的收益 / Start with a skill and an eval, then assess training

[02:08:36 至 02:09:01](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=7716s)

他先把会话例子整理成 Skill，让评审能查询已有轨迹。明确一条规则及其例子以后，就可以拿过去的案例做回归检查。

He starts by turning traces into skills, so a reviewer can inspect previous sessions. A clear rule with examples can then be checked against past cases.

[02:09:01 至 02:09:36](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=7741s)

Douglas 建议先用团队的轨迹写 Skill，再用评测检查结果。之后如果仍需要模型掌握组织自己的代码写法，可以考虑后训练。

Douglas recommends starting with a skill based on team traces and evaluating the results. Post-training is an option if the model still needs to learn how the organization writes code.

[02:09:36 至 02:11:54](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=7776s)

他提到自己尝试了专用微调和直接偏好优化，并讨论了算力成本。听这部分时，可以同时记住它是内部探索，不能从演讲得到普适的质量效果量。

He describes experiments with specialized fine-tuning and direct preference optimization, including the compute costs. The talk gives an internal example, with no general effect size for review quality.
