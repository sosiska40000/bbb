export type View = {
	width: number;
	height: number;
	x: number;
	y: number;
};

export type MathNode = {
	type: MathNodeType;
	children?: MathNode[];
	value?: string;
	text?: Localization;
};

export type ImageGroupsResponse = {
	preview: {
		type: "previewGroups";
		groups: Group[];
	}
};

export type Group = {
	type: "vertical" | "graph";
	entries: Entry[];
};

export type Entry = {
	type: "vertical";
	command: Command;
	preview: Preview;
	stepCount: number;
};

export type Command = {
	node: MathNode;
	action: {
		command: string;
		args: string[];
	};
};

export type Preview = {
	type: "vertical";
	title: Localization;
	method: Localization;
	content: {
		description: Localization;
		problem: MathNode;
		solution: MathNode;
	};
};

export type Localization = {
	definition: {
		key: "string";
		args: {}[];
	};
	localization: {
		locale: "ru";
		tokens: { type: string; text?: string; node?: MathNode }[];
	};
};

export type CommandResponse = {
	result: {
		type: "vertical";
		solution: MathNode;
		steps: Step[];
	};
};

export type Step = {
	headers: Localization[];
	substeps: Substep[];
};

export type Substep = {
	left: MathNode;
	right: MathNode;
	description: Localization;
	subresult?: { steps: Step[] };
};

export type MathNodeType =
	| "equals"
	| "add"
	| "sub"
	| "div"
	| "mul"
	| "muli"
	| "add_sub"
	| "not_equals"
	| "approx"
	| "gt"
	| "lt"
	| "gte"
	| "lte"
	| "elem_of"
	| "elem_not_of"
	| "union"
	| "cond_def"
	| "cond_expr"
	| "diff"
	| "negative"
	| "positive"
	| "add_sub_sign"
	| "approx_sign"
	| "differential"
	| "ln"
	| "root2"
	| "sin"
	| "cos"
	| "tan"
	| "cot"
	| "asin"
	| "acos"
	| "atan"
	| "acot"
	| "sec"
	| "csc"
	| "factorial"
	| "percentage"
	| "bracket"
	| "abs"
	| "ooint"
	| "coint"
	| "ocint"
	| "ccint"
	| "indexed"
	| "deg"
	| "degmin"
	| "degminsecond"
	| "log"
	| "root"
	| "frac"
	| "mixedfrac"
	| "function"
	| "function_inverse"
	| "derivation"
	| "derivationprime"
	| "derivationprime2"
	| "nderivationprime"
	| "derivation_diff"
	| "partial_derivation"
	| "partial_derivation_diff"
	| "lim"
	| "lim_right"
	| "lim_left"
	| "integral"
	| "definiteintegral"
	| "integralrightdash"
	| "definitesigma"
	| "function_operation"
	| "composition"
	| "ellipsis"
	| "choose"
	| "const"
	| "string"
	| "var"
	| "periodic_localize"
	| "list"
	| "vert_list"
	| "order"
	| "system"
	| "alt_form"
	| "set"
	| "inline_rich_text"
	| "pow";


