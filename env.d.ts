/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_FIREBASE_API_KEY: string
    readonly VITE_USER_DEFAULT_AVATAR_URL: string
    // ...其他環境變數
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}