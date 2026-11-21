# 代码还没生成，先检查规格是否自相矛盾

Rajath Mahendrappa Kotyal

中文校译与英文机器转写

中文为校译。英文栏保留选用的机器转写，可能有听写误差。带时间戳的转写原文可在下方来源说明打开。

依据 AI Engineer Code Summit 主回放第 07 场（01:50:45–01:58:35）的 17 段中英资料。英文为机器转写，中文保留既有校译。正文中的准确率和回归数量为讲者引用的背景数字，转写未给出完整研究口径。导读里的逻辑式和练习为便于复核的编辑示例。

[英文音频转写原文（带时间戳）](transcript-original.txt)

## 订单规则里的矛盾 / A conflict in the order rules

[01:50:45.700—01:51:08.960](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=6645s)

大家好，我是 Rajath Kotyal，来自 AWS 自动推理团队。今天想讲一个我最近参与的项目，名叫 Kiro Specification Analyzer。我们用形式化方法和自动推理，在编程 Agent 写代码之前检查它拿到的规格。

Hi, everyone. My name is Rajat Kottyal. I'm part of the automated reasoning group at AWS. And today I'm going to talk about a project I worked on recently called Key Row Certification Analyzer. And we use certain techniques, which involves formal methods and automated reasoning to prove specification that goes to your coding agent before it writes code.

[01:51:16.380—01:51:34.360](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=6676s)

来看一个具体的问题。这是一小段规格，里面有两条规则。假设这是一个普通的电商网站，第二条规则说，用户提交订单时……

So let's take a certain bug, right? This is a specification snippet, and there are two rules, for example, and the rule two says when an order is submitted, and this is for a general e-commerce website, let's say.

[01:51:34.900—01:52:17.440](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=6694s)

……如果没有库存，就把订单列为待补货订单。这一条单独看说得通。可是你交给编程 Agent 的同一份规格里，另一条又说，任何订单都不得列为待补货订单。两条各自都能理解，但大模型同时读到它们时，两条就无法同时成立。我们得解决模型遇到的这个歧义。至于……

When an order is submitted and the inventory is unavailable, we place the order as a back order, which makes sense when you read it individually. rule in the same specification file which you hand to the coding agent which says no order shall be placed as a backorder and this is a rule we'll set so individually read these two lines make sense right but in when an llm reads this reads both the rules together both cannot hold true at the same time. So we need to make sure we resolve this ambiguity that the LLM is observing. And the

## 在写代码前把规则转成约束 / Checking constraints before writing code

[01:52:17.440—01:52:36.460](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=6737s)

……这个项目的范围和我们为什么要做它，根据近期公开研究，提示词不明确时，大模型生成代码的正确率会下降 20% 到 40%。

scope and the reason we put an effort into this project is based on public research and recent research, we observed there's a 20 to 40 percent drop with unclear prompts on the accuracy the LLM in the code accuracy, right?

[01:52:36.780—01:52:54.460](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=6756s)

即使代码有效，写出来之后仍有 60% 到 90% 是错的。我们还观察到，这种情况下部署代码，回归问题大约会多一倍。那么这类缺陷藏在哪里？

And 60 to 90% of valid code is still wrong after it writes it. And also in that case, we observe two times the more more regressions when we deploy that code. So where do bugs like these hide, right?

[01:52:54.580—01:53:08.240](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=6774s)

我们想在缺陷进入代码库之前就把它们找出来。做法类似于写设计文档、画流程图，在写任何代码之前先确认流程成立。

We wanna detect these bugs before they reach the code base. And the only way to do that, it's similar to how we write design docs, similar to how we draw diagrams to make sure the flow is set before we write any code.

[01:53:08.380—01:53:54.440](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=6788s)

我们希望第一轮验证可以不用人先读这些文件。单个句子的问题可能是意思不明确，或措辞的细节程度不合适。跨句子则会发现规格或规则里的冲突和缺口。既要检查单句，也要比较句子之间的关系、查找歧义。我们用了一个三步流程，先让大模型自己尝试把措辞改清楚。能改清楚就好。它做不到时，我们会把英语表述形式化，转换成 SMT……

We want to verify that without a human or anyone reading these files as the first reviewer. In one sentence, let's say the ambiguity and wording wrong level of detail, but across sentences, we can observe conflicts and gaps in these specification or rules, right? Sentences need review, such need search between them and ambiguity searches. So we have a three-step process to do this where the LLM will first refine it. It'll try to clean up the wording on its own. And if it succeeds, then well and good. But if it cannot, we then formalize the English language into SMT

[01:53:54.440—01:54:31.940](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=6834s)

……公式。我们把用 SMT-LIB 表达的内容交给可满足性求解器。它会返回一个布尔结果，告诉我们在给定场景下，是否存在同时满足这些约束的赋值。业务意图需要由规格负责人判断。如果求解器返回的结果表明表达式有效，我们就不再处理。如果发现两句话之间有歧义，或者一句话本身有两种意思，我们会把问题指出来，让大模型重新检查那句话，再迭代一轮。

formulas. So SMT lib is a certain type of function which we pass to a SAT solver, a satisfiability checker, where it's going to give out a boolean saying this expression that you've given me is valid, true, or false, invalid. And then once the solver gets back to us, if that expression is valid, then we don't do anything. But if it detects any ambiguity between two sentences or within a sentence where there's two meanings to a sentence, then we detect that and tell the LLM to recheck that sentence, and it's going to reiterate on that.

[01:54:33.320—01:54:48.640](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=6873s)

例如，刚才那条规则说，提交订单时如果没有库存，就把它列为待补货订单。用 SMT 写出来，大概就是图中这样，像数学公式。

For example, the rules we saw, we have seen when orders submitted and inventories are unavailable, we shall place the order as a backorder, and in SMT format, it kind of looks like this, like math formula, right?

## 用逻辑等价分析不同的解读 / Grouping interpretations by logical equivalence

[01:54:54.200—01:55:19.020](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=6894s)

进一步检查时，我们还有一个三步流程。首先，对翻译反复采样，请大模型翻七次或十次，看看它的表现究竟源于模型本身的能力，还是有其他因素导致它这样理解。

Once we go deeper, once we detect this, we also do a three-step process again, where we sample the translations again and again. We ask the LLM to translate seven times or 10 times, and to understand whether this LLM is behaving this way based on its inherent capabilities or is something affecting it to behave this way.

[01:55:19.020—01:55:45.860](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=6919s)

接着，按逻辑等价关系把这七次或十次得到的解读归类，看看哪些结果出自模型自行采用的哪些假设。然后，要么接受结果，要么请用户澄清歧义，也可以暂缓把这一条实现到代码里。

And then based on logical equivalence of these seven or 10 different set of interpretations by the LLM, we cluster them on logical equivalence, which entries came under which assumptions that the LLM made for itself. And then we accept or ask the user to clear out the ambiguity or abstain from implementing that in the code base.

## 把歧义、冲突和缺口呈现给用户 / Bringing ambiguity, conflicts, and gaps to the user

[01:55:51.320—01:56:10.560](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=6951s)

这是一个请人决定怎么处理的例子。这条规则可能存在矛盾。「移除记录」这种说法很含糊。大模型可以自己任选一个解释，但我们不应该让它自行决定。

This is an example of asking the human what you want to do with that. That's a rule that was perhaps contradicting. Remove the record is a very vague statement. The LLM can interpret anything it wants, but we shouldn't allow that to happen.

[01:56:10.820—01:56:30.360](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=6970s)

我们给出两个选项。是删除这条记录，还是保留它但对用户隐藏？用户更希望哪一种？刚才看到的 R2 与 R3 互相冲突（编号按 01:51:33 和 01:54:41 原图），那就是冲突。

And we either give two options. we keep it as if the record is deleted or we retain it and hide it from the users. Which one does the user prefer? A conflict is when the example we saw rule one is conflicting with rule three.

转写校注。The conflict shown on the slide is between R2 and R3. The English machine transcript says “rule one”.

[01:56:30.860—01:57:11.120](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=6990s)

缺口则是没有任何规则涵盖某个情况。比如这里没有规则说明处于闲置状态的订单该怎么处理。大模型发现了，不对，是整个流程发现了这个情形没有对应条目，规格里漏了东西。归根结底，这个工具的能力也有限。规格写得对不对，最终只有用户知道。把规则发给大模型之前，用户需要逐一检查每一段内容。

And a gap is where no rule covers an idle order in this example, where the LLM detected an actual, sorry, process or pipeline detected, there's no entry for this rule where you are missing something. All in all, it cannot do a lot of things, end of the day. We want to make sure there is no oracle for specification correctness other than the user. User needs to make sure to to check every part of the snippet, part of the rule book before sending it to the LLM.

[01:57:12.780—01:57:30.840](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=7032s)

工具只能帮忙。用户之所以在这里更重要，是因为他们掌握没有明说的领域知识。大模型不知道其中许多知识，没办法作保证。这个保证只能由用户给出。

And we, as a tool, only can help them. And the user is more important here because of implicit domain knowledge. The LLM doesn't know a lot of domain knowledge and there's no guarantee. I mean, LLM only user can give that guarantee, right?

## 规格的判断由谁负责 / Who decides what the specification should say

[01:57:30.940—01:58:21.580](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=7050s)

目前，把形式化方法用到 Agent 上的证据还有限，这项技术还在发展。今天希望大家带走的是，规格交给 Agent 之前，一定要先检查。把多次翻译按逻辑等价归类，以区分大模型的不同解读，并找出真正出问题的地方。让人来决定。我们把选项给人，如果没有答案，就使用大模型裁判，或者不实现那一部分。这里是参考资料。这项工作主要由我的团队……

And there's thin evidence right now for formalization in agents we are emerging in this technology. What do we take back from this talk? Check the spec always before you pass it down to the agent. Cluster the translation. What we do is we cluster the translation by logical equivalence to determine the different LLM interpretations and where it's genuinely going wrong. The LLM human decide. We give the human options and if there's no answer to that, we use LLM judges or abstain from implementing that piece. Here are the references and this work has

[01:58:21.580—01:58:34.560](https://www.youtube.com/watch?v=ZZ19zhYnDKY&t=7101s)

……完成，包括 Andrila Jotin、Stefan、Nadia 和 Jeremy Delmos〔姓名按转写〕。可以看他们的博文和这里给出的网页链接，进一步了解。

been majorly contributed by my team, Andrila Jotin, Stefan, Nadia, and Jeremy Delmos. You can check out their blog and the website link provided and delve deeper into that.
