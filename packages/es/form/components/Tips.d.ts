/// <reference types="react" />
import type { TooltipProps as RcTooltipProps } from 'rc-tooltip/lib/Tooltip';
interface TipsProps extends Omit<RcTooltipProps, 'overlay' | 'children'> {
    text?: string;
    icon?: string;
    overlay?: string;
    children?: any;
}
export default function Tips({ text, overlay, ...restProps }: TipsProps): JSX.Element;
export {};
