---
order: 1
title: 快速开始

nav: 文档
group: 文档

filePath: null
---

## AlloyForm

`alloy-form`一个简单实用的通过 `JSONSchema` 配置， 实现 `React` 中后台 **表单解决方案**。

> 它上手简单容易操作，但是可以满足我们各种复杂的表单场景需求，包含输入框，下拉选择框等多个内置组件，并且支持自定义组件接入。同时可以通过配置支持[表单联动](/guide/watch)，[表单校验](/guide/rule)等复杂功能。

### 安装

**`使用前请预先安装 ant-design和React`**

```sh
npm install alloy-form
或
yarn add alloy-form
或
pnpm install alloy-form
```

### 简单的 demo

```tsx
import React from 'react';
import { AlloyForm,  useForm } from 'alloy-form';

const schema = {
  type: 'object',
  title: '简单的 demo',
  description: '简单的 demo',
  itemProps: {
    width: '500px',
    props: {},
  },
  properties: {
    name: {
      label: '姓名',
      format: 'Input',
      props: {
        placeholder: '请输入姓名',
        type: 'string',
      },
    },
    age: {
      label: '年龄',
      format: 'Input',
      props: {
        type: 'number',
      },
    },
  },
};
import { Input  } from 'antd';

export default function BasicDemo(): JSX.Element {
  const form = useForm({ schema });
  const [isShow, setIsShow] = React.useState(false);
  const components = { Input }
  function onSubmit() {
    setIsShow(true);
    form.validateFields()
    console.log(form.getData());
  }
  return (
    <>
      <AlloyForm form={form} components={components} />
      <div style={{ width: 300, textAlign: 'center' }}>
        <button onClick={() => onSubmit()}>提交数据</button>
        {isShow && (
          <div style={{ color: '#999', marginTop: 10 }}>
            请在console查看数据
          </div>
        )}
      </div>
    </>
  );
}
```

### 组件 **API**

| 参数  <div style="width:100px">   | 描述                                                                             | 类型       <div style="width:100px">       | 是否必填 | 默认值 |
| -----------------------------------| ------------------------------------------------------------------------------- |---------------------------------| -------- | ------ |
| form | 使用 useForm 创建的表单实例，与 AlloyForm 一对一绑定 详见 [useForm](/guide/use-form) | `FormInstanceProps` | `是`     | `--`   |
| components | 表单中的使用的组件 | `Record<string, React.ReactNode>` | `是`     | `--`   |
| watch| 时间选择器字段描述 区分样式 详见 [表单联动](/guide/watch)                           | `Record<string, (val: any, key?: string) => any>` | `否`     | `--`   |
| className| class name                           | `string` | `否`     | `--`   |
