# 用负载试验找出适合当前机器的模型服务配置

Rohan Pandey

中英整理稿

中文和英文均为按演讲整理的编辑转述。带时间戳的英文机器转写原文可在下方来源说明打开。

根据第二日直播对应场次的本地英文机器转录整理，用大会赛后阅读版核对讲者、场次与术语。中英正文为同一内容的编辑转述，数据和产品经历按讲者陈述归属。 页面同时提供中文导读、按时间定位的中英整理稿和参考练习。

[英文音频转写原文（带时间戳）](transcript-original.txt)

## 让 Optuna 根据上一轮结果挑下一组 / Let Optuna use the last results to choose another trial

[02:13:39 至 02:14:31](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=8019s)

Rohan Pandey 展示一个优化模型服务配置的实验工具。目标是缩短人工反复试配置的时间，让搜索在后台继续跑完。

Rohan Pandey shows an experimental tool that optimizes model-serving settings. It aims to reduce manual trial and error by running the search in the background.

[02:14:31 至 02:15:05](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=8071s)

讲者用贝叶斯优化来安排试验。试验结果可以作为选择下一组参数的依据，在有限轮数里优先探索有希望的组合。

Pandey uses Bayesian optimization to select trials. Results from earlier combinations guide which promising configurations to try within a fixed budget.

[02:15:05 至 02:15:45](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=8105s)

Optuna 实现了试验循环。从起始配置开始，每轮测量并评分，把结果带到下一轮，直到用完设定的试验预算。

Optuna implements the loop. It begins with a baseline configuration, measures and scores each trial, and uses the results for the next proposal until the trial budget runs out.

## 先固定模型、硬件和负载 / Fix the model, hardware, and workload first

[02:15:45 至 02:16:02](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=8145s)

演示中，一台云服务器已经加载 GPT-OSS 120B。模型权重和起始配置准备好以后，才开始比较这个环境里的服务参数。

A cloud instance in the demo already has GPT-OSS 120B loaded. The weights and starting configuration are in place before the tool compares serving settings for that environment.

[02:16:02 至 02:16:48](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=8162s)

他的测试配置包含短聊天、长聊天、RAG 和批量分类。各自的输入、输出 token 长度可以改，方便逼近想服务的请求形状。

The test recipe has short chat, long chat, retrieval-augmented generation, and batch classification. Each has configurable input and output lengths to represent the intended traffic.

[02:16:48 至 02:17:32](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=8208s)

命令指定试验名称、起始 YAML、硬件和试验次数。现场示例设为 24 次。Pandey 说，一批搜索通常要跑几小时。

The command specifies a study name, a starting YAML, the hardware, and a trial budget. The demo command calls for 24 trials. Pandey says a search typically runs for hours.

## 把调参结果留成报告和配置 / Keep both a report and a deployable recipe

[02:17:32 至 02:17:52](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=8252s)

HTML 报告列出最高分和最佳轮次。打开的是此前跑过的 GPT-OSS 120B 报告，共 50 次试验，其中第 47 轮最佳。

The HTML report shows the highest score and the best trial. The GPT-OSS 120B report comes from an earlier run of 50 trials, with trial 47 winning.

[02:17:52 至 02:18:07](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=8272s)

工具还输出一份优化后的 YAML，列出被选中的参数值。部署前可以先用其中的值在同一个条件下重复一次测试。

The tool produces an optimized YAML recipe with the selected values. An operator can rerun the test under matching conditions before using those settings.

[02:18:07 至 02:18:12](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=8287s)

这个示例用满足延迟目标的加权 token 吞吐作为 goodput，给各轮配置评分。

This example scores candidate settings by goodput, measured as weighted tokens per second under the latency targets.

## 把案例里的提升放回各自试验 / Read each reported gain in its own setting

[02:18:12 至 02:18:24](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=8292s)

在这次 GPT-OSS 试验中，讲者报告最佳配置的 goodput 比第一组配置高约 17.5%。这个结果对应当时的模型、硬件和负载。

Pandey reports that the best GPT-OSS configuration achieved about 17.5% higher goodput than the first configuration in that run. The result applies to the tested model, hardware, and workload.

[02:18:24 至 02:18:51](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=8304s)

另一份 DeepSeek R1 Distill 历史报告跑了九次，第九次最佳。讲者报告该次搜索的 token 吞吐约翻倍，生成 token 之间的延迟接近减半。

A separate historical run for DeepSeek R1 Distill used nine trials. The ninth performed best. Pandey reports about twice the token throughput and nearly half the inter-token latency.

[02:18:51 至 02:19:05](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=8331s)

演讲用两份输出收尾。HTML 给人看试验路径，YAML 把当前找到的配置带到部署或后续验证里。

The talk closes with its two outputs. The HTML shows how the trials unfolded, and the YAML carries the selected settings into verification or deployment.
