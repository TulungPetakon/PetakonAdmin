// src/admin/app.tsx

import {
  type PluginConfig,
  type Preset,
  setPluginConfig,
  defaultHtmlPreset,
  defaultMarkdownPreset,
} from '@_sh/strapi-plugin-ckeditor';

const defaultHtml: Preset = {
  ...defaultHtmlPreset,
  description: 'Rich Text Editor',
  editorConfig: {
    ...defaultHtmlPreset.editorConfig,
    placeholder: 'Rich Text Editor',
    toolbar: {
      shouldNotGroupWhenFull: true,
      items: [
        'showBlocks',
        '|',
        'undo',
        'redo',
        '|',
        'link',
        'insertImage',
        'strapiMediaLib',
        'insertTable',
        'mediaEmbed',
        'codeBlock',
        'htmlEmbed',
        '|',
        'pageBreak',
        'horizontalLine',
        'specialCharacters',
        '-',
        'heading',
        '|',
        'bold',
        'italic',
        'underline',
        'strikethrough',
        'blockQuote',
        {
          label: 'Basic styles',
          icon: 'text',
          items: [
            'fontSize',
            'fontFamily',
            'fontColor',
            'fontBackgroundColor',
            'highlight',
            'superscript',
            'subscript',
            'code',
            '|',
            'textPartLanguage',
            '|',
          ],
        },
        'removeFormat',
        '|',
        'alignment',
        '|',
        'bulletedList',
        'numberedList',
        'multilevelList',
        'todoList',
        '|',
        'outdent',
        'indent',
      ],
    },
    balloonToolbar: ['bold', 'italic', '|', 'link', '|', 'bulletedList', 'numberedList'],
    fontFamily: {
      supportAllValues: true,
    },
    fontSize: {
      options: [10, 12, 14, 'default', 18, 20, 22],
      supportAllValues: true,
    },
    heading: {
      options: [
        {
          model: 'paragraph',
          title: 'Paragraph',
          class: 'ck-heading_paragraph',
        },
        {
          model: 'heading1',
          view: 'h1',
          title: 'Heading 1',
          class: 'ck-heading_heading1',
        },
        {
          model: 'heading2',
          view: 'h2',
          title: 'Heading 2',
          class: 'ck-heading_heading2',
        },
        {
          model: 'heading3',
          view: 'h3',
          title: 'Heading 3',
          class: 'ck-heading_heading3',
        },
        {
          model: 'heading4',
          view: 'h4',
          title: 'Heading 4',
          class: 'ck-heading_heading4',
        },
        {
          model: 'heading5',
          view: 'h5',
          title: 'Heading 5',
          class: 'ck-heading_heading5',
        },
        {
          model: 'heading6',
          view: 'h6',
          title: 'Heading 6',
          class: 'ck-heading_heading6',
        },
      ],
    },
    htmlSupport: {
      allow: [
        {
          name: /.*/,
          attributes: true,
          classes: true,
          styles: true,
        },
      ],
      disallow: [
        {
          attributes: [
            {
              key: /^on(.*)/i,
              value: true,
            },
            {
              key: /.*/,
              value: /(\b)(on\S+)(\s*)=|javascript:|(<\s*)(\/*)script/i,
            },
            {
              key: /.*/,
              value: /data:(?!image\/(png|jpeg|gif|webp))/i,
            },
          ],
        },
        {
          name: 'script',
        },
      ],
    },
    image: {
      resizeOptions: [
        {
          name: 'resizeImage:original',
          label: 'Default image width',
          value: null,
        },
        {
          name: 'resizeImage:50',
          label: '50% page width',
          value: '50',
        },
        {
          name: 'resizeImage:75',
          label: '75% page width',
          value: '75',
        },
      ],
      toolbar: [
        'link',
        'imageTextAlternative',
        'toggleImageCaption',
        '|',
        'imageStyle:inline',
        'imageStyle:wrapText',
        'imageStyle:breakText',
        '|',
        'resizeImage',
      ],
      insert: {
        type: 'auto',
      },
    },
    list: {
      properties: {
        styles: true,
        startIndex: true,
        reversed: true,
      },
    },
    link: {
      decorators: {
        isExternal: {
          mode: 'automatic',
          callback: (url) => !url?.startsWith(process.env.STRAPI_ADMIN_CLIENT_HOST || ''),
          attributes: {
            target: '_blank',
            rel: 'noopener noreferrer',
          },
        },
      },
      allowCreatingEmptyLinks: false,
      addTargetToExternalLinks: true,
      defaultProtocol: 'https://',
    },
    table: {
      contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells', 'tableProperties', 'tableCellProperties'],
    },
    menuBar: {
      isVisible: true,
    },
  },
};

const defaultMarkdown: Preset = {
  ...defaultMarkdownPreset,
  description: 'Markdown Editor',
  styles: `
  .ck {
    --ck-editor-max-width: 1500px;
    --ck-editor-min-height: 700px;
    --ck-editor-max-height: 700px;
    }
    
  .ck.ck-editor__main {
    border: 3px dashed ${({ theme }: { theme: { colors: { warning500: string } } }) => theme.colors.warning500};
    }
  `,
  editorConfig: {
    ...defaultMarkdownPreset.editorConfig,
    balloonToolbar: ['bold', 'italic', '|', 'link', '|', 'bulletedList', 'numberedList'],
  },
};

const myConfig: PluginConfig = {
  presets: [defaultHtml, defaultMarkdown],
};

export default {
  register() {
    setPluginConfig(myConfig);
  },
};

