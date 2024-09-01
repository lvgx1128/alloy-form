import type { FormInstanceProps, SchemaProps } from "../../@types";
interface IProps {
    schema: SchemaProps;
    data?: Record<string, any>;
}
export declare function useForm({ schema, data }: IProps): FormInstanceProps;
export {};
