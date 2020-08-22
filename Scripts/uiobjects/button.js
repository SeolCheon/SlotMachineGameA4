/**
  * File name : button.js
 * Author's name : Seol Cheon
 * Student Number : 301113120
 * Web site name : Slot Machine
 * File description : this code page is linked to html file.
                   This function has class that allow users to make UI object button with properties
                   and method that adjust an button's location and size, mouse event.
 */
var UIObjects;
(function (UIObjects) {
    class Button extends Core.GameObject {
        // PRIVATE FIELDS (CLASS MEMBERS)
        // CONSTRUCTOR(S)
        constructor(bitmap_asset, x = 0, y = 0, isCentered = false) {
            super(bitmap_asset, x, y, isCentered);
            this.isCentered = isCentered;
            // mouse events
            this.on("mouseover", this.m_mouseOver);
            this.on("mouseout", this.m_mouseOut);
        }
        // PRIVATE METHOD(S)
        m_mouseOver() {
            this.alpha = 0.7; // 70% opaque - 30% transparent
        }
        m_mouseOut() {
            this.alpha = 1.0; // 100% opaque - 0% transparent
        }
    }
    UIObjects.Button = Button;
})(UIObjects || (UIObjects = {}));
//# sourceMappingURL=button.js.map