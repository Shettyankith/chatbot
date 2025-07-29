import React, { useState } from 'react'
import styles from "./Canvas.module.scss"
import {
  ReactFlow,
  Background,
  Controls,
  addEdge,
  useEdgesState,
  useNodesState,
} from 'reactflow';
import 'reactflow/dist/style.css';
import type { NodeMouseHandler } from 'reactflow';
import { useCallback } from 'react';
import TextNode from '../TextNode/Textnode';
import NodesPanel from '../NodesPanel/NodesPanel';
import { Box, Button, Typography } from '@mui/material';
import SettingsPanel from '../SettingsPanel/SettingsPanel';

const nodeTypes = { text: TextNode };

const Canvas = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [selectedNode, setSelectedNode] = useState<any | string | null>(null);

  // Function to connect the edegs
  const onConnect = useCallback(
    (params: Parameters<typeof addEdge>[0]) => {
      const fromNodeEdges = edges.filter((e) => e.source === params.source);
      if (fromNodeEdges.length > 0) {
        alert('Only one edge allowed per source handle.');
        return;
      }
      setEdges((eds) => addEdge(params, eds));
    },
    [edges]
  );

  // Function to handle node dropping  
  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();
      const nodeRawData = event.dataTransfer.getData('application/reactflow');
      if (!nodeRawData) return;

      const { type, label } = JSON.parse(nodeRawData);
      // get x and y positions to place the node
      const position = { x: event.clientX - 300, y: event.clientY - 80 };
      const newNode = {
        id: `${+new Date()}`,
        type,
        position,
        data: { label },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [setNodes]
  );



  const onDragOver = (event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  };

  const onNodeClick: NodeMouseHandler = (_, node) => {
    setSelectedNode(node);
  };

  const updateNode = (id: string, data: any) => {
    setNodes((nds) =>
      nds.map((node) => (node.id === id ? { ...node, data } : node))
    );
    setSelectedNode((prev: any) =>
      prev && prev.id === id ? { ...prev, data } : prev
    );
  };

  const handleSave = () => {
    const nodesWithNoOutgoing = nodes.filter(
      (node) => !edges.some((edge) => edge.source === node.id)
    );
    if (nodes.length > 1 && nodesWithNoOutgoing.length > 1) {
      alert('More than one node has no outgoing edge!');
      return;
    }
    console.log('Saved Flow:', { nodes, edges });
    alert('Flow saved to console!');
  };

  return (
    <Box sx={{ height: '15vh', padding: 0 }}>
      <Box className={styles.topBar}>
        <Button variant='outlined' sx={{ my: 1 }} onClick={handleSave}>Save Changes</Button>
      </Box>
      <Box sx={{ height: '90vh', display: 'flex' }}>
        <Box sx={{ flexGrow: 1 }} onDrop={onDrop} onDragOver={onDragOver}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onNodeClick={onNodeClick}
            nodeTypes={nodeTypes}
            fitView
          >
            <Controls />
            <Background />
          </ReactFlow>


        </Box>
        <Box sx={{ width: "20vw", background: '#eee', padding: 1 }}>
          <Typography sx={{ textAlign: "center" }}>Message</Typography>
          <hr />
          <Typography sx={{ my: 1 }}>Text</Typography>
          {selectedNode ? (
            <SettingsPanel
              selectedNode={selectedNode}
              updateNode={updateNode}
            />
          ) : (
            <NodesPanel />
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Canvas;
