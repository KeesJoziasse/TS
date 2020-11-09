/**
 * This class is responsible for maintaining a repository of ImageHTMLElements.
 * It handles the issues of asynchronously loading of resources by the browser
 * by checking which of the resources are loaded.
 * 
 * Each instance of this class starts with a base path and an array of resources
 * that must be loaded. The object starts loading all resources. When a resource
 * is loaded, the HTMLImageElement is stored in a Map-like structure (key-value 
 * pair). The key is constructed from the name of the resource without the 
 * extension and '/' characters are replaced by a '.'.
 * 
 * The progress can be monitored by the isLoading() method.
 */
class ImageRepository {

    private readonly basePath: string;

    private assets: {[keys:string]:HTMLImageElement} = {};

    // Holds the keys of the assets that are not loaded yet
    private loadingAssets = new Array<string>();

    /**
     * Constructs a new AssetRepository
     * 
     * @param {string} basePath path that must be prefixed before the name to 
     * generate urls for a specific resource
     * @param {string[]} asset_names array of resource names that will be 
     * loaded into memory.
     */
    public constructor(basePath: string, asset_names: string[]) {
        this.basePath = basePath;
        asset_names.forEach((name) => {
            this.startLoadingImage(name);
        });
    }

    /**
     * Returns `true` if not all resources are loaded
     * 
     * @returns {boolean} true if not all resources are loaded
     */
    public isLoading() : boolean {
        return this.loadingAssets.length > 0;
    }

    /**
     * Returns the image in the Map-like structure of loaded images the is 
     * represented by the specified key
     * 
     * @param key the name (using the dot-notation) of the HTMLImageElement to
     * get
     * @returns {HTMLImageElement} the image represented by the given name
     */
    public getImage(key: string) : HTMLImageElement {
        return this.assets[key];
    }

    /**
     * Starts loading the image.
     * 
     * @param {string} name the name of the image to load
     */
    private startLoadingImage(name: string) {
        let imageElement = new Image();

        // We must wait until the image file is loaded into the element
        // We add an event listener
        // We'll be using an arrow function for this, just because we must.
        imageElement.addEventListener("load", (event) => {
            const key = this.generateKeyFromSrc(imageElement.src);
            this.assets[key] = imageElement;
            // Remove the key from the array of loading assets 
            this.loadingAssets.splice(this.loadingAssets.indexOf(key), 1);
        });

        const src = this.generateURL(name);
        // Add the key to the array of loading assets
        this.loadingAssets.push(this.generateKeyFromSrc(src));
        // Now, set the src to start loading the image
        imageElement.src = src;
    }

    /**
     * Generates a key (in dot-notation) for the specified source path.
     * 
     * @param {string} src the source path of the item
     * @returns {string} a key string
     */
    private generateKeyFromSrc(src: string) : string {
        const start = this.basePath.substring(1);
        const index = src.indexOf(start) + start.length + 1;
        const key = src.substr(index, src.length- index - 4).split("/").join(".");
        return key;
    }

    /**
     * Generates a URL for the specified resource name, using the basePath
     * 
     * @param name the name of the resource
     * @returns {string} a URL to load the resource from
     */
    private generateURL(name: string): string {
        return this.basePath + "/" + name;
    }


}