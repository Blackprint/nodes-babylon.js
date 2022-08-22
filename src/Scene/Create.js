/**
 * Create new scene where you can put light, camera, mesh, etc
 * @blackprint node
 * @summary Babylon.js Scene
 */
Blackprint.registerNode('Babylon.js/Scene/Create',
class extends Blackprint.Node {
	renderLoop = null;

	static input = {
		/** Babylon's Engine */
		Engine: BABYLON.Engine,
		/** Begin rendering this scene into the engine */
		Render: Blackprint.Port.Trigger(function({ iface }){
			let node = iface.node;
			if(node.renderLoop !== null) return;

			let scene = node.output.Scene;
			if(scene === void 0) throw new Error("Scene was not found");

			node.renderLoop = ()=> { scene.render() };
			node.input.Engine.runRenderLoop(node.renderLoop);
		}),
		/** Pause rendering this scene on the engine */
		Pause: Blackprint.Port.Trigger(function({ iface }){
			let node = iface.node;
			if(node.renderLoop === null) return;

			node.input.Engine.stopRenderLoop(node.renderLoop);
			node.renderLoop = null
		}),
	};

	static output = {
		/** This scene object */
		Scene: BABYLON.Scene,
	};

	constructor(instance){
		super(instance);

		let iface = this.setInterface();
		iface.title = 'Scene';
	}

	update(cable){
		let {IInput, Input, Output} = this.ref;

		if(cable.input === IInput.Engine)
			Output.Scene = new BABYLON.Scene(Input.Engine);
	}

	destroy(){
		let {Input, Output} = this.ref;

		if(Output.Scene != null){
			this.ref.Input.Pause();
			this.ref.Output.Scene.dispose();
		}
	}
});