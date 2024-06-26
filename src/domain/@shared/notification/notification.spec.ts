import Notifiaction from "./notifiaction";

describe("Unit test for notification", () => {


    it("should create errors", () => {
        const notification = new Notifiaction();
        const error = {
            message: "error message",
            context: "customer",
        }

        notification.addError(error);

        expect(notification.messages("customer")).toBe("customer: error message,");

        const error2 = {
            message: "error message2",
            context: "customer",
        }

        notification.addError(error2);

        expect(notification.messages("customer")).toBe("customer: error message,customer: error message2,");

        const error3 = {
            message: "error message2",
            context: "order",
        }

        notification.addError(error3);

        expect(notification.messages("customer")).toBe("customer: error message,customer: error message2,");

        expect(notification.messages("order")).toBe("order: error message2,");

        expect(notification.messages()).toBe(
            "customer: error message,customer: error message2,order: error message2,"
        );
    });

    it("should check if notification has at least one error", () => {
        const notification = new Notifiaction();
        const error = {
            message: "error message",
            context: "customer",
        }

        notification.addError(error);

        expect(notification.hasErrors()).toBe(true);
    });

    it("should get all erros props", () => {
        const notification = new Notifiaction();
        const error = {
            message: "error message",
            context: "customer",
        }

        notification.addError(error);

        expect(notification.getErrors()).toEqual([error]);
    });

    it("should not get erros props", () => {
        const notification = new Notifiaction();

        expect(notification.hasErrors()).toEqual(false);
    });



});