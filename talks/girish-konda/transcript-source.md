# 多 Agent 交接时，编排器凭什么判断任务已经完成？

Girish Konda

中文校译与英文机器转写

中文为校译。英文栏保留选用的机器转写，可能有听写误差。带时间戳的转写原文可在下方来源说明打开。

依据 AI Engineer Code Summit 主回放第 22 场的 51 段中英资料整理。最后一段时间范围沿用来源，正文截在讲者致谢处。英文沿用机器转写，中文保留原校译的存疑标记。SAFE 是讲者基于个人工程实践提出的交接模型。

[英文音频转写原文（带时间戳）](transcript-original.txt)

## 从并行子 Agent 看分布式故障 / Distributed failures in parallel subagents

[06:37:53.860—06:38:12.040](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=23873s)

各位好，我是 Girish，Microsoft 的首席软件工程师。工作之外，我给 AI Agent 写开源工具。其中一个叫 MCP Pacemaker，是个带监督机制的桥接程序，用来让 MCP 服务保持运行。开始之前，先说明一点。

Hey folks, this is Grish, a Principal Software Engineer at Microsoft. Outside my job, I build open source tools for AI agents. One of them is MCP Pacemaker, a supervised bridge that keeps MCP servers running. Before we start, a small disclosure.

[06:38:12.560—06:38:30.240](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=23892s)

这次分享只代表我的个人观点。我想说，子 Agent 构成了一个分布式系统。过去一年，我一直在实际工程工作里用 Agent 和子 Agent，例如部署、代码审查、事故分诊等等。

The views in this talk are my own and doesn't represent my employer. So, sub-agents are a distributed system. Over the past year, I have been using agents and sub-agents on real engineering work. Devositions, code reviews, instant triaging, and whatnot.

[06:38:31.440—06:38:52.480](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=23911s)

这次讲的是一个 Agent 把工作交给另一个 Agent 时会发生什么。来看这个架构。编排器把任务拆开，分给三个不同的子 Agent。它们同时运行，读取同一份共享状态。

This talk is about what happens when one agent hands work to another. So here's an architecture. The orchestrator splits the task and hands the pieces to three different sub-agents. They all run at the same time. They all read from the same shared state.

[06:38:53.080—06:39:42.820](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=23933s)

例如对话［转写有疑点］、记忆文件、仓库、工作树、工单和向量存储。它们除了思考，还会调用真正的系统，触及数据库、API、CI 工具和部署流水线。结果回来之后，编排器把它们合并成一个答案。这里有编排器、有可变的共享状态，还有多路并行执行后合并的结果。这就是一个典型的分布式系统。我知道怎么推理分布式系统，已经有几十年了。但这套配置没有自带相应的机制。你拿到的只是一个接收字符串，再返回……

Colonization, memory files, repo, working trees, issues, vector stores. And they don't just think. They make tool calls to real systems which touch databases, APIs, CI tools, deployment pipelines. and the results come back and orchestrator merges them into a single answer. An orchestrator works shared mutable state and results merge from concurrent executions. This represents a classic distributed system. I have known how to reason with distributed systems for decades but none of this setup came with it. What you get is a function that takes a string and returns a

[06:39:42.820—06:40:05.140](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=23982s)

字符串的函数。我们遇到的故障并不新鲜，也不为 AI Agent 所独有。都是经典的分布式系统故障。例如部分失败。正常的调用进行到一半失败时，会返回异常。子 Agent 却可能返回一段看起来像成功的文本。

string. Failures we hit are not new, are not specific to the AI agents. They are classic distributed system failures. Partial failure, a normal call that fails halfway through and returns an exception error. In a sub-agent case, it returns a text that looks like a success.

[06:40:06.220—06:40:33.080](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=24006s)

再比如脏读。通常有隔离机制和版本控制。这里，每个工作进程读的是同一份上下文，别人仅仅猜到的东西也在里面。还有无界扇出。服务忙时，通常会用队列、429 或 503 做背压。用了 Agent 后，编排器可能根本看不到这些，直接又启动一个工作进程。

Dirty reads. Normally, we have isolations, versions. Here, every worker reads one shade context, including things another worker only guessed. Unbounded fan-out. A busy service pushes back with the queues, 429s, 503s. In agents, orchestrator does not see any of this. It just starts in the worker.

[06:40:34.260—06:41:00.440](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=24034s)

还有重试。在普通分布式系统里，我们用幂等性让重试可控。重试子 Agent 时，可能会把整个任务从头做一遍，副作用也跟着重来。我会讲每种情形对应哪个已有概念，然后把这些概念组合成我提出的一致性模型，逐项解释为什么需要它。

Retries. In normal distributed systems, we build item potency to make retries reliable. In agents, a retried sub-agent runs the whole task again, with side effects included. For each of these cases, I'll name the concept it already is, Then I will put them together as a consistency model I am proposing and walk through why each part is there.

## 部分失败、无响应与结果未知 / Partial failure, missing replies, and unknown results

[06:41:01.720—06:41:16.460](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=24061s)

先讲故障模型，因为其他部分都以它为基础。比较好处理的是崩溃停止。原本正常运行的进程停了下来，之后也不再运行。在这类情形下，子 Agent 直接抛错，容易处理。

Start with the failure model because everything else depends on it. The friendly case is a crash stop. The process that was running correctly stops and stays stopped. The sub-agent that throws an error in this box is easy to handle.

[06:41:17.680—06:41:35.820](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=24077s)

接下来是没有回复。调用丢了，或者回应迟迟不到。我们一会儿会再谈这个。难处理的一种来自拜占庭将军问题。某个组件发回了互相冲突的信息，进程确实回答了，答案却是错的。

Next, no reply. The call is lost or it's very late. We will come back to this soon. The hot case is the one from Byzantine General Sniper. A component that gives conflicting information. The process answers and the answer is wrong.

[06:41:36.980—06:42:16.800](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=24096s)

子 Agent 把工作做到一半时，最接近这种情况。它并无恶意，但从外面看是一样的。它没有崩溃，还回答得很流畅。细看一下。任务只完成了一半，子 Agent 没有抛异常，返回的是一段看着正常、类型签名也与成功相同的文本。我在另一场演讲里说过类似的情况。我们把 Agent 用在告警队列［转写有疑点］，示意图里有三条路径，给出了同一个答案。第一个真的取了遥测数据，与已知无害的集合比较。

A half-finished sub-agent sits closest to the box. It is not malicious, but from the outside it looks the same. It does not crash. It answers fluently. Let's jump into this. A sub-agent that half-finished does not raise. It returns normal looking text with the same type signature as success. I talked about one version of this in one of my talks. We appointed an agent at an LLQ. Here's an illustration I used there with three different paths which gave the same answer. The first one, it pulled the telemetry and compared with a known-beenign set.

[06:42:17.560—06:42:37.780](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=24137s)

它确实做了工作。第二个拿告警标题和以前见过的标题比了一下，就给了答复。第三个什么都没做，只是推理了一下。这三条告警都被归成无害，置信度也一样。

It actually did the work. The second one, it matched against the title it has seen before and gave the response. The third alert, it didn't do anything. It just resonated. All three are categorized as benign with the same level of confidence.

[06:42:39.020—06:43:03.240](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=24159s)

下游没法区分。编排器能看结论，却看不出背后做了多少工作。接下来是调用没有回复。编排器发出工作，计时器到了。从这里看，三种情况一模一样。子 Agent 还在干活、它已经崩溃，或者回复丢失了。

And nothing downstream can tell this apart. The orchestrator can read the conclusion. It cannot read how much work was behind it. Now, the call gets no reply. The orchestrator sent work and the timeout fired. From here, 3 volts look the same. The subagent is still working. It crashed and the reply was lost.

[06:43:04.200—06:43:49.840](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=24184s)

这是一个硬性限制。[转写有疑点] 1985 年的 FLP 论文说明，异步系统里即使只有一个进程可能故障，共识也可能一直无法完成。Chandra 和 Toueg 在 1996 年给出的办法是允许出错的故障检测器。它只能怀疑，无法确定。我的开源桥接工具 MCP Pacemaker 两种问题都遇到过。一个服务在首次运行时要先下载自己，超过了调用的 30 秒时限，看起来坏了，其实只是慢。我们给 initialize 单独设了时限。反过来也遇到过，服务在调用期间崩溃……

It's a hard limit, not a Turing gap. The FLP paper from 1985 showed that in an asynchronous a system with even one faulty process agreement can fail to finish. Chandra and 2x answer in 1996 was failure detectors that can make mistakes they suspect did not know. I hit both directions in my own open source project MCP pacemaker supervised bridge. A server whose first friend downloads itself hit the 30 second call timeout and look broken it was slow not dead we fixed it by giving initialize its own timeout now the other way the server crashed during a call

[06:43:50.360—06:44:36.360](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=24230s)

随后调用又超时。超时状态盖掉了原本能解释崩溃的退出码。我们修改了处理，只在进程还活着时才记为超时。所以，超时只能算怀疑，应把结果记为未知，并保留真正的原因。然后把失败也当成返回值。看这个示意图。子 Agent 返回状态、做过什么、哪些没做、证据和已经发生的副作用。部分完成在这里是正常结果。协议已经给它留了位置。在 A2A 中，任务可以结束为已完成、失败、

the call then timed out and the timeout overrode the exit code that explained the crash we fixed it by recording the timeout only when it was alive so timeout is a suspicion record it as unknown and keep the real cause. And now make failure a value. Let's take this illustration. A sub-agent returns a status, what it did, what it did not do, the evidence and any side effects. Partial is a normal answer here. The protocols already have a slot for this. In A2A, a task can end as completed, failed,

[06:44:36.660—06:44:55.180](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=24276s)

取消或拒绝，也可以暂停等输入。在 MCP 中，工具结果可以返回 `isError: true`。但子 Agent 的状态仍可能是「完成」，正文却表达了别的意思。只看正文的循环看不到这个区别。

cancelled or rejected. Or stop and ask for input. In MCP, a tool result can say is error true. But a sub-agent can still say completed while its text says something else. And a loop that only reads the text never sees the difference.

## 共享上下文和 SAFE 交接模型 / Shared context and the SAFE handoff model

[06:44:56.360—06:45:48.760](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=24296s)

还有一个区别。查过某个条件，结果为否，和压根没能查，是两件事。我个人写的一份关于评估状态的互联网草案谈过这个。如果混在一起，就会影响重试什么、通知谁以及事后审计记录写什么。再说脏读。看我另一场演讲里编的例子。一个子 Agent 在共享上下文里写「错误率下降了 80%」。它没有测，只是推断。然后另两个子 Agent 也读了这份上下文。第二个……

Another split. Checking a condition and getting no is a different fact from not being able to check at all. My own individual internet draft on evaluation states talks about this. Collapse the two and you change what gets retried and who gets paged and what the audit says later. Next, dirty reads. Let's take this made up example from one of my talk. The subagent, the stretch, it writes into a shade context saying that error rate fell by 80%. It did not measure it. It inferred it. Now, two other sub-agents read from the same shade context. The second

[06:45:48.760—06:46:36.560](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=24348s)

子 Agent 写审查意见，把同一句话抄进去。第三个写运行手册，以此为理由建议继续。编排器把三份产物合并，看起来三者一致。其实是一条没有证据的话被读了三次。1995 年那篇关于 SQL 隔离级别的批评文章，把脏读定义为在写入者提交或回滚前就读到数据。共享上下文里，猜测一写进去就能被读到，又没有标记它未核查。有人会想到问三个子 Agent，凑个法定人数。法定人数有效，有个具体原因。

sub-agent writes a review note and picks the same sentence up. The third agent writes a runbook and uses it as a reason to proceed. The orchestrator merges all these three. Three artifacts agree. It is once an unsupported sentence, read three different times. The 1995 critique of SQL isolation levels defined a dirty read as, you read a value before the writer commits or rolls back. In a shared context, a guess is readable the moment it is written, and nothing marks it as unchecked. A regular fix is to ask three sub-agents and get a quorum. Quorums do work for a specific reason. In

[06:46:36.560—06:47:07.940](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=24396s)

1979 年的加权投票方案里，读法定人数与写法定人数之和大于总票数。因此，任意一次读都会和最近一次写有重叠，保证来自这个重叠。三个子 Agent 读同一份上下文，得不到这个保证。它们不是独立副本，读的是同一个猜测。一致的答案，其实只把同一来源计了三遍。我们来选一个一致性模型。在数据库领域，有一系列现成的办法。

weighted voting from 1979, the read quorum plus write quorum is greater than total. So every read overlaps the latest write. The overlap is the guarantee. In sub-agents case, the three sub-agents that read the same shared context does not give you that. They are not independent copies. They read the same guess. Their agreement is one source counted three different times. Let's pick a consistency model. In databases we have a cavalry for this.

[06:47:10.060—06:47:35.000](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=24430s)

线性一致性，每个操作看起来都在符合实时顺序的某个时点发生。顺序一致性，有一个全序，且尊重每个进程自身的顺序。因果一致性，有因果关联的操作在各处按同一顺序出现。会话保证，针对一个客户端作承诺，例如能读到自己的写入，读到的版本不会倒退。

Linearizable. Every operation appears to happen at one point in real-time order. Sequential. One total order that respects each process's own order. Causal. Operations that are causally appear in the same order everywhere. Session guarantees. There are promises to one client, like read your writes and monotonic reads.

[06:47:35.920—06:47:56.220](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=24455s)

最终一致性，如果没有新更新，读取最终会返回最后的值。共享上下文本身不提供上述任何保证。连一条明确的保证都没有。我们也用不着追求最强的一致性。网络发生分区时，最强的一致性模型无法继续保持可用。

Eventually, if no new updates are made, reads eventually return the lost value. A shared context gives you none of these. There is no stated guarantee at all. And you don't need the top consistency models. The strongest models cannot stay available when the network splits.

[06:47:57.220—06:48:19.080](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=24477s)

因果一致性和会话保证可以继续保持可用，前提是每个客户端都固定在一个地方。对子 Agent 来说，这个地方就是编排器。下面是我使用的一致性交接模型，叫 SAFE。S 代表带来源的事实。

Causal in-session guarantees can, as long as each client sticks to one place. For sub-agents, that place is orchestrated. So, here's a consistency model I use for sub-agents. I call it SAFE handoffs. S stands for source feeds.

[06:48:19.800—06:48:39.140](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=24499s)

工作进程交过来的每项事实都带着来源版本、截至时间和修订号，做决定时只读来源明确、仍在有效期内的事实。A 代表副作用至多发生一次。每次写入都有身份标识，批准只对那个确切动作生效一次。

Every fact the worker hands on carries its source version as of time and revision, and decisions read only fresh source facts. A at most one's effects. Every write has an identity and a single use approval for that exact action.

[06:48:40.120—06:49:22.020](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=24520s)

要查结果，就读回，避免重放动作。F 代表扇出预算。每个下游都有准入关口和有界的预算，拒绝也计入失败。E 代表明确的结果。每次交接都以命名状态结束，超时记为未知，并保留已产生的成本。我在自己的子 Agent 上用这套一致性模型。它是根据我公开的工作得出的，适用范围有限。一部分来自我的 MCP Pacemaker 桥接工具，另一部分来自其他演讲和我的互联网草案。

An outcome is read back, never replayed. F. Fan out budgets. Each downstream gets a gate and a bounded weight, and refusal counts as a fail. E stands for explicit outcomes. Every handoff ends in a named state, and a timeout is unknown, with its cost kept. This consistency model is the one I use for my own sub-agents. It's not a universal model. It's based off my own public work. Some of it is in my FCB pacemaker bridge and some are based on my other talks and my own internet draft.

## 来源、修订号与有效期 / Provenance, revisions, and freshness

[06:49:23.700—06:50:11.420](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=24563s)

下面逐个看这些字母。S，带来源的事实。它处理的是脏读，也就是一个工作进程的猜测变成另一个工作进程的事实。可以把每项事实都当成一条记录。Lamport 1978 年的论文定义了一个事件何时发生在另一个事件之前。事实的来源记录要写清从哪里读的、何时读的。看这个虚构的例子。记录包含主张及其修订号、来源及其版本、范围，以及三个不同的时间。数据截至何时、我们何时读到它、何时……

Now let's see what's behind each letter. Guess source rates. It's the answer to that he reads where one worker's guess becomes another worker's fact. What helps is to treat every fact as a record not a sentence. Lampard's 1978 paper defined when one event happened before another. The fact's provenance is that record. What it was read from and when. Let's take this made up example, the record names, the claim and its revision, the source and its version, the scope and three different times when the data was current, when we read it and when

[06:50:11.420—06:50:36.320](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=24611s)

用它。时效在事实被使用时检查。这里，数据截至 9:05，我们在 9:06 读取，在 9:07 作决定。设定的有效期是 5 分钟，所以 9:07 使用它没有问题。

we used it. Freshness is checked where the fact is used. In this illustration, the data ends at 905, we read it at 906 and we decided at 907. In this case, we picked a 5 minute limit, so the data decision at 907 is fine.

[06:50:37.340—06:50:56.400](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=24637s)

9:15 又来了一项决策。我们的有效期是 5 分钟，原记录仍保留，但这次使用被拒绝。下次要作决定，就要重新读一遍。这样可以区分观测和推断。

Now at 915, a second decision came in. Because our freshness limit is 5, this is still recorded. We reject it. And we say that the next decision needs another read. This is how you separate an observation from an inference.

## 重复写入、读回与过期批准 / Duplicate writes, read-back, and stale approvals

[06:50:56.840—06:51:25.020](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=24656s)

观测有来源和读取时间，推断没有。A，至多一次副作用，处理的是重试问题。这里是我写 MCP Pacemaker 桥接工具时用过的一个图。编排器派任务，子 Agent 调用工具，工具进行实际写入，例如创建一条 PR。

An observation has a source and a read time. An inference has none. Yay, at most of it is about retries. This is an illustration from my article about MCP pacemaker bridge. The orchestrator delegates a task. The sub-agent calls a tool which does a real right, like creating a PR.

[06:51:26.800—06:51:49.600](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=24686s)

回复丢了。编排器只知道结果未知，于是把整个任务重试了一遍。写入也重复了。这是个经典问题。1984 年关于 RPC 的论文说，如果调用返回，远程过程恰好执行一次。

The reply is lost. The orchestrator knows one thing, the outcome is unknown. So, it retries the whole task. The right happens again. This is a classic problem. In 1984, our PC paper says that if the call returns, the procedure ran precisely once.

[06:51:49.940—06:52:06.020](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=24709s)

如果拿到的是异常，那过程可能执行了一次，也可能完全没执行，你不知道是哪一种。于是需要选一种投递语义。至多一次就不重试，接受它可能没执行。

If you get an exception, it ran once or not at all. And you are not told which. So, you pick a delivery semantic. At most once, don't retry and accept the fact that you may be lost.

[06:52:07.400—06:52:28.700](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=24727s)

至少一次就重试，接受有重复的可能。恰好一次是在保证至少执行一次的同时，能去掉重复，例如使用幂等键。在 MCP 里，幂等提示只是一条提示，默认值还是 false。

At least once, retry and accept that duplicates are possible. Exactly once, it happened at least once and there is a way we can deduplicate, maybe by using an idempotency key. In MCP, item potent hint is only a hint and it defaults false.

[06:52:28.960—06:52:44.840](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=24748s)

需要幂等就得自己实现。我是这样在桥接工具里处理的。客户端重启回来后，桥接工具会把记录过的 initialize 在新的服务端上重新发一遍。这个操作安全，只是握手。

If you need it, you build it. Here's the model design from my bridge on how I handle it. When a client comes back after restart, the bridge replaces the client's record initialize against a fresh server. That's safe, it's just a handshake.

[06:52:45.240—06:53:02.900](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=24765s)

它不会恢复工具状态。结果不确定的工具调用也不会重放。服务被回收后，桥接程序会清理进行中的调用。到了截止时间还没有回应的调用，会以「可能已经执行」的状态失败。这个状态反映了真实情况。

And it does not restore tool state. What it never replaces is an uncertain tool call. Once the server is recycled, the bridge drains it, and calls till an answer at the deadline fail as potentially excluded. That status is honest.

转写校注。The status is “possibly executed”. The machine transcript renders “executed” as “excluded”.

[06:53:04.340—06:53:25.640](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=24784s)

它告诉调用方去核对结果。有效的办法是给每项副作用一个标识，批准绑定到确切的动作，只能用一次。调用之后用该标识读回结果。已提交只是一个状态，观察到实际效果后才算已确认。

It tells the caller to go and check. What helped is giving every side effect an identity. Approval binds that exact action. It's only used once. After the call, read back by that identity. Submitted is not confirmed. Confirmed means you observe their effect.

[06:53:27.300—06:53:48.660](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=24807s)

A 的最后一点，在任务暂停和恢复时就会出现。租约就是带超时的锁。Martin Kleppmann 的分布式锁文章写过这个问题。客户端持锁时暂停了，租约到期，另一个客户端接管。第一个客户端醒来后却照样写入。

The last part of A. It shows up when work passes and resumes. A lease is a lock with a timeout. Martin Kleppman's post about distributed locking shows this problem. A client passes while holding it. The lease expects. Someone else takes over and the first client wakes up and writes anyway.

[06:53:49.880—06:54:09.120](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=24829s)

他提出的办法是 fencing token，也就是每次授予锁时递增的数字。存储端记住见过的最大 token，拒绝携带旧 token 的写入。子 Agent 经常暂停，也经常恢复。

The fix he proposed is a fencing token, a number that goes up every time the lock is granted. The storage remembers the highest token it has seen and rejects any right with a old one. Sub-agents pause and resume all the time.

[06:54:10.140—06:54:29.100](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=24850s)

用我另一场演讲里的话说，恢复上下文时，结果未明的写入要先用动作标识读回，再判断能否重试。把批准当成 fencing token。一个动作，一次使用，在准入关口校验。不要靠提示词或对话来记这个许可。我的桥接程序修过同类问题。

In my other talk, as I put it, restore context, not side effects. So treat an approval like a fencing token. One action, one use. Checked at the gate. Not remembered in the prompt or conversation. My bridge fixed the same class of bug.

## 扇出预算和显式交接结果 / Fan-out budgets and explicit outcomes

[06:54:29.800—06:54:49.000](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=24869s)

过期的退出事件或已删除会话的恢复操作，都无法再移除或重新唤起替换后的会话。F，扇出预算，针对的是无界扇出，也就是流控不足。我的 MCP 桥接工具还没限制冷启动时，我就碰到过。

A stale exit or a deleted resume can no longer remove or bring back a replacement session. If fanout budgets is about unbounded fanout. This is flow control or the lack of it. I hid this issue in my own MCP bridge before it had a limit on cold starts.

[06:54:50.980—06:55:07.740](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=24890s)

很多会话同时通过 NPX 启动服务，共用一个包缓存，结果每个都因为 npm 的锁相关错误［转写有疑点］失败。单看每个请求都没问题，失败来自并发本身。

Many sessions start their service at the same time through NPX. They share one package cache. Every one of them failed with NPM's log compromise error. Nothing in any single request was wrong. The failures was the concurrency itself.

[06:55:08.780—06:55:24.160](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=24908s)

下游即使发出背压，也可能只返回一段纯文本。MCP 规范里有个工具执行失败的例子，限流信息就一句话。模型读到了，编排器的代码却可能完全不看。

And when a downstream does push back, it can arrive as a plain text. This is MCP specs one example of tool execution error. A rate limit has one sentence. The model reads the sentence. The orchestrator code may never look.

[06:55:24.500—06:55:43.360](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=24924s)

它马上启动下一个工作进程。所以我在桥接程序里加了并发预算。用包管理器的冷启动先通过准入关口，默认每次两个。其他启动请求排队，最多等 15 秒。

The next worker starts an e-mail. So I introduce a quota budget in my bridge. cold starts that use a package manager go through a gate, two at a time by default. Everyone else waits and the wait is bounded at 15 seconds.

[06:55:43.860—06:55:58.860](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=24943s)

等满 15 秒后就不再卡在关口，直接启动。我把原因写进了文档。缓存损坏只是风险，客户端请求无限挂起则必然发生。这是有意优先选择可用性，并把这个选择记录下来。

Past that, the start goes ahead without a gate. And I documented why. A corrupted cache is a risk, while a hung client request is certainty. That is a choice for availability, made on purpose and written down.

[06:56:00.860—06:56:23.380](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=24960s)

我还给会话数加了上限。到上限后，新会话最多等 10 秒，然后被拒绝。健康状态会把这次拒绝记为失败。还碰到一个问题，必须在同步启动前预留容量。要是启动以后再预留，排队的启动任务会把容量超额占用。

I also built the cap on sessions. At the cap, a new session waits up to 10 seconds and then it's refused. That refusal now counts as a failure in health. Another bug, capacity has to be reserved before the synchronous start, not after. Otherwise, queued starts overbook the cap.

[06:56:23.620—06:56:59.560](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=24983s)

这叫先检查再执行的竞态。对子 Agent 来说，要给编排器每个下游各自的预算，也要让它看得见拒绝。然后是 E，明确的结果。每次交接都要用命名状态结束，例如过期、未知，不能只给一段文本。最后要问的是，谁决定这个状态。把子 Agent 的输出当成不可信输入，就像对待来自互联网的请求体。编排器要在代码里执行检查。结果符合 schema 吗？

That is a check then act raise. For sub-agents, give the orchestrator a number per downstream, and a refusal it can see. Now, E, the explicit outcomes. Every hand of ends in a named state, like stale or unknown, not just text. The last piece is who decided that state. Treats of the agent output as untrusted input, the same way you treat a request body from the internet. The orchestrator owns the checks, in code. Does the result match the schema?

[06:57:00.860—06:57:27.140](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=25020s)

还在有效期内吗？重新计算后，数字对得上吗？只要检查失败，就返回拒绝和原因。不能把原文继续传下去，底下再附一段警告。假如同一个模型能跳过检查，还能自行宣布通过，那么你只是向它提了要求。来看另一场演讲里我编的例子。子 Agent 说错误率下降了。

there is it fresh enough? Do the numbers hold when you recompute them? If a check fails, the step returns a refusal with a reason. It does not pass the text along with a warning paragraph underneath. If the same model can skip a check and declare it passed, you have a request, not a boundary. Here's a made-up example from another talk. A sub-agent says the error rate fell.

[06:57:28.000—06:57:42.480](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=25048s)

以前 1,000 次请求有 10 次报错，之后 600 次请求有 6 次报错。它看到错误次数从 10 降到了 6，就说错误率降了。但我们重算了一遍，两次都是 1%。

Before, it was 10 errors in 1000 requests. After, it was 6 errors in 600 requests. It went from 10 to 6 and it claimed that error rate fell. But when we computed the rate, it's both 1%.

[06:57:43.580—06:58:00.360](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=25063s)

重算之后，我们拒绝接受这个主张。答案有依据，可以。明确把任务交给人来处理，也可以。自信地猜测不行。接下来谈局限，一致性模型只有明确了适用边界，才有用。

We recomputed it and then the claim is refused. A supported answer is fine. A deliberate handoff to a person is fine. A confident guess it's not. So limitations because the consistency model is only useful when you know where we should start.

## 模型的适用范围与代价 / Scope and trade-offs

[06:58:01.620—06:58:49.560](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=25081s)

SAFE 无法生成事实。有来源的事实可以核查，仍可能有错。它也不保证恰好一次投递。回复丢失后，在读回之前，结果一直是未知。它不会自动回滚。撤销一个做了一半的任务，要由你设计补偿步骤，就像 1987 年的 Saga 论文那样。最后，不同工作进程之间没有全局排序，每项事实只保留因果顺序。这套办法也有成本。CAP 定理说，网络分区时要在可用性和一致性之间取舍。我的桥接工具……

So here's what SAFE model does not do. It does not make facts. A source fact is checkable, not correct. It does not give you exactly once delivery. A lost reply stays unknown until you read it back. It does not roll anything back. Undoing a partial task is a compensation step you design, like the Saga's paper from 1987. And finally, there's no global order across workers. Only causal order, per fact. And it has a price. CAP theorem says that when the network splits you trade off availability against consistency. MyBridge

[06:58:49.560—06:59:34.060](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=25129s)

有意让冷启动优先保持可用。对于写入，SAFE 优先保证一致性，遇到不确定的结果就拒绝。PACELC 还说明，即使没有故障，延迟与一致性之间也有取舍。每查一次时效，就多一次读取。每次拒绝也需要有人负责处理。哪些情况不适用？如果子 Agent 只拟稿，任何操作前都有人读一遍，大部分机制都会成为额外开销。它还假设只有一个编排器，有多个就不合适。

shows availability for cold starts on purpose. For writes, Safe picks consistency over availability. It refuses rather than guesses. Paclac adds that even without failures you trade latency for consistency. Every freshness check is another read and every refusal needs an owner. So, where it does not fit? If a subagent only drafts text that a person reads before anything happens, most of this is a workhead. It also assumes that there is one single orchestrator. If you have more, this does not fit.

[06:59:35.580—06:59:52.100](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=25175s)

如果各 Agent 是对等的，也没有一个固定的协调点，就得用别的办法。这是我给会接触真实生产系统的 Agent 用的一致性模型，适用范围有限。最后讲三点。

Peer agents with no single place to stick to need something else. This is the consistency model I use for my own agents that touch actual real production systems. It's not universal. So, wrapping up, here's 3 key takeaways.

[06:59:53.260—07:00:27.960](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=25193s)

把交给子 Agent 的每次工作都当成网络调用。它可能失败一半，可能很慢，也可能回来两次。结果要返回状态。如果无法表达部分完成、过期或未知，编排器就会读成已完成。可以从 SAFE 模型出发，用代码执行规则。保留适用的部分，改掉不适用的部分。我们早就知道怎么构建分布式系统，只要意识到自己正在构建的就是这样的系统。以下是这次演讲的一些来源。

Treat every handoff to a sub-agent as a network call. It can fail a half way. It can be slow. and it can come back twice. Return states, not just text. If the result cannot say partial, stale or unknown, the orchestrator will read it as done. And start with our save consistency model and enforce it in code. Keep what fits and change what does not. We already know how to build distribute systems. We just have to notice that we are building one. So these are some of the sources

[07:00:28.840—07:00:55.980](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=25228s)

左边是我自己的开源项目、文章、草案和演讲，右边是规范、标准，以及每个概念背后的论文。谢谢。

behind this talk on the left side it's my own work my open source projects my articles and drafts and my talks on the right side specs and standards and a bunch of papers behind each concept thank you
