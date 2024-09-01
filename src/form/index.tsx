import { ActionProps, FormInstanceProps } from '@/@types'
import 'rc-tooltip/assets/bootstrap_white.css'
import React, { useMemo } from 'react'
import FieldRender from './FieldRender'
import { ActionContext, StoreContext } from './hooks/context'
import './index.css'

type TProp = {
  form: FormInstanceProps
  components: Record<string, React.ReactNode>
  watch?: Record<string, (val: any, key?: string) => any>
  className?: string
}

export default function AlloyForm({ form, watch, className, components }: TProp) {
  const { schema, formData, ruleResult, ...actions } = form

  const store = useMemo(
    () => ({
      formData,
      schema,
      ruleResult,
      components
    }),
    [JSON.stringify(schema), JSON.stringify(formData), JSON.stringify(ruleResult)]
  )
  const action: ActionProps = useMemo(() => ({ watch, ...actions }), [])

  return (
    <ActionContext.Provider value={action}>
      <StoreContext.Provider value={store}>
        <FieldRender className={className} />
      </StoreContext.Provider>
    </ActionContext.Provider>
  )
}
