# Workday 怎样把文字补全变成行动补全？

Scott Roberts

中文校译与英文机器转写

中文为校译。英文栏保留选用的机器转写，可能有听写误差。带时间戳的转写原文可在下方来源说明打开。

依据 AI Engineer Code Summit 主回放第 21 场（06:24:47–06:36:45）的 36 段中英资料。官方英文题名为 Autocomplete for Actions: System One from the UI to the DB。英文沿用机器转写，中文保留校译标记。讲者明确表示两项原型使用合成数据，当时尚未投产。准确率和耗时来自讲者介绍的实验和现场演示。

[英文音频转写原文（带时间戳）](transcript-original.txt)

## 哪些步骤只需要一次判断 / Where a single decision is enough

[06:24:47.660—06:25:06.540](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=23087s)

大家好，我保证我是最后一个来给 Jev 助阵的。我叫 Scott，来自 Workday，接下来讲讲我们怎样试用 Jev，在人力资源和财务任务上做一些新的尝试。

Hey everyone, I promise I'm the last person on the hype train for JEV. I'm Scott, I'm from Workday and I'm going to go through how we're experimenting with Jev, to drive new innovations in HR and finance tasks.

[06:25:07.560—06:25:22.980](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=23107s)

挺有意思的。Workday 的工具有 11,000 多家机构在用。我们处理的问题很多可以分成两类。一类是用户需要很快完成的操作。

Exciting stuff. So at Workday, we have over 11,000 different organizations that use our tools. And a lot of the problems that we deal with break down into two different categories. So one is very quick actions they have to take.

[06:25:23.100—06:25:37.660](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=23123s)

比如，我想查工资，或者请一天假。另一类是我得钻进一大堆数据里，想办法弄清发生了什么。跟在座许多公司的做法一样，我们也在尝试把 Agent 工作流用在这些任务上。

I want to see my pay. I want to ask for a day off. The other ones are, I have to dive into a ton of data, try to figure out what's going on. And like many of your companies as well, we're trying to put agentic workflows around this.

[06:25:38.200—06:25:52.240](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=23138s)

拿一个非常简单的 Agent 循环来说。先收到用户请求，决定该做什么，调用工具，判断做得怎么样，再不断重复，直到得到结果。

And so if you look at just a very simple agentic loop, we have a user request, we try to decide what to do, we're running tools, we're judging did we do a good job, and then over and over again until we finally get a result.

[06:25:53.640—06:26:14.100](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=23153s)

这里的问题是，每一步都在调用大语言模型。这带来两个主要问题。第一，用的智能太多了。用 System One 和 System Two 的说法，就是每一步都在进行缓慢、深思熟虑而且很贵的推理。

Now one of the problems here is that on each one of those we're doing LLM calls. and there's two major problems with that. So one is there's too much intelligence. So if we look at the system one versus system two thinking, we're doing a lot of slow, deliberate, very expensive thought processes at each one of those steps.

[06:26:16.120—06:27:02.180](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=23176s)

第二，工具用错了。很多时候，大语言模型就像一把到处找钉子的锤子。我们想弄清自己究竟需要什么，因为大语言模型显然没解决这个问题。想要的是快、聪明、容易用、能泛化，而且非常便宜的东西。从代码角度看，Jev 这类模型能给我们什么？说到底就是条件判断。发生了这件事，接下来要做什么？这几个分支里，我想看哪一个？你们已经看到……

Another problem is it's just the wrong tool for the job. So LLMs a lot of times are just a hammer looking for a nail. And we want to figure out like need because clearly LLMs are not doing it. So we want something that is fast, smart, easy to use, it's generalized, and it's very, very cheap. So when we look at like from a code perspective, you know, what are we really looking at from a GEV-like model? It's really just a conditional. If this happens, this should happen? Which one of these cases are the ones that I want to explore? And you know, you've seen it

[06:27:02.180—06:27:27.480](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=23222s)

不少演讲提到过，Jev 提供了做这些事的基本操作。一种是判断属于这边还是那边，以及概率有多大。一种是从多个类别里选出适合这个对象的类别。还有一种是评分，基本就是算概率后排序。这个前面也讲过。

among many of these presentations already, but JEV has the primitives to allow us to do this. There's the probability. Is it, you know, this or that? And what's the probability? What are the different categories that this particular thing could fall into? And then you have the scoring mechanism which is basically probability and sorted. So this has been brought up as well.

## 从分类器到带上下文的判断 / From classification to decisions in context

[06:27:27.680—06:27:45.300](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=23247s)

我刚看到 Jev 时想，我们已经有分类器了，我也做了很久，这到底有什么不同？就像前面好几位讲者说的，用普通分类器时，我要先想清楚黄金数据集是什么。

My first thought when I saw the JEV models was, well, we already have classifiers. I've been doing this for a long time. How is it actually different? And as many of the speakers have talked about already, with classifiers, I need to figure out what's my golden data set.

[06:27:45.300—06:27:59.120](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=23265s)

然后训练它。来了新数据，又得反复迭代。Jev 开箱就能用。我们把问题输进去，它给出分类，基本没做别的准备就能适配我们的问题。

I have to train it, new data comes out, I have to iterate over and over. With Jev, just out of the box, it just worked. We plugged in our question, we classified it, we didn't really have to do anything, it generalized to our question.

[06:28:00.480—06:28:13.040](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=23280s)

所以我们把它用在前面几位讲者说过的许多场景里，比如做路由，这是最典型的例子。还可以让它当裁判，判断刚才这一步是否奏效。

And so we started using it for a lot of the use cases that you've seen from some of the presenters already. So we use it for routing, that's kind of the canonical example. Figuring out, did this step work as a judge?

[06:28:13.900—06:28:32.700](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=23293s)

我们也看简历，判断某个人有没有做机器学习工作的资格。我想再举一个过度简化的例子。没人专门教过 Jev 鱼是什么，我们真问了它一个问题，鱼算宠物吗？

We looked at resumes, is this person qualified for ML work? And I want to do kind of an overly simplified example as well. So no one taught Jev what a fish is. And so this is actually a question we asked, like is a fish a pet?

[06:28:32.860—06:28:53.640](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=23312s)

答案五五开。有时算宠物，有时不算。如果碰到这种情况，就得想接下来怎么办。也许给它一点上下文。鱼缸里的鱼算宠物吗？过 20 毫秒，我就能再问一遍。好，挺不错。那我盘子里的鱼算宠物吗？

Well, 50-50, might be a pet sometimes, might not be. And so if I ran into this, then I have to figure out, do next? Maybe I can give it some more context. Oh, is a fish in a bowl a pet? You know, and after 20 milliseconds, I can ask this again. All right, that's great. Oh, is a fish on my plate a pet?

[06:28:53.900—06:29:15.400](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=23333s)

显然不算。几秒钟就能开箱得到结果，也没为这个例子专门训练。好，下面看我们在 Workday 做的几个演示。先说明一下，演示用的是合成数据，你们的简历和工资记录都没有拿来用。

Clearly not. So this is something that wasn't trained out of the box in seconds. It just worked. All right, so now on to some of the demos that we've done at Workday. So just a caveat on some of these. It's not real data, so we're not using any of your resumes or payroll data.

## 把输入中的意图变成可操作卡片 / Turning intent into action cards

[06:29:16.000—06:29:44.680](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=23356s)

这些功能目前没有投产，以后是否会投产也未确定。这句话是法务让我说的。好，进入演示。先看自动补全。它会预测你想问什么，也就是补全问题，但没有帮你找到答案。随着你输入更多内容，它会猜，哦，这个人是不是想请一天假？

These are also not in production now and may or may not be in the future. So that's something our legal asked me to say. So let's get into some of the demos. All right, so starting with autocomplete. So autocomplete starts to predict what you're trying to ask. It's just predicting the question. It's not helping you get to the answer. So So as you start to type more, it's going to guess, like, oh, I want to figure out if this person wants to take a day off work.

[06:29:44.800—06:29:57.200](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=23384s)

好，你猜中了问题，可我还没得到答案。所以我们想从预测一个词或下一段代码，走到真正帮你把任务完成。

Great, you've guessed the question, but you really haven't helped me get to the answer. So what we want to do is move from just predicting the word or the next block of code and actually help you finish the task.

[06:29:57.860—06:30:15.440](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=23397s)

最好通过演示来看。我们从预测你想说什么，改成预测你想做什么。希望视频能放出来。来了。好，我下周想请假。

So this is best shown with a demo that we have, where we go from predicting what you want to say to predicting what you want to do. Hopefully the video plays. There we go. All right, so I need to take time off of next week.

[06:30:15.640—06:30:31.440](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=23415s)

我一开始输入，Jev 就在后台判断，我还掌握了哪些上下文？根据新输入的信息，可以怎么调整界面？用通用大语言模型，我们做不到这样。

And as I start to ask this, Jev is actually figuring out under the hood, okay, what more context do I have? How can I adjust this UI based on the information that I'm getting? This is not something that we could have done with an LLM.

[06:30:32.620—06:30:48.660](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=23432s)

用户输入时，这个判断就一直在循环。你用不着打开 Agent 再说，能去查查我拿了多少工资吗？你可以直接在搜索里问，我上个工资周期拿了多少钱？

We're doing this in a loop while someone's asking. You shouldn't have to go in and ask an agent, hey, can you go find out how much I was paid? What you can do is just in the search, say, what was my pay last period?

[06:30:49.840—06:31:09.080](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=23449s)

随即弹出一个界面，可以取消隐藏，看到上期工资。很简单，直接就能操作。再试试约会。我知道自己想安排一场会议，想约在下周五。

Pops up an interface, allows you to unhide it, see what your pay was in the last period. Very simple, gets you to the action. Book a meeting. So I know that I want to book a meeting and I'm gonna wanna do it for next Friday.

[06:31:09.660—06:31:28.220](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=23469s)

讲者口述定在周五下午两点，06:31:12 的画面草稿显示周五 3:00–3:30。他接着要求把老板 Logan McNeil 加入预填会议。这个例子里最后一个操作是找人，此外还有很多。

Let me do it at 2 p.m. Oh, I wanna do it with my boss. Make sure that I get my boss on this, Logan McNeil. There we go, meeting's booked. And then a final one that we have just for this example, but there's many more, is finding a person.

转写校注。The spoken time is Friday at 2 p.m. The on-screen meeting draft at 06:31:12 shows Friday, 3:00–3:30. The demonstration shows a draft.

[06:31:28.780—06:31:43.160](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=23488s)

比如我可能只知道一些语义信息，要找负责公司某个部门的人。也可以问，Ashanti 是谁？我想联系她。信息弹出来，点一下邮件就行了。

So in this one, I may have some semantic knowledge, like find the person who owns this part of the organization, or just like who's Ashanti, I want to contact her, pop it up, click on email, good to go.

## 选卡、补字段与回退 / Card selection, fields, and fallback

[06:31:45.660—06:32:04.180](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=23505s)

那么，后台发生了什么？因为 Jev 快而且便宜，我们可以跟着输入的节奏显示界面，就像边打字边补全那样。随着词一个个输入，我们就能判断意图，开始显示相应的界面。

All right, so what's happening under the hood? So because Jev is fast and cheap, just like a type ahead, we could start to render a UI on that same cadence. We can look at as the words are coming, of intent and start to render an interface.

[06:32:05.160—06:32:19.200](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=23525s)

做一百万次判断，大约是 20 美元。我们的做法有两个步骤。第一步，Jev 判断用户想做什么，再选出相应的卡片。

And we could do this at about 20 bucks for a million judgments. And the way that we're doing it is kind of twofold, or two parts, I should say. So first, Jev is picking the card, of saying, what's the intent?

[06:32:19.460—06:32:30.680](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=23539s)

找到能帮到你的那张卡片后，负责这个业务的团队就可以决定逐步问哪些问题，来把卡片上的信息填齐。大致就是这两步。

All right, there's a card that's gonna help you out, and then the team that's responsible in that domain then can decide what are the questions to progressively fill out that card. And so there's sort of this two-step process.

[06:32:31.640—06:32:41.800](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=23551s)

第一步是让用户找到入口，把合适的卡片显示出来。第二步是填好卡片，帮用户把想做的事办成。

The first step is getting people in the front door, getting the right card up, and then the second one is making sure that you fill in that card to help them accomplish the task that they're after.

[06:32:42.480—06:32:59.040](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=23562s)

合并任何卡片之前，我们都会跑评测，确保它不会跟其他卡片冲突。初步实验里有七张卡片，另有一个「继续聊天」选项。没有哪张卡片能解决问题时，就该允许用户继续聊。

Now, we have an eval on here before we merge any card. We want to make sure that it doesn't collide with any other one. And at least in our initial experiments, we've done seven cards or a just chat because it should, if there's no card to actually solve it, it should allow you to just continue chatting.

## 用 DuckDB 查询合成简历 / Querying synthetic résumés in DuckDB

[06:32:59.720—06:33:22.400](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=23579s)

我们做到了 96% 的准确率。好，下面说招聘人员的问题。这类任务并不快。招聘人员面前堆了几百份简历，得判断哪位候选人最适合当前要填补的岗位。

we were able to get 96% accuracy on that. Alright, so now onto the recruiter. So let's talk about the recruiter problem. Alright, so this is not like a fast task. It's something where a recruiter has a pile of hundreds of resumes and has to figure out who has the best resume to accomplish or fill the wreck that they're trying to fill.

[06:33:23.300—06:33:55.440](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=23603s)

先看我们过去会怎么做。先做嵌入，把向量放进向量数据库，再做一层检索，加一个重排序器，最后根据重排序的结果，决定让招聘人员先看哪些简历。一个有意思的地方是，Qwen 的重排序器［按发音暂记］看起来和 Jev 的处理过程相当像。用过的话，你可能也会发现这个相似之处。

Now, I first want to look at how we would've done this before. We would have done an embedding, put the vectors in a vector DB, then had a retrieval layer, then have a re-ranker, and then figure out based on the re-ranker which ones that we want to put in front of the recruiter. One interesting callout is the Quinn re-ranker looks surprisingly similar to the Jev process as well. That's kind of an interesting corollary if you've used that one before.

[06:33:56.300—06:34:11.540](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=23636s)

换成 Jev 以后，我们基本可以拿掉所有嵌入步骤。不用训练模型，不用做嵌入，也不用把东西放进向量数据库。我可以直接在数据库里跑一个函数。

But with Jev, we basically take out all the embedding steps. I don't have to train anything up. I don't have to do embedding. I don't have to put things in a vector database. What I can do is just do a function on my database.

[06:34:11.900—06:34:29.940](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=23651s)

把全部简历放进数据库，用自然语言查询，一条条遍历，再判断哪些符合条件。下面我演示的就是这个例子。

So put all the resumes into a database, use natural language to query it, iterate over every single one of them, and then just figure out which ones match my criteria. So I'll go into an actual demo of this exact same one.

[06:34:30.720—06:34:45.960](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=23670s)

这里是一条 SELECT 语句，查询的是 DuckDB。里面有个函数会调用 Jev，算出某个人符合条件的概率，然后得出分数，再按分数排序。

So here we have a select statement. And so this is against a DuckDB where we have a function that is going to call Jev to figure out what's the probability that someone matches this criteria. We're going to get it a score and then we're going to order by that score.

[06:34:46.160—06:35:20.500](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=23686s)

我先取大约 20 条。我再保证一次，这些都是假的。样本是偏机器学习方向的合成数据，所以要找做过欺诈、信任与安全相关工作的人，命中率高也不意外。但我们再看看，换个稍有挑战的问题。这些简历里很多都有 pipeline 一词。不管是数据流水线还是 AI 流水线，里面都有个 pipe。

Now I'm going to do about 20. And as I said, these are all fakes in here, I promise. And then here we see these are very ML focused synthetic data as well. So it's not a surprise that we would have very high hit rates against someone who's worked in fraud, trust, and safety problems. But let's look at it. Let's change this question. Let's be a little bit more adversarial on this one. So a lot of these resumes have the word pipeline in them. So whether Whether it's a data pipeline or an AI pipeline, a pipe's going to come out.

[06:35:20.600—06:35:35.820](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=23720s)

那就问，这个人有做水管工的资格吗？如果只用字面搜索，可能会捞出几份来。我们把问题交给 Jev，在这些机器学习简历里找一下，把返回上限减到五条。

So let's just ask, is this person qualified to do plumbing? If you were going to just do a lexical search, it might pick up some of these. So we put it into Jev and asked, of all these ML resumes, let's trim the limit down to five here.

[06:35:36.480—06:35:57.920](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=23736s)

跑起来。可以看到，这几条的概率都非常低，我们几乎肯定会把它们排除。也看看速度。总共扫了 117 条记录，实际经过 2.3 秒。遍历全部记录的这次查询，几乎没花钱。

Go ahead and run it. And we can see that very, very low probability on these. that we would almost definitely throw out. And you could see the speed. So we went over 117 records. We had 2.3 seconds of wall time and spent almost nothing on this query to just iterate over everything.

## 两类任务的设计思路 / The design behind the two examples

[06:35:59.340—06:36:21.860](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=23759s)

Jev 确实让我们的做法变了。每当我们觉得某处太贵或太慢，就会重新想想能不能把 Jev 放进那个环节。总结一下，刚才讲了两类应用。第一，在哪些地方可以迅速判断意图，让用户直接开始办事？

So Jev really kind of changed the game for us because every place where we're thinking either this is too expensive or it's too slow, we thought of new places to inject Jev into our pipeline. And so just to summarize, the two areas that I went through are one, where can we decide very quickly and get to the intent and get the person on their way?

[06:36:22.360—06:36:44.700](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=23782s)

第二，怎么减轻那些需要深入查看大量材料的工作？怎样替客户先把不相关的内容筛掉？希望这些例子能给你一些启发，回到自己的公司后，也想想用 Jev 可以做什么。我时间到了，非常感谢。

And then the second one is to cut down on some of the really deep work. How do we filter those out for our customers? And so I hope that this gave you a little bit of insight into the things that you can take back to your own companies and imagine the things that you can do with Jev And that's my time. Thank you very much.
