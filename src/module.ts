import { PanelPlugin } from '@grafana/data';
import { SimpleOptions } from './types';
import { SimplePanel } from './components/SimplePanel';

export const plugin = new PanelPlugin<SimpleOptions>(SimplePanel).setPanelOptions((builder) => {
  return builder
    .addTextInput({
      path: 'from',
      name: 'Source',
      description: 'Key name in data for source node',
      defaultValue: 'from'
    })
    .addTextInput({
      path: 'to',
      name: 'Destination',
      description: 'Key name in data for destination node',
      defaultValue: 'to'
    });
});
