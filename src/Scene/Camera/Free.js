Blackprint.registerNode("Babylon.js/Scene/Camera/Free",
class extends Blackprint.Node {
	static input = {
		Scene: BABYLON.Scene,
		Position: BABYLON.Vector3,
		Attach: HTMLCanvasElement,
	};

	static output = { Camera: BABYLON.Camera };

	constructor(instance){
		super(instance);
		this.partialUpdate = true;

		let iface = this.setInterface();
		iface.title = "Free Camera";

		iface.data = new SceneCameraFreeData(iface);
	}

	// Called when input value was updated
	update({ input: port }){
		let {IInput, Input, Output} = this.ref;

		if(port === IInput.Scene){
			let data = this.iface.data;

			Output.Camera?.dispose();

			let camera = Output.Camera = new BABYLON.FreeCamera("FreeCamera", data.position, Input.Scene);
			camera.setTarget(BABYLON.Vector3.Zero());

			if(Input.Attach != null)
				Output.Camera.attachControl(Input.Attach, true);
		}
		else if(port === IInput.Position){}
		else if(port === IInput.Attach){
			let canvas = Input.Attach;
			if(Output.Camera != null)
				Output.Camera.attachControl(canvas, true);

			IInput.Attach.once('disconnect', function(){
				Output.Camera.detachControl(canvas);
			});
		}
	}

	destroy(){
		let {Input, Output} = this.ref;

		Output.Camera?.dispose();
	}
});

class SceneCameraFreeData {
	#iface = null;
	#position = '';

	constructor(iface){
		this.#iface = iface;
		this.#position = new BABYLON.Vector3(0, 5, -10);
	}

	get position(){ return this.#position }
	set position(val){
		val = val.replace(/ /g, '').split(',');
		if(val.length !== 3) return;

		this.#position = new BABYLON.Vector3(...val);
	}
}

// Using getter/setter will make the property not enumerable and Blackprint will skip that property when exporting
Blackprint.utils.setEnumerablePrototype(SceneCameraFreeData, {
	position: true,
});