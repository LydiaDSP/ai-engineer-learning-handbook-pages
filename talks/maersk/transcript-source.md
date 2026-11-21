# 代码生成便宜以后，怎样让系统还改得动？

Dmitry Buykin

中英整理稿

中文和英文均为按演讲整理的编辑转述。带时间戳的英文机器转写原文可在下方来源说明打开。

依据大会官方单场完整录像与本地离线转录。两场来源使用各自时钟，完整录像包含验证与清理方法。演讲中业务覆盖范围、场景数量与数据为讲者报告。 页面同时提供中文导读、按时间定位的中英整理稿和参考练习。 单场录像时间用于正文和配图，主直播从 02:19:07 播出。

[英文音频转写原文（带时间戳）](transcript-original.txt)

## 先把每周的维护缩到人能检查的范围 / Keep maintenance within reviewable bounds

[00:00:00 至 00:01:34](https://www.youtube.com/watch?v=oeknLUsN_GE&t=0s)

一次大规模重写删掉了闲置测试和样板，也带走了仍然有用的行为。原先让复杂度上涨的工作方式一直在运转，工程量很快重新超过团队能检查的范围。于是 Buykin 改用每周小范围清理，给改动分批留下证据。

A broad rewrite removed unused tests and boilerplate along with useful behavior. The process that produced the complexity continued to run, and changes again outpaced the team's ability to review them. Buykin moved to smaller maintenance sweeps with evidence attached to each batch.

[00:01:34 至 00:02:31](https://www.youtube.com/watch?v=oeknLUsN_GE&t=94s)

贯穿全场的是给一个已经批准的订单改金额。编程 Agent 维护说明，生产中的执行 Agent 照规则处理请求。改动通常限定在一个业务流程和一个国家的组合。同一个规则是否适用，要考虑不同市场的实际政策。

The running example changes the amount on an already approved order. Coding agents maintain the instructions, and runtime agents apply them. A change typically starts in a slice for one business process and one country, since markets can have intentionally different rules.

[00:02:31 至 00:03:17](https://www.youtube.com/watch?v=oeknLUsN_GE&t=151s)

很多业务规则写在自然语言里。Buykin 尝试故意破坏指令里的句子，发现许多错误没让测试变红。能说清规则含义的人仍然得参与，开发者则要从日志和轨迹确认规则如何落在系统里。

Much of the business logic is prose. Buykin deliberately damaged instructions and saw how often the tests stayed green. Business specialists establish what the rule means, while engineers trace how that rule is implemented.

## 用同一份规则服务专家与 Agent / One document for specialists and agents

[00:03:17 至 00:04:01](https://www.youtube.com/watch?v=oeknLUsN_GE&t=197s)

一条让 Agent 找团队确认的指令，可能意味着经理必须作决定，也可能只是需要读取已经登记的额度。专家知道批准权限，工程师知道额度能否从系统自动取得。两边一起划分人工决定和可自动执行的步骤。

An instruction to check with a team can mean that a manager must decide, or that the system needs to look up a recorded limit. Specialists understand the authority boundary, while engineers investigate which facts can be fetched reliably.

[00:04:01 至 00:05:12](https://www.youtube.com/watch?v=oeknLUsN_GE&t=241s)

团队保留一份共同维护的文档，用结构明确的区域给 Agent 读，再用相邻说明帮助专家审阅。业务专家不需要掌握实现细节，他们需要看到规则按怎样的事实分支。

The team maintains one document with structured blocks for agents and explanations for specialists. Specialists can inspect which facts drive each branch without having to reconstruct implementation details.

[00:05:12 至 00:06:04](https://www.youtube.com/watch?v=oeknLUsN_GE&t=312s)

订单金额在文字和代码中出现过不同限值。同一笔订单会被两套说法引向不同结果，又不一定触发编译错误。团队对变更文件做 lint，并检查执行轨迹里哪些路径反复出现。

Prose and code once supplied different limits for the same order. Both could look sensible in isolation without a compiler error. The team added linting and inspected the routes that agents repeatedly followed.

## 把重复操作收进工具 / Move repeated operations into tools

[00:06:04 至 00:06:36](https://www.youtube.com/watch?v=oeknLUsN_GE&t=364s)

有些步骤在多个国家频繁按同一路径运行，团队把它们变成一个工作流工具。初次迁移还保留了旧步骤，Agent 会把工具已做的事再做一遍。后来在文字里只保留仍要作出的选择。

Repeated paths that agreed across markets became workflow tools. The first migration kept the old step-by-step prose, prompting agents to repeat work already inside the tool. The documentation was reduced to decisions still left to make.

[00:06:36 至 00:07:29](https://www.youtube.com/watch?v=oeknLUsN_GE&t=396s)

在订单案例中，代码准备事实并执行写入，专家维护分支条件，模型从已有决策表中选合适的分支。遇到规则无法覆盖的订单，流程把决定交还给人。复杂条件也可以迁回专家读得懂的规则表。

For the order, code prepares facts and performs the write, experts maintain the conditions, and the model selects the matching row. A person handles cases outside the table. Complex expressions can also move back into a form specialists can inspect.

[00:07:29 至 00:09:00](https://www.youtube.com/watch?v=oeknLUsN_GE&t=449s)

运行时控制模型看到哪些字段。一度因为模型能看到价格，它额外做了一项业务未要求的价格检查。后来的设计保留完整记录，向模型交付决定所需的少量事实。数据量大时用句柄引用，写入前由程序核对。

The runtime limits which fields reach the model. When prices were exposed, the agent invented a pricing check. The full record now stays with the runtime, which provides a smaller set of decision facts and validates any handles used for a write.

[00:09:00 至 00:09:28](https://www.youtube.com/watch?v=oeknLUsN_GE&t=540s)

一次写操作需要通过一组约束，最后还会核对它是否真的生效。回执异常时，操作日志能帮助识别这次写入是否已经做过，避免重试时再执行一遍。

A write passes a sequence of checks and is then checked for completion. If its response is ambiguous, a journal helps identify whether the operation already ran before a retry.

## 把专家反馈变成新的评测 / Turn corrections into evaluation cases

[00:09:28 至 00:11:04](https://www.youtube.com/watch?v=oeknLUsN_GE&t=568s)

Buykin 分享了自己逐条读改动直到跟不上产量的经历。现在，他会用异常的变动规模、跨流程影响和同类错误的聚集度把审查注意力放到更值得看的地方。

Buykin describes reading every change until the volume exceeded what he could understand. He then uses signals such as large shifts, cross-slice effects, or clusters of similar failures to direct deeper reviews.

[00:11:04 至 00:12:03](https://www.youtube.com/watch?v=oeknLUsN_GE&t=664s)

专家的一条纠错会成为评测案例，Agent 可以在邻近的流程中寻找同类失败。修复只落在已确认存在问题的位置。不同地方采用不同规定时，直接复制补丁可能会消除必要差异。

A specialist's correction becomes an evaluation case. An agent searches nearby slices for the same failure, and repairs are applied where that failure is confirmed. Copying a patch everywhere could erase necessary differences between markets.

[00:12:03 至 00:13:08](https://www.youtube.com/watch?v=oeknLUsN_GE&t=723s)

用户在界面中反馈结果，整个处置过程写进记录。会话结束后，把当前有效状态与历史事件分开放到文件里，新 Agent 可以直接从现状继续，而不用解读一堆不同时点的结论。

Users can evaluate outcomes through the interface and the response is recorded in a ledger. Files separate currently valid state from historical events so that later agents can continue without reconstructing every past decision.

## 真任务回放决定哪些东西该留 / Replay real work before pruning behavior

[00:13:08 至 00:13:46](https://www.youtube.com/watch?v=oeknLUsN_GE&t=788s)

Buykin 把证据按能证明什么排序，真实任务的回放排在最前。他在看到数据之前就写下什么结果会推翻拟议改动，并刻意让每项新检查失败一次，再决定能否信任它。

Buykin ranks evidence by what it proves and puts replays of real tasks first. Before seeing the data, he writes down what would falsify the change and deliberately makes each new check fail once before trusting it.

[00:13:46 至 00:15:06](https://www.youtube.com/watch?v=oeknLUsN_GE&t=826s)

订单重构漏掉了超出限额的分支，订单本来会绕过团队负责人直接通过。Buykin 把真实任务冻结成样本，用同一批输入重放旧版和新版。没有真实任务走过的分支会标为缺少证据。第二个 Agent 依照清单独立复核，拿不到第一个 Agent 的推理过程。

The order refactor lost the over-limit branch, which would have let an order through without a team lead’s decision. Buykin freezes real tasks into a set and replays the same inputs against the old and new versions. A branch without a matching real task is marked as lacking evidence. A second agent checks the result against a checklist without seeing the first agent’s reasoning.

[00:15:06 至 00:16:59](https://www.youtube.com/watch?v=oeknLUsN_GE&t=906s)

每周根据真实使用决定哪些旧变体可以退役，删除前保存它的名字和证据。如果某条测试只为被淘汰的规则存在，也要跟着退役。否则 Agent 很可能继续按那条测试把规则补回来。

Each weekly sweep uses real usage to identify candidates for retirement and records the evidence before deletion. Tests that exist solely for a retired variant are retired alongside it, or subsequent agents can rebuild the behavior to satisfy them.

[00:16:59 至 00:18:03](https://www.youtube.com/watch?v=oeknLUsN_GE&t=1019s)

Buykin 发现在系统投产后，它的技能与记忆保留了自己的工程习惯和偏差。他说，系统会逐渐反映纠正它的人，并给出 18 个问题，邀请听众从自己的代码库还无法回答的问题中选一个开始。

After the system went into production, Buykin recognized his engineering habits and biases in its skills and memory. He says that the system comes to reflect the person who corrects it and offers 18 questions, inviting listeners to start with one their repository cannot yet answer.
