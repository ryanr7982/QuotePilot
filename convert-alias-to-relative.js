const fs = require('fs')
const path = require('path')

const projectRoot = process.cwd()

// Given a source file and a target import path starting with @/, compute relative import path
function aliasToRelativeImport(fromFile, aliasImportPath) {
  if (!aliasImportPath.startsWith('@/')) return aliasImportPath

  const targetPathWithoutAlias = aliasImportPath.slice(2) // remove '@/'
  const targetAbsolutePath = path.resolve(projectRoot, targetPathWithoutAlias)

  let relativePath = path.relative(path.dirname(fromFile), targetAbsolutePath)
  relativePath = relativePath.replace(/\.(tsx?|jsx?)$/, '') // remove file extension

  // Normalize for import: use forward slashes and prepend './' if needed
  relativePath = relativePath.split(path.sep).join('/')
  if (!relativePath.startsWith('.')) relativePath = './' + relativePath

  return relativePath
}

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8')
  const originalContent = content

  // Regex to find imports from '@/...'
  // Matches: import ... from '@/some/path'
  const importAliasRegex = /import\s+([^'"]+)\s+from\s+['"](@\/[^'"]+)['"]/g

  content = content.replace(importAliasRegex, (match, imports, aliasPath) => {
    const relPath = aliasToRelativeImport(filePath, aliasPath)
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
console.log('All alias imports converted to relative imports!')
