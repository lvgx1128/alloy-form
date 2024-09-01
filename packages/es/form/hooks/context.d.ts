/// <reference types="react" />
import type { ActionProps, StoreProps } from '../../@types/index';
export declare const ActionContext: import("react").Context<ActionProps>;
export declare const StoreContext: import("react").Context<{}>;
export declare const useAction: () => ActionProps;
export declare const useStore: () => StoreProps;
