import type { FormInstanceProps, RuleProps, SchemaProps, UpdateSchemaBaseProps } from '@/@types'
import { get, set, unset } from 'lodash-es'
import { useReducer, useRef } from 'react'
import { schemaFormat, validateRule } from '../utils/index'

interface IProps {
  schema: SchemaProps
  data?: Record<string, any>
}

const rulesWhiteList = ['rate', 'switch']

export function useForm({ schema, data }: IProps): FormInstanceProps {
  const useSet = (x: any) =>
    useReducer((a: Record<string, any>, b: Record<string, any>) => ({ ...a, ...b }), x)

  // form 数据存储
  const [state, setState] = useSet({
    schema, // schema 的转换结构，便于处理,
    formData: data ?? {},
    ruleResult: {}
  })
  // schema 数据处理
  const schemaRef = useRef(schema)
  // 更新schema数据
  const setSchema = (newSchema: SchemaProps | Record<string, UpdateSchemaBaseProps>) => {
    schemaRef.current = schemaFormat(schemaRef.current, newSchema)
    setState({ schema: schemaRef.current })
  }
  // 移除schema 中的某个字段
  const removeSchemaByKey = (key: string) => {
    const properties = schemaRef.current?.properties ?? {}
    unset(properties, key)
    schemaRef.current = schemaFormat(schemaRef.current, properties)
    setState({ schema: schemaRef.current })
  }
  // form表单数据处理
  const formDataRef = useRef(data ?? {})
  // 设置表单数据
  const setData = (param: Record<string, any>) => {
    formDataRef.current = {
      ...formDataRef.current,
      ...param
    }
    setState({ formData: formDataRef.current })
  }
  const setDataByKey = (key: string, value: any) => {
    formDataRef.current = {
      ...formDataRef.current,
      [key]: value
    }
    setState({ formData: formDataRef.current })
  }
  const clearData = () => {
    formDataRef.current = {}
    setState({ formData: formDataRef.current })
  }
  // 获取表单数据
  const getData = () => {
    const currentData = formDataRef.current
    return {
      ...currentData
    }
  }
  // 根据key获取表单中的数据
  const getDataByKey = (key: string) => {
    return get(formDataRef.current, key)
  }

  // form表单校验规则
  const ruleRef = useRef<Record<string, RuleProps[]>>()
  // 更新schema数据
  const setRules = (rules: Record<string, RuleProps[]>) => {
    rulesWhiteList.forEach((item) => {
      unset(rules, item)
    })
    ruleRef.current = rules
  }

  const getFieldRules = (key: string): RuleProps[] => {
    return (ruleRef.current && ruleRef.current[key]) || []
  }

  // 校验表单数据
  const validateFields = (
    keys: string[]
  ): Promise<{ validate: boolean; data: Record<string, any> }> => {
    const ruleResult = {}
    let isError = false
    const validateKeys: string[] = keys || Object.keys(ruleRef.current ?? {})
    const flatten = schemaRef.current?.properties ?? {}
    validateKeys.forEach(async (key: string) => {
      const fieldRules = get(ruleRef.current, key) || []
      const flattenItem = flatten[key]
      const bind = flattenItem?.bind
      const fieldData = get(formDataRef.current, bind?.[0] || key)
      const result = validateRule(fieldRules, fieldData)
      set(ruleResult, key, result)
      if (result.isError) {
        isError = true
      }
    })
    setState({ ruleResult })
    return new Promise((resolve, reject) => {
      resolve({ validate: !isError, data: getData() })
      if (isError) {
        const rej = { validate: false, data: getData() }
        reject(rej)
      }
    })
  }

  return {
    setSchema,
    removeSchemaByKey,
    setData,
    setDataByKey,
    getData,
    getDataByKey,
    setRules,
    getFieldRules,
    validateFields,
    clearData,

    schema: state.schema,
    formData: state.formData,
    ruleResult: state.ruleResult
  }
}
