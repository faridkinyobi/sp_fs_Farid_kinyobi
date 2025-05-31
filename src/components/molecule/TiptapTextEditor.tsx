'use client';
import React from 'react';
import {
  Bold,
  Italic,
  Undo2,
  Redo2,
  Image,
  AlignLeft,
  AlignCenter,
  AlignRight,
} from 'lucide-react';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Toggle } from '@/components/ui/toggle';
import { Placeholder } from '@tiptap/extension-placeholder';
import { useFormContext } from 'react-hook-form';
import { Image as TiptapImage } from '@tiptap/extension-image';
import TextAlign from '@tiptap/extension-text-align';
import { cn } from '@/lib/utils';
import CharacterCount from '@tiptap/extension-character-count';

export default function TiptapTextEditor({ val }: { val: string }) {
  const { setValue } = useFormContext();
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: 'Type a content...',
        emptyNodeClass: cn(
          'placeholder:text-muted-foreground first:before:float-left first:before:content-[attr(data-placeholder)] first:before:pointer-events-none',
        ),
      }),
      TiptapImage,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
        defaultAlignment: 'left',
      }),
      CharacterCount,
    ],
    onUpdate: ({ editor }) => {
      const content = editor.getHTML();
      setValue('content', content, {
        shouldValidate: true,
        shouldDirty: true,
      });
    },
    editorProps: {
      attributes: {
        class: cn(
          'min-h-[437px] w-full bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
          'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
        ),
      },
    },
    immediatelyRender: false,
    content: val,
  });
  React.useEffect(() => {
    if (editor?.isEmpty) editor.commands.setContent(val);
  }, [val]);

  return (
    <div className="w-full border border-border rounded-lg shadow-sm">
      {/* Toolbar */}
      <div className="flex items-center gap-2 md:-4 p-2 md:p-4 border-b border-gray-200 text-sm bg-white rounded-t-lg ">
        {/* undo/redo */}
        <div className="flex text-center my-4 mx-auto md:mx-0">
          <Toggle
            aria-label="Undo"
            size={'sm'}
            className={cn(
              'bg-transparent hover:bg-transparent text-[#CBD5E1] px-1  cursor-pointer',
              'data-[state=on]:text-[#475569] data-[state=on]:bg-transparent  ',
            )}
            onPressedChange={() => editor?.chain().focus().undo().run()}
          >
            <Undo2 className="w-4 h-4" />
          </Toggle>

          <Toggle
            onPressedChange={() => editor?.chain().focus().redo().run()}
            aria-label="undo"
            size={'sm'}
            className={cn(
              'bg-transparent hover:bg-transparent text-[#CBD5E1]  px-1  cursor-pointer',
              'data-[state=on]:text-[#475569] data-[state=on]:bg-transparent  ',
            )}
          >
            <Redo2 className="w-4 h-4" />
          </Toggle>
        </div>

        {/*  Bold/Italic */}
        <div className="flex text-center mx-auto md:mx-0">
          <Toggle
            aria-label="bold"
            size={'sm'}
            onPressedChange={() => editor?.chain().focus().toggleBold().run()}
            className={cn(
              'bg-transparent hover:bg-transparent text-[#475569] px-1 cursor-pointer',
              'data-[state=on]:text-[#000000] data-[state=on]:bg-gray-100  ',
            )}
          >
            <Bold className="w-4 h-4" />
          </Toggle>

          <Toggle
            size={'sm'}
            aria-label="Italic"
            onPressedChange={() => editor?.chain().focus().toggleItalic().run()}
            className={cn(
              'bg-transparent hover:bg-transparent text-[#475569] px-1  cursor-pointer',
              'data-[state=on]:text-[#000000] data-[state=on]:bg-gray-100  ',
            )}
          >
            <Italic className="w-4 h-4 " />
          </Toggle>
        </div>

        {/* Img */}
        <span className="border-l border-gray-300 h-4.5 mx-auto md:mx-0" />
        <Toggle
          aria-label="Insert Image"
          size={'sm'}
          onPressedChange={() => {
            const url = window.prompt('Enter image URL');
            if (url) {
              editor?.chain().focus().setImage({ src: url }).run();
            }
          }}
          className={cn(
            'bg-transparent hover:bg-transparent text-[#475569] px-1 cursor-pointer',
            'data-[state=on]:text-[#000000] data-[state=on]:bg-gray-100  ',
          )}
        >
          <Image className="w-4 h-4 " />
        </Toggle>
        <span className="border-l border-gray-300 h-4.5  mx-auto md:mx-0" />
        {/* text Align */}
        <div className="flex text-center mx-auto md:mx-0">
          <Toggle
            aria-label="Align Left"
            size={'sm'}
            onClick={() => editor?.chain().focus().setTextAlign('left').run()}
            className={cn(
              'bg-transparent hover:bg-transparent text-[#475569] px-1  cursor-pointer',
              'data-[state=on]:text-[#3B82F6] data-[state=on]:bg-transparent  ',
            )}
          >
            <AlignLeft className="w-4 h-4" />
          </Toggle>
          <Toggle
            aria-label="Align Center"
            size={'sm'}
            onClick={() => editor?.chain().focus().setTextAlign('center').run()}
            className={cn(
              'bg-transparent hover:bg-transparent text-[#475569] px-1 cursor-pointer',
              'data-[state=on]:text-[#3B82F6] data-[state=on]:bg-transparent  ',
            )}
          >
            <AlignCenter className="w-4 h-4" />
          </Toggle>
          <Toggle
            aria-label="Align Right"
            size={'sm'}
            onPressedChange={() =>
              editor?.chain().focus().setTextAlign('right').run()
            }
            className={cn(
              'bg-transparent hover:bg-transparent text-[#475569] px-1  cursor-pointer',
              'data-[state=on]:text-[#3B82F6] data-[state=on]:bg-transparent  ',
            )}
          >
            <AlignRight className="w-4 h-4" />
          </Toggle>
        </div>
      </div>
      {/* Texta Editor */}
      <EditorContent placeholder="heyy" editor={editor} />

      <div className="px-4 py-6 text-xs text-[#0F172A] rounded-b-lg bg-white">
        {editor?.storage.characterCount.words()} Words
      </div>
    </div>
  );
}
