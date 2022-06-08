import { FC } from 'react';
import {
    ReflexContainer as ReflexContainerLib,
    ReflexContainerProps,
    ReflexSplitter as ReflexSplitterLib,
    ReflexSplitterProps,
    ReflexElement as ReflexElementLib,
    ReflexElementProps,
    ReflexHandle as ReflexHandleLib,
    ReflexHandleProps,
} from 'react-reflex';

import 'react-reflex/styles.css'

export const ReflexContainer = ReflexContainerLib as any as FC<ReflexContainerProps>;
export const ReflexSplitter = ReflexSplitterLib as any as FC<ReflexSplitterProps>;
export const ReflexElement = ReflexElementLib as any as FC<ReflexElementProps>;
export const ReflexHandle = ReflexHandleLib as any as FC<ReflexHandleProps>;