# TypeSafe AI 怎样把语义判断嵌进软件？

Diogo Almeida

中文校译与英文机器转写

中文为校译。英文栏保留选用的机器转写，可能有听写误差。带时间戳的转写原文可在下方来源说明打开。

依据大会主回放第 17 场（05:06:52–05:29:50）工作区的逐段中英校译。官方议程英文题名为 I love you so jevving much。英文沿用机器转写，保留缺漏。关于 RLHF、模型目标和软件发展方向的判断归于讲者。文中工单为教学示例。

[英文音频转写原文（带时间戳）](transcript-original.txt)

## AI 助手的能力与自动化需求 / What assistants do well and what automation needs

[05:06:52.300—05:07:13.400](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=18412s)

好！给我一秒确认一下设备能不能用。太好了。我是 Diogo Almeida，今天演讲的题目叫《I love you so Jevving much》。这是个 Glass Animals 的梗，我们也不是没来由地古怪。就像我刚才说的，我是 Diogo Almeida。

Woo! Give me a sec to make sure this is working. Heck yeah. I'm Diogo Almeida, and this talk is I love you so Jeving much. Glass Animals reference. We're not just weird. Like I said, I'm Diogo Almeida.

[05:07:13.600—05:07:33.860](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=18433s)

大家叫我「那个做 Jev 的」，有时也叫我 Jevy Pinkman。我还参与创建了 ChatGPT、RLHF 和 InstructGPT。今天在座的大概都知道我是谁，至少多数人知道。我有一堆专门为这次 AI Engineer 大会准备的内容，不过我喜欢先聊聊自己最爱聊的几个 AI 话题。

I'm known as the Jev guy, sometimes Jevy Pinkman, also co-created ChatGPT, RLHF, and InstructGPT. I assume that for the crowd today, y'all know who I am, at least mostly. I have a bunch of AIE-specific stuff I want to get to, but I like going into my favorite topics in AI.

[05:07:34.340—05:07:46.140](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=18454s)

第一个问题，这到底是怎么回事？自动化都到哪儿去了？要是你已经听我讲过，见谅。这件事太重要，我得在这个圈子里反复讲，因为很多人还是没弄明白。

First one is, what the fuck is actually going on? And where is all the automation? If you've heard me say this before, I'm sorry. But it's such an important thing to beat into the field, because people still do not get it.

[05:07:46.180—05:07:58.660](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=18466s)

我得接着喊，直到大家弄懂到底发生了什么。[此处转写有缺漏] 得有个说得通的解释，为什么 AI 能做那么多厉害的事，换一些事却一点忙都帮不上。

And I need to yell this until everyone really understands what the fuck is going on. a really good answer about why AI can do so many awesome things and yet still be so useless for a bunch of other ones.

[05:07:59.420—05:08:12.640](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=18479s)

我和 ChatGPT 的关系有点特别。我是少数参与做出 ChatGPT、又爱挑它毛病的人。说清楚，我不讨厌 ChatGPT。我喜欢用 Agent，喜欢编程 Agent，也喜欢聊天机器人。

My relationship to ChatGPT is somewhat unique, one of the few people who hates on ChatGPT who made it. I don't hate ChatGPT, to be clear. I love using agents. I love using coding agents. I love chat bots.

[05:08:12.820—05:08:33.820](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=18492s)

只是它们有不少局限。我尤其觉得遗憾的是，这个领域因为它们陷进了许诺很多、交付很少的局面。我觉得这对世界很糟。我喜欢把 AI 圈说成有两个派别。要是没找到一个说得通的解释，我觉得大家都应该感到认知上有冲突。我想谈谈怎么解释这种冲突。

They're just quite limited. And in particular, I think it's a little tragic how much they've bifurcated the field into over-promise, under-deliver. Really, really terrible stuff for the world, in my opinion. And I like to talk about the two cults in AI and how we can resolve the cognitive dissonance that everyone, I think, should be having unless they have a very good answer.

[05:08:34.320—05:08:49.020](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=18514s)

第一派是有效利他主义者（EA）。他们看所有基准测试，然后说，语言模型在几乎所有测试里都超过了人的水平，而且已经超过两年了。我们也已经连续两年宣称，再过三个月就是通用人工智能（AGI）。

There's cult one, which is the cult of EAs. They look at all the benchmarks, and they say, not only are LMs surpassing human level on basically every benchmark, they have been for two years. We've been announcing AGI three months away for two years now.

[05:08:50.520—05:09:06.480](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=18530s)

大家还记得吗？现在已经没人关心当时那个模型了。那大概是 OpenAI 内部对 AGI 最亢奋的时候。另一方面，你不看基准，去看现实、看世界的其他地方，尤其是走出旧金山去看，

Do people remember that? No one even cares about that model anymore. And that was like peak internal to OpenAI AGI hype. And on the other hand, you look at the non-benchmarks, and you look at the reality, and you see the rest of the world, especially if you guys go outside and leave San Francisco.

[05:09:06.620—05:09:20.860](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=18546s)

会发现世界上许多地方并没有多大变化，哪怕 AI 实在很酷。我认为 AI 确实能带来巨大变化。既觉得它很酷、能带来变化，又觉得它现阶段给世界带来的东西还不够，这种看法不常见。

A lot of the world is really unchanged, despite AI being so fucking cool. And I think AI is transformative. It's a rare point of view to actually think AI is cool and transformative and also underwhelming the world right now.

[05:09:21.160—05:09:33.820](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=18561s)

难就难在，我们都在同一个领域，看到的是同样的事实。所以到底怎么回事？为什么 AI 的能力这么不均衡？有些事情做得特别好，换些事情就不行？

And the tricky part is this is the same field, and we are all seeing the same facts. So what gives? Why is AI jagged, so to speak? Why can it be so good at some things and so not good at other things?

[05:09:33.960—05:09:48.160](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=18573s)

按奥卡姆剃刀，最简明的解释是什么？我接下来会很快地过幻灯片，见谅。也许我该放慢一点，让想拍照的人拍到。不过我发现确实会讲得很快，先说一声。

And what is the Occam's Razor explanation for that? I will be blasting through my slides fast. I'm sorry. Maybe I could slow down for people taking pictures. But I'm noticing that this is going to go fast, is all I'm saying.

[05:09:48.380—05:10:05.960](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=18588s)

我觉得整个领域都应该能给出一个简明的解释。一些任务上，AI 表现好得难以置信，甚至超出人类水平，我举的例子是数学千禧年大奖难题。另一些任务上，它却差到没法拿来碰会计工作。

So I think that we as a field should have an Occam's Razor explanation for why are there some things that are just not just good, they are unbelievably good, superhuman, like Millennium Prize problems in math. But on the other hand, they're not just bad, they're so useless, they can't even be used to touch accounting.

[05:10:06.300—05:10:19.840](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=18606s)

会计听起来比数学千禧年大奖难题容易多了，对吧？后者，也就是会计，我还能做。前者肯定做不了，虽然我参加过数学竞赛。为什么会这样？我平时喜欢把这部分留给大家互动，这次我直接说我的答案。

That sounds way easier than Millennium Prize problems in math, right? I could do the latter. I definitely could not do the former, and I was a mathlete. What gives here? What is the reason for this? And I normally love this as an interactive thing, but I will instead just tell you my answer.

[05:10:20.020—05:10:39.820](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=18620s)

这下我占了讲台的便宜。图左边这些任务，本身就有人的参与。比如深度研究，我做不过模型，模型在这方面真的很强。但假如事关重大，必须在我和深度研究之间选一个，要求答案准确，文笔不算数，你大概每次都会选我。

Sorry for the power dynamic. Everything on the left side is intrinsically a human in the loop task. Like deep research, I could not do better than deep research. The models are so fucking good at that. But if gun to my head or gun to your head, you had to pick between me and deep research and the answer had to be correct, not well written, you'd probably pick me every time.

[05:10:39.820—05:10:53.680](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=18639s)

这就牵涉到面向自动化的优化。这类任务通常更简单，可 AI 还是一再做不好。每年都有一回很出名的失败案例，连汽车餐厅的免下车点单都没能自动化。

And that's the distinction between optimizing for automation, which tends to be a lot easier and a lot simpler, yet AI keeps failing at this. Every year there's an infamous failure of AI failing to even automate drive-throughs.

## 把判断交给代码里的一个步骤 / Making a decision inside a software workflow

[05:10:53.760—05:11:05.840](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=18653s)

这本该让大家感到惊讶。我的看法是，在这些任务里，讨人喜欢和把任务做完是两回事。你希望把这个能力封装起来。

And that should be kind of shocking to people. And my claim is actually for these tasks, pleasing a human is nothing to do with doing the task. What you want to do is basically be an abstraction away.

[05:11:05.840—05:11:15.280](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=18665s)

你想要的是让系统作出决定，然后自动化流程可以接着跑。代码是自动化的语言，所以这个能力得和代码接起来。信息有点多，我再总结一下。

You want the decision to be made, and then you want to get back into doing automation. And code is the language of automation. Therefore, you need to integrate with code. This is a lot, but I will summarize it again.

[05:11:15.440—05:11:34.800](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=18675s)

我知道这有点讽刺，RLHF 是我参与创建的，我却认为它也是问题的一部分。特别是 RLHF，让今天的 AI 都需要人参与，不过要加个注。有些任务很容易验证，可以自行运行，到最后仍然需要人来核验。

I get the irony that I co-created RLHF, and I do believe RLHF is part of the problem. And RLHF in particular is why all AI today does require a human in the loop with an asterisk, unless the task is very trivially verifiable and can run on its own, but still requires a human in the loop to verify it afterwards.

[05:11:35.840—05:11:52.640](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=18695s)

因为我们把人的参与写进去了。RLHF 里的 HF 就是人类反馈。我的看法是，有更好的办法。我对现状的概括是，今天百分之百的语言模型都围绕助手来优化。你可能会提到使用可验证奖励的强化学习（RLVR），但只做了 RLVR、没做 RLHF 的模型，交互体验很差。

Because we literally put it in. That is what the HF is in RLHF. And my claim is that there's a better way. My summary of the state is 100% of LMs today are optimized for assistants. You might talk about RLVR, but the RLVR models are very bad to interact with if they've not been RLHFed.

[05:11:53.140—05:12:12.940](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=18713s)

结果，语言模型做助手好得让人难以置信，真的特别好。如果是你平时会问 ChatGPT 的那些问题，肯定应该选它，别选我。但如果要在后台自动做认知工作，我觉得不能直接信任语言模型，因为它们没有为这种工作优化。它们做自动化任务很差，就是这个原因。

The result is LMs become too good to be true at assistants. They are just so fucking good. You should never pick me over ChatGPT for your ChatGPT queries. But for actually doing like, you know, run in the background cognitive work, you should not trust LMs at all because they have not been optimized for that, which is why they're so bad at the tasks of automation.

[05:12:13.180—05:12:24.320](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=18733s)

我也猜自动化比辅助人做事有价值得多，可以做更酷、更深入的东西。后面我会展开。我觉得能做的事还有很多，我们现在只做了很小一部分。

And I would also guess that automation is a lot more valuable than assistance, because you can do way cooler, deeper. I'm going to get into this later, but I think there's going to be so much stuff that we can do, and we are just scratching the surface of that right now.

[05:12:24.420—05:12:39.740](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=18744s)

这就是我觉得当下 AI 令人遗憾的地方。接下来聊聊「Jevvolution」[讲者把 Jev 和 evolution 拼成的双关]。不知道这合不合适，不过已经来不及了。天哪，这页别拍。好。

And that's the tragic thing about AI, the state of AI for me. Let's talk about the Gevolution. I can't tell if this is appropriate, but it's too late. Oh, God, don't take pictures of this one. Cool.

## 选择训练目标与优化任务 / Choosing the task and optimization target

[05:12:40.680—05:12:52.980](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=18760s)

有人给我竖大拇指了。太好了。我们得试试 RLHF 以外的方法，从第一性原理想，怎样针对机器原生的 AI 来优化？希望大家已经了解 Jev 的接口，这就是我们在做的事。

Oh, I'm getting a thumbs up. Yeah, excellent. So instead of doing RLHF, we just have to do something else. We need to think from first principles, how do we optimize for machine native AI? You guys hopefully know the interface of Jev, and that is what we are doing.

[05:12:53.280—05:13:11.800](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=18773s)

接口之外，更重要的是重新想 AI 应该怎么做。Jev 也是这么做的。[此处转写有缺漏] 我大致转述一下 Sutton 的「苦涩的教训」，方便说明我的观点。扩大规模和算力比算法更重要。

More important than optimizing for its interface, we are rethinking how AI should be done, because this is what we did again for Arlochev. For Sutton's bitter lesson, I'm going to loosely paraphrase to make my point easier to say, is that scaling and compute matters more than algorithms.

[05:13:12.040—05:13:25.760](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=18792s)

所以不少人一头扎进了规模扩展这一派。[此处绰号转写不清] 我认为还有一课更苦涩，数据总是比算力重要。现在业内越来越多地认识到这一点，不过它从很早起就很明显。

This is why people become like scaling-pilled Givronis. And I would argue that there's an even bitterer lesson than that, which is data always matters more than compute. We are learning that quite a bit in the field now, but it has been obvious since the beginning of time.

[05:13:25.940—05:13:38.720](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=18805s)

我来说什么时候。这页倒是该拍下来。最苦涩的一课，是选对要做的任务。对机器学习从业者来说，去想什么任务才对，有点反常，因为他们喜欢算法。

I'll tell you when. This is the one you should be photographing. But the bitterest lesson is doing the right task. And doing the right task is like a weird thing to think about, especially for ML people, because they like algorithms.

[05:13:38.920—05:13:48.580](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=18818s)

他们只想让数字往好的方向升或降，不想考虑现实里的任务。可表现要有巨大的飞跃，就得这样想。真正的突破就是这么来的。

They want number goes down or up or whichever is a good direction. They don't want to think about the real world. But this is always how you make gigantic gains in performance. This is how the big breakthroughs happen.

[05:13:48.800—05:14:03.580](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=18828s)

每一次都是这样。传统强化学习的游戏任务也一样。Sutton 那条教训之所以成立，是因为做 rollout 时，数据可以用算力生成。下棋之类的事，为什么还需要脱离当前策略的数据（off-policy data）？

100% of the time, it comes from this. And this is true for classical RL games. This is why Sutton had his bitter lesson, which is data Data is derived by compute when you're doing rollouts. Like, why would you need off-policy data when playing chess or something like that?

[05:14:03.920—05:14:14.660](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=18843s)

规则已经定义了该做什么任务。所以在这种强化学习里，甚至不用再想任务选对没有。做预训练时，我们整个领域倒是花了很多时间想清楚，什么才是该做的任务。

And doing the right task is defined by the rules. So actually, when you're doing RL, you don't even need to think about the right task. For pre-training, we actually, as a field, had to do a lot of thinking about the right task.

[05:14:14.920—05:14:27.720](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=18854s)

不知道大家还记不记得 BERT 用掩码语言建模的时期。我们花了一段时间才看出，预测下一个 token 这件事特别有用。它的用处和掩码语言建模做得好不好无关。[此处转写有缺漏]

I don't know if people remember the BERT days with masked language modeling, but it took a while, and it was very unclear to figure out that next token prediction was super fucking not because it was better at mass language modeling.

[05:14:28.080—05:14:37.980](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=18868s)

目标本身没有什么特别，要看优化完这个目标以后能拿模型来做什么。结果发现，预测下一个 token 特别适合生成字符串。这也正是那些预训练模型擅长的事。

The objectives on their own aren't special. It's about what you can do with them afterwards. And it turns out next token prediction is incredible at generating strings, which is what these pretrained models were so good at.

[05:14:38.220—05:14:50.540](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=18878s)

掩码语言建模做得再好，就算用今天的算力和算法，也达不到当初 GPT-3 那样有意思的效果，因为做的任务不同。再说数据，互联网显然是个很大的瓶颈。

So no level of mass language modeling, even if you had today's compute and algorithms, would make it as interesting as GPT-3 was, because it was just doing a different task. And data, the internet is obviously a giant bottleneck.

[05:14:50.620—05:15:05.840](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=18890s)

现在，为了多拿一些数据，我们都在「烧书」之类的了。[此处措辞转写不清] 数据比算力更重要，人们一直在重新发现、重新弄懂这一点。要让 LLM 真正好用，尤其如此。RLHF 出现以前，用来做 RLHF 的数据都还没有。

Now we're burning books or whatever in order to get more data, lot more than compute, and people keep rediscovering this and figuring this out. It's extra true for making LLMs useful. Before RLHF even existed, the data for RLHF didn't exist.

[05:15:06.240—05:15:26.300](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=18906s)

有了以后，简直是天壤之别。给你们看下一页，这页可能最相关。这是 RLHF 论文里的结果。大意是，即使用最笨的算法、只用 GPT-2 大小的模型，也能做到差不多「GPT-9」的水平。我这里用的是按今天命名方式虚构出来的 GPT 编号。

And you could, like it was night and day. I'll just show you the next slide. This is probably the relevant part. This is what this was the work in the RLHF paper. And the high level was that even with the dumbest algorithms in the world, even with a GPT-2 sized model, you got something like GPT-9 level performance, today's fake GPT numbers.

[05:15:26.860—05:15:44.140](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=18926s)

以前这些编号意味着预训练的有效算力扩大 100 倍。现在已经放弃那么命名了，因为没法再这么扩。即便按那种口径，做指令遵循时也要大概到 GPT-7 至 GPT-9 的规模，才能追上 2018 年左右那个 GPT-2 大小的模型。[讲者作类比]

The numbers used to mean 100x scaling and effective compute for pre-training. And they've given up on that because it just can't scale anymore. And still, even with that, it would take something like GPT 7 to 9 to match GPT to the model from 2018 or whatever it was at the task of instruction following.

[05:15:44.300—05:15:57.060](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=18944s)

这很夸张，因为你会觉得大语言模型对这事特别重要，确实也重要。但把任务选对带来的跃升要大得多。先揭晓一下，这正是我们为 Jev 所做的。

That is kind of wild, because you think big LMs are so important for this. And they are. But that is not the most important thing compared to even the gigantic jump of doing the right task. And spoilers, this is what we did for Jev, right?

[05:15:57.220—05:16:10.180](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=18957s)

我们把优化放在一个特定任务上，做出了业内许多人没料到的跃升，因为很少有人认真想，究竟该选什么任务。这就是为什么 Jev 有种说不出的魅力。[讲者用 Jev 和法语 je ne sais quoi 玩双关]

Like, we made this gigantic leap in the field that no one realized could be coming because we were optimizing for a task, and very few people think about the right task. This is why Jev has the Jev N'essakois.

[05:16:11.180—05:16:24.100](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=18971s)

我觉得这个双关挺机灵的。大家笑得有点捧场，不过谢谢。你优化什么，就会得到什么。我还想找个比「可靠」更合适的词，大家有主意可以告诉我。

That's a really smart bun, I think. A little bit of a pity laugh, but thank you. You get what you optimize for. I'm looking for a better word than reliable, so if you guys have suggestions, let me know.

## 可靠性、智能软件与产品设想 / Reliability and software with embedded intelligence

[05:16:24.980—05:16:37.520](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=18984s)

LLM 很缺一种东西，智能表现的可靠性。我经常这么说，95% 的时候你碰上爱因斯坦，剩下 5% 碰上憨豆先生。要是你分不清这两种情况，怎么把任何事情自动化？

There's this reliability of intelligence that's really missing in LLMs. I often call it, you get Einstein 95% of the time, but Mr. Bean 5% of the time. And if you can't sell which is which, how the fuck are you going to automate anything?

[05:16:37.880—05:16:50.560](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=18997s)

偶尔聪明一次，事后再由你验证。那如果把范围收得非常、非常窄，专门优化可靠性，让模型每一次都够聪明，会怎么样？这种东西在基准测试上看不出来。

And instead of focusing on sometimes occasional smarts that you can then verify, what if you focused on extreme, extreme narrow focused reliability so you can get that smarts every time? And this doesn't show up on benchmarks.

[05:16:50.700—05:17:06.680](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=19010s)

这也是大家喜欢 Jev 的原因。现在回头看，我们显然没为开发者迎来一个「ChatGPT 时刻」做好准备，但这事发生了。AI 圈实在太爱承诺、太少兑现，一下子有个能兑现的模型，反倒让人意外。

It is the reason why people love JEV. And this is also, I realize in hindsight, we obviously didn't prepare for a chat GPT moment for developers. But it happened because people in the AI space just over promise, under deliver so fucking much, that having a model that actually doesn't do that was a surprise.

[05:17:07.000—05:17:16.040](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=19027s)

它让人意外的地方超出了速度、成本，甚至接口本身。团队的人说我不该把这些告诉别人，好保住长期优势。但我太在意这件事了。

And it is not the speed cost or even interface. This is something that my team tells me I shouldn't be telling people so that we can have a long term advantage and I just care too much.

[05:17:16.380—05:17:29.840](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=19036s)

重要的是智能表现可靠。拜托大家都做厉害的模型，用不用我们的模型都可以。我们把 Jev 看成智能软件的一项基础能力。这几页我先跳过，不过我觉得软件真要重新热闹起来了。

It's reliable intelligence. Make sick models, please, even if it doesn't involve our models. We see that Jev is like a foundation for smart software. I'm going to skip all of this, but I think software is going to be so fucking back.

[05:17:30.100—05:17:41.840](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=19050s)

所谓「SaaS 末日」，我觉得显然不会来。甚至把它叫作「SaaS 狂欢节」都说小了。待会儿我会谈一点，在座各位正适合听这段。

I think the narrative of Sasspocalypse is obviously not going to happen, but I think that even calling it a Sassapalooza is like an understatement, and I'll get into that a bit, and you guys ideally are the perfect crowd for this.

[05:17:41.960—05:18:01.600](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=19061s)

这部分我很兴奋，因为对我来说也是新东西。我想区分智能软件和即时生成的软件。AI 能带来这么大的改变，可过去十年里，软件本身基本没怎么变，主要变化是写软件便宜了。

I'm so excited for this part because that's the part that's new to me. I want to make a distinction between smart software and just-in-time software. The crazy part is AI is so transformative, and yet somehow, despite AI being so awesome, software has essentially unchanged in the last decade, except being cheaper to write.

[05:18:02.080—05:18:15.180](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=19082s)

这不奇怪吗？软件里我们能做到的最好的东西，就是放个聊天机器人在旁边，偶尔和软件交互，也不能替你作代价高的决定。要是 AI 真能带来那么大的变化，这个结果就挺奇怪。

Isn't that weird? Isn't it weird that the best we can do in software is having a chatbot to the side that sometimes interacts with the software but cannot take expensive decisions for you? That is kind of like a weird thing if AI was really that transformative.

[05:18:15.180—05:18:26.580](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=19095s)

我觉得我们把太多注意力放在编程 Agent 上了，放进软件核心执行流程的智能还太少。稍后我会细说。已经有人用 Jev 在做了，也有许多成功案例。

And I think the problem is we're focusing too much on coding agents and not enough about putting the intelligence into the inner loop, which I'm going to get more into a bit. And people are jeving. There's been tons of successes.

[05:18:26.820—05:18:39.340](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=19106s)

不用吹这个，已经有很多酷东西了。不过我今天在 AIE 要说的那个秘密是，整个行业还没把 Jev 这一类方法用到位。swyx 说，可以在这里对大家提一个别处没提过的行动倡议。希望时间还够。

We don't need to flex this. There's so many cool things. But my AIE secret is going to be that the field isn't jeving hard enough. And this is what Swix said, that I can make a call to action for you guys that's unique, and hopefully I have enough time for this.

[05:18:39.620—05:18:52.480](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=19119s)

我觉得整个行业还有点「LLM 斯德哥尔摩综合征」。我们还是习惯凡事都用 LLM 的思路想，我觉得挺可惜。软件界有句话我很喜欢，你用的工具会改变你的思考方式。

I think the world still has LLM Stockholm Syndrome. We are still thinking from a really LLM-pilled place, which is, I think, tragic. You know, like, I love the software saying, the tools you use change the way you think.

[05:18:52.600—05:19:05.280](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=19132s)

我觉得这回工具把我们的思路改变得太多了。整个领域需要重新思考软件是什么，我们还没真正开始做。我觉得我们可以多做很多事，希望我能在剩下的时间里尽量说服大家。

And I think that it's changed the way we think way too much. And we're not really rethinking software like I think the field needs. I think we could just be doing so much more. Hopefully, I can try to do my best for my remaining time to convince you guys of that.

## 蓝色 LED 与第四种逻辑门的类比 / The blue LED analogy and a fourth kind of logic gate

[05:19:06.060—05:19:23.820](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=19146s)

那就跟着 Jev 看看未来。请听我用一个很喜欢的类比，LED。蓝色 LED 出现前，已经有红色和绿色的 LED。能做的东西很有限，用在简单的指示灯、时钟之类的东西上。

So let's JIV to the future. An analogy I love, bear with me, is about LEDs. Before there was the blue LED, there was red and green LEDs. These were really limited in capability, and they were used for simple indicators and clocks and stuff like that.

[05:19:24.100—05:19:40.940](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=19164s)

后来蓝色 LED 被做出来，或者说被发现了。我其实不太懂计算机科学以外的这些事。不过它出来以后，颜色从两种变成三种，能做的事远不只多了 50%，一下多出来太多了。

And when the blue LED was made, discovered, I actually don't really know how things outside of computer science work. But when it existed, I guess, it enabled not just 50% more use cases, about changing colors from two to three, it enabled so many more.

[05:19:41.120—05:19:58.080](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=19181s)

比如，LED 可以用来做白光，可以用在大家现在用的显示屏里，也让照明发生了一次大变化。只添了一项能和原有技术组合的基础能力，LED 能做的事情却多到原来想象不到。

Like now LEDs could be used for white light. It could be used for the displays that we all use right now. And it created a revolution in lighting. And it's unfathomable how much bigger the capabilities of LEDs were, just adding a new primitive that composes together with an old primitive.

[05:19:58.200—05:20:10.760](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=19198s)

你大概猜到我要往哪儿说了。我觉得软件也类似。软件实在太厉害。先把最近五年的 AI 放在一边，光靠软件我们就已经做成了那么多很酷的事情。

So you can see where I'm going here, maybe. And I think it's a similar story for software. Software is so fucking incredible. Ignore AI for the last half decade. But software has done so many insanely cool things.

[05:20:10.940—05:20:28.740](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=19210s)

我们做了很多东西。问我爱不爱用 SaaS？倒也没有。它解决问题吗？当然解决。光靠三种基本逻辑门就做出了这么多东西，实在让人惊讶。简单的二元运算，就能判断大于、小于、等于之类的关系。

We've done a lot of stuff. You know, like, do I love using SAS? Not really, but does it solve problems? Abso-fucking-lutely. And it's incredible how much we've done with three fundamental logic gates. You know, like, we are doing this with, like, simple binary operations that can do things like greater than, less than, equal.

[05:20:30.140—05:20:44.320](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=19230s)

这么简单的基本操作，已经能搭出这么多软件。我的观点是，我们现在用 AI，让智能能直接在机器里工作，这在概念上相当于加了第四种逻辑门，一种语义逻辑门。

how much software has been built from such simple primitives. And my claim is that what we are doing with AI now, when we're making our intelligence machine native, this is kind of conceptually adding a fourth semantic logic gate.

[05:20:44.720—05:20:55.360](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=19244s)

假如可以把常识、意图和人对语义的理解用进编程，会怎样？比如还需要写特别复杂的正则表达式吗？能不能直接说，我要一个 Gmail 邮箱地址，或者一个看上去真实的地址？

What if we can program with common sense, with intention, with human understanding? Like, do we still need regexes with like crazy things? Or can we just say like we want a Gmail email address or a real looking one?

[05:20:55.520—05:21:16.420](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=19255s)

能做的太多了。为了做出来，我们还得继续推进，让它更便宜、更聪明、更快。我觉得这里会出现很多东西。就像蓝色 LED，软件的表达能力不只多了 33%，它实际上多出了一类不同的逻辑门，能带来的变化要大得多。

There's so much that we can do that we're going to need to push the front, cheap, smart, fast in order to get done. But I think that there's going to be so many things here. And I think just like the blue LED, it's going to be way bigger than just increasing the representational ability of software by 33%, because it's adding effectively another kind of logic gate.

[05:21:16.580—05:21:29.220](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=19276s)

这些像科幻一样的事，我觉得很难提前预测。谁能料到互联网后来会有那么大的力量？它更自下而上，也更分散，需要让普通人也有能力去做些异想天开的东西。

And this sci-fi is the stuff that I think will be impossible to predict, just like who could predict how powerful the internet would have been, because it's much more grassroots and decentralized, and it requires people to be empowered to do insane stuff.

## 阶段验证、状态管理与软件研究方向 / Verifiable steps, state, and directions for software research

[05:21:30.300—05:21:50.500](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=19290s)

我把这叫软件研究。我是认真的。软件能做的事情会一下子增加很多。我们希望有人去摸索它的边界，有些项目未必一开始就有价值，能做、又有新领域可以探索，就值得试。

I call this software research. That's not a joke. But I think that there's going to be an explosion of what software can do. And we will want people to be exploring those boundaries of software, not necessarily because it's valuable, but because they can, because we have new frontiers to explore.

[05:21:50.700—05:22:02.200](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=19310s)

早期互联网就是这样。那些网站都有必要存在吗？也许没有，可那时候非常有意思，我们也从中发现了很多好东西。我觉得现在又有一次这样的机会。

And this is what the early internet was like. Should all of those websites existed? Like, it was very cool, and we found a lot of awesome stuff from that. And I think we have another opportunity for that.

[05:22:02.220—05:22:14.360](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=19322s)

所以，我们可以走出那个小鱼缸。OpenAI 和 Anthropic 每发布什么，我们就被动跟着走，只能围着 LLM 做封装。可以有别的做法。我来提几个软件研究可以走的方向。

So we should not just keep living in this little fish tank that we are the victims of open-ion-anthropic on whatever they ship, and we just have to be like LLM wrappers. So I'm going to pitch software researchers' direction here.

[05:22:14.660—05:22:30.380](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=19334s)

主题是扎实做软件工程，范围比 vibe coding（凭感觉用 AI 写代码）大得多。做过软件工程的人都熟悉这些办法。分解，把任务拆小。想清楚要经过哪些阶段，最好每一步都能验证，这样才能真正封装起来。

The theme is going to be real software engineering, not just vibe coding. It's going to be the kind of stuff that everyone has known if you've been a software engineer, decomposition, breaking tasks down. think about stages, ideally ones that can be verified so we have real encapsulation.

[05:22:30.620—05:22:41.680](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=19350s)

还要认真做状态管理。不要假定所有东西都是 KV 缓存里的全局状态。这件事应该由真正在意最终结果的人，踏踏实实地按工程方法来做。

And we need to actually do state management instead of assuming everything is global state within a KV cache. And the theme is going to be like real fucking engineering by people who care a lot about the end result.

[05:22:41.880—05:22:53.880](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=19361s)

不一定非得有实用价值，最好能特别酷。我们应该去试试边界在哪里。我来讲几个最喜欢的想法，也想弄清楚怎么鼓励大家把它们做出来。

It doesn't have to be valuable. Ideally, it's sick as fuck. And we should be pushing the limits. I'm going to go into a couple of my favorite ideas. And I want to figure out how to encourage these in the world.

[05:22:53.940—05:23:01.960](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=19373s)

我先从把这些事讲出来开始。我们融了不少钱，我想过能不能出资支持，但目前没人手做这方面的运营。

So this is my first step at this. to talk about it. We have raised a bunch of money, so I would like to figure out how to fund this, but we don't have the operations help to do that.

[05:23:02.120—05:23:16.240](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=19382s)

先举几个想法。Agent 很酷，不过我觉得受 KV 缓存限制，它们的设计不够灵活。如果这个计时器是准的，我来不及细说了。

But here are just some ideas out there. I think agents are very cool, but they're so inflexible in their design because of the tyranny of the KVCache. I don't have the time for this, if this timer is to be believed.

[05:23:16.480—05:23:27.480](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=19396s)

不过相信我，很多人试过不少办法，最后因为跟 KV 缓存的工作方式不合，效率太低，做不下去。我觉得还有很多能做的事。为什么记忆的复杂度是 O(N)？

But believe me that there's so much that people have tried to do but failed at because it ends up becoming inefficient because it fights against the KVCache. But I think there's a lot more to do. Why is memory O of N?

[05:23:27.740—05:23:44.620](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=19407s)

为什么每次调用都不能纳入编程 Agent 的全部历史？持续学习需要这些历史。记忆其实已经在那里了，只是我们还没有足够好的办法在记忆上做类似 MapReduce 的处理，判断哪些该记住、哪些不用记。

Why can't we have all of our history of coding agents always included in every new call? That is how continual learning works. And we have the memory available. It's just that we don't have the smarts to map produce over the memory to find out what you should remember or what you shouldn't.

[05:23:45.300—05:23:59.380](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=19425s)

我觉得有不少办法能做到 O(log N) 甚至更快的检索。同时启动多个 Agent 时，为什么不能共享状态？为什么每个 Agent 都得重新发现同一个代码库里已有的模式？为什么更复杂的路由和子 Agent 做不好？

I think there's many ways to do log N or even better lookups. Why, when you're making many agents at once, why can't they not share state? Why do they need to rediscover the same patterns of the code base And why can't non-naive routing and sub-agents work?

[05:23:59.460—05:24:11.300](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=19439s)

连最朴素的路由都不好使。为什么这些事做不到？为什么大型实验室对「子 Agent 到底有没有用」的看法来回变？我觉得从工程上讲，这种设计有它优雅的地方。

Like, even naive routing doesn't work. But why can't we do these things? And why does the big labs keep going back and forth on whether or not sub-agents work? I think that from an engineering perspective, there's elegance to it.

[05:24:11.360—05:24:22.460](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=19451s)

只是它们和 KV 缓存的工作方式有冲突。我觉得，假如我们在设计 Agent 时把这个限制考虑进去，还能做得更多。下面这个方向可能是我讲的几个里最模糊的，但我对此很有感触。

But they fight against the KV cache. And I think that if we design agents around that, we could do so much more. This one's probably the most vague of my directions. But I feel very strongly about it.

[05:24:22.740—05:24:39.040](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=19462s)

世界上到处都有委托代理问题，双方可能另有打算。我说的「代理」泛指受人委托的一方。最典型的例子就是公民和民选官员。我不想在这里讲太多政治，但社会每一层都有目标不一致的问题。

The world is full of principal agent problems. ulterior motives between this is not a coding agent, but any agent. The classic example is citizens versus elected officials. I don't want to make a too political claim here, but there's misalignment in all levels of society.

[05:24:39.240—05:24:53.360](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=19479s)

这会带来浪费、欺诈和其他坏事。一个想讲公平的社会，为此往往不得不过度强调规则的字面条文，顾不上立规则的原意。结果就出现了漏洞，付得起代价的人更容易赢。

And this results in waste, fraud, bad things. And it results in, for a society that wants fairness, you need to overemphasize the letter over the spirit, which then results in loopholes and pay to win dynamics in the world.

[05:24:53.360—05:25:08.020](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=19493s)

我认为根源在于，我们没法把规则的本意写进去。就像软件里，我们只能编码成比特，很难表达某个情境里真正想要的是什么。我觉得要是能在许多场景里把这种本意写进去，很多组织乃至社会都可能发生改变。

And I think the root of that problem is we can't encode the spirit. Just like with software, we're constrained to encoding bits instead of what we actually meant in that situation. And I think so many organizations, society could be transformed by really encoding the spirit all over the place.

[05:25:09.300—05:25:24.580](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=19509s)

还有实时的智能安全检查。我们能避免之前提到的 OpenAI、Hugging Face 相关的沙箱问题吗？[此处转写有缺漏] 当时为什么没拦住？我觉得，识别一个危险行为通常比实施那个行为更容易。

Obviously, real-time intelligence security. Can we prevent the OpenAI hugging face sandbox, blah, blah, blah? Why couldn't they prevent it? It is not because they didn't have the intelligence. I would argue it's a lot easier to figure out they're doing a naughty thing to actually do the naughty thing.

[05:25:24.660—05:25:41.660](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=19524s)

问题在于，当时的技术还不够快、不够便宜，也不够可靠，没法实时跑。假如每家公司都能用上真正会判断的实时安全检查，会怎么样？那得多酷。我就不讲生成式界面了，后面的讲者要讲。

It is because it was not fast, cheap, and reliable enough to actually run real time. And what happens when every corporation has their own real time security that's actually smart? How cool would that fucking be? I can't talk about generative UIs because people are going to be talking about it afterwards.

[05:25:41.740—05:26:00.660](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=19541s)

我不抢他们的风头，但相信我，那非常酷。再举个例子，语义依赖类型。为什么不能有一个真正理解语义的类型系统？为什么不能直接声明我们对某一处代码的要求，省得去翻一长串深层依赖？

I don't want to steal their thunder, but it's cool as shit, trust me. Like semantic dependent typing. Why can't we have a type system that actually is semantic? Right? Why can't we declare what local properties we want so we don't have to read a chain of dependencies deep down?

[05:26:01.020—05:26:18.020](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=19561s)

这些事都应该能做到。想象一下，在 lint 检查器里运行类似 Jev 的模型，检查类型安全，也检查语义要求有没有得到保证。那会特别酷。Twitter 上有段讲语音界面的视频，也很不错。

These all should be possible. And imagine if you could run a jev-like model in your lint checker to check if it's all type safe, and it could uphold semantic properties. It would be so fucking cool. There was a great Twitter video on a voice interface.

[05:26:18.220—05:26:32.420](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=19578s)

总的来说，新界面让我很兴奋。也许接下来这句话会暴露我在软件这行的年龄。我觉得「按我的本意去做」这种交互要回来了。这概念以前流行过，却始终没做成。因为想用硬编码规则弄清用户到底是什么意思，规则会多得写不过来。

In general, I think new interfaces are so exciting. This is, to me, the return of, like, this is going to show by age in software, like, do what I mean. This used to be a popular thing, but it never really worked, because it was too many hard coded rules to really figure out what I mean.

## 内容质量与自动化的未来 / Content quality and the future of automation

[05:26:33.700—05:26:47.200](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=19593s)

当然还有抵制粗制滥造的 AI 内容，这也是大会的一大主题，我们对此很认真。这是我带来的道具，我们给 TypeSafe 做了一根写着「Stop Gen AI」的棒球棍。特别酷。我想讲讲劣质内容是怎么来的。

There's stopping slop, obviously a big theme of here, but we definitely believe this. This is my props. We have a stop Gen AI baseball bat for type safe. It is very, very awesome. I want to talk about the root of slop.

[05:26:47.960—05:27:02.200](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=19607s)

根源是 AI 不可靠。你作为一家公司，或一个实际要做事的人，不敢把有代价的决定直接交给它。可你要是把代价推给别人，自己照样能发出去。这样把成本转嫁出去，太糟糕了。

The root of slop is that AI is unreliable. For you as a company or you as someone who's doing stuff, it can't be used for decisions that cost you stuff. But it's actually totally fine to push the costs into other people, which is horrible, externalized costs.

[05:27:02.480—05:27:15.820](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=19622s)

结果就是到处出现劣质内容。如果有人真的读过、筛过、在乎质量，它也可以做得好。可现在这种东西到处都是，因为恶意参与者和不关心质量的人，在这种环境下占了便宜。

And then this is what ends up becoming slop. If people actually read the stuff and filter it and care about the quality, it becomes not slop. But now the world is full of this because there's an asymmetric advantage for people who are bad actors and don't give a shit.

[05:27:16.120—05:27:38.640](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=19636s)

所以在很多事里，我们至少有机会让大家不再被涌进来的劣质内容淹没。这挺酷。还有一种我觉得超级酷的东西，故意做得离谱的软件。为什么？你要是看过 Reddit 的 Bad UI Battles 版，就知道它特别酷。那里的人故意做糟糕的界面，比如「是否删除账户」居然成了一个随机游戏。

So I think that we can save the world from at least inbound hell, among many other things. very cool. And even something I think is super sick is cursed software. Like, why? If you guys ever seen the subreddit, Bad UI Battles, it is so fucking cool, even though they make horrible interfaces like this whole game of, like, would you like to delete your account becomes a random thing.

[05:27:38.840—05:27:55.640](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=19658s)

我觉得，因为做得出来，就动手做，这就是软件工程的一部分。谁知道呢，也许其中 1% 的点子真能做成特别棒的东西。连糟糕点子也敢试，多少就是那种爱玩的黑客的精神。

And I actually think doing things because we can is what software engineering is about. Because who knows, maybe 1% of these ideas actually lead to something super awesome. even bad ideas is kind of what being like this, you know, playful hacker is all about.

[05:27:56.760—05:28:10.920](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=19676s)

再广一点，后面还会谈怎么把各种事情自动化。这张图就是 AI 粗制滥造出来的，标志还有点不对，别盯着看，挺怪的。后面的许多演讲都会讲这些。谢谢。

And generally, just automating everything, this is what the follow-up, this is a slop image, but sorry, logo's a little bit wrong, but don't stare at that, that's a little weird. This is what a lot of the follow-up talks are going to be about. Thank you.

[05:28:12.100—05:28:27.120](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=19692s)

如果你是软件工程师，几乎肯定习惯在比特的世界里思考。懂一点软件、用过软件的人，都知道有些事软件能做，有些事做不了，大家都觉得这是理所当然的。

And if you're a software engineer, you almost certainly think in the world of bits. If you know anything about software, and you've interacted with software, that there are things software can do and software cannot do, because that is just only obvious, right?

[05:28:27.320—05:28:38.760](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=19707s)

有些事情你知道得自己做，因为它和现有的软件处理方式不合。可如果这些限制后来都不成立了呢？也许今天还不行，但六个月、一年后，还有什么不能自动化？

Like there's some things that you know you need to do, because that is not compatible with software. But what if those constraints were no longer true? Maybe not today, but maybe in like six months or a year, what couldn't we automate?

[05:28:39.080—05:28:53.820](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=19719s)

我就想把问题留在这里。未来很可能有一天，我们问的是，把这件事自动化要花多少工作量。能不能自动化，已经不再是问题了。那会非常酷。

And that's kind of where I want to leave this whole thing, because I think there is very likely to be a future where it's not a question of whether or not we can automate something. It's going to be a question of like how much work is it, that can be automated, and that would be cool as shit.

[05:28:54.500—05:29:12.660](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=19734s)

好，谢谢。我已经超时很多了，谢谢最早相信这件事的人。我们没料到会有这么多人认同这个想法。当初以为是我们自己疯了，结果发现，觉得 AI 还能做更多的人其实占多数。

So hell yeah, thank you. I'm super over time, but thank you to the early believers. We had no idea so many people would resonate with this. We thought we were the insane ones, but it turns out we were actually the majority of the world who realized AI could be so much more.

[05:29:13.040—05:29:26.260](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=19753s)

谢谢那些实事求是看待可靠性的人。大家都知道我不喜欢基准测试，也有很多人一直在大声提醒这件事。基准测试伤害最深的，恰恰是那些没时间做其他核查、只能看基准的人。

Thank you to the people who are really realistic about reliability. Everyone knows I hate benchmarks, and a lot of other people are really screaming out, They're actually, they hurt the people who do not have time for anything other than benchmarks most.

[05:29:26.380—05:29:41.760](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=19766s)

这很可惜。也谢谢那些在拓展软件能力的人，太棒了。我们想和你们一起，帮你们做这些事。那些有想法、希望不受过去种种限制的人，我们真的想给你们争取机会。

It's tragic. And for the people who are pushing the limits of software, like, fuck yes. And we want to be there with you, helping you all do that. The dreamers and the people who don't want to be limited by everything that has happened so far, we want to really fight for you.

[05:29:41.780—05:29:50.320](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=19781s)

我们希望它能像第四种逻辑门一样可靠。这个标准非常高，还有很多工作要做。谢谢。

And we want this to be as reliable as a fourth logic gate. And that is a very high bar. And we have a lot of work to do. So thank you.
