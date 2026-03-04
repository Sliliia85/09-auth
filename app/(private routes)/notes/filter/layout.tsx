import { LayoutNotes } from '@/components/LayoutNotes/LayoutNotes';

interface Props {
  children: React.ReactNode; 
  sidebar: React.ReactNode;    
}

export default function FilterLayout({ children, sidebar}: Props) {
  return (
    <>
      <LayoutNotes sidebar={sidebar}>
        {children}
      </LayoutNotes>
      
      
    </>
  );
}