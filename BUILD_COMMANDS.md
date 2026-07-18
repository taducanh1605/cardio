# Build Commands

This project uses Vue 2 + webpack, and [index.html](index.html) directly loads the prebuilt bundle [cardio/build.js](cardio/build.js).
Because of that, after editing source files like [src/App.vue](src/App.vue) or [src/components/timerCardio.vue](src/components/timerCardio.vue), you need to rebuild to see changes in the production runtime.

## 1) Install dependencies

```bash
npm install
```

## 2) Build for production

```bash
npm run build
```

This command creates/updates:
- [cardio/build.js](cardio/build.js)
- [cardio/build.js.map](cardio/build.js.map)

## 3) (Optional) Run a local server to test built files

```bash
npx http-server . -p 4173 -c-1
```

Open in browser:
- http://127.0.0.1:4173/index.html

## 4) If you only want fast local development (without production bundle)

```bash
npm run dev
```

Note: deployed [index.html](index.html) references the production bundle, so real deployment still requires `npm run build`.
