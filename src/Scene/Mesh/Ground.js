Blackprint.registerNode("Babylon.js/Scene/Mesh/Ground",
class extends Blackprint.Node {
	static input = {
		Scene: BABYLON.Scene,
		// Position: BABYLON.Vector3,
	};

	static output = {
		Mesh: BABYLON.Mesh
	};

	constructor(instance){
		super(instance);
		this.partialUpdate = true;

		let iface = this.setInterface();
		iface.title = "Ground Mesh";

		iface.data = {
			x: 0,
			y: 0,
			z: 0,
			width: 6,
			height: 6,
		};
	}

	init(){
		let {IInput, Input, Output} = this.ref;
		IInput.Scene.on('connect', ()=> {
			let data = this.iface.data;

			Output.Mesh?.dispose();
			Output.Mesh = new BABYLON.CreateGround("GroundMesh", {
				width: data.width,
				height: data.height,
			}, Input.Scene);

			IInput.Scene.once('disconnect', ()=> {
				Output.Mesh.dispose();
			});
		});
	}

	destroy(){
		let {Input, Output} = this.ref;

		Output.Mesh?.dispose();
	}
});