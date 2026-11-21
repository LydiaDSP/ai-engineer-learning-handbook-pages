# 给老系统建软件工厂，从写清已有承诺开始

Justin McCarthy

中英整理稿

中文和英文均为按演讲整理的编辑转述。带时间戳的英文机器转写原文可在下方来源说明打开。

依据 11 月 12 日主直播整理。早期系统、团队经验和用一周搭建工厂是 McCarthy 的陈述。需求工厂属于他提出的探索方向。 页面同时提供中文导读、按时间定位的中英整理稿和参考练习。

[英文音频转写原文（带时间戳）](transcript-original.txt)

## 给探索和维护留出不同的工作方式 / Choose a mode before building a factory

[06:34:30 至 06:35:24](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=23670s)

Diffusion 创始人 Justin McCarthy 想讨论软件工厂应该用在哪些工作上。他更关心可以把什么交给稳定循环，以及哪些决定需要人和客户一起试出来。

Diffusion founder Justin McCarthy asks which work belongs in a software factory. He is interested in what can move into a stable loop and what still has to be worked out with customers.

[06:35:24 至 06:36:47](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=23724s)

他回忆在 Claude 4 时代把模型接成循环的经历。早期结果偶尔能稳定下来，代价是大量 token 和特意拼装的各类组件。后来模型和运行框架变强，维持这类循环所需的定制有所减少。

He recalls building model loops in the Claude 4 era. Early systems occasionally stabilized, at substantial token expense and with a collection of hand-built components. Better models and harnesses later reduced the amount of custom machinery needed to keep those loops useful.

[06:36:47 至 06:37:43](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=23807s)

他建议在目标还没有说明白的时候少用工业化流程。探索产品市场契合度需要先问客户是否在意某个结果，过早提高交付速度会把试探性的想法变成昂贵的工程项目。

He urges teams to hold back from industrializing work whose goal is unclear. Searching for product–market fit begins by learning whether customers care about an outcome. Scaling delivery too early can turn a provisional idea into an expensive engineering project.

## 用正在发生的行为界定承诺 / Name the promises in a running product

[06:37:43 至 06:38:32](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=23863s)

已有系统带着可以观察的需求。客户付费、反复使用同样的流程，也会在出问题时联系支持。这些信号让团队知道改造时应该保住哪些行为。

An existing system comes with observable demand. Customers pay for it, repeat workflows and contact support when something goes wrong. These signals tell the team which behaviors an internal change has to preserve.

[06:38:32 至 06:39:10](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=23912s)

这给偿还技术债提供了比较清楚的起点。用户期望的功能已经跑在系统里，团队可以尝试重写内部实现，并对照原来提供的结果。

That makes technical debt a clearer starting point. Expected functionality is already running, so the team can change the internal implementation and compare the results with what the service was already delivering.

[06:39:10 至 06:40:25](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=23950s)

Diffusion 把需要持续兑现的预期称作承诺。功能是承诺，成本、价格和安全也是。只规定一个按钮还在，可能漏掉用户真正依赖的响应时间、权限或账单。

Diffusion calls an expectation that should continue to hold a promise. Features count, as do cost, price and security. Checking that a button still exists can overlook the response time, permissions or bill a customer relies on.

## 让反馈进入持续运行的循环 / Route evidence into a continuous loop

[06:40:25 至 06:41:04](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=24025s)

他用放大电路上的反馈支路解释软件工厂。输出产生之后要把质量信号送回输入端，避免循环只会不断放大噪声。代码生成之外，还得安排能影响下一轮判断的反馈。

His analogy is the feedback leg in an amplifier. The output should send a quality signal back toward the input, so the loop does not simply amplify noise. In addition to generating code, the system needs feedback that can change the next decision.

[06:41:04 至 06:42:09](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=24064s)

以前的提交会随上班时间和工作周起伏。已有产品的性能退化和维护问题可以在任意时段出现，所以 McCarthy 希望后台持续检查承诺，把有用的信号留给下一轮处理。

Commits once followed daily and weekly work schedules, but maintenance issues and performance regressions can occur at any hour. McCarthy wants a background system that continues to check promises and preserves useful signals for the next decision.

[06:42:09 至 06:42:42](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=24129s)

McCarthy 希望维护循环持续在后台运行，替团队守住存量系统的承诺。这样团队能把更多精力投到新领域，探索应该做什么、有没有产品市场契合的机会。

McCarthy wants the maintenance loop to keep the existing system's promises in the background. This frees the team to explore new ground and look for product–market fit.

## 保住结果，再改善性能 / Keep the outcome while improving performance

[06:42:42 至 06:44:58](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=24162s)

他看到自己的工厂随着模型和运行框架改进而变简单，技能说明更短，专门的零件更少。他用发动机迭代说明减少组件也需要工程上的理解。

He has seen his own factory simplify as models and harnesses improve, with shorter skills and fewer specialized parts. He compares that process to engine redesign, where reducing the part count also requires engineering understanding.

[06:44:58 至 06:45:25](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=24298s)

他推荐给存量系统提一个具体目标，例如保住现有行为，同时减少延迟。如果性能提高要靠增加成本或牺牲安全，团队得先判断还能不能兑现原先的承诺。

He recommends giving a running system a concrete goal, such as keeping its behavior while reducing latency. If the faster path costs more or trades away safety, the team has to check whether it can still keep the original promises.

[06:45:25 至 06:46:53](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=24325s)

要求系统变得“更好”时，团队可能需要补上人的意图和判断，再回到产品探索。对于已有明确承诺的存量系统，McCarthy 说，按他的经验，搭起工厂约需一周。

Making a product broadly “better” can require more human intent and judgment, and a return to discovery. For a system with existing commitments, McCarthy says that in his experience it takes about a week to set up a brownfield factory.

## 当供给加快，回头验证需求 / Match production speed to actual demand

[06:46:53 至 06:47:44](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=24413s)

软件产能变大以后，客户未必能消化同等数量的功能。他用毛利、新客户和品牌差异举例，说明用户有时要的是业务变化，几个新开关本身做不到这些事。

Greater software production does not mean customers can absorb the same number of features. He uses margins, customer growth and differentiation as examples of business outcomes that a few new controls may fail to deliver.

[06:47:44 至 06:49:58](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=24464s)

他把让市场学习跟上生产速度的设想称为需求工厂。Agent 可以帮忙决定下一步问市场什么，把新回应与既有反馈比较后重排问题，再分配有限的实验资源。他明确说这个想法仍在探索。

He calls the idea of bringing market learning up to speed with production a demand factory. Agents could prioritize questions for the market, compare new answers with past feedback, and help allocate limited experimental capacity. He presents it as an open idea.

[06:49:58 至 06:50:41](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=24598s)

气泡水品牌推出含咖啡因的新品，消费者还能理解。改卖机油，就越过了品牌现有关系的边界。他用这个例子提醒团队把市场实验放在客户愿意接受的承诺范围内。

Consumers can make sense of a sparkling-water brand launching a caffeinated drink. Selling motor oil would stretch its existing relationship with customers much further. The example sets a boundary for experiments around promises the market might accept from that company.

[06:50:41 至 06:52:04](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=24641s)

他最后强调让市场需求与生产速度相匹配，避免交付节奏超过客户能承受的变化。他接着提出，可以寻找更多客户，争取现有客户更多支出份额，并把新增产品组织成有条理的产品线。

He closes by matching market demand with production speed so that delivery does not overwhelm customers' capacity for change. He suggests finding more customers, earning a higher share of existing customers' spending, and organizing additional offerings into coherent product lines.
