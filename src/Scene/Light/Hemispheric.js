Blackprint.registerNode("Babylon.js/Scene/Light/Hemispheric",
class extends Blackprint.Node {
	static input = {
		Scene: BABYLON.Scene,
		Position: BABYLON.Vector3, // ToDo
		Intensity: Blackprint.Port.Default(Number, 1),
	};

	static output = { Light: BABYLON.Light };

	constructor(instance){
		super(instance);
		this.partialUpdate = true;

		let iface = this.setInterface();
		iface.title = "Hemispheric Light";
		iface.data = new SceneLightHemisphericData(iface);
	}

	init(){
		let {IInput, Input, Output} = this.ref;
		IInput.Scene.on('connect', ()=> {
			let data = this.iface.data;

			Output.Light?.dispose();
			Output.Light = new BABYLON.HemisphericLight("HemisphericLight", data.position, Input.Scene);
			Output.Light.intensity = Input.Intensity;

			IInput.Scene.once('disconnect', ()=> {
				Output.Light.dispose();
			});
		});
	}

	update(){
		let {IInput, Input, Output} = this.ref;

		if(Output.Light != null)
			Output.Light.intensity = Input.Intensity;
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