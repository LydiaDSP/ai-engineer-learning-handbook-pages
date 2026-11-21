# Agent 搜到东西以后，怎样知道它找对了？

Jeffrey Pinner

中英整理稿

中文和英文均为按演讲整理的编辑转述。带时间戳的英文机器转写原文可在下方来源说明打开。

依据第二日直播 02:59:08 至 03:10:30 的本地机器转录，采用大会页面核对场次。Atlas 分数、请求量与成本均为 Exa 演讲自报。 页面同时提供中文导读、按时间定位的中英整理稿和参考练习。

[英文音频转写原文（带时间戳）](transcript-original.txt)

## 模型缺的是哪一类事实 / Where parametric knowledge falls short

[02:59:08 至 03:00:24](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=10748s)

Agent 已经是代替用户检索的一类调用者。Pinner 用 Exa 内部请求量的增长引出讲题。这里的用量是厂商自报，主要说明为什么团队开始专门为 Agent 设计搜索接口。

Agents have become another class of search client acting on users' behalf. Pinner introduces the topic with Exa's internal growth figures. Those are company-reported figures, useful here as an explanation for why the team built agent-facing search.

[03:00:24 至 03:01:16](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=10824s)

训练截止与模型上线之间有时间差。软件版本、价格、法规和公开事件在此期间仍会变化。即使一个事实已经出现很久，也不保证训练数据收录了它，更不保证模型能稳定回忆出来。

Time passes between training cutoff and model release. API versions, prices, laws, and events keep changing. Older information can still be missing from training or difficult for the model to recall reliably.

[03:01:16 至 03:02:31](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=10876s)

演讲把模型训练内容、搜索引擎已索引范围和更广的互联网放在一起看。登录、数据库和有权限要求的来源会改变搜索可触及的范围。给 Agent 增加搜索工具，只会让它访问工具实际覆盖的部分。

The talk distinguishes material seen in training from material indexed by a search engine and the much larger web. Logins, specialized databases, and permitted sources determine what a search tool can actually reach.

## 用 Atlas 看完整任务是否做成 / Score the completed lookup with Atlas

[03:02:31 至 03:03:03](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=10951s)

Exa 用 Atlas 对比检索方案。Agent 先查满足条件的实体，再尽可能补齐与这些实体有关的字段，最后把答案与人工整理的标准表对照。

Atlas asks an agent to find matching entities, enrich them with requested attributes, and compare the assembled answers with a reference table.

[03:03:03 至 03:03:33](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=10983s)

一行只有在要求的字段都正确时才计为正确。单次检索的命中率可能很高，但如果每条记录有一项来自错版本或错对象，整项研究任务仍会有明显损失。

The benchmark gives credit to a row only when its required attributes are correct. A healthy query-level hit rate can still produce a poor final table if values come from the wrong version or entity.

[03:03:33 至 03:04:22](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=11013s)

Pinner 报告，Atlas 题目一旦涉及训练集未覆盖的数据，成绩就明显下降。无网页搜索、仅靠模型已有知识的闭卷运行约有 9% 的行完全正确，可用作对照。

Pinner reports that Atlas scores fell sharply when tasks encountered data outside the training set. With no web search and only parametric knowledge, about 9 percent of rows were fully correct, providing a closed-book baseline.

## 找得到、拿得到，也要读得动 / Search quality includes access and reading cost

[03:04:22 至 03:05:39](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=11062s)

Pinner 看到 Agent 更常发出带条件的完整句子。查询里可能同时写行业、时间窗口、地点和版本。排序系统需要留住这些约束，否则第一批看似相关的结果会把 Agent 引向错误的对象。

Pinner observes that agents tend to issue longer queries with constraints such as industry, date range, location, and version. Ranking has to preserve those constraints, or superficially related results steer the task toward the wrong entities.

[03:05:39 至 03:05:57](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=11139s)

开放网络检索覆盖不到一部分受付费或访问权限限制的材料。扩充可访问的数据源需要有合作或相应许可。评估工具时，可以先怀疑来源覆盖，再去看模型有没有误解结果。

Open-web retrieval misses some licensed or access-restricted material. Extending coverage depends on partner data and appropriate access. Apparent reasoning failures should be checked for missing sources as well as misinterpretation.

[03:05:57 至 03:07:01](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=11157s)

多轮搜索如果每次把多页 HTML 原样交给模型，会消耗大量 token。Pinner 还报告，加入关键词检索后，Atlas 整行正确率升到约 28%，但多数行仍有缺项或错值。

Repeated searches that return full HTML use a large number of tokens. Pinner also reports that keyword retrieval raised the share of fully correct Atlas rows to about 28 percent, with most rows still incomplete or wrong.

## 查询相关的摘录怎样影响结果 / Extract evidence specific to the query

[03:07:01 至 03:08:01](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=11221s)

抓取后，系统按语义从网页提取并建立索引。查询与索引进入同一表示空间做匹配。讲者强调的是把检索从文字重合推进到条件和含义层面的比较。

Exa describes extracting semantic representations from crawled pages and indexing them. The query is represented in the same space, aiming to match its meaning and constraints.

[03:08:01 至 03:09:30](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=11281s)

团队补充合作数据和可组织成关系的知识，并从单个页面中选择与当前查询有关的部分。一个页面对于不同查询可能需要不同摘录，因此不能用固定长度的首页摘要代替。

The team extends public search with partner data and structured relationships. Passage extraction is conditioned on the question, since different queries can require different parts of the same page.

[03:09:30 至 03:10:31](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=11370s)

Pinner 汇报，演示配置在 Atlas 上从闭卷约 9% 到有语义摘录和扩充数据时约 56%，并称相关成本下降约 28%。这些是 Exa 在该配置和基准上的结果，迁移到别的研究任务要重新测。

Pinner reports roughly 9 percent closed-book accuracy and roughly 56 percent using the demonstrated retrieval setup, along with a reported cost reduction of about 28 percent. These are Exa's results on its benchmark and configuration.
