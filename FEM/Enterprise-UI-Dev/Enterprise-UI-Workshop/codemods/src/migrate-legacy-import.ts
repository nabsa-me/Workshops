import type { API, FileInfo } from "jscodeshift";

// TODO: Implement codemod to migrate legacy imports to shared packages
// - Replace local type imports with @pulse/shared imports
// - Replace inline components with @pulse/ui imports
// - Replace local analytics with @pulse/analytics imports

export default function transform(file: FileInfo, api: API): string {
  return file.source;
}
