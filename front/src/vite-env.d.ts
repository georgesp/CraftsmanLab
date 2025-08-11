/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly BASE_URL: string
  // add more env vars if needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

// Allow importing Markdown files as raw strings
declare module '*.md' {
  const content: string;
  export default content;
}

declare module '*.md?raw' {
  const content: string;
  export default content;
}
