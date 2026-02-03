/// <reference types="vite/client" />

// SCSS Module 타입 선언
declare module '*.module.scss' {
  const classes: { readonly [key: string]: string }
  export default classes
}

declare module '*.scss' {
  const content: string
  export default content
}
