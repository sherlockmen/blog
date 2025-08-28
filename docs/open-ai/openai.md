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
├── types                               ---定义类包
└── version.py                          ---公共版本访问入口
```
### 1.3 SDK方法详细分析
这个章节主要会列举SDK中的重要的方法及使用的简单样例

#### 1.3.1 BaseClient

`BaseClient`是`OPEN AI SDK`的基础核心客户端方法类，是一个功能完整的HTTP客户端库，提供了同步和异步两种方式的API调用支持。这个方法基于httpx构建，整合了pydantic用于数据验证和序列化，支持请求重试、分页处理、流式响应等高级功能。代码设计注重类型安全和灵活性，适用于构建各种REST API客户端。
下图是`BaseClient`类的方法树，为了方便可以方法查看，这里使用了Drawio的形式呈现。

[file](../file/base_client.drawio ':include :type=code')

- 基础客户端类（BaseClient）

| 类/方法名                        | 类型 | 功能说明                    |
|------------------------------|----|-------------------------|
| `BaseClient`                 | 基类 | 所有客户端的抽象基类，提供核心HTTP处理逻辑 |
| `_build_headers()`           | 方法 | 构建请求头部，合并默认头部和自定义头部     |
| `_prepare_url()`             | 方法 | 准备完整的请求URL，合并基础URL和路径   |
| `_build_request()`           | 方法 | 构造HTTP请求对象，处理参数序列化      |
| `_make_status_error()`       | 方法 | 创建状态错误异常的工厂方法           |
| `_should_retry()`            | 方法 | 决定是否应该重试请求的策略方法         |
| `_calculate_retry_timeout()` | 方法 | 计算重试超时时间，实现指数退避算法       |
| `platform_headers()`         | 方法 | 生成包含平台信息的请求头            |

- 同步客户端组件（SyncAPIClient）

| 类/方法名                                             | 类型 | 功能说明                 |
|---------------------------------------------------|----|----------------------|
| `SyncAPIClient`                                   | 类  | 同步HTTP客户端实现          |
| `request()`                                       | 方法 | 发送HTTP请求的核心方法，支持流式响应 |
| `get()`, `post()`, `patch()`, `put()`, `delete()` | 方法 | 便捷的HTTP方法封装          |
| `get_api_list()`                                  | 方法 | 获取分页API数据            |
| `_request_api_list()`                             | 方法 | 内部处理API列表请求          |
| `_process_response()`                             | 方法 | 处理HTTP响应，进行数据转换和验证   |
| `_sleep_for_retry()`                              | 方法 | 同步重试等待实现             |

- 异步客户端组件（AsyncAPIClient）

| 类/方法名                                             | 类型 | 功能说明            |
|---------------------------------------------------|----|-----------------|
| `AsyncAPIClient`                                  | 类  | 异步HTTP客户端实现     |
| `request()`                                       | 方法 | 异步发送HTTP请求的核心方法 |
| `get()`, `post()`, `patch()`, `put()`, `delete()` | 方法 | 异步HTTP方法封装      |
| `get_api_list()`                                  | 方法 | 异步获取分页API数据     |
| `_request_api_list()`                             | 方法 | 内部处理异步API列表请求   |
| `_process_response()`                             | 方法 | 异步处理HTTP响应      |
| `_sleep_for_retry()`                              | 方法 | 异步重试等待实现        |

- 分页处理组件

| 类/方法名              | 类型  | 功能说明             |
|--------------------|-----|------------------|
| `PageInfo`         | 类   | 存储分页信息，用于构建下一页请求 |
| `BasePage`         | 抽象类 | 分页基类，定义分页接口      |
| `BaseSyncPage`     | 类   | 同步分页实现，支持迭代和分页遍历 |
| `BaseAsyncPage`    | 类   | 异步分页实现，支持异步迭代    |
| `AsyncPaginator`   | 类   | 异步分页迭代器，支持异步分页获取 |
| `has_next_page()`  | 方法  | 检查是否有下一页         |
| `next_page_info()` | 方法  | 获取下一页信息          |
| `iter_pages()`     | 方法  | 迭代所有页面           |
| `get_next_page()`  | 方法  | 获取下一页数据          |

- 响应处理组件

| 类/方法名                      | 类型 | 功能说明             |
|----------------------------|----|------------------|
| `APIResponse`              | 类  | 同步API响应包装器       |
| `AsyncAPIResponse`         | 类  | 异步API响应包装器       |
| `BaseAPIResponse`          | 基类 | API响应基类          |
| `LegacyAPIResponse`        | 类  | 传统响应类，用于向后兼容     |
| `parse()`                  | 方法 | 解析响应数据           |
| `_process_response_data()` | 方法 | 处理响应数据，进行类型转换和验证 |

- 流处理组件

| 类/方法名             | 类型 | 功能说明                  |
|-------------------|----|-----------------------|
| `Stream`          | 类  | 同步流处理类                |
| `AsyncStream`     | 类  | 异步流处理类                |
| `SSEDecoder`      | 类  | Server-Sent Events解码器 |
| `SSEBytesDecoder` | 类  | SSE字节流解码器             |

- 异常处理组件

| 类/方法名                                | 类型  | 功能说明        |
|--------------------------------------|-----|-------------|
| `APIStatusError`                     | 异常类 | HTTP状态错误异常  |
| `APITimeoutError`                    | 异常类 | 请求超时异常      |
| `APIConnectionError`                 | 异常类 | 连接错误异常      |
| `APIResponseValidationError`         | 异常类 | 响应验证错误异常    |
| `_make_status_error_from_response()` | 方法  | 从响应创建状态错误异常 |

- 配置和工具类

| 类/方法名                    | 类型 | 功能说明        |
|--------------------------|----|-------------|
| `FinalRequestOptions`    | 类  | 最终请求选项配置    |
| `RequestOptions`         | 类型 | 请求选项类型定义    |
| `make_request_options()` | 函数 | 创建请求选项的辅助函数 |
| `Querystring`            | 类  | 查询字符串处理工具   |
| `_merge_mappings()`      | 函数 | 合并映射的辅助函数   |

- 类型定义和常量

| 名称                               | 类型   | 功能说明             |
|----------------------------------|------|------------------|
| `Body`, `Query`, `Headers`       | 类型别名 | 请求体、查询参数、头部的类型定义 |
| `ResponseT`, `StreamT`           | 类型变量 | 响应和流的泛型类型        |
| `NOT_GIVEN`, `NotGiven`          | 特殊值  | 表示未提供值的标记        |
| `DEFAULT_TIMEOUT`, `MAX_RETRIES` | 常量   | 默认配置常量           |

- 平台检测工具

| 函数名                    | 类型 | 功能说明          |
|------------------------|----|---------------|
| `get_platform()`       | 函数 | 检测运行平台（操作系统）  |
| `get_architecture()`   | 函数 | 检测系统架构        |
| `get_python_runtime()` | 函数 | 获取Python运行时信息 |
| `get_python_version()` | 函数 | 获取Python版本信息  |

- 文件处理工具

| 函数名                      | 类型 | 功能说明             |
|--------------------------|----|------------------|
| `to_httpx_files()`       | 函数 | 转换文件到httpx格式（同步） |
| `async_to_httpx_files()` | 函数 | 异步转换文件到httpx格式   |


#### 1.3.2 Client
基于`BaseClient`OPEN-AI SDK提供了针对OpenAI API的专门封装，支持同步和异步两种调用模式，下图是`client`的代码结构，
可以看出在这个client类中，定义了5个类，`BaseClient`、`OpenAIWithRawResponse`、`AsyncOpenAIWithRawResponse`、`OpenAIWithStreamedResponse`、`AsyncOpenAIWithStreamedResponse`
同步客户端`OpenAI`、异步客户端`AsyncOpenAI`均是`BaseClient`的继承实现。

[file](../file/client.drawio ':include :type=code')






		
		
		
		
		
		
		


