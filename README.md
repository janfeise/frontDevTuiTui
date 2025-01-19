# TuiTui

前端开发 TuiTui 项目的文档

## 步骤

在终端（或者在 VS Code 中打开项目文件夹）中运行以下命令：

### 0. 所需环境

确保已安装以下工具：

- **git**
- **node.js**
- **webpack**

可以通过运行以下命令来检查是否已安装这些工具：

```bash
git -v
node -v
npm -v
npm list -g webpack
```

如果出现类似以下输出，表示已安装：

```
bash复制编辑git version 2.47.1.windows.2
v22.13.0
10.9.2
+-- webpack-cli@6.0.1
| +-- @webpack-cli/configtest@3.0.1
| | `-- webpack@5.97.1 deduped
| +-- @webpack-cli/info@3.0.1
| | `-- webpack@5.97.1 deduped
| +-- @webpack-cli/serve@3.0.1
| | `-- webpack@5.97.1 deduped
| `-- webpack@5.97.1 deduped
`-- webpack@5.97.1
  `-- terser-webpack-plugin@5.3.11
    `-- webpack@5.97.1 deduped
```

如果没有安装 `webpack`，请运行以下命令安装：

```bash
npm install -g webpack webpack-cli
```

### 1. 克隆仓库

首先，克隆项目代码到本地：

```bash
git clone https://github.com/janfeise/frontDevTuiTui.git
cd frontDevTuiTui
```

### 2. 下载项目依赖

安装项目所需的依赖：

```bash
npm install
```

### 3. 启动项目

启动开发服务器：

```bash
npx webpack serve
```

服务器启动成功，可在`http://localhost:3000/`打开

### 4. 打包项目

项目开发完成后，可以通过以下命令进行打包：

```bash
npm run build
```

## 项目结构

```markdown
TuiTui/
├── AdminPanel            # 后台管理系统
├── client                # TuiTui 项目开发文件夹
│   ├── dist              # 打包生成的文件夹（构建输出）
│   ├── public            # 存放图片等静态资源文件
│   ├── src               # 项目源代码开发文件夹
│   │   ├── components    # React 组件
│   │   │   ├── context   # 全局状态管理（如 Redux 或 Context API）
│   │   │   ├── modules   # 组件模块（按功能组织的子模块）
│   │   │   └── pages     # 页面组件
│   │   ├── App.js        # 组织 React 项目的文件【关键文件】
│   │   ├── index.js      # 挂载 React 框架
│   │   ├── utilities.css # 常用样式【避免重复造轮子】
│   │   └── utilities.js  # 常用方法【避免重复造轮子】
├── .babelrc              # Babel 配置文件，用于 JavaScript 转译
├── .gitignore            # Git 忽略文件
├── README.md             # 项目说明文档
├── package-lock.json     # 项目依赖锁定文件
├── package.json          # 项目配置文件
└── webpack.config.js     # webpack 配置文件
```

