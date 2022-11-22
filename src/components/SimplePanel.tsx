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
    text: 'flowchart LR;'
  };
  data.series.forEach((s) => {
    const view = new DataFrameView(s);
    view.forEach((row) => {
      if (row[options.from] && row[options.to]) {
        mermaidProps.text += row[options.from] + ' --> ' + row[options.to] + ';';
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
