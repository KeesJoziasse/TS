/**
 * Repository for resources like images. If you load all resources with this 
 * class, these resources will be stored here. This means that they are 
 * loaded only once.
 */
class ResourceRepository {
    
    private readonly basePath: string;

    private assets: {[keys:string]:HTMLElement} = {};

    /**
     * Constructs a new AssetRepository
     * 
     * @param {string} basePath path that must be prefixed before the name to 
     * generate urls for a specific resource
     */
    public constructor(basePath: string) {
        this.basePath = basePath;
    }

    /**
     * Adds an image to the repository
     * @param key 
     * @param url 
     */
    public addImage(key: string, url: string) {
        let imageElement = new Image();
        this.assets[key] = imageElement;

        // Now, set the src to start loading the image
        imageElement.src = this.generateURL(url);
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
        return <HTMLImageElement>this.assets[key];
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