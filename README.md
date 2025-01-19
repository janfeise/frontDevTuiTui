# TuiTui
前端开发TuiTui

## 步骤

在终端（或者vscode打开项目文件夹）后，命令行窗口运行：

### 0. 所需环境

- git
- node.js
- webpack

可在终端运行以下命令检查是否下载
```shell
git -v
node -v
npm -v
npm list -g webpack
```

若有类似的输出：
```shell
git version 2.47.1.windows.2
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

则表示已下载

#### 下载webpack

```shell
npm install -g webpack webpack-cli
```

### 1. 克隆

```shell
git clone https://github.com/janfeise/frontDevTuiTui.git
cd .\frontDevTuiTui\
```

### 2. 下载依赖

```shell
npm i
```

### 3. 运行项目

```shell
npx webpack serve
```

### 4. 打包

项目编辑修改后，若需打包：
```shell
npm run build
```

## 项目简绍

