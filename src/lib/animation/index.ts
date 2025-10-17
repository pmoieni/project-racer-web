export interface AnimConfig<T> {
	isStoppable: boolean;
	props: T;
}

export interface AnimNode<T> {
	config: AnimConfig<T>;
	next: AnimNode<T> | null;
	prev: AnimNode<T> | null;
}

export class AnimController<T> {
	private animHead: AnimNode<T> | null = null;
	private onAnimate: (config: AnimConfig<T>) => Promise<void>;

	constructor(onAnimate: (config: AnimConfig<T>) => Promise<void>) {
		this.onAnimate = onAnimate;
	}

	getLastNode(node: AnimNode<T>): AnimNode<T> {
		return node.next ? this.getLastNode(node.next) : node;
	}

	insertNode(config: AnimConfig<T>) {
		const node: AnimNode<T> = { config, next: null, prev: null };

		if (!this.animHead) {
			this.animHead = node;
			return;
		}

		const lastNode = this.getLastNode(this.animHead);
		node.prev = lastNode;
		lastNode.next = node;
	}

	insertNodeAtStart(config: AnimConfig<T>) {
		const node: AnimNode<T> = { config, next: null, prev: null };

		if (!this.animHead) {
			this.animHead = node;
			return;
		}

		this.animHead.prev = node;
		node.next = this.animHead;
		this.animHead = node;
	}

	deleteNode(node: AnimNode<T>) {
		if (!node.prev) {
			this.animHead = node.next;
			return;
		}

		const prevNode = node.prev;
		prevNode.next = node.next;
	}

	private async apply(node: AnimNode<T>) {
		const config = node.config;

		if (this.onAnimate) await this.onAnimate(config);
	}

	async animate(node: AnimNode<T> | null, reverse?: boolean): Promise<AnimNode<T> | null> {
		if (!this.animHead) {
			return null;
		}

		const innerNode = node ? node : this.animHead;

		await this.apply(innerNode);

		if (innerNode.config.isStoppable) {
			return innerNode;
		}

		return reverse ? this.animate(innerNode.prev) : this.animate(innerNode.next);
	}
}
