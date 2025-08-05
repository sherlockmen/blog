# 大模型应用开发手册

## 一、OPEN-AI-PYTHON SDK
我翻遍了很多教程和文档手册对与 ***open-ai sdk*** 的解读都比较少，包括官方文档在内都是仅提供了高频使用方法的解读和样例，我希望可以通过这个文档整理清楚 ***open-ai sdk*** 的相关方法，也方便后面大家开发的时候能够快速的查询相关方法。

---

> OPEN AI官方文档链接 <https://platform.openai.com/docs/overview>
> 如果打不开的话您可能需要使用一些科技 :sweat_smile: :sweat_smile: :sweat_smile:

### 1.1 环境
文档所使用的open ai sdk版本为1.98.0，同时使用的为Python版本的sdk，Java、JS等版本的如果有时间会更新，如果后期有sdk更新的话也会及时同步
### 1.2 OPEN-AI-PYTHON SDK 项目目录结构树
```text
.
├── __init__.py
├── __main__.py
├── _base_client.py
├── _client.py
├── _compat.py
├── _constants.py
├── _exceptions.py
├── _extras
├── _files.py
├── _legacy_response.py
├── _models.py
├── _module_client.py
├── _qs.py
├── _resource.py
├── _response.py
├── _streaming.py
├── _types.py
├── _utils
├── _version.py
├── cli
├── helpers
├── lib
├── pagination.py
├── py.typed
├── resources
├── types
└── version.py
```



