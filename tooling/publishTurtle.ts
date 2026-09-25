import { readFile } from "node:fs/promises";
import { join } from "node:path";
import type { Plugin } from "vite";
import { readTurtleTree } from "./rdf.ts";
import { parseVocab, renderVocabPage } from "./vocab.ts";

/**
 * Publishing the vocabulary and the shapes with the site: every `.ttl`
 * under a folder is served in dev and emitted into `dist/` under the same
 * path, so the IRIs under https://solid-memo.com/vocab/ and /shapes/
 * dereference to the documents in this repository. A folder may also
 * publish rendered pages, such as the vocabulary's HTML at vocab/v1/.
 */

const TURTLE = "text/turtle; charset=utf-8";

export interface PublishedPage {
  /** Path under the folder's public path, e.g. "v1/index.html". */
  path: string;
  contentType: string;
  body(): Promise<string>;
}

/** The HTML page the namespace IRI lands on (see docs/vocab.md). */
export function vocabPage(root = "."): PublishedPage {
  return {
    path: "v1/index.html",
    contentType: "text/html; charset=utf-8",
    body: async () =>
      renderVocabPage(parseVocab(await readFile(join(root, "vocab/v1.ttl"), "utf8"))),
  };
}

/** A safe relative path: no empty, `.` or `..` segments. */
function isPlainPath(name: string): boolean {
  return name.split("/").every((segment) => /^[A-Za-z0-9][A-Za-z0-9._-]*$/.test(segment));
}

export function turtleDirectoryPlugin({
  dir,
  publicPath = dir,
  pages = [],
}: {
  dir: string;
  publicPath?: string;
  pages?: PublishedPage[];
}): Plugin {
  const pageFor = (name: string): PublishedPage | undefined =>
    pages.find(
      (page) =>
        page.path === name ||
        page.path === `${name}/index.html` ||
        page.path === `${name}index.html`,
    );
  return {
    name: `solid-memo:publish-${publicPath}`,

    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const path = (req.url ?? "").split("?")[0];
        const prefix = `/${publicPath}/`;
        if (!path.startsWith(prefix)) return next();
        const name = path.slice(prefix.length);
        try {
          const page = pageFor(name);
          if (page !== undefined) {
            res.setHeader("Content-Type", page.contentType);
            res.end(await page.body());
            return;
          }
          if (!isPlainPath(name) || !name.endsWith(".ttl")) return next();
          const file = (await readTurtleTree(dir)).find((f) => f.path === name);
          if (file === undefined) return next();
          res.setHeader("Content-Type", TURTLE);
          res.end(file.turtle);
        } catch (error) {
          next(error);
        }
      });
    },

    async generateBundle() {
      for (const { path, turtle } of await readTurtleTree(dir)) {
        this.emitFile({
          type: "asset",
          fileName: `${publicPath}/${path}`,
          source: turtle,
        });
      }
      for (const page of pages) {
        this.emitFile({
          type: "asset",
          fileName: `${publicPath}/${page.path}`,
          source: await page.body(),
        });
      }
    },
  };
}
