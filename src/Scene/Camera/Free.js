Blackprint.registerNode("Babylon.js/Scene/Camera/Free",
class EmptyNode extends Blackprint.Node {
	static input = {
		Scene: BABYLON.Scene,
		Position: BABYLON.Vector3,
		Attach: HTMLCanvasElement,
	};

	static output = { Camera: BABYLON.Camera };

	constructor(instance){
		super(instance);

		let iface = this.setInterface();
		iface.title = "Free Camera";

		iface.data = {
			get position(){
				if(this._position === void 0)
					this._position = new BABYLON.Vector3(0, 5, -10);

				return this._position;
			},
			set position(val){
				val = val.replace(/ /g, '').split(',');
				if(val.length !== 3) return;

				this._position = new BABYLON.Vector3(...val);
			},
		};
	}

	// Called when input value was updated
	update(port){
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