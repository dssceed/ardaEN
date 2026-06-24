"use client";

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import TextAlign from '@tiptap/extension-text-align';
import Image from '@tiptap/extension-image';
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  List,
  ListOrdered,
  Quote,
  Undo,
  Redo,
  Heading1,
  Heading2,
  Heading3,
  Link2,
  Image as ImageIcon,
  AlignCenter,
  AlignLeft,
  AlignRight,
} from 'lucide-react';
import { useCallback } from 'react';

interface TiptapEditorProps {
  content: string;
  onChange: (content: string) => void;
}

const MenuBar = ({ editor }: { editor: any }) => {
  if (!editor) return null;

  const addImage = useCallback(() => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = async () => {
      if (input.files?.length) {
        const file = input.files[0];
        const formData = new FormData();
        formData.append('file', file);

        try {
          const res = await fetch('/api/admin/upload', {
            method: 'POST',
            body: formData,
          });
          const data = await res.json();
          if (data.url) {
            editor.chain().focus().setImage({ src: data.url }).run();
          }
        } catch (error) {
          console.error('Upload failed', error);
        }
      }
    };
    input.click();
  }, [editor]);

  const setLink = useCallback(() => {
    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('URL', previousUrl);

    if (url === null) return;
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }

    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  }, [editor]);

  const buttons = [
    {
      icon: <Heading1 size={18} />,
      onClick: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
      isActive: editor.isActive('heading', { level: 1 }),
      title: 'Heading 1',
    },
    {
      icon: <Heading2 size={18} />,
      onClick: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      isActive: editor.isActive('heading', { level: 2 }),
      title: 'Heading 2',
    },
    {
      icon: <Bold size={18} />,
      onClick: () => editor.chain().focus().toggleBold().run(),
      isActive: editor.isActive('bold'),
      title: 'Bold',
    },
    {
      icon: <Italic size={18} />,
      onClick: () => editor.chain().focus().toggleItalic().run(),
      isActive: editor.isActive('italic'),
      title: 'Italic',
    },
    {
      icon: <UnderlineIcon size={18} />,
      onClick: () => editor.chain().focus().toggleUnderline().run(),
      isActive: editor.isActive('underline'),
      title: 'Underline',
    },
    {
      icon: <AlignLeft size={18} />,
      onClick: () => editor.chain().focus().setTextAlign('left').run(),
      isActive: editor.isActive({ textAlign: 'left' }),
      title: 'Align Left',
    },
    {
      icon: <AlignCenter size={18} />,
      onClick: () => editor.chain().focus().setTextAlign('center').run(),
      isActive: editor.isActive({ textAlign: 'center' }),
      title: 'Align Center',
    },
    {
      icon: <AlignRight size={18} />,
      onClick: () => editor.chain().focus().setTextAlign('right').run(),
      isActive: editor.isActive({ textAlign: 'right' }),
      title: 'Align Right',
    },
    {
      icon: <List size={18} />,
      onClick: () => editor.chain().focus().toggleBulletList().run(),
      isActive: editor.isActive('bulletList'),
      title: 'Bullet List',
    },
    {
      icon: <ListOrdered size={18} />,
      onClick: () => editor.chain().focus().toggleOrderedList().run(),
      isActive: editor.isActive('orderedList'),
      title: 'Ordered List',
    },
    {
      icon: <Link2 size={18} />,
      onClick: setLink,
      isActive: editor.isActive('link'),
      title: 'Link',
    },
    {
      icon: <ImageIcon size={18} />,
      onClick: addImage,
      isActive: false,
      title: 'Add Image',
    },
    {
      icon: <Quote size={18} />,
      onClick: () => editor.chain().focus().toggleBlockquote().run(),
      isActive: editor.isActive('blockquote'),
      title: 'Blockquote',
    },
    {
      icon: <Undo size={18} />,
      onClick: () => editor.chain().focus().undo().run(),
      isActive: false,
      title: 'Undo',
    },
    {
      icon: <Redo size={18} />,
      onClick: () => editor.chain().focus().redo().run(),
      isActive: false,
      title: 'Redo',
    },
  ];

  return (
    <div className="flex flex-wrap gap-1 p-2 border-b border-gray-200 bg-gray-50 dark:bg-zinc-900 sticky top-0 z-10 rounded-t-xl">
      {buttons.map((btn, idx) => (
        <button
          key={idx}
          onClick={(e) => {
            e.preventDefault();
            btn.onClick();
          }}
          className={`p-2 rounded-lg transition-colors ${
            btn.isActive
              ? 'bg-blue-600 text-white'
              : 'text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-zinc-800'
          }`}
          title={btn.title}
        >
          {btn.icon}
        </button>
      ))}
    </div>
  );
};

export function TiptapEditor({ content, onChange }: TiptapEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-blue-600 underline cursor-pointer',
        },
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Image.configure({
        HTMLAttributes: {
          class: 'rounded-xl max-w-full h-auto my-4 mx-auto',
        },
      }),
    ],
    content: content,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose-base dark:prose-invert max-w-none focus:outline-none min-h-[400px] p-6',
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  return (
    <div className="border border-gray-200 dark:border-zinc-800 rounded-xl overflow-hidden bg-white dark:bg-zinc-950 shadow-inner">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}
