# Meta 怎样让 AI 成为轮值队友？

Chinmay Gandhi、Swaapnika Motapothula、Vlad Tsvang

中文校译与英文机器转写

中文为校译。英文栏保留选用的机器转写，可能有听写误差。带时间戳的转写原文可在下方来源说明打开。

依据 AI Engineer Code Summit 主回放第 08 场（01:58:35–02:14:13）的 40 段中英资料。英文来自机器转写，中文沿用校译，保留已知缺漏。告警示例和队列数字出自讲者演示，讲者把实际节省时间的严格测量列为后续工作。

[英文音频转写原文（带时间戳）](transcript-original.txt)

## 从写代码到运维生产系统 / From writing code to operating production

[01:58:35.580—01:58:50.160](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=7115s)

大家好，我是 Chinmay，今天和我一起分享的还有 Swaapnika 和 Vlad。我们很高兴跟大家聊聊，我们是怎样在 Meta 做出一位 AI 值班队友的，也想分享过程中学到的东西。现在它每天二十四小时参与实际的值班轮换。

Hi, I'm Chinmay, and with me are Swapnika and Vlad. We're excited to share our journey, as well as our learnings, around building an AI on-call teammate at Meta that now runs real on-call rotations every day and around the clock.

[01:58:51.720—01:59:09.340](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=7131s)

我们所在的工程团队负责打造 Meta 的事件响应、值班体验和故障缓解所需的工具、平台与基础设施。AI 能力提高之后，这个领域变化很快。AI 改变了我们写代码的速度。

We are part of the engineering team that builds the tooling, platform, and infrastructure for incident response, on-call experience, and mitigations at Meta. That space is evolving rapidly with the increase in AI capabilities. AI changed how fast we write code.

[01:59:09.840—01:59:27.520](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=7149s)

现在大约四分之三的新代码有 AI 参与编写。每天都有越来越多的 AI 生成变更进入生产环境，其中一部分和其他代码变更一样，也可能引起生产故障。值班处理的速度没有一起提高。

About three quarters of new code is now written with AI. And more AI-generated changes reach production every single day. And some of it can cause production failures, just like any other code change can. But on-call did not speed up with it.

[01:59:27.520—01:59:44.620](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=7167s)

高质量代码也可能通过审查，到了生产环境还是会出故障。真出事了，凌晨两点仍然有人会收到呼叫。瓶颈已经从编写代码转到生产运维，而这些运维负担最后都落在值班上。

High quality code can pass review and still break in production. And when it does, someone still gets paged at 2 a.m. The bottleneck moved from writing code to operating it in production. And on-call is where that operational load lands.

## 一次告警怎样变成一份调查材料 / How an alert becomes an investigation packet

[01:59:44.880—02:00:22.000](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=7184s)

所以我们问，如果 AI 在写代码，它能帮忙运维吗？我们认为可以。用一个简单的例子快速过一下。凌晨两点，同时响了 12 个告警，同样的情况可以有两种处理方式。左边是现在大多数人的做法，你会看到，我们其实已经有很好用的 AI 了。首先，你自己给告警排序。结账、支付、磁盘，先挑哪一个？假设你先挑结账，然后问你的……

So we asked, if AI is writing the code, can AI also help operate it? And we think it can. Now let's quickly run through one of those on-call pages with a simple example it's 2 a.m. and 12 alerts are firing same night it can go two different ways on the left is how most of us do this today and notice we already have good AI first you sort the alerts by yourself check out payments disk which one to pick first let's say you pick checkout then you ask your

[02:00:22.000—02:01:01.840](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=7222s)

……助手，为什么 P99 延迟这么高？它很有用，会把指标拉出来。[转写有缺漏] 你一问，它就查看有什么变更、检查运行手册，找出超时配置被调低了，再依据手册提出回滚建议。这些确实都能帮上忙。不过看一下整个过程，它一直等你提问。下一步做什么，每一次都是你来选。问题之间得靠你串起来，答完它又停了。到了 2:39……

assistant why p99 late and say is hi it's genuinely useful it pulls the metrics and 49 and when you ask it reads what changed and checks the runbook it figured out that the time config was changed to a lower value and based on the runbook it suggests to roll back which is all very helpful however if you look at the shape of it it waited to be asked you picked every next step you were the glue between the questions and once it answered it went dormant at 239

[02:01:02.540—02:01:27.060](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=7262s)

……你知道原因了，回滚、改动和后续跟进还是得你处理。再看右边，还是那 12 个告警，AI 队友在你醒之前就开始了。它已排好优先级，把支付归到同一个根因下，其余十条各自处理。

you know the cause but the rollback the changes and the follow-ups are still yours now on the right the same 12 alerts but an ai teammate started before you woke up it had already ranked them payments merged in as the same cause and the other 10 handled separately.

[02:01:27.980—02:01:46.680](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=7287s)

它看了监控面板，对比同一次凌晨 1:49 的配置变更，并找到两起类似的历史事件。你收到一条假设、一个 30 秒就能验证的方法，以及等你审查的修复。到 2:01，你验证完就能回去睡觉。

It read the dashboards, diffed the same 149 AM config change and matched two past incidents. You get a hypothesis, a 30 second way to verify it, and a fix waiting for your review. At 201, you verified it and you're back to sleep.

[02:01:47.480—02:02:21.500](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=7307s)

这就是今天要讲的差别。为什么原来要靠你来把线索串起来？每个团队都在给值班流程加自动化，却是一个环节一个环节地加。告警有脚本、工单有分诊机器人、部署有部署机器人、事故有修复 Agent。各自解决自己的那部分，各自留着上下文，随后又忘掉。再回放那条凌晨两点的告警，告警脚本看到了大约两秒的 P99 延迟。

That gap is what this talk is about. out. So why were you the glue? Every team was bolting automation onto on call, one silo at a time. An alert script for alerts, a triage bot for tickets, a deploy bot for deploys, a fixit agent for incidents. Each one solves its slice, keeps its own context and forgets Now replaying your 2 AM page, the alert script saw P99 latency about two seconds.

[02:02:22.140—02:03:04.160](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=7342s)

分诊机器人看到了三张说结账慢的工单。部署机器人知道 1:49 改过配置，事故历史里还记着两起类似事故。线索全在，却没有东西能把它们连在一起。所以才得由值班人员串联，就像上一页左边那样。我们的方案是，每组轮值安排一位 AI 队友，用同一个循环处理各种信号，用同一份团队记忆从每个班次学习，并给它独立的身份和人工审批关口，让人负责批准。

The triage bot saw three tickets saying checkout is slow. The deploy bot knew about a config change at 149, and the incident history had two similar past incidents. Every clue existed, but nothing connected them. so the on call became the glue exactly as we saw on the left side of the previous slide our bet was one ai teammate per rotation instead one loop across every signal one team memory that learns every shift its own identity so it acts as itself and a human gate so you approve instead of operate.

[02:03:04.760—02:03:26.480](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=7384s)

不过，把所有上下文和这么多可操作范围交给一个 Agent，风险也更大，所以自主权得靠表现取得。内部实现上，这位 AI 队友就是最简单的 Agent。模型循环调用工具，对环境采取行动，再读取反馈。

But giving one agent all that context and reach raises the stakes, which is why autonomy has to be earned. Under the hood, the teammate or the AI teammate is the simplest agent there is. Model using tools in the loop, acting on an environment, and reading the feedback.

[02:03:27.300—02:03:41.000](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=7407s)

这场演讲的其他内容，都是围绕这个循环构建的，目的是让它可以安全地持续运行。接下来交给 Swaapnika 和 Vlad，他们会讲具体做法。

Everything else in this talk is what we build around that loop to make it safe to leave it running. And for that, I will hand over to Swapnika and Vlad next to get into the actual details of how it works.

## 三档自主权和放权条件 / Three levels of autonomy and when they apply

[02:03:42.700—02:04:02.100](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=7422s)

我们先设计了一个自主权阶梯。想想你会怎样让新工程师开始值班。先跟班，可以调查、给建议，但不能碰生产。之后结对，自己写修复，由另一位工程师批准，逐步熟悉情况。

To achieve this, we started with an autonomy ladder. Think about how you onboard a new engineer to Oncall. First, the shadow. They investigate and suggest, but they don't touch production. pair. They write the fix and another engineer approves it with time they gain knowledge.

[02:04:02.580—02:04:24.920](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=7442s)

我们给 Agent 用的是同一套阶梯。第一级，它调查并告诉你发现了什么，什么也不改。第二级，它经批准后采取行动。它可以起草修复，只有人批准后才能进入生产。第三级，它独立处理关键程度较低的事项，只在重要事情上打扰你。

We give our agent exactly the same ladder. At level 1, it investigates and tells you what it found. It changes nothing. At level 2, it acts with approval. It drafts the fix but nothing reaches production until a human approves. At level 3, it clears lower criticality work on its own and only interrupts you for what matters.

[02:04:25.340—02:04:44.420](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=7465s)

高关键性的工作仍交给人。怎样才能升到下一级？我们看两件事。出错的代价有多大，错误有多容易发现？只有在出错代价低、测试、CI 或审查能发现错误的情况下，才可以给某项操作更多自主权。

High criticality work stays with humans. So what earns the next run? We use a simple test. How costly is a mistake and how easy is it to catch? So an action climbs only when mistakes are cheap, they are caught by test, CI, or review.

[02:04:44.700—02:05:03.120](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=7484s)

Agent 还得在这项操作上已经有实际表现记录。所以它能自己关闭一条噪声告警，生产故障缓解仍要等人批准。第一级的调查分层进行，找到第一个有把握的答案就会停。

And the agent already has a track record on that exact action. That's why the agent can close a noisy alert on its own while a production mitigation still waits for a human. At level 1, the investigation is layered and stops at the first confident answer.

[02:05:03.520—02:05:18.640](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=7503s)

Agent 用团队记忆和运行手册调查问题，也会分享根因分析。真正应用修复还得靠人。第二级，它会写出修复，同时给出根因和测试计划。

The agent investigated the issue using the team's memory and runbook. It also shared the root cause analysis, but human had to apply the fix. At level 2, it writes the fix with the root cause and a test plan.

[02:05:18.920—02:05:38.520](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=7518s)

它回复审查意见、修复 CI 失败。依然要有人批准，才能部署到生产。大多数草稿最后没有落地，这没关系，审查本来就是用来筛选的。这两级里，Agent 做了功课，但每一份作业还是得由你来批。

It answers reviewers' comments and fixes CI. But nothing reaches prediction until a human approves. Most drafts don't land, and that's fine. Review is the filter. At both levels, the agent does the homework, but you still had to grade every single paper.

[02:05:38.520—02:06:04.740](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=7538s)

它帮得更多了，可需要人参与的事项数量没减少。到了第三级，堆在你面前的事项才会变少。看这个使用合成数据的交班示意，一共进来 23 件事，只剩 3 件需要你。右边是 Agent 处理掉的零散事项，像噪声告警、重复事项，还有经过常规审查和 CI 的例行修复。

The help got much better, but the tasks requiring human input didn't get smaller. Level 3 shrinks the pile. Look at this example. 23 items came in, but only 3 need you. On the right, the agent handled the long tail, noisy alerts, duplicates, routine fixes that went through normal review and CI.

[02:06:05.300—02:06:37.500](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=7565s)

还有两件正在处理。[转写有缺漏] 中间是短了不少的待决策队列。每一项都写清楚它需要你做什么，还有一个执行按钮。还记得凌晨两点的结账告警吗？那件事仍归人负责。Agent 把调查结果带过来，关键决定由人做。这又回到了新员工的成长过程。平常的事可以放心交给它，需要帮忙时，它已经做了功课。

Two more are still being worked. to drive each one to completion. In the middle is your much smaller decision queue. Each item makes clear what it needs from you with a run this button that has a call to action. And remember our 2am checkout page? That still stays human owned. The agent brings the investigation, the human owns the critical decision. It's the new hire ladder again. Trusted to handle routine work, ready with the homework when it needs help.

## 工作台、值班摘要和持续运行 / The workboard, shift digests, and continuous operation

[02:06:37.840—02:06:56.640](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=7597s)

你每件事要做的工作少了，等你处理的事项也少了。工作都在那张看板上，但没人会一直盯着看板。聊天工具和事件处理界面里也都能用这个 Agent。

Not just less work per item, but fewer items waiting on you. That board is where the work lives, but nobody stares at a board all the time, right? So the agent is also available across many surfaces like chat and native incident surfaces.

[02:06:57.280—02:07:13.780](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=7617s)

每天早上九点，它发一份摘要。图中合成数据示例收到 23 件，3 件需要你，18 件已处理。每一件需要你的事都带着可以一键完成的下一步。比如批准提高额度，在手机上点一下就行。

At 9 every morning, it posts a digest. 23 came in, 3 need you, 18 handled. Each thing that needs you come with a one-click next step. So, approving the quota bump takes one tap from your phone.

[02:07:14.260—02:07:31.780](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=7634s)

合成数据示例中，已经处理的 18 件只做概述，无需逐项列出。另两件还没做完，它会告诉你目前在做什么。想追问，在消息线程里回复就好。看右边，你打开结账故障，然后问它证据在哪里。

The 18 it handled are summarized, not listed. And the two that are still in progress tell you what it's doing about them. And when you want to dig in, you just reply in the thread. As you see on the right, here you open the checkout incident and ask for the evidence.

[02:07:32.080—02:07:52.520](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=7652s)

证据它已经准备好了。配置推送缩短了支付客户端的超时时间，两分钟后出了问题，和之前两起事故一样。你接着问，是否只影响欧盟？它会分开说明。它起草回滚，你当场批准，错误指标就开始恢复。

It already has it. 2 minutes after a config push cut the payment client timeout. The same pattern as two past incidents. You ask a follow-up, is it only EU? And it answers with a breakdown. It drafts the role back, you approve it right there, and errors start recovering.

[02:07:52.920—02:08:10.560](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=7672s)

你没打开过监控面板，也没重新解释背景，因为它已经有这些上下文了。像每天早上跟你交班、你有问题随时能问的同事。在这位 AI 队友背后，是一套 AI 自动化。

You never opened a dashboard and you never had to explain the context, because it was already there. That's what a teammate feels like. A morning handoff, a colleague you can ask. Now, under the hood of this AI teammate is AI automations.

[02:08:11.340—02:08:31.480](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=7691s)

第一部分负责调查。每来一个信号，Auto-Triage 都会给它分类，检查关键程度，再启动合适的 Agent。告警交给事件调查 Agent，任务交给团队自己的 Agent，测试失败交给编程 Agent，需要查资料就检索记忆和代码。

The first, Investigates. On every new signal, Auto-Triage classifies it, checks its criticality, and kicks off the right agent. An alert goes to the incident investigator, a task to the team's own agent, a test failure to a coding agent, a lookup to memory and code search.

[02:08:32.260—02:08:49.000](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=7712s)

第二部分维持系统正常运行。无人值守的自动化会在没人察觉时出错。所以系统定期找卡住或失败的运行，重试并修复坏掉的调度。只有自己处理不了，才会呼叫人。

The second keeps the system healthy. Unattended automation fails quietly. So on a schedule, it looks for stuck or failed runs, retrace and repairs broken schedules, and it only peaches a human if it can't fix it itself.

[02:08:50.480—02:09:05.200](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=7730s)

这样工作就不会无声无息地卡在那里。第三部分负责交班。每次换班和每天早上九点，它总结这班的情况，哪些事需要你，修复方案已准备好，哪些它已自行处理。然后把摘要发到团队聊天里。

Nothing stalls silently. The third hands off. At every shift change and every morning at 9, it summarizes the shift. what needs you with the fix ready and what it handled on its own, posted to the team chat.

[02:09:05.500—02:09:19.600](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=7745s)

除了早上的摘要，凡是需要人关注的紧急事项，都会在聊天里发通知，附上调查发现和修复草稿。交班时，它还会在聊天里点名下一位值班员。整个循环继续运行。

Not only in the morning, but every urgent issue that needs user attention gets notified in chat with findings and draft fixes. It also tags the next on call in the chat during handoff. The entire cycle still continues.

## 团队共享的工具、身份和记忆 / Shared team tools, identity, and memory

[02:09:22.760—02:09:41.060](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=7762s)

因为它属于团队，所以它会使用团队已经信任的 Agent 和 Skills，也就是图中间的位置。团队可以带自己的 Agent，添加自己的 Skills。如果已有掌握团队运行手册和知识库的 Agent，自动化就会调用它。

And because it belongs to the team, it runs the agents and the skills the team already trusts. That's the slot in the middle. Bring your own agent, add your own skills. If a team already has an agent that has the team's runbooks and the knowledge base, the automations leverage it.

[02:09:41.700—02:10:03.300](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=7781s)

此外，还有我们自己的事件调查 Agent，以及能深入处理代码问题的会话。告警、工单、事故、团队发帖和聊天都可以带来任务。这个 Agent 本身是通用的。让它适合某组轮值的，是团队的 Agent、Skills、记忆和操作手册。

Alongside that, it has our own incident investigator and a deep dive coding session. Work comes in from alerts, tickets, incidents, team posts and chat. The agent itself is generic. What makes it good at an on-call rotation is the team's agents, skills, memory, and playbook.

[02:10:03.700—02:10:24.120](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=7803s)

每次运行都留有记录，团队里的任何人都能查看执行轨迹，或者接着聊。现在我把话筒交给队友 Vlad，来讲这个共享 Agent。值班 Agent 不能只属于某个人，因为值班工作本身就不属于某个人。

And every run is logged so anyone on the team can inspect the trajectory or resume the conversation. Now, I'm handing off to my teammate Vlad to talk more on the shared agent. An on-call agent can't belong to just a single person because the on-call itself doesn't.

[02:10:24.580—02:10:43.140](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=7824s)

所以它归团队。每组轮值有一位 AI 队友，共用一块看板。不论谁在当班，都可以问它、纠正它，或在调查进行到一半时接手。它把团队的值班经验、手册和以往决定从一班带到下一班，就像一次交接本该做的那样。[手册细节转写不清]

So it belongs to the team. There is one teammate per rotation on one board. Whoever's on call can ask it, correct it, or pick up its word mid-investigation. It carries the team's on-call expertise, the playbook of lower profiles and past decisions from one shift to the next one the way a good handoff should.

[02:10:44.180—02:11:09.540](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=7844s)

比如周一凌晨两点，Sam 当班，告诉它，记住，如果推送配置之后结账超时，先回滚配置。这件事被记下来。三天后 Jordan 当班，遇到完全一样的告警，只要问怎么修。Agent 给出相同的修复，说明依据来自哪里，还拟好了回滚。

Here's what that looks like. Monday at 2 am, Sam is on call and tells it, remember, if checkout times out after a config push, roll back the config first. memory. Three days later, Jordan is on call, hits the exact same alert, and just asks for a fix. The agent answers with same fix, says where it came from, and has the rollback drafted.

[02:11:10.100—02:11:54.840](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=7870s)

教一遍，下一班就能用到。它用团队授权给它的访问权限。它有自己的身份，归轮值团队所有，只拿团队愿意给的权限。交班记录、决定和纠正都会进入记忆。这样，第 30 班会比第 1 班更好，就像新值班员每周都会熟练一点。记忆会随时间失效，所以每条记忆都得证明值得保留。系统按语义检索并使用它找到的内容，记录哪些确实帮上了忙，再自动提升有用条目，淘汰失效条目。有人说刚才做错了，这条纠正……

Teach it once, the next on call gets it. And it accesses the team. Its own identity, owned by the rotation, with only the access the team is comfortable granting it. And it learns handoffs, decisions, and corrections all flow into memory, so shift number 30 is better than the shift number one, the same way a new on-call gets better every week. But memory erodes over time, so ours has to earn its place. It retrieves semantically, uses what it finds, scores where it actually helped, and promotes or retires entries automatically. When someone says that was wrong, the item

[02:11:56.320—02:12:16.400](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=7916s)

……也会进入记忆。三件事让这套办法能走出我们自己的团队。第一，循环一直在接收新信息。每条反馈或纠正都会重新打开对应事项，最后进入记忆。系统会处理反馈，用它来继续工作，避免堆到每季度才翻一次。

becomes memory. Three things made this work be on our team. First, a loop that never stops listening. Every piece of feedback or course correction reopens the item and ultimately gets absorbed into memory. Feedback is an input to the system, not a sorry read once a quarter.

[02:12:17.260—02:13:03.840](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=7937s)

第二，团队可以自定义，不用各自维护分支。把自己的手册和 Skill 工作流接到底层就行。第三，每组轮值从头到尾都有自己的设置。身份、配置和记忆都按团队划分，所以加一组轮值只需要配置一下。Agent 可以通用，值班知识归各自的团队。值班人员的工作有什么变化？首先，从主导深入调查转为做关键决定。他们一开始就拿到一个假设，不用面对空白任务或面板。其次，工作负担正在变轻。值班负担减轻的初步迹象……

Second, customize instead of forking. Teams bring their own playbooks and skill workflows. underneath. Third, what we call one rotation to end. Identity, config, and memory are per team, so added rotation becomes a setup, not a new project. The agent is generic, while the expertise is owned by the team. So what has changed for the people on call? Well, first, their job shifted from driving deep investigations to making key decisions. They start from a hypothesis with not a blank task or dashboard. Second, the load is getting lighter. Early signs of on-call load

## 现有约束和下一步的测量 / Current controls and what to measure next

[02:13:03.840—02:13:23.080](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=7983s)

……在采用自主处理的团队中看起来不错。我们想先做严格的测量，再报具体数字。第三，Agent 写出的每个改动还是会经过人。修复只能走正常审查和持续集成流程才能落地，而且大部分草稿都不会落地。

reduction are promising for teams that run it autonomously, and we want to measure it rigorously before we put a number on it. And the third, every change that agent writes still meets a human. Fixes land only through normal review and continuous integration. And most drafts don't land.

[02:13:23.740—02:13:52.740](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=8003s)

这就是审查的用途，它会筛掉不合适的改动。原来值班是额外负担，现在更像处理一列待审事项。接下来我们主要做几件事。第一，让缓解方案有机会真正通过审批。我们会给 Agent 提出的每个缓解方案打分，把结果反馈给它，让它靠表现获得下一级自主权。第二，在聊天里编写 Skills，让团队不用写代码，也能把运行手册变成 Skills。

That's the point. Review is the filter. On-call stops being a tax and becomes a review queue. Here's what we're focusing on next. First, mitigations that get approved, not just drafted. We grade every mitigation that agent proposes and feed the outcome back, so it earns its next level instead of being handed it. Second, skills are written from the chat, so a team can turn its runbooks into skills without writing any code.

[02:13:53.440—02:14:12.680](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=8033s)

第三，严格研究实际为值班员节省了多少时间。使用次数不足以回答这个问题。自主权阶梯的下一步，是用证据证明它可以独立处理中等关键性的工作。非常感谢大家听我们分享，希望对大家有帮助。

And third, measuring the time we give back properly with a rigorous study of uncalled times saved rather than usage counts. And the next rung on the latter is earning medium criticality autonomy with evidence. On that, thank you so much for listening to us, and hopefully that was helpful.
