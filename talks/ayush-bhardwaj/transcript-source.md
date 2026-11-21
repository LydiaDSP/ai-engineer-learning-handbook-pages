# 读出 Agent 在命令后面写的可用性报告

Ayush Bhardwaj

中英整理稿

中文和英文均为按演讲整理的编辑转述。带时间戳的英文机器转写原文可在下方来源说明打开。

根据第二日直播对应场次的本地英文机器转录整理，用大会赛后阅读版核对讲者、场次与术语。中英正文为同一内容的编辑转述，数据和产品经历按讲者陈述归属。 页面同时提供中文导读、按时间定位的中英整理稿和参考练习。

[英文音频转写原文（带时间戳）](transcript-original.txt)

## Agent 怎样绕开难用的输出 / How agents work around awkward output

[01:46:46 至 01:46:57](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=6406s)

Bhardwaj 用一个小 CLI 帮 Agent 跨工具查找过往会话。改这个工具时，他发现自己的 Agent 经常在调用之后立刻处理一遍结果。

Bhardwaj built a small CLI to search previous agent sessions across tools. While refining it, he saw agents routinely process the tool’s output immediately after calling it.

[01:46:57 至 01:48:33](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=6417s)

他展示了三次实际调用。Claude Code 下载整个文档页并过滤到 40 行，Codex 从依赖报告里取出含汇总的末尾 40 行，Cursor 遇到测试失败后只保留最后 80 行。每次裁剪都假定答案出现在某个位置。

He shows three real calls. Claude Code downloaded a documentation page and filtered it to 40 lines. Codex kept the last 40 lines of a dependency report, where the totals appeared. Cursor encountered a test failure and kept the last 80 lines. Each cut assumes where the answer will be.

[01:48:33 至 01:49:01](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=6513s)

在讲者统计的约两万次调用样本里，约四分之一的输出接了过滤工具，读操作多的命令比例更高。这个样本让他能先定位自己常用的工具在哪里需要改。

About a quarter of roughly twenty thousand calls in his sample piped output through filters, with more filtering for read-heavy commands. The sample points to where the tools he actually uses can improve.

## 失败应该被输出和状态同时表达 / Report failure in both output and exit status

[01:49:01 至 01:49:09](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=6541s)

他用 cargo test 接 head 作例子。在 Bash 未启用 pipefail 时，管道的状态可能只反映最后一个命令，测试失败也有机会被显示成成功。

He uses cargo test piped to head as an example. With Bash pipefail disabled, the pipeline status can reflect only the last command, and a failed test may appear successful.

[01:49:09 至 01:49:32](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=6549s)

有的截图里既看得到编译错误，也看得到绿色状态。另一种情况更难发现，过滤后保留的行里没有错误，模型同时失去两条失败线索。

One screenshot shows a compiler error alongside a green status. The harder case is when the filter removes the error lines, leaving the model without either signal.

[01:49:32 至 01:51:29](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=6572s)

他建议让工具在失败时给出明确状态，把短摘要和完整日志位置放在容易保留下来的地方。这样 Agent 可以先知道失败，再回去取细节。

He recommends explicit failure status and a short summary with the location of the full log. An agent can recognize the failure first and retrieve details as needed.

## 把三个常见绕行改进 CLI / Put three common workarounds into the CLI

[01:51:29 至 01:52:09](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=6689s)

他在一个长会话里，用围绕命中位置的几千个字符代替整份记录。这个选项让调用方表达想看哪段，而不仅能限制字符数。

He replaces a long session dump with a few thousand characters surrounding a match. This gives callers a way to request the relevant segment as well as to limit its size.

[01:52:09 至 01:52:23](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=6729s)

当 Agent 反复用 Python 过滤 JSON，可能只需要若干字段。Bhardwaj 做了每条命中一行的紧凑输出，在他的例子里保持了相同的命中结果。

When agents repeatedly filter JSON with Python, they may need fewer fields. Bhardwaj added one-line-per-hit output that preserved the matches in his example.

[01:52:23 至 01:53:29](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=6743s)

很多 inspect 调用成组出现。让命令一次收多个会话 ID，就能把由 Agent 编写循环转换为一次批量读取。

Several inspect calls often arrived together. Accepting multiple session IDs in one command turned a loop written by the agent into a batch read.

[01:53:29 至 01:54:28](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=6809s)

他把 deep 选项改成空操作，Skill 里却还建议用它。此后的 95 次搜索全都传了这个参数。后来有两次会话加载新版 Skill，两次都停用了旧参数，并在首次读取时试了新选项。

He made the deep flag a no-op while the skill still recommended it. All 95 searches kept passing the flag. Two sessions later loaded a rewritten skill, dropped the old flag, and tried the new options on their first read.

## 用真实命令做回放和验收 / Replay real commands to evaluate changes

[01:54:28 至 01:55:00](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=6868s)

实际运行过的命令可以做测试输入，Agent 调用后接着使用了什么结果，则给出粗略的预期答案。新版返回的数据仍要包含完成原任务所需的内容。

Actual commands supply test inputs, and what the agent used next gives an approximate answer key. New output still has to preserve what the original task depended on.

[01:55:00 至 01:56:10](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=6900s)

他建议留出一部分样本验收。重新排名或改变默认输出后，既要检查典型成功路径，也要看有没有丢掉过去本来就能答对的例子。

He recommends holding back some examples for evaluation. When defaults or ranking change, check both representative improvements and cases that already worked before.

[01:56:10 至 01:56:33](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=6970s)

他举 DuckDB 的 Agent 模式为例，使用便于读取的表格并说明还有多少行，查询提前结束时会给出提示，错误也可以结构化返回。

He cites DuckDB’s agent mode as an example. It returns a simpler table, explains omitted rows, reports early termination, and can provide structured errors.

[01:56:33 至 01:59:01](https://www.youtube.com/watch?v=y9JtCCZP2MQ&t=6993s)

讲者说，DuckDB 的 Agent 模式让模型读取的工具输出缩短了 59%，省下的量约占模型总读取 token 的 0.5%，成本和运行时间没有改善。Infracost 的改动让原本答错的问题变成答对。他建议同时看答案是否正确、用了几轮，并用真实会话和可运行的测试检查工具改动。

Bhardwaj says DuckDB’s agent mode cut the tool output the model read by 59%. The savings were about 0.5% of all tokens the model read, and cost and runtime did not improve. Infracost’s redesign helped agents answer questions they had previously missed. He recommends tracking correct answers and turn counts, then testing changes against real sessions with runnable cases.
