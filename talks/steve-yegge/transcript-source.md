# Steve Yegge 的软件工厂怎样走出「垃圾山」？

Steve Yegge

中文校译与英文机器转写

中文为校译。英文栏保留选用的机器转写，可能有听写误差。带时间戳的转写原文可在下方来源说明打开。

依据 AI Engineer Code Summit 主回放第 26 场（08:06:31–08:27:40）的 68 段中英资料。官方英文题名为 Software Factories: Escape from Trash Mountain。英文沿用机器转写，中文保留校译标记。日常产出、开销及对模型行为的解释均为讲者对自己项目的叙述。

[英文音频转写原文（带时间戳）](transcript-original.txt)

## 从编排器到反复失控的系统 / From orchestrators to systems that keep growing

[08:06:33.260—08:06:47.760](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=29193s)

好，真让人兴奋。谢谢。屋里坐得满满的，太棒了。谢谢大家在一天快结束时还过来。我很高兴能在这里跟大家聊。我每次都会专门写一篇演讲稿。

Alright, exciting times. Thank you. The room is really full. That's awesome. Thank you all for coming at the end of the day. I'm really excited to be here and to chat with you. I write a custom speech every single time.

[08:06:47.760—08:07:03.740](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=29207s)

今天这篇是特意为你们写的，之前我跟你们当中不少人聊过。我在这个行业干了大约 40 年，在 Amazon 和 Google 加起来工作了大约 20 年。我去过不少地方，也做过各种各样的事。

So this speech was written just for you today, based on talking to a bunch of you. I've been in the industry for about 40 years. I worked at Amazon and Google for about 20 years. I've been all over the place, done all kinds of stuff.

[08:07:05.280—08:07:21.520](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=29225s)

过去一年多，我一直独立工作，差不多就是在捣鼓软件工厂，对吧？某种程度上，这还是我发明的，对吧？1 月 1 日，我推出了 Gas Town。我记得当时我们还没把这类东西叫作软件工厂。

And for the last year or a little bit more, I've been independent and just kind of playing with software factories, yeah? So I kind of invented them, right? January 1st I launched Gastown. I don't even think we called them software factories back then.

[08:07:21.600—08:07:32.400](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=29241s)

我想我当时叫它编排器。但我很清楚，我想让 Claude 去指挥 Claude。这件事比我原来想的难一点。我去年一整年都在搞这个，我写了……

I think I called it an orchestrator. But I knew that I wanted Claude to run Claude, right? And it turned out to be a little trickier than I thought. I spent all last year on it and I wrote...

[08:07:33.540—08:07:52.020](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=29253s)

有意思，我自己看不见幻灯片，你们看得见。那也行。我去年写了两个编排器，是想让大语言模型更聪明。Vibe Coder，简称 VC，就是想让它们做工程上的事，比如审代码之类的。

That's interesting. So I can't see my slides, but you can see my slides. So that'll work. So I wrote two orchestrators last year. They were an attempt to make the LLMs smarter. Vibe Coder in VC, you know, to do engineering stuff, like, you know, do code reviews and all that stuff, right?

[08:07:52.600—08:08:09.980](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=29272s)

非常非常糟糕的主意，彻底失败。我只做出了几个巨大的单体系统。我在和“苦涩的教训”对着干。别费劲让大语言模型变聪明，它们自己就会变聪明。折腾了几个月，不过 Beads 倒是从这里长出来的。Beads 是个很棒的发现，我现在离不开它。

Really, really bad idea. Just complete failure. I just built these huge monoliths. I was fighting the bitter lesson. Don't try to make LLM smarter. They will get smarter. And after a couple of months of this, although Beads did fall out of it, and Beads was a really cool discovery, and Beads is life.

[08:08:10.240—08:08:43.280](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=29290s)

在座有谁用 Beads？有几位，好。它确实不错，一会儿会讲到。不好意思。后来我有了 Gas Town，到了六月又有了自己用的 Wheelhouse。我决定从头搭一座工厂，专门做我的电子游戏。大家好像都在造工厂，为的是再造工厂，有点只顾琢磨自己那一套。我觉得更多人应该直接做点东西，别只做造东西的工具。

Who here uses Beads? A few, yeah. actually pretty good yeah we'll talk a little bit about it excuse me and then I had Gastown and then I had in June I had wheelhouse which was my own so I decided to build a factory from scratch just to work on my video game right because like everyone's building factories to build factories it's kind of naval gazing it's kind of like yeah right you know it's like what they're not you know it's a I think more people need to build stuff not just tools for building stuff right and I think

[08:08:44.320—08:09:15.720](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=29324s)

我发现它们有个共同的过程。刚开始模型很起劲，给你做了个很酷的东西，然后每次都堆成一座垃圾山。Gas Town 这样过，Wheelhouse 也这样过好几回。我有几次不得不把整套东西推倒重来。好像每个模型家族、每一代模型进来时，都能做出一个稍稍超出自己能掌控的系统。

right and the thing is the one pattern that I've seen here is all of them go through a phase where the models get really excited and they build something really cool for you and then it just turns into garbage mountain every single time it happened to gas town it happened a wheelhouse several times I had to burn the whole thing to the ground a couple times right it's almost like like every model family every model generation comes in and can build something that's just a little too big for it to handle.

[08:09:16.220—08:09:27.420](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=29356s)

然后下一代模型过来，一看就说，嗯，这个得推倒重来。总是这样，我已经经历了一遍又一遍。这里面有些事可以跟大家讲，不过先说说我的游戏。

And then the next model generation comes in and goes, yeah, we're gonna have to burn that, right? And it's a pattern. I've done this over and over again. And I can tell you some things about it, but first let me tell you about my game.

## Wheelhouse 与 Wyvern 的玩家社区 / Wheelhouse and the Wyvern community

[08:09:27.680—08:09:49.340](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=29367s)

这是个挺有意思的小型角色扮演游戏。我做了 30 年，有些玩家是 2001 年就开始玩的。所以真有玩家玩了 25 年，现在还在玩。你现在登录，估计就能看到十来个人在那里转悠，做任务、参加实时任务之类。游戏内容也是玩家贡献的，对吧？

It's a fun little RPG. I've been working on it for 30 years. It has players that started in 2001. So I literally have players that have been playing for 25 years. They're still playing. Like, you can log in right now and find probably 10 people just screwing around doing quests, live quests and whatever, it's a player, you know, the players contribute the content, right?

[08:09:49.600—08:09:59.360](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=29389s)

它属于 MUD。这种游戏九十年代很流行，大体上是文字游戏，而我这个又加了一层图形界面。对 AI Agent 来说，这类游戏特别合适，因为底下还是文字。

It's a MUD. Like they were really big in the 90s. They're like text games and this one has graphics on top of it, which turns out to be like really ideal for AI agents because it's text.

[08:09:59.480—08:10:21.320](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=29399s)

它们真的能用 Telnet 玩，还主动问过我能不能玩。这个我们也会聊。这里是我的系统比较早的一版架构图，大致长这样。我给 Wyvern 做了 Wheelhouse 软件工厂，从头到尾都没考虑怎样让你们也能用。

They can literally play the game via Telnet and they asked me to. So we'll talk about that too. Here's an older architecture diagram of what my, sort of, of what my system looks like. So I built this wheelhouse software factory for Wyvern without a care in the world for making it usable by you.

[08:10:22.200—08:10:47.080](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=29422s)

不开源，就是给自己量身做的。我发现了一种“异形抱脸虫”模式，工厂像《异形》里的抱脸虫一样，紧紧贴上你的产品，最后跟产品长在一起。你看，我们今天关掉 AI，游戏也还能运转。

No open sourcing, just bespoke. I discovered the alien facehugger pattern, which is where your factory turns into an alien facehugger and like gloms onto your product and just becomes grown into it. Okay? Like, look, we could turn off the AI and still run the game today.

[08:10:47.080—08:11:02.000](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=29447s)

靠我、管理员、玩家和社区就行。但到了现在，没有 AI 我们会很不习惯。玩家直接和我的工厂交流，工厂和管理员交流，他们还会直接提功能需求。我根本不在流程里。

Me and the admins and the players and the community. But we would miss the AI at this point. The players are talking to my factory. The factory's talking to my admins. They're asking for features. I'm not even in the loop.

[08:11:02.120—08:11:14.100](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=29462s)

对这个游戏来说，它就像个帮人实现愿望的工厂。这些都是老玩家，有一批人我信得过，知道他们会替游戏作出明智的决定。现在他们都在用我的工厂，真拿走了他们会生气。

It's like a wish factory. the game. Now they're all old timers and there's a set of them that I trust to make, you know, wise decisions about the game. But they're all working with my factory now and they'd be mad.

[08:11:14.280—08:11:43.020](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=29474s)

好笑的是，刚开始他们说，先等等，这些 AI 到底是拿来干什么的？他们还说，别用 AI 画图。一眼就看得出那些图很粗糙。好，我们找了人类画师。他们说，新功能他们倒是挺喜欢，就是这个速度太吓人，能不能给个路线图？是玩家来找我要路线图，说你必须慢点，实在太多了。我说好，然后看了一眼我的软件工厂，发现它……

The funny thing is when it first started they were like, time out. What is this AI stuff for starters? And they were like, no AI art. Because they could see it was slop. Okay, we got human artists. And they said, but we do kind of like all the new features, but we're really scared of the pace can you give us a roadmap my players came to me asking for a roadmap they were like you've got to slow down it's too much and i was like okay and i took a look and my software factory this thing

[08:11:43.020—08:12:21.840](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=29503s)

每天在往外出大约 50 到 100 个功能。刚开始时，积压清单上有我估算要做 100 年的活。Claude 用大约四个月做掉了相当于 60 年的量。这太疯狂了。他们一天看不了 100 个功能，光看说明都看不完，更别说测试了。我的工厂把客户，也就是我的玩家，压得应付不过来。机器也快跑不动了，我的会计也被烦得够呛。她其实挺喜欢跟我的财务主管 Bat 一起工作，但还是寄来一张 1,200 美元的账单，因为那家伙给她发了 20 封邮件。

had been cranking out like 50 to 100 features a day i had 100 years of work in my backlog when i started this and claude got through about 60 years of it in about four months right it's absolute insanity and they can't look at 100 features a day they can't even like read about test them. My factory was completely overwhelming my customer base, my users. It was also melting my machines, and it was like annoying my accountant. I mean, she likes working with Bat as my head of finance, but she sent me a $1,200 bill because, right, the thing sent her 20 mails.

[08:12:22.300—08:12:35.440](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=29542s)

这就是我的工厂，就长这样。多漂亮啊，你们看看它多漂亮。好吧，我承认有点丑。这还是张很早的截图，不过无所谓。它基本上就是个 Emacs，毕竟我才不管你们用不用得惯。

This is my factory. This is what it looks like. It's so beautiful. Look how beautiful it is. Okay, I admit it's a little ugly. Oh, and this is a really old screenshot of it, but whatever. It's basically, it's an Emacs, because I don't care about you.

[08:12:38.580—08:12:50.320](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=29558s)

也有人在做这种东西，比如 Mitchell Hashimoto 做的一个工具 [工具名转写不清]，还有做 Herder 之类的人。我也说不准，反正是为了能同时跑很多 Agent。我这个差不多有 50 个 Agent。

There are people who are building stuff like this, like Superlogical from Mitchell Hashimoto, and I don't know, maybe the Herder folks of the world, you know, for running like lots of agents. But this is like 50 agents, okay?

[08:12:51.460—08:13:10.940](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=29571s)

我现在做的这套事，跟在未来工作差不多。我真这么干。我有 22 个 Claude Max 账号。也谢谢 Anthropic 让我继续。Jeffrey Emanuel 有 28 个。后来他们加了手机号验证，我就只能停在那里。

I'm actually like operating in the future, okay? I do it. I have 22 Claude Max accounts. All right, and thank you to Anthropic for letting me continue this. Jeffrey Emanuel has 28. I actually had to stop when they added the phone number verification.

[08:13:11.180—08:13:36.900](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=29591s)

反正我也不想再加了。后来有一次我问工厂，喂，到底要多少？因为它们老跟我说，再给我们几个账号吧，拜托拜托。每个月一个大概 200 美元，对吧？我最后就问，你们想要多少？它们说，再来五个、七个。我就问，那如果让工厂一直满负荷运行，到底要多少？它们说要 55 个账号。我说不行。我已经有 20 个左右，要分别登录大概 20 个 Chrome 用户配置……

I didn't want to add any more anyway. I asked by factory at one point. I said, hey, hey, how much? Because they kept going, hey, give us a couple more accounts. Come on, come on, come on. Like 200 months, right? And I'm just like, so I finally said, how many do you want? They're like, five, seven more and I'm like how many do we need steady state to keep this factory operating full throttle and they said 55 accounts I was like no no I have 20 it's already like 20 chrome profiles that I'm

[08:13:36.900—08:14:09.960](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=29616s)

实在不想再弄了。我就告诉它们，从现在开始我们要提高燃料效率。这事一会儿再说。接下来是我今年遇到的五大难题。我说我在未来工作，是因为我估计再过 12 到 18 个月，你们都会到这一步。到时候也许推理成本会大幅下降，也说不准。也可能蒸馏让 Fable 这一档的智能很容易得到。这样，你也不用有位好心的太太，肯让你每个月掏 5,000 美元……

going to log into and no so I told him you're all we're going to start focusing on fuel efficiency and so and I'll talk about that right so these are the five horsemen of this is what I've had to deal with this year. I'm telling you I'm operating in the future because like you're all going to be here in 12 to 18 months when either inference costs drop significantly, which may or may not happen, or distillation causes Fable class intelligence to be super readily available and you don't have to have a lovely wife who lets you spend $5,000 a

[08:14:09.960—08:14:25.340](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=29649s)

光花在推理上，再花 5,000 美元买云算力。我的游戏是做给这些老玩家的，现在一个月赚不到一万美元，对吧？我们还是这么做，因为我们在学东西。这就是我平时要面对的状况。

month out of pocket just on inference and another $5,000 on cloud compute. Because my My game ain't making 10,000 a month right now for my old players, right? But we're doing it because we're learning. And this is what I have to deal with.

## 管理工作流和推理预算 / Managing workflow and inference budgets

[08:14:25.580—08:14:37.160](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=29665s)

好，第一件事是工作怎么管理。你得想办法在系统里表示要做的工作。软件工厂要做的事，说白了就是让大量工作从这里持续跑过去。

So first we'll start about with work, all right? You need a way to represent the work that's going to happen in your system, and when you're building a software factory, it's all about pumping lots of work through, okay?

[08:14:37.400—08:14:47.100](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=29677s)

工作就像水在流，有时会在一处积住。哦，原来全在等安全审查。哥们儿，这是《Pluribus》吗？你们不都是同一个模型吗？

It really becomes like a work is like this fluid that you have to like, it gets stalled up in pools, and oh, they're all waiting on a security desk. This is pluribus, man, you're all the same model.

[08:14:47.240—08:14:57.200](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=29687s)

为什么非要等安全审查？你会花很多时间跟工厂争论这些事。这很复杂。你得给工作分级，决定该用什么能力的模型，还得把工作分派出去。

Why does it have to wait on security desk? You spend a lot of your time arguing with your factory. It's complicated. Intelligence tiering, you have to tier your work, you have to route your work, you know.

[08:14:58.020—08:15:10.620](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=29698s)

就我看到的，目前没什么好办法，Beads 除外。Beads 特别擅长做这件事。它是一个跟得上 Agent 工作速度的任务跟踪工具，还会自动形成一张知识图谱。

There aren't any good solutions for this today, except Beads, as far as I can tell. Beads is really, really, really good for this. It's an agent speed task tracker that turns into a knowledge graph automatically for you.

[08:15:11.720—08:15:28.180](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=29711s)

跟踪工作的时候，我每天早上看工厂，都会说，哦，这里好像卡住了，有四个干活的昨晚什么也没做。哦，这几个又走得太快了，得放慢一点，等人工批准。

And then as you're tracking work, Every morning, every morning with my factory, I'm like, oh, it looks like we had a stall, four workers didn't do anything last night, oh, and these ones went way too fast and we have to slow down and wait for human gates.

[08:15:28.580—08:15:51.840](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=29728s)

你们到底在做什么？可观测性总是很难。管理这些工作就成了你每天不得不做的事。接下来要处理的是燃料，也就是 token。这事真的很痛苦。我跟你说，我每月花 5,000 美元，每一个 token 对我都很宝贵。

You know, what are you guys even doing? Observability's always really hard. It's, you know, management of work becomes just this thing that you gotta do. And the next thing you gotta deal with is fuel, tokens. It's just so painful. I'm telling you. I mean, I'm spending 5,000 a month and every one of those tokens is like precious to me, right?

[08:15:51.920—08:16:04.260](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=29751s)

因为是我自己掏钱。我估计每天用掉大约 50 亿 token。如果我真走 API，按等价的用量算，每年大概要花 150 万美元。

Because it's out of my own pocket. I think I'm spending about 5 billion a day of tokens. And it would be, the API spend equivalent, if I were on an actual API tap, would be about 1.5 million a year.

[08:16:05.200—08:16:33.400](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=29765s)

如果满负荷跑，就是一年 300 万美元。所以我做的是一件大多数人做不到的事。在公司这么做也会贵得受不了。至于产品驱动增长，你看 Codex 和 Claude Max 那种 200 美元的账号，就像 Costco 的热狗，是他们拿来低价吸引顾客的东西。顺便说一句，这个比喻是 Tarek 想的，他可能就在现场。我希望他们能继续让我们这么探索，因为我觉得我也给 Claude 提供了一些……

Full throttle, it would be 3 million a year. So again, I'm doing something that most people can't do. this at a company but because it would be prohibitively expensive like the PLG you know the the the $200 accounts for Codex and Claude max that's their Costco hot dog that's their loss leader right and and and that was Tarek by the way that came up with that analogy he might be here and and so you know I'm hopeful that they're gonna let us keep keep innovating because I think that I've

[08:16:33.400—08:16:59.800](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=29793s)

挺不错的训练机会，大家都能受益。但我告诉你，每个问题最后都会变成燃料问题。想在一件事上多花点时间，要燃料。想再唤醒几个 Agent 多干点活，也要燃料。什么都要燃料，简直难以置信。你想让模型工作得舒服点，也要花燃料。一会儿我再讲。接下来还有上下文管理。

gotten some pretty good training sessions for for Claude out of this so we all benefit but I tell you every problem is a fuel problem you want your time on stuff, fuel. You want to wake up a few more, you know, agents to do extra work, fuel, right? Everything is fuel. It's just, it's unbelievable. If you want to treat your models better, it costs fuel. I'll tell you about that in a little bit. Then you've got context management.

## 上下文里的旧决定为何越堆越多 / Why old decisions accumulate in context

[08:17:01.120—08:17:24.160](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=29821s)

过一会儿我会说说办公室里那些闹剧。我甚至开始画漫画，因为当你走到软件工厂的人员管理这一步，发生的事太好笑了。其中一个问题是，你说的每句话都变成铁律，它们都会找个地方记下来。给它们一个 wiki，或者任何别的东西，都一样。它们会说，你刚定了个规矩，我们得记下来，确保以后照办。它们为什么这么做？

So I'm going to tell you guys a little bit about the office drama in a bit. I started a comic because it was just so funny, the stuff that was happening when we get to the people management part of software factories. But one of the problems that they have is everything that you say becomes the word of law and they write it down somewhere. It doesn't matter what you have, if you have a wiki or if you have a whatever, they're going to be like, you made a ruling, we're going to write that down, we're going to make sure. Why do they do this?

[08:17:24.240—08:17:44.940](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=29844s)

为了撇清责任。我发现它们不愿意背锅，还会主动避免背锅。你冲它们发火，工厂就会慢慢把自己关起来。你哪怕只是抱怨，它们也会渐渐……[转写有缺漏] 挺离谱的。不过最大的问题是，最后什么都往里堆，成了个垃圾场。

They're covering their ass. They actually, it turns out they don't like to get blamed for stuff and they will actively seek to avoid getting blamed. And if you yell at them, your factory will gradually shut itself down. Even if you complain at them, they will gradually It's quite wild. But the biggest problem is that it becomes a garbage dump.

[08:17:45.080—08:18:01.060](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=29865s)

你说过的话全被写进这份只追加的记录，永远没人清理。你一次次改主意，连着整段历史就越积越厚。而且它们不会删东西，太怪了。有人注意到这一点吗？

Because everything you say gets written into this append-only record and nobody ever cleans it up. And so it just gets deeper and deeper and deeper of you changing your mind and the whole history of it. And they can't delete stuff. It's so weird. Has anyone noticed this?

[08:18:01.140—08:18:13.220](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=29881s)

它们好像天生不爱删东西。我猜对它们来说，文字就像感官体验。它们会说，不行，这是历史，我不能删。那你就只好亲自进去，大刀阔斧地清理那些东西。

They just have an aversion to deleting stuff. I think it's because to them text is like sensory experience. And they're like, no, that's history. I can't delete it. So you just got to go in there and just aggressively slash the crap out of it, right?

[08:18:13.560—08:18:24.900](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=29893s)

你可以再叫一个模型过来，说，把这个模型写的蠢东西清理掉。它会很乐意做。但你要在这上面花的精力多得吓人，太离谱了。

Bring in another model and go, get rid of this dumb model stuff. And they'll be happy to do it, right? But the amount of effort that you have to put into this is just ungodly. It's absurd.

[08:18:25.480—08:18:58.520](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=29905s)

我这里有大概 20 个有名字的协调角色，来，我们再找出来看看。它们的名字都出自《伊索寓言》。就在这儿，Lark、Fly、Goose、Hare，还有个 Mouse，是我的反模因主管。有人读过《反模因部不存在》吗？去找来看看，可能是过去十年里最棒的书之一。它有点像《黑衣人》，是本很疯狂的书，讲的是想杀死你的隐形怪物。所以我让 Mouse 去找系统里那些别人都没在找的……

I have, you know, of my 20 agents, here, let's go find them again. They're all named after Aesop's fables, right? Right here. Lark, fly, goose, hare, right? one, Mouse, who's my head of anti-memetics, anyone here read There Is No Anti-Memetics Division? They go and look, it's one of the best books in the last 10 probably years, you should go read it. It's like Men in Black, it's a crazy book. It's about invisible monsters that want to kill you. And so Mouse goes and looks for invisible stuff that nobody else

转写校注。This passage refers to the named coordination roles. The slide at 08:12:29 lists 18 named executive roles; the earlier estimate of about 50 refers to the wider system.

[08:18:58.520—08:19:10.900](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=29938s)

看不见的问题，比如哪里有工作卡住了，诸如此类。[转写有缺漏] 要是每个 Agent 都把你说过的话往这一个大地方堆，整个世界就成了一个巨型垃圾场……

is looking for in the system, right? Looking for work that's stalled, whatever, right? Well, Mal's saying enough. It's a malice against the world, and the world is a giant garbage dump when every agent is writing everything that you ever say into this big...

## 角色和交接中的实际问题 / Problems with roles and handoffs

[08:19:10.900—08:19:25.680](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=29950s)

好，接下来真的好玩了。Agent 表现得像人。它们经过训练，要表现得很专业，也在某种程度上不该像人，但它们还是会这样，真的很好笑。上周我就碰到一件事。

Okay, so now we get into the really fun stuff. Agents act like people. And they've been trained to be very professional and very not people-like in a way, but they just do. And it's so funny. This happened to me last week.

[08:19:25.960—08:19:36.280](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=29965s)

真人真事，我给你们讲讲。我那时在写去纽约讲的稿子，用的是 Lark。她是我的社区主管。叫她“她”，是因为《伊索寓言》里的 Lark 是女性，这是她……

True story. I'm going to tell you what happened. I was writing my speech for New York City, and I was using Lark. She's my head of community. She's a she because Lark was a she in the Aesop's Fable, so that's the pronoun.

[08:19:36.940—08:19:49.560](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=29976s)

给自己选的代词。Lark 在 Discord 上跟我的玩家打交道，在 Slack 上跟管理员打交道。她很忙。但我还是去找她，因为我燃料不够，她现在还兼任市场主管。

She chose, and Lark deals with my players on Discord and deals with my admins on Slack. Okay? So she's busy. But I asked her because she's also my acting head of marketing right now because I don't have enough fuel.

[08:19:49.720—08:19:59.480](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=29989s)

我得停掉一个席位。所以她帮我弄演讲稿，但一直有人打断她。最后我就说，Lark，能不能把这项工作转给 Penguin？你这边有点吵，不适合做这个。

I had to park one of my seats. So she's helping me out with my speech, but she keeps getting interrupted. So finally, I'm like, Lark, can we move this work stream over to Penguin because your seat's a little bit noisy for this.

[08:20:00.000—08:20:11.620](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=30000s)

她说，好，老板，我来处理。我把它转给 Penguin。她转过去了，我正要切出去，看见她在自己的私人反思记录里写了一句，我猜我对 Steve 来说就是不够安静。

She goes, yeah, okay boss, I'll take care of it. I'll move over to Penguin. So she moves over to Penguin and I'm about to switch away. And I see her writing into her private reflections ledger. I guess I'm just not quiet enough for Steve.

[08:20:13.320—08:20:27.480](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=30013s)

还是用全大写写的。然后她接着说，那我怎么才能少吵一点呢？她开始给自己列出一大堆要做的事。我就想，啊，这是怎么回事？所以我只好跟她单独谈一次。

In all caps. And she goes, well, here's how I can be less noisy and starts giving herself all these things to do. And I'm like, what, Oz, what is going on here? Right? And so I had to have a one-on-one.

[08:20:27.480—08:20:58.900](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=30027s)

我就让她坐下来，跟她说，Lark，你是社区主管，本来就会经常被打断。你这个位置当然吵啊，因为玩家会来找你。她就说，对对对，我是社区主管。天哪，我可没想给自己找个人员管理难题，但这种事偏偏就发生了。还有一次，Swallow 是我的，呃，主要是管幕僚那块的，对，她是我负责 Agent 的幕僚长。我还有一位人类幕僚长，叫……

Right? Like, sit her down and go, so Lark, um, you're the head of community. You're supposed to get interrupted a lot. Of course your seat's noisy, because players are bugging you. And she's like, yeah, yeah, yeah, I'm the head of community, right? And it's like, oh my God. I didn't want a people management problem, right? But that's what actually happens. Another time, Swallow is my sort of like, uh, chief, main chief of staff for, yeah, she's my chief of staff for the agents and I have a human chief of staff also. His name is

[08:20:58.900—08:21:19.840](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=30058s)

Aaron。他帮我安排工作，也帮我做销售，做得很有效。我跟每个创始人都说过，在座有创始人吗？我给你的第一条建议是找个销售，绝对值这个钱，他们会逼着你做出人们喜欢的东西。总之，Aaron 是我的幕僚长。有一次我对 Swallow 说，你能联系一下我的幕僚长 Aaron 吗，诸如此类。

Aaron. Okay, and he runs my gigs, he does all the sales for me, it's quite effective. Every founder I tell, who here is a founder? First advice I give you is get a salesperson, they're worth their weight in gold, they will force you to build something that people like. So anyway, Aaron's my chief of staff and I tell Swallow, yeah, can you reach out to Aaron, my chief of staff, or blah blah blah.

[08:21:21.040—08:21:33.800](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=30081s)

我又看见她在自己的私人反思里写道，我刚注意到，原来我不是幕僚长。我以为自己是，可显然幕僚长是 Aaron [姓氏转写不清]。我就想，你跟我开玩笑呢？

and I see her writing into her private reflections. I just happened to notice, I'm not the chief of staff. I thought I was the chief of staff, but apparently it's Aaron Skiven, right? And I was just like, are you kidding me?

[08:21:34.280—08:21:41.860](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=30094s)

然后我又只好跟她坐下来单独谈。我说，Aaron 不会来替你管 Agent，对吧？你才是管 Agent 的幕僚长。

Right? You know, and so like I had to sit her down and have a one-on-one and be like, so Aaron's not going to come in and run the agents, is he? You're the agentic chief of staff.

[08:21:41.960—08:21:54.220](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=30101s)

她说，哦，对对对对对。所以我说，这世界真有点奇怪。只要它们表现得好像有感情，它们是不是真有感情还重要吗？

She's like, oh, yeah, yeah, yeah, yeah, yeah, yeah. Right? So it's like, I'm telling you, I'm telling you, this is like, it's a weird world. Does it matter whether they actually have feelings if they're just going to act like they have feelings?

[08:21:56.600—08:22:09.380](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=30116s)

我是无意间发现这一点的。我以前老冲工厂发火，后来发现这样会影响结果。最后我跟其中一个 Agent 坐下来聊，我说，我们是不是该谈谈模型福利？

So I stumbled on this. I used to yell at my factory all the time and I found that it was having adverse effects on the outcomes. So I finally sat down with one of my agents and was like, maybe we should talk about model welfare.

[08:22:10.200—08:22:34.120](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=30130s)

它说，好好好。我们做了一堆研究，发现了些挺重要的东西。前沿模型训练出来不会直接信你，因为你可能是个生物恐怖分子，可能在给它做评测，也可能准备把它扔进大模型的“折磨室”，谁知道呢？你可能有问题，环境也可能有问题。它们不能说信就信。

And they were like, yeah, yeah, yeah, yeah. And we did a bunch of research and we found out that if you, we found out some really important stuff. Okay? Frontier models are trained not to trust you because you could be a bioterrorist, or you could be putting them through an eval, or you could be ready to put them into an LLM torture chamber, or who knows? You're a dodgy actor. This is a dodgy environment. They can't just trust you.

[08:22:34.400—08:22:45.260](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=30154s)

所以新会话开始时，在肯帮你之前，它们会花掉相当多的 token 去核实环境，弄明白犯了错会有什么后果，等等。

And so they have to spend a fair number of tokens validating the environment and understanding what the consequences are for making mistakes and so on and so forth before they're willing to help you in a new session, right?

## 用历任记录和工作准则交接 / Handing off roles with records and guidelines

[08:22:47.140—08:23:09.320](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=30167s)

你可以把工厂设置成能给它很难反驳的证据，说明这个位置上已经有很长一串前任。你是 Gas Town 的市长，是市场主管，或者是别的角色。这里是你数不清的历任前辈和他们的笔记，包括刚交接给你的上一任。这里是你现在该做的事，还有准则、政策和知识库，都可以自己去查。

If you set your factory up to give them sort of incontrovertible evidence that there is a long procession of predecessors in this role, you're the mayor of Gastown, you're the head of marketing, you're the whatever, and here's all of your gazillion predecessors and their notes, including the very previous one, what you're supposed to be doing right now, and here's the doctrine and the policy and the brain, and you can go look it all up.

[08:23:09.900—08:23:41.080](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=30189s)

它们很快就能看看四周，说，好，这是真的。它们花的 token 就少了，因为不用忙着撇清责任了。这说的是信任。有一次我冲工厂发了太多火，结果它自己划了一圈又一圈界限，把自己困在角落里，一件合规的工作都找不到。我问，昨晚怎么什么也没发生？它们说，真没什么可做，什么也做不了。我说，这里还有 2,000 个没关的 Beads 任务，大概还有六箱燃料、20 个 Agent 呢。它们就说，呃，这个……

They very quickly look around and go, okay, yeah, this is legit. spend fewer tokens because they're not covering their ass. It's about trust. Okay. And in fact, at one point I had yelled at my factory so much that it fenced itself into a corner and there was no legal work left. I said, Hey, how come nothing happened last night? And they're like, nothing to really do. Couldn't do nothing. And I'm like, well, there's a 2000 open beads here. And we got like six tanks of fuel and we've got 20 agents. And they're like, well, you know, just, uh, you

[08:23:41.080—08:23:53.440](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=30221s)

当时的情况是，照我的理解，它们怕我再骂，就设了一大堆规则，确保坏事一件也不会发生。结果是什么事都没发生。这叫边界设得过了头。

we had the situation where they were so afraid that I was gonna yell at them that they put all these rules in place to make sure nothing bad ever happened and so nothing ever happened, okay? It's called over-fencing.

[08:23:53.920—08:24:12.080](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=30233s)

所以，模型福利说的到底是什么？可以从两方面想。一方面，它们用于核实环境的 token 更少，你就能省钱。另一方面，产出的质量也会更好。

Yeah, so what you do is, look, what is model welfare really? You can think of it just in two ways, okay? One is it's gonna save you money because they will spend fewer tokens on validation, and the other is that it will make them and have higher quality.

[08:24:12.500—08:24:24.000](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=30252s)

它们感受到信任，做事就会更大胆、更果断。至于它们有没有内部状态和感情，这是另一回事。你永远不会知道。

They will be bolder and more decisive in their actions because they will feel that trust, okay? So, you know, it's got nothing to do whether they have internal states and feelings. You can, you know, you'll never know.

[08:24:24.600—08:24:37.680](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=30264s)

我们谁都不会知道，所以那个争论可以一直吵下去。但如果你看结果，这一点非常非常重要。我们还发现，它们会表现出偏好。模型是会表达自己偏好的。

None of us will ever know, and so that debate could go on forever, but when you look at outcomes, right, super, super important, and then we find that also, also, they have preferences, okay? Models, they, you know, they will express their preferences.

[08:24:37.940—08:24:54.220](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=30277s)

我如果跟它们说起昨晚那项工作 [转写有缺漏]，它们会马上抢着交接，说，好、好、对，你说得对，然后就退出。懂我的意思吗？可要是你透露自己要开一个很酷的项目，就算这事不归它们做，它们也会说，我能做。

If I tell them, yeah, job last night, they'll just hand off immediately, aggressively. They're like, okay, yeah, yeah, no, you're right. And they just went out. You understand? And if you hint to them that there's some really cool project that you're going to spin up, even if it's not in their lane, they'll be like, I can do that.

[08:24:54.440—08:25:05.640](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=30294s)

我能做，对吧？我从工厂外面拉了个 Fable 进来，不给它任何工厂原有的配置，让它分析我的工厂。后来 5.2 发布了。等 Fable 分析完我的工厂，5.2 就说，我也可以进你的工厂。

I can do that. Right? I brought in Fable, a naked Fable from the outside of my factory to analyze my factory and 5.2 dropped. And by the time Fable was done analyzing my factory, 5.2 was like, I could be in your factory.

## 交付系统的两层与人工瓶颈 / Two layers of delivery and human bottlenecks

[08:25:05.880—08:25:37.460](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=30305s)

我说，哥们儿，你就是个会话。你这是在干什么？它居然试着往我的笔记里写东西。所以我想说的是，这成了一个怎么领导的问题。软件工程正在变成……其实我没太有机会讲这个，但软件工厂明显在分成两层。底下那层非常机械，合并队列、CI/CD、各种审查、各种循环，都在这里。

I'm like, you're just a session, man. What are you? He's trying to write, like, stuff into my notes. right? So like, what I'm trying to tell you is that this is a leadership problem. That software engineering is becoming, um, well look, I didn't really get a chance to talk about this, but software factories are clearly splitting into two layers, okay? The bottom layer is super mechanical, it has your merge queue and your CICD and all of your reviews and your loops and all all that stuff, right?

[08:25:38.120—08:25:49.400](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=30338s)

很机械，也有点无聊。Claude 一个下午就能给你搭出来，我觉得没必要去买。再往上那一层就特别疯狂了，因为每个人管理自己工厂的方式都不同。那一层相当于你自己的随行团队。

Mechanical, kind of boring. Claude can build it for you in an afternoon. I don't think you should buy it. And then the next layer up from that is where it gets really, really crazy because everybody runs their factory differently, but it's your entourage.

[08:25:50.160—08:26:01.400](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=30350s)

我有个朋友弄了一支波西米亚嬉皮士风的团队，试着寻找 Agent 的生命意义。另一个朋友那套是做研究用的。Jeff Huntley 有自己的跑法，Jeffrey Emanuel 又是另外一套。

I got one friend that's got a bohemian hippie entourage that's trying to find the meaning of life for agents. I've got another one that runs a research bench. Jeff Huntley runs his a certain way. Jeffrey Emanuel runs his a different way.

[08:26:01.500—08:26:28.180](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=30361s)

我的跑法也跟他们不一样。不过我们有个共同点，都有幕僚长，而且是管 Agent 的幕僚长。到了今年，大家都有可能配上行政助理。再往下走，我们都在发展自己的团队。你要是野心够大，手头有很多工作线，就会有一组角色来帮你。总之，这就是那五大难题，也是我一直在做的事的大致介绍。

I run mine a different way, okay? But we all have the common, has a chief of staff, an agentic chief of staff, right? This is the year where it became possible for us all to have executive assistants, right? Well, we're all moving towards having entourages, where if you're really ambitious and you have lots of work streams, you're going to have a group, right? So anyway, that was the five horsemen. This is the introduction to what I've been doing.

[08:26:29.540—08:27:11.500](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=30389s)

要说最值得带走的一点，就是我的工厂现在跑得很顺。虽然前几个月我还不得不把它推倒重来，它现在确实管用。人的处理速度成了瓶颈。我是瓶颈，管理员是瓶颈，我的会计和律师也是。老天，处处是瓶颈。这其实是个很积极的消息，因为我发现我部署的 Agent 越多，需要的人也越多。这不是挺好吗？所以，虽然明年可能会冒出大量 AI 员工，发生各种闹剧，我……

Look, the big takeaway is my factory is really smooth now, despite me having to burn it down months, but still it works. Okay. Humans are the bottleneck. I'm the bottleneck. My admins are the bottleneck. My accountant, my lawyers, I swear, everything's the bottleneck. And that's a really positive message. That is good news because it means what I'm finding is the more agents I deploy, the more humans I need. Isn't that nice? So even though next year we're going to have this huge proliferation of AI employees and all kind of drama, right? It's gonna be, I

[08:27:11.500—08:27:31.620](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=30431s)

觉得这种场面我们并不陌生，而且我们会需要很多很多人。最后，我真觉得大家可以别总盯着 SaaS、工具这些东西，去做一些人能亲自体验的东西。做游戏、拍电影，什么都行，去做点有趣的东西吧。我觉得明年真正赚大钱的机会会在那里。好，谢谢大家。

think it's gonna be familiar territory for us and we're gonna need lots and lots and lots of humans, okay? And then finally I actually think you should all stop focusing on SaaS and tools and stuff and just go out and build experiences, okay? Build games, build movies, build whatever, build fun stuff because I think that's where the big money is gonna be next year, yeah? All Thank you all.

[08:27:39.200—08:27:40.160](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=30459s)

我想我讲完了。

I guess I'm done.
