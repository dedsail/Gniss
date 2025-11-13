export class Navigation {
    constructor() {
        this.navItems = document.querySelectorAll('.nav-item');
        this.init();
    }
    
    init() {
        this.navItems.forEach(item => {
            item.addEventListener('click', this.handleNavClick.bind(this));
        });
    }
    
    handleNavClick(e) {
        e.preventDefault();
        // Логика обработки клика...
    }
}
