# Louis Walsh｜搜索 Agent 为什么要付两笔钱？

来源为 2026-10-01 The AI Conference 完整官方录像。中英两栏为依照该录像转写整理的对应阅读稿。
[官方录像](https://www.youtube.com/watch?v=4n01awR4PLc&t=0s) · [大会录像索引](https://agenda.aiconference.com/?session=12ed0b60-a6b6-4773-9c00-a5ae5c75be56)

## 一次搜索为什么有两笔账 / One search creates two bills

[00:00:00](https://www.youtube.com/watch?v=4n01awR4PLc&t=0s)

Walsh 从三种工作谈起。编程 Agent 要查 API 的现行用法，企业调研 Agent 要找公司或融资信息，研究 Agent 则要能把主张连回出处。三种场景都需要网页资料，但它们所需的证据长度不一样。

Walsh opens with coding, company research, and cited research. All three use web retrieval, yet each needs a different amount and kind of source material.

[00:00:51](https://www.youtube.com/watch?v=4n01awR4PLc&t=51s)

常见做法是找到页面就把正文送进模型。于是简单问题也要承担大段输入，包括网站导航、侧栏和正文中与问题无关的内容。视频用生日、SDK 版本和公司介绍说明，答案有时只靠一条带出处的原文就能成立。

Fetching a page and passing it wholesale to the model can make a simple question costly. The birthday, SDK, and company examples illustrate situations in which a short source passage is sufficient.

[00:02:06](https://www.youtube.com/watch?v=4n01awR4PLc&t=126s)

这种浪费会随着运行次数和工具调用轮数累积。多轮检索还可能把模型原本需要记住的任务条件挤出上下文，触发提前压缩。把同一次检索的工具费和结果入模后的输入费分开，才看得见是哪边在变大。

The problem compounds across repeated runs and multiple tool calls. Large results can crowd more useful state out of the context window and force earlier compaction. Track the search charge and the model's reading cost separately.

[00:02:50](https://www.youtube.com/watch?v=4n01awR4PLc&t=170s)

讲者用一项陌生 API 的单次调用估算成本。整页方案的表中，读取检索结果约 2 美分，占任务 45%，搜索调用另约 1 美分。这是演讲里的特定估算，接近一半指该任务里模型读搜索结果的成本。

A worked example estimates the cost of writing a request to an unfamiliar API. The full-page table assigns roughly two cents, or 45% of this task, to reading search results and roughly one cent to the search call itself. The shares belong to this estimate.

## 看同一个问题经过六种返回方式 / Follow the same question through six response formats

[00:03:53](https://www.youtube.com/watch?v=4n01awR4PLc&t=233s)

整段演示沿着一个问题走，Jacksonville Jaguars 有没有以 35 比 6 赢得比赛。Walsh 把结果、比分和日期作为可提取的事实。观众可以直接比较不同返回方式究竟保留了什么。

The demo holds the question fixed and uses an illustrative Jaguars score to compare retrieval formats. The result, score, and date make it possible to see what each format actually preserves.

[00:05:15](https://www.youtube.com/watch?v=4n01awR4PLc&t=315s)

第一种直接返回整页。十条结果送回约八万 token，目标比分夹在比赛细节、其他球队、站点导航和多页重复信息里。这给后续模型留下了很多可读文本，也留下了大量无用工作。

The first format returns full pages. About 80,000 tokens across ten results surround the score with play-by-play, unrelated games, navigation, and duplicated coverage.

[00:05:46](https://www.youtube.com/watch?v=4n01awR4PLc&t=346s)

第二种在检索侧加轻量模型生成简报。最终 Agent 只读很短的回答，不过检索侧仍需让另一个模型读材料，增加一次调用、等待和改写风险。讲者在这个例子里放弃了把生成当作默认压缩手段。

The second format inserts a lightweight summarizer upstream. It makes the downstream payload short, while adding another model call, latency, and the possibility that a generated sentence changes details.

[00:07:01](https://www.youtube.com/watch?v=4n01awR4PLc&t=421s)

第三种按句子或段落提取相似片段。示意图从约八万降到两万 token，并保留来源自己的措辞。段落仍会捎带并不影响这个问题的赛况，比如某个球员做了什么。

Sentence or paragraph extraction preserves source wording and lowers the illustrated payload from roughly 80,000 to 20,000 tokens. It can still carry nearby details that do not answer the query.

[00:08:03](https://www.youtube.com/watch?v=4n01awR4PLc&t=483s)

第四种按语义切片并设置字符上限，示例进一步降到约五千 token。它给调用方一个预算控制，但 Agent 不一定事先知道取多少才够。例如比分本身只需要一行，比较一项政策可能要保留几条限制。

The fourth method uses meaning-based chunks within a caller-supplied character limit. The example falls to about 5,000 tokens, but the caller still has to guess how much context the question needs.

## 从按页摘录走到跨页去重 / Move from per-page highlights to cross-document selection

[00:09:10](https://www.youtube.com/watch?v=4n01awR4PLc&t=550s)

第五种让检索系统按问题选择片段长度。比分问题只返回很短的摘录，示例下整组结果约一千 token。十页里仍可能各送一份相同比分，节省空间还有下一步。

The fifth method lets retrieval choose an excerpt length for the question. It brings the illustrated result set to about 1,000 tokens while still allowing different pages to send the same score.

[00:10:22](https://www.youtube.com/watch?v=4n01awR4PLc&t=622s)

最后一种会一起看多页结果，对比其中重复的事实。当十页都在描述同一场比赛的同一比分，就选一份高质量来源的摘录，把余下重复内容留在检索端。屏幕上的这个定点例子约为 20 token。

The final format considers results together. If ten pages repeat the same score, it returns a short passage from a selected source and drops the redundant copies. The particular on-screen example is about 20 tokens.

[00:11:45](https://www.youtube.com/watch?v=4n01awR4PLc&t=705s)

跨页比较还可以保留各自独有的证据。一个来源提供结果、另一个提供相应条件，真正需要的内容应放进同一个上下文包。系统的任务是交付有用的文本，同时仍能回查原页。

Comparing pages also makes it possible to retain complementary evidence. A result on one page and a qualifying condition on another can both belong in the context package, with their origins still available for review.

## 把三组比例放回各自的比较口径 / Read the reported percentages against their baselines

[00:12:23](https://www.youtube.com/watch?v=4n01awR4PLc&t=743s)

第一组 95% 比较的是返回完整网页与采用摘录。它是 Exa 在演讲中给出的平均输入缩减，和上面那个比分例子的极端压缩是两份不同证据。

The 95% figure compares extraction with full-page content. It is an average reported by Exa, separate from the extreme change in the illustrated score example.

[00:13:08](https://www.youtube.com/watch?v=4n01awR4PLc&t=788s)

第二组在逐页摘录和跨页摘录之间比较。幻灯片写的是单次搜索、1.2 万字符预算，token 效率提高 40%，并标出质量变化。读这组数字时，应把基线写成已有逐页摘录。

The 40% figure is an efficiency comparison with per-page highlights for single searches under a 12,000-character budget. The slide also reports a quality change for that comparison.

[00:13:34](https://www.youtube.com/watch?v=4n01awR4PLc&t=814s)

第三组观察完整 Agent 运行，在所列数据集上记录了约 30% 的 Agent token 用量下降。整条运行还包括其他工具以及输出，只有测过整条链路，才有依据估计节省了多少。

The 30% figure is the reported change in agent token use across a full run on the listed datasets. Whole-run savings depend on the rest of the workflow as well as retrieval.

[00:14:06](https://www.youtube.com/watch?v=4n01awR4PLc&t=846s)

Walsh 认为，删去导航栏、页脚及无关材料能降低阅读负担，可能带来更快的响应，也给较便宜的模型留下机会。它们是配置对特定任务带来的可能收益，需要用任务的真实输入重新测量。

Walsh argues that removing navigation, footers, and unrelated text can improve latency and allow a cheaper model to succeed. Whether it helps in any given deployment depends on measured results for its own tasks.

## 用任务总成本核算组件变化 / Reconcile component costs with task cost

[00:15:23](https://www.youtube.com/watch?v=4n01awR4PLc&t=923s)

演讲回到开头的示意账单。整页方案的任务表合计 0.044 美元，后一个版本表内合计 0.0212 美元，搜索结果输入从 0.020 降到 0.0002 美元。两张表里的每次搜索收费也变了。

The talk returns to its worked cost example. The tables show totals of $0.044 and $0.0212, with result-reading cost falling from $0.020 to $0.0002. The per-search fee also differs between the estimates.

[00:16:04](https://www.youtube.com/watch?v=4n01awR4PLc&t=964s)

如果目标是知道摘录本身省了多少，就固定搜索次数、每次搜索单价和模型，再只替换结果格式。把额外重试和中间摘要费用记进账，避免把成本从一个组件挪到另一个组件以后漏算。

To isolate the effect of extraction, hold the search count, per-call charge, and model fixed while changing the result format. Record retries and any upstream summarizer so a shifted cost remains visible.

[00:16:30](https://www.youtube.com/watch?v=4n01awR4PLc&t=990s)

接近结尾时，讲者把搜索质量拆成找到能回答问题的页面，以及找到页面里有用的内容。问题耗时很长时，先查是文档选错了，还是送入模型的材料太长，再决定哪一个环节值得改。

Walsh closes the prepared talk by separating document retrieval from finding useful evidence within those documents. The distinction helps diagnose whether an expensive run has a relevance problem or a payload problem.

## 问答里的适用范围 / Where extraction should expand

[00:17:22](https://www.youtube.com/watch?v=4n01awR4PLc&t=1042s)

观众问，开放式调研有时需要完整背景，怎么判断短摘录够不够。Walsh 说提问范围会影响片段长短，相关性足够广时可能返回整页。实际评测需要把单事实问题与开放调研分开。

An audience member asks how the approach handles questions that require broad context. Walsh says highlight length can grow with the query and can reach a full page when the material is relevant.

[00:18:28](https://www.youtube.com/watch?v=4n01awR4PLc&t=1108s)

下一位观众把问题拉到路由与分类。如果输出只要一个类别，检索服务可以交付证据，再由下游模型做结构化决定。片段方式和完整网页仍是可按需要选择的参数。

Another question turns to routing and classification. Walsh describes supplying evidence to a downstream classifier, with the caller controlling whether the evidence arrives as highlights or fuller pages.

[00:20:04](https://www.youtube.com/watch?v=4n01awR4PLc&t=1204s)

最后有人问能否用于代码库事实检索。Walsh 的回答是这场介绍的服务聚焦网页信息及合作数据源。他没有在录像里展示代码库搜索，因此这份手册使用网页检索场景来开展练习。

A final audience question asks about repository fact finding. Walsh describes the presented system as focused on web information and partner data. The recording does not demonstrate repository retrieval.
