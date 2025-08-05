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
│   ├── __init__.py
│   ├── __pycache__
│   ├── _common.py
│   ├── numpy_proxy.py
│   ├── pandas_proxy.py
│   └── sounddevice_proxy.py
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
│   ├── __init__.py
│   ├── __pycache__
│   ├── _logs.py
│   ├── _proxy.py
│   ├── _reflection.py
│   ├── _resources_proxy.py
│   ├── _streams.py
│   ├── _sync.py
│   ├── _transform.py
│   ├── _typing.py
│   └── _utils.py
├── _version.py
├── cli
│   ├── __init__.py
│   ├── __pycache__
│   ├── _api
│   ├── _cli.py
│   ├── _errors.py
│   ├── _models.py
│   ├── _progress.py
│   ├── _tools
│   └── _utils.py
├── helpers
│   ├── __init__.py
│   ├── __pycache__
│   ├── local_audio_player.py
│   └── microphone.py
├── lib
│   ├── __init__.py
│   ├── __pycache__
│   ├── _old_api.py
│   ├── _parsing
│   ├── _pydantic.py
│   ├── _tools.py
│   ├── _validators.py
│   ├── azure.py
│   └── streaming
├── pagination.py
├── py.typed
├── resources
│   ├── __init__.py
│   ├── __pycache__
│   ├── audio
│   ├── batches.py
│   ├── beta
│   ├── chat
│   ├── completions.py
│   ├── containers
│   ├── embeddings.py
│   ├── evals
│   ├── files.py
│   ├── fine_tuning
│   ├── images.py
│   ├── models.py
│   ├── moderations.py
│   ├── responses
│   ├── uploads
│   ├── vector_stores
│   └── webhooks.py
├── types
│   ├── __init__.py
│   ├── __pycache__
│   ├── audio
│   ├── audio_model.py
│   ├── audio_response_format.py
│   ├── auto_file_chunking_strategy_param.py
│   ├── batch_create_params.py
│   ├── batch_error.py
│   ├── batch_list_params.py
│   ├── batch_request_counts.py
│   ├── batch.py
│   ├── beta
│   ├── chat
│   ├── chat_model.py
│   ├── completion_choice.py
│   ├── completion_create_params.py
│   ├── completion_usage.py
│   ├── completion.py
│   ├── container_create_params.py
│   ├── container_create_response.py
│   ├── container_list_params.py
│   ├── container_list_response.py
│   ├── container_retrieve_response.py
│   ├── containers
│   ├── create_embedding_response.py
│   ├── embedding_create_params.py
│   ├── embedding_model.py
│   ├── embedding.py
│   ├── eval_create_params.py
│   ├── eval_create_response.py
│   ├── eval_custom_data_source_config.py
│   ├── eval_delete_response.py
│   ├── eval_list_params.py
│   ├── eval_list_response.py
│   ├── eval_retrieve_response.py
│   ├── eval_stored_completions_data_source_config.py
│   ├── eval_update_params.py
│   ├── eval_update_response.py
│   ├── evals
│   ├── file_chunking_strategy_param.py
│   ├── file_chunking_strategy.py
│   ├── file_content.py
│   ├── file_create_params.py
│   ├── file_deleted.py
│   ├── file_list_params.py
│   ├── file_object.py
│   ├── file_purpose.py
│   ├── fine_tuning
│   ├── graders
│   ├── image_create_variation_params.py
│   ├── image_edit_completed_event.py
│   ├── image_edit_params.py
│   ├── image_edit_partial_image_event.py
│   ├── image_edit_stream_event.py
│   ├── image_gen_completed_event.py
│   ├── image_gen_partial_image_event.py
│   ├── image_gen_stream_event.py
│   ├── image_generate_params.py
│   ├── image_model.py
│   ├── image.py
│   ├── images_response.py
│   ├── model_deleted.py
│   ├── model.py
│   ├── moderation_create_params.py
│   ├── moderation_create_response.py
│   ├── moderation_image_url_input_param.py
│   ├── moderation_model.py
│   ├── moderation_multi_modal_input_param.py
│   ├── moderation_text_input_param.py
│   ├── moderation.py
│   ├── other_file_chunking_strategy_object.py
│   ├── responses
│   ├── shared
│   ├── shared_params
│   ├── static_file_chunking_strategy_object_param.py
│   ├── static_file_chunking_strategy_object.py
│   ├── static_file_chunking_strategy_param.py
│   ├── static_file_chunking_strategy.py
│   ├── upload_complete_params.py
│   ├── upload_create_params.py
│   ├── upload.py
│   ├── uploads
│   ├── vector_store_create_params.py
│   ├── vector_store_deleted.py
│   ├── vector_store_list_params.py
│   ├── vector_store_search_params.py
│   ├── vector_store_search_response.py
│   ├── vector_store_update_params.py
│   ├── vector_store.py
│   ├── vector_stores
│   ├── webhooks
│   └── websocket_connection_options.py
└── version.py
```



