import { Handle, Position } from 'reactflow';
import { Box, TextField, Typography } from '@mui/material';
import styles from "./TextNode.module.scss"

// This component will handle the text nodes
const TextNode = ({ data }: any) => {
  return (
    <Box className={styles.customNode}>
      <Handle type="target" position={Position.Top} />
      <TextField
        variant="outlined"
        value={data.label}
        size="small"
        fullWidth
        disabled
      />
      <Handle type="source" position={Position.Bottom} />
    </Box>
  );
};

export default TextNode;
