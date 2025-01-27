import { buildLatex, localize } from './latex';
import { CommandResponse, ImageGroupsResponse, Step } from '../types/types';

export function buildImageResponse(res: ImageGroupsResponse) {
	const a = res.preview.groups;
	if (!a) throw new Error("Junk image");
	const b = a.filter((x) => x.type !== "graph");
	if (b.length === 0) throw new Error("Cant solve");
	const c = b.flatMap((x) => x.entries).map((x) => {
		const command = x.command;
		const title = localize(x.preview.title);
		const method = localize(x.preview.method);
		const description = localize(x.preview.content.description);
		const problem = buildLatex(x.preview.content.problem);
		const solution = buildLatex(x.preview.content.solution);
		return { command, title, method, description, problem, solution };
	})
	return c;
}

export function buildCommandResponse(res: CommandResponse) {
	function formatSteps(steps: Step[]) {
		return steps.map((step) => {
			const header = localize(step.headers[0]);
			const substeps = step.substeps.map((substep) => {
				const left = buildLatex(substep.left);
				const right = buildLatex(substep.right);
				const description = localize(substep.description);
				const subresult: any = substep.subresult ? formatSteps(substep.subresult.steps) : undefined;

				const res = {
					left,
					right,
					description,
					subresult
				};
				return res;
			});

			return { header, substeps };
		});
	}
	const solution = buildLatex(res.result.solution);
	const steps = formatSteps(res.result.steps);
	steps.push({
		header: "Ответ",
		substeps: [
			{
				left: solution,
				right: solution,
				description: "Ответ",
				subresult: null
			}
		]
	});
	return { steps: steps, res: res };
}



