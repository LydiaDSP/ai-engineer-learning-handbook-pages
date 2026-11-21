# Lauren Tan · 中文校译与英文机器转写

英文栏保留机器转写，关键差异附校注。

[英文音频转写原文（带时间戳）](transcript-original.txt)

## [01:01:02.100](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=3662s)

大家好。不知道你们能不能看到我的幻灯片。我叫 poteto，也叫 Lauren。很高兴今天和大家聊聊。能不能请大家给技术团队一点掌声，感谢他们帮我处理笔记本的问题？

> Hello everyone. I don't know if you can see my slides, but my name is Potato, also known as Lauren. excited to chat with all of you today. Maybe you can get a big round of applause for our tech team helping me with my laptop.

## [01:01:34.360](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=3694s)

这就好了。再说一遍，我叫 poteto，在 SpaceXSI 做 GrokBot。能请大家举个手吗？有多少人看过别人写的代码，心想这写的都是什么垃圾？

> There you go. All right. So again, my name is Potato. I work on DropBot at Space XSI. Hi, and can I just give a quick show of hands? How many of you have ever looked at code that somebody else wrote and you thought, that's all slop?

## [01:01:55.800](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=3715s)

我也有过。今天我想让你相信，这些烂代码也能变成好东西。上个月我干了件挺疯狂的事，向生产环境交付了 3,000 个 PR（按现场幻灯片，英文听写记成了部署请求）。过去没有 Agent 时，我们通常不太关心产量，特别高产的少数人除外。

> Well, I have too. But today I'm going to convince you that you can turn that slop into gold. And so I did something crazy last month, and I shipped 3,000 deploy requests to production. Now, before agents, we never really cared about volume, except for the outliers.

转写校注。现场幻灯片写 3,000 PRs，英文机器转写记为 deploy requests。

## [01:02:18.140](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=3738s)

在我上家公司，我们把这类人叫「写代码的机器」。比如 Bret Taylor，据说他一个周末就重写了整个 Google Maps，产出高得惊人。现在有了 Agent，人人都能成为写代码的机器。

> And at my previous company, we called these people coding machines, people like Brett Taylor, who famously rewrote all of Google Maps in a weekend, just an insanely productive engineer. And while with agents, anyone can now be a coding machine.

## [01:02:33.560](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=3753s)

我的看法是，软件工程师得想清楚，怎样在大幅提高生产力的同时，保持甚至提高代码质量。有些人把达到这种状态叫做「软件工厂」。我喜欢简单一点，我觉得关键是信任。你要投入时间改善 Agent 的环境，让它做对事时有据可依。做到这一步很费力，我花了六个月才……

> And my thesis is that the job of the software engineer, the meta of being a software engineer, is figuring out how to maintain or even improve the quality of your code while massively increasing your productivity. To get there, some people like to call this a software factory, but I like to keep it simple, and I think of it as all about trust. Not blind trust, but investing in your agent's environment so you can trust that your agents are going to do the right thing. Now it takes quite a lot of effort to get there and it took me six months to

## [01:03:10.020](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=3790s)

……能够交付数千个 PR，其中不少是在我睡觉时完成的。这件事当然能做到，我相信你花的时间会比我短。先来谈谈怎样从一个信任度低的环境走到信任度高的环境。我用这座倒金字塔来说明，该把时间投入 Agent 环境的哪些地方。

> get to a point where I could ship thousands of pull requests, a lot of them in my sleep. But it's certainly possible and it will take you much less time than I did. So let's start by talking about how we move from a low trust environment to a high trust one. So this inverse pyramid is how I think about where to spend time on your agent's environment.

## [01:03:33.620](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=3813s)

头两层是确定性的，用代码本身来做。比如设计好 API 和架构、重构，也可以用 lint 规则、类型系统、编译器和各类测试。把这两层结合起来，就能约束 Agent 能做什么，让它默认做对。往上再加运行时验证和形式化验证，可以找出缺陷、检查系统中需要保持的属性和不变量，也能检查 Agent 是否理解了你的……

> The first two layers are deterministic, so using your code itself. So things like good API design, architecture, refactoring, or using lint rules, type systems, compilers, or, you know, different kinds of testing. And you can use both of these layers together to constrain what agents can do and force them to do the right thing by default. Verification, both runtime and formal, are great tools to layer on to find bugs and check properties and the invariance in your system that you want to hold true and also help you check whether or not the agent understood your

## [01:04:10.180](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=3850s)

……目标和意图。最后再加一点文字，比如规则、Skills、AGENTS.md，用在需要判断的地方。我们先从代码库谈起。Agent 根据输入生成输出。

> goals and your intent. And then finally you want to layer with a little bit of pros. So things like rules, skills, agents.md, things that require judgment. But let's start with your code base. Agents generate their outputs based on their inputs.

## [01:04:28.400](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=3868s)

所以，输入质量非常重要。恰好，代码库就是它最大的输入之一。每次你要纠正 Agent 时，可以想想怎样把这次纠正变成确定性的检查，省得在规则文档或 AGENTS.md 里再加一行。

> And so the quality of the input really matters. And it just so happens that your code base is one of the largest inputs. So whenever you're correcting your agent, think about how you can make that a deterministic check instead of adding another line to your rules or your agents.md.

## [01:04:45.480](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=3885s)

写在代码里要容易复现得多，你也会更有把握。我喜欢用花园打比方。以前代码是三两个 PR 一次送过来的。

> Because it's far more reproducible when it's in code and it lets you trust it more. And the analogy that I like to use is that your code base is kind of like a garden. You know, code used to arrive a few pull requests at a time.

## [01:05:00.160](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=3900s)

我记得 2024 年上班时，我要审同事写的三个 PR。今天大概是 300 个。现在每个工程师都像带着一支由几百个、甚至几千个 Agent 组成的队伍。

> And I remember going into work in 2024 and reviewing the three pull requests that my colleagues wrote. And today, that number is more like 300. So, you know, every engineer is now a team of hundreds or even thousands of agents.

## [01:05:16.800](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=3916s)

代码来得特别快，像是一直在流动，有种自己长出来的感觉，像活物一样。按这个比喻，代码库、你设的约束和护栏，就是新代码绕着生长的混凝土基础，就像这张照片里的建筑。

> and code is arriving so rapidly that it almost feels like a continuous stream, and it almost feels organic, like a living thing. And in this analogy, your code base, the constraints that you impose, the guardrails that you put up are the concrete foundations that the new code that your agents write grow around, just like the building in this picture.

## [01:05:41.640](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=3941s)

软件工程师的工作，在很多方面开始有点像园艺。代码是 Agent 最大的输入，所以临时绕行方案、反模式、弃用代码和技术债，都可能被下一个 Agent 直接照抄，因为它们在代码库里看上去像约定俗成的做法。

> And so in many ways, the job of being a software engineer is kind of becoming like gardening. Because code is the biggest input for agents, it means that any workarounds, anti-patterns, deprecated code, tech dep, it's now likely to be just copied by the next agent since it looks like the established pattern in your code base.

## [01:06:04.140](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=3964s)

就像花园里冒出杂草或害虫，一不留神就到处都是。你会希望代码库尽可能干净，让 Agent 总能抄到好的范例。

> And it's like you have some weeds or pests growing in your garden, and then they spread everywhere before you know it. So you want to make your code base as pristine as possible so that agents are always copying the good stuff.

## [01:06:21.780](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=3981s)

来看几个实际的例子。Dune 是我们为 GrokBot 做的客户端框架，用来实现这套架构思路。技术上没多复杂。你可以把 Dune 理解为给 Electron 应用用的 Next.js。

> All right, let's look at some real examples. So Dune is a client framework that we created for GroffBot to implement this idea for organic architecture. It's not really that interesting technically. You can kind of think of Dune as kind of like Next.js for Electron apps.

## [01:06:38.980](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=3998s)

Dune 有趣的地方在于，我们把开发桌面应用的很多经验写成了约束和 lint 规则。其中一条经验是，有些东西需要拿捏得非常准才能用好，一不小心就会写出烂代码。

> But the interesting part of Dune is that it has a lot of constraints and lit rules that we've encoded a lot of the lessons that we've learned building desktop applications. And one such lesson is that anything that requires nuance to use well often leads to slop.

## [01:06:57.520](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=4017s)

典型例子就是 React 的 `useEffect`。它有适合的用途，但经常被误用。有人开玩笑说得有博士学位才会用 `useEffect`。要用好它确实要考虑很多细节。

> You know, your classic example is useEffect in React. It has its use cases, but it's often misused. You know, some people joke that you need a PhD to use useEffect. And in other words, it really requires a lot of nuance to use well.

## [01:07:13.980](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=4033s)

Agent 不太会用它。我们的办法是在产品代码里禁用，只允许在 Dune API 内部的少数地方使用。这样，从规则上就杜绝了这类问题，以后审代码也不用再查这一项。

> And agents are not good at using it. So our solution has been to just ban it in product code. And it's really only allowed in some places inside of Dune APIs. And effectively, this problem has now been categorically eliminated, and we never need to catch that during code review again.

## [01:07:34.540](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=4054s)

我们还有一种做法，靠目录结构提供上下文。以 Cursor 这个 Electron 应用为例，我们见过一个反模式。Agent 经常把主线程代码导入渲染线程，结果出现长任务和界面卡顿。

> Another interesting pattern that we use is context through directory structure. So one anti-pattern that we saw with Cursor, which is an Electron app, is that agents would often import main thread code into the render thread, which would cause long tasks and jank.

## [01:07:51.640](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=4071s)

所以在 GrokBot 和 Dune 应用里，我们把约定做得非常明确。两个顶层目录就叫 `electron-renderer` 和 `electron-main`。依赖图分析器和几条 lint 规则禁止它们相互导入。

> So in Grokbot and in Dune apps, we've made this very, very conventional. We have these two top-level directories, literally called electron-renderer and electron-main, and imports between them are forbidden or banned by our dependency graph analyzer and some lint rules.

## [01:08:09.700](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=4089s)

这些 lint 规则很容易设，但代码审查就少了一件要检查、要琢磨的事。还有一件让我吃惊的事，是 Agent 使用 Markdown 的方式。

> And again, you know, these are simple lint rules to set up, but it means one less thing that we need to review and think about, you know, during code review. And then one more surprising thing that I've seen is agents using markdown.

## [01:08:25.640](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=4105s)

比如文档、代码注释、规则或 Skills，Agent 会在那里写理由，为没有把事做对辩解。不知道你碰到过没有，你只纠正了它一个小地方，它反应过头，把这点当成以后绝对不能打破的硬规则。

> So things like documentation, code comments, rules or skills, and they use this as a place to write down their justifications for not doing the right thing. Or I don't know if you've ever seen this, but they'll over rotate on some small correction that you made, and they treat it like a hard rule that can never be broken ever again.

## [01:08:46.400](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=4126s)

再举一个 Cursor 的例子。Agent 特别爱用命令式定时器，比如 `setTimeout`、`requestAnimationFrame` 和 `requestIdleCallback`。它们被用来做临时修补，盖住 VS Code 的命令式风格和 React 声明式风格之间的架构冲突。

> And here's another example from cursor. So agents really loved using imperative timers, so things like set timeout, request animation frame, request idle callback, and they were using these as quick fixes because they were really patching over an architecture clash between VS code's imperative style and React's declarative style.

## [01:09:08.500](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=4148s)

我们的架构选择让客户端和 Agent 的表现都差了很多。你要是做过 JavaScript 性能优化，就知道短时间内反复创建和销毁大量定时器，会引发许多大规模的垃圾回收，造成延迟和卡顿。

> So our choice of architecture actually made both the client and the agent performance much worse. And if you've ever done any performance work in JavaScript, you'll know that when you have tons of timers being rapidly created and destroyed, causes a lot of major garbage collection, which causes a lot of lag and jang.

## [01:09:27.400](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=4167s)

更糟的是，Agent 写了一大堆代码注释，图上红色的就是，解释为什么这个临时补丁有道理。一不留神，定时器已经到处都是，应用的性能受到了很大影响。

> But the worst part is that agents wrote a lot of code comments, like you can see in red here, explaining why this quick fix was justified. And before you know it, we had timers spreading everywhere, and the performance of the app really suffered.

## [01:09:44.100](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=4184s)

我们在 GrokBot 里吸取了这个教训，决定禁掉 99% 的注释。注释容易过时，人也实在懒得看那些写得很烂的注释。它还给了 Agent 一个开脱的机会，碰到难做的事就能找理由不把它做对。注释最大的问题是没法强制执行。「我留句话，提醒下一个 Agent 别这么做」，出发点挺好，最后却靠不住。所以在……

> Now in GrokBot, we learned our lesson there and we decided to just ban 99% of comments because they go stale easily, humans just really don't bother reading the comment slop anyway. And again, it gives an agent an escape hatch to justify not doing the right thing because it's hard. And the worst part about comments though is that they're not enforceable. So what seems well-intentioned, you know, like I'm gonna tell the next agent not to do something, never ends up actually being anything that you can trust. So in

## [01:10:20.060](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=4220s)

……GrokBot 和 Dune，我们现在有 lint 规则，错误提示写得清楚，让 Agent 修到问题的根上，避免继续打补丁绕过它。我们的通用原则是，每纠正 Agent 一次，就把它写成这样的确定性检查。

> Grotbot and Dune, we now have lint rules that give good and very helpful error messages telling the agent to fix the root cause, the real problem, rather than just patch around it. And so our general principle is that every time we correct our agents, it turns into one of these deterministic checks.

## [01:10:39.840](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=4239s)

也可以想想，能不能通过更好的 API 或架构，在代码里彻底消除这类问题。这样做得够多，代码审查要留意的事情就会越来越少。

> Or we think about how to categorically eliminate that problem in the code through better API design, through better architecture. And if you do this enough times, you'll find that you have just less things to look out for in code review.

## [01:10:54.340](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=4254s)

到某个时候，你会发现已经没什么要审的了。大多数 PR 就可以让 Agent 自己合并。好。验证也是让 Agent 更自主、让我们更信得过它们工作的一个重要方面。我们的代码审查流程现在已经简化成看验证产物，比如视频、截图、图表和形式化验证结果。

> And at some point, you'll realize there's nothing left to review. And you can just let agents merge most of their own requests. All right. is also a really big part of how we make our agents more autonomous and also increase our confidence and trust in their work. And our code review process has now really shrunk into looking at verification artifacts instead. So things like videos, screenshots, diagrams, formal verification.

## [01:11:25.940](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=4285s)

最基本的例子就是运行时验证。这个说法听着复杂，就是让 Agent 能自己运行代码，也能用开发人员平时会用的调试工具，比如 Chrome DevTools Protocol。

> And the most basic example of this is runtime verification, which is just a fancy way of saying giving your agent a way to run the code for itself and use debugging tools that, you know, developers use as well, like the Chrome DevTools protocol.

## [01:11:40.720](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=4300s)

在我们的运行时验证 Skills 里，有个东西叫「功能地图」。它类似网站地图，从用户的角度列出应用里的全部功能。

> In our runtime verification skills, we have this thing that we call a feature map. And that's basically kind of like a site map of all of the features that are available in your application from the user's point of view.

## [01:11:52.680](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=4312s)

这样，当你说「左边栏里那个东西」，Agent 就不用猜了。你们有了一套共同的叫法。我们也在这些 Skills 里用自定义 CLI，让 Agent 每次都能复用同一个命令行工具和驱动。这样能节省 token，而且可以测试。

> And so with this, agents don't need to guess when you say, you know, the thingy in the left sidebar. It gives you some shared vocabulary. And we also make use of custom CLIs inside these skills so that agents can reuse the CLI and the driver every time, which cuts down on token usage and is also testable.

## [01:12:14.520](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=4334s)

最近我们也开始做形式化验证。现在用 TLA+ 对主要用户流程做模型检验，比如跨设备、跨平台的通知。我们也用 Lean 证明某些算法的性质。

> And then recently we've also started looking at formal verification. So we now use TLA Plus to do some model checking of major user flows, such as notifications across multiple devices and platforms. We use a lean as well for proving certain algorithms.

## [01:12:30.200](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=4350s)

比如我们自己写了一个虚拟化库，就用 Lean 检查会不会出现闪烁或抖动。整体来说，这个做法还在试验中，看起来很有希望。

> For example, we have our own, we wrote our own custom virtualization library and we use a lean there to check that we don't have flickering or jittering problems. And we're still experimenting with this approach overall. It seems very promising.

## [01:12:44.100](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=4364s)

我们已经用形式化验证找到了不少缺陷。它有适用范围，我们把它当作 Agent 环境里又多了一件工具。接下来这个视频放得很快。我们刚开始试的另一件事，是对 UI 做基于属性的测试。

> We've already found quite a few bugs with formal verification. But it's certainly not a silver bullet and we're treating it as another tool, another agents' environment. And then this is a very fast video, but another thing that we just started looking at is property-based testing as well for UIs.

## [01:13:07.120](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=4387s)

我们用的是一个叫 Bombadil 的库，它已经帮我们发现了几个 UI 缺陷。再说回大一点的问题。我看到 Cindy 发过一条推文。六个月前，她说有些难发现的缺陷被合并了，所以她没法相信自己的 Agent。

> So we use this library called Bombadil, and this has also caught a few UI bugs for us already. Okay, so zooming out, I saw this tweet from Cindy, and six months ago, she said that she was talking about not being able to trust her agents because of subtle bugs that were getting merged.

## [01:13:28.720](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=4408s)

她当时少的是一套能让自己放心的验证流程。现在过了六个月，她说自己每天 70% 的 token 都花在验证上。这和我的经历差不多，我的大部分 token 也都花在验证上。

> And really what was missing for her in being able to trust her agents was the verification process. And now, six months later, she says that 70% of her daily tokens go into verification. And I'd say that that tracks with what I see as well, that most of my token usage goes to verification.

## [01:13:46.100](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=4426s)

仔细看我们的流程，用的都不是新发明的技术。这些是成熟的软件工程工具，只不过过去有些太难弄懂、难写或难维护，用起来可能贵得受不了。

> And if you really look closely at our process, none of these things here are new or novel techniques that we've never had before. These are just good software engineering tools, but ones that might have been prohibitively expensive to use before as they were hard to understand or write or maintain.

## [01:14:04.720](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=4444s)

Agent 大幅降低了成本。我们正在进入软件测试和验证特别兴盛的时期，因为有了 Agent，测试能做到以前成本不允许的深度。形式化验证也能帮你更好地推敲产品应该怎样工作，以及 Agent 到底有没有理解你的意图和目标。

> But agents drastically cut this cost down. And really we're entering a golden age of software testing and verification because agents let us test everything to a much greater degree than used to be economical. And then formal verification can also help you better reason about how your product should work and whether your agents really understand your intent and goals.

## [01:14:26.300](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=4466s)

我在自己的 PStack 插件里做了一个新 Skill，叫 StateChart。PStack 是 Potato Stack 的缩写。这个 Skill 能让你从用户的角度看状态机。我觉得把它跟我们提供的视频和截图放在一起，审查起来容易得多。

> I made this new skill called StateChart in my plugin PStack, potato stack, which helps you visualize state machines from the user's point of view. And I find this much easier to review alongside the videos and screenshots that we provide.

## [01:14:42.760](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=4482s)

这用起来很好。刚才太亮，晃到大家了。好，来看看投入这些工作能换来什么。在 GrokBot 团队，我们的交付速度正在快速上升。

> And so that's been great. Sorry for the flashbang. Okay, now let's look at what the promised land looks like. What do you get in return for all of this investment? So on the GroffBot team, our velocity is taking off and rapidly increasing.

## [01:15:00.900](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=4500s)

上个月，团队上线了多达 11,000 个 PR，这个数字很夸张。客户端的发布节奏也加快了，大概每天发一个新的稳定版。

> And last month, our team shipped a ridiculous 11,000 pull requests to production, which is a wild number. And our pace of releasing the client has also increased, and we cut a new stable version about once a day.

## [01:15:17.560](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=4517s)

核心团队交付得更多，也有更多偶尔参与、顺手贡献的人。他们不一定熟悉很多背景，但也能贡献代码。十月大约有 227 个人至少提交了一个 PR。

> And then the core team is also shipping much more, and we also have a lot more casual or drive-by contributors who don't always have a lot of context, but they're also contributing. In October, we had about 227 people who contributed at least one pull request.

## [01:15:38.540](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=4538s)

交付这么快，你可能会想，这不会乱成一团吗？不会冒出一大堆烂代码吗？讲者口述回退的 PR 比例稳定在约 0.5%。现场图按提交（commits）统计回退率，最近三个月为 0.47%、0.48% 和 0.47%。

> So despite this velocity accelerating, you might be thinking to yourself, isn't this going to be chaos? Isn't this going to be a bunch of slop? But actually, the number of PRs that get reverted has actually gotten lower on a relative basis and is steady at about half a percent.

转写校注。口述称约 0.5% 的 PR 回退比例。现场图显示的是被回退的提交（commits）占比。

## [01:15:53.960](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=4553s)

我觉得更有意思的是，在这个交付节奏和 PR 规模下，GrokBot 的性能保持住了，跟上线时相比，好几项还有提升。启动、打字、打开新聊天和切换聊天，都变快了。

> But I think the really interesting thing about this shipping pace and this volume of pull that the performance of GroffBot has stayed not just stable, but has improved on multiple dimensions compared to when we launched. So startup, typing, opening new chats, switching chats, all of this has gotten faster.

## [01:16:14.580](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=4574s)

别忘了，GrokBot 现在还是 Electron 应用，所以性能有个上限。不过它已经比市面上不少 Agent 界面快得多。对一个交付这么快、参与者这么多的 Electron 应用来说，我觉得很不错了。

> And keep in mind, GroffBot is still an electron app for now. So there is a ceiling, right? But it's already much faster than many other Asian UIs out there. And for an election app with this high velocity and this many people contributing, I'd say that's pretty good.

## [01:16:34.820](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=4594s)

所以，在开始搭软件工厂、把能自动化的都自动化之前，每次纠正 Agent 时，可以先从改善代码库做起。先加 lint 规则，防止出现新的反模式，再把旧的清理掉。接着把验证这块做扎实。

> So before you jump into building out a software factory and automating everything that you can, whenever you correct your agent, try and do it by improving your code base first. Start with a lint rule to prevent new occurrences of anti-patterns, and then clean up those old patterns as well. And then make sure that your verification story is really strong.

## [01:16:56.520](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=4616s)

这些工作有很多本来就是做自动化的前提。要是你的编码循环本身会产出烂代码，自动化之后只会产出更多，接着就得往问题上砸越来越多的 token，大家都知道那很贵。在代码库、静态分析、运行时和形式化验证上投入之后，你会发现有了这些条件，很多事可以做了，也很容易在此基础上搭自己的工厂。准备就绪后，可以用 GrokBot 搭外层工作流程。我们有很多……

> A lot of this work is a prerequisite to automation anyway. And if your inner coding loop produces slop, then automating that loop just produces more slop. And you need to throw more and more and more tokens at the problem, which we all know is very expensive. And once you meet these investments into your code base, static analysis, runtime and formal verification, find that many things become possible with these foundations and that you can really easily build your own factory on top of these foundations. And when you're ready, Grotbot is a great way to build that outer loop. We have tons of

## [01:17:35.620](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=4655s)

……连接器、可以启动 Cursor 或云端 Agent 的 Routines，还有能协调几百甚至几千个 Agent 的 Projects。举个例子，现在每次准备新版本，GrokBot 都会先启动一个 Project，对整个应用、整个构建做模糊测试。它会把应用跑起来，像真实用户那样使用，找出缺陷。然后它给每个缺陷开一个修复 PR，还会自动合并，听起来挺疯狂的。这是因为我们的代码库已经足够……

> connectors, routines that can kick off cursor, cloud agents, and projects which let you orchestrate thousands of hundreds or even thousands of agents. And as a quick example, you know, whenever we cut a new release now, Grotbot will project first that will fuzz the entire application, the entire build, and it will find bugs by running the app and using it like a real user. And then it's going to open fixed PRs for each of those bugs that it finds and it's going to auto merge it, as crazy as that sounds. And that's because our code base is good

## [01:18:09.700](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=4689s)

……好，PR 通常默认就能达到要求，我们合入的大多数产品代码已经不需要深入的人工审查。有了扎实的基础和能随代码演进的架构，就有办法把低质量的代码产出转为有用的改动，在保持质量的同时加快交付。

> enough that pull requests tend to just be good by default and most product code that we land no longer really requires deep human review. So when you have solid foundations and good organic architecture, you can turn slop into gold and you can ship with high quality, high velocity without compromising on quality.

## [01:18:33.060](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=4713s)

我是 poteto，也叫 Lauren。再次感谢大家听我讲。

> My name is Potato, also known as Lauren. Thanks to you again for listening to my talk.
