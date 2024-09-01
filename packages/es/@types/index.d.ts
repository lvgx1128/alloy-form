/// <reference types="react" />
import type { TooltipProps as RcTooltipProps } from 'rc-tooltip/lib/Tooltip';
interface TipsProps extends Omit<RcTooltipProps, 'overlay' | 'children'> {
    text?: string;
    icon?: string;
    overlay?: string;
    children?: any;
}
interface ItemProps {
    className?: string;
    rules?: RuleProps[];
    options?: {
        label: string | number;
        value: string | number;
    }[];
    bind?: string[];
    width?: string | number;
    labelWidth?: string | number;
    labelAlign?: 'left' | 'right' | 'center';
    widget?: any;
    props?: Record<string, any>;
    display?: 'block' | 'inline';
    bordered?: boolean;
    labelTips?: string;
    labelTipProps?: TipsProps;
}
export interface SchemaBaseProps extends ItemProps {
    label: string;
    format: string;
}
export declare type UpdateSchemaBaseProps = Partial<SchemaBaseProps>;
export declare type SchemaProps = {
    type: string;
    title?: string;
    description?: string;
    itemProps?: ItemProps;
    properties: Record<string, SchemaBaseProps>;
};
export declare type FieldItemProps = {
    fieldKey: string;
    label: string;
    format: string;
    isRequired?: boolean;
    rules?: RuleProps[];
    options?: {
        label: string | number;
        value: string | number;
    }[];
    className?: string;
    width?: string | number;
    labelWidth?: string | number;
    labelAlign?: 'left' | 'right' | 'center';
    bordered?: boolean;
    bind?: string[];
    props?: Record<string, any>;
    widget?: any;
    display?: string;
    labelTips?: string;
    labelTipProps?: TipsProps;
    hide?: boolean;
};
export declare type StoreProps = {
    schema?: SchemaProps;
    formData?: Record<string, any>;
    ruleResult?: Record<string, any>;
    components?: Record<string, React.ReactNode>;
};
export interface FormActionProps {
    setSchema: (param: Record<string, UpdateSchemaBaseProps> | SchemaProps) => void;
    removeSchemaByKey: (param: string) => void;
    setData: (param: Record<string, any>) => void;
    setDataByKey: (key: string, param: Record<string, any>) => void;
    getData: () => Record<string, any>;
    getDataByKey: (key: string) => void;
    getFieldRules?: (param: string) => RuleProps[];
    clearData: () => void;
    setRules: (param: Record<string, RuleProps[]>) => void;
    validateFields: (keys: string[]) => Promise<{
        validate: boolean;
        data: Record<string, any>;
    }>;
}
export interface ActionProps extends Partial<FormActionProps> {
    watch?: Record<string, (value: any, key?: string) => any>;
}
export interface FormInstanceProps extends FormActionProps {
    schema?: SchemaProps;
    formData?: Record<string, any>;
    ruleResult?: Record<string, any>;
}
export declare type FormInstancePropsPartial = Partial<FormInstanceProps>;
export declare type RuleProps = {
    required?: boolean;
    pattern?: RegExp;
    validator?: (val: Record<string, any>) => boolean;
    message: string;
};
export {};
