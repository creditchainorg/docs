// Fail the build if the docs would publish something that must stay private.
//
// These patterns are deliberately generic. A list of the real internal hostnames would itself
// publish them, so this repository only checks for shapes: an IP address that is not a
// documentation example, a dynamic-DNS name, key material. Maintainers can add a private,
// uncommitted list with CC_SENSITIVE_DENYLIST=/path/to/file (one pattern per line).
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, extname } from 'node:path';

const ROOTS = ['src', 'public', 'README.md'];
const TEXT = new Set(['.md', '.mdx', '.astro', '.ts', '.js', '.mjs', '.json', '.yml', '.yaml', '.txt', '.html', '.css', '']);

// RFC 5737 documentation ranges, loopback and unspecified are allowed; every other IPv4 literal is not.
const allowedIp = (ip) =>
	/^(192\.0\.2|198\.51\.100|203\.0\.113)\.\d{1,3}$/.test(ip) || ip === '127.0.0.1' || ip === '0.0.0.0';

const rules = [
	{ name: 'IPv4 address (use a hostname, or an RFC 5737 example)', re: /\b(?:\d{1,3}\.){3}\d{1,3}\b/g, allow: allowedIp },
	{ name: 'dynamic-DNS hostname', re: /\b[\w-]+\.(?:duckdns\.org|no-ip\.\w+|dyndns\.\w+|ddns\.net)\b/gi },
	{ name: 'private key block', re: /-----BEGIN [A-Z ]*PRIVATE KEY-----/g },
	{ name: '32-byte hex secret beside a key word', re: /(?:private|secret|mnemonic|seed)[\w\s"':=-]{0,24}(?:0x)?[0-9a-f]{64}\b/gi },
	{ name: 'published development key', re: /(?:ac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80|59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d)/gi },
];

const extra = process.env.CC_SENSITIVE_DENYLIST;
if (extra && existsSync(extra)) {
	for (const line of readFileSync(extra, 'utf8').split('\n').map((l) => l.trim()).filter((l) => l && !l.startsWith('#'))) {
		rules.push({ name: 'private denylist entry', re: new RegExp(line, 'gi') });
	}
}

const files = [];
const walk = (p) => {
	if (!existsSync(p)) return;
	const s = statSync(p);
	if (s.isDirectory()) for (const c of readdirSync(p)) walk(join(p, c));
	else if (TEXT.has(extname(p))) files.push(p);
};
ROOTS.forEach(walk);

let failures = 0;
for (const file of files) {
	readFileSync(file, 'utf8').split('\n').forEach((line, i) => {
		for (const rule of rules) {
			for (const m of line.matchAll(rule.re)) {
				if (rule.allow && rule.allow(m[0])) continue;
				failures++;
				console.error(`${file}:${i + 1}: ${rule.name}`);
			}
		}
	});
}
if (failures) {
	console.error(`\n${failures} finding(s). Nothing was published.`);
	process.exit(1);
}
console.log(`check-sensitive: ${files.length} files clean`);
