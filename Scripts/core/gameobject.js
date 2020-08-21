/*
File name : gameobject.js
Author's name : Seol Cheon
Student number : 301113120
web site name : Slot Machine App
File description : javascript file to make slot machine work that is linked to html file
                   functions necessary for making new game objects
*/
var Core;
(function (Core) {
    class GameObject extends createjs.Bitmap {
        // CONSTRUCTOR(S)
        constructor(bitmap_asset, x = 0, y = 0, isCentered = false) {
            super(Config.Globals.AssetManifest.getResult(bitmap_asset));
            this.isCentered = isCentered;
            this.x = x;
            this.y = y;
        }
        // PUBLIC PROPERTIES
        get isCentered() {
            return this.m_isCentered;
        }
        set isCentered(value) {
            if (value) {
                this.m_recalculateSize();
            }
            else {
                this.regX = 0;
                this.regY = 0;
            }
            this.m_isCentered = value;
        }
        // PRIVATE METHOD(S)
        m_recalculateSize() {
            this.regX = this.getBounds().width * 0.5;
            this.regY = this.getBounds().height * 0.5;
        }
    }
    Core.GameObject = GameObject;
})(Core || (Core = {}));
//# sourceMappingURL=gameobject.js.map