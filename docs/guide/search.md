---
title: 查询条件
order: 8

nav: 文档
group: 文档

filePath: null
---

## 查询组件


`基于` AlloyForm组件封装的查询条件组件 [0, 1200]一行显示3个元素， [1240, 1450]一行显示4个元素， [1450, 1720]一行显示5个元素， 大于1720一行显示6个元素

`可以展开&收起查询条件，展开状态不占用更多空间`


`只显示一行`
```tsx
import React from 'react';
import { AlloyForm, useForm, AlloySearch } from 'alloy-form';
import { Input, Select } from 'antd'


const schema = {
  type: 'object',
  title: '输入框的联动',
  description: '输入框的联动',
  properties: {
    orderNo: {
      label: '单号',
      format: 'input',
      props: {
        placeholder: '请输入订单编号',
        type: 'string',
      },
    },
    name: {
      label: '名称',
      format: 'input',
      props: {
        placeholder: '请输入名称',
        type: 'string',
      },
    },
    company: {
      label: '公司',
      format: 'input',
      props: {
        placeholder: '请输入公司',
        type: 'string',
      },
    }
  },
};

export default function WatchFormDataDemo(): JSX.Element {
  const form = useForm({ schema });
  return <AlloySearch form={form} components={{ Input, Select }} padding={[16, 16, 6]} onSearch={(data) => console.log(data)} />;
}
```

`显示两行 不显示展开按钮`
```tsx
import React from 'react';
import { AlloyForm, useForm, AlloySearch } from 'alloy-form';
import { Input, Select, DatePicker } from 'antd'


const schema = {
  type: 'object',
  title: '输入框的联动',
  description: '输入框的联动',
  properties: {
    orderNo: {
      label: '单号',
      format: 'input',
      props: {
        placeholder: '请输入订单编号',
        type: 'string',
      },
    },
    name: {
      label: '名称',
      format: 'input',
      props: {
        placeholder: '请输入名称',
        type: 'string',
      },
    },
    company: {
      label: '公司',
      format: 'input',
      props: {
        placeholder: '请输入公司',
        type: 'string',
      },
    },
    status: {
      label: '状态',
      format: 'select',
      options: [
        { label: '启用', value: 1 },
        { label: '禁用', value: 2 },
        { label: '删除', value: 3 },
      ],
      props: {
        placeholder: '请选择',
        type: 'string',
      },
    },
    orderDate: {
      label: '下单日期',
      format: 'datePicker',
      props: {
        placeholder: '请选择',
      },
    },
  },
};

export default function WatchFormDataDemo(): JSX.Element {
  const form = useForm({ schema });
  return <AlloySearch form={form} components={{ Input, Select, DatePicker }} padding={[16, 16, 6]} onSearch={(data) => console.log(data)} />;
}
```


`显示两行 显示展开按钮`
```tsx
import React from 'react';
import { AlloyForm, useForm, AlloySearch } from 'alloy-form';
import { Input, Select, DatePicker } from 'antd'
const { RangePicker } = DatePicker;

const schema = {
  type: 'object',
  title: '输入框的联动',
  description: '输入框的联动',
  properties: {
    orderNo: {
      label: '单号',
      format: 'input',
      props: {
        placeholder: '请输入订单编号',
        type: 'string',
      },
    },
    name: {
      label: '名称',
      format: 'input',
      props: {
        placeholder: '请输入名称',
        type: 'string',
      },
    },
    company: {
      label: '公司',
      format: 'input',
      props: {
        placeholder: '请输入公司',
        type: 'string',
      },
    },
    status: {
      label: '状态',
      format: 'select',
      options: [
        { label: '启用', value: 1 },
        { label: '禁用', value: 2 },
        { label: '删除', value: 3 },
      ],
      props: {
        placeholder: '请选择',
        type: 'string',
      },
    },
    supplier: {
      label: '供应商',
      format: 'input',
      props: {
        placeholder: '请输入供应商',
        type: 'string',
      },
    },
    orderDate: {
      label: '下单日期',
      format: 'RangePicker',
      className: 'x2',
      props: {
        placeholder: '请选择',
      },
    },
    orderRemark: {
      label: '订单备注',
      format: 'input',
      props: {
        placeholder: '请输入订单备注',
        type: 'string',
      },
    },
    outOrderNo: {
      label: '外部编号',
      format: 'input',
      props: {
        placeholder: '请输入外部订单编号',
        type: 'string',
      },
    },
  },
};

export default function WatchFormDataDemo(): JSX.Element {
  const form = useForm({ schema });
  return <AlloySearch form={form} components={{ Input, Select, RangePicker }} padding={[16, 16, 6]} onSearch={(data) => console.log(data)} />;
}
```

### 组件 **API**

| 参数  <div style="width:100px">   | 描述                                                                             | 类型       <div style="width:100px">       | 是否必填 | 默认值 |
| -----------------------------------| ------------------------------------------------------------------------------- |---------------------------------| -------- | ------ |
| form | 使用 useForm 创建的表单实例，与 AlloyForm 一对一绑定 详见 [useForm](/guide/use-form) | `FormInstanceProps` | `是`     | `--`   |
| components | 表单中的使用的组件 | `Record<string, React.ReactNode>` | `是`     | `--`   |
| watch| 时间选择器字段描述 区分样式 详见 [表单联动](/guide/watch)                           | `Record<string, (val: any, key?: string) => any>` | `否`     | `--`   |
| className| class | `string` |`否`     | `--` |
| style | 内联样式 | `CSSProperties` |`否`     | `--` |
| padding | 组件内边距 | `[number?, number?, number?, number?]` |`否`     | `--` |
| onSearch | 查询方法 | `(data: Record<string, any>) => void` |`否`     | `--` |
| onReset | 重置方法 | `() => void` |`否`     | `--` |
