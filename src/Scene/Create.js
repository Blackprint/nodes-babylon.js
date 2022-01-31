// Node will be initialized first by Blackprint Engine
// This should be used for initialize port structure and set the target interface
Blackprint.registerNode('Babylon.js/Scene/Create',
class EngineCreateCanvas extends Blackprint.Node {
	renderLoop = null;

	static input = {
		Engine: BABYLON.Engine,
		Render: Blackprint.Port.Trigger(function(){
			if(this.renderLoop !== null) return;

			let scene = this.output.Scene;
			if(scene === void 0) throw new Error("Scene was not found");

			this.renderLoop = ()=> { scene.render() };
			this.input.Engine.runRenderLoop(this.renderLoop);
		}),
		Pause: Blackprint.Port.Trigger(function(){
			if(this.renderLoop === null) return;

			this.input.Engine.stopRenderLoop(this.renderLoop);
			this.renderLoop = null
		}),
	};

	static output = { Scene: BABYLON.Scene };

	constructor(instance){
		super(instance);

		let iface = this.setInterface();
		iface.title = 'Scene';
		iface.description = 'Babylon.js Scene';
	}

	update(port){
		let {IInput, Input, Output} = this.ref;

		if(port === IInput.Engine)
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