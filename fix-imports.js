const fs = require('fs')
const path = require('path')

const projectRoot = process.cwd()
const componentsDir = path.join(projectRoot, 'components')
const supabaseClientFile = path.join(projectRoot, 'supabaseClient.ts')

function getRelativeImport(fromFile, toFile) {
  let relativePath = path.relative(path.dirname(fromFile), toFile)
  // Remove .ts or .tsx extension
  relativePath = relativePath.replace(/\.(tsx?|jsx?)$/, '')
  // On Windows, convert backslashes to forward slashes for import paths
  relativePath = relativePath.split(path.sep).join('/')
  if (!relativePath.startsWith('.')) relativePath = './' + relativePath
  return relativePath
}

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8')
  let originalContent = content

  // Replace imports from '@/...' with relative path to 'lib' or others (skip since you removed alias)
  // Replace imports from 'supabaseClient' or absolute path to supabaseClient
  const supabaseImportRegex = /import\s+([\s\S]*?)\s+from\s+['"]supabaseClient['"]/g
  content = content.replace(supabaseImportRegex, (match, imports) => {
    const relPath = getRelativeImport(filePath, supabaseClientFile)
    return `import ${imports} from '${relPath}'`
  })

  // Replace imports from 'components/...' or absolute 'components/...'
  // Also handle cases like import X from 'components/X' or "components/X"
  const componentsImportRegex = /import\s+([\s\S]*?)\s+from\s+['"]components\/([^'"]+)['"]/g
  content = content.replace(componentsImportRegex, (match, imports, compPath) => {
    const compFile = path.join(componentsDir, compPath)
    const relPath = getRelativeImport(filePath, compFile)
    return `import ${imports} from '${relPath}'`
  })

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8')
    console.log(`Fixed imports in ${path.relative(projectRoot, filePath)}`)
  }
}

function walkDir(dir) {
  const files = fs.readdirSync(dir)
  for (const file of files) {
    const fullPath = path.join(dir, file)
    if (fs.statSync(fullPath).isDirectory()) {
      walkDir(fullPath)
    } else if (fullPath.match(/\.(ts|tsx)$/)) {
      processFile(fullPath)
    }
  }
}

walkDir(projectRoot)
console.log('Import fixing complete!')
