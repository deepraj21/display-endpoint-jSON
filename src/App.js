import React, { useCallback, useState } from 'react';
import ReactFlow, { addEdge, Background, Controls, MiniMap, ReactFlowProvider, updateEdge, useNodesState, useEdgesState } from 'react-flow-renderer';
import UrlInputNode from './components/nodes/UrlInputNode';
import JsonDisplayNode from './components/nodes/JsonDisplayNode';

const nodeTypes = {
  urlInput: UrlInputNode,
  jsonDisplay: JsonDisplayNode,
};



const initialEdges = [
  { id: 'e1-2', source: '1', target: '2', animated: true },
];

const App = () => {

  const initialNodes = [
    {
      id: '1',
      type: 'urlInput',
      data: { url: '', onChange: (url) => handleUrlChange(url) },
      position: { x: 250, y: 5 },
    },
    {
      id: '2',
      type: 'jsonDisplay',
      data: { json: null },
      position: { x: 250, y: 150 },
    },
  ];
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), []);
  const onNodeDragStop = useCallback((event, node) => setNodes((nds) => nds.map((n) => n.id === node.id ? node : n)), []);

  const handleUrlChange = (url) => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === '1') {
          node.data = { ...node.data, url };
        }
        return node;
      })
    );
    fetchJsonData(url);
  };

  const fetchJsonData = (url) => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setNodes((nds) =>
          nds.map((node) => {
            if (node.id === '2') {
              node.data = { ...node.data, json: data };
            }
            return node;
          })
        );
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  return (
    <div style={{ height: '100vh',backgroundColor: 'black' }} >
      <ReactFlowProvider>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onNodeDragStop={onNodeDragStop}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          fitView
        >
          <Background />
          <Controls />
        </ReactFlow>
      </ReactFlowProvider>
    </div>
  );
};

export default App;
