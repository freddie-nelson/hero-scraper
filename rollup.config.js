import eslint from "@rollup/plugin-eslint";
import json from "@rollup/plugin-json";
import terser from "@rollup/plugin-terser";
import del from "rollup-plugin-delete";
import { typescriptPaths } from "rollup-plugin-typescript-paths";
import typescript from "rollup-plugin-typescript2";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import { dts } from "rollup-plugin-dts";

/** @type {import('rollup').RollupOptions} */
const options = {
    input: "src/index.ts",
    output: [
        {
            file: "dist/index.js",
            format: "esm",
            sourcemap: true,
            plugins: [],
        },
    ],
    plugins: [
        del({ targets: "dist/*" }),
        resolve({
            extensions: [".js", ".ts", ".mts", ".mjs", ".json"],
        }),
        typescript({
            include: ["*.ts+(|x)", "**/*.ts+(|x)", "**/*.d.cts", "**/*.d.mts"],
            tsconfig: "./tsconfig.json",
        }),
        typescriptPaths(),
        json(),
        eslint(),
        commonjs({
            include: "node_modules/**",
            requireReturnsDefault: "auto",
            include: ["node_modules/**"],
        }),
    ],
};

export default options;
