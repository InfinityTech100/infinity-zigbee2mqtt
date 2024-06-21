import React from 'react';
import { LogMessage } from '../../store';
import { LogRow } from '../logs-page';
import { ALL } from '../logs-page/ALL';

export type LastLogResultProps = {
    logs: LogMessage[];
    filterFn: (l: LogMessage) => boolean;
};

export function LastLogResult(props: LastLogResultProps): JSX.Element {
    const { logs, filterFn } = props;
    const filtered = logs.filter(filterFn);
    const lastLogMessage = filtered.length > 0 ? filtered[filtered.length - 1] : null;
    const res: JSX.Element[] = [];
    if (lastLogMessage) {
        res.push(<LogRow key="log" log={lastLogMessage} search={''} logLevel={ALL} />);
    }
    return <>{res}</>;
}
