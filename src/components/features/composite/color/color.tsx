import React, { FunctionComponent } from 'react';
import { AnyColor, ColorFeature, Endpoint } from '../../../../types';
import ColorEditor from '../../../color-editor/ColorEditor';

import { BaseFeatureProps } from '../../base';

type ColorProps = BaseFeatureProps<ColorFeature>;

const Light: FunctionComponent<ColorProps> = (props) => {
    const { deviceState, feature, onChange, minimal } = props;
    const value = {};
    for (const innerFeature of feature.features) {
        value[innerFeature.name] =
            (deviceState[feature.property] as Record<string, Record<string, unknown>>)?.[innerFeature.property] ?? 0;
    }
    return (
        <ColorEditor
            onChange={(color) => onChange(feature.endpoint as Endpoint, { color })}
            value={value as AnyColor}
            format={feature.name}
            minimal={minimal}
        />
    );
};
export default Light;
