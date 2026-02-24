import { readdir, writeFile } from "fs/promises"
import { join } from "path"

interface Experiment {
  url: string
  name: string
}

async function getExperiments(): Promise<Experiment[]> {
  const experimentsDir = join(process.cwd(), "src/app/(experiments)")
  const entries = await readdir(experimentsDir, { withFileTypes: true })

  const experiments: Experiment[] = []

  for (const entry of entries) {
    if (!entry.isDirectory()) continue

    const folderName = entry.name

    try {
      // Fallback: format folder name nicely
      const experimentName = folderName
        .split("-")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")

      experiments.push({
        url: `/${folderName}`,
        name: experimentName,
      })
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      // If page.tsx doesn't exist, skip this folder
      console.warn(`Skipping ${folderName}: page.tsx not found`)
    }
  }

  return experiments.sort((a, b) => {
    // Extract numeric prefix from URL (e.g., "/1-gsap-basics" -> 1)
    const getNumber = (url: string) => {
      const match = url.match(/^\/(\d+)-/)
      return match ? parseInt(match[1], 10) : Infinity
    }

    const numA = getNumber(a.url)
    const numB = getNumber(b.url)

    // Sort by numeric prefix first, then by name if numbers are equal
    if (numA !== numB) {
      return numA - numB
    }
    return a.name.localeCompare(b.name)
  })
}

async function main() {
  try {
    const experiments = await getExperiments()
    const outputPath = join(process.cwd(), "experiments.json")
    await writeFile(outputPath, JSON.stringify(experiments, null, 2), "utf-8")
    console.log(`Generated ${experiments.length} experiments in ${outputPath}`)
  } catch (error) {
    console.error("Error generating experiments:", error)
    process.exit(1)
  }
}

main()

