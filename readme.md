# BD-DEMO-MINI

本项目是某课题的展示平台精简版，去除了用户、登录等功能，仅供学习使用。

## 技术栈

- 后端: python3 + flask
- 前端: HTML/JS/CSS
- 版本控制: git
- js库: Jquery, Echarts

## 本地部署

1. 克隆本项目：`git clone https://github.com/superpung/bd-demo-mini.git && cd bd-demo-mini`
2. 安装依赖：`pip3 install -r requirements.txt`
3. 运行：`python3 run.py`
4. 在浏览器中打开：http://localhost:8000/

> **Note**
> 注意 `requirements.txt` 需要根据自己的项目修改。

> **Warning**
> 如果报错，请检查 `requirements.txt` 中的版本信息，可以尝试：
> ```
>   flask-socketio==4.3.2
>   Werkzeug==2.0.1
> ```

## 自定义

只需要修改 4 个文件：
1. `app/api/algorithm.py`
2. `app/api/views.py`
3. `app/static/js/service/service.js`
4. `app/templates/main.html`

### `algorithm.py`

本文件存放你的算法接口，只需要将所有要展示的算法封装在 `Algorithm` 类的函数中即可。

### `view.py`

本文件是算法的接口路由，连接 `algorithm.py` 和 `service.js`，只需要在 `api_num_changed` 函数中为每一个算法函数进行编号，根据前端传来的参数分别返回即可。

### `service.js`

本文件负责前端发送请求并处理后端返回的响应，连接 `view.py` 和 `main.html`，只需要在 `algoT1` 函数中处理 html 元素内容即可。

### `main.html`

本文件是算法展示的前端界面，只需要更改 `标题`、`算法分类1` 以及它下面的算法名称，做到算法和编号（即 `id`）一一对应即可。
