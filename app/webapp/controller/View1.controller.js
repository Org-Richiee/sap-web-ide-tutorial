sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageBox",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
], function (Controller, MessageBox, Filter, FilterOperator) {
	"use strict";

	return Controller.extend("zapata.mx.app.controller.View1", {
		onInit: function () {

		},
		// 		// show in a pop-up which list element was pressed
		// 		handleListItemPress: function (oEvent) {
		// 			MessageBox.show(
		// 				// "Presionaste el item: " + oEvent.getSource().getBindingContext(), {
		// 				"Presionaste el item: " + oEvent.getSource().valueOf("{VbelnF}"), {
		// 					icon: sap.m.MessageBox.Icon.SUCCESS,
		// 					title: "Trabajando",
		// 					actions: [sap.m.MessageBox.Action.OK]
		// 				}
		// 			);
		// 		},
		handleListItemPress: function (oEvent) {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			var selVbeln = oEvent.getSource().getBindingContext().getProperty("Vbeln");
			oRouter.navTo("DetailFI", {
				VbelnID: selVbeln
			});
		},

		onFilterInvoices: function (oEvent) {
			// build filter array
			var aFilter = [];
			var sQuery = oEvent.getParameter("query");
			if (sQuery) {
				aFilter.push(new Filter("Vbeln", FilterOperator.Contains, sQuery));
			}
			// filter binding
			var oList = this.byId("DocFI");
			var oBinding = oList.getBinding("items");
			oBinding.filter(aFilter);
		},
		onDelete: function () {
			var oModel = this.getView().getModel();
			var chk = this.getView().byId("chkId").getSelected().getText()
				// 			var VbelnId = this.getView().byId("Vbeln").getValue();
			console.log(chk);
			oModel.remove("/PAOSSet('" + chk + "')", {
				method: "DELETE",
				success: function (data) {
					alert("success");
				},
				error: function (e) {
					alert("error");
				}
			});
		}
	});
});