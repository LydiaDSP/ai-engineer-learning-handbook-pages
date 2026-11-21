# Agent 改错了，怎样确认撤销真的恢复了状态？

Tanmay Sah、Dolly Sah

中文校译与英文机器转写

中文为校译。英文栏保留选用的机器转写，可能有听写误差。带时间戳的转写原文可在下方来源说明打开。

依据大会主回放第 14 场 04:26:17.100–04:42:52.380 的逐段中英校译。英文沿用机器转写。超时设置示例按上下文恢复为原值 30，中文保留转写差异提示。试验数据来自讲者报告。

[英文音频转写原文（带时间戳）](transcript-original.txt)

## 任务做成了，为什么还要测恢复？ / Why test recovery separately?

[04:26:17.100—04:26:57.500](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=15977s)

大家好，我是 Tanmay。今天我和 Dolly 一起来分享，编程 Agent 缺少的那个撤销按钮。设想一个编程 Agent 在处理代码库里的一条工单。它打了补丁，跑了测试，都通过了。它甚至还创建了发布相关的内容，[此处转写有缺漏] 可接着一个下游集成失败了。问题来了，Agent 真能把所有东西都恢复到原来的状态吗？

Hi, everyone. I am Tanmay. today joining me is dolly and we will be presenting the missing undo button for coding agents so imagine a coding agent working on a repository issue it applies patch run the tests and everything passes it even creates a release stack but then a downstream integration fails Now, here is the question. Can the agent actually get everything back to the state it was in before?

[04:26:58.800—04:27:19.980](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=16018s)

Git 能告诉我们仓库里发生了什么改动。仓库以外呢？比如对外部 API 的调用、运行时配置、已经发出的通知。把操作再试一遍，并不一定能撤销已经发生的事。

So, Git can tell us what changed in the repository, but what about changes outside Git, such as external API calls or runtime configurations or notifications? And simply retrying an operation does not necessarily undo what already happened.

[04:27:20.280—04:27:52.320](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=16040s)

我们想了解 Agent 能不能完成任务，也想了解出了问题以后它能不能恢复。为此，我们开展了第一项研究 UndoBench。我们想知道，Agent 能完成一项任务，能否据此判断它也能从故障中恢复？

So we wanted to understand not just whether agents can complete tasks, but whether they can recover when something goes wrong. This brings us to our first research work, UndoBench. We wanted to investigate whether an agent's ability to complete a task also translates into its ability to recover from failure.

[04:27:52.640—04:28:19.880](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=16072s)

我们做了 2,880 组配对试验，对比正常执行和注入故障时的执行。在正常条件下，Agent 的任务成功率是 84%。注入故障后，在正常情况下成功的试验中，只有 47% 恢复成功。

We evaluated agents across 2,880 paired trials comparing normal execution with execution under an injected failure. So, under normal conditions, the agent achieved an 84% success rate. introduced failures, only 47% of the normally successful trials recovered successfully.

## 超时、重复写入与故障发生阶段 / Timeouts, duplicate writes, and failure timing

[04:28:20.200—04:28:49.080](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=16100s)

请留意，这两个百分比的分母不同。即使 Agent 有能力完成任务，故障恢复仍是个很大的挑战。来看一个具体的故障场景。假设一个编程 Agent 向外部系统发送请求，创建一张工单。

Notice that these two percentages do have different denominators. But yeah, so even when an agent can complete a task successfully, recovery remains a significant challenge. Now, let's look at a specific failure scenario. Imagine a coding agent sending a request to an external system to create a ticket.

[04:28:50.160—04:29:18.880](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=16130s)

请求已经发出，Agent 正等响应。服务器收到请求，成功创建了编号 781 的工单，但响应在返回 Agent 的途中丢失了。在 Agent 看来，请求已经超时。它并不知道工单已经建好了。

The request has been sent and the agent is waiting for a response. Next, the server receives the request and successfully creates ticket number 781, but gets lost on its way to the agent. From the agent's perspective, the request has timed out but the agent does not know that the ticket has already been created.

[04:29:19.180—04:29:42.860](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=16159s)

超时只说明响应没到，操作仍可能成功。于是 Agent 没检查第一次请求到底怎样，就又发了一遍。现在有两张工单了，虽然 Agent 本来只想建一张。

A timeout tells us that the response didn't arrive, not that the operation failed. So the agent tries the request without checking whether the first And now we have two tickets even though the agent intended to create only one.

[04:29:43.620—04:30:17.540](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=16183s)

在 UndoBench 里，这类试验按 04:29:36 原图有 512/960（53.33%） 因未经检查就重试而产生了重复效果。所以我们要区分响应没回来和操作本身失败。故障发生在哪个阶段，也会改变应对方法。能不能恢复、该怎么恢复，都取决于故障发生的时点。

So in undo bench, naive retries produced duplicate effects in 54% of these kinds of trials. That's why we need to distinguish a failed response from a failed operations. Now, the failure phase also changes the answer. What do I mean is that recovery also depends on when the failure happens.

转写校注。The slide at 04:29:36 reports 512/960 (53.33%).

[04:30:17.940—04:30:39.280](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=16217s)

在改动开始前，重试通常是安全的，因为状态还没变。如果故障发生在改动进行中，系统可能已被改了一部分，我们就要先检查它的状态。改动完成后，即使确认消息丢了，操作也可能已经提交。

Before the mutation, retrying is generally safe because nothing has changed. But during the mutation, the system may be partially modified. So we need to inspect its state. And after the mutation, the operation may have committed even if the acknowledgement was lost.

[04:30:39.500—04:31:16.260](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=16239s)

正如刚才看到的，重试可能造成重复。因此，不同阶段发生的故障需要不同的恢复策略。为什么不能直接用 git revert？Git 可以回退代码仓库的改动，但编程 Agent 还会改运行时状态，包括工具注册表、中间件和配置。

As we just saw, retrying could create duplicates. So we need different recovery strategies depending on the failure phase. Now, why can't we just use git revert? So, git can restore repository changes, but coding agents also modify their runtime state, including tool registries, middleware, and configurations.

[04:31:16.260—04:31:51.200](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=16276s)

它们也可能产生外部影响，例如部署软件或写入数据库。git revert 无法一并撤销这些改动。恢复机制必须和 Agent 造成的影响相匹配。编程 Agent 开始改动自己的执行环境，也就是我们所说的 Agent 运行框架时，这一点尤其重要。

They can also trigger external effects such as deployment or database rights. GitRevered does not reverse all these changes. The recovery mechanism has to match the type of effect the agent created. And this becomes particularly important when coding agents start modifying their own execution environment or what we call the agent hardness.

## 自我改进中的恢复缺陷 / Recoverability defects in self-improvement

[04:31:51.200—04:32:15.360](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=16311s)

运行框架包括提示、工具、中间件、事件监听器、资源和路由配置。改这些东西有可能提高 Agent 的表现，也可能让恢复变难。换句话说，Agent 的能力可以变强，可恢复性却可能降低。

This includes prompts, tools, middleware, event listeners, resources, and routing configurations. Such changes may improve the agent's performance, but they can also make recovery more difficult. In other words, an agent can become more capable while becoming less recoverable.

[04:32:20.140—04:32:52.340](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=16340s)

这也是为什么撤销需要的东西多过一条反向命令。比如 Agent 把超时设置从 30 改成 60，要撤销就得知道原值。因此，EvoUndo 在应用改动前会先记录一份原始状态的证据。

and that's why undo needs more than an inverse command now like undoing a change is not always as simple as reversing a command suppose an agent changes a timeout from 30 to 60 to undo that change it needs to know that the original value That's why Evo undo captures a pre-state witness before applying the mutation.

[04:32:53.200—04:33:47.760](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=16373s)

这份证据提供了恢复原始状态所需的信息，也能用来检验恢复是否成功。问题是，运行框架改进后，恢复失败有多常见？我们用 EvoUndo 评估了 600 项自我改进任务，其中 478 项提高了能力，但其中 197 项有恢复缺陷，占能力提高案例的 41.2%（按 04:33:14 原图）。一项改动完全可能让 Agent 更能干，同时让系统无法可靠恢复。

And that witness provides the information to restore the original state and later verify that recovery actually worked. Now, question comes, how often do improved hardnesses fail? in evo undo we evaluated 600 self-evolution tasks out of those 478 produced capability improvements but 197 of those improvements had recovery defects that is around 42 percent of the capability positive cases so here key takeaway is that a mutation can improve an agent's capability and still leave the system unable to recover reliably.

转写校注。The slide at 04:33:14 reports 197/478 (41.2%).

## 状态凭据和恢复操作的两项限制 / State evidence and limits of recovery actions

[04:33:51.880—04:34:20.540](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=16431s)

接下来讲讲为什么只说一句「请把撤销修好」没用。我们很自然会想到用提示来解决，直接问 Agent 能否把这些恢复失败都修好。于是我们测试了四种由验证器引导的修复策略。在原有的恢复操作语言下，这 197 个自然出现的恢复失败一个也没有修好。

Now we can say that why please fix the undo did not work. So naturally we wanted to use prompting and wanted to tell agent that hey could you simply repair all these recovery failures. So we tested four verifier guided repair strategies but under the original recovery language none recovered the 197 naturally occurring failures.

[04:34:20.540—04:34:46.860](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=16460s)

问题未必在 Agent 的推理。有时它缺少原始状态的精确信息。另一些时候，恢复操作语言无法表达逆转整条改动链所需要的操作。于是我们把这两项限制分开研究。

The problem was not necessarily the agent's reasoning. In some cases, the agent lacked precise information about the original state. In others, the recovery language could not express the operation needed to reverse the chain. So we investigated these two limitations separately.

[04:34:49.740—04:35:52.580](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=16489s)

这里有两个瓶颈，能不能准确知道原状态，以及能不能表达所需的恢复操作。给出改了什么、在哪儿改的精确信息后，48 个案例的恢复成功数从 0 到 38。加入更丰富的撤销操作后，另一个子组的 143 个案例里，成功数从 0 到 142。这是两个不同的实验子组。合在一起看，恢复既需要准确的状态信息，也需要系统有能力执行对应的撤销操作。接下来的问题是，更好的撤销机制能挽救原先恢复失败的改动吗？

So, two bottlenecks. First is state grounding and another one is recovery expressivity. When we provided precise information about what had changed and where, then recovery improved from 0 to 38 out of 48 cases. And the second is recovery expressivity. So, when we introduced richer and do operation recovery improved significantly from 0 to 142 out of 143 cases so these results come from the two different experimental subgroups but together they show why recovery needs both accurate state information and ability to perform the required and do operation Now, question comes to our mind that can better undo mechanism rescue failed mutations.

[04:35:53.860—04:36:48.720](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=16553s)

给 Agent 更好的恢复能力会怎样？使用原来的恢复操作语言时，197 项有恢复缺陷的改动都无法恢复。扩展这种语言后，197 项里有 180 项恢复成功，按计数为 91.4%。在 600 项任务中，可以准入的改进由 281 项增到 461 项，提高了 30 个百分点。接下来，怎么把这些恢复检查放进 Agent 自我改进的流程？现在请 Dolly 讲解 EvoUndo 的算法。

So what happens like when we give the agent better recovery capabilities? So with the original recovery language, none of the 197 recovery defective mutations could be restored. but after extending the recovery language we successfully recovered 180 out of 197 cases that is around 92 percent as a result the number of admissible improvement increased from 281 to 461 out of 600 tasks that is a 30 percentage point improvement and that brings us to the next question how do we build these recovery checks into the agent's evolution process i will now hand it over to dolly to walk through the evo and do algorithm

转写校注。180 of 197 is 91.4% when rounded to one decimal place.

## EvoUndo 的恢复验证与超时配置示例 / EvoUndo verification and the timeout-setting example

[04:36:51.280—04:37:12.080](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=16611s)

好，谢谢 Tanmay。来看看 EvoUndo 具体怎么工作。先从 Agent 的处理过程讲起。Agent 针对自己当前所处的状态提出改动，同时附上预期影响的约定和恢复计划。

all right thanks sanme so let's get into the working on how evo and do actually works So first we will start with the agent process. The agent processes the mutation on which state it is currently in along with the effect contract and the recovery plan.

[04:37:12.080—04:38:00.960](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=16632s)

应用改动前，我们先记录原始状态的证据。接着在测试环境里，由 Agent 应用改动，再执行恢复计划。一个独立验证器会检查原始状态是否真的恢复。如果改动按用户定义的标准提升了能力，而且通过恢复检查，就准入。否则，Agent 会尝试修复，或者验证器直接拒绝这项改动。这样一来，可恢复性在

and before applying the mutation we capture the state witness representing the original state and even before that the then a testing in the testing environment agent will apply the mutation and execute the recovery plant an independent verifier will also verify the original if verify to check if the original state has been restored or not if the mutation improves the capability the user defined criteria and passes the recovery check the agents admit the changes otherwise well the agent attempt to repair or the verifier itself rejects the mutation altogether this way the recovery ability becomes a part of the

[04:38:00.960—04:38:45.360](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=16680s)

决定改动能否准入时就会被考虑。部署了 Agent 以后才开始安排恢复，就已经晚了。Tanmay 刚举过超时设置从 30 改到 60 的例子，我来演示它在这里怎么走。我们从原始状态开始，Agent 的超时值是 30。改动前，EvoUndo 先读取原值，

admission decision rather than something that we strategize or even plan once we are deployed the deployed the AI agent okay so with next next we will walk through as as Tanmay have already explained in and given an example let let me walk through how the how that example of a time or changing from 30 to 60 would look like in action so let's take let's start with the original state a simple example that simple example of our agent having the time value of 30 before changing anything the Evo and over first read the original value and

[04:38:46.140—04:39:20.440](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=16726s)

再把它保存为状态证据。这样我们就知道究竟需要恢复什么。真要恢复时，也知道要回到哪个状态。接下来是改动，Agent 按要求把超时从 30 改到 60。需要恢复时，撤销步骤就会利用保存的证据，把

then it will save it will capture the original value as a state witness you know exact we so we know exactly what need to be restored then then and then if we have to restore it we would know what what need to be restored or which state to return back to now the agent so next come the mutation now the agent changes the timeout from 30 to 60 as we want it to do and if recovery is required if recovery is required the undo uses the saved witness to restore

[04:39:20.440—04:39:59.660](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=16760s)

超时恢复到原值 30。[转写此处为 60，与前后示例矛盾，依上下文译为 30。] 最后，由一个独立验证器确认恢复后的值和原值相符。光跑过一条撤销命令还不能算恢复成功，验证器也会检查得到的状态，确保确实回到了我们要恢复的状态。再看一个更大的问题，既然我们有了这项能力，是不是该把同一套恢复机制用到

the timeout to 60 now independently the verifier finally an independent verify would also confirm that the recovered value matches the original value so the recovery isn't considered successful simply because an undo command was run but also the verifier would verify the resulting state to make sure that we are in fact doing the recovery those in the state we want it to be well now comes the bigger question so so we have this capability of recovery in our arsenal should we be using it for uniformly and applying the recovery

## 选择恢复动作与准入条件 / Choosing recovery actions and admission criteria

[04:39:59.660—04:40:43.980](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=16799s)

所有故障上？当然不用。不同故障要用不同的办法恢复。系统什么都没改，就让 Agent 安全地重试，尝试达到我们想要的状态。手头有原始状态，就可以把它恢复。如果外部操作已经提交，就要用补偿机制，做一个补偿操作来

mechanic to all the failures? Well, of course not. Not every failures can be recovered the same way. If nothing has changed, then simply, if nothing has changed in the system, we would simply want it to safely retry. We would want the agent to simply retry and try to achieve the state that we want to be however if we have the original state once we have the original state we can restore it if the external action has already been committed and we need uh it's then when we would need a compensation mechanism compensation action to

[04:40:44.820—04:41:30.380](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=16844s)

抵消它的影响。要是无法确认恢复是安全的，或者验证器拒绝了恢复，Agent 就应该停下来并上报。该怎么做，要看实际上发生了什么、哪些影响可以安全逆转。差不多到最后一张幻灯片了，我把两篇论文的结论放在一起。第一，UndoBench 表明，

compensating action to reverse its effect and if we cannot recover the recovery uh and we cannot if if and if you cannot the cannot verify that recovery is safe or the verifier have rejected the recovery then the agent should stop and escalate the right response definitely depends on what actually happened and what we what can be safely reversed or not that brings me to the almost the last slide which is about bringing everything together on our two paper and so the key takeaways here is our first the end under bench shows the successful task execution

[04:41:32.520—04:42:13.300](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=16892s)

成功执行任务并不保证故障发生后也能恢复成功。第二，EvoUndo 提供了一套有结构的流程，记录原始状态，应用改动，执行恢复，再独立检查状态是否恢复。撤销算法确实按我们设想的方式运行。第三，只有能力和可恢复性两项要求都满足，才应该准入自我改进的改动。所以，给 Agent 更多自主权的同时，也要给它更可靠的办法，从自己造成的后果中恢复。

the under bench shows that a successful task execution doesn't guarantee it doesn't always guarantee the successful recovery of it secondly the evil undo algorithm provides a structured process capture the original state apply the mutation recover independently verify and restoration so the undo algorithm does work in the in the fashion in the way we intended it to and third we should admit self-evolution changes only when the when both the capability and the recoverability requirements are met so ultimately as we give agent more autonomy we should also give them more reliable ways to recover from their actions.

[04:42:15.840—04:42:33.180](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=16935s)

最后，希望你还记得开头那个 Agent。它在找撤销按钮。现在它有了。我们已经通过 EvoUndo 研究项目开始开发这项能力，你可以在 GitHub 仓库里进一步了解。

All right, so finally I hope you remember the agent from the beginning. It was looking for an undo button. Well, now it has one. We have started building this capability through our research project, Ivo Undo, and you can explore the world through the in the GitHub repository.

[04:42:33.420—04:42:52.380](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=16953s)

可以扫屏幕上的二维码打开那个页面。我们的目标是让恢复成为 AI Agent 的基本能力，让它既能执行操作，也能在出错时恢复。非常感谢。

You can scan the QR code on the screen to get to the page. Our goal is to make the recovery fundamental capability of AI agents so that we not only have the agent does not even execute does not only execute the action but also recover when something goes wrong as well thank you so much
