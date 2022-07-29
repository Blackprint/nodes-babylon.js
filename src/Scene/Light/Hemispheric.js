Blackprint.registerNode("Babylon.js/Scene/Light/Hemispheric",
class EmptyNode extends Blackprint.Node {
	static input = {
		Scene: BABYLON.Scene,
		Position: BABYLON.Vector3,
		Intensity: Number,
	};

	static output = { Light: BABYLON.Light };

	constructor(instance){
		super(instance);

		let iface = this.setInterface();
		iface.title = "Hemispheric Light";
		iface.data = new SceneLightHemisphericData(iface);
	}

	// Called when input value was updated
	update({ input: port }){
		let {IInput, Input, Output} = this.ref;

		if(port === IInput.Scene){
			let data = this.iface.data;

			Output.Light?.dispose();
			Output.Light = new BABYLON.HemisphericLight("HemisphericLight", data.position, Input.Scene);
		}
		else if(port === IInput.Position){
			// if(Output.Light != null)
			// 	Output.Light.attachControl(IInput.Attach, true);
		}
		else if(port === IInput.Intensity){
			Output.Light.intensity = Input.Intensity;
		}
	}

	destroy(){
		let {Input, Output} = this.ref;

		Output.Light?.dispose();
	}
});

class SceneLightHemisphericData {
	#iface = null;
	#position = '';
	// intensity = 1;

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
Blackprint.utils.setEnumerablePrototype(SceneLightHemisphericData, {
	position: true,
});