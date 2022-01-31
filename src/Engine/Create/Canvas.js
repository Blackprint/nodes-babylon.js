// Node will be initialized first by Blackprint Engine
// This should be used for initialize port structure and set the target interface
Blackprint.registerNode('Babylon.js/Engine/Create/Canvas',
class EngineCreateCanvas extends Blackprint.Node {
	static output = {
		Engine: BABYLON.Engine,
		Canvas: HTMLCanvasElement
	};

	constructor(instance){
		super(instance);

		let iface = this.setInterface('BPIC/Babylon.js/Engine/Create/Canvas');
		iface.title = 'Canvas';
		iface.description = 'Babylon.js canvas';
	}
});

Blackprint.registerInterface('BPIC/Babylon.js/Engine/Create/Canvas',
Context.IFace.EngineCreateCanvas = class IMyTemplate extends Blackprint.Interface {
	constructor(node){
		super(node);
		let canvas = this.canvas = document.createElement('canvas');
		canvas.touchAction = "none";

		canvas.width = 360;
		canvas.height = 240;
	}

	imported(){
		let Output = this.ref.Output;

		Output.Canvas = this.canvas;
		Output.Engine = new BABYLON.Engine(Output.Canvas, false);
	}

	destroy(){
		this.ref.Output.Engine.dispose();
	}
});