import fs from "fs";
import path from "path";

// 获取当前日期 YYYY-MM-DD
function getDate() {
	const today = new Date();
	const year = today.getFullYear();
	const month = String(today.getMonth() + 1).padStart(2, "0");
	const day = String(today.getDate()).padStart(2, "0");
	return `${year}-${month}-${day}`;
}

// 生成 4 位随机字母数字
function random4() {
	const chars =
		"0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
	let result = "";
	for (let i = 0; i < 4; i++) {
		result += chars.charAt(Math.floor(Math.random() * chars.length));
	}
	return result;
}

// 获取命令行参数
const args = process.argv.slice(2);

// 文件名逻辑
let fileName;
if (args.length === 0) {
	// 不传参数 → YYYYMMDD-随机4位字符.md
	const today = new Date();
	const YYYY = today.getFullYear();
	const MM = String(today.getMonth() + 1).padStart(2, "0");
	const DD = String(today.getDate()).padStart(2, "0");
	fileName = `${YYYY}${MM}${DD}-${random4()}.md`;
} else {
	// 传了参数 → 用用户名称
	fileName = args[0];
	if (!/\.(md|mdx)$/i.test(fileName)) {
		fileName += ".md";
	}
}

const targetDir = "./src/content/posts/";
const fullPath = path.join(targetDir, fileName);

if (!fs.existsSync(targetDir)) {
	fs.mkdirSync(targetDir, { recursive: true });
}

if (fs.existsSync(fullPath)) {
	console.error(`Error: File ${fullPath} already exists`);
	process.exit(1);
}

const content = `---
title: ${args[0] || fileName.replace(/\.md$/, "")}
published: ${getDate()}
description: ''
image: ''
tags: []
category: ''
draft: false 
lang: ''
---
`;

fs.writeFileSync(fullPath, content);
console.log(`Post ${fullPath} created`);
