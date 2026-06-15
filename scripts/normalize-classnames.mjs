import fs from "fs";
import path from "path";

function walkDir(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walkDir(full, files);
    } else if (/\.(tsx|jsx)$/.test(entry.name)) {
      files.push(full);
    }
  }
  return files;
}

function normalizeStaticClassName(inner) {
  return inner.split(/\s+/).filter(Boolean).join(" ");
}

function normalizeTemplateClassName(inner) {
  return inner.replace(/\s+/g, " ").trim();
}

function processContent(content) {
  let result = "";
  let i = 0;

  while (i < content.length) {
    const classNameIdx = content.indexOf("className", i);
    if (classNameIdx === -1) {
      result += content.slice(i);
      break;
    }

    result += content.slice(i, classNameIdx);
    let pos = classNameIdx + "className".length;

    while (pos < content.length && /\s/.test(content[pos])) {
      pos++;
    }

    if (content[pos] !== "=") {
      result += "className";
      i = classNameIdx + "className".length;
      continue;
    }

    pos++;
    while (pos < content.length && /\s/.test(content[pos])) {
      pos++;
    }

    const attrStart = classNameIdx;

    if (content[pos] === '"') {
      const start = pos;
      pos++;
      while (pos < content.length && content[pos] !== '"') {
        if (content[pos] === "\\") {
          pos++;
        }
        pos++;
      }
      pos++;
      const raw = content.slice(start + 1, pos - 1);
      if (raw.includes("\n")) {
        result += `className="${normalizeStaticClassName(raw)}"`;
      } else {
        result += content.slice(attrStart, pos);
      }
      i = pos;
      continue;
    }

    if (content[pos] === "{" && content[pos + 1] === "`") {
      pos += 2;
      const templateStart = pos;
      let depth = 0;

      while (pos < content.length) {
        const char = content[pos];

        if (char === "$" && content[pos + 1] === "{") {
          depth++;
          pos += 2;
          continue;
        }

        if (char === "}" && depth > 0) {
          depth--;
          pos++;
          continue;
        }

        if (char === "`" && depth === 0) {
          break;
        }

        pos++;
      }

      const raw = content.slice(templateStart, pos);
      pos++;

      if (content[pos] === "}") {
        pos++;
      }

      if (raw.includes("\n")) {
        result += `className={\`${normalizeTemplateClassName(raw)}\`}`;
      } else {
        result += content.slice(attrStart, pos);
      }
      i = pos;
      continue;
    }

    result += "className";
    i = classNameIdx + "className".length;
  }

  return result;
}

const srcDir = path.join(process.cwd(), "src");
const files = walkDir(srcDir);
let changedCount = 0;

for (const file of files) {
  const original = fs.readFileSync(file, "utf8");
  const updated = processContent(original);

  if (updated !== original) {
    fs.writeFileSync(file, updated, "utf8");
    changedCount++;
    console.log(`Updated: ${path.relative(process.cwd(), file)}`);
  }
}

console.log(`\nDone. ${changedCount} file(s) updated.`);
