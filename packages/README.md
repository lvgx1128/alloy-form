# ![alloy-form](https://cdn.lvgx.cn/assets/alloy-form-mini.png) alloy-form

`alloy-form`一个简单实用的通过 `JSONSchema` 配置， 实现 `React` 中后台 **表单解决方案**。

它上手简单容易操作，但是可以满足我们各种复杂的表单场景需求，包含输入框，下拉选择框等多个内置组件，并且支持自定义组件接入。同时可以通过配置支持[表单联动](http://docs.lvgx.cn/alloy-form/#/guide/watch)，[表单校验](http://docs.lvgx.cn/alloy-form/#/guide/rule)等复杂功能。

### [文档地址](http://docs.lvgx.cn/alloy-form)

### **安装**

alloy-form 依赖 antd 组件，实用前请先安装 4.0 版本以上的[antd](https://ant-design.antgroup.com/docs/react/introduce-cn)

```sh
npm install alloy-form
yarn add alloy-form
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
    bordered: false,
    width: '500px',
  },
  properties: {
    name: {
      label: '姓名',
      format: 'input',
      props: {
        placeholder: '请输入姓名',
        type: 'string',
      },
    },
    age: {
      label: '年龄',
      format: 'input',
      props: {
        placeholder: '请输入年龄',
        type: 'number',
      },
    },
  },
};

export default function BasicDemo(): JSX.Element {
  const form = useForm({ schema });
  return <AlloyForm form={form} />;
}
```

### 组件 **API**

| 参数 | 描述 | 类型 | 是否必填 | 默认值 |
| --- | --- | --- | --- | --- |
| form | 使用 useForm 创建的表单实例，与 AlloyForm 一对一绑定 详见 [文档 useForm](http://docs.lvgx.cn/alloy-form/#/guide/use-form) | `FormInstanceProps` | `是` | `--` |
| watch | 时间选择器字段描述 区分样式 详见 [文档 表单联动](http://docs.lvgx.cn/alloy-form/#/guide/watch) | `object` | `否` | `--` |

## [**useFrom**](http://docs.lvgx.cn/alloy-form/#/guide/use-form)

`useForm` 用于创建表单实例，使用时需要创建实例，并传入与其对应的表单上，与 `AlloyForm` 一对一绑定。

### **API**

| 参数 | 描述 | 类型 | 是否必填 | 默认值 |
| --- | --- | --- | --- | --- |
| schema | 描述表单的 schema，详见 [schema 规范](http://docs.lvgx.cn/alloy-form/#/guide/schema) | `SchemaProps` | `是` | `--` |
| components | 表单中的使用的组件 | `Record<string, React.ReactNode>` | `是`     | `--`   |
| data | 表单初始化的值 | `Record<string, any>` | `否` | `--` |

### useForm 实例返回值

| 参数 | 描述 | 类型 |
| --- | --- | --- |
| setSchema | 更新 schema 字段 更新 form 组件结构 | ` (param: SchemaProps ｜ Record<string, UpdateSchemaBaseProps>) => void` |
| setData | 外部手动修改 formData，用于已填写的表单的数据回填 | `(param: Record<string, any>) => void` |
| setDataByKey | 外部通过 key 修改指定单个 field 的数据 | `(key: string, param: any) => void` |
| getData | 获取表单内部维护的数据 formData 所有字段 | `() => Record<string, any>` |
| getDataByKey | 通过 key 获取表单内指定单个 field 的字段 | `(key: string) => Record<string, any>` |
| clearData | 清空表单内部维护的数据 formData 所有字段 | `() => void` |
| validateFields | 触发表单检验 keys 需要校验的字段，不传则校验全部字段 | ` (keys: string[]) => Promise<{ validate: boolean; data: Record<string, any> }>` |

### [查看更多示例](http://docs.lvgx.cn/alloy-form)
