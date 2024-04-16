interface FlexibleButtonActionProps {
  id?: string;
}

interface ItemButtonActionProps {
  id: string;
  refresh?: any;
  fullWidth?: boolean;
  size?:
    | 'xs'
    | 'sm'
    | 'md'
    | 'lg'
    | 'xl'
    | 'compact-md'
    | 'compact-sm'
    | 'compact-lg'
    | 'compact-xl';
}
