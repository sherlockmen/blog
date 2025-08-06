# 大模型应用开发手册

## 一、OPEN-AI-PYTHON SDK
我翻遍了很多教程和文档手册对与 ***open-ai sdk*** 的解读都比较少，包括官方文档在内都是仅提供了高频使用方法的解读和样例，我希望可以通过这个文档整理清楚 ***open-ai sdk*** 的相关方法，也方便后面大家开发的时候能够快速的查询相关方法。

---

> OPEN AI官方文档链接 <https://platform.openai.com/docs/overview>
> 如果打不开的话您可能需要使用一些科技 :sweat_smile: :sweat_smile: :sweat_smile:

### 1.1 环境
文档所使用的 `open ai sdk` 版本为 `1.98.0`，同时使用的为 `Python` 版本的sdk，Java、JS等版本的如果有时间会更新，如果后期有sdk更新的话也会及时同步
### 1.2 OPEN-AI-PYTHON SDK 项目目录结构树
```text
.
├── __init__.py                         ---初始化文件
├── __main__.py                         ---cli命令入口
├── _base_client.py                     ---OPEN AI SDK HTTP通信核心类
├── _client.py                          ---OPEN AI SDK 核心客户端实现
├── _compat.py                          ---处理 Pydantic v1 和 v2 之间的兼容性
├── _constants.py                       ---HTTP 客户端的常量
├── _exceptions.py                      ---异常处理
├── _files.py                           ---文件处理
├── _legacy_response.py                 ---响应处理（过期）
├── _models.py                          ---定义了所有 API 数据模型的基类BaseModel和相关的工具函数
├── _module_client.py                   ---API 资源访问入口
├── _qs.py                              ---查询字符串(querystring)处理的工具模块
├── _resource.py                        ---封装 HTTP 方法和基础功能
├── _response.py                        ---响应处理
├── _streaming.py                       ---流式响应处理核心模块
├── _types.py                           ---定义整个 SDK 中使用的各种类型别名、协议和特殊标记类
├── _utils
├── _version.py                         ---版本号、SDK名称
├── cli
├── helpers
├── _extras
├── lib
├── pagination.py                       ---分页工具
├── py.typed
├── resources
├── types                               ---
└── version.py                          ---公共版本访问入口
```



