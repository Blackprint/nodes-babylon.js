/**
 * Create new engine instance and the rendering canvas
 * @blackprint node
 * @summary Babylon.js Scene
 */
Blackprint.registerNode('Babylon.js/Engine/Create/Canvas',
class EngineCreateCanvas extends Blackprint.Node {
	static output = {
		/** Babylon's Engine */
		Engine: BABYLON.Engine,
		/** Canvas object that being used for rendering scenes */
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