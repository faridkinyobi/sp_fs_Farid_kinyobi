// components/HTMLContent.tsx
import React from 'react';

interface HTMLContentProps {
  content: string;
}

const HTMLContent: React.FC<HTMLContentProps> = ({ content }) => {
  // className="prose max-w-none text-muted-foreground text-sm "
  return <div dangerouslySetInnerHTML={{ __html: content }} />;
};

export default HTMLContent;
