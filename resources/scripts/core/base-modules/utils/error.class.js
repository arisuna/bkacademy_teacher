class PremiumModuleError extends Error {
    constructor(message, moduleName) {
        super(message);
        this.moduleName = moduleName;
        this.name = "PremiumModuleError";
    }
}

class PaymentRequiredError extends Error {
    constructor(message, moduleName) {
        super(message);
        this.moduleName = moduleName;
        this.name = "PaymentRequiredError";
    }
}

class PermissionNotFoundError extends Error {
    constructor(message, moduleName) {
        super(message);
        this.moduleName = moduleName;
        this.name = "PermissionNotFoundError";
    }
}

class AclError extends Error {
    constructor(message, controller, action) {
        super(message);
        this.controller = controller;
        this.action = action;
        this.name = "AclError";
    }
}

class DataNofFoundError extends Error {
    constructor(message, url) {
        super(message);
        this.url = url;
        this.name = "DataNofFoundError";
    }
}


class AuthenticationError extends Error {
    constructor(message, url) {
        super(message);
        this.url = url;
        this.name = "AuthenticationError";
    }
}
