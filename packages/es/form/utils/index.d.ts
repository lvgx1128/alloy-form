import { RuleProps, SchemaProps, UpdateSchemaBaseProps } from '../../@types';
export declare function schemaFormat(schema: SchemaProps, newValue: SchemaProps | Record<string, UpdateSchemaBaseProps>): SchemaProps;
export declare function validateRule(fieldRules: RuleProps[], fieldData: any): {
    isError: boolean;
    message: string;
};
export declare function isHasInputTarget(evt: Event): boolean;
export declare function getValuesByEvt(args: any[]): any[];
