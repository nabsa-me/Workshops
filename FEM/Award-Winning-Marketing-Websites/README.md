[![Frontend Masters](https://static.frontendmasters.com/assets/brand/logos/full.png)](https://frontendmasters.com/courses/winning-websites)
## Award-Winning Marketing Site Course
This is a companion repository for the [Award-Winning Marketing Site](https://frontendmasters.com/courses/winning-websites) course on Frontend Masters. This repo contains a collection of animation and interaction exercises and solutions.

## Getting Started

Install dependencies:

```bash
pnpm install
```

Run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the experiments.

## Using the Experiments

Each experiment has a `starter` and `solution` version:

- **Starter**: Your starting point to implement the exercise
- **Solution**: The completed implementation for reference

To switch between versions, edit the experiment's `page.tsx` file and change the import from `starter` to `solution` (or vice versa).

## Resources
- https://easings.net/
- https://gsap.com/docs/v3/
- https://react-scan.com/
- https://www.npmjs.com/package/react-device-detect
- https://www.npmjs.com/package/detect-gpu
- https://github.com/pmndrs/leva
- https://www.npmjs.com/package/zustand
- https://www.npmjs.com/package/lenis
- https://tailwindcss.com/

### PNG to Webp Command
In the **Create Image Sequence with Blender** lesson, you can use this command to convert the images from png to webp:

```bash
mkdir -p animation-webp && for file in animation/*.png; do cwebp -q 80 "$file" -o "animation-webp/$(basename "${file%.png}.webp")"; done
```
