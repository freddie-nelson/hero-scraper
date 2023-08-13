import eslint from "@rollup/plugin-eslint";
import json from "@rollup/plugin-json";
import del from "rollup-plugin-delete";
import { typescriptPaths } from "rollup-plugin-typescript-paths";
import typescript from "rollup-plugin-typescript2";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";

const pkg = require("./package.json");

/** @type {import('rollup').RollupOptions} */
const options = {
    input: "src/index.ts",
    output: [
        {
            file: "dist/index.js",
            format: "cjs",
            sourcemap: true,
            exports: "named",
        },
        {
            file: "dist/index.esm.js",
            format: "esm",
            sourcemap: true,
        },
    ],
    // indidicate here external modules you don't want to include in your bundle
    external: [
        ...Object.keys(pkg.dependencies || {}),
        ...Object.keys(pkg.peerDependencies || {}),
    ],
    plugins: [
        del({ targets: "dist/*" }),
        nodeResolve({
            // extensions: [".js", ".ts", ".mts", ".mjs", ".json"],
        }),
        commonjs({
            // dynamicRequireTargets: [
            //     "node_modules/@ulixee/hero/lib/CallsiteLocator",
            // ],
            // transformMixedEsModules: true,
            // strictRequires: true,
            // requireReturnsDefault: "auto",
            // include: ["node_modules/**"],
        }),
        typescript({
            include: ["*.ts+(|x)", "**/*.ts+(|x)", "**/*.d.cts", "**/*.d.mts"],
            tsconfig: "./tsconfig.json",
        }),
        typescriptPaths(),
        json(),
        eslint(),
    ],
};

export default options;
