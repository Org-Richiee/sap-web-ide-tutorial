sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";

	return Controller.extend("zapata.mx.app.controller.DetailFI", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf zapata.mx.app.view.DetailFI
		 */
		// 		onInit: function () {

		// 		},
		onInit: function () {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.getRoute("DetailFI").attachMatched(this._onRouteMatched, this);
		},
		_onRouteMatched: function (oEvent) {
			var oArgs, oView;
			oArgs = oEvent.getParameter("arguments");
			oView = this.getView();
			// console.log(oArgs.VbelnID);
			oView.bindElement({
				path: "/PAGOSSet('" + oArgs.VbelnID + "')",
				events: {
					dataRequested: function () {
						oView.setBusy(true);
					},
					dataReceived: function () {
						oView.setBusy(false);
					}
				}
			});
		},
		handleNavButtonPress: function (evt) {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("home");
		},
		oDataCall: function (oEvent) {
			var IdVbeln;
			// 			var oModel = new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZGW_COMPLEMENTO_PAG_SRV/", false);
			// 			sap.ui.getCore().setModel(oModel);
			var oModel = this.getView().getModel();
			// Obtengo valor de la celda 0
			var items = this.getView().byId("detalleFI").getItems();
			items.forEach(function (item) {
				IdVbeln = item.getCells()[0].getText();
			});

			var oEntry = {};
			oEntry.Modulo = this.getView().byId("actModulo").getValue();
			// oModel.update("/PAGOSSet(Vbeln='" + 32000016 + "')", oEntry, {
			oModel.update("/PAGOSSet(Vbeln='" + IdVbeln + "')", oEntry, {
				method: "PUT",
				success: function (oData, oResponse) {
					var text = "Exito" + oEntry.Modulo;
					oModel.refresh(true);
					alert(text);
				},
				error: function (Error, oResponse) {
					alert("Actuali.Fallida");
				}
			});
		},
		oDataCallPago: function (oEvent) {
				var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				var selVbeln = oEvent.getSource().getBindingContext().getProperty("Vbeln");
				console.log(selVbeln);
				oRouter.navTo("VitaPag", {
					VbelnID: selVbeln
				});
			}
			/**
			 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
			 * (NOT before the first rendering! onInit() is used for that one!).
			 * @memberOf zapata.mx.app.view.DetailFI
			 */
			// 		onBeforeRendering: function (OEvtB) {
			// 			alert("Despues de un movimiento");
			// 		},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf zapata.mx.app.view.DetailFI
		 */
		// 		onAfterRendering: function () {
		// 			alert("Antes del llmado");
		// 		}

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf zapata.mx.app.view.DetailFI
		 */
		//	onExit: function() {
		//
		//	}

	});

});