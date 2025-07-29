import { useState } from 'react';
import { Box, Typography } from '@mui/material';
import styles from './NodesPanel.module.scss'; 

const NodesPanel = () => {
    const [message, setMessage] = useState('');

    //   function to handle drag
    const onDragStart = (event: React.DragEvent) => {
        const nodeData = {
            type: 'text',
            label: message || 'New Text Message',
        };
        event.dataTransfer.setData('application/reactflow', JSON.stringify(nodeData));
        event.dataTransfer.effectAllowed = 'move';
    };

    return (
        <aside className={styles.nodesPanel}>
            <Box
                className={styles.draggableNode}
                onDragStart={onDragStart}
                draggable
            >
                
                {/* Input field to take user message */}
                <input
                    type="text"
                    placeholder="Enter message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
            </Box>
        </aside>
    );
};

export default NodesPanel;
