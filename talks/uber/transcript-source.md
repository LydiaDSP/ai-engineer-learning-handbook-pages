# 两条绿灯 PR，为什么会让主干变红？

Preetam Dwivedi、Manjari Akella

中英整理稿

中文和英文均为按演讲整理的编辑转述。带时间戳的英文机器转写原文可在下方来源说明打开。

依据大会官方单场完整版及本地离线转录。直播在进入合并后验证的详细讲解以前切走。吞吐与排队数字来自团队在演讲中的报告，练习中的方案由编辑整理。 页面同时提供中文导读、按时间定位的中英整理稿和参考练习。 单场录像时间用于正文和配图，主直播从 05:45:04 播出。

[英文音频转写原文（带时间戳）](transcript-original.txt)

## 两条绿灯 PR 怎样让主干变红 / How two green PRs break the trunk

[00:00:00 至 00:01:27](https://www.youtube.com/watch?v=hX140a5klW0&t=0s)

Uber 开发者平台的 Preetam Dwivedi 和 Manjari Akella 分享了合并队列的扩容过程。团队用 Go 单体仓库说明，同一个提交系统需要同时照顾大量开发者，也需要让下游能够找到一份通过验证的代码。

Preetam Dwivedi and Manjari Akella describe how Uber scaled its merge infrastructure. Their example centers on the Go monorepo, where the platform has to keep a large developer population moving and give downstream users a trustworthy revision.

[00:01:27 至 00:02:57](https://www.youtube.com/watch?v=hX140a5klW0&t=87s)

A 和 B 分别基于同一个主干通过 CI。A 合并后，B 加到的是包含 A 的新状态。只测了 A 和 B 各自的结果，就没有测过最终的 A+B。演讲用这个例子解释为什么任意一条 PR 上的绿灯不能证明组合状态会构建成功。

A and B pass CI against the same base. Once A lands, B is about to join a different state. The individual green checks never exercised A together with B, so neither check establishes that the revision delivered to trunk will build.

[00:02:57 至 00:03:50](https://www.youtube.com/watch?v=hX140a5klW0&t=177s)

SubmitQueue 为可能出现的顺序提前构建和测试。如果队列里只有 A 和 B，可以先测 A、B 和 A 后接 B 的候选状态。实际落地时，选择已经验证过的状态，避免每条 PR 都必须等前一条合并完才开始跑 CI。

SubmitQueue speculatively builds likely landing states. With A and B in flight, it can test A, B, and the revision containing both in order. That lets validation start ahead of landing while still checking the state the queue intends to deliver.

## 并行验证做了什么，哪里先堵住 / Speculation works until demand outgrows it

[00:03:50 至 00:04:24](https://www.youtube.com/watch?v=hX140a5klW0&t=230s)

团队用构建目标分析找出互相独立的变更。两个服务如果没有共享受影响的目标，它们可以各自构建、验证和合并。依赖图提供了并行的依据，比按文件数量估算更贴近构建实际。

Target analysis identifies independent changes using the build graph. Work touching disjoint targets can proceed in parallel. A file count alone does not give the queue that dependency information.

[00:04:24 至 00:05:21](https://www.youtube.com/watch?v=hX140a5klW0&t=264s)

队列结合历史和当前变更的特征，对候选构建排序。猜到某个组合较可能真的落地，可以优先消耗算力在那个状态上。较小的请求也可以绕行一条耗时长的大变更，减少排头阻塞。

The queue ranks speculative states by how likely they are to be needed, using historical signals and properties of the current requests. It can also let small, fast changes bypass a slow request to reduce head-of-line blocking.

[00:05:21 至 00:08:03](https://www.youtube.com/watch?v=hX140a5klW0&t=321s)

讲者报告，2026 年 1 月每小时约 90 个请求，3 月约 130 个。他们把这段约 44% 的增长主要归因于 AI 生成的变更。p95 落地时间从约 30 分钟拉长到 3–4 小时，在维持主干通过的同时，开发者越来越难及时合并代码。

The speakers put arrival rates at roughly 90 requests an hour in January and 130 in March 2026. They attribute much of that roughly 44% increase to AI-assisted changes. They report that p95 land time grew from around half an hour to three or four hours while trunk protection still held.

## 先保护队列，再接管开发者的等待 / Admission control and deferred work

[00:08:03 至 00:09:38](https://www.youtube.com/watch?v=hX140a5klW0&t=483s)

准入门槛先判断请求会牵涉多少验证。横跨共享库的大变更会与更多在途请求一起验证，占用的资源也更高。团队在高峰期暂时拒绝成本高的请求，从而给较小的变更腾出容量。

Admission control classifies a request by the validation work it creates. A broad library change can interact with many requests already in flight. During busy hours, the initial policy rejected costly arrivals and protected capacity for smaller ones.

[00:09:38 至 00:10:53](https://www.youtube.com/watch?v=hX140a5klW0&t=578s)

按讲者报告，限流将工作时间内的落地速率从约 130 提到约 160 次每小时。平均吞吐改善的另一面是，共享库维护者得记着在非高峰时段回来重试。指标没有显示这部分人的调度成本。

The reported business-hours land rate rose from about 130 to 160 per hour. Owners of broad changes paid for some of that improvement by having to find an off-peak retry window themselves.

[00:10:53 至 00:12:25](https://www.youtube.com/watch?v=hX140a5klW0&t=653s)

延后队列保留已经提交的请求，在策略允许时送回活动队列。开发者只提交一次，由平台等待容量。这个变化改善了交互，昂贵变更仍可能等同样久。

A deferred queue persists an expensive request and releases it into the active queue when the admission policy permits. The platform takes over scheduling from the developer. The elapsed wait can still be just as long.

## 放宽弱冲突，换回并行能力 / Relaxing weak edges raises concurrency

[00:12:25 至 00:13:55](https://www.youtube.com/watch?v=hX140a5klW0&t=745s)

把 PR 当作图上的点，两个请求共享目标就连边。A 连 B、B 连 C，依次连到 F，最终六条请求成了一个连通分量。只看是否有交集，少数目标构成的桥也可能把整条链锁在一起。

Requests become vertices in an overlap graph. An A–B edge, a B–C edge, and so on through F put all six requests into one component. Even a shared target that appears at a narrow bridge can serialize the whole chain.

[00:13:55 至 00:15:08](https://www.youtube.com/watch?v=hX140a5klW0&t=835s)

团队改用强弱排序选边。演讲展示用 Jaccard 相似度比较共享目标和不同目标的数量，并纳入新依赖边的信号。分数帮助决定优先放宽哪条边，讲者没有把它当成组合失败的概率。

Uber ranks edges by strength before relaxing any of them. The talk shows Jaccard overlap across build targets alongside signals from newly introduced dependencies. The score orders tradeoffs. It does not give a calibrated chance that two requests will fail together.

[00:15:08 至 00:16:18](https://www.youtube.com/watch?v=hX140a5klW0&t=908s)

六条请求的例子要求达到 50% 的并行度，也就是至少出现三组可以独立推进的请求。团队拆掉两个较弱的桥，将一条六连链分成三组。代价是这些桥上的组合可能未经合测就进入主干。

In the six-request example, a 50 percent concurrency target calls for at least three independently progressing groups. Dropping the two weakest bridges gives three pairs. The price is that some cross-group interactions can land without having been tested together.

[00:16:18 至 00:18:00](https://www.youtube.com/watch?v=hX140a5klW0&t=978s)

在每次排队变化后全局重算，会使先前猜测性构建的结果更容易作废。团队在新请求入队时给它算边，并保留已经入队的决定。这让计算资源有机会继续服务仍然可能落地的状态。

Globally rebuilding the graph on every queue change could invalidate speculative work already started. Uber instead makes edge decisions for the newly arriving request and keeps earlier assignments, preserving useful in-flight validation.

[00:18:00 至 00:19:07](https://www.youtube.com/watch?v=hX140a5klW0&t=1080s)

讲者报告，最后这一步把速率从约 160 提高到高峰期接近 250 次每小时。串行等待减少，但组合状态可能在合并后才暴露失败。于是队列需要配套的合并后验证，而吞吐数字也得和恢复时间一起读。

The speakers report an increase from about 160 to nearly 250 lands per hour at peak. Less serialization makes a combined failure possible after landing. The throughput gain therefore has to be read alongside post-land validation and recovery.

## 让经过验证的提交有一个独立入口 / One history with a verified reference

[00:19:07 至 00:20:20](https://www.youtube.com/watch?v=hX140a5klW0&t=1147s)

合并队列仍会在合并前验证变更。放宽冲突后，A 和 B 可以分别通过检查，实际落地的 A+B 组合仍可能失败。Stovepipe 对已经进入主干的状态继续构建和测试。

Pre-land validation still runs. Stovepipe extends the checks to the actual states that landed, catching interactions between A and B that relaxation allowed to proceed independently.

[00:20:20 至 00:21:55](https://www.youtube.com/watch?v=hX140a5klW0&t=1220s)

假设已验证的提交是 A，B、C、D 连续合并后，main 来到 D。如果这批状态验证失败，verified/main 仍留在 A。需要稳定依赖的人可以继续消费 A。

Start from a verified revision A. If B, C, and D land, main advances to D. If the landed state fails validation, verified/main remains at A so dependent users can still choose a revision with passing evidence.

[00:21:55 至 00:22:51](https://www.youtube.com/watch?v=hX140a5klW0&t=1315s)

后续 E、F、G 落地，Stovepipe 会重新检查从上一个可信点延伸出来的新状态。G 通过后，verified/main 可以直接移到 G。这证明的是 G 的整体结果，不能据此给每一条中间提交补一盏绿灯。

After E, F, and G land, Stovepipe tests the newer state against the last verified point. A successful result can advance verified/main directly to G. That certifies the state at G, without establishing that every intermediate commit passed by itself.

[00:22:51 至 00:26:16](https://www.youtube.com/watch?v=hX140a5klW0&t=1371s)

验证失败会通知值班者准备修复或回退，经评审和 SubmitQueue 合并后，由 Stovepipe 重新核验。讲者在总结时报告，最终高峰期每小时约落地 300 次，p95 落地时间约 30 分钟。相较 1 月的每小时约 90 次，落地量增加约 233%。团队后续考虑批量处理相关变更以减少构建次数，提供服务或项目级的验证状态，并通过自动化修复或回退缩短恢复时间。

A failed post-land check pages an on-call engineer. The repair or revert goes through review and SubmitQueue, then Stovepipe validates the result. In their recap, the speakers report roughly 300 lands per hour at peak and a p95 land time of about 30 minutes. The land rate was up about 233% from roughly 90 per hour in January. Planned work includes batching related changes to reduce builds, showing verified status by service or project, and automating repairs or reverts to shorten recovery time.

[00:26:16 至 00:27:35](https://www.youtube.com/watch?v=hX140a5klW0&t=1576s)

讲者最后保留了两层验证。合并前的预测性检查约束容易发现的组合风险，合并后的连续检查给下游提供可信参考。评估这套机制时，要同时观察候选构建成本、长尾等待、可信指针滞后和恢复速度。

The talk closes with both validation layers intact. Pre-land checks still catch predictable interactions, and post-land checks maintain a trusted consumer reference. Evaluating the arrangement requires looking at build cost, tail latency, the gap between references, and recovery.
