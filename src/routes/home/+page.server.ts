export const ssr = false;

export async function load() {
	return new Promise((fulfil) => {
		setTimeout(fulfil, 2000);
	});
}
