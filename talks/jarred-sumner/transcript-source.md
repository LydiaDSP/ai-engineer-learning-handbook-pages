# 代码可以写得很快，先选一个你能验证的项目

Jarred Sumner

中英整理稿

中文和英文均为按演讲整理的编辑转述。带时间戳的英文机器转写原文可在下方来源说明打开。

依据 11 月 12 日主直播整理。编译耗时、启动速度、内存和基准测试均为 Sumner 在特定版本与工作负载下的报告。 页面同时提供中文导读、按时间定位的中英整理稿和参考练习。

[英文音频转写原文（带时间戳）](transcript-original.txt)

## 让验证能力决定方案 / Let verification shape the choice

[05:19:18 至 05:20:27](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=19158s)

Bun 是 Claude Code 使用的 JavaScript 运行时。Sumner 开场介绍团队给 Bun 增加提前编译器的项目，规模很大，还经历了多轮重写。他借此问，在 Agent 能写出大量代码之后，团队凭什么敢交付？

Bun is the JavaScript runtime that powers Claude Code. Sumner opens with his team's large ahead-of-time compiler project, which went through multiple rewrites. It provides a way to ask what makes a large, agent-written change safe to ship.

[05:20:27 至 05:21:55](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=19227s)

任务最初是减少 Claude Code 的内存开销和等待时间，改动可以落在 Bun 或它使用的 JavaScriptCore 上。一些早期实现接近发布，可编译耗时超了预期，他又安排了一轮重写。

The initial goal was to reduce memory use and waiting in Claude Code. Changes could target Bun or the JavaScriptCore engine it uses. One early implementation was close to shipping, but compilation took too long, prompting another rewrite.

[05:21:55 至 05:23:01](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=19315s)

即时编译在程序运行时才处理一部分代码。提前编译把这份工作挪到启动之前。如果许多 Claude Code 会话各自做同样的运行时编译，提前完成它可能减少重复消耗。

A just-in-time compiler processes parts of the program during execution. Ahead-of-time compilation moves work earlier. If many Claude Code sessions repeat the same runtime compilation, doing it in advance may reduce duplicated cost.

[05:23:01 至 05:23:42](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=19381s)

团队有把 Bun 从 Zig 移到 Rust 的经验。当时 Bun 的 TypeScript 测试可以直接对两种实现运行，原有断言跟着行为走，验证逻辑保持独立。

The team had experience moving Bun from Zig to Rust. Bun's TypeScript tests could run against both implementations, so existing assertions carried over and the validation remained independent.

[05:23:42 至 05:24:18](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=19422s)

如果把 Claude Code 本身用 Rust 重写，按 Sumner 的估计连测试也要一起移植。实现和判定对错的依据同时发生变化会增加风险。他们于是把问题改成如何加快现有 JavaScript。

In Sumner's judgment, rewriting Claude Code itself in Rust would also require porting its tests. Changing the implementation and the source of expected behavior together increased the risk. They reframed the problem around speeding up the existing JavaScript.

## 测量提前编译的收益 / Measure the value of ahead-of-time compilation

[05:24:18 至 05:25:29](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=19458s)

Sumner 在现场报告，他们内部试用的 Claude Code 内存消耗约降到四分之一，启动速度约为原先两倍。比较对象是他演示的工作负载和当时的实现。

Sumner reports that the version of Claude Code tested internally used roughly one quarter as much memory and started around twice as fast. The comparison refers to the workload and implementation he presented.

[05:25:29 至 05:26:17](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=19529s)

TypeScript 的类型标注可以给优化提供线索，但程序运行时未必符合标注。编译器把类型当预测，能确定行为的地方才走特化路径。

TypeScript annotations give the optimizer a hint, but runtime values may differ. The compiler treats types as predictions and uses a specialized path where it can establish the relevant behavior.

## 对照不同执行路径 / Compare independent execution paths

[05:26:17 至 05:27:09](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=19577s)

新编译器已有不少外部参照。团队可以运行先于项目存在的 Bun、WebKit、test262 和 Claude Code 测试，也让 Bun 的测试运行器进入 AOT 模式。

The new compiler has several external points of comparison. The team can run pre-existing Bun, WebKit, test262 and Claude Code tests, and makes Bun's test runner work in AOT mode as well.

[05:27:09 至 05:27:23](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=19629s)

有些差异是有意改变兼容行为带来的。他在演讲里把部分限制归为安全和性能选择。核对时仍要把这些差异和不符合预期的结果分开。

Some differences arise from deliberate compatibility changes. In the talk, he frames some restrictions as security and performance choices. They need to be recorded separately from unexpected outcomes.

[05:27:23 至 05:28:19](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=19643s)

同一个应用可以用 JIT、AOT 和去掉类型信息的路径执行。三路行为一致，对这一应用提供了证据。再用模糊测试扩展输入组合，寻找三路不一致的地方。

The same app can run through the JIT, the AOT compiler and a path without type information. Agreement gives evidence for the application tested. Fuzzing expands the range of inputs and looks for disagreements.

## 开发阶段不同，并发方式也要调整 / Match parallelism to the phase of the work

[05:28:19 至 05:29:18](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=19699s)

他把实现分为初期铺开结构和随后修复错误。第一阶段代码常常还不完整，每个局部改动都跑全量构建，团队容易把时间花在同一批预期中的失败上。

He separates building out the initial structure from fixing failures afterward. During the first phase, compiling after every incomplete edit can spend time rediscovering the same expected failures.

[05:29:18 至 05:31:54](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=19758s)

其中一版尽量复用 JavaScriptCore 的现有实现，按他的描述效果不理想。后来引入 Bun 的类型检查路径，启动和内存指标改善，代码里却有难以接受的特殊判断。

One version reused as much existing JavaScriptCore code as possible and fell short in his account. A later version used Bun's type checking and improved startup and memory, but contained special cases he judged too brittle to ship.

[05:31:54 至 05:34:18](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=19914s)

第四次实现的代码质量较好，运行表现与前一版接近，但编译 Claude Code 约需 50 秒。讲者说，第五次实现把这项构建时间降至 20 秒以内，到了可以发布的程度。

The fourth implementation had better code quality and similar runtime performance to the previous attempt, but it took about 50 seconds to compile Claude Code. Sumner says the fifth brought the build under 20 seconds and was ready to ship.

[05:34:18 至 05:35:04](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=20058s)

进入持续修复后，他更偏向让子 Agent 长时间负责局部工作。一次次重新理解同一段编译器代码会浪费上下文，长期分工让它能沿着同一个问题继续推进。

For sustained repair, he came to favor long-lived subagents responsible for particular parts of the work. Rediscovering compiler code repeatedly wastes context, while a persistent assignment can carry an investigation forward.

## 让每次提速都留下可对照的记录 / Record a comparable score for every speedup

[05:35:04 至 05:35:48](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=20104s)

在编译器里，能证明访问总是落在同一种结构上时，可以走直接字段访问。其他情况还需要检查。这样的工程取舍既影响速度，也决定多大范围的测试能发现错误。

Inside the compiler, an access shown to target a stable structure can become a direct field access. Other cases retain checks. This affects performance as well as how much test coverage is needed to find mistakes.

[05:35:48 至 05:36:41](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=20148s)

为跟上项目进度，他用每小时的记分卡把当前版本和上一个版本并排列出。多数指标背后的测试早已存在，团队能回头检查变化来自实现，还是检查依据本身。

To track the project, he uses an hourly scorecard comparing the current version with the previous one. Most of the underlying tests predate the work, so the team can examine whether a change came from the implementation or the evidence used to check it.

[05:36:41 至 05:37:28](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=20201s)

他们扩展已有的 JavaScript 引擎模糊测试，让它也覆盖 TypeScript 类型。Sumner 强调还要确认测试有能力抓到故障。长时间没有报错，也可能是检测从未触到关键路径。

They extend an existing JavaScript engine fuzzer to exercise TypeScript types. Sumner stresses checking that tests can actually catch defects. A clean run can also mean that the important path was never reached.

[05:37:28 至 05:39:27](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=20248s)

他也说明 AOT 未必让所有项目更快。依赖动态求值的程序会较多回到解释执行，演示里的 UglifyJS 就是需要单独看的例子。

He also explains why AOT is not uniformly faster. Programs that rely on dynamic evaluation can fall back to the interpreter more often. UglifyJS is an example that deserves separate measurement in his presentation.

[05:39:27 至 05:41:23](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=20367s)

Sumner 报告，Bun 在 JetStream 3 多数子项中超过 JavaScriptCore 和 Node.js 使用的 V8 的 JIT 表现。团队用 Claude Code 构建编译器，再用新编译器生成的 Claude Code 继续开发。他提醒大型项目要固定指标反复测量。

Sumner reports that Bun outperformed both the JavaScriptCore JIT and Node.js with the V8 JIT on most JetStream 3 subtests. The team used Claude Code to build the compiler, then continued development with Claude Code compiled by it. He emphasizes remeasuring a large project against consistent metrics.
