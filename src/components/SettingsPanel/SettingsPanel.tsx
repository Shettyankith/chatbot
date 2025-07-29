
import { TextField, Paper, Typography } from '@mui/material';

interface Props {
  selectedNode: any;
  updateNode: (id: string, data: any) => void;
}

const SettingsPanel = ({ selectedNode, updateNode }: Props) => {
  if (!selectedNode) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateNode(selectedNode.id, {
      ...selectedNode.data,
      label: e.target.value,
    });
  };

  return (
    <Paper style={{ padding: 16 }}>
      <Typography variant="h6">Edit Text Node</Typography>
      <TextField
        label="Message Text"
        value={selectedNode.data.label}
        onChange={handleChange}
        fullWidth
        sx={{ marginTop: 2 }}
      />
    </Paper>
  );
};

export default SettingsPanel;
