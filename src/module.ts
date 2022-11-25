import { PanelPlugin } from '@grafana/data';
import { SimpleOptions } from './types';
import { SimplePanel } from './components/SimplePanel';

export const plugin = new PanelPlugin<SimpleOptions>(SimplePanel).setPanelOptions((builder) => {
  return builder
    .addSelect({
      path: 'orientation',
      name: 'Flowchart orientation',
      description: 'Supported orientation for the generated flowchart',
      defaultValue: 'LR',
      settings: {
        options: [
          {
            value: 'BT',
            label: 'Bottom to top'
          },
          {
            value: 'LR',
            label: 'Left to right'
          },
          {
            value: 'RL',
            label: 'Right to left'
          },
          {
            value: 'TB',
            label: 'Top to bottom'
          }
        ]
      }
    })
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
    })
    .addTextInput({
      path: 'text',
      name: 'Link text',
      description: 'Template using "data:key_name_in_data" for substitution, void for no text at all',
      defaultValue: ''
    })
    .addTextInput({
      path: 'subgraph',
      name: 'Subgraph hierarchy',
      description: 'Syntax key1,key2,key3 to create a hierarchy of subgraphs, same substitution rules as for link text',
      defaultValue: ''
    });
});
