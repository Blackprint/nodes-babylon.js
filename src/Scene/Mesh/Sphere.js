Blackprint.registerNode("Babylon.js/Scene/Mesh/Sphere",
class extends Blackprint.Node {
	static input = {
		Scene: BABYLON.Scene,
		// Position: BABYLON.Vector3,
	};

	static output = { Mesh: BABYLON.Mesh };

	constructor(instance){
		super(instance);
		this.partialUpdate = true;

		let iface = this.setInterface();
		iface.title = "Sphere Mesh";

		iface.data = {
			x: 0,
			y: 0,
			z: 0,
			diameter: 1,
			segments: 16,
		};
	}

	init(){
		let {IInput, Input, Output} = this.ref;
		IInput.Scene.on('connect', ()=> {
			let data = this.iface.data;

			Output.Mesh?.dispose();
			Output.Mesh = new BABYLON.CreateSphere("SphereMesh", {
				diameter: data.diameter,
				segments: data.segments,
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