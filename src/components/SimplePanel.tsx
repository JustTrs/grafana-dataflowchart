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

const substitute = (source: string, row: any): string => {
  let res = source;
  for (let m of source.matchAll(/data:(\w+)/g)) {
    res = res.replace(m[0], ( row[m[1]] ? row[m[1]] : '' ));
  }
  return res;
};

export const SimplePanel: React.FC<Props> = ({ options, data, width, height }) => {
  const styles = useStyles2(getStyles);
  const fit = `
    svg#preview {
      max-width: 100% !important;
    }
  `;
  const mermaidProps: MermaidProps = {
    text: 'flowchart ' + options.orientation + ';',
  };
  data.series.forEach((s) => {
    const view = new DataFrameView(s);
    view.forEach((row) => {
      let nodes: string[] = [];
      if (row[options.from]) {
        nodes.push(row[options.from]);
      }
      if (row[options.to]) {
        nodes.push(row[options.to]);
      }

      // add link if both nodes are available
      if (nodes.length === 2) {
        mermaidProps.text += nodes[0];
        if (options.text) {
          mermaidProps.text += '-- ' + substitute(options.text, row) + ' -->';
        } else {
          mermaidProps.text += ' --> ';
        }
        mermaidProps.text += nodes[1] + ';';
      }

      // add subgraphs if defined
      if (!options.subgraph) {
        return;
      }
      let subgraphs = '';
      let add = true;
      const template: string[] = substitute(options.subgraph, row).split(',');
      template.forEach((elt, idx, array) => {
        if (row[elt]) {
          subgraphs += 'subgraph ' + row[elt] + ';';
          if (idx === array.length - 1) {
            nodes.forEach((elt) => { subgraphs += elt + ';'; });
          }
        } else {
          add = false;
        }
      });
      if (add) {
        mermaidProps.text += subgraphs;
        template.forEach(() => mermaidProps.text += ' end');
        mermaidProps.text += ';';
      }
    });
    console.log(mermaidProps.text);
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
      <style>{fit}</style>
      <Mermaid {...mermaidProps}/>
    </div>
  );
};
