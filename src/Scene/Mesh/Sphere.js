Blackprint.registerNode("Babylon.js/Scene/Mesh/Sphere",
class EmptyNode extends Blackprint.Node {
	static input = {
		Scene: BABYLON.Scene,
		// Position: BABYLON.Vector3,
	};

	static output = { Mesh: BABYLON.Mesh };

	constructor(instance){
		super(instance);

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

	update(port){
		let {IInput, Input, Output} = this.ref;
		let data = this.iface.data;

		if(port === IInput.Scene){
			let data = this.iface.data;

			Output.Mesh?.dispose();
			Output.Mesh = new BABYLON.CreateSphere("SphereMesh", {
				diameter: data.diameter,
				segments: data.segments,
			}, Input.Scene);
		}
	}

	destroy(){
		let {Input, Output} = this.ref;
		Output.Mesh?.dispose();
	}
});