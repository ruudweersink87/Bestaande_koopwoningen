(function() {
    // Create the connector object
    var myConnector = tableau.makeConnector();

    // Define the schema
    myConnector.getSchema = function(schemaCallback) {
        // Schema for observation data	
		var observations_cols = [{
            id: "Id",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "Measure",
			alias: "MeasureCode Id",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "ValueAttribute",
			alias: "Attribuut",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "Value",
			alias: "Waarde",
            dataType: tableau.dataTypeEnum.float
        }, {
            id: "RegioS",
			alias: "Gemeente Id",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "Perioden",
			alias: "Periode Id",
            dataType: tableau.dataTypeEnum.string
        }];

        var ObservationsTable = {
            id: "Observations",
			alias: "Koopwoningen",
			columns: observations_cols
        };
		
         // Schema for RegioSCodes
		var RegioSCodes_cols = [{
            id: "Identifier",
			alias: "Gemeente Id",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "Index",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "Title",
			alias: "Gemeentes",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "Description",
			alias: "Omschrijving",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "DimensionGroupId",
			alias: "Provincie Id",
            dataType: tableau.dataTypeEnum.string
        }];

        var RegioSCodesTable = {
            id: "RegioCodes",
			alias: "Gemeentes",
			columns: RegioSCodes_cols
        };
		
		var RegioSGroups_cols = [{
            id: "Id",
			alias: "Provincie Id",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "Index",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "Title",
			alias: "Provincies",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "Description",
			alias: "Omschrijving",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "ParentId",
            dataType: tableau.dataTypeEnum.string
        }];

        var RegioSGroupsTable = {
            id: "RegioGroups",
			alias: "Provincies",
			columns: RegioSGroups_cols
        };
		
		var PeriodenCodes_cols = [{
            id: "Identifier",
			alias: "Periode Id",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "Index",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "Title",
			alias: "Periode",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "Description",
			alias: "Omschrijving",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "DimensionGroupId",
			alias: "PeriodeGroep Id",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "Status",
            dataType: tableau.dataTypeEnum.string
        }];

        var PeriodenCodesTable = {
            id: "PeriodenCodes",
			alias: "Periodes",
			columns: PeriodenCodes_cols
        };
		
		var PeriodenGroups_cols = [{
            id: "Id",
			alias: "PeriodeGroep Id",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "Index",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "Title",
			alias: "Periode",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "Description",
			alias: "Omschrijving",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "ParentId",
            dataType: tableau.dataTypeEnum.string
        }];

        var PeriodenGroupsTable = {
            id: "PeriodenGroups",
			alias: "Periodegroepen",
			columns: PeriodenGroups_cols
        };
		
		var MeasureCodes_cols = [{
            id: "Identifier",
			alias: "MeasureCode Id",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "Index",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "Title",
			alias: "Onderwerp",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "Description",
			alias: "Omschrijving",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "MeasureGroupId",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "DataType",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "Unit",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "Decimals",
            dataType: tableau.dataTypeEnum.int	
        }, {
            id: "PresentationType",
            dataType: tableau.dataTypeEnum.string
        }];

        var MeasureCodesTable = {
            id: "MeasureCodes",
			alias: "Onderwerpen",
			columns: MeasureCodes_cols
        };
		
        schemaCallback([ObservationsTable, RegioSCodesTable, RegioSGroupsTable, PeriodenCodesTable, PeriodenGroupsTable, MeasureCodesTable]);
		//schemaCallback([ObservationsTable]);
    };

    // Download the data
    myConnector.getData = function(table, doneCallback) {
			
		if (table.tableInfo.id =="Observations") {
		
			$.getJSON("https://odata4.cbs.nl/CBS/83913NED/Observations?format=json", function(resp) {
				var feat = resp.value,
					tableData = [];

				// Iterate over the JSON object
				for (var i = 0, len = feat.length; i < len; i++) {
					tableData.push({
						"Id": feat[i].Id,
						"Measure": feat[i].Measure,
						"Value": feat[i].Value,
						"RegioS": feat[i].RegioS,
						"Perioden": feat[i].Perioden
					});
				}

				table.appendRows(tableData);
				doneCallback();
			});
		
		};
		
		if (table.tableInfo.id =="RegioCodes") {
		
			$.getJSON("https://odata4.cbs.nl/CBS/83913NED/RegioSCodes?format=json", function(resp) {
				var feat = resp.value,
					tableData = [];

				//Iterate over the JSON object
				for (var i = 0, len = feat.length; i < len; i++) {
					tableData.push({
						"Identifier": feat[i].Identifier,
						"Title": feat[i].Title,
						"Description": feat[i].Description,
						"DimensionGroupId": feat[i].DimensionGroupId
					});
				}

				table.appendRows(tableData);
				doneCallback();
			});
		
		};		
		
		if (table.tableInfo.id =="RegioGroups") {
		
			$.getJSON("https://odata4.cbs.nl/CBS/83913NED/RegioSGroups?format=json", function(resp) {
				var feat = resp.value,
					tableData = [];

				//Iterate over the JSON object
				for (var i = 0, len = feat.length; i < len; i++) {
					tableData.push({
						"Id": feat[i].Id,
						"Title": feat[i].Title,
					});
				}

				table.appendRows(tableData);
				doneCallback();
			});
		
		};
		
		if (table.tableInfo.id =="PeriodenCodes") {
		
			$.getJSON("https://odata4.cbs.nl/CBS/83913NED/PeriodenCodes?format=json", function(resp) {
				var feat = resp.value,
					tableData = [];

				//Iterate over the JSON object
				for (var i = 0, len = feat.length; i < len; i++) {
					tableData.push({
						"Identifier": feat[i].Identifier,
						"Title": feat[i].Title,
						"DimensionGroupId": feat[i].DimensionGroupId
					});
				}

				table.appendRows(tableData);
				doneCallback();
			});
		
		};		
		
		if (table.tableInfo.id =="PeriodenGroups") {
		
			$.getJSON("https://odata4.cbs.nl/CBS/83913NED/PeriodenGroups?format=json", function(resp) {
				var feat = resp.value,
					tableData = [];

				//Iterate over the JSON object
				for (var i = 0, len = feat.length; i < len; i++) {
					tableData.push({
						"Id": feat[i].Id,
						"Title": feat[i].Title
					});
				}

				table.appendRows(tableData);
				doneCallback();
			});
		
		};

		if (table.tableInfo.id =="MeasureCodes") {
		
			$.getJSON("https://odata4.cbs.nl/CBS/83913NED/MeasureCodes?format=json", function(resp) {
				var feat = resp.value,
					tableData = [];

				//Iterate over the JSON object
				for (var i = 0, len = feat.length; i < len; i++) {
					tableData.push({
						"Identifier": feat[i].Identifier,
						"Title": feat[i].Title,
						"Description": feat[i].Description
					});
				}

				table.appendRows(tableData);
				doneCallback();
			});
		
		};			


    };

    tableau.registerConnector(myConnector);

    // Create event listeners for when the user submits the form
	$(document).ready(function() {
        $("#submitButton").click(function() {
            tableau.connectionName = "Gemiddelde verkoopprijs koopwoning"; // This will be the data source name in Tableau
            tableau.submit(); // This sends the connector object to Tableau
        });
    });
})();
