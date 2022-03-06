export interface CommonComponentProps {
  className?: string;
}

export interface FileUploaderProps extends CommonComponentProps {
  onFileChange: (file: File) => void;
  uploadButtonLabel?: string;
}
