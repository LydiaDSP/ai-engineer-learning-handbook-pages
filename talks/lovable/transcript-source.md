# Lovable 怎样为十小时以上的 Agent 任务做设计？

Fabian Hedin

中文校译与英文机器转写

中文为校译。英文栏保留选用的机器转写，可能有听写误差。带时间戳的转写原文可在下方来源说明打开。

依据 AI Engineer Code Summit 主回放第 24 场（07:26:04–07:48:02）的 46 段中英资料整理。官方议程英文题名为 What it takes to set intelligence free。英文沿用机器转写，中文保留既有校译中的缺漏标记。部署频次和性能数字来自讲者，取决于其环境与测量口径。

[英文音频转写原文（带时间戳）](transcript-original.txt)

## Lovable 怎样重新开始做长任务 / How Lovable returned to long-running agents

[07:26:04.480—07:26:33.500](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=26764s)

好，非常感谢。看来可以开始了。好，欢迎各位，很高兴来到这里。我是 Fabian，Lovable 的联合创始人兼 CTO。过去三年左右，我们一直在做一个平台，让任何人都能开发、运营和部署软件。今天的主题是，怎样才能让智能真正发挥作用。

All right. Thank you so much. See, we're good to go here. All right. Welcome, everyone. Glad to be here. I'm Fabian, co-founder and CTO of Lovable. And we spent the last three years or so building a platform to let anyone create software and then operate that and deploy that software. And the topic of today is what it takes to set intelligence free.

[07:26:34.220—07:27:07.360](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=26794s)

对我们来说，这得从三年前刚创业的时候讲起。我得承认，我对 Agent 的感情有点复杂，我来讲讲原因。我们差点把公司做失败了。因为 2023 年我们觉得，既然 Agent 是未来，那就现在为它做系统。后来我们大概猜对了 Agent 是未来，可“现在就做”这件事，我们在 2023 年确实判断错了。

And really, for us, this takes us back to when we started three years ago. And I have to say, I have a bit of a complicated relationship with agents, and I'll tell you why. We almost failed as a company, because we thought back in 2023 that, hey, these agents are the future, so let's build for them now. I think we kind of turned out to be true that they were the future, but we were definitely wrong on the now piece in 23.

[07:27:07.660—07:27:27.820](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=26827s)

那还是 GPT-4 的时代。当时的模型能力根本撑不起更复杂的 Agent 系统。可现在可以了，对吧？模型能力已经到了一个水平，确实能围绕它们搭建更复杂的系统。

So this was back in GPT-4 days. And at that time, the intelligence was simply not there to have more of these complex agentic systems. But now it is. Right? Now the intelligence is actually at a place where you can really build out more complicated systems around them.

[07:27:27.820—07:27:47.620](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=26847s)

[转写有缺漏] 我先简单讲讲，我们和这些大语言模型一起做东西，一路是怎么走过来的。2023 年，我们做了第一版产品，那时它叫 GPT Engineer。

done. And so I'll give you kind of a quick background story here of our journey in working with intelligence or these LLMs. And so back in 2023, we built the first version of our product. We called it GPT engineer back then.

[07:27:48.540—07:28:18.860](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=26868s)

那时的界面跟今天很像，有聊天框和预览。但当时的 AI 很简单，只有一个提示词和一个回复，用户每发一条消息，就调用一次大模型。非常简单，运行得也还不错，可以做单页应用和一些简单的应用。然后我们想，好，模型的能力会继续演进，我们得为接下来的发展做好准备。

And really, the UI was very similar to what it is today, where you can have a chat and this preview. But the AI at that point was quite simple. We just had a prompt and a response, one LLM call per user message. Very simple. It worked fine. But you could kind of build one-page apps and simpler applications with this. And then we thought, okay, this intelligence is going to keep on evolving, so we have to be ready for it as it evolves.

[07:28:18.860—07:28:38.820](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=26898s)

于是我们决定去搭一个 Agent 框架。我们真做了一套很精巧的框架，甚至可以说挺漂亮，让 Agent 在里面工作。有一个主 Agent 和用户对话，由它派生其他 Agent，比如这里举的这个实现 Agent。

And so we thought, let's go out and build this agentic framework. And so we went and we built this very sophisticated, dare I say, beautiful framework for agents to work. And we had this one main agent that would talk to the user, and that agent would spawn other agents, like an implementation agent here in the example.

[07:28:39.460—07:29:08.340](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=26919s)

每个 Agent 可以有专长。有的负责生成应用的初版，还有前端 Agent 和后端 Agent。它们彼此对话，来回传消息。我们想，哇，真漂亮。学术论文里也有人研究过这类做法能有多好用。最后，我们这个完全不管用，反倒把产品做得更差了。这次我们确实失败了。不过幸运的是，在钱花完……

And each agent could have a speciality. This agent would kind of specialize in the first generation of an app, and then you would have a frontend agent and a backend agent. And they would all talk to each other, send messages back and forth. And we thought, oh, this is beautiful. And there were papers around this and how well this could work. And in the end, it didn't work at all. We just made the product worse. We definitely failed on this one. But luckily, before we ran out of

[07:29:08.340—07:29:44.360](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=26948s)

之前，我们想通了，还是回到简单一点的系统吧。2024 年末，我们改回一套简单很多的系统。它有点像一条链，先由几个小模型做知识检索，然后基本上就靠一个主模型，在同一条消息里回复用户、写出代码。这套做法很好用。界面对用户的操作响应很快，系统也可靠，用户可以投入进去，和模型一起迭代。好，这段先讲到这里。现在时机又到了。我们……

money, we figured out, hey, let's go back to a simpler system again. So in late 24, before, we went back to a much simpler system where it was a bit of a chain where we had some smaller LMs doing some knowledge retrieval and then really just one main LM writing to the user and writing the code in the same message. And this worked great. It was very responsive for users in the UI. And it was reliable and users were kind of in it and iterating with the model. And so let's close that down. But now it's time again. We're

[07:29:44.360—07:30:21.100](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=26984s)

回来了，这回真的回来了。Agent 这次能用了。我们在生产环境里用接下来要讲的系统运行 Agent，每分钟处理超过十亿 token。先看一下，Lovable 到底是什么？把界面简化来看，2023 年是这个样子，今天也是。左边是聊天区，人可以来描述自己想做什么，想开发什么都可以。右边是预览，显示你做出来的东西，也就是产出和结果。

back. We're so back. Agents this time, they work. And we're running them in production over a billion tokens per minute on these systems that I'm going to talk about. But first, just looking at, okay, what is actually lovable? So if you simplify the UI, and this back in 2023 as it is today. To the left, we have a chat where humans come in and they kind of describe their intent to build or whatever they want to do. And to the right, you have a preview, which is the output or the outcomes of what you're building. And

[07:30:22.000—07:30:54.980](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=27022s)

2023 年用这个界面只能做些简单的东西，对吧？但现在我们看到，在这一层抽象上工作，也能搭建很复杂的东西。我想，很多开发者工具也在转向这类界面。你不再天天盯着代码，可以在更抽象的一层做架构，或者直接看自己的工作产生了什么结果。这是我们一直相信的，也是 Lovable 的一个核心……

this back in 2023, you could do simpler things with, right? But now we've really seen working at this layer of abstraction, we're able to build very complex things, right? And I think a lot of tooling meant for developers, for example, moving to this type of interface where you're not really looking at the code every day and so on, and you're getting kind of abstracted and working on the architecture or looking at some kind of output of what you're doing. And this is something that we've always believed in, and it's been kind of a core

[07:30:54.980—07:31:27.680](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=27054s)

想法。以后，你不必再像过去那样关注代码。我觉得今天整个行业差不多处在一个过渡阶段。有人会说，哦，代码完全不用关心了，也有人有不同看法。我自己是从小写代码的，当然多少有些感情。可到最后，真正重要的其实不是代码。刚才那一句划掉好了。重要的是结果，对吧？

thesis behind Lovable that you won't have to care about the code in the same way that you had to do before. And I think today we're kind of in this almost a bit in between, I think, in the industry where, you know, some people might say, oh, you don't have to care about code at all. And some people might have different opinions. I, of course, like, growing up coding and these things, you get a bit attached. But in the end, what matters is actually not the code. Sorry if I remove that last part. But what matters is the outcomes, right?

[07:31:27.680—07:32:05.320](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=27087s)

那么结果是什么？对我们的用户来说，可能是把生意做起来，赚到钱，或者以某种方式给别人提供价值。我先快速讲讲我们为此搭的平台，再进入演讲的技术部分。看 Lovable，首先我们有一个 Agent。像别的 Agent 一样，它能做各种事，也特别擅长开发软件。

right? And so the outcomes, what is that? Well, for our users, the outcomes is creating a business and monetizing and creating value for others in some type of way. And I'll kind of quickly go over what we build as a platform to enable this before I go in kind of on the technical side of this talk. So if you look at Lovable, the first thing that you can say is that we have this agent, and like any other agent, it can do quite arbitrary things, and it's quite specialized at building software,

[07:32:06.400—07:32:20.820](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=27126s)

它可以操作浏览器，因此能验证自己做出来的东西。它会连 GitHub，会写代码，那些代码你想怎么处理都行。这差不多就是一个基本的编程 Agent。

and it has access to a browser, so it can verify what it's building, and it connects to GitHub, and it writes code, and you can do whatever you want for that code, so on. So that's kind of your basic coding agent.

[07:32:21.340—07:32:57.660](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=27141s)

平台的另外两部分是云服务和业务功能。云服务这部分，是把托管所需的基础能力直接提供给 Agent。我们做了数据库、身份验证、存储、各种后端计算，还做了安全扫描、备份和日志。Agent 可以查看所有这些服务的内部状态。这样搭应用就顺畅多了，不用自己跑到不同服务里拼起来。我们直接提供这些基础能力。这些……

And the other pieces of the platform is this kind of cloud and business piece of the platform. the cloud part of the platform is about just giving these hosting primitives just seamlessly to this agent. And so we built out databases, authentication, storage, all the types of back-end compute and security scanners and backups and logs for all of these things, and all of it can be introspected by the agent. And this just makes it seamless to build things. You don't have to go to different services to set this together. We just provide you these primitives. So that's

[07:32:57.680—07:33:31.240](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=27177s)

还是围绕做软件和托管软件的，对吧？最后一部分是业务能力。刚才也提到，我们把用户用 Lovable 做出来的东西看成产品或生意。要把生意做起来，光写代码还不够，对吧？所以我们帮用户收款、发邮件、做 SEO 和 Google 搜索优化，在 Google 和 Meta 投广告，还会用分析工具看……

still around building software and hosting this, right? But then the last piece is around these business capabilities, where, again, the output of what our users are doing on Lovable, we don't see that output as code. The output is a product or a business. And if you want to succeed as a business, you need to do more things than just write code, right? And so we help our users with receiving payments, sending emails, optimizing SEO, and Google, doing ads on Google and Meta, and kind of analyzing what is happening with

[07:33:31.240—07:34:07.560](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=27211s)

产品运行得怎么样。你可以看转化率，再做相应优化，Agent 会参与这个过程。这些大致就是我们提供的能力，都是围绕核心的 Agent 做的。Lovable 曾经把 Agent 的工作时间限制在 30 分钟，因为我们当时觉得，跑更久它就不够可靠了。现在我们已经改成基本不给……

the product through analytics, and you can look at conversions and optimize these sort of things, and the agent is in the loop in all of this, right? So that's kind of our capability offering, you could say. And again, the core part of this is an agent that all of these capabilities are built for. And at some point in Lovo's history, we used to our agents to work for only 30 minutes, because we thought they weren't reliable to work for a longer amount of time. But now we've changed this to really be without any sort of bound

[07:34:07.560—07:34:41.060](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=27247s)

以十小时以上的 Agent 任务为例，我会讲解架构上为这类长任务做了哪些设计。第一部分是 Agent 运行时本身，得让它能持续运行很久。第二部分是计算机，Agent 真正在这台机器上干活，跑开发服务器，也用它验证正在做的事。最后一部分就是验证本身。

in terms of the length an agent can work, and so you can imagine agents working for 10 hours plus. And so I'll go into some of the things that we've done in our architecture to enable this. And so the first piece is really around the agent runtime itself and that to run for a long amount of time. And the second piece is the computer, where each of these agents are actually doing their work, running a dev server, and actually verifying what it's doing. And so the last piece, then, is the verification itself,

[07:34:41.160—07:34:50.620](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=27281s)

你要让一个 Agent 工作很久，就得把反馈循环建好，免得它越跑越偏。

where if you want an agent to work for a long amount of time, you need to make sure that you have these feedback loops in place so that it's not kind of going off in the wrong direction.

## 收件箱、可分叉的事件历史和提示词压缩 / Inboxes, forkable event histories, and prompt compaction

[07:34:50.620—07:35:28.660](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=27290s)

先看 Agent 运行时。大致有三种来源可以和 Agent 交互。可以是你自己或者其他人发提示，可以是另一个 Agent，也可以是系统按计划唤醒它。我们选择给每个 Agent 单独配一个收件箱，让这些来源都能往里面发消息。比如这里有一条“现在进度怎样？”想象一下，你有这样一个……

And so if we start by looking at the agent runtime itself, you can imagine that you have really three different sources that can interact with an agent. So it can be yourself kind of prompting this or a human, it could be other agents, and it could also be just a system on a schedule waking up. And the way we chose to architect this is that for each agent we have a separate inbox where any of these sources would send in messages. So you might have a message here like, what's the status? And you can imagine you have this

[07:35:28.660—07:35:58.720](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=27328s)

Agent，它一直开着，可能正在干活。比如它刚经历了三步，有一次请求、一次工具调用，然后拿到了一个结果。到了这时，Agent 就可以收消息了。任何人都可以把消息投进这个收件箱，Agent 可以自己把消息复制到它的运行轨迹里，也就是它的任务历史。平时用过 Agent 的人，对这种交互应该不陌生。

agent, and this agent is kind of an always-on agent that might be working, right? And so you can imagine it has done, like, three actions here, a request, a tool call, and it got some result. And then at this point, the agent is ready to actually receive messages. So since anyone can drop a message into this inbox, the agent then can copy that itself into its own trajectory, basically, it's task history. And this is the type of interaction that I think you're familiar with if you're using agents overall.

[07:36:00.720—07:36:26.360](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=27360s)

这就是 Agent 运行时的第一条设计原则。还有几条，我接着讲。Agent 的运行轨迹，就是到现在为止发生过的事，也是它所有记忆的基础。设计这份轨迹时，我们借鉴了 Git。

So that's kind of the first design principle behind this agent runtime. I'll go through a few more here. And so the trajectory in which the agent is working in, which is kind of the history of what has happened so far, and really the basis for any sort of memory for the agent, right? And we designed this trajectory with really Git as inspiration.

[07:36:26.720—07:36:59.480](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=27386s)

轨迹具体是什么？它是一份只追加的日志，每个事件都指向父事件，也就是它前面的那个事件。这样就得到一个很好的能力，跟 Git 一样可以分叉。两个事件可以指向同一个父事件，这样就有了一个分支。因此，你可以从历史中的任意一点启动并行 Agent，也不必复制所有共有的历史。

And so the trajectory, what is it? It's an append-only log where each event points towards a parent, the previous event. And because of this, you get a nice capability, just like in Git, you can fork things, right? So you can have two events pointing to the same parent, which essentially creates a fork. And because of that, you can kind of spin up parallel agents at any point of time in the history without having to duplicate all of the shared history.

[07:37:01.160—07:37:22.680](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=27421s)

这些分支要是合并起来，含义到底是什么，这点还不太明确。所以目前 Agent 的轨迹不能合并，但可以从中启动新的 Agent，这些 Agent 也可以互相交流。另一个我们特意做的设计，是让这份轨迹保留完整的历史，也就是 Agent 身上发生过的所有事。

And semantically, it's a bit unclear what would happen if you merge this. So unlike if we cannot merge agent trajectories, but we can spawn them outright, and these agents can talk to each other. The other thing that we made sure to design for is that this agent trajectory, it includes kind of the full history and everything that happens with the agent.

[07:37:22.840—07:37:41.940](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=27442s)

比如每次工具调用，以及平台上发生的其他许多事，包括工具调用成了还是失败了。我们确保先把这些事存进一份只追加的日志，再用日志组装实际送给模型的提示词。你可能会问，为什么要这么做？

So every tool call, a bunch of other things happening on the platform, if a tool call failed or succeeded, and what we've done is to make sure that we have this append-only log, and from that we can actually build a prompt that we would feed into the actual You might ask, why would you want to do this?

[07:37:42.060—07:37:53.880](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=27462s)

一个原因是，做提示词的时候，如果历史很长，你可能想压缩一下，比如把前面若干步发生的事归纳一下。

Well, one reason is that when you build a prompt, if you have a long history, you probably want to do some sort of compaction, you want to summarize part of that history in the earlier steps, for example.

[07:37:54.700—07:38:24.060](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=27474s)

但换了不同的模型，或者上下文长度变了，怎么做摘要也会变。何时该总结、何时不用总结，都会重新考虑。把提示词和原始任务历史分开，就可以针对不同的模型和任务组装最合适的提示词。为了展示事件历史是怎么运行的，这里有个调试工具。

But this summarization would differ, for example, if you use different models with different context lengths, you would probably think differently about when you should summarize or not. And so by separating the prompt from the actual task history, prompts for any type of model or any type of task that we can find the best and optimal prompt for. So to show this event history in progress, we have this debug tool here.

[07:38:24.240—07:38:54.340](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=27504s)

这是我在界面里拖动滑块的录屏。可以看到，我一边拖，右边的界面一边更新。这里一共有 156 个事件，每个都来自这份事件历史。界面可以渲染历史中的任意一个时刻。这是为了展示，在任意时点，界面也好、平台上其他正在发生的事也好，我们都能掌握，因为这份历史……

So here it's just a recording of me dragging this slider in our UI. And you can see on the right that the UI is kind of updating as I'm dragging this along. And you have 156 events here, and each of those is an event in this event history, and you can see how the UI can render any point in history, and this is just showcasing that at any point in time, we have full control of, say, the UI or anything else happening on this platform, thanks to this history

## 任务如何跨进程和部署继续 / How a task continues across processes and deployments

[07:38:54.340—07:39:25.760](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=27534s)

细记了发生过的一切。运行时还有最后一点，就是运行 Agent 的进程和实际任务历史是分开的。进程几乎完全无状态，每次调用、每次工具调用以及每个回合之间，都把状态存回任务历史。进程本身可以随时起来，也可以结束。那为什么要在意这一点？

kind of detailing everything that has happened. The last piece I'll go over here on the runtime time itself is that the process that is running these agents, they're separate from the actual task history. And so the process is almost entirely stateless in that between each call, each tool call, each turn, it will actually just persist into the task history. And so you can have a process come and go. And then the question is, why do we care about this?

[07:39:25.760—07:39:58.540](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=27565s)

在 Lovable，我们每天向这个系统部署 700 次，大约每两分钟一次。想象一下，一个 Agent 正在跑十个小时，替一位客户干活，你可不想中间把它打断。与此同时，你还想让它跑在最新的部署上。有时部署的是新功能，有时可能要处理 Linux 内核的安全漏洞……

this? Well, at Lovable, this system, we deploy to it 700 times per day. So that's about once every two minutes. And you can imagine if you have an agent working for 10 hours, you want to not disrupt that agent when it's working, right? This agent is doing something for a customer. But at the same time, we want to make sure that this agent is running on the latest deploy. And it might be a new feature or something like that, security vulnerability in the Linux kernel.

[07:40:00.000—07:40:17.760](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=27600s)

就得尽快完成。把实际任务历史和进程分开之后，同一个 Agent 可以一直做同一件任务，而执行计算的进程可以换，由不同进程接过这份工作。

it is ASAP. And so to do that, thanks to this separation between the actual history and the processes, we can actually make sure that we have one agent that is working on one task, but we can have different processes taking up and actually doing the compute behind that work.

[07:40:18.500—07:40:35.780](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=27618s)

所以即使后面有了新的部署，这项任务也能继续干，哪怕干十个小时甚至更久。这就是 Agent 运行时。平台第二部分是计算机。

So this task can keep on working while we have different deploys working on it, be it for 10 hours or even longer, right? So that's the agent runtime. The second piece of this platform is the computer.

## 整机检查点、环境分叉和预览速度 / Machine checkpoints, environment forks, and preview speed

[07:40:35.940—07:41:11.440](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=27635s)

Agent 真正干活的地方就在这台计算机里。为了给 Agent 提供沙箱，我们试过不少版本和供应商。最后，我们花了很多力气做成现在这套系统，给整台计算机保存检查点。想象你打开 Lovable，新建一个项目。我们有一个共用的基准检查点，里面包含操作系统、系统服务，装好了常用工具，也有一台已经准备好……

So this is where the work is actually happening. And we've been through a lot of iterations and a lot of vendors kind of working with providing these sandboxes for the agent to work in. And we've landed in the system that we've worked really hard now to develop, which is checkpointing a computer. So you can imagine you come to Lovable, you start a new project. We have this common, what we call a golden checkpoint, which contains the OS and the system services, it has common tools installed, and a dev server that is ready to

[07:41:11.440—07:41:48.780](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=27671s)

启动的开发服务器。这个检查点包含磁盘上的全部内容、内存，还有正在运行的进程。每次开新项目，这些东西都直接给你，复制大约只要 230 毫秒。开始一个项目后，你可能会加进这项项目自己的代码和依赖，它们也会随着工作保存到检查点。Agent 每完成一个回合，我们就给这台机器做一次检查点。以后就能很快……

start. And this checkpoint, it includes everything on disk, memory, and also running processes. processes. And so when you start a new project, you get all of that for free, and all of that is copied over in about 230 milliseconds. And so once you start a project, you might have some specific code and some dependencies within that project. And that is also check pointed as you go. And so each time the agent is running and it finishes a turn, we will actually the computer, and from that we are able to, again, very quickly,

[07:41:48.880—07:42:27.400](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=27708s)

在你需要时用不到一秒把它启动起来。这意味着你离开大约十分钟，我们就可以把它关掉，节省资源。你回来时它起得很快，你甚至察觉不到。这套机制连正在传输的请求都不会丢。还能做一件事，就像给 Agent 运行时里的轨迹分叉，也可以给计算机分叉。比如 Lovable 有一个叫 Drafts 的功能……

sub-second, spin that computer up whenever you need it. That means we can save on resources by spinning this down if you leave for, say, 10 minutes or so and come back, we can spin it up extremely quickly so you don't even notice this. And even requests in transit will not even be dropped in this setup. The other thing we can do, thing is that just like the trajectory itself in the agent runtime, we can also fork the computer. And when we do this, for example, we have a feature in level that is called drafts

[07:42:27.400—07:43:06.540](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=27747s)

让你在不同的环境里做同一件事。要支持它，就得把你正在用的计算机分叉。这里展示的是同时做两个。你可以想象一次做几百个，所以得优化一下才能跑得动。其中一项优化是给 RAM 做写时复制。刚建出一台计算机的分叉时，几乎不占额外内存。直到某个进程开始往……

where you work in different environments of what you're doing, and to support that, we need to fork the computer that you're working in. And here we have the example of doing two at the same time. And you can imagine doing hundreds of these, right? And so we've had to do some optimizations to make this feasible to actually run. So one of these optimizations is copy and write on the RAM itself. And so creating one of these forks of a computer is basically free in terms of the RAM that it's using. But as soon as you start writing in a process

[07:43:06.540—07:43:45.320](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=27786s)

RAM 里写东西，我们才复制那一页，到这时才需要分配新的内存。还有一项优化。每个沙箱都要用到几百兆内存，如果把它放在冷对象存储里，流式传回来需要几秒，还得先过磁盘，再到虚拟机内存。不过，有了流式加载，就能在内存全部就位之前启动机器。

to RAM, we will copy that page over, and only then will you start having to allocate new memory. And there's another optimization here also, which is that each of these sandboxes require a few hundreds of megabytes of memory, and that would take a few seconds to stream in if you have it in cold object storage, and then it has to go to disk, and then into memory of this VM, but thanks to being able to stream the memory, we can actually boot up the machine before all of the memory is actually ready on it.

[07:43:45.460—07:44:00.760](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=27825s)

最常用的内存先到，有些进程需要的内存一到，它们就可以开始工作。这样又能省下一点启动时间。后来我们开始想，还能不能让它更省资源，让用户用起来更快？

So the memory that always uses comes first, and then some processes and so on will start to work as soon as the memory gets there. This also shaves off some extra startup time. And then we started asking ourselves, how can we make this even more efficient and even more faster for our users?

[07:44:01.340—07:44:12.820](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=27841s)

大家可能听过 Vite。它是个很棒的开发服务器，JavaScript 生态里的大多数上层框架都在用。我们把它分叉出来，用 Rust 重写了。

And so you might be familiar with Vite, this great dev server that most of the meta frameworks out there in the JavaScript ecosystem is using. And so we took that and we forked it and we rewrote it in Rust.

[07:44:13.440—07:44:29.000](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=27853s)

这样我们的冷启动速度翻了一番，预览等候时间从 14 秒降到了 3 秒。关键在于 Vite 用的是 Node.js，而我们能去掉 Vite 自己的这一项依赖，只运行 Rust 编译出来的二进制文件。

And that made our code starts two times faster when we went from getting this preview from 14 seconds to three seconds. And the main thing that we made faster is that Vite uses Node.js, and we were able to drop that dependency off Vite itself and just have this Rust binary.

[07:44:29.300—07:45:08.100](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=27869s)

这样，这些机器里的内存占用变成原来的约 1/6.5。我们能掌控这些机器里运行的应用，也就能控制怎样写入内存。还记得给不同机器创建草稿分支吗？能控制内存写入后，分叉又能再省一些。这样就能高效地并行跑大量 Agent，让它们尝试不同的办法修 bug、改善应用性能等等。

So that made the memory footprint be 6.5 times less in these machines. And by taking control of the applications that we're running in these computers, we're also able to control how we write to memory. And so when we control how we write to memory, we're even more optimizing, if you remember when we're drafting different computers. And so we're able to run this extremely efficiently so that we can run lots and lots of agents in parallel and have agents explore different solutions to solving a bug or improving the performance of your applications and so on.

## 回合内的开发验证与回合间的业务反馈 / Development checks within turns and business feedback between turns

[07:45:09.480—07:45:35.800](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=27909s)

做这些挺有趣的。最后一部分是验证。要验证 Agent 做得怎么样，这台计算机和开发服务当然很重要。你可以从反馈循环来想验证。Agent 做了一个动作之后，需要拿到信息，弄清这个动作做得好不好。可以把它分成内循环和外循环。

And so this has been fun. But the last piece now is about verification. And of course, this computer and this dev service is a big piece of being able to verify what an agent is doing. And if you look at verification, you can think of these feedback loops, right, that the agent needs to get information, it took an action, was this a good action or was it a bad action? And you can think of it as this inner loop and this outer loop.

[07:45:35.940—07:46:06.080](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=27935s)

内循环发生在 Agent 的一个回合里。有些检查很明显，比如能不能构建，代码有没有 lint 错误或类型错误，还能在正在运行的预览里检查运行时错误。这台机器里也可以配一个无头浏览器，让 Agent 进去探索自己正在做的网页应用，或者别的东西。我们还用其他一些办法，在 Agent 的一轮工作里协助它验证。然后，还有外循环。

So this inner loop is during the turn of the agent. And you have kind of obvious things such as, like, is the build working, do we have lint errors or type errors in the code you can check for runtime errors in the preview that you're running. You can also have within this computer a headless browser where the agent can go in and kind of explore the web app it's building or whatever it's building, right? And a bunch of other things that we're using to help verify within the turn of an agent. But then you also have this outer loop,

[07:46:06.280—07:46:38.220](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=27966s)

外循环大致发生在每两个回合之间。Agent 把控制权交回给用户时，就可以看成一个回合结束。回合之间，你可能会从生产环境或者用户那里得到产品的信息。你可以看访客怎样使用产品，用户在网上怎么评价。也可以自动做 A/B 测试，实际改改文案，看能不能改善转化。还可以把业务指标也用上。这就回到前面展示的那些能力。如果……

which is kind of between each turn and the turn you can think of when the agent is yielding to you as a user. And between each turn, you might get some info on the product itself from production from your users, right? And so you can look at how your visitors are behaving, what users are telling you online, you can do automatic A-B tests and actually change some copy and see it's improving conversion and so on. And then you can also take this business metrics. And remember, this goes back to the capabilities I showed you. By

[07:46:38.220—07:47:16.780](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=27998s)

这些环节由我们掌控，我们就可以优化 Agent 从反馈循环里得到信息的方式。比如你的产品在收款，我们就可以跟踪交易和转化，让 Agent 帮你优化代码，也帮你优化围绕产品的业务策略。这就是我们一直在做的三件事。我们会继续做这些能力和架构，用它们把大语言模型编排成……

having control over these things, we can make sure that we can optimize how the agent is getting this out of the feedback loop. So we can make sure that if you're running payments, we can actually track those transactions and conversions and make sure that the agent can actually help you optimize not only the code, right, but the business strategy around your product. And so those are really the three things that we've been working for. And we'll continue to kind of build out these capabilities and this architecture around really orchestrating

## 三部分如何支撑持续运行 / How the three layers support long-running work

[07:47:16.780—07:47:43.580](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=28036s)

Agent。我们正在做的这套 Agent 系统，每分钟处理数十亿 token。这些计算机可以随 Agent 一起启动，每个 Agent 一台。现在我们又回到了那套很漂亮的结构，Agent 之间能对话，能彼此协调。这一回它确实能用了，多亏做了这些优化，还能规模化运行。

these LMs into agents. And so this agentic system that we're building is running billions of tokens per minute. And these computers, right, we can spawn up with each agent and one computer, and now we're kind of back to this quite beautiful setup where you have agents talking to agents and they're orchestrating, and this time it's actually working, and it's working at scale thanks to some of these optimizations.

[07:47:44.420—07:48:02.280](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=28064s)

如果你想试试，可以去 lovable.dev 看我们的预览是怎么起来的。你会看到很简单、好用的界面，这背后的一大堆事不用你操心。非常感谢。希望大家有所收获。谢谢。

And so if you're curious to try this out, you can head to level.dev and you'll see our previews spinning up and so on, but you'll get a very simple and nice interface, and you won't have to care about all of this stuff. Thank you so much. It's hope you learned something. Thanks so much.
