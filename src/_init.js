// This script will run first, and then the other files
// depends on blackprint.config.js configuration

if(!window.Blackprint.Environment.isBrowser){
	console.log("@blackprint/nodes-babylon.js is only for browser, nodes will not be registered");
	return;
}

// Let the Blackprint Editor know the source URL where
// the registerNode and registerInterface belongs to
let Blackprint = window.Blackprint.loadScope({
	// You can find the URL on Blackprint menu -> Modules
	// This will also be exported to JSON if this module's nodes is being used
	url: import.meta.url,

	// This will autoload (*.sf.mjs) and (*.sf.css) file for Browser
	hasInterface: true,
});


/* Parallely load dependencies from CDN here (optional) */
//>> imports(...) =>  sf.loader.mjs(...) or [import(..), ..];
let _remoteModule = [
	"https://cdn.jsdelivr.net/npm/babylonjs@5.0.0-beta.4/babylon.min.js",
	"https://cdn.jsdelivr.net/npm/babylonjs-loaders@5.0.0-beta.4/babylonjs.loaders.min.js",
];

if(globalThis.sf != null)
	await sf.loader.js(_remoteModule, {ordered: true});
else {
	for (var i = 0; i < _remoteModule.length; i++)
		await import(_remoteModule[i]);
}


// Global shared context (share to _init.sf)
let Context = Blackprint.createContext('Babylon.js');


// This is needed to avoid duplicated event listener when using hot reload
// Event listener that registered with same slot will be replaced
Context.EventSlot = {slot: 'my-private-event-slot'};