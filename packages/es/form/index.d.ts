import { FormInstanceProps } from "../@types";
import 'rc-tooltip/assets/bootstrap_white.css';
import React from 'react';
import './index.css';
declare type TProp = {
    form: FormInstanceProps;
    components: Record<string, React.ReactNode>;
    watch?: Record<string, (val: any, key?: string) => any>;
    className?: string;
};
export default function AlloyForm({ form, watch, className, components }: TProp): JSX.Element;
export {};
