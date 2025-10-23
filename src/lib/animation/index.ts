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

	currNode: AnimNode<T> | null = null;

	constructor(initialSteps: AnimConfig<T>[], onAnimate: (config: AnimConfig<T>) => Promise<void>) {
		initialSteps.forEach((step) => this.insertNode(step));
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

	async animate() {
		if (!this.animHead) return;

		if (!this.currNode) {
			this.currNode = this.animHead;
		}

		await this.apply(this.currNode);

		if (!this.currNode.next) return;

		this.currNode = this.currNode.next;

		if (this.currNode.config.isStoppable) return;

		await this.animate();
	}

	async animateReverse() {
		if (!this.animHead) return;

		if (!this.currNode) {
			this.currNode = this.animHead;
		}

		await this.apply(this.currNode);

		if (!this.currNode.prev) return;

		this.currNode = this.currNode.prev;

		if (this.currNode.config.isStoppable) return;

		await this.animateReverse();
	}
}
