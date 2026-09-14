export interface BlockHeaderProps {
  rowLabel: string;
  onRemove: () => void;
  isDeleteDisabled: boolean;
}

export interface AddNewBlockProps {
  count: number;
  onAdd: () => void;
  managementLabel: string;
  addLabel: string;
}
