# Databricks 怎样给 Agent 一份可分叉的工作环境？

Ankit Mathur

中文校译与英文机器转写

中文为校译。英文栏保留选用的机器转写，可能有听写误差。带时间戳的转写原文可在下方来源说明打开。

依据 AI Engineer Code Summit 主回放第 10 场（02:46:34–03:03:08）的 61 段中英资料整理。官方英文题名为 The Rise of the Agent Workforce: Rethinking Agent Infrastructure。英文为机器转写，中文保留原校译中的已知缺漏。讲者描述了 Databricks 在平台上的实现思路，练习采用本地模拟数据。

[英文音频转写原文（带时间戳）](transcript-original.txt)

## 让 Agent 能够并行探索多种方案 / Let agents explore multiple solutions in parallel

[02:46:34.840—02:46:51.380](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=9994s)

大家好，很高兴来到这里。我叫 Ankit，在 Databricks 做 AI 基础设施。今天想讲讲 Agent 团队的兴起，以及我们怎样搭建基础设施，支持我们眼中的下一代 Agent。

All right. Well, super excited to be here. My name's Ankit. I'm from Databricks. I work on AI infrastructure there. And today I'm going to talk about the rise of the agent workforce and how we're building our agent infrastructure to support what we think is the next generation of agents.

[02:46:52.500—02:47:03.840](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=10012s)

我想先退一步，回顾一下我们怎样让计算机学会做其他事，甚至做得比人好。我小时候经常玩的一项游戏是国际象棋。

I wanted to start by taking a step back and thinking about how we helped computers become good at other things, better even than humans. And one of the games I grew up playing a lot was chess.

[02:47:04.440—02:47:14.900](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=10024s)

这是个很好的例子，计算机早就下得比人好得多。重要的是想清楚，为什么会这样，又能怎样把当时的经验用到今天。

It's one of the great examples of something where computers became way better than humans a long time ago. But I think it's important to think about why that happened and how we can apply those lessons today.

[02:47:15.700—02:47:27.500](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=10035s)

当然，这背后做了很多工作。往大处说，计算机取得优势的一个关键，是它能比人更有效地探索各种可能的决策。

One of the biggest, you know, to summarize at a high level, a lot of work went into it. The biggest thing that agents were able to do, that computers were able to do, was explore the space of decisions much more effectively than humans.

[02:47:28.160—02:47:41.220](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=10048s)

大多数复杂问题都有很多种解法。每走一步，还能想出三种后续选择。[转写有缺漏] 我们每个人都在探索这样的空间。

For most complex problems, there's actually a bunch of different ways you can solve the problem. And at each turn, you can kind of think of three more decisions that you can make. of that space that all of us are engaged in.

[02:47:41.220—02:47:57.860](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=10061s)

我们这些解决难题的人，都在寻找各种可能性，比如怎样做出一个很好的产品，或者一道数学题的正确解法是什么。Anthropic、OpenAI 和 Google 这类研究机构，在处理定义清楚的问题上取得了很让人兴奋的进展。

All of us who solve hard problems are engaged in the search space for what's an amazing product, what's the right solution to this math problem, and et cetera. And I think we've seen some really exciting progress from the labs like Anthropic, OpenAI, and Google on solving problems that are well-formed.

[02:47:58.180—02:48:32.160](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=10078s)

国际象棋可以有效地建模。你能评估局势，可以模拟，安全地尝试不同的走法。数学题也类似，Agent 擅长解的那些题，往往能验证答案到底对不对。怎么把这种思路用在日常遇到的问题上？在座大概都是工程师，我们就用工程来举例。要是……

So if you think about chess, it can be modeled effectively. You can evaluate your position. You can actually simulate it. You can try different moves and safely alternatives. Similarly with math problems, often the ones that agents are really good at solving, you can actually verify if you got the result right. And how do we then take that mindset and apply it to the problems that we actually face day to day? I think everyone here is an engineer, so let's take it to engineering for a bit. I think if you

[02:48:32.160—02:48:46.080](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=10112s)

……回到 AI 之前，大多数人会想着一次解决一个问题，写代码的那段时间就专注在那个问题上。公司或产品要多解决几个问题，就会多招一些人。

take it to the pre-AI days, most people think about solving a single problem, and they're for the time that they're writing code on it. And as a company or a product, if you wanted to solve more problems, you brought in more people.

[02:48:46.540—02:48:59.860](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=10126s)

最基础的 Agent 能让工程师一个人做更多。现在，你可以同时推进三件原来得依次专注做的事。这能让你探索新的产品想法、更快交付、更快迭代。

And the very basic version of agents just helps create leverage for that engineer. Now you can be single-threaded on three things at the same time. And ultimately, that helps you explore new product ideas, ship faster, iterate faster.

[02:48:59.900—02:49:15.420](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=10139s)

这当然很让人兴奋。不过它还远远达不到下赢国际象棋或解决刚才那类问题所需要的探索程度。现在处在前沿的，是由多个 Agent 组成的团队，通过更有效地探索决策空间，取得明显进展。

And that's obviously very exciting. But it's not actually close to what we needed to do to win a chess or any of these other problems. frontier are these teams of agents that are able to make significant progress by exploring the decision space more effectively.

[02:49:15.760—02:49:26.920](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=10155s)

那怎样才能让一组 Agent 有条理地一起解决问题？这其实相当复杂，我们认为要用稍有不同的基础设施。

So how do we move towards that world where we actually have these teams of agents that are coherently attempting to solve problems? It's actually quite complex, and we think it requires a little bit different type of infrastructure.

## 分叉数据平台，验证管道修复 / Fork the data platform and validate pipeline fixes

[02:49:28.320—02:49:42.520](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=10168s)

具体来说，有个重要的问题。怎样给 Agent 一个足够真实、可以探索的环境？在一些别的问题里，我们能把那个环境定义得很好。可即使在软件工程里，要做到这件事也很难。

Specifically, I think an important question to ask is how do we give agents a realistic world to explore? because in other problems we're able to help define that world very effectively. But even in software engineering, we actually really struggle to do that.

[02:49:43.000—02:49:54.820](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=10183s)

想想大家正在搭的软件工厂。你不用守在每个 Agent 旁边，同时让一群 Agent 处理一个问题。你怎么验证它们做得有效？

Like just consider this movement towards software factories, right, where you're away from the agents and you're actually operating a bunch of agents that are working on a problem. How do you validate that those agents are effective?

[02:49:55.600—02:50:29.560](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=10195s)

以前有个主分支，你从主分支切出来做 PR。也许有个 Agent 在做这个 PR，你可以合理地认为这有点像模拟，因为有测试之类的东西指导开发。但如果每分钟合并几十个甚至更多 PR 呢？想象未来的工厂里，Agent 一直在写代码、做软件。你的 PR 在切出分支那一刻就落后了，刚开始就已经过时。这就得想……

Like before you had a branch, you had main, you branched your PR off of that, maybe you have an agent working on that PR and you have some reasonable assertion that this is kind of a simul... you know, you have some tests or something like that that help you guide your development. But if you're actually merging tens of PRs a minute or even more, right? Like if you play out the future of factories of agents building code and software, your PR is just out of date the moment you branched. The moment you started, you're already out of date. And so it demands a

[02:50:30.680—02:50:44.460](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=10230s)

……怎么验证这些改动。你甚至可能想把大部分验证放到合并之后。这让我想到一个稍微激进的主意。我觉得不该忙着写几百、几千个单元测试。

thinking of how do we verify these things. You actually might want to move most of your verification to post-merge. And so that kind of brings me to this a little bit radical idea. I don't think we should try to write hundreds or thousands of unit tests.

[02:50:45.140—02:50:58.320](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=10245s)

我想探索模拟真实环境。能不能把现实里实际运行的东西，包括生产代码和生产 Agent，忠实地复制一份，再让 Agent 在里面工作？

Instead, I want to explore this idea of simulating reality. Can I give my agent a faithful reproduction of what's actually there in the real world, in my production code, in my production agent, and let it work on that?

[02:50:58.900—02:51:13.040](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=10258s)

一旦做得到，就能扩到很大的规模。找到模拟现实的方法，就能拿它来探索许多不同的方案。Databricks 平台上的一项主要用途，是搭建数据管道。

And when you can do that, you can actually do that at scale. If you find a way to simulate reality, then you can actually do that across lots of different explorations. At Databricks, one of the big things that people do on our platform is build data pipelines.

[02:51:13.360—02:51:27.300](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=10273s)

Databricks 上有数万条数据管道。管道最大的问题就是会坏。在 Agent 时代，大家想让 Agent 来修这些坏掉的管道。

We've got tens of thousands of data pipelines on Databricks. And the biggest problem that happens with pipelines is that they break. And in this era of agents, what people want is they want to fix those broken pipelines with agents.

[02:51:28.320—02:51:55.200](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=10288s)

管道坏了会带来严重的业务问题。管道一断，企业当天可能就运转不了，所以这是紧急事件。可怎么用 Agent 验证修复？你敢让它直接上生产管道吗？风险很大，写入可能不是幂等的，就连读取都可能非常昂贵，影响生产环境里的其他业务。有时管道也只坏了一部分。

these are serious business problems that are caused by a broken pipeline. If a pipeline breaks, that business can't operate that day. And so this becomes a major emergency. But like, how do you actually validate this with an agent? Do you trust it on your production data pipeline? It's pretty risky because writes might not be idempotent, even reads might be extremely expensive and affect other use cases in production, right? Sometimes it's not fully broken, it's just partially broken.

[02:51:56.120—02:52:14.880](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=10316s)

我们开始在可分支的基础设施上做这件事。我们把整个数据平台分出一份，包括数据表、计算资源和治理设置，给 Agent 一个能在其中试操作、探索不同假设的环境。

One of the things we started doing was building on top of branchable infrastructure. And so what we did was we branched the entire data platform. We branched the tables, the compute, the governance, and we gave the agents a place where they can actually play with the data platform and explore different hypotheses.

[02:52:15.320—02:52:31.620](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=10335s)

假设可以大胆一点。比如要调查上游管道是不是正常，可以尝试改管道代码，再跑一次。换作正常的数据平台，除非有几位工程师看过并确认非常安全，否则不会这样动上游管道。

And these hypotheses can be ambitious. Can I investigate the upstream pipeline is healthy? Maybe I can do that by changing the pipeline code and running it again. reasonable data platform, you wouldn't do that with an upstream pipeline unless you had a bunch of engineers take a look at it and make sure it was super safe.

[02:52:32.100—02:52:50.020](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=10352s)

用我们的分支数据平台，现在可以这样做。Agent 可以调查很多不同的情况。例如让它们并行验证十个想法，得出可信的结论，判断改动能不能修好真实数据管道，再把结论报告给主 Agent 或人。

With our branch to data platform, you can actually do that now. So it can investigate a bunch of different things. So we can investigate 10 ideas in parallel with our agents, actually get to a faithful conclusion about whether it fixed the real data pipeline, and then make that assumption, make that assertion back either to a main agent or to a human.

[02:52:50.520—02:53:01.520](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=10370s)

以前我们看到的过程是，大模型给出一些……[转写有缺漏] 人看了以后说，这个猜想可能有意思，然后再想办法去试。

And what we saw before was happening was that people would just like, LLMs would give us Some human would take a look at it and be like, OK, this might be an interesting theory. Then they would go apply that theory in some way.

[02:53:01.780—02:53:16.880](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=10381s)

结果更像是用 AI 辅助修数据管道。我们真正想达到的，是这一类问题能全程自动解决，工程师可以放手。没有可分支的基础设施时，我们很难做到。

And ultimately, that became more of this AI-assisted version of fixing the data pipeline. But really, where we want to go is hands off, full auto for this kind of problem. And we were struggling to do it without this branchable infrastructure.

## 分叉 Postgres 和会话状态 / Branch Postgres and conversation state

[02:53:17.860—02:53:33.100](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=10397s)

具体怎么做？今天我会讲一讲。我们把它建在原生基于 Postgres 的 Agent 平台上。起点是 Neon 数据库，一个能分支的数据库。我们的服务和 Agent 都可以使用它。

So how do we do it? I'm going to talk a little bit about that in this talk. We built this on top of our Postgres native agent platform, which started with the NEON database, which is a branchable database that gives us a single place that we can actually use for our services and for our agents.

[02:53:33.440—02:53:47.220](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=10413s)

然后我们加了不少 Agent 的核心组件，好搭建不同类型的复杂 Agent。这些大家大概都熟悉，比如记忆、沙箱、文件系统和运行 Agent 的托管环境。

And then we added in a bunch of really core agent primitives that allow us to build sophisticated different types of agents. And those are ones that are probably familiar to all of you, things like memory, things like sandboxes, file systems, and ways to host those agents.

[02:53:47.620—02:54:00.420](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=10427s)

我们可以用这些底层组件来构建应用，关键是把它们全做成可分支的。这样，建在平台上的东西，整个运行环境都可以分出一份。具体是怎么做到的呢？

And these low-level primitives, we can build with them, but the key is that we made just all of them branchable. So you can branch the entire reality of stuff that's built on this platform for ourselves. So how do we actually do that?

[02:54:00.500—02:54:12.720](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=10440s)

我分情况说。第一项就是数据库。可以拿应用服务举例，不过这里先谈一个基本需求，存储 Agent 的会话状态。

Well, let me walk it through, like, kind of case by case. The first thing is just the database, right? And we can take an example of application services, but here I'm going to talk about just even storing the conversation state for an agent.

[02:54:13.580—02:54:23.860](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=10453s)

你给 Agent 建分支时，可能想让分支继承历史。如果是一队 Agent，你甚至可能希望队里的某个成员能看到其他成员正在做什么。

When you fork or branch an agent, you actually might want to inherit the history. And you might even, if you have a team of agents, give access to a given member of that team to what the other members of the team are doing.

[02:54:24.580—02:54:39.160](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=10464s)

我们发现，用数据库来表达这个需求很方便。关键是，分支里的 Agent 收到一条新回复时，另一个 Agent 的内容不必跟着变。Neon 的数据库分支让这件事成为可能。

And we found the database to be a convenient abstraction for this. The key was that, hey, when a new reply comes in on the branched agent, it shouldn't necessarily change anything about the other one. And this is possible because Neon has a branched database.

## 整理团队记忆，让新结论先留在分支 / Curate team memory and keep new findings in a branch

[02:54:39.160—02:54:54.340](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=10479s)

后来我们发现，Agent 需要的还不止结构化数据库。它们当然需要结构化数据库，不过它们也喜欢写些东西，叫作记忆。大体上可以把这些记忆看成 Agent 的非结构化数据库。

But then we actually found that agents need more than just structured databases. Of course they need structured databases, but they also like to do this, you know, write these things called memories. And memories are, you know, at a very high level, they compile down to an unstructured database for agents.

[02:54:55.120—02:55:08.500](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=10495s)

记忆有两种生成方式。一种是整理已有上下文，以及用户以前和 Agent 的对话。另一种是 Agent 主动把内容保存到一个非结构化的地方。

There are two ways that memories get generated. The first is just by synthesizing the context and the conversations that someone's already had with them. And the second, by agents actually explicitly saving content to an unstructured place.

[02:55:09.300—02:55:25.760](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=10509s)

关键是把这些信息归并、提炼。信息进来得非常多，放着不管就会有内容过时、不同条目互相冲突的问题，这对团队影响很大。

The key thing here is that you actually want to consolidate and distill that information. There's a ton of information coming in through there. And if you just give that, you know, if you just let it kind of go on its own, you have problems of staleness, you have conflicts in the information, and all of those can be extremely damaging to teams.

[02:55:26.420—02:55:41.740](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=10526s)

所以我们做了一个类似夜间「做梦」的过程。我们用离线算力处理对话，由另一个 Agent 标出冲突，再把团队成员随手写下的笔记归并起来。

So we have this thing that basically dreams overnight. We use offline compute, and it takes the conversations. A different agent essentially highlights things that are conflicts and consolidates the ad hoc notes that were written by various members of the team.

[02:55:42.160—02:55:57.100](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=10542s)

之后团队的所有成员都可以从这个记忆库里检索。这套做法有好几种用处。Slack 里的 Agent 会用，启动一组 Agent 并行深入调查时也会用，比如调查数据平台里的疑难问题。

And then all members of the team can actually recall from that memory database. And you can use this in a bunch of different ways. We use this within our Slack agents, but we also use this when we're launching a parallel set of agents to investigate a deep issue, for example, in the data platform.

[02:55:57.840—02:56:11.940](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=10557s)

分支在这里有什么用？在很多场景里，有些 Agent 会提出新的记忆。你一开始不清楚，这条记忆能不能推广给更大一组 Agent，还是只对这个 Agent 适用。

Now, how does branching come into this? Well, some of the agents, like in many of the use cases, they propose memories. And it's not clear whether those memories generalize to the actual broader set of agents or if that's a specific thing for just that agent.

[02:56:12.560—02:56:25.220](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=10572s)

记忆库建在可分支的 Neon 数据库上，我们可以先在某个分支里提出那条记忆。分支可以继续迭代，到了某个时候，有需要再找办法并回去。

And so with the branchable database for memory, which is built on top of this NEON database, we can actually just propose that memory somewhere in there. And that branch can continue to iterate. And at some point, we can find a way to merge it back in if it's necessary.

[02:56:27.100—02:56:44.000](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=10587s)

这带来很重要的灵活性。我们发现，记忆不能完整分支时，要维护一组 Agent 的记忆很困难。特别是并行度提高以后，如果各 Agent 追求不同目标，质量可能明显下降。

be an important layer of flexibility, because without the ability to completely branch the memory, we found it was very hard to maintain the memory for a team of agents. Especially as we increase parallelism, you can actually experience significantly reduced quality if all the agents are pursuing different goals.

[02:56:45.280—02:56:59.260](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=10605s)

我喜欢把它想成有点像动态规划。你已经探索过一个分支，另一个 Agent 又恰好走上同一条路。每次都重走一遍很浪费，但有时你确实又想重看。

I like to think a little bit of it as kind of similar to dynamic programming. If you've explored a branch of exploration, and then you have a different agent that happens upon that same pathway, it's very damaging always revisit that, but sometimes you want to.

## 从写时复制到可分叉的沙箱 / From copy-on-write storage to forkable sandboxes

[02:56:59.380—02:57:19.240](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=10619s)

所以，能先提出一条记忆，对我们很重要。数据库为什么能这样分支？Neon 的做法是把计算和存储分开。Postgres 的计算跑在一处，共享历史和存储则在另一层。

And so the ability to propose a memory is extremely important to us. How is all of this kind of branchable database possible? Well, the way that Neon does is it separates compute from storage. Compute for Postgres is running in some separate place, and then we actually have the shared history and the storage in a different layer.

[02:57:19.400—02:57:34.860](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=10639s)

这样就可以用写时复制来分支。分出一份数据库后，计算实例 A 的写入可以和计算实例 B 的写入隔离。这就是我们能在那个数据库上建这些应用的底层条件。

And what that lets us do is copy and write for branching. So when we have a branched version of the database, You can actually have Compute A's rights separated from Compute B. And that's the core layer of infrastructure that allows us to build these applications on top of that database.

[02:57:36.800—02:57:53.260](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=10656s)

接下来我们发现，Agent 需要的东西远超过存储。只给存储加分支还不够。Agent 在沙箱里工作时，喜欢记笔记、写脚本，再用这些东西反复尝试解决各类问题。

But then we found, obviously, agents are far more than storage. And branching storage wasn't enough. We also found that as they were running in sandboxes, agents like to take notes on stuff and write down scripts and use those to actually iterate on various kinds of problems.

[02:57:54.820—02:58:12.640](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=10674s)

我觉得 Agent 有个让人兴奋的地方。它能把测试代码等任务中用到的能力迁移出去，用同一套机制解决范围更广的问题。但给 Agent 建分支时，得给接下来的 Agent 提供相似的上下文。

exciting things about agents that I've found, that they are able to generalize this capability that's needed maybe for testing code and things like that and solve other more broader general problems using that same construct. But then when you branch it, you actually need to give the future agent a similar context.

[02:58:12.800—02:58:34.820](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=10692s)

我们发现，如果分支 Agent 启动时拿不到原 Agent 原有的文件，效果就没那么好。比如让 Agent 帮你调查一次服务中断，它可能有笔记和计划。新的分支可能更新笔记，也可能发现新东西。但我们不希望这些修改直接写回去，因为同时在查十条不同的路线。

We found that when we started the branched agents without the same files that that agent had to begin with, it just wasn't as effective. So when you're investigating an outage, for example, with an agent. You might have notes and plans, and a future branch of that agent might update those notes. It might find new things. But we don't want that to go back because we're actually exploring ten different pathways at the same time.

[02:58:35.520—02:58:57.280](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=10715s)

所以，构建可分支的文件系统特别重要，让我们能做出所谓的可分支沙箱。可以启动一份沙箱计算资源，这本身很难，今天不展开。计算资源可以挂接存储。还有一个关键点，Agent 真的会非常频繁地用文件。

So building a branchable file system was extremely important and allowed us to build what we call a branchable sandbox. Because then what we can do is we can launch that sandbox compute, and that's a hard problem in and of itself. It's not one we're going to talk about today, but that compute can be attached to storage And critically, the agents actually really aggressively leverage files very often.

[02:58:57.500—02:59:09.060](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=10737s)

所以把所有存储都放在远端会很麻烦。我们在这里做的一项核心工作，是在本地缓存和远程缓存之间做同步。

And so it can be very painful to make all your storage fully remote. And so the really core piece of what we've been building here is a syncing process between what we call a local cache and the remote cache.

[02:59:09.960—02:59:25.300](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=10749s)

这样，当我们做到某一步想分支时，可以开出第二份沙箱，让它使用从原有工作文件状态分出的文件系统。延迟会更低，原来 Agent 的运行性能也能保持在合理范围。

And then what that allows us to do is as we're able to make progress on that, when we want to branch, we can actually branch a second sandbox, use that similar file system, and it reduces our latency while also keeping performance of the regular agent reasonable.

[02:59:27.480—02:59:40.280](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=10767s)

从整体上看，这让我们能给整个工作状态分支，也有了实现它的平台层。仅到这一步当然还不够，你还想给更多东西分支。

So what this allows us to do at a high level is branch the entire working state. And this gives us the platform layer to actually go do that. Now, this isn't obviously sufficient. You're going to want to branch even more.

[02:59:40.460—02:59:52.480](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=10780s)

如果你在某个软件之上构建应用，也会想办法把那个软件分出一份。这就是我们思考的大致方向。数据平台建立在其中一些能力上，我们在那一层也还做了更多。

If you're building on top of software, you want to find a way to branch that too. And so this is along the lines of how we're thinking. The data platform was built on top of some of these things, but there's a lot more that we've there as well.

## 并行调查与基础设施边界 / Parallel investigation and infrastructure boundaries

[02:59:53.260—03:00:05.340](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=10793s)

光是用这一层来构建 Agent，我们就已经很期待了。再离开软件开发本身谈一点，我们很多人还在花大量时间考虑安全。

But we're really excited about this layer for just even building agents. And just to kind of separate a little bit even from software development, another thing a lot of us are spending a lot of time thinking about is security.

[03:00:07.560—03:00:18.300](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=10807s)

退一步看，我觉得眼下，无论谁在卖什么产品，安全都可能是最重要的一件事。我们和别人合作时，最重要的东西大概就是信任。

I mean, just taking a step back, I think this is probably the single most important thing for any product that anyone sells at this point, because trust is kind of the most important thing that we're selling when we work with other people.

[03:00:19.380—03:00:51.640](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=10819s)

既然 Agent 会写出带漏洞的代码，很难设想有什么别的办法能跟上。可以让 Agent 来监测代码里可能出现的同类问题，考虑搭建一套专门检测代码库安全问题的 Agent 流程。我们在这上面花了很多时间。一次安全事件通常是怎样开始的？假设你怀疑有问题，或者一个 Agent 一直在监测。为什么控制平面上突然出现这样的网络流量……

And with agents being the ones who generate the vulnerabilities, it's kind of impossible to find a different solution than having agents be the ones who are monitoring for those exact vulnerabilities in your code. So you should be thinking about how you can build an agent factory that's detecting security issues in your code base. And so this is something we're spending a lot of time on. So typically what happens in a security incident? Well, let's say you suspect something, an agent might be always looking for it. Why is there this network traffic that's

[03:00:51.640—03:01:03.880](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=10851s)

……[流量变化转写不清]？可以先列出事件时间线，这显然是调查的第一步。参与过严重安全事件调查的人都知道，时间很关键。

degressing all of a sudden from my control plane. Well, I can assemble an incident timeline, and that's obviously the first step in an investigation. But anyone who's been a part of a serious security investigation knows that time is of the essence.

[03:01:04.240—03:01:19.660](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=10864s)

这非常适合并行处理。发生安全事件时，你本来就是这么做的，把大家召集上线，同时检查十种、十五种、二十种不同的猜想。真正的问题早一小时查出来，你就早一小时更安全。

It's a perfect problem for parallelism, and that's exactly what you do when a security incident happens. You bring everyone online so you can explore 10, 15, 20 different theories at once. Because an hour earlier that you can detect the real issue is an hour that you're actually more safe.

[03:01:21.640—03:01:35.040](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=10881s)

如果换成可分支的 Agent 呢？假设有两条线索。Agent 已经整理出事件时间线，这时你可以问两个问题。比如，最近的一次部署是否引入了某项新的集成？

But what if we did that with a branchable agent? Let's say there's two paths to investigate. So the agent's assembled the incident timeline. And now you can ask two questions. Hey, did a recent deployment introduce some kind of new integration?

[03:01:35.400—03:01:48.200](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=10895s)

我可以去看看代码。也可以验证完全不同的假设，是否有被攻陷的身份正在访问这些数据？关键在于，可以把发起调查的整个 Agent 分出一份。

Maybe I can go look at the code. Or I can explore a totally different theory. Is a compromised identity accessing this data? And the core thing that we are able to do here is we branch that whole original agent that was starting the investigation.

[03:01:49.840—03:02:07.380](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=10909s)

新的 Agent 可以在一份完全隔离的环境副本里工作。有条件时，甚至可以给正在调查的真实服务也分出一份。对话、记忆和存储都有了隔离副本，Agent 就可以充分调查安全风险，自己反复尝试。

And then the new one is able to work in a completely isolated copy of the world. And in some cases, when we're able to, we can even branch the actual service that we're investigating. And so when you have this isolated copy of conversation, memory, and storage, you can fully explore that security risk and let the agent loop on its own.

[03:02:07.460—03:02:23.340](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=10927s)

这就是重点。这些 Agent 的长处，在于能反复尝试、验证、提出新假设。我觉得 Andrej Karpathy 说得很好，[转写有缺漏] 它们可能比软件史上的任何人都更能坚持。

And that's kind of the key thing here. The way that these agents are good is that they're able to loop, verify, try new theories. I think Andre Karpathy said it really well. far more tenacious than any human probably in the history of software.

[03:02:23.880—03:02:35.840](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=10943s)

所以它们可以继续查下去。但我们常把自己放在审批环节，挡住了它们。我们觉得这个做法能缓解问题，减轻犯错的后果。

And so they're able to just, but we keep getting in the way by inserting ourselves as an approval layer. And so this is a solution that we think helps with that. Just take away the consequences of making a mistake a little bit.

[03:02:36.100—03:02:54.780](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=10956s)

把整个状态分支，可以用隔离来减轻操作对原环境的影响。[转写有缺漏] 这些最后说明什么？我们的判断是，基础设施需要能分支。

Branch the entire state so that you're not actually worrying about that same risk. And then we've been able to find this to actually come as well. So what does this all add up to? For us, we think that your infrastructure needs to be branchable.

[03:02:55.080—03:03:07.920](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=10975s)

这就是我们在 Neon 和 Databricks 做的事。我们很期待这种可分支的未来，因为我们认为，下一代 Agent 会以团队的形式工作，无论是在软件开发上，还是在实际打造产品的过程中。

And that's what we're building with Neon, with Databricks. And we're super excited about that branchable future, because we think that teams are going to be the next generation of agents, both for software and the way that we actually build products.
