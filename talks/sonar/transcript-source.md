# Sonar 怎样用四个反馈循环验证软件交付？

Andrew Finch

中文校译与英文机器转写

中文为校译。英文栏保留选用的机器转写，可能有听写误差。带时间戳的转写原文可在下方来源说明打开。

依据大会主回放第 11 场（03:10:05–03:24:29）的 40 段中英资料。官方议程题名为 Building a Safe Software Factory。英文沿用机器转写。自我介绍中的产品名被转写为 Guitar，官方议程同品牌的代码验证工具写作 Gitar。演讲介绍的是 Sonar 的工程思路和团队实践观察。

[英文音频转写原文（带时间戳）](transcript-original.txt)

## 从开发生命周期到软件工厂 / From the development lifecycle to a software factory

[03:10:05.940—03:10:25.000](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=11405s)

好了。大家能听见吗？好，我是 Andrew，我们应该可以开始了。不知道哪里有计时器。我叫 Andrew，很高兴今天来跟大家讲安全的软件工厂。

Okay. All right. Can you all hear me? All right. My name is Andrew, and I think we're starting now. I don't know if there's a timer anywhere. My name is Andrew, and I'm excited to talk to you today about the Safe Software Factory.

[03:10:27.280—03:10:44.620](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=11427s)

先简单介绍一下自己。我在 Sonar 做 Staff 级软件工程师，负责 Sonar 的 AI 代码审查产品，产品名转写作「Guitar」。之前我在 Uber 做司机的行程体验和导航。

But first, a little bit about me. I am a staff software engineer at Sonar. I work on Guitar, which is Sonar's AI code review product. And previously, I was at Uber working on the driver trip experience and navigation.

[03:10:45.580—03:11:07.220](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=11445s)

之后我在一家叫 Forward 的健康科技创业公司待过一阵，做的是一套使用 AI 的初级医疗系统。好，回到软件工厂。这大概是我们行业现在最热门的词。

And then after that, I was at a health tech startup called Forward for a little while, building a sort of an AI-enabled primary health care system. Okay, so the software factory. This is like the hottest buzzword in our industry right now.

[03:11:07.800—03:11:30.120](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=11467s)

大家都在谈软件工厂，都想建一座。问题是……哦，先说说它是什么。在座大多数人可能已经知道了，不熟悉的朋友可以听我快速过一遍。

Everyone's talking about software factories. Everyone's trying to build a software factory. And the question is, well, oh, so first of all, Most of you probably know what this is already. But if you don't, I'll just give a really quick overview.

[03:11:31.380—03:11:51.180](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=11491s)

这是 AI 时代之前的软件开发生命周期，主要就是这样一个循环。输入大多是产品规格、功能请求、工单之类的东西。我们把它们带到规划阶段，复杂的任务尤其如此。

This is sort of the main software development lifecycle loop as it existed before the AI era. So we have inputs, basically product specs, feature requests, tickets, things like that. We take those into the planning step, especially if they're complicated.

[03:11:52.420—03:12:09.920](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=11512s)

接下来就开始做，写代码，提 PR。PR 经过代码审查和 CI，最后合并，然后部署到生产环境。

And then we build, then we write the code. And then we put up a PR, and that PR gets reviewed, and it goes through CI, and then it eventually merges. And then we deploy that to production.

[03:12:10.780—03:12:27.220](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=11530s)

用户接着使用软件，给反馈，也可能发现缺陷。监控也可能发出告警。这些又会作为新的输入回到流程里，然后循环继续。

And then users interact with our software, and they give us feedback or they find bugs. Or we might also get some monitoring and alerts as well. And then those go back in as more inputs. And the cycle continues.

[03:12:27.900—03:12:51.200](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=11547s)

到了 AI 和 Agent 编码的时代，自动化跟着一个个瓶颈走。以前瓶颈在写代码、做实现。现在有了编程 Agent，这部分实现了自动化，瓶颈就逐渐移到了审查阶段。

And so in the era of agentic coding and AI, automation has followed every bottleneck. So the bottleneck used to be the coding part, the building. Now with coding agents, that's been automated. And now the bottleneck has sort of shifted over to that review step.

[03:12:51.480—03:13:18.160](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=11571s)

我们开始用 AI 来审代码。其实现在几乎每一步都能看到 AI 和自动化，包括监控部署、控制发布、分诊工单和事件、做计划。

And we're starting to introduce AI code review systems for that. And we're seeing AI systems and automation happen really at every step of this now. So we're starting to see AI systems for monitoring deployments, controlling rollouts, triaging, triaging, you know, tickets and incidents, planning.

[03:13:18.500—03:13:50.980](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=11598s)

这就是大家正在打造的软件工厂。现在大家都在问，怎样才能让它安全？换句话说，要加哪些层次的验证，才能相信产出的软件按预期工作，没有缺陷和安全漏洞？

And so this here is the sort of software factory that we're creating. And so the question that we all have now is, how do we make this factory safe, right? In other words, how can we introduce enough layers of verification into this so that we can trust that the software coming out of it is, it works as expected, it's free of bugs, free of security, vulnerabilities.

[03:13:54.240—03:14:14.260](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=11634s)

我们的 CEO Tarek 最近说过，代码已经很多了，让人放心的依据还不够。我今天想聊的，就是 Sonar 怎样考虑在软件工厂的各个环节建立这种把握。

Our CEO, Tarek, said recently, code is abundant, confidence is not. So what I'm going to talk about today is just how we at Sonar have been thinking about how to introduce confidence at all different points within this software factory.

## 用四个反馈循环补充验证 / Four feedback loops for defense in depth

[03:14:18.040—03:14:36.120](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=11658s)

我们用纵深防御来处理这个问题，具体做法是加入更多反馈循环，大家可能也猜到了。今天主要谈其中四个。第一个是 PR 检查循环。

And we're approaching this challenge with a defense in depth approach that comes from adding more loops you might not be surprised to hear. And I'm going to talk about four of them today in particular. So there's the loop one, which is the PR checks loop.

[03:14:38.660—03:15:00.920](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=11678s)

第二个是部署后验证，第三个是维护，第四个是知识。最后这个有点特别。先来看第一个，也就是 PR 检查循环。

loop two, which is the post deploy verifications loop, loop three, which is the maintenance loop, and loop four, which is the knowledge loop. And this is kind of a special loop. So first I'm going to talk about loop one, the PR checks loop.

## PR 检查与合并门禁 / PR checks and merge gates

[03:15:01.020—03:15:11.660](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=11701s)

我们大概都已经有某种形式的 PR 检查。提交一个 PR，它会经过一些 CI 检查和代码审查。现在可能还会有 AI 代码审查。

So this is the loop that we probably all have in some form. You put up a PR, it goes through some CI checks, it gets a code review. Nowadays, it's probably getting an AI code review as well.

[03:15:12.640—03:15:28.540](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=11712s)

这里也开始引入更多自动化。比如，有些 Agent 会推送修复来回应代码审查意见。这一轮接着一轮，直到 PR 的检查状态变绿。

But we're starting to see a lot more automation being introduced here as well. So we're starting to see agents pushing fixes to respond to the code review comments. And this loop kind of goes around and around until the PR turns green.

[03:15:34.380—03:15:54.080](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=11734s)

其实这里还能做很多事，因为在这一阶段发现问题，成本比代码合并之后再发现低。可以借这个机会，把审查范围扩展到大多数团队现有的测试和代码审查之外。

And there's actually a lot more that we can be doing here because catching a problem at this point is still cheaper than after it merges into the code base. So we have a real opportunity here to widen this review past the sort of normal tests and code review that most of us do.

[03:15:54.980—03:16:12.280](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=11754s)

AI 代码审查当然可以做。也可以做静态分析，很多团队已经在做。还可以做功能验证，看看工单要求了什么，再确认 PR 有没有确实完成这些要求。

So, of course, we have AI code review. We can also do static analysis here. Many of us do that. We could do what's called functional validation. So this is where we can look at what the ticket asks for and see if the PR actually addresses those things.

[03:16:16.080—03:16:40.280](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=11776s)

可以检查 PR 是否遵循团队设定的代码约定、最佳实践等规则。也可以查公司的文档，以及以往审查或故障中学到的知识。

We can look at rules that the team may set for coding conventions, best practices, things like that, see if the PR is adhering to those. We can look at knowledge. from company documentation, from things that have been learned on past code reviews or past outages.

[03:16:42.960—03:17:07.160](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=11802s)

还可以做跨仓库检查，去看这个 PR 会不会破坏另一个仓库里的功能。也可以做跨 PR 分析，看看这个 PR 会不会与其他尚未关闭的 PR 发生冲突。

We could do cross-repo checks. So we could actually look at other repositories and see if anything in this PR will break or cause something to break in another repository. We could do cross-PR analysis. So we can look at all the other open PRs as well in this PR that conflicts with one of those.

[03:17:09.660—03:17:25.180](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=11829s)

可以做安全审查，检查漏洞、密钥和依赖。也可以跑端到端测试。例如，如果是 Web 应用，可以在浏览器里打开、实际点一点，看看是不是按预期工作。

We could do security review, check for vulnerabilities, secrets, dependencies. We could do end-to-end testing. So, for example, if this is a web app, we could open up in a browser and click around and see if it works as expected.

[03:17:28.300—03:17:45.040](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=11848s)

最后可以做风险评估。估计这次改动出错时影响会扩散到多大范围，再分成低、中、高风险。它可以帮我们判断，这个 PR 是否需要人来审。

And finally, we could do risk assessment. So we can sort of look at this and compute the blast radius and sort of categorize this into low, medium, or high risk. And that can actually help us determine if this is a PR that a human even needs to look at at all.

[03:17:47.380—03:17:59.580](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=11867s)

所有这些结果都可以汇入合并门禁，用来决定这个 PR 能不能合并。当然，每次推送修复后，这些检查又会跑一遍……

And so all of these things can flow into this sort of decision, this merge gate, this decision of whether this PR is mergeable. And of course, every time a fix is pushed, all of these run again.

[03:18:00.440—03:18:23.540](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=11880s)

……至少要重新跑一部分。做合并决定时，测试已经运行或者已经通过只是其中一项。还要看证据，比如审查实际发现了什么，质量门禁的结果，有没有安全漏洞，风险等级是多少。

at least in some degree. And with all of this, it's important to gate that merge decision not just on the fact that a test ran or that it passed, but on the evidence. So that would be things like the actual code review findings, the results of the quality gates, any vulnerabilities, the risk level.

[03:18:23.720—03:18:42.380](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=11903s)

这些都可以交给合并门禁。团队自己设定什么样的 PR 可以合并。证据也记录在 PR 上，合并决定就更有依据。

So all of that can be basically fed into this merge gate that the team can set for what is a mergeable PR. And when you record that evidence to the PR, it just makes the merge gate much stronger.

[03:18:44.500—03:19:19.700](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=11924s)

我们看到，做得好的团队可以逐渐把更多 PR 审查工作交给这种自动化。除了自动阻止不合格的合并，他们也开始在某些情况下自动批准低风险变更，甚至自动合并已批准的特定类型低风险 PR。这能给人工审查腾出很多时间，把精力花在风险较高的改动上。

And so what we're seeing now with teams who do this well is that they can actually delegate more and more trusts to this type of automation on the PR review. So we're seeing teams begin to turn on not just automatic merge blocking, but even auto-approve in some cases for low-risk changes, and even auto-merge for certain types of PRs that are low-risk and approved. And this can just free up a lot of review bandwidth for human reviewers to review the more high risk changes.

## 部署后验证和发布决策 / Post-deployment verification and rollout decisions

[03:19:22.340—03:19:36.760](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=11962s)

接下来是第二个循环，部署后验证。我觉得目前还在很早期，大家都在试各种办法。

OK, so now I'm going to talk about loop two, which is our post deploy verification loop. So this is, I would say, very much in its early stages right now. People are experimenting with all kinds of things here.

[03:19:37.960—03:19:53.840](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=11977s)

基本做法是，代码部署以后，搭建 AI 系统去查看生产日志、追踪和指标，确认代码在生产环境里是否真的按预期工作。

But the idea is that once your code is deployed, you can build AI systems to check, to read production logs, traces, metrics, and see if your code is actually behaving as you expect it to in production.

[03:19:55.200—03:20:12.260](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=11995s)

在此基础上，我们开始看到用 Agent 管理发布的做法，由 Agent 决定是否扩大投放范围、回滚或关闭功能开关。也可以用 AI 监测生产故障。

And then from there, you can actually, we're starting to see. things like agentic rollout, where agents can decide whether to widen a rollout or roll back, turn the feature flag off. And you can also do AI outage monitoring.

[03:20:12.260—03:20:38.540](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=12012s)

可以监控告警，让 AI 帮忙找故障根因并修复。接着是第三个循环，我叫它维护循环。它与主要的软件开发生命周期并行运行。

So you can monitor alerts and use AI systems to help you root cause and fix outages. OK. So moving on to loop three. So this is what I call the maintenance loop. This is kind of a parallel loop that runs alongside your main software development lifecycle loop.

## 持续维护和周期扫描 / Continuous maintenance and periodic scanning

[03:20:39.020—03:20:50.840](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=12039s)

这里会按一定周期持续扫描代码库，做很多跟 PR 阶段一样的检查，比如代码审查、静态分析和安全检查。

And this is where we continuously scan the code base on some schedule. And we check for a lot of the same things that we check for on the PR. We could do code review, static analysis, security checks, et cetera.

[03:20:51.480—03:21:12.140](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=12051s)

发现问题就开一个修复 PR。这样能找到原先在 PR 里发现不了的东西。比如代码合并以后，团队才引入一条新规则，或者有一个新漏洞刚公布。

And then if we find an issue, we can open up a remediation PR to address that. And this lets us catch things that we couldn't catch in the PR. So, for example, you could imagine maybe a new rule was introduced after code merged or a new vulnerability was published after code merged.

[03:21:14.460—03:21:36.840](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=12074s)

也可能是慢慢发生的变化，比如重复和复杂度一点点积累，单看一个 PR 看不出来。持续扫描代码库可以找出这类问题。最后来看知识循环。

Or even something like slow drift where you slowly get duplication or complexity building up that you can't really see on a single PR. You can catch these kinds of things here. with the continuous code-based scans. Okay, and so finally we move over to the knowledge loop.

## 知识如何回流，以及人负责什么 / How knowledge feeds back and where people contribute

[03:21:37.020—03:21:58.960](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=12097s)

我们看到，这个循环对很多公司变得非常重要。每家公司都有大量知识，比如文档、产品规格和业务决策。Agent 拿到这些知识，工作会做得更好。

And this is becoming, we're seeing this become a very important loop for a lot of companies. Every company has a lot of knowledge. Documentation, product specs, business decisions. and the agents do a better job if they have that knowledge.

[03:22:00.580—03:22:22.200](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=12120s)

这条循环会从不同来源收集知识，也会把过去做代码审查或处理故障时学到的内容收进来。筛选整理之后，再把知识给其他循环和其中的 Agent 使用，让它们做得更好。

So this loop basically collects all that knowledge from different sources, as well as things that were learned on prior code reviews and from prior outages. It's curated, and then it can be fed into all of the other loops, all of these other agents, so they can do a better job.

[03:22:25.320—03:22:42.580](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=12145s)

例如，这对编程 Agent 很有帮助。掌握了这些知识，它第一次就可能做得更好，留下的问题更少，到了审查阶段也就少跑几轮。

And for example, this is really powerful with your coding agents, because if they have some of this knowledge, they can probably do a better job the first time, fewer issues, and then you'll wind up with basically fewer review laps at the review stage.

[03:22:47.420—03:23:02.720](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=12167s)

那么在这样的工厂里，我们这些人类软件工程师负责什么？你也许会问，要是把这些全做好，是不是就能关掉灯，开一间无人值守的工厂？

OK, so what does this mean for our role as human software engineers in this factory? You might be asking, OK, so if we nail all of this, can we just turn the lights out and run a dark factory?

[03:23:04.160—03:23:43.980](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=12184s)

我觉得目前大概还做不到。我喜欢说，工厂可以把灯调暗，还是得留灯。在特别需要专业判断的地方，人要介入。例如审计有风险的代码，核验拿到的证据，确认软件确实按预期工作，处理回滚和事故等例外，还要做审查和架构工作。我认为 Agent 目前在架构上还没那么擅长。

And I would say probably not, not right now. I like to say the factory runs dim, not dark. important for us to intervene in places where our expertise is really important. So that would be things like auditing risky code, verifying that evidence, verifying things are actually working as expected, handling exceptions like rollbacks and incidents, reviewing Doing architecture, agents are not very good at this yet, I would argue.

[03:23:46.560—03:24:05.000](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=12226s)

人还要解释背后的原因，或者帮助整理这些循环和 Agent 所需的知识。比如产品意图、做过的取舍、业务决策。还有，软件工厂本身当然也要由我们来做工程。

And supplying the why, or helping to build that knowledge that powers all these agents and all these loops. Supplying the product intent, the trade-offs, the business decisions, things like that. And of course, we engineer the factory ourselves, right?

[03:24:05.000—03:24:25.420](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=12245s)

我们现在已经走到一个阶段，开始把软件工厂当作一个整体来建设。希望今天给大家提供了一套思路，让你能建起自己的软件工厂，也能把它建得更安全。

we've sort of moved into this era where we're building the software factory as a whole. So with that, I hope that gave you sort of a framework for how to think about not just how to build your software factory, but how to build a safe software factory.

[03:24:26.280—03:24:28.820](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=12266s)

谢谢，我就讲到这里。

So thank you. That's all for me.
