# 精简 Agent 运行框架之后，应该测什么？（节选版）

Philipp Schmid

中文校译与英文机器转写

中文为校译。英文栏保留选用的机器转写，可能有听写误差。带时间戳的转写原文可在下方来源说明打开。

依据大会主回放第 09 场的 38 段中英资料。官方题名为 I deleted 90% of my harness (And It Got Better)。开场音频缺失，现存正文从 02:21:16.420 到 02:36:43.560。英文为机器转写，中文沿用既有校译。结果和产品数据均按讲者当时的演示理解。

[英文音频转写原文（带时间戳）](transcript-original.txt)

## 现存回放的起点与 Gemini 发布回顾 / Surviving opening and Gemini announcements

[02:21:16.420—02:21:30.920](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=8476s)

……运行框架需要的代码就会更少。[开头缺失] 回顾一下 Google DeepMind 过去六个月做的事，五月举行了 Google I/O，今天是 11 月 11 日。差不多一直在不断发布新东西。

And harnessing the less code we need. And if we look at what we have been doing at Google DeepMind for the last six months. So at May, we had Google I.O. And today, it's November 11. And we have been shipping relentlessly, basically.

[02:21:31.300—02:22:06.320](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=8491s)

今天早些时候，我们宣布了第一个决策模型 Gemini Decision 1。昨天，我们开放了 Gemini 4 Carbon。回顾过去六个月、最近几周的进展……[转写有缺漏] 刚才已经说过，Gemini Carbon 现在可以用了。如果你订阅了 Google AI Ultra，可以在 Antigravity、Gemini 应用和 AI Studio 里用。Carbon 在 Cursor Bench〔基准名按转写辨读〕和 Perplexity 基准测试上都排第一。Google 内部也已经大量使用。更让我兴奋的是……

Just earlier today, we announced our first decision model with Gemini Decision 1. Yesterday, we made Gemini 4 Carbon available. And then if we just look at the last six months, few weeks. As already said, Gemini Carbon is now available for you. So if you are a Google AI Ultra subscriber, you can use it in Antigravity, you can use it in the Gemini app, you can use it in AI Studio. Carbon is number one on the Curso Bench eval and also number one on the Perplexity benchmark. And internally at Google, we have been using it already a lot. And much more exciting is

[02:22:06.320—02:22:44.840](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=8526s)

……差不多一小时前，我们用新的 Decision 1 模型推出了 Gemini Decisions API。它与讲者提到的另一类模型相似。[例子名称转写不清]它可以接收 Gemini 已支持的所有输入，也就是多模态。文本、音频、图片、视频和 PDF 都能直接传，每个请求最多可以带 1,000 个问题。把网络开销都算上，平均端到端延迟是 150 到 250 毫秒，价格是每百万 token 10 美分。那么模型怎样学会做好 Agent 的工作？这里大致画出了……

that I'm happy to share that we launched the Gemini Decisions API roughly one hour ago with our new decision one model. So it's a similar model to Jeff. You can provide all of the existing Gemini inputs, meaning it's multimodal. So you can provide text, audio, images, video, and also PDFs natively, and then provide up to 1,000 questions in a single request. The average end-to-end latency, including all of the network overhead, is between 150 to 250 milliseconds, and it costs 10 cents per 1 million tokens. So how do models get good at agentic work? And that's a rough overview

## 按结果评分与两种调用路径 / Outcome-based scoring and two tool paths

[02:22:44.840—02:23:08.300](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=8564s)

……后训练的过程。我们有一个任务、一个模型。模型有一套工具，还有一个计算环境，最后有一个验证器。模型尝试解决任务，使用各种工具，然后我们根据验证器的打分更新模型。整个过程中没人告诉模型该用哪些工具，它基本上只接收奖励反馈。

on how post training works. So we have a task, we have our model, the model has a certain set of tools, and then we have some kind of compute environment, and at the end we have some verifier. And the model tries to basically solve that task, use different tools, and then based on the score from the verifier, we update the model. But no one is telling the model which tools to use, and basically it only receives that reward feedback.

[02:23:09.280—02:23:26.960](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=8589s)

来看模型用工具完成同一任务的两种方式。A 路径有专门控制文件系统的工具。大家可能都用过编程 Agent，也见过读文件或者编辑文件的调用，这是一种做法。

So if we look at two examples on how a model can do a certain task with tools, we have the path A, where we have dedicated tools for file system control. So you all have probably used coding agents and you have seen a read file call or an edit file call, so that's one way of doing it.

[02:23:27.060—02:23:58.920](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=8607s)

另一种做法是用一个内联 Bash 脚本完成所有改动。对同一个代码仓库做同样的修改，左边大概需要十轮，右边只用 Bash，大概两轮。token 用量也反映了这个差异。现场用「约十倍」概括差距。02:23:43 原图对这一题估算约 60k 与 7k 输入 token，两条路径完成的是同一项任务。说到我的实验……

And the other way of doing it would be just using a single inline bash script for all of the changes. side, we roughly need around 10 turns to make the same changes to a coding repository compared to the two turns on the right side just using bash. And it also reflects in the amount of tokens we need. So the left path takes around 10x more tokens than the right path, and it's doing the exact same thing at the end for the model to achieve that task. So in my experiment,

## 从多工具工作流到单一 Bash 入口 / From many tools to a Bash interface

[02:23:58.920—02:24:12.520](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=8638s)

……大约每隔半年，我会从头搭一个新的编程 Agent 运行框架。每次都问自己，完成同样的任务到底需要多少框架代码？哪些功能现在只会给模型增加负担，已经用不着了？

meant every roughly six months I try to build a new coding agent harness from scratch. And I always ask myself, OK, how much of the harness do I really need to achieve the same task? And what is overhead to the model and we no longer need?

[02:24:12.780—02:24:35.460](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=8652s)

看看 2025 年的编程 Agent 框架，大概有十个、十五个甚至二十个工具。有专门编辑文件的工具，也有做计划、列待办的工具。系统提示词里还有很多专门的规则，告诉模型什么该做，什么不该做。

So if we look at the coding agent harness, which from 2025, we had roughly around 10 to 15 to 20 tools. We had dedicated tools for file editing. We had dedicated tools for planning, for to-do lists, and also we had a lot of dedicated rules in our system prompt which told the model what to do and what not to do.

[02:24:35.960—02:24:48.380](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=8675s)

当时当然是管用的，不过后来已经变了很多。我的第一次实验大概是两年前的二月，那时候还没有真正意义上的 Agent，主要是工作流。

And that worked, of course, but since then we made a lot of changes. So in my experiments, first one was done roughly now two years ago in February, where we did not really had engines. Right? We had workflows.

[02:24:48.560—02:25:03.380](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=8688s)

当时基本是预先定好的步骤。RAG 应用很流行。有规划器，会搜索，找到资料后就生成答案。接下来，最早的一批 Agent 出现了，有许多不同的工具，分别做各种细粒度的操作。

We basically had predefined steps. RUG applications back then were very popular. We had the planner. We had search. was found, and then we generated an answer. Then we started to see our first agents. We had many, many different tools for all sorts of fine kernel actions.

[02:25:04.380—02:25:15.540](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=8704s)

然后到了编程 Agent，也就是刚才说的十到二十个工具。在最近一次实验里，我想看看，如果只给 Agent 一个工具，会发生什么？

And then came the coding agents, where we had those roughly 10 to 20 tools. And now in my last experiment, I tried to see, OK, what's going to happen if I provide only one tool to my agent?

[02:25:16.160—02:25:29.800](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=8716s)

结果让我挺兴奋。这个单工具 Agent 的运转方式跟其他 Agent 一样，只是手里只有一个工具。模型可以用它做各种任务。

And the outcome was pretty exciting to me. So this one tool agent works the same way as every other agent, except that it only has one tool, and the model can use that tool for any sorts of tasks.

[02:25:30.020—02:26:00.920](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=8730s)

Bash 工具很简单，在一个独立、干净的子 shell 里运行，支持命令参数。我还加了一个描述字段，方便让用户看懂模型究竟在做什么，另加了一些异步参数。运行 Bash 命令时，如果超过参数设定的毫秒数，这次调用会先返回，模型拿到一个本地文件句柄，以后还能查……

And the bash tool is very simple, so it runs in a separate clean subshell, and it supports the command argument. I also added a description so that it's nice and easier to display to the user what the model is actually doing, and then some async parameters. So basically when the model runs a bash command, the parameter tells the model, okay, if it is the command longer running than this milliseconds, it's being resolves, and the model receives a local file handle where it can look up later, okay, if the

[02:26:00.920—02:26:25.180](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=8760s)

……进程是不是还在跑。做各种 Web 开发的时候，这一点很有用。一个 Bash 工具其实能应付我们使用的各种情况。长任务可以从前台启动，然后自动移到后台。模型拿到一个文件句柄。它已经能用 Bash，如果把日志写到文件系统，就可以读取持续输出的日志。

process is still running. That's very interesting if you do, like, all sorts of, like, web development, for example. And the single bash tool actually works for all of the things we are using, so we can have long-running work where we can start on the foreground and then automatically move it to the background. The model receives some file handle, and since it has bash available, If we store it to a file system, it can read the logs which are being streamed.

[02:26:25.340—02:26:41.160](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=8785s)

如果 Agent 本身就是个 CLI，它还可以用 Bash 调用自己。既然能调用自己，基本就不需要专门做一个子 Agent 工具。规划工具和记忆工具也不用专门做，因为已经有文件系统了。

If the agent itself is a CLI, it can call itself using bash, so there's practically no need to create subagent tools for it because it can invoke itself. And then, of course, we don't need dedicated planning or memory tools because we have our file system available.

[02:26:41.380—02:27:17.620](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=8801s)

给模型一些上下文，它就能用文件系统和 Bash 跟踪自己的工作。当然，工具之外还有系统提示词。跟工具一样，系统提示词也在变。图上每个点大约代表 100 个 token。可以看到，2025 年年中，编程 Agent 的每次请求都要带上大量上下文。这方面后来也改善了。还是同样的问题，要让 Agent 顺利完成任务，真正需要提供什么？过去写进去的……

We can provide some context to the model so the model can keep track of its own work with the file system and using the bash tools. tools. In addition, of course, to our tools, we have system prompts. And similar to tools, system prompts evolved over time. Every dot here is roughly around 100 tokens. And you can see that coding agents mid-2025 had a lot of context we needed to send in every request. Of course, this also improved. And similar story here is like, okay, what do I really need to provide to my agent to make it successful and work? And what of all of

## 比较得分、token 和成本 / Comparing scores, tokens, and cost

[02:27:18.240—02:27:47.380](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=8838s)

……信息和细节，有多少如今已经在模型里了？运行框架有多少在帮忙，有多少在添麻烦？为了弄清楚，我用不同工具评测了很多种框架。这里举个 Gemini 4 Carbon 的例子，任务来自 DeepSWE。看看给它我原来那套编程 Agent 的工具，包括读取……

information and details we had in the past are now basically part of the model. So how much of the harness helps and how much is in the way? And to find that out I was running a lot of different evaluations of a lot of different agent harnesses with a lot of different tools. And one example I like to show here which was done with Gemini for Carbon from an eval task from deep SVE is like okay what happens if I provide my existing coding agent tools with read,

[02:27:48.180—02:28:01.020](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=8868s)

……搜索、grep，对比只给 Bash，会有什么差别。上面那条线很明显。同样的任务，用了更多 token、更多轮次，花的时间也长得多。

search, grab, and my bash only tool. And I think you can pretty clearly see that the top line is taking a lot of more tokens, a lot of more turns, and a lot of more times to achieve the same task.

[02:28:01.240—02:28:19.420](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=8881s)

还有个明显的地方，开始时模型可以并行读取。但一到修改代码，它就又变成一轮只做一处编辑，当然会多花很多时间和 token。

And what stood out really well is that, okay, reading is done in parallel in the beginning, but as soon as we start going into making code changes, we see that same behavior that the model is making turn by turn a single edit, which of course consumes a lot of time and a lot of tokens.

[02:28:20.160—02:28:55.600](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=8900s)

放到更大范围里又是什么样？我自己有一套大约 350 个任务的评测集，涵盖编码、知识工作和终端命令。这里都用 Gemini 4 Argon，分别跑四种 Agent 运行框架。其中一种只用 Bash。不过，只有 Bash 时还有个问题，图片怎么读？我不能用 `cat` 读截图 PNG，因为返回的是二进制，会占满上下文，模型还看不到图片。所以我加了一个查看媒体的工具，它能……

So how does this look at Protoscope? So I have my own eval set of around 350 tasks for coding, knowledge work, and terminal commands all run with Gemini 4 Argon here and four different agent harnesses. One is the bash only harness and then okay with bash we still have that issue on how can I read images, right? If I'm, I cannot cut screenshot.pingey, it would return a binary, and it will fill my context, and the model cannot see the image. So I added a view media tool, which basically returns

[02:28:55.600—02:29:28.960](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=8935s)

……以模型看得懂的方式返回图片。还有两套运行框架，配了操作文件系统的结构化工具。如果只看得分这一列，几套框架看起来基本一样。只按得分评估模型和框架，选哪套好像都无所谓。当然，分数还是有点波动，可我每个任务只跑了一次，所以可能只是噪声，也可能是……

the image in a way the model can see. Then we have two different agent harnesses with structure tools for file system operations. And if we just look at the score column, all of them look roughly identical, right? So if we would just evaluate our model in an ancient harness looking at the score, it would basically not really matter which one of those we would pick. Of course, there's a slight variance in the scores, but I only ran each task one time, so it might be just some noise or maybe

[02:29:28.960—02:30:01.020](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=8968s)

……别的原因。每套框架最好多跑几次。不过目前分数看着差不多。那该怎么选框架？大家展示评测时大都只讲得分。但如果看 token 那列，尤其是每个任务花多少钱，结果就不一样了。02:29:13 的表格显示，Bash 加媒体查看每题约消耗 3.82M token、缓存命中率 89%、成本 2.33 美元。纯 Bash 是 5.30M、72%、5.33 美元。两套结构化工具分别是 5.19M、76%、4.68 美元和 5.01M、84%、3.01 美元。

something else, so you would probably need to run a few more samples per harness, but the score looks roughly the same. So how would we now know which harness should I choose? If we just look at all of the evals being shown, it's always mostly about score. But if we look at the token column, or even more at the dollar per task, there's a picture which is changing. So the token per task is getting lower, interestingly, if we just use bash, and then also the cash hit rate increases. So if we just

转写校注。Slide check at 02:29:13. Bash + media viewing: 3.82M tokens, 89% cache hit, $2.33 per task. Bash only: 5.30M, 72%, $5.33. The two structured-tool setups show 5.19M, 76%, $4.68 and 5.01M, 84%, $3.01. The reported scores from this single run do not establish equivalent accuracy.

[02:30:01.020—02:30:38.280](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=9001s)

……拿 Bash 加媒体查看工具这套作基准，每题成本约为 4.68 美元那套结构化工具的一半，另一套结构化工具为 3.01 美元。只看得分就看不到这个差别。为了举几个例子，我准备了一些演示。这里用的是 Pi 框架，很容易指定要用哪些工具。我给大约半年前发布的 Gemini 3.5 Flash 同一份提示词，先用 Pi 自带的全套工具，再……

compare like the best media as the baseline, the tasks are almost 2x cheaper compared to more complex, more tools, agent harnesses, and we would not see it if we just look at the score. And to show you a few examples, I prepared some demos. So here I'm using the PI harness, which makes it super simple to basically define what tools you want to use. I have the same prompt for 3.5 flash, which we released roughly six months ago for all tools, so like whatever PI ships out of the box. Then we

## Flash 与 Carbon 的调用轨迹 / Tool traces for Flash and Carbon

[02:30:38.280—02:31:15.340](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=9038s)

……只给 Bash。Carbon 也做同样的对照，先用默认工具，再只用 Bash。我们只有大约 20 分钟，我事先都录好了，还点了这里的加速按钮。右边能看到同一个规律，模型越强，通常需要的工具越少。对 3.5 Flash 来说，默认工具和只有 Bash 的配置，模型调用次数一样，工具调用次数……

have it for bash only, and then we have it for carbon, and sorry, for carbon with the default tools and then with bash only. This runs now since we only have roughly around 20 minutes, I recorded all of that and clicked that very nice accelerate button here. And what we can see on the right side is that the same paradigm basically applies when models get better, they roughly need less tools. So with 3.5 flash, we see with the default tools compared to bash only, we had the same amount of model calls, we had the same amount

[02:31:15.340—02:31:29.280](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=9075s)

……也一样，token 用量大致相同。查看执行轨迹，只用 Bash 时，它用 `cat` 一类命令读取不同文件，用内联脚本修改，再执行一些 Git 操作。

of tool calls, and we had roughly the same amount of tokens. And if we look at the traces, For bash only, we have some cut commands to read different files, we have some inline scripts to make changes and then like some git changes.

[02:31:29.780—02:31:52.320](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=9089s)

默认工具那边大体一样。它调用读文件的命令，使用编辑工具，再执行一些 Git 命令。如果看 Carbon 使用默认工具的情况，它的工具调用和模型调用已经少很多了。它会并行工作，也会尽量减少调用。

If we look at the default tools, we can see roughly the same. We had read file commands, we used the edit tool and then had some git commands to make those changes. If we now look at carbon with the default tools, it already used way less tool calls and model calls, so it's basically doing work in parallel, but also trying to reduce it.

[02:31:52.440—02:32:06.020](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=9112s)

例如，我们看到仍有同样的读取调用和编辑调用。不过到了 Bash 这边，情况就有意思了。工具调用和模型调用还能再少一些。

So we had, for example, the still same for read calls and also the edit calls. But what starts to get interesting if we are going to look into Bash? And in Bash, we had even less tool calls and model calls.

[02:32:06.120—02:32:33.100](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=9126s)

有意思的是，模型写了一个 Python 脚本，一次完成全部改动，省去了多次工具调用。再往下看，Carbon 为什么能从 Bash 获益？因为模型越强，推理能力越好，就越能在一次 Bash 调用里串起更多命令。

And the interesting part here is that the model writes a single Python script to make all of that changes in one go and no longer needs to call multiple tools. So if we go further, what does it mean in terms for Carbon here and how Bash pays off is that the better the model gets or the more reasoning and capability it gets, Bash helps the model to be able to chain more commands in the single call.

[02:32:33.360—02:32:54.400](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=9153s)

Carbon 每次 Bash 调用大约会执行 2.2 到 3.7 条命令，Flash 只有 1.3 到 1.8 条。所以完成相同任务时，Carbon 使用的 token 最少可以降到大约三分之一。[比较口径转写不清]

For Carbon, it was roughly 2.2 to 3.7 commands per Bash call. And for Flash, it was only 1.3 to 1.8. So we are seeing up to 3x less tokens by Carbon to achieve the same tasks compared to having the same tools we need to use.

[02:32:55.220—02:33:14.080](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=9175s)

再看两个例子。左边是 Carbon 搭配默认工具，有写入和编辑之类的编程 Agent 工具。它在第二轮并行做了一些工作，第三、第四轮也做了一些，然后完成了全部改动。

So two more examples to look at it as well. It's like we have on the left side Carbon with the default tools. So we see our coding agent tools with write, with edit, and we see, okay, it does some parallel work in turn two, some parallel work in turn 3 and 4, and then we have all of the changes.

[02:33:14.360—02:33:30.000](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=9194s)

右边只给 Bash。它用 Python 写了一个内联脚本，一次完成所有改动，token 少了很多。拿 Gemini 3.5 Flash 和 Gemini 4 Carbon 做对照时，也能看到同样的规律。

And on the right side, where it just has the Bash tool, it uses Python to write an inline script to make all of the changes at the same time with much less token. And the same counts for if we compare Gemini 3.5 Flash to Gemini 4 Carbon.

[02:33:30.360—02:34:00.860](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=9210s)

Flash 只用 Bash 时，并不会把多条命令串起来。所以给它读取工具加 Bash，还是只给 Bash，差别不大。3.5 Flash 往往用 Bash 每轮执行一条命令，一轮读取，一轮写入。看看同一个任务里 Carbon 的做法，它需要的轮次少得多。读取时，它不用把不同的文件都……

Flash, with Bash only, is not chaining those commands. So here it's not really, it doesn't matter if I'm having a retool, and a bash tool, or if I have just a bash tool, because 3.5 flash used to use bash for single turn commands. So it had a single turn for reading, it had a single turn for writing, but if we look at carbon, which here in this example is the exact same task, it needs less way turns, so the reading is not needed to read all of the different files and

[02:34:01.520—02:34:34.720](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=9241s)

……从头读到尾。它用 ripgrep 之类的工具，有针对性地找出要改的地方，然后用一条内联的 Bash 调用运行 Python，把编辑一次做完，省了很多 token。这给我们带来什么？模型会继续接手原来由运行框架做的事。我很确定，2027 年大家会更关心完成一个任务需要多少 token。即使只看 Argon 到 Carbon 之间的几项改进，更强的模型每个任务也用更少的 token。这对大家来说当然是件挺令人兴奋的事……

completely, it just uses rip grab and like some intelligent searching to find where we need to make changes, and then it writes a single Python inline bash command to make all of those edits in one go, saving us a lot of tokens. So what does it bring us? Models will keep eating the harness, and I'm pretty sure that 2027 will also be a lot more about how many tokens do we need to solve a task. Even for the few improvements we made between Argon and Carbon, the better model needs less tokens per task, which of course is very exciting for all

[02:34:35.780—02:35:08.900](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=9275s)

……可以用得更多。框架给模型提供什么也很重要，只看正确率可能看不出来。还要开始测 token 效率。现在的模型能力很强，不同框架的正确率看着可能一样。框架更复杂时，模型会设法绕过去，最终也能找到解法，但做出同样的结果要多花轮次和 token。我大概会在六个月后再做一次同样的实验。

use it more and also it matters a lot what the harness provides and we will might not see it if we just look at the accuracy it's also very important that we start measuring the token efficiency because harnesses can look the same on accuracy because our models are now very good so if your harness is more complex to use the model will work around it will find solutions around it but needs more terms and more tokens to achieve the same results and then also what will try to do the same experiment six months from now.

## Code Mode 与结语 / Code Mode and closing remarks

[02:35:09.520—02:35:28.720](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=9309s)

现在至少在社交媒体和行业里，可以看到一个趋势慢慢起来。我们可能会回到 Code Mode 一类的工具里，直接写 TypeScript 或 Python，MCP 也可能再次受到重视。

And currently, the trend we see slowly rising, at least on social media and the industry, is that we might go back to some code mode tool that we, instead of writing a bash commands, that we write TypeScript or Python directly, that MCP will come back.

[02:35:28.840—02:36:02.280](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=9328s)

我很喜欢 MCP。他们正在做一些很好的改进，让它更容易用。对 Code Mode 尤其有用的一点是，MCP 服务器现在可以返回结构化结果。模型就能写出更好的脚本，在一轮里完成更多操作。我们也可以加一层更好检查的代理。Bash 调用往往不太好读，如果有一层 TypeScript 抽象，就可以观察执行的每条命令，检查它们是否安全。

I'm a big fan of MCP. And they are making great changes to make it more easily usable, especially interesting for all of that code mode work is MCP servers now allow you to return structured outputs, so the model can write better scripts to take more actions in the single term, and it also allows us to do some better proxy around the security, because bash calls are very hard to understand, but if I have some obstructive layer in TypeScript, I can watch all of the commands being executed and make sure those are secure.

[02:36:03.400—02:36:24.020](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=9363s)

我的建议是，写代码时就考虑以后怎样把它删掉，争取在模型接手之前删掉。给模型一台电脑，让它在里面做事，别只塞给它一盒工具。新模型一发布，我很推荐大家放开想，大胆一点，试试看，如果把整套运行框架拿掉，只给模型一个工具，会怎么样？

And for you, build to delete your code before the model does. Give your model to a computer, not a toolbox. And when a new model ships, I definitely recommend you trying to think a little bit outside of the box, be more ambitious, try to really see, okay, what if I remove my complete harness and just give it one tool?

[02:36:24.020—02:36:43.560](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=9384s)

也请大家扫一下二维码。大会结束后我们会发放免费额度，可以试用 Carbon 和新的 Gemini Decisions API。如果今天有时间，我很推荐试试新的决策模型和 Carbon。谢谢大家。

tool. And then also, please scan the QR code. You will get free credits. We will send them out after the AI engineering event to try out Carbon and also to try out the new Gemini Decisions API. So if you have some time today, I really can recommend checking out the new decisions model, Carbon, and thank you for your time.
