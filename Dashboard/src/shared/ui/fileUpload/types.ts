export interface FileUploadProps {
  name: string;
  value?: File | string | null;
  onChange: (file: File | null) => void;
  onBlur?: () => void;
  accept?: string;
  label: string;
  error?: string;
  disabled?: boolean;
  imageShape?: "square" | "cover";
}

export interface FileUploadDropzoneProps {
  name: string;
  value?: File | string | null;
  preview: string | null;
  isVideo: boolean;
  accept: string;
  error?: string;
  disabled?: boolean;
  imageShape: "square" | "cover";
  onSelectFile: (file: File | null) => void;
}

export interface FileUploadPlaceholderProps {
  disabled?: boolean;
}

export interface FileUploadPreviewProps {
  preview: string;
  isVideo: boolean;
  imageShape: "square" | "cover";
  disabled?: boolean;
  onRemove: () => void;
}
