import { MathNode, Localization, MathNodeType } from "../types/types";

type Res = {
	latex: string;
	requiresBrackets: boolean;
	bigBrackets: boolean;
	customExponentPlace?: boolean;
};

type Template = (n: MathNode, smallFrac: boolean, inBase?: boolean) => Res;

type Templates = { [key in MathNodeType]: Template };

const templates: Templates = {
	equals: (n, s) => {
		const a = nodeToLatex(n.children![0], s);
		const b = nodeToLatex(n.children![1], s);
		const latex = `${a.latex} = ${b.latex}`;

		return {
			latex,
			requiresBrackets: true,
			bigBrackets: a.bigBrackets || b.bigBrackets
		};
	},
	add: (n, s) => {
		const a = nodeToLatex(n.children![0], s);
		const b = nodeToLatex(n.children![1], s);
		const latex = `${a.latex} + ${b.latex}`;

		return {
			latex,
			requiresBrackets: true,
			bigBrackets: a.bigBrackets || b.bigBrackets
		};
	},
	sub: (n, s) => {
		const a = nodeToLatex(n.children![0], s);
		const b = nodeToLatex(n.children![1], s);
		const latex = `${a.latex} - ${b.latex}`;

		return {
			latex,
			requiresBrackets: true,
			bigBrackets: a.bigBrackets || b.bigBrackets
		};
	},
	div: (n, s) => {
		const a = nodeToLatex(n.children![0], s);
		const b = nodeToLatex(n.children![1], s);
		const latex = `${a.latex} : ${b.latex}`;

		return {
			latex,
			requiresBrackets: true,
			bigBrackets: a.bigBrackets || b.bigBrackets
		};
	},
	mul: (n, s) => {
		const a = nodeToLatex(n.children![0], s);
		const b = nodeToLatex(n.children![1], s);
		const latex = `${a.latex} \\cdot ${b.latex}`;

		return {
			latex,
			requiresBrackets: true,
			bigBrackets: a.bigBrackets || b.bigBrackets
		};
	},
	muli: (n, s) => {
		const a = nodeToLatex(n.children![0], s);
		const b = nodeToLatex(n.children![1], s);
		const latex = `${a.latex} ${b.latex}`;

		return {
			latex,
			requiresBrackets: false,
			bigBrackets: a.bigBrackets || b.bigBrackets
		};
	},
	add_sub: (n, s) => {
		const a = nodeToLatex(n.children![0], s);
		const b = nodeToLatex(n.children![1], s);
		const latex = `${a.latex} \\pm ${b.latex}`;

		return {
			latex,
			requiresBrackets: true,
			bigBrackets: a.bigBrackets || b.bigBrackets
		};
	},
	not_equals: (n, s) => {
		const a = nodeToLatex(n.children![0], s);
		const b = nodeToLatex(n.children![1], s);
		const latex = `${a.latex} \\neq ${b.latex}`;

		return {
			latex,
			requiresBrackets: true,
			bigBrackets: a.bigBrackets || b.bigBrackets
		};
	},
	approx: (n, s) => {
		const a = nodeToLatex(n.children![0], s);
		const b = nodeToLatex(n.children![1], s);
		const latex = `${a.latex} \\approx ${b.latex}`;

		return {
			latex,
			requiresBrackets: true,
			bigBrackets: a.bigBrackets || b.bigBrackets
		};
	},
	gt: (n, s) => {
		const a = nodeToLatex(n.children![0], s);
		const b = nodeToLatex(n.children![1], s);
		const latex = `${a.latex} > ${b.latex}`;

		return {
			latex,
			requiresBrackets: true,
			bigBrackets: a.bigBrackets || b.bigBrackets
		};
	},
	lt: (n, s) => {
		const a = nodeToLatex(n.children![0], s);
		const b = nodeToLatex(n.children![1], s);
		const latex = `${a.latex} < ${b.latex}`;

		return {
			latex,
			requiresBrackets: true,
			bigBrackets: a.bigBrackets || b.bigBrackets
		};
	},
	gte: (n, s) => {
		const a = nodeToLatex(n.children![0], s);
		const b = nodeToLatex(n.children![1], s);
		const latex = `${a.latex} \\geq ${b.latex}`;

		return {
			latex,
			requiresBrackets: true,
			bigBrackets: a.bigBrackets || b.bigBrackets
		};
	},
	lte: (n, s) => {
		const a = nodeToLatex(n.children![0], s);
		const b = nodeToLatex(n.children![1], s);
		const latex = `${a.latex} \\leq ${b.latex}`;

		return {
			latex,
			requiresBrackets: true,
			bigBrackets: a.bigBrackets || b.bigBrackets
		};
	},
	elem_of: (n, s) => {
		const a = nodeToLatex(n.children![0], s);
		const b = nodeToLatex(n.children![1], s);
		const latex = `${a.latex} \\in ${b.latex}`;

		return {
			latex,
			requiresBrackets: true,
			bigBrackets: a.bigBrackets || b.bigBrackets
		};
	},
	elem_not_of: (n, s) => {
		const a = nodeToLatex(n.children![0], s);
		const b = nodeToLatex(n.children![1], s);
		const latex = `${a.latex} \\notin ${b.latex}`;

		return {
			latex,
			requiresBrackets: true,
			bigBrackets: a.bigBrackets || b.bigBrackets
		};
	},
	union: (n, s) => {
		const a = nodeToLatex(n.children![0], s);
		const b = nodeToLatex(n.children![1], s);
		const latex = `${a.latex} \\cup ${b.latex}`;

		return {
			latex,
			requiresBrackets: true,
			bigBrackets: a.bigBrackets || b.bigBrackets
		};
	},
	cond_def: (n, s) => {
		const a = nodeToLatex(n.children![0], s);
		const b = nodeToLatex(n.children![1], s);
		const latex = `${a.latex} \\mid ${b.latex}`;

		return {
			latex,
			requiresBrackets: true,
			bigBrackets: a.bigBrackets || b.bigBrackets
		};
	},
	cond_expr: (n, s) => {
		const a = nodeToLatex(n.children![0], s);
		const b = nodeToLatex(n.children![1], s);
		const latex = `${a.latex} , ${b.latex}`;

		return {
			latex,
			requiresBrackets: true,
			bigBrackets: a.bigBrackets || b.bigBrackets
		};
	},
	diff: (n, s) => {
		const a = nodeToLatex(n.children![0], s);
		const b = nodeToLatex(n.children![1], s);
		const latex = `${a.latex} \\backslash ${b.latex}`;

		return {
			latex,
			requiresBrackets: true,
			bigBrackets: a.bigBrackets || b.bigBrackets
		};
	},
	negative: (n, s) => {
		const a = nodeToLatex(n.children![0], s);
		const latex = `-${a.latex}`;

		return {
			latex,
			requiresBrackets: true,
			bigBrackets: a.bigBrackets
		};
	},
	positive: (n, s) => {
		const a = nodeToLatex(n.children![0], s);
		const latex = `+${a.latex}`;

		return {
			latex,
			requiresBrackets: true,
			bigBrackets: a.bigBrackets
		};
	},
	add_sub_sign: (n, s) => {
		const a = nodeToLatex(n.children![0], s);
		const latex = `\\pm${a.latex}`;

		return {
			latex,
			requiresBrackets: true,
			bigBrackets: a.bigBrackets
		};
	},
	approx_sign: (n, s) => {
		const a = nodeToLatex(n.children![0], s);
		const latex = `\\approx ${a.latex}`;

		return {
			latex,
			requiresBrackets: true,
			bigBrackets: a.bigBrackets
		};
	},
	differential: (n, s) => {
		const a = nodeToLatex(n.children![0], s);
		const latex = `d ${a.latex}`;

		return {
			latex,
			requiresBrackets: true,
			bigBrackets: a.bigBrackets
		};
	},
	root2: (n, s) => {
		const a = nodeToLatex(n.children![0], s);
		const latex = `\\sqrt{${a.latex}}`;

		return {
			latex,
			requiresBrackets: false,
			bigBrackets: true
		};
	},
	ln: (n, s, p = false) => {
		const a = nodeToLatex(n.children![0], s);
		const o = p ? "\\ln$p" : "\\ln";
		let latex = "";
		if (a.requiresBrackets) {
			if (a.bigBrackets) latex = `${o} \\left(${a.latex}\\right)`;
			else latex = `${o} (${a.latex})`;
		} else latex = `${o} ${a.latex}`;

		return {
			latex,
			requiresBrackets: false,
			bigBrackets: a.bigBrackets,
			customExponentPlace: p
		};
	},
	sin: (n, s, p = false) => {
		const a = nodeToLatex(n.children![0], s);
		const o = p ? "\\sin$p" : "\\sin";
		let latex = "";
		if (a.requiresBrackets) {
			if (a.bigBrackets) latex = `${o} \\left(${a.latex}\\right)`;
			else latex = `${o} (${a.latex})`;
		} else latex = `${o} ${a.latex}`;

		return {
			latex,
			requiresBrackets: false,
			bigBrackets: a.bigBrackets,
			customExponentPlace: p
		};
	},
	cos: (n, s, p = false) => {
		const a = nodeToLatex(n.children![0], s);
		const o = p ? "\\cos$p" : "\\cos";
		let latex = "";
		if (a.requiresBrackets) {
			if (a.bigBrackets) latex = `${o} \\left(${a.latex}\\right)`;
			else latex = `${o} (${a.latex})`;
		} else latex = `${o} ${a.latex}`;

		return {
			latex,
			requiresBrackets: false,
			bigBrackets: a.bigBrackets,
			customExponentPlace: p
		};
	},
	tan: (n, s, p = false) => {
		const a = nodeToLatex(n.children![0], s);
		const o = p ? "\\tg$p" : "\\tg";
		let latex = "";
		if (a.requiresBrackets) {
			if (a.bigBrackets) latex = `${o} \\left(${a.latex}\\right)`;
			else latex = `${o} (${a.latex})`;
		} else latex = `${o} ${a.latex}`;

		return {
			latex,
			requiresBrackets: false,
			bigBrackets: a.bigBrackets,
			customExponentPlace: p
		};
	},
	cot: (n, s, p = false) => {
		const a = nodeToLatex(n.children![0], s);
		const o = p ? "\\ctg$p" : "\\ctg";
		let latex = "";
		if (a.requiresBrackets) {
			if (a.bigBrackets) latex = `${o} \\left(${a.latex}\\right)`;
			else latex = `${o} (${a.latex})`;
		} else latex = `${o} ${a.latex}`;

		return {
			latex,
			requiresBrackets: false,
			bigBrackets: a.bigBrackets,
			customExponentPlace: p
		};
	},
	asin: (n, s, p = false) => {
		const a = nodeToLatex(n.children![0], s);
		const o = p ? "\\arcsin$p" : "\\arcsin";
		let latex = "";
		if (a.requiresBrackets) {
			if (a.bigBrackets) latex = `${o} \\left(${a.latex}\\right)`;
			else latex = `${o} (${a.latex})`;
		} else latex = `${o} ${a.latex}`;

		return {
			latex,
			requiresBrackets: false,
			bigBrackets: a.bigBrackets,
			customExponentPlace: p
		};
	},
	acos: (n, s, p = false) => {
		const a = nodeToLatex(n.children![0], s);
		const o = p ? "\\arccos$p" : "\\arccos";
		let latex = "";
		if (a.requiresBrackets) {
			if (a.bigBrackets) latex = `${o} \\left(${a.latex}\\right)`;
			else latex = `${o} (${a.latex})`;
		} else latex = `${o} ${a.latex}`;

		return {
			latex,
			requiresBrackets: false,
			bigBrackets: a.bigBrackets,
			customExponentPlace: p
		};
	},
	atan: (n, s, p = false) => {
		const a = nodeToLatex(n.children![0], s);
		const o = p ? "\\arctg$p" : "\\arctg";
		let latex = "";
		if (a.requiresBrackets) {
			if (a.bigBrackets) latex = `${o} \\left(${a.latex}\\right)`;
			else latex = `${o} (${a.latex})`;
		} else latex = `${o} ${a.latex}`;

		return {
			latex,
			requiresBrackets: false,
			bigBrackets: a.bigBrackets,
			customExponentPlace: p
		};
	},
	acot: (n, s, p = false) => {
		const a = nodeToLatex(n.children![0], s);
		const o = p ? "\\arcctg$p" : "\\arcctg";
		let latex = "";
		if (a.requiresBrackets) {
			if (a.bigBrackets) latex = `${o} \\left(${a.latex}\\right)`;
			else latex = `${o} (${a.latex})`;
		} else latex = `${o} ${a.latex}`;

		return {
			latex,
			requiresBrackets: false,
			bigBrackets: a.bigBrackets,
			customExponentPlace: p
		};
	},
	sec: (n, s, p = false) => {
		const a = nodeToLatex(n.children![0], s);
		const o = p ? "\\sec$p" : "\\sec";
		let latex = "";
		if (a.requiresBrackets) {
			if (a.bigBrackets) latex = `${o} \\left(${a.latex}\\right)`;
			else latex = `${o} (${a.latex})`;
		} else latex = `${o} ${a.latex}`;

		return {
			latex,
			requiresBrackets: false,
			bigBrackets: a.bigBrackets,
			customExponentPlace: p
		};
	},
	csc: (n, s, p = false) => {
		const a = nodeToLatex(n.children![0], s);
		const o = p ? "\\csc$p" : "\\csc";
		let latex = "";
		if (a.requiresBrackets) {
			if (a.bigBrackets) latex = `${o} \\left(${a.latex}\\right)`;
			else latex = `${o} (${a.latex})`;
		} else latex = `${o} ${a.latex}`;

		return {
			latex,
			requiresBrackets: false,
			bigBrackets: a.bigBrackets,
			customExponentPlace: p
		};
	},
	factorial: (n, s) => {
		const a = nodeToLatex(n.children![0], s);
		const latex = `${a.latex}!`;

		return {
			latex,
			requiresBrackets: false,
			bigBrackets: a.bigBrackets
		};
	},
	percentage: (n, s) => {
		const a = nodeToLatex(n.children![0], s);
		const latex = `${a.latex}\\%`;

		return {
			latex,
			requiresBrackets: false,
			bigBrackets: a.bigBrackets
		};
	},
	bracket: (n, s) => {
		const a = nodeToLatex(n.children![0], s);
		let latex = "";
		if (a.bigBrackets) latex = `\\left(${a.latex}\\right)`;
		else latex = `(${a.latex})`;

		return {
			latex,
			requiresBrackets: false,
			bigBrackets: a.bigBrackets
		};
	},
	abs: (n, s) => {
		const a = nodeToLatex(n.children![0], s);
		let latex = "";
		if (a.bigBrackets) latex = `\\left|${a.latex}\\right|`;
		else latex = `|${a.latex}|`;

		return {
			latex,
			requiresBrackets: false,
			bigBrackets: a.bigBrackets
		};
	},
	ooint: (n, s) => {
		const a = nodeToLatex(n.children![0], s);
		const b = nodeToLatex(n.children![1], s);
		let latex = "";
		if (a.bigBrackets || b.bigBrackets) latex = `\\left(${a.latex}; ${b.latex}\\right)`;
		else latex = `(${a.latex}; ${b.latex})`;

		return {
			latex,
			requiresBrackets: false,
			bigBrackets: a.bigBrackets || b.bigBrackets
		};
	},
	ocint: (n, s) => {
		const a = nodeToLatex(n.children![0], s);
		const b = nodeToLatex(n.children![1], s);
		let latex = "";
		if (a.bigBrackets || b.bigBrackets) latex = `\\left(${a.latex}; ${b.latex}\\right]`;
		else latex = `(${a.latex}; ${b.latex}]`;

		return {
			latex,
			requiresBrackets: false,
			bigBrackets: a.bigBrackets || b.bigBrackets
		};
	},
	coint: (n, s) => {
		const a = nodeToLatex(n.children![0], s);
		const b = nodeToLatex(n.children![1], s);
		let latex = "";
		if (a.bigBrackets || b.bigBrackets) latex = `\\left[${a.latex}; ${b.latex}\\right)`;
		else latex = `[${a.latex}; ${b.latex})`;

		return {
			latex,
			requiresBrackets: false,
			bigBrackets: a.bigBrackets || b.bigBrackets
		};
	},
	ccint: (n, s) => {
		const a = nodeToLatex(n.children![0], s);
		const b = nodeToLatex(n.children![1], s);
		let latex = "";
		if (a.bigBrackets || b.bigBrackets) latex = `\\left[${a.latex}; ${b.latex}\\right]`;
		else latex = `[${a.latex}; ${b.latex}]`;

		return {
			latex,
			requiresBrackets: false,
			bigBrackets: a.bigBrackets || b.bigBrackets
		};
	},
	indexed: (n, s) => {
		const a = nodeToLatex(n.children![0], s);
		const b = nodeToLatex(n.children![1], true);
		const latex = `${a.latex}_{${b.latex}}`;

		return {
			latex,
			requiresBrackets: false,
			bigBrackets: a.bigBrackets
		};
	},
	deg: (n, s) => {
		const a = nodeToLatex(n.children![0], s);
		const latex = `${a.latex}^{\\circ}`;

		return {
			latex,
			requiresBrackets: false,
			bigBrackets: a.bigBrackets
		};
	},
	degmin: (n, s) => {
		const a = nodeToLatex(n.children![0], s);
		const b = nodeToLatex(n.children![1], s);
		const latex = `${a.latex}^{\\circ} ${b.latex}'`;

		return {
			latex,
			requiresBrackets: false,
			bigBrackets: a.bigBrackets || b.bigBrackets
		};
	},
	degminsecond: (n, s) => {
		const a = nodeToLatex(n.children![0], s);
		const b = nodeToLatex(n.children![1], s);
		const c = nodeToLatex(n.children![2], s);
		const latex = `${a.latex}^{\\circ} ${b.latex}' ${c.latex}''`;

		return {
			latex,
			requiresBrackets: false,
			bigBrackets: a.bigBrackets || b.bigBrackets || c.bigBrackets
		};
	},
	log: (n, s, p = false) => {
		const a = nodeToLatex(n.children![0], true);
		const b = nodeToLatex(n.children![1], s);
		const d = parseInt(a.latex) === 10;
		let o = "";
		if (p) {
			if (d) o = "\\lg$p";
			else o = `\\log$p_{${a.latex}}`;
		} else {
			if (d) o = "\\lg";
			else o = `\\log_{${a.latex}}`;
		}

		let latex = "";
		if (b.requiresBrackets) {
			if (b.bigBrackets) latex = `${o} \\left(${b.latex}\\right)`;
			else latex = `${o} (${b.latex})`;
		} else latex = `${o} ${b.latex}`;

		return {
			latex,
			requiresBrackets: false,
			bigBrackets: b.bigBrackets,
			customExponentPlace: p
		};
	},
	root: (n, s) => {
		const a = nodeToLatex(n.children![0], true);
		const b = nodeToLatex(n.children![1], s);
		const latex = `\\sqrt[${a.latex}]{${b.latex}}`;

		return {
			latex,
			requiresBrackets: false,
			bigBrackets: b.bigBrackets
		};
	},
	frac: (n, s) => {
		const a = nodeToLatex(n.children![0], s);
		const b = nodeToLatex(n.children![1], s);
		let latex = "";
		if (s) latex = `\\frac{${a.latex}}{${b.latex}}`;
		else latex = `\\dfrac{${a.latex}}{${b.latex}}`;

		return {
			latex,
			requiresBrackets: false,
			bigBrackets: true
		};
	},
	mixedfrac: (n, s) => {
		const a = nodeToLatex(n.children![0], s);
		const b = nodeToLatex(n.children![1], s);
		const c = nodeToLatex(n.children![2], s);
		let latex = "";
		if (s) latex = `${a.latex} \\frac{${b.latex}}{${c.latex}}`;
		else latex = `${a.latex} \\dfrac{${b.latex}}{${c.latex}}`;

		return {
			latex,
			requiresBrackets: true,
			bigBrackets: true
		};
	},
	function: (n, s) => {
		const a = nodeToLatex(n.children![0], s);
		const b = nodeToLatex(n.children![1], s);
		let latex = "";
		if (b.bigBrackets) latex = `${a.latex}\\left(${b.latex}\\right)`;
		else latex = `${a.latex}(${b.latex})`;

		return {
			latex,
			requiresBrackets: true,
			bigBrackets: b.bigBrackets
		};
	},
	function_inverse: (n, s) => {
		const a = nodeToLatex(n.children![0], s);
		const b = nodeToLatex(n.children![1], s);
		let latex = "";
		if (b.bigBrackets) latex = `${a.latex}^{-1}\\left(${b.latex}\\right)`;
		else latex = `${a.latex}^{-1}(${b.latex})`;

		return {
			latex,
			requiresBrackets: true,
			bigBrackets: b.bigBrackets
		};
	},
	derivation: (n, s) => {
		const a = nodeToLatex(n.children![0], s);
		const b = nodeToLatex(n.children![1], s);
		const latex = `\\dfrac{d}{d ${a.latex}}(${b.latex})`;

		return {
			latex,
			requiresBrackets: false,
			bigBrackets: true
		};
	},
	derivationprime: (n, s) => {
		const a = nodeToLatex(n.children![0], s);
		const latex = `${a.latex}^{\\prime}`;

		return {
			latex,
			requiresBrackets: true,
			bigBrackets: true
		};
	},
	derivationprime2: (n, s) => {
		const a = nodeToLatex(n.children![0], s);
		const latex = `${a.latex}^{\\prime\\prime}`;

		return {
			latex,
			requiresBrackets: true,
			bigBrackets: true
		};
	},
	nderivationprime: (n, s) => {
		const a = nodeToLatex(n.children![0], s);
		const b = nodeToLatex(n.children![1], s);
		const latex = `${a.latex}^{(${b.latex})}`;

		return {
			latex,
			requiresBrackets: true,
			bigBrackets: true
		};
	},
	derivation_diff: (n, s) => {
		const a = nodeToLatex(n.children![0], s);
		const b = nodeToLatex(n.children![1], s);
		const latex = `\\dfrac{d ${a.latex}}{d ${b.latex}}`;

		return {
			latex,
			requiresBrackets: true,
			bigBrackets: true
		};
	},
	partial_derivation: (n, s) => {
		const a = nodeToLatex(n.children![0], s);
		const b = nodeToLatex(n.children![1], s);
		const latex = `\\dfrac{\\partial}{\\partial ${a.latex}} (${b.latex})`;

		return {
			latex,
			requiresBrackets: true,
			bigBrackets: true
		};
	},
	partial_derivation_diff: (n, s) => {
		const a = nodeToLatex(n.children![0], s);
		const b = nodeToLatex(n.children![1], s);
		const latex = `\\dfrac{\\partial ${a.latex}}{\\partial ${b.latex}}`;

		return {
			latex,
			requiresBrackets: true,
			bigBrackets: true
		};
	},
	lim: (n, s, p = false) => {
		const a = nodeToLatex(n.children![0], true);
		const b = nodeToLatex(n.children![1], true);
		const c = nodeToLatex(n.children![2], s);
		const o = p ? "\\lim$p" : "\\lim";
		let latex = "";
		if (c.requiresBrackets) {
			if (c.bigBrackets) latex = `${o}\\limits_{${a.latex} \\to ${b.latex}} \\left(${c.latex}\\right)`;
			else latex = `${o}\\limits_{${a.latex} \\to ${b.latex}} (${c.latex})`;
		} else latex = `${o}\\limits_{${a.latex} \\to ${b.latex}} ${c.latex}`;

		return {
			latex,
			requiresBrackets: true,
			bigBrackets: c.bigBrackets,
			customExponentPlace: p
		};
	},
	lim_right: (n, s, p = false) => {
		const a = nodeToLatex(n.children![0], true);
		const b = nodeToLatex(n.children![1], true);
		const c = nodeToLatex(n.children![2], s);
		const o = p ? "\\lim$p" : "\\lim";
		let latex = "";
		if (c.requiresBrackets) {
			if (c.bigBrackets) latex = `${o}\\limits_{${a.latex} \\to ${b.latex}^{+}} \\left(${c.latex}\\right)`;
			else latex = `${o}\\limits_{${a.latex} \\to ${b.latex}^{+}} (${c.latex})`;
		} else latex = `${o}\\limits_{${a.latex} \\to ${b.latex}^{+}} ${c.latex}`;

		return {
			latex,
			requiresBrackets: true,
			bigBrackets: c.bigBrackets,
			customExponentPlace: p
		};
	},
	lim_left: (n, s, p = false) => {
		const a = nodeToLatex(n.children![0], true);
		const b = nodeToLatex(n.children![1], true);
		const c = nodeToLatex(n.children![2], s);
		const o = p ? "\\lim$p" : "\\lim";
		let latex = "";
		if (c.requiresBrackets) {
			if (c.bigBrackets) latex = `${o}\\limits_{${a.latex} \\to ${b.latex}^{-}} \\left(${c.latex}\\right)`;
			else latex = `${o}\\limits_{${a.latex} \\to ${b.latex}^{-}} (${c.latex})`;
		} else latex = `${o}\\limits_{${a.latex} \\to ${b.latex}^{-}} ${c.latex}`;

		return {
			latex,
			requiresBrackets: true,
			bigBrackets: c.bigBrackets,
			customExponentPlace: p
		};
	},
	integral: (n, s) => {
		const a = nodeToLatex(n.children![0], s);
		const b = nodeToLatex(n.children![1], s);
		const latex = `\\int ${a.latex} d ${b.latex}`;

		return {
			latex,
			requiresBrackets: true,
			bigBrackets: true
		};
	},
	definiteintegral: (n, s) => {
		const a = nodeToLatex(n.children![0], true);
		const b = nodeToLatex(n.children![1], true);
		const c = nodeToLatex(n.children![2], s);
		const d = nodeToLatex(n.children![3], s);
		const latex = `\\int\\limits_{${a.latex}}^{${b.latex}} ${c.latex} d ${d.latex}`;

		return {
			latex,
			requiresBrackets: true,
			bigBrackets: true
		};
	},
	integralrightdash: (n, s) => {
		const a = nodeToLatex(n.children![0], s);
		const b = nodeToLatex(n.children![1], true);
		const c = nodeToLatex(n.children![2], true);
		const latex = `${a.latex} \\Bigg|_{${b.latex}}^{${c.latex}}`;

		return {
			latex,
			requiresBrackets: true,
			bigBrackets: true
		};
	},
	definitesigma: (n, s) => {
		const a = nodeToLatex(n.children![0], true);
		const b = nodeToLatex(n.children![1], true);
		const c = nodeToLatex(n.children![2], true);
		const d = nodeToLatex(n.children![3], s);
		const latex = `\\sum\\limits_{${a.latex} = ${b.latex}}^{${c.latex}} ${d.latex}`;

		return {
			latex,
			requiresBrackets: true,
			bigBrackets: true
		};
	},
	function_operation: (n, s) => {
		const a = nodeToLatex(n.children![0], s);
		const b = nodeToLatex(n.children![1], s);
		const latex = `(${a.latex})(${b.latex})`;

		return {
			latex,
			requiresBrackets: true,
			bigBrackets: false
		};
	},
	composition: (n, s) => {
		const a = nodeToLatex(n.children![0], s);
		const b = nodeToLatex(n.children![1], s);
		const latex = `${a.latex} \\circ ${b.latex}`;

		return {
			latex,
			requiresBrackets: true,
			bigBrackets: false
		};
	},
	ellipsis: () => {
		const latex = "\\ldots";

		return {
			latex,
			requiresBrackets: false,
			bigBrackets: false
		};
	},
	choose: (n, s) => {
		const a = nodeToLatex(n.children![0], s);
		const b = nodeToLatex(n.children![1], s);
		const latex = `\\binom{${a.latex}}{${b.latex}}`;

		return {
			latex,
			requiresBrackets: false,
			bigBrackets: true
		};
	},
	const: (n) => {
		const latex = n.value!.replace(".", "{,}");

		return {
			latex,
			requiresBrackets: false,
			bigBrackets: false
		};
	},
	string: (n) => {
		const latex = n.value!.replace("?", "{?}");
		return {
			latex,
			requiresBrackets: false,
			bigBrackets: false
		};
	},
	var: (n) => {
		let latex = "";
		switch (n.value!) {
			case "α":
				latex = "\\alpha ";
				break;
			case "β":
				latex = "\\beta ";
				break;
			case "γ":
				latex = "\\gamma ";
				break;
			case "δ":
				latex = "\\delta ";
				break;
			case "ε":
				latex = "\\varepsilon ";
				break;
			case "η":
				latex = "\\eta ";
				break;
			case "θ":
				latex = "\\theta ";
				break;
			case "λ":
				latex = "\\lambda ";
				break;
			case "µ":
				latex = "\\mu ";
				break;
			case "π":
				latex = "\\pi ";
				break;
			case "ρ":
				latex = "\\rho ";
				break;
			case "σ":
				latex = "\\sigma ";
				break;
			case "τ":
				latex = "\\tau ";
				break;
			case "Φ":
				latex = "\\phi ";
				break;
			case "ψ":
				latex = "\\psi ";
				break;
			case "ℕ":
				latex = "\\N ";
				break;
			case "ℤ":
				latex = "\\Z ";
				break;
			case "ℚ":
				latex = "\\Q ";
				break;
			case "ℝ":
				latex = "\\R ";
				break;
			case "∅":
				latex = "\\varnothing ";
				break;
			case "∞":
				latex = "\\infty ";
				break;
			default:
				latex = n.value!;
				break;
		}

		return {
			latex,
			requiresBrackets: false,
			bigBrackets: false
		};
	},
	list: (n, s) => {
		let bigBrackets = false;
		const requiresBrackets = false;
		const latex = n
			.children!.map((x) => {
				const res = nodeToLatex(x, s);
				bigBrackets = bigBrackets || res.bigBrackets;
				return res.latex;
			})
			.join(", ");

		return { latex, bigBrackets, requiresBrackets };
	},
	vert_list: (n, s) => {
		const latex = n.children!.map((x) => nodeToLatex(x, s).latex).join("\\\\\n");
		const bigBrackets = false;
		const requiresBrackets = false;
		return { latex, bigBrackets, requiresBrackets };
	},
	order: (n, s) => {
		let bigBrackets = false;
		const requiresBrackets = false;
		let latex = n
			.children!.map((x) => {
				const res = nodeToLatex(x, s);
				bigBrackets = bigBrackets || res.bigBrackets;
				return res.latex;
			})
			.join("; ");

		if (bigBrackets) latex = "\\left(" + latex + "\\right)";
		else latex = "(" + latex + ")";

		return { latex, bigBrackets, requiresBrackets };
	},
	set: (n, s) => {
		let bigBrackets = false;
		const requiresBrackets = false;
		let latex = n
			.children!.map((x) => {
				const res = nodeToLatex(x, s);
				bigBrackets = bigBrackets || res.bigBrackets;
				return res.latex;
			})
			.join("; ");

		if (bigBrackets) latex = "\\left\\{" + latex + "\\right\\}";
		else latex = "\\{" + latex + "\\}";

		return { latex, bigBrackets, requiresBrackets };
	},
	system: (n, s) => {
		const latex =
			"\\begin{cases}" + n.children!.map((x) => nodeToLatex(x, s).latex).join(",\\\\\n") + ";\\\\\n\\end{cases}";

		return {
			latex,
			requiresBrackets: false,
			bigBrackets: false
		};
	},
	alt_form: (n, s) => {
		const latex = n.children!.map((x) => nodeToLatex(x, s).latex).join("\\), \\(");

		return {
			latex,
			requiresBrackets: false,
			bigBrackets: false
		};
	},
	pow: (n, s) => {
		const a = nodeToLatex(n.children![0], s, true);
		const b = nodeToLatex(n.children![1], true);
		let latex = "";
		if (a.customExponentPlace!) latex = a.latex.replace("$p", `^{${b.latex}}`);
		else latex = `${a.latex}^{${b.latex}}`;

		return {
			latex,
			requiresBrackets: true,
			bigBrackets: true
		};
	},
	periodic_localize: (n) => {
		const a = n.children![0].value!;
		const b = a.length - parseInt(n.children![1].value!);
		const latex = (a.substring(0, b) + "(" + a.substring(b) + ")").replace(".", "{,}");

		return {
			latex,
			requiresBrackets: false,
			bigBrackets: false
		};
	},
	inline_rich_text: (n) => {
		const latex = localize(n.text!, true);

		return {
			latex,
			requiresBrackets: false,
			bigBrackets: false
		};
	}
};

export function buildLatex(node: MathNode): string {
	return "\\(" + nodeToLatex(node, false).latex + "\\)";
}

export function localize(localization: Localization, inline?: true) {
	if (inline) {
		return localization.localization.tokens
			.map((x) => {
				if (x.type === "text") return `\\text{${x.text!}}`;
				else return nodeToLatex(x.node!, false).latex;
			})
			.join("");
	}
	return localization.localization.tokens
		.map((x) => {
			if (x.type === "text") return x.text!;
			else return buildLatex(x.node!);
		})
		.join("");
}

export function nodeToLatex(node: MathNode, smallFrac: boolean, inBase?: boolean): Res {
	const p = templates[node.type];
	if (!p) return { latex: node.type, requiresBrackets: false, bigBrackets: false };
	return p(node, smallFrac, inBase);
}

