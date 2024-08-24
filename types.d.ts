// @types/react-dom not updated yet
declare module 'react-dom/client'

declare module '*.scss' {
  const content: { [className: string]: string };
  export = content
}

declare module '*.webp'
declare module '*.png'
declare module '*.jpg'
declare module '*.jpeg'
declare module '*.svg'

interface Window {
  ym: any
}
