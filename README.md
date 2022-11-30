# Grafana Plugin Data Flowchart

This plugin displays a flowchart graph using [MermaidJS](https://github.com/mermaid-js/mermaid)
from queried data.

## Use cases

### Simple flowchart

![Very simple graph](./images/use-case-simple.png)

### Node shape and ID

![Node shapes](./images/use-case-node-shape-id.png)

Identifiers and shapes in data are directly used.

### Link templates

![Link text](./images/use-case-link-template.png)

Templates `data:(\w+)` are subtituted from row data.

### Subgraphs

![Subgraphs](./images/use-case-subgraph-link.png)

Linked nodes are put in the same subgraph.

### Subgraphs templates

![Subgraphs templates](./images/use-case-subgraph-templates.png)

Same subtitution as in link templates: it's possible to declare all or part of
subgraph in row data.

### Different subgraphs for linked nodes

![Distinct subgraphs](./images/use-case-subgraph-by-node.png)

It's possible to declare single nodes in row data, with then different subgraphs.
