import React from 'react';
import { DataFrameView, PanelProps } from '@grafana/data';
import { SimpleOptions } from 'types';
import { css, cx } from '@emotion/css';
import { useStyles2 } from '@grafana/ui';

import { Mermaid, MermaidProps } from "./Mermaid";

interface Props extends PanelProps<SimpleOptions> {}

const getStyles = () => {
  return {
    wrapper: css`
      font-family: Open Sans;
      position: relative;
    `,
  };
};

export const SimplePanel: React.FC<Props> = ({ options, data, width, height }) => {
  const styles = useStyles2(getStyles);
  const mermaidProps: MermaidProps = {
    text: 'flowchart ' + options.orientation + ';'
  };
  data.series.forEach((s) => {
    const view = new DataFrameView(s);
    view.forEach((row) => {
      if (row[options.from] && row[options.to]) {
        mermaidProps.text += row[options.from];
        if (options.text) {
          mermaidProps.text += '-- ';
          let link = options.text;
          for (let m of options.text.matchAll(/data:(\w+)/g)) {
            if (row[m[1]] ) {
              link = link.replace(m[0], row[m[1]]);
            }
          }
          mermaidProps.text += link + ' -->';
        } else {
          mermaidProps.text += ' --> ';
        }
        mermaidProps.text += row[options.to] + ';';
        let subgraphs = '';
        let add = true;
        const template = options.subgraph.split(',');
        template.forEach((elt, idx, array) => {
          if (row[elt]) {
            subgraphs += 'subgraph ' + row[elt] + ';';
            if (idx === array.length - 1) {
              subgraphs += row[options.from] + ';';
              subgraphs += row[options.to] + ';';
            }
          } else {
            add = false;
          }
        });
        if (add) {
          mermaidProps.text += subgraphs;
          template.forEach(() => mermaidProps.text += ' end');
        }
      }
    });
  });
  return (
    <div
      className={cx(
        styles.wrapper,
        css`
          width: ${width}px;
          height: ${height}px;
        `
      )}
    >
      <Mermaid {...mermaidProps}/>
    </div>
  );
};
